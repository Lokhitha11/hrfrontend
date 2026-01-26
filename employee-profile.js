/*******************************
 * Employee Profile JS (Final, Backend-ready)
 *******************************/

const empId = parseInt(localStorage.getItem("selectedEmployeeId"));
if (!empId) throw new Error("No employee selected");

const API_BASE = "http://localhost:5000/api/employees";
let emp = {};

// -------------------------
// Helper to open PDF/Image
// -------------------------
function openDocument(base64) {
  if (!base64) return alert("No document uploaded");
  const win = window.open("");
  win.document.write(`<iframe src="${base64}" style="width:100%; height:100vh; border:none;"></iframe>`);
}

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
    empID.value = emp.id;
    empDesignation.value = emp.designation || "";
    empDepartment.value = emp.department || "";
    empDOJ.value = emp.doj || "";
    empStatus.value = emp.status || "";

    // DOCUMENTS
    empPassportNum.value = emp.passportNumber || "";
    empVisaNum.value = emp.visaNumber || "";
    empPhoto.src = emp.photo || "";

    empPassportCopy.textContent = emp.passportCopy ? "View Passport" : "No Passport";
    empPassportCopy.onclick = e => { e.preventDefault(); openDocument(emp.passportCopy); };

    empVisaCopy.textContent = emp.visaCopy ? "View Visa" : "No Visa";
    empVisaCopy.onclick = e => { e.preventDefault(); openDocument(emp.visaCopy); };

    empContractLink.textContent = emp.contract ? "View Contract" : "No Contract";
    empContractLink.onclick = e => { e.preventDefault(); openDocument(emp.contract); };

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
    alert("Error loading employee: " + err.message);
    console.error(err);
  }
}

// -------------------------
// Overtime toggle
// -------------------------
empOvertimeEligible.addEventListener("change", () => {
  toggleOvertimeInput(empOvertimeEligible.value);
});
function toggleOvertimeInput(value) {
  empOvertimeHours.style.display = value === "Yes" ? "block" : "none";
  if (value !== "Yes") empOvertimeHours.value = "";
}

// -------------------------
// Save changes
// -------------------------
document.querySelector(".save-btn").addEventListener("click", () => {
  // Update emp object
  emp.name = empName.value;
  emp.fatherName = empFather.value;
  emp.dob = empDOB.value;
  emp.gender = empGender.value;
  emp.originCountry = empOrigin.value;
  emp.email = empEmail.value;
  emp.contact = empContact.value;
  emp.residentialAddress = empAddress.value;

  emp.designation = empDesignation.value;
  emp.department = empDepartment.value;
  emp.doj = empDOJ.value;
  emp.status = empStatus.value;

  emp.passportNumber = empPassportNum.value;
  emp.visaNumber = empVisaNum.value;

  emp.salary = empSalary.value;
  emp.transport = empTransport.value;
  emp.food = empFood.value;
  empStay.value = empStay.value;
  emp.overtimeEligible = empOvertimeEligible.value;
  emp.overtimeHours = empOvertimeHours.value;
  emp.airticketEligible = empAirticketEligible.value;
  emp.incentiveEligible = empIncentiveEligible.value;

  // File uploads
  const files = [
    { input: empPhotoInput, key: "photo" },
    { input: empContractInput, key: "contract" },
    { input: empPassportCopyInput, key: "passportCopy" },
    { input: empVisaCopyInput, key: "visaCopy" }
  ];

  let filesPending = 0;

  function sendUpdate() {
    fetch(`${API_BASE}/${empId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emp)
    })
      .then(res => res.json())
      .then(() => alert("Employee updated successfully!"))
      .catch(err => console.error(err));
  }

  files.forEach(f => {
    if (f.input && f.input.files.length > 0) {
      filesPending++;
      const reader = new FileReader();
      reader.onload = () => { emp[f.key] = reader.result; if (--filesPending === 0) sendUpdate(); };
      reader.readAsDataURL(f.input.files[0]);
    }
  });

  if (filesPending === 0) sendUpdate();
});

// -------------------------
// Initial load
// -------------------------
loadEmployee();
