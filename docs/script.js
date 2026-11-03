// Live demo version of static/script.js: the browser's storage stands in for the Flask + MySQL backend
const STORAGE_KEY = "sms-demo-students";
const SAMPLE_STUDENTS = [
    { id: 1, name: "Aarav Shah", email: "aarav@example.com", course: "Computer Science", age: 20 },
    { id: 2, name: "Priya Nair", email: "priya@example.com", course: "Mathematics", age: 21 },
];
const form = document.getElementById("student-form");
const table = document.getElementById("student-table");
const search = document.getElementById("search");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const resetBtn = document.getElementById("reset-btn");
const formTitle = document.getElementById("form-title");
let students = [];

// READ: load all students from browser storage
function loadStudents() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        students = Array.isArray(saved) ? saved : [...SAMPLE_STUDENTS];
    } catch {
        students = [...SAMPLE_STUDENTS];
    }
    renderTable();
}

function saveStudents() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    } catch {
        // Storage is blocked (e.g. private browsing): changes last until the page is closed
    }
    renderTable();
}

function renderTable() {
    const q = search.value.toLowerCase();
    table.innerHTML = "";
    students
        .filter(s => s.name.toLowerCase().includes(q) || s.course.toLowerCase().includes(q))
        .forEach(s => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${s.id}</td>
                <td>${escapeHtml(s.name)}</td>
                <td>${escapeHtml(s.email)}</td>
                <td>${escapeHtml(s.course)}</td>
                <td>${s.age}</td>
                <td>
                    <button class="edit" onclick="startEdit(${s.id})">Edit</button>
                    <button class="delete" onclick="deleteStudent(${s.id})">Delete</button>
                </td>`;
            table.appendChild(row);
        });
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// CREATE / UPDATE: submit the form
form.addEventListener("submit", e => {
    e.preventDefault();
    const id = parseInt(document.getElementById("student-id").value);
    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value,
        age: parseInt(document.getElementById("age").value),
    };
    if (id) {
        students = students.map(s => (s.id === id ? { id, ...data } : s));
    } else {
        const nextId = Math.max(0, ...students.map(s => s.id)) + 1;
        students = [...students, { id: nextId, ...data }];
    }
    resetForm();
    saveStudents();
});

function startEdit(id) {
    const s = students.find(st => st.id === id);
    document.getElementById("student-id").value = s.id;
    document.getElementById("name").value = s.name;
    document.getElementById("email").value = s.email;
    document.getElementById("course").value = s.course;
    document.getElementById("age").value = s.age;
    formTitle.textContent = "Edit Student";
    submitBtn.textContent = "Update Student";
    cancelBtn.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetForm() {
    form.reset();
    document.getElementById("student-id").value = "";
    formTitle.textContent = "Add Student";
    submitBtn.textContent = "Add Student";
    cancelBtn.hidden = true;
}

// DELETE: remove a student
function deleteStudent(id) {
    if (!confirm("Delete this student?")) return;
    students = students.filter(s => s.id !== id);
    saveStudents();
}

// Put the sample students back
resetBtn.addEventListener("click", () => {
    students = [...SAMPLE_STUDENTS];
    resetForm();
    saveStudents();
});

cancelBtn.addEventListener("click", resetForm);
search.addEventListener("input", renderTable);
loadStudents();
