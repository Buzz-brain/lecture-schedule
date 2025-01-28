const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Lecturer = require('../models/Lecturer');
const Student = require('../models/Student');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await Lecturer.findOne({ email });

  if (!user) {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    return res.json({ message: 'Logged in successfully', user: student, role: "student" });
}

const isPasswordValid = await bcrypt.compare(password, user.password);
if (!isPasswordValid) {
  return res.status(401).json({ error: 'Invalid email or password' });
}
return res.json({ message: 'Logged in successfully', user: user, role: "lecturer" });
});

module.exports = router;

