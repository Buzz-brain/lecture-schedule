const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  regNo: String,
  email: String,
  password: String,
  phoneNumber: String
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
