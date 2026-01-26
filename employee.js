// employee.js

// Function to generate unique ID for each employee
function generateId() {
  return Date.now(); // simple unique id using timestamp
}

// Handle form submission
document.getElementById("employeeForm").addEventListener("submit", function (e) {
  e.preventDefault(); // prevent page refresh

  // Get all form values
  const form = e.target;
  const employee = {
    id: generateId(),
    name: form.name.value,
    email: form.email.value,
    gender: form.gender.value,
    designation: form.designation.value,
    department: form.department.value,
    originCountry: form.originCountry.value,
    dob: form.dob.value,
    fatherName: form.fatherName.value,
    contact: form.contact.value,
    residentialAddress: form.residentialaddress.value,
    permanentAddress: form.permanentAddress.value,
    doj: form.doj.value,
    visaNumber: form.visaNumber.value,
    passportNumber: form.passportNumber.value,
    status: form.status.value,
    salary: form.salary.value,
    // For now, we store file names, actual file upload is skipped
    visaCopy: form.visaCopy.value.split("\\").pop(),
    passportCopy: form.passportCopy.value.split("\\").pop(),
    photo: form.photo.value.split("\\").pop()
  };

  // Get existing employees from localStorage
  const employees = JSON.parse(localStorage.getItem("employees")) || [];

  // Add new employee
  employees.push(employee);

  // Save back to localStorage
  localStorage.setItem("employees", JSON.stringify(employees));

  alert("Employee saved successfully!");

  // Optional: Reset the form
  form.reset();
});
