const express = require('express');
const router = express.Router();
const Timetable = require('../models/Timetable');

// Get Lectures by Day
router.get('/timetable/:day', async (req, res) => {
    try {
      const { day } = req.params;
      const timetable = await Timetable.findOne();
      if (!timetable) {
        return res.status(404).json({ error: 'Timetable not found' });
      }
      const dayArray = timetable[day];
      res.json(dayArray);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get lectures by day' });
    }
  });
  



  // Get Lectures by Lecturer
  router.get('/timetable/lecturer/:lecturerId', async (req, res) => {
    try {
      const { lecturerId } = req.params;
      const timetable = await Timetable.findOne();
      if (!timetable) {
        return res.status(404).json({ error: 'Timetable not found' });
      }
      const lectures = [];
      for (const day in timetable) {
        const dayArray = timetable[day];
        if (Array.isArray(dayArray)) {
          dayArray.forEach((lecture) => {
            if (lecture.lecturer._id.toString() === lecturerId) {
              lectures.push({ 
                day, 
                startTime: lecture.startTime, 
                endTime: lecture.endTime, 
                room: lecture.room, 
                lecturer: lecture.lecturer, 
                courseCode: lecture.courseCode, 
                courseTitle: lecture.courseTitle, 
                message: lecture.message 
              });
            }
          });
        }
      }
      res.json(lectures);
    } catch (err) {
      console.error('Error getting lectures by lecturer:', err);
      res.status(500).json({ error: 'Failed to get lectures by lecturer' });
    }
  });
  
  
  
  
  

module.exports = router;


