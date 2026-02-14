const API = "/students";

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("studentId").value;

  const student = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    course: document.getElementById("course").value,
    age: document.getElementById("age").value
  };

  if (id) {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    });
  } else {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    });
  }

  form.reset();
  loadStudents();
});

async function loadStudents() {
  const res = await fetch(API);
  const data = await res.json();

  table.innerHTML = "";

  data.forEach(student => {
    table.innerHTML += `
      <tr>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.course}</td>
        <td>${student.age}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editStudent('${student._id}','${student.name}','${student.email}','${student.course}','${student.age}')">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteStudent('${student._id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

function editStudent(id, name, email, course, age) {
  document.getElementById("studentId").value = id;
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("course").value = course;
  document.getElementById("age").value = age;
}

async function deleteStudent(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadStudents();
}

loadStudents();