const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Lecturer = require('../models/Lecturer');
const Student = require('../models/Student');
const Admin = require('../models/Admin'); // Assuming you have an Admin model

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if user is an admin
  const admin = await Admin.findOne({ email });
  if (admin) {
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    return res.json({ message: 'Logged in successfully', user: admin, role: "admin" });
  }

  // Check if user is a lecturer
  const lecturer = await Lecturer.findOne({ email });
  if (lecturer) {
    const isPasswordValid = await bcrypt.compare(password, lecturer.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    return res.json({ message: 'Logged in successfully', user: lecturer, role: "lecturer", lecturerId: lecturer._id });
  }

  // Check if user is a student
  const student = await Student.findOne({ email });
  if (student) {
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    return res.json({ message: 'Logged in successfully', user: student, role: "student" });
  }

  // If none of the above, return error
  return res.status(401).json({ error: 'Invalid email or password' });
});

module.exports = router;

