module.exports = {
	// todo: update endpoints and addresses
	graphAPIEndpoints: {
		summoner: 'https://api.thegraph.com/subgraphs/name/SoulSwapFinance/soul-summoner',
		// seance: 'https://api.thegraph.com/subgraphs/name/SoulSwapFinance/seance-circle',
		reaper: 'https://api.thegraph.com/subgraphs/name/SoulSwapFinance/soul-reaper',
		exchange: 'https://api.thegraph.com/subgraphs/name/bunsdev/soulswap',
		blocklytics: 'https://api.thegraph.com/subgraphs/name/matthewlilley/fantom-blocks'
	},

	graphWSEndpoints: {
		// seance: 'wss://api.thegraph.com/subgraphs/name/SoulSwapFinance/seance-circle',
		exchange: 'wss://api.thegraph.com/subgraphs/name/bunsdev/soulswap',
		blocklytics: 'wss://api.thegraph.com/subgraphs/name/matthewlilley/fantom-blocks'
	},

	spellAddress: '0xF4799d8269b061C43236A6D2ad5415589f984F84',
	reaperAddress: '',
	summonerAddress: '0xce6ccbB1EdAD497B4d53d829DF491aF70065AB5B',
	soulAddress: '0xe2fb177009FF39F52C0134E8007FA0e4BaAcBd07',
	seanceAddress: '0x124B06C5ce47De7A6e9EFDA71a946717130079E6',
	factoryAddress: '0x1120e150dA9def6Fe930f4fEDeD18ef57c0CA7eF',

	TWENTY_FOUR_HOURS: 86400,
};
