document.addEventListener("DOMContentLoaded", () => {
  // Load employees from localStorage
  const employees = JSON.parse(localStorage.getItem("employees")) || [];

  // Calculate totals
  const total = employees.length;
  const active = employees.filter(e => e.status === "Active").length;
  const onLeave = employees.filter(e => e.status === "On Leave").length;

  // Update header cards
  document.getElementById("totalEmployeesCard").textContent = total;
  document.getElementById("activeEmployeesCard").textContent = active;
  document.getElementById("onLeaveEmployeesCard").textContent = onLeave;

  // Update section cards
  document.getElementById("totalEmployeesSection").textContent = total;

  // Today's attendance = Active employees
  document.getElementById("todayAttendance").textContent = active;

  // Total Payroll = sum of all employee salaries
  const totalPayroll = employees.reduce((sum, emp) => sum + Number(emp.salary || 0), 0);
  document.getElementById("totalPayroll").textContent = totalPayroll;
});
