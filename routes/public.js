'use strict'
var express = require('express')
var router = express.Router()

var config = require('../config'),
  PublicController = require('../controllers/publicController')

router.post('/getData', PublicController.getData)

module.exports = router