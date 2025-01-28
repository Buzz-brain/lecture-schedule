const express = require('express');
const router = express.Router();
const Timetable = require('../models/Timetable');
const LectureNote = require('../models/LectureNote');
const sendNotification = require('../notification');

const cloudinary = require('cloudinary').v2;

CLOUDINARY_CLOUD_NAME="df2q6gyuq"
CLOUDINARY_API_KEY="259936754944698"
CLOUDINARY_API_SECRET="bTfV4_taJPd1zxxk1KJADTL8JdU"

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});



const multer = require('multer');

const upload = multer({ dest: './uploads/' });


router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      resource_type: 'raw',
      folder: 'lectures',
    });

    // Process the uploaded file (e.g., save to database)
    console.log(uploadResult);

    // Get the course title from the request body
    const { courseTitle } = req.body;

    // Create a new document in the LectureNote model
    const lectureNote = new LectureNote({
      courseTitle,
      link: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/raw/upload/v${uploadResult.version}/${uploadResult.public_id}`,
    });

    // Save the lecture note to the database
    await lectureNote.save();

    // Send notification to students
    const notificationData = {
      courseTitle,
      day: 'Today',
      startTime: 'Now',
      link: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/raw/upload/v${uploadResult.version}/${uploadResult.public_id}`,
    };

    await sendNotification(notificationData, 'lectureNoteUpload');

    res.json({ message: 'File uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error uploading file' });
  }
});






// Update Message
router.patch('/timetable/:day/:startTime', async (req, res) => {
  try {
    const { day, startTime } = req.params;
    const { message } = req.body;
    const lecturerId = "6790704fa38e4b10f175195f" //req.body.lecturerId // or req.headers.lecturerid; 



    const timetable = await Timetable.findOne();
    if (!timetable) {
      return res.status(404).json({ error: 'Timetable not found' });
    }

    const dayArray = timetable[day];
    const lectureIndex = dayArray.findIndex((lecture) => lecture.startTime === startTime);
    if (lectureIndex === -1) {
      return res.status(404).json({ error: 'Lecture not found' });
    }

    // Check if the lecturer is authorized to update the message
    if (dayArray[lectureIndex].lecturer.toString() !== lecturerId) {
      return res.status(401).json({ error: 'Unauthorized to update message' });
    }

    dayArray[lectureIndex].message = message;
    await timetable.save();
    const lectureData = dayArray[lectureIndex];
    const notificationData = { day, ...lectureData };

    await sendNotification(notificationData, 'statusUpdate');
    res.json({ message: 'Message updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update message' });
  }
});



module.exports = router;