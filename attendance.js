document.addEventListener("DOMContentLoaded", async () => {

  const API_EMP = "http://localhost:5000/api/employees";
  const API_ATT = "http://localhost:5000/api/attendance";

  const tableBody = document.getElementById("attendanceTable");
  const saveBtn = document.getElementById("saveAttendance");
  const dateInput = document.getElementById("attendanceDate");

  if (!tableBody || !saveBtn || !dateInput) {
    console.error("Attendance elements missing!");
    return;
  }

  let employees = [];
  let attendance = [];

  // -------------------------
  // Default date = today
  // -------------------------
  const today = new Date().toISOString().slice(0, 10);
  dateInput.value = today;

  // -------------------------
  // Load employees
  // -------------------------
  async function loadEmployees() {
    const res = await fetch(API_EMP);
    employees = await res.json();
  }

  // -------------------------
  // Load attendance
  // -------------------------
  async function loadAttendance() {
    const res = await fetch(API_ATT);
    attendance = await res.json();
  }

  // -------------------------
  // Render table
  // -------------------------
  function renderTable() {
    tableBody.innerHTML = "";
    const selectedDate = dateInput.value;

    employees.forEach(emp => {
      const record = attendance.find(
        a => a.empId === emp.id && a.date === selectedDate
      );

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${emp.id}</td>
        <td>${emp.name}</td>
        <td>
          <select data-id="${emp.id}">
            <option value="">Select</option>
            <option value="Present" ${record?.status === "Present" ? "selected" : ""}>Present</option>
            <option value="Absent" ${record?.status === "Absent" ? "selected" : ""}>Absent</option>
         
          </select>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  // -------------------------
  // Save attendance
  // -------------------------
  saveBtn.addEventListener("click", async () => {
    const selectedDate = dateInput.value;
    const selects = document.querySelectorAll("select[data-id]");
    const records = [];

    selects.forEach(sel => {
      if (!sel.value) return;
      records.push({
        empId: parseInt(sel.dataset.id),
        date: selectedDate,
        status: sel.value
      });
    });

    if (!records.length) {
      alert("No attendance selected");
      return;
    }

    const res = await fetch(API_ATT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(records)
    });

    if (!res.ok) {
      alert("Failed to save attendance");
      return;
    }

    alert("Attendance saved!");
    await loadAttendance();
  });

  // -------------------------
  // Change date → reload
  // -------------------------
  dateInput.addEventListener("change", renderTable);

  // -------------------------
  // Initial load
  // -------------------------
  await loadEmployees();
  await loadAttendance();
  renderTable();
});
