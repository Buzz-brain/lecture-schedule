const mongoose = require('mongoose');

const lecturerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phoneNumber: String
});

const Lecturer = mongoose.model('Lecturer', lecturerSchema);

module.exports = Lecturer;
