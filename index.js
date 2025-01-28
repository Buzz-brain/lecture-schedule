const express = require('express');
const app = express();
const mongoose = require('mongoose');
const adminRoute = require('./routes/adminRoute');
const authRoute = require('./routes/auth');
const path = require("path");
const lecturerRoute = require('./routes/lecturerRoute');
const lectureRoute = require('./routes/lectureRoute');
const studentRoute = require('./routes/studentRoute');

mongoose.connect('mongodb+srv://chinomsochristian03:ahYZxLh5loYrfgss@cluster0.dmkcl.mongodb.net/lecture_schedule?retryWrites=true&w=majority');

app.use(express.json());
app.use(express.static(path.join(__dirname, "publc")));
app.set('view engine', 'ejs');
app.use('/admin', adminRoute);
app.use('/auth', authRoute);
app.use('/lecturer', lecturerRoute);
app.use('/lecture', lectureRoute);
app.use('/student', studentRoute);

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});
app.get('/admindashboard', (req, res) => {
  res.render('admindashboard');
});
app.get('/lecturerdashboard', (req, res) => {
  res.render('lecturerdashboard');
});


app.listen(5000, () => {
  console.log('Server listening on port 5000');
});


// const Lecturer = require('./models/Lecturer');
// const bcrypt = require('bcryptjs');

// const admin = new Lecturer({
//   name: 'Admin',
//   email: 'admin@example.com',
//   password: bcrypt.hashSync('password', 10),
//   role: 'admin'
// });

// admin.save();
// console.log('Admin seeded successfully');


// const adminRoute = require('./routes/admin');
// const authRoute = require('./routes/auth');
// const lecturerRoute = require('./routes/lecturer');
// const studentRoute = require('./routes/student');

// app.use('/auth', authRoute);
// // app.use('/admin', authenticate, adminRoute);
// app.use('/lecturer', lecturerRoute);
// app.use('/student', studentRoute);


// function authenticate(req, res, next) {
//     const token = req.header('Authorization');
//     if (!token) return res.status(401).json({ error: 'Access denied' });
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded;
//       if (decoded.role !== 'admin') {
//         return res.status(403).json({ error: 'Forbidden' });
//       }
//       next();
//     } catch (error) {
//       res.status(400).json({ error: 'Invalid token' });
//     }
//   }
