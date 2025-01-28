async function fetchTimetable() {
  try {
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
    const timetable = {};
    for (const day of days) {
      const response = await fetch(`lecture/timetable/${day}`);
      if (response.ok) {
        timetable[day] = await response.json();
      } else {
        console.error(`Failed to fetch timetable for ${day}`);
      }
    }

    // Display lecture messages in announcement section
    const announcementsElement = document.getElementById('announcements');
    announcementsElement.innerHTML = '';

    const allLectures = Object.values(timetable).flat();
    const sortedLectures = allLectures.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    sortedLectures.forEach((lecture) => {
      if (lecture.message) {
        const announcementElement = document.createElement('div');
        announcementElement.className = 'p-3 bg-red-50 rounded-lg';
        announcementElement.innerHTML = `
          <p class="text-sm font-medium text-red-800">${lecture.courseCode}: ${lecture.courseTitle}</p>
          <p class="text-xs text-red-600 mt-1">${lecture.message}</p>
        `;
        announcementsElement.appendChild(announcementElement);
      }
    });

    // Display upcoming lectures
    days.forEach((day, index) => {
      const dayColumn = document.querySelectorAll(".relativeRow")[index];
      dayColumn.innerHTML = ""; // Clear previous content
      if (timetable[day]?.length) {
        timetable[day].forEach((lecture) => {
          const startTime = parseTime(lecture.startTime); // e.g., "09:00" -> 9
          const endTime = parseTime(lecture.endTime); // e.g., "11:00" -> 11
          const duration = endTime - startTime; // Create lecture block
          const lectureDiv = document.createElement("div");
          lectureDiv.style.top = `${(startTime - 9) * 4.5}rem`; // Adjust based on 9 AM start
          lectureDiv.style.height = `${duration * 5}rem`; // 1 hour = 4rem
          lectureDiv.className = "absolute left-0 right-0 bg-blue-100 py-3 px-1 border-blue-400 border-1 rounded";
          lectureDiv.innerHTML = `
            <div class="text-xs font-medium text-blue-800">${lecture.courseCode}: ${lecture.courseTitle}</div>
            <div class="text-xs text-blue-600">${lecture.room}</div>
          `;
          dayColumn.appendChild(lectureDiv);
        });
      } else {
        const emptyDiv = document.createElement("div");
        emptyDiv.className = "text-xs text-gray-500 mt-2";
        emptyDiv.textContent = "No lectures";
        dayColumn.appendChild(emptyDiv);
      }
    });
  } catch (error) {
    console.error("Error fetching timetable:", error);
  }
}

function parseTime(time) {
  // Convert "HH:mm" to hour as an integer
  const [hours, minutes] = time.split(":").map(Number);
  return hours + minutes / 60; // Include fractional hours for minutes
}

// Function to fetch and display upcoming lectures
async function fetchUpcomingLectures() {
  try {
    // Get current date and time
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();

    // Fetch lectures data for the current day
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
    const currentDay = days[currentTime.getDay() - 1] || 'friday'; // handle sunday
    const response = await fetch(`lecture/timetable/${currentDay}`);
    const lectures = await response.json();

    // Filter upcoming lectures
    const upcomingLectures = lectures.filter((lecture) => {
      const lectureHours = parseInt(lecture.startTime.split(":")[0]);
      const lectureMinutes = parseInt(lecture.startTime.split(":")[1]);
      return (lectureHours > currentHours) || (lectureHours === currentHours && lectureMinutes > currentMinutes);
    });

    // Display first two upcoming lectures
    const upcomingLecturesElement = document.getElementById('upcoming-lectures');
    upcomingLecturesElement.innerHTML = '';

    upcomingLectures.slice(0, 2).forEach((lecture) => {
      const lectureElement = document.createElement('div');
      lectureElement.className = 'flex items-center p-3 bg-blue-50 rounded-lg';
      lectureElement.innerHTML = `
        <div class="flex-1">
          <p class="text-sm font-medium text-green-800">${lecture.courseCode}: ${lecture.courseTitle}</p>
          <p class="text-xs text-green-600">${lecture.startTime} • ${lecture.room}</p>
        </div>
        <i class="fas fa-bell text-blue-400"></i>
      `;
      upcomingLecturesElement.appendChild(lectureElement);
    });
  } catch (error) {
    console.error('Error fetching upcoming lectures:', error);
  }
}

// Call the function to fetch and display upcoming lectures
fetchUpcomingLectures();

const pdfContainer = document.getElementById('pdf-container');

fetch('/student/lecture-notes')
  .then(response => response.json())
  .then(data => {
    const pdfContainer = document.getElementById('pdf-container');
    data.forEach((lectureNote) => {
      const lectureNoteDiv = document.createElement('div');
      lectureNoteDiv.className = 'flex items-center p-3 bg-purple-50 rounded-lg';
      lectureNoteDiv.innerHTML = `
        <div class="flex-1">
          <p class="text-sm font-medium text-purple-800">${lectureNote.courseTitle}</p>
          <a href="${lectureNote.link}" download="lecture-note.pdf">Download PDF</a>
        </div>
      `;
      pdfContainer.appendChild(lectureNoteDiv);
    });
  })
  .catch(error => console.error('Error fetching lecture notes:', error));




document.addEventListener("DOMContentLoaded", fetchTimetable);
