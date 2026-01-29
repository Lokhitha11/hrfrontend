/*******************************
 * Add Employee JS (Backend-ready)
 *******************************/

document.addEventListener("DOMContentLoaded", () => {

  const API_BASE = "http://localhost:5000/api/employees";
  const form = document.getElementById("employeeForm");
  const addBtn = document.querySelector(".add-btn");

  if (!addBtn) {
    console.error("Add button not found (.add-btn)");
    return;
  }

  addBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        const text = await res.text(); // get error HTML if any
        throw new Error(text || "Failed to add employee");
      }

      const savedEmployee = await res.json();

      // store employee id for profile page
      localStorage.setItem("selectedEmployeeId", savedEmployee.id);

      alert("Employee added successfully!");

      // redirect to profile
      window.location.href = "employee-profile.html";

    } catch (err) {
      console.error(err);
      alert("Error adding employee: " + err.message);
    }
  });

});
