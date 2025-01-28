const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  room: String,
  day: String,
  title: String,
  lecturer: String,
  courseTitle: String,
  startTime: String,
  endTime: String
});

const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;