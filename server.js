/*jshint esversion: 6*/

const express = require('express');
const bodyParser = require('body-parser');
const buzzwordsRoutes = require('./routes/buzzwords.js');
const resetRoutes = require('./routes/resets.js');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/buzzwords', buzzwordsRoutes);

app.post('/reset', (req, res) => {

});

const server = app.listen(8888);