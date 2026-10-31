const API = "/api/students";
const form = document.getElementById("student-form");
const table = document.getElementById("student-table");
const search = document.getElementById("search");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const formTitle = document.getElementById("form-title");
let students = [];

// READ: load all students from the server
async function loadStudents() {
    const res = await fetch(API);
    students = await res.json();
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
form.addEventListener("submit", async e => {
    e.preventDefault();
    const id = document.getElementById("student-id").value;
    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value,
        age: parseInt(document.getElementById("age").value),
    };
    await fetch(id ? `${API}/${id}` : API, {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    resetForm();
    loadStudents();
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
async function deleteStudent(id) {
    if (!confirm("Delete this student?")) return;
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadStudents();
}

cancelBtn.addEventListener("click", resetForm);
search.addEventListener("input", renderTable);
loadStudents();
