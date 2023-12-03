const express = require('express');
const morgan = require('morgan');

const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

module.exports = app;