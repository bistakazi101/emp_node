const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  UserName: {
    type:String,
    trim:true,
    min:2,
    max:20,
    required: [true,"Please input Correct Username"]

  },
  PassWord: {
    type: Number,
    trim:true,
    min:2,
    max:20,
    required: [true,"Please input Correct Password"]
  }
});

const Usersschema = mongoose.model('User', userSchema,'details');

module.exports = Usersschema;
