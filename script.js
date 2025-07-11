const employees = [
  { name: "Alice Smith", email: "alice@example.com", department: "HR", role: "Manager" },
  { name: "Bob Johnson", email: "bob@example.com", department: "IT", role: "Developer" },
  { name: "Charlie Lee", email: "charlie@example.com", department: "Finance", role: "Analyst" }
];

function displayEmployees(data) {
  const list = document.getElementById("employeeList");
  list.innerHTML = "";

  data.forEach((emp) => {
    const card = document.createElement("div");
    card.className = "employee-card";
    card.innerHTML = `
      <h3>${emp.name}</h3>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <button onclick="editEmployee('${emp.name}')">Edit</button>
      <button onclick="deleteEmployee('${emp.name}')">Delete</button>
    `;
    list.appendChild(card);
  });
}



function sortEmployees() {
  const key = document.getElementById("sort").value;
  if (!key) return displayEmployees(employees);
  const sorted = [...employees].sort((a, b) => a[key].localeCompare(b[key]));
  displayEmployees(sorted);
}

function limitEmployees() {
  const limit = parseInt(document.getElementById("limit").value);
  displayEmployees(employees.slice(0, limit));
}

function editEmployee(name) {
  alert("Edit: " + name);
}

function deleteEmployee(name) {
  const index = employees.findIndex(emp => emp.name === name);
  if (index === -1) {
    alert("Error:Employee not found or already deleted.");
    return;
  }
  const confirmDelete = confirm(`Are you sure you want to delete ${name}?`);
  if (confirmDelete) {
    employees.splice(index, 1);
    displayEmployees(employees);
  }
}

window.onload = () => {
  displayEmployees(employees);
};


const modal = document.getElementById("employeeModal");
const form = document.getElementById("employeeForm");

// Open modal
document.querySelector(".add-btn").addEventListener("click", () => {
  form.reset();
  modal.style.display = "flex";
});

// Close modal
function closeModal() {
  modal.style.display = "none";
}

// Add employee
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newEmp = {
    name: `${form.firstName.value} ${form.lastName.value}`,
    email: form.email.value,
    department: form.department.value,
    role: form.role.value
  };
  employees.push(newEmp);
  displayEmployees(employees);
  closeModal();
});

const editModal = document.getElementById("editEmployeeModal");
let currentEditIndex = null;

function editEmployee(name) {
  const employee = employees.find(emp => emp.name === name);
  currentEditIndex = employees.findIndex(emp => emp.name === name);

  if (!employee) {
     alert("Error: Employee not found.");
    return;
  }

    const [first, last=""] = employee.name.split(" ");
    document.getElementById("editFirstName").value = first;
    document.getElementById("editLastName").value = last;
    document.getElementById("editEmail").value = employee.email;
    document.getElementById("editDepartment").value = employee.department;
    document.getElementById("editRole").value = employee.role;
    document.getElementById("editEmployeeModal").style.display = "flex";


  }


document.getElementById("editEmployeeForm").addEventListener("submit", function (e) {
  e.preventDefault();

 
  const firstName = document.getElementById("editFirstName").value.trim();
  const lastName = document.getElementById("editLastName").value.trim();
  const email = document.getElementById("editEmail").value.trim();
  const department = document.getElementById("editDepartment").value.trim();
  const role = document.getElementById("editRole").value.trim();

  if (!firstName || !lastName || !email || !department || !role) {
    alert("Please fill in all fields before updating.");
    return;
  }

  const newName = `${firstName} ${lastName}`;
  const current = employees[currentEditIndex];
  const noChange =
    current.name === newName &&
    current.email === email &&
    current.department === department &&
    current.role === role;

  if (noChange) {
    alert("No changes detected.");
    return;
  }

  employees[currentEditIndex] = {
    name: newName,
    email,
    department,
    role
  };

  displayEmployees(employees);
  closeEditModal()
});

function closeEditModal() {
  editModal.style.display = "none";
}


// Modal Filter Logic
function openFilterModal() {
  document.getElementById("filterModal").style.display = "flex";
}

function closeFilterModal() {
  document.getElementById("filterModal").style.display = "none";
}

function applyFilters() {
  const name = document.getElementById("filterName").value.toLowerCase();
  const dept = document.getElementById("filterDepartment").value.toLowerCase();
  const role = document.getElementById("filterRole").value.toLowerCase();

  const filtered = employees.filter(emp =>
    emp.name.toLowerCase().includes(name) &&
    emp.department.toLowerCase().includes(dept) &&
    emp.role.toLowerCase().includes(role)
  );

  displayEmployees(filtered);
  closeFilterModal();
}

function resetFilters() {
  document.getElementById("filterName").value = "";
  document.getElementById("filterDepartment").value = "";
  document.getElementById("filterRole").value = "";
  displayEmployees(employees);
}

// Search by name or email
document.getElementById("searchInput").addEventListener("input", function () {
  const value = this.value.toLowerCase();
  const filtered = employees.filter(emp =>
    emp.name.toLowerCase().includes(value) ||
    emp.email.toLowerCase().includes(value)
  );
  displayEmployees(filtered);
});
