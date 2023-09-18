const storedData = localStorage.getItem("students");
if (storedData) {
    displayStudents(JSON.parse(storedData));
} else {
    fetch('https://mocki.io/v1/4ff70481-1ef8-4d6d-98aa-eceef33e358e')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('students', JSON.stringify(data));
            displayStudents(data);
        })
        .catch(error => console.error('Error : ', error));
}
// Display students in the table
function displayStudents(students) {
    const tableBody = document.querySelector('#student-table tbody');
    tableBody.innerHTML = '';
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${student.name}</td>
                    <td>${student.age}</td>
                    <td>${student.grade}</td>
                    <td>
                        <button class="edit-btn" data-id="${student.name}">Edit</button>
                        <button class="delete-btn" data-id="${student.name}">Delete</button>
                    </td>
                `;
        tableBody.appendChild(row);
    });
}

// Attach event listener to "Edit" button
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('edit-btn')) {
        handleEdit(event);
    }
});

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-btn')) {
        handleDelete(event);
    }
});

// Attach event listener to "Delete" all button
document.querySelector('.delall').addEventListener('click', handleDeleteAll);

// Handle edit button click
function handleEdit(event) {
    const studentId = event.target.getAttribute('data-id');
    const students = JSON.parse(localStorage.getItem('students'));

    // Find the student by ID
    const studentIndex = students.findIndex(s => s.name === studentId);
    if (studentIndex !== -1) {
        const student = students[studentIndex];

        // Display an edit form
        const editForm = `
                    <td><input type="text" id="edit-name" value="${student.name}" /></td>
                    <td><input type="number" id="edit-age" value="${student.age}" /></td>
                    <td><input type="text" id="edit-grade" value="${student.grade}" /></td>
                    <td>
                        <button class="save-btn" data-index="${studentIndex}">Save</button>
                        <button class="cancel-btn">Cancel</button>
                    </td>
                `;

        const row = event.target.parentNode.parentNode;
        row.innerHTML = editForm;

        const saveButton = row.querySelector('.save-btn');
        const cancelButton = row.querySelector('.cancel-btn');

        saveButton.addEventListener('click', () => {
            const updatedStudent = {
                id: student.id,
                name: document.querySelector('#edit-name').value,
                age: parseInt(document.querySelector('#edit-age').value),
                grade: document.querySelector('#edit-grade').value,
            };

            students[studentIndex] = updatedStudent;
            localStorage.setItem('students', JSON.stringify(students));

            displayStudents(students);
        });

        cancelButton.addEventListener('click', () => {
            displayStudents(students);
        });
    }
}

// Handle delete button click
function handleDelete(event) {
    const studentId = event.target.getAttribute('data-id');
    const students = JSON.parse(localStorage.getItem('students'));

    // Find the student by ID
    const studentIndex = students.findIndex(s => s.name === studentId);
    if (studentIndex !== -1) {
        students.splice(studentIndex, 1); // Remove the student from the array
        localStorage.setItem('students', JSON.stringify(students));

        // Remove the row from the table
        const row = event.target.parentNode.parentNode;
        row.remove();
    }
}

// Handle delete all button click
function handleDeleteAll() {
    localStorage.removeItem('students'); // Clear the local storage
    const tableBody = document.querySelector('#student-table tbody');
    tableBody.innerHTML = ''; // Clear the table
}

function log() {
    window.location.href = 'Login-main.html';
}

function logbac() {
    const storedData = localStorage.getItem("students");

    if (storedData) {
        const students = JSON.parse(storedData);
        displayStudents(students);
    } else {
        fetch('https://mocki.io/v1/4ff70481-1ef8-4d6d-98aa-eceef33e358e')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('students', JSON.stringify(data));
                displayStudents(data);
            })
            .catch(error => console.error('Error : ', error));
    }
}

// Execute logbac on page load
logbac();