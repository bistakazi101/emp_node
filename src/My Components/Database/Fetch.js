const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Login');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
});





    
      db.collection("details").find({}).toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
        db.close();
      });


  
  