// ==========================
// Payroll JS
// ==========================

// Get payroll table body and total payroll element
const payrollTable = document.getElementById("payrollTable");
const totalPayrollEl = document.getElementById("totalPayroll");

// Load employees from localStorage
let employees = JSON.parse(localStorage.getItem("employees")) || [];

// Clear table
payrollTable.innerHTML = "";

let totalPayroll = 0;

employees.forEach(emp => {
  // Default allowances and deductions (for now)
  const basic = Number(emp.salary) || 0;
  const overtime = Number(emp.overtime || 0);
  const deductions = Number(emp.deductions || 0);
  const netPay = basic + overtime - deductions;

  totalPayroll += netPay;

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${emp.name}</td>
    <td>₹${basic.toLocaleString()}</td>
    <td>₹${overtime.toLocaleString()}</td>
    <td>₹${deductions.toLocaleString()}</td>
    <td>₹${netPay.toLocaleString()}</td>
  `;
  payrollTable.appendChild(row);
});

// Update total payroll
totalPayrollEl.textContent = totalPayroll.toLocaleString();
