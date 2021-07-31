const ws = require('isomorphic-ws');
const { SubscriptionClient } = require('subscriptions-transport-ws');

const { request, gql } = require('graphql-request');

const { graphAPIEndpoints, graphWSEndpoints, spellAddress } = require('../constants');
const { timestampToBlock } = require('../utils');

module.exports = {
	async info({ block = undefined, timestamp = undefined } = {}) {
		block = block ? block : timestamp ? await timestampToBlock(timestamp) : undefined;
		block = block ? `block: { number: ${block} }` : '';

		const result = await request(
			graphAPIEndpoints.spell,
			gql`{
                    spell(id: "${spellAddress}", ${block}) {
                        ${info.properties.toString()}
                    }
                }`,
		);

		return info.callback(result.spell);
	},

	observeInfo() {
		const query = gql`
            subscription {
                spell(id: "${spellAddress}") {
                    ${info.properties.toString()}
                }
        }`;

		const client = new SubscriptionClient(graphWSEndpoints.spell, { reconnect: true }, ws);
		const observable = client.request({ query });

		return {
			subscribe({ next, error, complete }) {
				return observable.subscribe({
					next(results) {
						next(info.callback(results.data.spell));
					},
					error,
					complete,
				});
			},
		};
	},

	async user({ block = undefined, timestamp = undefined, user_address = undefined } = {}) {
		if (!user_address) {
			throw new Error('soul-data: User address undefined');
		}

		block = block ? block : timestamp ? await timestampToBlock(timestamp) : undefined;
		block = block ? `block: { number: ${block} }` : '';

		const result = await request(
			graphAPIEndpoints.spell,
			gql`{
                    user(id: "${user_address.toLowerCase()}", ${block}) {
                        ${user.properties.toString()}
                    }
                }`,
		);

		return user.callback(result.user);
	},
};

const info = {
	properties: [
		'decimals',
		'name',
		'soul',
		'symbol',
		'totalSupply',
		'ratio',
		'spellMinted',
		'spellBurned',
		'soulStaked',
		'soulStakedUSD',
		'soulHarvested',
		'soulHarvestedUSD',
		'spellAge',
		'spellAgeDestroyed',
		'updatedAt',
	],

	callback(results) {
		return {
			decimals: Number(results.decimals),
			name: results.name,
			soul: results.soul,
			symbol: results.symbol,
			totalSupply: Number(results.totalSupply),
			ratio: Number(results.ratio),
			spellMinted: Number(results.spellMinted),
			spellBurned: Number(results.spellBurned),
			soulStaked: Number(results.totalSupply) * Number(results.ratio),
			soulStakedUSD: Number(results.soulStakedUSD),
			soulHarvested: Number(results.soulHarvested),
			soulHarvestedUSD: Number(results.soulHarvestedUSD),
			spellAge: Number(results.spellAge),
			spellAgeDestroyed: Number(results.spellAgeDestroyed),
			updatedAt: Number(results.updatedAt),
		};
	},
};

const user = {
	properties: [
		'spell',
		'spellIn',
		'spellOut',
		'spellMinted',
		'spellBurned',
		'spellOffset',
		'spellAge',
		'spellAgeDestroyed',
		'soulStaked',
		'soulStakedUSD',
		'soulHarvested',
		'soulHarvestedUSD',
		'soulIn',
		'soulOut',
		'usdOut',
		'usdIn',
		'updatedAt',
		'soulOffset',
		'usdOffset',
	],

	callback(results) {
		return {
			spell: Number(results.spell),
			spellIn: Number(results.spellIn),
			spellOut: Number(results.spellOut),
			spellMinted: Number(results.spellMinted),
			spellBurned: Number(results.spellBurned),
			spellOffset: Number(results.spellOffset),
			spellAge: Number(results.spellAge),
			spellAgeDestroyed: Number(results.spellAgeDestroyed),
			soulStaked: Number(results.soulStaked),
			soulStakedUSD: Number(results.soulStakedUSD),
			soulHarvested: Number(results.soulHarvested),
			soulHarvestedUSD: Number(results.soulHarvestedUSD),
			soulIn: Number(results.soulIn),
			soulOut: Number(results.soulOut),
			usdOut: Number(results.usdOut),
			usdIn: Number(results.usdIn),
			updatedAt: Number(results.updatedAt),
			soulOffset: Number(results.soulOffset),
			usdOffset: Number(results.usdOffset),
		};
	},
};
