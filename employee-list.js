/*******************************
 * Employee List JS (Backend Connected)
 *******************************/

const API_BASE = "http://localhost:5000/api/employees";

const tableBody = document.getElementById("employeeTable");
const searchInput = document.getElementById("searchEmp");

let employees = [];

/* -------------------------
   Load employees from backend
------------------------- */
async function loadEmployees() {
  try {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error("Failed to fetch employees");
    employees = await res.json();
    renderEmployees(employees);
  } catch (err) {
    console.error(err);
    alert("Error loading employees");
  }
}

/* -------------------------
   Render table
------------------------- */
function renderEmployees(list) {
  tableBody.innerHTML = "";

  list.forEach(emp => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${emp.id}</td>
      <td class="emp-name" data-id="${emp.id}"
          style="cursor:pointer; color:blue; text-decoration:underline;">
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

/* -------------------------
   Click events
------------------------- */
document.addEventListener("click", async (e) => {
  const target = e.target;

  /* Open employee profile */
  if (target.classList.contains("emp-name")) {
    const empId = target.dataset.id;
    localStorage.setItem("selectedEmployeeId", empId);
    window.location.href = "employee-profile.html";
  }

  /* Update status */
  if (target.classList.contains("mark-status")) {
    const id = target.dataset.id;
    const status = target.dataset.status;

    try {
      await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      loadEmployees();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  }

  /* Delete employee */
  if (target.classList.contains("delete-emp")) {
    const id = target.dataset.id;

    if (!confirm("Delete this employee?")) return;

    try {
      await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      loadEmployees();
    } catch (err) {
      console.error(err);
      alert("Failed to delete employee");
    }
  }
});

/* -------------------------
   Search
------------------------- */
searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  const filtered = employees.filter(emp =>
    emp.name.toLowerCase().includes(term)
  );
  renderEmployees(filtered);
});

/* -------------------------
   Initial load
------------------------- */
loadEmployees();
