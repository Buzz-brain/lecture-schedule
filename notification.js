const nodemailer = require('nodemailer');
const Student = require('./models/Student');

async function sendNotification(notificationData, updateType) {
  try {
    // Retrieve all student emails from the database
    const students = await Student.find();
    const studentEmails = students.map((student) => student.email);

    // Create a transporter object
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'chinomsochristian03@gmail.com',
        pass: 'odej rlya ysrb pzmf'
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Construct the message based on the update type
    let message;
    if (updateType === 'timetableUpdate') {
      message = `Lecture ${notificationData.courseTitle} on ${notificationData.day} at ${notificationData.startTime} has been updated.`;
    } else if (updateType === 'statusUpdate') {
      message = `There is a status update from lecture ${notificationData.courseTitle} on ${notificationData.day} at ${notificationData.startTime}.`;
    } else if (updateType === 'lectureNoteUpload') {
      message = `A new lecture note has been uploaded for ${notificationData.courseTitle}. You can access it here: ${notificationData.link}`;
    }


    // Loop through each student email and send the notification
    await Promise.all(studentEmails.map(async (email) => {
      const mailOptions = {
        from: 'chinomsochristian03@gmail.com',
        to: email,
        subject: 'Lecture Update',
        text: message
      };


      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Notification sent successfully!');
      } catch (err) {
        console.error('Error sending notification:', err.message);
      }

    }));
  } catch (error) {
    console.error('Error sending notifications:', error);
  }
}

module.exports = sendNotification;

