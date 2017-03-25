'use strict';

var express = require('express');
var controller = require('./contact.controller');
var router = express.Router();

module.exports = router;

router.get('/getUser', contact.getUser);
router.get('/createUser', contact.createUser);
