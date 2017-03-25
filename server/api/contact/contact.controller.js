'use strict';
var Contact = require('./contact.model');

module.exports = {
  createContact: function(req, res) {
    if (req.body) {
      Contact.findOne({_id: req.body._id}).exec(function(err, data){
        if (data) {
          res.json({status: false, message: 'User are already exist!'})
        } else {
          var newContact = {
            name: req.body.name,
            email: req.body.email,
            feedback: req.body.feedback,
            time: Date.now()
          }
          console.log(newContact);
          Contact.create(newContact, function(err, data){
            res.json({status: true, message: 'Success'});
          });
        }
      });
    }
  },

  getContact : function(req, res){
    Contact.find().exec(function(err, data){
      res.json(data);
    });
  },

  deleteContact: function(req, res){
    Contact.findOne({_id: req.params._id})
      .exec(function(err, data){
        if (data){
          data.remove(function(err){
            if (err){
              res.json({status: false, message:'delete failed!!!'});
            }else{
              res.json({status: true, message:'delete succeed!!!'});
            }
          })
        }else{
          res.json({status: false, message:'delete failed!!!'});
        }
      })
  },

  edit: function(req,res){
    if(req.body){
      Contact.findOne({_id: req.body._id}).exec(function(err, data){
        if (data){
          data.resolved = req.body.resolved;
          data.save(function(err, newData){
            if (err){
              res.json({status: false, message: 'Update failed!!!'});
            }
            else{
              res.json({status: true, message: 'Update succeed!!!'});
            }
          });
        } else {
          res.status(400).json({message: 'not found contact: '});
        }
      });
    }
    else {
      res.json({status: false, message: 'Update fail!!!'})
    }
  },

  findByEmail : function(req, res){
    if (req.params.email) {
      console.log('debug', 'START- findByAccount %s', req.params.email);
      Contact.find({email: req.params.email}).exec(function(err, data){
        res.json(data);
        console.log('debug', 'END- findByAccount');
      });
    } else {
      res.json([]);
    }
  },
}
