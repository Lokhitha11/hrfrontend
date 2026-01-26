// ==========================
// Add Employee JS (with image handling)
// ==========================

const employeeForm = document.getElementById("employeeForm");

// Load existing employees from localStorage or start empty
let employees = JSON.parse(localStorage.getItem("employees")) || [];

// Helper function to read file as Base64
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve("");
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Handle form submission
employeeForm.addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = new FormData(employeeForm);

  // Read images as Base64
  const photoData = await readFileAsDataURL(formData.get("empphoto"));
  const contractData = await readFileAsDataURL(formData.get("empcontract"));
  const visaData = await readFileAsDataURL(formData.get("visaCopy"));
  const passportData = await readFileAsDataURL(formData.get("passportCopy"));

  // Create employee object
  const newEmployee = {
    id: employees.length + 1,
    name: formData.get("name"),
    email: formData.get("email"),
    gender: formData.get("gender"),
    designation: formData.get("designation"),
    department: formData.get("department"),
    originCountry: formData.get("originCountry"),
    dob: formData.get("dob"),
    fatherName: formData.get("fatherName"),
    contact: formData.get("contact"),
    residentialAddress: formData.get("residentialAddress"),
    permanentAddress: formData.get("permanentAddress"),
    doj: formData.get("doj"),
    visaNumber: formData.get("visaNumber"),
    visaCopy: visaData,
    passportNumber: formData.get("passportNumber"),
    passportCopy: passportData,
    photo: photoData,
    contract: contractData,
    salary: formData.get("salary"),
    status: formData.get("status") || "Active"
  };

  // Add to array and save
  employees.push(newEmployee);
  localStorage.setItem("employees", JSON.stringify(employees));

  // Reset form
  employeeForm.reset();

  // Redirect to employee list
  alert("Employee added successfully!");
  window.location.href = "employee-list.html";
});
