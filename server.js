require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const indexRoutes = require('./routes/api');
const memberRoutes = require('./routes/api/member');
const transactionRoutes = require('./routes/api/transaction');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/interclub-challenge', { useMongoClient: true });

app.use(function(req, res, next) {
	setTimeout(next, 500);
});

app.use(cors());

app.use('/api', indexRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/transactions', transactionRoutes);

app.use('*', (req, res) => {
    res.status(404).send('Not Found');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
    console.log(`Server listening on Port ${PORT}`);
});
