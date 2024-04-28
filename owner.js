const loginForm = document.getElementById("loginForm");
const dashboard = document.getElementById("dashboard");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  // Check username and password (dummy validation)
  if (username === "admin" && password === "password") {
    showDashboard();
  } else {
    alert("Invalid username or password. Please try again.");
  }
});

function showDashboard() {
  loginForm.style.display = "none";
  dashboard.style.display = "block";
  displayReports();
}

function displayReports() {
  // Dummy reports (replace with actual data)
  const reports = [
    "Total Members: 100",
    "New Signups Today: 5",
    "Revenue This Month: $5000",
    "Most Popular Class: Yoga",
    "Equipment Usage: Treadmills - 80%, Weight Machines - 60%, Dumbbells - 70%",
  ];
  const reportElement = document.getElementById("report");
  reports.forEach((report) => {
    const p = document.createElement("p");
    p.textContent = report;
    reportElement.appendChild(p);
  });
}

function logout() {
  loginForm.reset();
  loginForm.style.display = "block";
  dashboard.style.display = "none";
  clearReports();
}

function clearReports() {
  const reportElement = document.getElementById("report");
  reportElement.innerHTML = ""; // Clear reports
}
