module.exports = {
	// todo: update endpoints and addresses
	graphAPIEndpoints: {
		masterchef: 'https://api.thegraph.com/subgraphs/name/soulswap/master-chef',
		circle: 'https://api.thegraph.com/subgraphs/name/soulswap/soul-circle',
		timelock: 'https://api.thegraph.com/subgraphs/name/soulswap/soul-timelock',
		maker: 'https://api.thegraph.com/subgraphs/name/soulswap/soul-maker',
		exchange: 'https://api.thegraph.com/subgraphs/name/soulswap/exchange',
		blocklytics: 'https://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks',
		lockup: 'https://api.thegraph.com/subgraphs/name/matthewlilley/lockup',
	},

	graphWSEndpoints: {
		circle: 'wss://api.thegraph.com/subgraphs/name/soulswap/soul-circle',
		exchange: 'wss://api.thegraph.com/subgraphs/name/soulswap/exchange',
		blocklytics: 'wss://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks',
	},
	// JUL 22ND -- FANTOM TESTNET // todo: make dynamic
	circleAddress: '0x3E3887680e6E81e4Da8C019Ef56a704297eCE211',
	makerAddress: '0xe11fc0b43ab98eb91e9836129d1ee7c3bc95df50',
	chefAddress: '0x5cED956c0d3dC88B8C3E42494F7b2e052d7CfeBc',
	soulAddress: '0xfF84964E7A446466669da84be6c72Fe10eA786cF',
	factoryAddress: '0xD648477c22997E94e52a6Cb666fA0B91c44ed185',

	TWENTY_FOUR_HOURS: 86400,
};
