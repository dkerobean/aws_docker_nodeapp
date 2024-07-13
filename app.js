const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const db = require('./config/db');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes

app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`);
});