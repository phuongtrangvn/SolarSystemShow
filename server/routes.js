module.exports = function(app) {
  // Insert routes below
  app.use('/api/thing', require('./api/thing'));
  // BE3HW - step 04
  // gan router cho server >> url se la <domainname>/api/solar<query di kem>
  app.use('/api/solar', require('./api/solar'));
  app.use('/api/auth', require('./api/auth'));
  app.use('/api/user', require('./api/user'));
  app.use('/api/test', require('./api/test'));
}
