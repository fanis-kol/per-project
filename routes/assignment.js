var express = require('express');
var router = express.Router();
var dbconnection = require('../lib/db');


router.get('/', function(req, res, next) {
  const query = "SELECT * FROM assignments";
  var fullUrl = req.protocol + '://' + req.get('host') + req.baseUrl;
  dbconnection.query(query, function(err, rows) {
    if(err) {
        res.render('error');
    } else {
        res.render('assignment', { title: 'assignment', assignment:rows, message: req.params.message, url: fullUrl });
    }
   });

  });
  
  module.exports = router;