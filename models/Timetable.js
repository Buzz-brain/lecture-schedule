
// const mongoose = require('mongoose');

// const timetableSchema = new mongoose.Schema({
//   monday: [{ startTime: String, endTime: String, lecture: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' } }],
//   tuesday: [{ startTime: String, endTime: String, lecture: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' } }],
//   wednesday: [{ startTime: String, endTime: String, lecture: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' } }],
//   thursday: [{ startTime: String, endTime: String, lecture: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' } }],
//   friday: [{ startTime: String, endTime: String, lecture: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' } }]
// });

// const Timetable = mongoose.model('Timetable', timetableSchema);

// module.exports = Timetable;


const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  monday: [
    {
      startTime: String,
      endTime: String,
      room: String,
      lecturer: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecturer' },
      courseCode: String,
      courseTitle: String,
      message: String
    }
  ],
  tuesday: [
    {
      startTime: String,
      endTime: String,
      room: String,
      lecturer: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecturer' },
      courseCode: String,
      courseTitle: String,
      message: String
    }
  ],
  wednesday: [
    {
      startTime: String,
      endTime: String,
      room: String,
      lecturer: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecturer' },
      courseCode: String,
      courseTitle: String,
      message: String
    }
  ],
  thursday: [
    {
      startTime: String,
      endTime: String,
      room: String,
      lecturer: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecturer' },
      courseCode: String,
      courseTitle: String,
      message: String
    }
  ],
  friday: [
    {
      startTime: String,
      endTime: String,
      room: String,
      lecturer: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecturer' },
      courseCode: String,
      courseTitle: String,
      message: String
    }
  ]
});

const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;





