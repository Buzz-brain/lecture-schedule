const mongoose = require('mongoose');

const lectureNoteSchema = new mongoose.Schema({
  courseTitle: String,
  link: String,
});

const LectureNote = mongoose.model('LectureNote', lectureNoteSchema);

module.exports = LectureNote;

