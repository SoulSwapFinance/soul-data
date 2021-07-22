const ws = require('isomorphic-ws');
const { SubscriptionClient } = require('subscriptions-transport-ws'); 

const { request, gql } = require('graphql-request');

const { graphAPIEndpoints, graphWSEndpoints, circleAddress } = require('../constants')
const { timestampToBlock } = require('../utils');

module.exports = {
    async info({block = undefined, timestamp = undefined} = {}) {
        block = block ? block : timestamp ? (await timestampToBlock(timestamp)) : undefined;
        block = block ? `block: { number: ${block} }` : "";

        const result = await request(graphAPIEndpoints.circle,
            gql`{
                    circle(id: "${circleAddress}", ${block}) {
                        ${info.properties.toString()}
                    }
                }`
        );

        return info.callback(result.circle);
    },

    observeInfo() {
        const query = gql`
            subscription {
                circle(id: "${circleAddress}") {
                    ${info.properties.toString()}
                }
        }`;

        const client = new SubscriptionClient(graphWSEndpoints.circle, { reconnect: true, }, ws,);
        const observable = client.request({ query });

        return {
            subscribe({next, error, complete}) {
                return observable.subscribe({
                    next(results) {
                        next(info.callback(results.data.circle));
                    },
                    error,
                    complete
                });
            }
        };
    },

    async user({block = undefined, timestamp = undefined, user_address = undefined} = {}) {
        if(!user_address) { throw new Error("soul-data: User address undefined"); }

        block = block ? block : timestamp ? (await timestampToBlock(timestamp)) : undefined;
        block = block ? `block: { number: ${block} }` : "";

        const result = await request(graphAPIEndpoints.circle,
            gql`{
                    user(id: "${user_address.toLowerCase()}", ${block}) {
                        ${user.properties.toString()}
                    }
                }`
        );

        return user.callback(result.user);
    },
}

const info = {
    properties: [
        'decimals',
        'name',
        'soul',
        'symbol',
        'totalSupply',
        'ratio',
        'xSoulMinted',
        'xSoulBurned',
        'soulStaked',
        'soulStakedUSD',
        'soulHarvested',
        'soulHarvestedUSD',
        'xSoulAge',
        'xSoulAgeDestroyed',
        'updatedAt'
    ],

    callback(results) {
        return ({
            decimals: Number(results.decimals),
            name: results.name,
            soul: results.soul,
            symbol: results.symbol,
            totalSupply: Number(results.totalSupply),
            ratio: Number(results.ratio),
            xSoulMinted: Number(results.xSoulMinted),
            xSoulBurned: Number(results.xSoulBurned),
            soulStaked: Number(results.totalSupply) * Number(results.ratio),
            soulStakedUSD: Number(results.soulStakedUSD),
            soulHarvested: Number(results.soulHarvested),
            soulHarvestedUSD: Number(results.soulHarvestedUSD),
            xSoulAge: Number(results.xSoulAge),
            xSoulAgeDestroyed: Number(results.xSoulAgeDestroyed),
            updatedAt: Number(results.updatedAt)
        })
    }
};

const user = {
    properties: [
        'xSoul',
        'xSoulIn',
        'xSoulOut',
        'xSoulMinted',
        'xSoulBurned',
        'xSoulOffset',
        'xSoulAge',
        'xSoulAgeDestroyed',
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
        'usdOffset'
    ],

    callback(results) {
        return ({
            xSoul: Number(results.xSoul),
            xSoulIn: Number(results.xSoulIn),
            xSoulOut: Number(results.xSoulOut),
            xSoulMinted: Number(results.xSoulMinted),
            xSoulBurned: Number(results.xSoulBurned),
            xSoulOffset: Number(results.xSoulOffset),
            xSoulAge: Number(results.xSoulAge),
            xSoulAgeDestroyed: Number(results.xSoulAgeDestroyed),
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
            usdOffset: Number(results.usdOffset)
        })
    }
};