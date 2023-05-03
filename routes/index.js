const express = require('express');
const router = express.Router();

const postRoute = require('./posts')
const commentRoute = require('./comments')
module.exports = {postRoute,commentRoute}