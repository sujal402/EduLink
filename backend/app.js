const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const jwtsecret = 'your_secret_key_here';
const mongourl = 'mongodb://localhost:27017/EduGuide';

mongoose.connect(mongourl).then(() => {
    console.log('db connected ;)');
}).catch((err) => {
    console.error('Database connection failed:', err);
});

// Define schemas and models
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

const collegeAdminSchema = new mongoose.Schema({
    email: { type: String, required: true },
    location: { type: String, required: true },
    pincode: { type: String, required: true },
    universityAffiliation: { type: String, required: true },
    naacCertPhoto: { type: String, required: true },
    website: { type: String, required: true },
    noOfBranches: { type: Number, required: true },
    branches: { type: [String], required: true }
});

const CollegeAdmin = mongoose.model('CollegeAdmin', collegeAdminSchema);

const approvedCollegeAdminSchema = new mongoose.Schema({
    email: { type: String, required: true },
    location: { type: String, required: true },
    pincode: { type: String, required: true },
    universityAffiliation: { type: String, required: true },
    naacCertPhoto: { type: String, required: true },
    website: { type: String, required: true },
    noOfBranches: { type: Number, required: true },
    branches: { type: [String], required: true }
});

const ApprovedCollegeAdmin = mongoose.model('ApprovedCollegeAdmin', approvedCollegeAdminSchema);

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    pincode: { type: String, required: true },
    universityAffiliation: { type: String, required: true },
    website: { type: String, required: true },
    noOfBranches: { type: Number, required: true },
    branches: { type: [String], required: true }
});

const Student = mongoose.model('Student', studentSchema);

const approvedStudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    pincode: { type: String, required: true },
    universityAffiliation: { type: String, required: true },
    website: { type: String, required: true },
    noOfBranches: { type: Number, required: true },
    branches: { type: [String], required: true }
});

const ApprovedStudent = mongoose.model('ApprovedStudent', approvedStudentSchema);

// Define routes
app.get('/', (req, res) => {
    res.send({ stats: 'API is running' });
});

app.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        await User.create({ name, email, password: hashedPassword, role });
        res.status(201).send({ status: "ok", message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error creating user" });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ error: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ email: user.email }, jwtsecret);
            res.status(200).send({ status: "ok", token });
        } else {
            res.status(400).send({ error: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).send({ error: "Error logging in" });
    }
});

app.post('/collegeAdminData', async (req, res) => {
    const { email, location, pincode, universityAffiliation, naacCertPhoto, website, noOfBranches, branches } = req.body;

    try {
        if (!email || !location || !pincode || !universityAffiliation || !naacCertPhoto || !website || !noOfBranches || !branches) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newCollegeAdmin = new CollegeAdmin({ email, location, pincode, universityAffiliation, naacCertPhoto, website, noOfBranches, branches });
        await newCollegeAdmin.save();
        res.status(201).send({ status: "ok", message: "College Admin data saved successfully" });
    } catch (error) {
        res.status(500).send({ error: "Error saving College Admin data" });
    }
});

app.get('/collegeAdmins', async (req, res) => {
    try {
        const collegeAdmins = await CollegeAdmin.find();
        res.json(collegeAdmins);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch college admins' });
    }
});

app.post('/approveCollegeAdmin', async (req, res) => {
    try {
        const admin = req.body;

        await ApprovedCollegeAdmin.create(admin);
        await CollegeAdmin.findByIdAndDelete(admin._id);

        res.status(200).send('College Admin approved');
    } catch (error) {
        res.status(500).send('Failed to approve college admin');
    }
});

app.post('/disapproveCollegeAdmin', async (req, res) => {
    try {
        const { id } = req.body;
        await CollegeAdmin.findByIdAndDelete(id);
        res.status(200).send('College Admin disapproved');
    } catch (error) {
        res.status(500).send('Failed to disapprove college admin');
    }
});

app.post('/studentData', async (req, res) => {
    const { name, email, location, pincode, universityAffiliation, website, noOfBranches, branches } = req.body;

    try {
        if (!name || !email || !location || !pincode || !universityAffiliation || !website || !noOfBranches || !branches) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newStudent = new Student({ name, email, location, pincode, universityAffiliation, website, noOfBranches, branches });
        await newStudent.save();
        res.status(201).send({ status: "ok", message: "Student data saved successfully" });
    } catch (error) {
        res.status(500).send({ error: "Error saving student data" });
    }
});

app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch students' });
    }
});

app.post('/approveStudent', async (req, res) => {
    try {
        const student = req.body;

        await ApprovedStudent.create(student);
        await Student.findByIdAndDelete(student._id);

        res.status(200).send('Student approved');
    } catch (error) {
        res.status(500).send('Failed to approve student');
    }
});

app.post('/disapproveStudent', async (req, res) => {
    try {
        const { id } = req.body;
        await Student.findByIdAndDelete(id);
        res.status(200).send('Student disapproved');
    } catch (error) {
        res.status(500).send('Failed to disapprove student');
    }
});

app.post('/advertiseCollege', async (req, res) => {
    try {
        const collegeData = req.body;

        if (!collegeData) {
            return res.status(400).json({ error: 'No college data provided' });
        }

        // Process the advertising (e.g., save to a separate collection, notify admins, etc.)
        await ApprovedCollegeAdmin.create(collegeData);

        res.status(201).send({ status: "ok", message: "College advertised successfully" });
    } catch (error) {
        console.error('Error advertising college:', error);
        res.status(500).send({ error: "Error advertising college" });
    }
});

// Fetch all approved college admins
app.get('/approvedCollegeAdmins', async (req, res) => {
    try {
        const approvedCollegeAdmins = await ApprovedCollegeAdmin.find();
        res.status(200).json(approvedCollegeAdmins);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch approved college admins' });
    }
});


app.listen(5001, () => {
    console.log('Server is running on port 5001');
});
