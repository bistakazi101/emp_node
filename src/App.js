const express = require('express');
const app = express();
const router = express.Router();
const path=require("path");
const mongoose = require('mongoose');

// Set the views directory
app.set('views', '/home/saga/Desktop/Employee_Management_React/emp/views');
// Set EJS as the view engine
app.set('view engine', 'ejs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/Login');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})


app.set('view engine', 'hbs');

const EmpsSchema = require('./My Components/Database/Registration');
const Usersschema = require('./My Components/Database/User');



app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//get routes
app.get('/',(req,res)=>{
  res.render("Login");
})
app.get('/dashboard',(req,res)=>{
  res.render("dashboard");
})
app.get('/Pay',(req,res)=>{
  res.render("PayRole");
})
app.get("/index", (req, res)=>{
  res.render('index');
});
app.get("/About", (req, res)=>{
  res.render('About');
});
app.get("/Exit", (req, res)=>{
  res.render('Login');
});
app.get('/userreg',(req,res)=>{
  res.render("userreg");
})
app.get('/Registration',(req,res)=>{
  res.render("Registration");
})
//POST-User Registration Routes
app.post('/Register',async (req,res)=>{
  var UserName = req.body.UserName;
  var PassWord = req.body.PassWord;
  var data = {
    "UserName":req.body.UserName,
    "PassWord":req.body.PassWord
  }
  
  db.collection('details').insertOne(data,function(err, collection){
    if (err) throw err;
    else
    res.render("userreg");
    console.log('Inserted Data Successfully');      
});

 
});
app.post('/Registration',async (req,res)=>{
  var ID=req.body.ID;
  var FirstName = req.body.FirstName;
  var LastName = req.body.LastName;
  var Email = req.body.Email;
  var Phone = req.body.Phone;
  var Citizen = req.body.Citizen;
  var Address = req.body.Address;
  var Education=req.body.Education;

  var data = {
    "ID":req.body.ID,
    "FirstName":req.body.FirstName,
    "LastName":req.body.LastName,
    "Email":req.body.Email,
    "Phone":req.body.Phone,
    "Citizen":req.body.Citizen,
    "Address":req.body.Address,
    "Education":req.body.Education
  }
  db.collection('Emp').insertOne(data,function(err, collection){
    if (err) throw err;
    else
    console.log('Record Inserted Successfully');  
    res.render('Registration');
  });
});

app.get('/updateusr', async (req, res) => {
  const UserName = req.query.UserName;
  console.log(`searching for User with UserName ${UserName}`);
  console.log(UserName);
  try {
    const user = await Usersschema.findOne({ UserName }).exec();
    console.log('found User:', user);
    if (!user) {
      res.status(404).send(`User with UserName ${UserName} not found`);
    } else {
      res.render('updateuser', { Usersschema: [user] });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

//Update Users Data 

app.post('/updateusr/', async(req, res) => {
  console.log('Lets Go');
  var UserName=req.body.UserName;
  var PassWord = req.body.PassWord;

  try {
    const updateduser = await Usersschema.findOneAndUpdate(
      { UserName: UserName },
      {
        UserName: UserName,
        PassWord: PassWord,
  
      },
      { new: true }
    );
    console.log('User Updated Successfully');
    res.render('AllData',{Usersschema:[updateduser]} );
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});


// Define the route to retrieve all the data of Users
app.get('/users', async function(req, res) {
  Usersschema.find({})
    .then(users => {

      res.render('AllData', { users });
    })
    .catch(err => console.log(err));
});



//Handling user login
app.post("/Login", async function(req, res){
  try{
    const UserName=req.body.UserName;
    const PassWord=req.body.PassWord;

const getUserName = await Usersschema.findOne({UserName:UserName});

if(getUserName.PassWord == PassWord)
{
  res.render('dashboard');
}
else {
 // Render the error view template with the error message
 res.status(401).render('Login', { message: 'Incorrect Details. Please try again.' });


}
  }catch(error)
  {
    
    res.status(401).render('Login', { message: 'Invalid Details. Please try again.' });


  }
});
//login Route
app.get("/Login", (req, res)=>{
res.render('Login');
  });
// Define the route to retrieve all the data of Employees
app.get('/EmpAll', async function(req, res) {
  EmpsSchema.find({})
    .then(EmpsSchema => {

      res.render('EmpAll', { EmpsSchema });
    })
    .catch(err => console.log(err));
});


//Get a Employee selected

app.get('/updateEmp?:ID', async(req, res) => {
  const ID = parseInt(req.query.ID);
  console.log(`searching for employee with ID ${ID}`);
  console.log(ID);
  try {
    const employee =await  EmpsSchema.findOne({ ID: ID }).exec();
    console.log('found employee:', employee);
    if (!employee) {
      res.status(404).send(`Employee with ID ${ID} not found`);
    } 
else {
   //   console.log(employee);
      res.render('updateemp', {EmpsSchema:[employee] });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

//Update Employees Data 
app.post('/updateEmp/', async(req, res) => {
  console.log('Lets Go');
  var ID=req.body.ID;
  var FirstName = req.body.FirstName;
  var LastName = req.body.LastName;
  var Email = req.body.Email;
  var Phone = req.body.Phone;
  var Citizen = req.body.Citizen;
  var Address = req.body.Address;
  var Education=req.body.Education;

 

  try {
    const updatedEmployee = await EmpsSchema.findOneAndUpdate(
      { ID: ID },
      {
        ID: ID,
        FirstName: FirstName,
        LastName: LastName,
        Email: Email,
        Phone: Phone,
        Citizen: Citizen,
        Address: Address,
        Education: Education
      },
      { new: true }
    );
    console.log('Employee Updated Successfully');
    res.render('EmpAll',{EmpsSchema:[updatedEmployee]} );
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

//Get a user selected
app.get('/searchEmp?:searchany', async(req, res) => {
  const searchany = parseInt(req.query.searchany);
  console.log(`searching for employee with ID ${searchany}`);
  console.log(searchany);
  try {
    const employee =await  EmpsSchema.findOne({ ID: searchany }).exec();
    console.log('found employee:', employee);
    if (!employee) {
      res.status(404).send(`Employee with ID ${searchany} not found`);
    } 
else {
   //   console.log(employee);
      res.render('EmpAll', {EmpsSchema:[employee] });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

// Delete Users Data 
app.post('/deleteuser', function(req, res) {

  const UserName=req.body.UserName;
  db.collection('details').deleteOne(UserName,function(err, collection){
    if (err) throw err;
    else
    res.send("User Data  Removed Successfully");  
  });
});

// Delete Employees Data 
app.post('/deleteEmp', function(req, res) {
  const ID=req.body.ID;
  db.collection('Emp').deleteOne(ID,function(err, collection){
    if (err) throw err;
    else
    res.send('Employee Data Removed Successfully');
  });
  });

  
//Listening to the port

app.listen(5600, ()=>{
  console.log('Server is Listening at port 5600');
});