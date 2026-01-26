/*******************************
 * Employee List JS (With Delete & Status)
 *******************************/

// Get table body
const tableBody = document.getElementById("employeeTable");

// Load employees
let employees = JSON.parse(localStorage.getItem("employees")) || [];

/*******************************
 * Render Employees Table
 *******************************/
function renderEmployees() {
  tableBody.innerHTML = "";

  employees.forEach(emp => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${emp.id}</td>
      <td class="emp-name" data-id="${emp.id}" style="cursor:pointer; color:blue; text-decoration:underline;">
          ${emp.name}
      </td>
      <td>${emp.department || ""}</td>
      <td>${emp.designation || ""}</td>
      <td>${emp.status || ""}</td>
      <td>
        <button class="mark-status" data-id="${emp.id}" data-status="Active">Active</button>
        <button class="mark-status" data-id="${emp.id}" data-status="On Leave">On Leave</button>
        <button class="delete-emp" data-id="${emp.id}" style="color:red;">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });

  // Update dashboard after rendering
  if (window.updateDashboard) updateDashboard();
}

// Initial render
renderEmployees();

/*******************************
 * Click Event Handling
 *******************************/
document.addEventListener("click", function (e) {
  const target = e.target;

  // Open employee profile
  if (target.classList.contains("emp-name")) {
    const empId = target.getAttribute("data-id");
    localStorage.setItem("selectedEmployeeId", empId);
    window.location.href = "employee-profile.html";
  }

  // Mark Active / On Leave
  if (target.classList.contains("mark-status")) {
    const id = target.getAttribute("data-id");
    const status = target.getAttribute("data-status");

    const emp = employees.find(emp => emp.id == id);
    if (emp) {
      emp.status = status;
      localStorage.setItem("employees", JSON.stringify(employees));
      renderEmployees();
    }
  }

  // DELETE employee
  if (target.classList.contains("delete-emp")) {
    const id = target.getAttribute("data-id");

    const confirmDelete = confirm("Are you sure you want to delete this employee?");
    if (confirmDelete) {
      employees = employees.filter(emp => emp.id != id);
      localStorage.setItem("employees", JSON.stringify(employees));
      renderEmployees();
    }
  }
});

// -------------------------
// Search Employees
// -------------------------
const searchInput = document.getElementById("searchEmp");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = employees.filter(emp => emp.name.toLowerCase().includes(searchTerm));
    renderFilteredEmployees(filtered);
  });
}

function renderFilteredEmployees(list) {
  tableBody.innerHTML = "";

  list.forEach(emp => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${emp.id}</td>
      <td class="emp-name" data-id="${emp.id}" style="cursor:pointer; color:blue; text-decoration:underline;">
          ${emp.name}
      </td>
      <td>${emp.department || ""}</td>
      <td>${emp.designation || ""}</td>
      <td>${emp.status || ""}</td>
      <td>
        <button class="mark-status" data-id="${emp.id}" data-status="Active">Active</button>
        <button class="mark-status" data-id="${emp.id}" data-status="On Leave">On Leave</button>
        <button class="delete-emp" data-id="${emp.id}" style="color:red;">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}
