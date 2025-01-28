const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const LectureNote = require('../models/LectureNote');


CLOUDINARY_CLOUD_NAME="df2q6gyuq"
CLOUDINARY_API_KEY="259936754944698"
CLOUDINARY_API_SECRET="bTfV4_taJPd1zxxk1KJADTL8JdU"

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});


router.get('/files', async (req, res) => {
    try {
      // Retrieve files from Cloudinary
      const files = await cloudinary.api.resources({
        type: 'upload',
        prefix: 'lectures/',
      });
  
      // Extract file metadata
      const fileMetadata = files.resources.map((file) => ({
        filename: file.original_filename,
        filetype: file.resource_type,
        url: file.secure_url,
      }));
  
      res.json(fileMetadata);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving files' });
    }
  });
  
// router.get('/lecture-notes', async (req, res) => {
//   try {
//     const lectureNotes = await LectureNote.find();
//     res.json(lectureNotes);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error fetching lecture notes' });
//   }
// });

router.get('/lecture-notes', async (req, res) => {
  try {
    const lectureNotes = await LectureNote.find();
    if (req.query.link) {
      const pdfLink = req.query.link;
      res.set("Content-Disposition", "inline");
      res.redirect(pdfLink);
    } else {
      res.json(lectureNotes);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching lecture notes' });
  }
});




  
module.exports = router;
