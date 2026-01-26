document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");

  loginBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    // Dummy login success
    localStorage.setItem("loggedInUser", username);

    // Redirect to dashboard
    window.location.href = "index.html";
  });
});
