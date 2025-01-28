document.addEventListener('DOMContentLoaded', () => {
    // Handle lecturer form submission
    const lecturerForm = document.getElementById('lecturer-form');
    lecturerForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent the default form submission

        const lecturerData = {
            name: document.getElementById('lecturer-name').value,
            email: document.getElementById('lecturer-email').value,
            password: document.getElementById('lecturer-password').value,
            phone: document.getElementById('lecturer-phone').value,
        };
console.log(lecturerData)
        try {
            const response = await fetch('/admin/lecturers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(lecturerData),
            });

            const result = await response.json();
            console.log(result)

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
            phone: document.getElementById('student-phone').value,
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

    // Fetch lecturers data from backend
fetch('/admin/lecturers')
.then(response => response.json())
.then(data => {
  // Get the table body element
  const tableBody = document.querySelector('tbody');

  // Clear the table body
  tableBody.innerHTML = '';

  // Render each lecturer in the table
  data.forEach(lecturer => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${lecturer._id}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${lecturer.name}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${lecturer.email}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${lecturer.phoneNumber}</td>
    `;
    tableBody.appendChild(row);
  });
})
.catch(error => console.error(error));

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
