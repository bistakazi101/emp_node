const mongoose = require('mongoose');

const EmpSchema = new mongoose.Schema({
    ID: {
    type:String,
    trim:true,
    required: true
  },
  FirstName: {
    type: String,
    trim:true,
    min:2,
    max:20,
    required: true
  },
  LastName: {
    type: String,
    trim:true,
    min:2,
    max:20,
    required: true
  },
  Email: {
    type: String,
    trim:true,
    min:2,
    max:20,
    required: true
  },
  Phone: {
    type: Number,
    trim:true,
    min:2,
    max:200000000000000,
    required: true
  },
  Citizen: {
    type: Number,
    trim:true,
    min:2,
    max:20000000,
    required: true
  },
  Address:{
    type: String,
    trim:true,
    min:2,
    max:20,
    required: true
  },
  Education:{
    type: String,
    trim:true,
    min:2,
    max:20,
    required: true
  },
});

const EmpsSchema = mongoose.model('EmpsSchema', EmpSchema,'Emp');
module.exports=EmpsSchema;
