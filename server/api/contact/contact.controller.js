'use strict';

module.exports = {
  createUser: function(req, res) {
    if (req.body) {
      User.findOne({username: req.body.username}).exec(function(err, data){
        if (data) {
          res.json({status: false, message: 'User are already exist!'})
        } else {
          var newUser = {
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
            age: req.body.age,
            name: req.body.name
          }
          console.log(newUser);
          User.create(newUser, function(err, data){
            res.json({status: true, message: 'Success'});
          });
        }
      });
    }
  },

  getUser : function(req, res){
    User.find().exec(function(err, data){
      res.json(data);
    });
  }
}
