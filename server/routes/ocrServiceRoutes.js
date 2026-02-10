const express = require('express');
const {extractDetails} = require('../controllers/ocrServiceContoller');

const Router = express.Router();

Router.post('/extract',extractDetails);

module.exports = Router;