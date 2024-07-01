const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');
const axios = require('axios');
const API_CONFIG = require('../apiConfig');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Fetch top 100 assets from CoinGecko API
const fetchTopAssets = async () => {
  try {
    const response = await axios.get(`${API_CONFIG.coingecko.baseURL}${API_CONFIG.coingecko.endpoints.markets}`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top assets:', error);
    throw error;
  }
};

// Save assets to a JSON file
const saveAssetsToFile = (assets) => {
  const filePath = path.join(__dirname, 'supportedAssets.json');
  fs.writeFileSync(filePath, JSON.stringify(assets, null, 2));
  console.log(`Assets have been saved to ${filePath}`);
};

// Main function to fetch and save assets
const updateAssets = async () => {
  try {
    const assets = await fetchTopAssets();
    saveAssetsToFile(assets);
  } catch (error) {
    console.error('Error updating assets:', error);
  }
};

updateAssets();
