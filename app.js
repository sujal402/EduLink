const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const app = express();
app.use(express.json());

const jwtsecret = 'your_secret_key_here';

// const mongourl = 'mongodb+srv://torayoi6:admin@cluster0.zknzdz2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const mongourl = 'mongodb://localhost:27017/EduGuide';

mongoose.connect(mongourl).then(()=>{
    console.log('db connected :)');
}).catch((err)=>{
    console.log('Connection failed',err);
})  

require('./UserDetail')
const User = mongoose.model('UserInfo');


app.get('/',(req,res)=>{
    res.send({stats: 'API is running'});
})

app.post('/register', async(req,res) => {
    res.send({stats: 'Register is running'});
    const {name,email,password,role} = req.body;
    
    const olduser = await User.findOne({email:email});

    if(olduser){
        return res.send({data:"User already exists"});
    }

    const ecryptedPassword = await bcrypt.hash(password,12); 

    try{
        await User.create({
            name:name,
            email:email,
            password:ecryptedPassword,
            role:role
        });
        res.send({stauts:"ok",data:"user created"});
    }catch(error){
        res.send({stauts:"error",data:"error"});
    }
})

app.post('/login', async(req,res) => {

    const {email,password} = req.body;

    const olduser = await User.findOne({ email: email});

    if(!olduser){
        return res.send({data: "User does not exist"});
    }

    // decrypt password because stored in encrypted form
    if(await bcrypt.compare(password,olduser.password))
    {
        const token = jwt.sign({email:olduser.email},jwtsecret)
        
        if(res.status(201))
        {
            return res.send({ status: "ok", data: token })
        }else{
            return res.send({ error: "error" })
        }

    }

})


const collegeAdminSchema = new mongoose.Schema({
    email: { type: String, required: true },
    location: { type: String, required: true },
    pincode: { type: String, required: true },
    universityAffiliation: { type: String, required: true },
    naacCertPhoto: { type: String, required: true },
    website: { type: String, required: true },
    noOfBranches: { type: Number, required: true },
    branches: { type: [String], required: true },
  });
  
  const CollegeAdmin = mongoose.model('CollegeAdmin', collegeAdminSchema);
  
  // API endpoint to handle data submission
  app.post('/collegeAdminData', async (req, res) => {
    try {
      const { email, location, pincode, universityAffiliation, naacCertPhoto, website, noOfBranches, branches } = req.body;
  
      // Log the received data
      console.log('Received data:', req.body);
  
      // Validate the data
      if (!email || !location || !pincode || !universityAffiliation || !naacCertPhoto || !website || !noOfBranches || !branches) {
        console.error('Validation error: Missing fields');
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      // Save the data to MongoDB
      const newCollegeAdmin = new CollegeAdmin({
        email,
        location,
        pincode,
        universityAffiliation,
        naacCertPhoto,
        website,
        noOfBranches,
        branches,
      });
  
      await newCollegeAdmin.save();
      res.status(201).send({ status: "ok", data: "College Admin data saved successfully" });
    } catch (error) {
      console.error('Error saving College Admin data:', error);
      res.status(500).send({ error: "Error saving College Admin data" });
    }
  });

// Fetch all college admins
app.get('/collegeAdmins', async (req, res) => {
    try {
      const collegeAdmins = await CollegeAdmin.find(); // Replace with your MongoDB query
      res.json(collegeAdmins);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch college admins' });
    }
  });
  
  // Approve a college admin
  app.post('/approveCollegeAdmins', async (req, res) => {
    try {
      const { id } = req.body;
      await CollegeAdmin.updateOne({ _id: id }, { approved: true }); // Update with your MongoDB query
      res.json({ message: 'College Admin approved' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to approve college admin' });
    }
  });
  
  // Fetch all students
  app.get('/UserInfo', async (req, res) => {
    try {
      const students = await Student.find(); // Replace with your MongoDB query
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch students' });
    }
  });
  
  // Approve a student
  app.post('/approveUserInfo', async (req, res) => {
    try {
      const { id } = req.body;
      await Student.updateOne({ _id: id }, { approved: true }); // Update with your MongoDB query
      res.json({ message: 'Student approved' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to approve student' });
    }
  });
  

app.listen(5001,()=>{
    console.log('Server is running on port 5001');
})

