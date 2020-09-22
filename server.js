// basic server setup

// this is how we import for the backend (server)
// manupliate path names
const path = require('path');
// create simple express server
const express = require('express');
// to use global variables
const dotenv = require('dotenv');
// adds colors to console
const colors = require('colors');
// to help logging 
const morgan = require('morgan');

const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const transactions = require('./routes/transactions');

const app = express();

// this allows us to use body parser
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// whenevr we made a request here, it goes to transactions file
app.use('/api/v1/transactions', transactions);

if (process.env.NODE_ENV === 'production') {
    // build folder is static and used for prod
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));