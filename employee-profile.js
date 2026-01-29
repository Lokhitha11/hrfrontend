/*******************************
 * Employee Profile JS (Backend-ready)
 *******************************/

document.addEventListener("DOMContentLoaded", () => {

  const API_BASE = "http://localhost:5000/api/employees";

  // Get selected employee ID from localStorage
  const empId = localStorage.getItem("selectedEmployeeId");
  if (!empId) {
    alert("No employee selected. Go to Employee List.");
    return;
  }

  // Employee object placeholder
  let emp = {};

  // DOM elements
  const empName = document.getElementById("empName");
  const empFather = document.getElementById("empFather");
  const empDOB = document.getElementById("empDOB");
  const empGender = document.getElementById("empGender");
  const empOrigin = document.getElementById("empOrigin");
  const empEmail = document.getElementById("empEmail");
  const empContact = document.getElementById("empContact");
  const empAddress = document.getElementById("empAddress");

  const empID = document.getElementById("empID");
  const empDesignation = document.getElementById("empDesignation");
  const empDepartment = document.getElementById("empDepartment");
  const empDOJ = document.getElementById("empDOJ");
  const empStatus = document.getElementById("empStatus");

  const empPassportNum = document.getElementById("empPassportNum");
  const empVisaNum = document.getElementById("empVisaNum");
  const empPhoto = document.getElementById("empPhoto");
  const empPassportCopy = document.getElementById("empPassportCopy");
  const empVisaCopy = document.getElementById("empVisaCopy");
  const empContractLink = document.getElementById("empContractLink");

  const empSalary = document.getElementById("empSalary");
  const empTransport = document.getElementById("empTransport");
  const empFood = document.getElementById("empFood");
  const empStay = document.getElementById("empStay");
  const empOvertimeEligible = document.getElementById("empOvertimeEligible");
  const empOvertimeHours = document.getElementById("empOvertimeHours");
  const empAirticketEligible = document.getElementById("empAirticketEligible");
  const empIncentiveEligible = document.getElementById("empIncentiveEligible");

  // -------------------------
  // Toggle Overtime Input
  // -------------------------
  function toggleOvertimeInput(value) {
    empOvertimeHours.style.display = value === "Yes" ? "block" : "none";
    if (value !== "Yes") empOvertimeHours.value = "";
  }

  empOvertimeEligible.addEventListener("change", function () {
    toggleOvertimeInput(this.value);
  });

  // -------------------------
  // Load employee from backend
  // -------------------------
  async function loadEmployee() {
    try {
      const res = await fetch(`${API_BASE}/${empId}`);
      if (!res.ok) throw new Error("Failed to fetch employee");

      emp = await res.json();

      // PERSONAL
      empName.value = emp.name || "";
      empFather.value = emp.fatherName || "";
      empDOB.value = emp.dob || "";
      empGender.value = emp.gender || "";
      empOrigin.value = emp.originCountry || "";
      empEmail.value = emp.email || "";
      empContact.value = emp.contact || "";
      empAddress.value = emp.residentialAddress || "";

      // EMPLOYMENT
      empID.value = emp.id || "";
      empDesignation.value = emp.designation || "";
      empDepartment.value = emp.department || "";
      empDOJ.value = emp.doj || "";
      empStatus.value = emp.status || "";

      // DOCUMENTS — Use server path
      const baseURL = "http://localhost:5000/uploads/";

      empPassportNum.value = emp.passportNumber || "";
      empVisaNum.value = emp.visaNumber || "";
      empPhoto.src = emp.photo ? `${baseURL}${emp.photo}` : "";

      empPassportCopy.textContent = emp.passportCopy ? "View Passport" : "No Passport";
      empPassportCopy.onclick = () => {
        if (emp.passportCopy) window.open(`${baseURL}${emp.passportCopy}`, "_blank");
      };

      empVisaCopy.textContent = emp.visaCopy ? "View Visa" : "No Visa";
      empVisaCopy.onclick = () => {
        if (emp.visaCopy) window.open(`${baseURL}${emp.visaCopy}`, "_blank");
      };

      empContractLink.textContent = emp.contract ? "View Contract" : "No Contract";
      empContractLink.onclick = () => {
        if (emp.contract) window.open(`${baseURL}${emp.contract}`, "_blank");
      };

      // SALARY
      empSalary.value = emp.salary || "";
      empTransport.value = emp.transport || "";
      empFood.value = emp.food || "";
      empStay.value = emp.stay || "";
      empOvertimeEligible.value = emp.overtimeEligible || "No";
      empOvertimeHours.value = emp.overtimeHours || "";
      empAirticketEligible.value = emp.airticketEligible || "No";
      empIncentiveEligible.value = emp.incentiveEligible || "No";

      toggleOvertimeInput(emp.overtimeEligible || "No");

    } catch (err) {
      console.error(err);
      alert("Error loading employee: " + err.message);
    }
  }

  // -------------------------
  // Save employee changes
  // -------------------------
  document.querySelector(".save-btn").addEventListener("click", async () => {
    try {
      const res = await fetch(`${API_BASE}/${empId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emp)
      });

      if (!res.ok) throw new Error("Failed to update employee");

      const updated = await res.json();
      alert(`Employee "${updated.name}" updated successfully!`);
    } catch (err) {
      console.error(err);
      alert("Error saving employee: " + err.message);
    }
  });

  // -------------------------
  // Initial load
  // -------------------------
  loadEmployee();

});
