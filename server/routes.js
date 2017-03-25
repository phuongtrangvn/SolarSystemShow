var path = require('path');
var config = require('./config/environment');
var express = require('express');
var authService = require('./api/auth/auth.service');
module.exports = function(app) {
  // Insert routes below
  var appPath = path.join(config.root, 'client');
  var solar   = path.join(config.root, 'solar');
  app.use('/api/thing', require('./api/thing'));
  // BE3HW - step 04
  // gan router cho server >> url se la <domainname>/api/solar<query di kem>
  app.use('/api/solar', require('./api/solar'));
  app.use('/api/auth', require('./api/auth'));
  app.use('/api/user', require('./api/user'));
  app.use('/api/test', require('./api/test'));
  app.use('/api/contact', require('./api/contact'));
  app.use('/admin', authService.isAuthenticated(), authService.hasRole('admin'), express.static(path.join(appPath, 'admin')));
  app.use(express.static(appPath));
  app.use('/SolarSystem', express.static(solar));
}
