const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const entryRouter = require('./routers/entry-router');
const accountRouter = require('./routers/account-router'); 
const userRouter = require('./routers/user-router'); 
dotenv.config({ path: path.resolve(__dirname, '../.env') });

CLIENT_PORT = 5000;

// Allow requests from origins
const corsOptions = {
  origin: [`http://127.0.0.1:${CLIENT_PORT}`, `http://localhost:${CLIENT_PORT}`]
};

// Express App
const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Set up routes
app.use('/api/entries', entryRouter);
app.use('/api/accounts', accountRouter);
app.use('/api/users', userRouter);

// Start the server
const PORT = process.env.SERVER_PORT || 3000; // Add a fallback port in case SERVER_PORT is not defined
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
