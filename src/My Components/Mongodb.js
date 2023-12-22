const Mongoose = require("mongoose")
const localDB = `mongodb://127.0.0.1/Employee`
const connectDB = async () => {
  await Mongoose.connect(localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log("MongoDB Connected")
}
module.exports = connectDB;