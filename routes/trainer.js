var express = require('express');
var router = express.Router();
var dbconnection = require('../lib/db');
var Τrainer = require('../models/trainers');


router.get('/', function(req, res, next) {
    const query = "SELECT * FROM trainer";
    var fullUrl = req.protocol + '://' + req.get('host') + req.baseUrl;
    dbconnection.query(query, function(err, rows) {
      if(err) {
          res.render('error');
      } else {
          res.render('trainer', { title: 'trainer', trainer:rows, message: req.params.message, url: fullUrl });
      }
     });
  
    });


    router.get('/add/', function(req, res, next) {
        res.render('add_trainers', { title: 'Trainer - Add New', message:'' });
    });
    
    router.post('/add', function(req, res, next) {
        let trainer = new Τrainer(undefined, req.body.name, req.body.last_name, req.body.subject);
        const query = `INSERT INTO trainer(name, last_name, subject) VALUES('${trainer.name}', '${trainer.last_name}', '${trainer.subject}');`;
       //const query = "INSERT INTO trainer(name, last_name, subject) VALUES ('?,?,?');";
        dbconnection.query(query, function(err, status) {
            
            if(err) {
                console.log(err)
                res.render("add_trainers", { title: 'trainer - Add New', message: "Error inserting data to the database!" });
            } 
            else {
               
                res.redirect('/trainer');
            }
            
        });
    });
    
    module.exports = router;

    