/*jshint esversion: 6*/

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

const server = app.listen(8888);