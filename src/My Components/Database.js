const mongoose = require('mongoose');

module.exports = () => {
   // mongdb cloud connection is here
  mongoose
    .connect("mongodb://127.0.0.1/Employee", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  
    })
    .then(() => {
      console.log("connected to mongodb :)");
    })
    .catch((err) => {
      console.log(err);
    }); 
};