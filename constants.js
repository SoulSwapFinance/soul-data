module.exports = {
	// todo: update endpoints and addresses
	graphAPIEndpoints: {
		summoner: 'https://api.thegraph.com/subgraphs/name/SoulSwapFinance/soul-summoner',
		// coffinbox: 'https://api.thegraph.com/subgraphs/name/SoulSwapFinance/coffinbox',
		exchange: 'https://api.thegraph.com/subgraphs/name/soulswapfinance/fantom-exchange',
		blocklytics: 'https://api.thegraph.com/subgraphs/name/matthewlilley/fantom-blocks'
	},

	graphWSEndpoints: {
		// coffinbox: 'wss://api.thegraph.com/subgraphs/name/SoulSwapFinance/coffinbox',
		exchange: 'wss://api.thegraph.com/subgraphs/name/soulswapfinance/fantom-exchange',
		blocklytics: 'wss://api.thegraph.com/subgraphs/name/matthewlilley/fantom-blocks'
	},

	summonerAddress: '0xce6ccbb1edad497b4d53d829df491af70065ab5b',
	soulAddress: '0xe2fb177009ff39f52c0134e8007fa0e4baacbd07',
	// coffinboxAddress: '0x124B06C5ce47De7A6e9EFDA71a946717130079E6',
	factoryAddress: '0x1120e150da9def6fe930f4feded18ef57c0ca7ef',

	TWENTY_FOUR_HOURS: 86400,
};
