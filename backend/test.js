const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const entryRouter = require('./routers/entryRouter');
dotenv.config({ path: path.resolve(__dirname, '../.env') });


const app = express();
app.use(cors({
  origin: 'http://127.0.0.1:5500'
}));
app.use(bodyParser.json());

// Mount the entryRoutes
app.use('/api/entries', entryRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


//Fetching
const entryData = {
  type: 'expense',
  amount: 100.50,
  asset: 'ARS',
  creationDate: new Date('2024-05-03'),
  completionDate: new Date('2024-05-04'),
  counterparty: 'Thor',
  observations: 'Su martillo'
};

const apiUrl = 'http://localhost:3000/api/entries/saveEntry'; // Adjust the URL based on your server configuration
