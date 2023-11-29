const express = require('express');
const morgan = require('morgan');
const {firestore} = require('./firebase');

const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

app.get('/', async (req,res) => {
    const querySnapshot = await firestore.collection('users').get();
    console.log(querySnapshot.docs[0].data());
})

module.exports = app;