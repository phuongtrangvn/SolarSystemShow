'use strict';
// BE3HW - step 01
// tao module chua file info va controller
var express = require('express');
var controller = require('./solar.controller');

var router = express.Router();

router.get('/', controller.get);

module.exports = router;
