'use strict';

var express = require('express');
var controller = require('./contact.controller');
var router = express.Router();

router.put('/edit',controller.edit);
router.delete('/delete/:_id',controller.deleteContact);
router.get('/getContact', controller.getContact);
router.post('/createContact', controller.createContact);
router.get('/find/:email', controller.findByEmail);

module.exports = router;
