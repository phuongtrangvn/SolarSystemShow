'use strict';

var express = require('express');
var controller = require('./contact.controller');
var router = express.Router();

router.put('/edit',controller.edit);
router.delete('/delete/:_id',controller.deleteContact);
router.get('/getContact', contact.getContact);
router.post('/createContact', contact.createContact);

module.exports = router;
