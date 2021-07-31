module.exports = {
	// todo: update endpoints and addresses
	graphAPIEndpoints: {
		soulsummoner: 'https://api.thegraph.com/subgraphs/name/soulswap/soul-summoner',
		seance: 'https://api.thegraph.com/subgraphs/name/soulswap/seance-circle',
		timelock: 'https://api.thegraph.com/subgraphs/name/soulswap/soul-timelock',
		maker: 'https://api.thegraph.com/subgraphs/name/soulswap/soul-maker',
		exchange: 'https://api.thegraph.com/subgraphs/name/soulswap/exchange',
		blocklytics: 'https://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks',
		lockup: 'https://api.thegraph.com/subgraphs/name/matthewlilley/lockup',
	},

	graphWSEndpoints: {
		seance: 'wss://api.thegraph.com/subgraphs/name/soulswap/seance-circle',
		exchange: 'wss://api.thegraph.com/subgraphs/name/soulswap/exchange',
		blocklytics: 'wss://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks',
	},

	// JUL 22ND -- FANTOM TESTNET // todo: make dynamic
	spellAddress: '', // JUL28
	makerAddress: '0xe11fc0b43ab98eb91e9836129d1ee7c3bc95df50',
	chefAddress: '',
	soulAddress: '',
	factoryAddress: '0xD648477c22997E94e52a6Cb666fA0B91c44ed185',

	TWENTY_FOUR_HOURS: 86400,
};
