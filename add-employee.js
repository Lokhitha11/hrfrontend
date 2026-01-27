document.addEventListener("DOMContentLoaded", () => {

  const API_BASE = "http://localhost:5000/api/employees";
  const form = document.getElementById("employeeForm");

  if (!form) {
    console.error("Form not found (#employeeForm)");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // 🚫 stop browser refresh

    const formData = new FormData(form);

    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        throw new Error("Backend error while adding employee");
      }

      const savedEmployee = await res.json();

      // store ID for profile page
      localStorage.setItem("selectedEmployeeId", savedEmployee.id);

      // 🔥 REDIRECT (this WILL work now)
      window.location.replace("employee-profile.html");

    } catch (err) {
      console.error(err);
      alert("Error adding employee");
    }
  });

});
