const express = require('express');
const router = express.Router();

const postRoute = require('./posts')
const commentRoute = require('./comments')
const logjoinRoute = require('./logjoin')
module.exports = {postRoute,commentRoute,logjoinRoute}