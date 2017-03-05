'use strict';
var infos = require('./info');

// BE3HW - step 03
// lay thong tin tu file info, tra ve thong tin tuong ung voi query gui len
//query gui len se co dang ?planet=xxx
module.exports = {
  get : function(req, res){
    var planet = req.query.planet || '';
    var info = infos[planet.toLowerCase()];
    res.json(info || {});
  }
}
