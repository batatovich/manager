const API_CONFIG = {
    coingecko: {
        baseURL: 'https://api.coingecko.com/api/v3',
        endpoints: {
            markets: '/coins/markets',
            list: '/coins/list'
            // Add other CoinGecko endpoints here if needed
        },
    },
    // You can add more API configurations here for other services
};

module.exports = API_CONFIG;