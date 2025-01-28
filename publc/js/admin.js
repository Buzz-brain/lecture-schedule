document.addEventListener('DOMContentLoaded', () => {
    // Handle lecturer form submission
    const lecturerForm = document.getElementById('lecturer-form');
    lecturerForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent the default form submission

        const lecturerData = {
            name: document.getElementById('lecturer-name').value,
            email: document.getElementById('lecturer-email').value,
            password: document.getElementById('lecturer-password').value,
        };

        try {
            const response = await fetch('/admin/lecturers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(lecturerData),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message); // Notify the admin of success
                lecturerForm.reset(); // Clear form fields
            } else {
                alert(result.error); // Show error message
            }
        } catch (error) {
            alert('An error occurred: ' + error.message);
        }
    });

    // Handle student form submission
    const studentForm = document.getElementById('student-form');
    studentForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent the default form submission

        const studentData = {
            name: document.getElementById('student-name').value,
            email: document.getElementById('student-email').value,
            password: document.getElementById('student-password').value,
        };

        try {
            const response = await fetch('/admin/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(studentData),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message); // Notify the admin of success
                studentForm.reset(); // Clear form fields
            } else {
                alert(result.error); // Show error message
            }
        } catch (error) {
            alert('An error occurred: ' + error.message);
        }
    });

    // Handle timetable form submission
    const timetableForm = document.getElementById('timetable-form');
    timetableForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent the default form submission

        const timetableData = {
            startTime: document.getElementById('start-time').value,
            endTime: document.getElementById('end-time').value,
            room: document.getElementById('room').value,
            lecturerId: document.getElementById('lecturer-id').value,
            courseCode: document.getElementById('course-code').value,
            courseTitle: document.getElementById('course-title').value,
            message: '',
        };

        const day = "monday"; // You can update this based on the selected day

        try {
            const response = await fetch(`/admin/timetable/${day}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(timetableData),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message); // Notify the admin of success
                timetableForm.reset(); // Clear form fields
            } else {
                alert(result.error); // Show error message
            }
        } catch (error) {
            alert('An error occurred: ' + error.message);
        }
    });
});
