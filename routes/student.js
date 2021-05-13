var express = require('express');
var router = express.Router();
var dbconnection = require('../lib/db');
var Student = require('../models/students');




router.get('/', function(req, res, next) {
  const query = "SELECT * FROM student";
  var fullUrl = req.protocol + '://' + req.get('host') + req.baseUrl;
  dbconnection.query(query, function(err, rows) {
    if(err) {
        res.render('error');
    } else {
        res.render('student', { title: 'student', student:rows, message: req.params.message, url: fullUrl });
    }

   });

  });
  router.get('/add/', function(req, res, next) {
    res.render('add_students', { title: 'Student - Add New', message:'' });
});


router.post('/add', function(req, res, next) {
    let student = new Student(undefined, req.body.name, req.body.last_name, req.body.date_of_birth, req.body.tuition_fees);
    const query = `INSERT INTO student(name, last_name, date_of_birth, tuition_fees ) VALUES('${student.name}', '${student.last_name}', '${student.date_of_birth}','${student.tuition_fees}');`;
    dbconnection.query(query, function(err, status) {
        
        if(err) {
            console.log(err)
            res.render("add_students", { title: 'student - Add New', message: "Error inserting data to the database!" });
        } 
        else {
           
            res.redirect('/student');
        }
        
    });
});
  
  
  module.exports = router;