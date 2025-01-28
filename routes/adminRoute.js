const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Lecturer = require('../models/Lecturer');
const Student = require('../models/Student');
const Timetable = require('../models/Timetable');
const sendNotification = require('../notification');

// Create Lecturer
router.post('/lecturers', async (req, res) => {
    try {
        const lecturer = new Lecturer(req.body);
        lecturer.password = await bcrypt.hash(lecturer.password, 10);
        await lecturer.save();
        res.json({ message: 'Lecturer created successfully', lecturerId: lecturer._id });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create lecturer' });
    }
});

router.post('/students', async (req, res) => {
    try {
        const student = new Student(req.body);
        student.password = await bcrypt.hash(student.password, 10);
        await student.save();
        res.json({ message: 'Student created successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create student' });
    }
});

router.post('/timetable/:day', async (req, res) => {
    try {
        const { day } = req.params;
        const { startTime, endTime, room, lecturerId, courseCode, courseTitle, message } = req.body;


        // Find lecturer by ID
        const lecturer = await Lecturer.findById(lecturerId);
        if (!lecturer) {
            return res.status(404).json({ error: 'Lecturer not found' });
        }

        let timetable = await Timetable.findOne();
        console.log(req.body, req.params)


        if (!timetable) {
            timetable = new Timetable({
                monday: [],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: []
            });
            await timetable.save();
        }

        const dayArray = timetable[day];
        const existingLecture = dayArray.find((lecture) => {
            return (lecture.startTime <= startTime && lecture.endTime >= endTime) ||
                (lecture.startTime >= startTime && lecture.startTime < endTime) ||
                (lecture.endTime > startTime && lecture.endTime <= endTime);
        });

        if (existingLecture) {
            return res.status(400).json({ error: 'Time slot already taken' });
        }

        const lectureData = {
            startTime,
            endTime,
            room,
            lecturer,
            courseCode,
            courseTitle,
            message
          };
        
        const notificationData = {
        day,
        ...lectureData
        };
          

        dayArray.push(lectureData);
        await timetable.save();

        await sendNotification(notificationData, 'timetableUpdate');
        res.json({ message: 'Lecture added to timetable successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add lecture to timetable' });
    }
});

module.exports = router;




