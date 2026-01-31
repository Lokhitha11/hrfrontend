document.addEventListener("DOMContentLoaded", () => {
  const API_EMP = "http://localhost:5000/api/employees";
  const API_ATT = "http://localhost:5000/api/attendance";

  const dateInput = document.getElementById("attendanceDate");
  const loadBtn = document.getElementById("loadEmployeesBtn");
  const saveBtn = document.getElementById("saveAttendanceBtn");
  const tableBody = document.getElementById("attendanceTableBody");

  let employees = [];
  let attendanceRecords = [];

  // -------------------------
  // Utility: get day type
  // -------------------------
  function getDayType(dateStr) {
    const day = new Date(dateStr).getDay();
    return day === 0 ? "Sunday" : "Weekday"; // 0 = Sunday
  }

  // -------------------------
  // Load employees
  // -------------------------
  async function loadEmployees() {
    const selectedDate = dateInput.value;
    if (!selectedDate) return alert("Please select a date first!");

    try {
      const res = await fetch(API_EMP);
      if (!res.ok) throw new Error("Failed to fetch employees");
      employees = await res.json();

      // Load existing attendance for this date
      const attRes = await fetch(API_ATT);
      const allAttendance = await attRes.json();
      attendanceRecords = allAttendance.filter(a => a.date === selectedDate);

      renderTable(selectedDate);
    } catch (err) {
      console.error(err);
      alert("Error loading employees: " + err.message);
    }
  }

  // -------------------------
  // Render table
  // -------------------------
  function renderTable(date) {
    tableBody.innerHTML = "";
    employees.forEach((emp, idx) => {
      // Check if attendance exists for this emp & date
      const record = attendanceRecords.find(a => a.empId === emp.id) || {};

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${idx + 1}</td>
        <td>${emp.name}</td>
        <td>
          <select class="statusSelect">
            <option value="Present" ${record.status === "Present" ? "selected" : ""}>Present</option>
            <option value="Absent" ${record.status === "Absent" ? "selected" : ""}>Absent</option>
          </select>
        </td>
        <td>
          <input type="number" min="0" class="overtimeInput" value="${record.overtimeHours || 0}" />
        </td>
      `;
      row.dataset.empId = emp.id;
      tableBody.appendChild(row);
    });
  }

  // -------------------------
  // Save attendance
  // -------------------------
  saveBtn.addEventListener("click", async () => {
    const selectedDate = dateInput.value;
    if (!selectedDate) return alert("Please select a date first!");

    const rows = tableBody.querySelectorAll("tr");
    const dataToSave = [];

    rows.forEach(row => {
      const empId = Number(row.dataset.empId);
      const name = row.children[1].textContent;
      const status = row.querySelector(".statusSelect").value;
      const overtimeHours = Number(row.querySelector(".overtimeInput").value || 0);
      const dayType = getDayType(selectedDate);

      dataToSave.push({
        empId,
        name,
        date: selectedDate,
        status,
        dayType,
        overtimeHours
      });
    });

    try {
      const res = await fetch(API_ATT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave)
      });

      if (!res.ok) throw new Error("Failed to save attendance");

      alert("Attendance saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving attendance: " + err.message);
    }
  });

  loadBtn.addEventListener("click", loadEmployees);
});
