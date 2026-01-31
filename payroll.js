document.addEventListener("DOMContentLoaded", async () => {
  const API_PAYROLL = "http://localhost:5000/api/payroll";
  const tableBody = document.getElementById("payrollTableBody");

  try {
    const res = await fetch(API_PAYROLL);
    if (!res.ok) throw new Error("Failed to fetch payroll");
    const payroll = await res.json();

    tableBody.innerHTML = "";

    payroll.forEach((emp, idx) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${idx + 1}</td>
        <td>${emp.name}</td>
        <td>${emp.basicSalary}</td>
        <td>${emp.absentDays}</td>
        <td>${emp.absentDeduction}</td>
        <td>${emp.overtimeAmount}</td>
        <td>${emp.finalSalary}</td>
      `;
      tableBody.appendChild(row);
    });

  } catch (err) {
    console.error(err);
    tableBody.innerHTML = `<tr><td colspan="7">Error loading payroll: ${err.message}</td></tr>`;
  }
});
