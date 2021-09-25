const pageResults = require('graph-results-pager');

const ws = require('isomorphic-ws');
const { SubscriptionClient } = require('subscriptions-transport-ws');

const { request, gql } = require('graphql-request');

const { graphAPIEndpoints, graphWSEndpoints, reaperAddress } = require('../constants');
const { timestampToBlock } = require('../utils');

module.exports = {
	async info({ block = undefined, timestamp = undefined } = {}) {
		block = block ? block : timestamp ? await timestampToBlock(timestamp) : undefined;
		block = block ? `block: { number: ${block} }` : '';

		const result = await request(
			graphAPIEndpoints.reaper,
			gql`{
                    reapers(first: 1, ${block}) {
                        ${info.properties.toString()}
                    }
                }`,
		);

		return info.callback(result.reapers[0]);
	},

	servings({
		minTimestamp = undefined,
		maxTimestamp = undefined,
		minBlock = undefined,
		maxBlock = undefined,
		max = undefined,
	} = {}) {
		return pageResults({
			api: graphAPIEndpoints.reaper,
			query: {
				entity: 'servings',
				selection: {
					where: {
						block_gte: minBlock || undefined,
						block_lte: maxBlock || undefined,
						timestamp_gte: minTimestamp || undefined,
						timestamp_lte: maxTimestamp || undefined,
					},
				},
				properties: servings.properties,
			},
			max,
		})
			.then((results) => servings.callback(results))
			.catch((err) => console.log(err));
	},

	async servers({ block = undefined, timestamp = undefined, max = undefined } = {}) {
		return pageResults({
			api: graphAPIEndpoints.reaper,
			query: {
				entity: 'servers',
				block: block ? { number: block } : timestamp ? { number: await timestampToBlock(timestamp) } : undefined,
				properties: servers.properties,
			},
			max,
		})
			.then((results) => servers.callback(results))
			.catch((err) => console.log(err));
	},

	async pendingServings({ block = undefined, timestamp = undefined, max = undefined } = {}) {
		return pageResults({
			api: graphAPIEndpoints.exchange,
			query: {
				entity: 'users',
				selection: {
					where: {
						id: `\\"${reaperAddress}\\"`,
					},
				},
				block: block ? { number: block } : timestamp ? { number: await timestampToBlock(timestamp) } : undefined,
				properties: pendingServings.properties,
			},
			max,
		})
			.then((results) => pendingServings.callback(results))
			.catch((err) => console.log(err));
	},

	observePendingServings() {
		const query = gql`
            subscription {
                users(first: 1000, where: {id: "${reaperAddress}"}) {
                    ${pendingServings.properties.toString()}
                }
        }`;

		const client = new SubscriptionClient(graphWSEndpoints.exchange, { reconnect: true }, ws);
		const observable = client.request({ query });

		return {
			subscribe({ next, error, complete }) {
				return observable.subscribe({
					next(results) {
						next(pendingServings.callback(results.data.users));
					},
					error,
					complete,
				});
			},
		};
	},
};

const info = {
	properties: ['id', 'soulServed'],

	callback(results) {
		return {
			address: results.id,
			soulServed: Number(results.soulServed),
		};
	},
};

const servings = {
	properties: ['server { id }', 'tx', 'pair', 'token0', 'token1', 'soulServed', 'block', 'timestamp'],

	callback(results) {
		return results.map(({ server, tx, pair, token0, token1, soulServed, block, timestamp }) => ({
			serverAddress: server.id,
			tx: tx,
			pair: pair,
			token0: token0,
			token1: token1,
			soulServed: Number(soulServed),
			block: Number(block),
			timestamp: Number(timestamp * 1000),
			date: new Date(timestamp * 1000),
		}));
	},
};

const servers = {
	properties: [
		'id',
		'soulServed',
		'servings(first: 1000, orderBy: block, orderDirection: desc) { tx, block, pair, soulServed }',
	],

	callback(results) {
		return results.map(({ id, soulServed, servings }) => ({
			serverAddress: id,
			soulServed: Number(soulServed),
			servings: servings.map(({ tx, block, pair, soulServed }) => ({
				tx,
				block: Number(block),
				pair,
				soulServed: Number(soulServed),
			})),
		}));
	},
};

const pendingServings = {
	properties: [
		'liquidityPositions(first: 1000) { id, liquidityTokenBalance, pair { id, totalSupply, reserveUSD, token0 { id, name, symbol }, token1 { id, symbol, name } } }',
	],

	callback(results) {
		return results[0].liquidityPositions
			.map(({ liquidityTokenBalance, pair }) => ({
				address: pair.id,
				token0: pair.token0,
				token1: pair.token1,
				valueUSD: (liquidityTokenBalance / pair.totalSupply) * pair.reserveUSD,
			}))
			.sort((a, b) => b.valueUSD - a.valueUSD);
	},
};