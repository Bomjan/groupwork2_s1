(() => {
  // get user data from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  // if no user, redirect to form
  if (!currentUser) {
    window.location.href = "auth.html";
    return;
  }

  // extract user data with fallbacks
  const userName =
    currentUser.username || currentUser.email?.split("@")[0] || "User";
  const userEmail = currentUser.email || "—";
  const userRole = currentUser.role || "staff";
  const userPhone = currentUser.phone || "+975 12345678";
  const userAddress = currentUser.address || "Thimphu, Bhutan";
  const userDepartment = currentUser.department || "General";

  // set page title
  document.title = `${userName}'s Profile - InnovateGreen AI`;

  // populate UI
  document.getElementById("userName").textContent = userName;
  document.getElementById("userRole").textContent =
    userRole.charAt(0).toUpperCase() + userRole.slice(1);
  document.getElementById("userEmail").textContent = userEmail;
  document.getElementById("userPhone").textContent = userPhone;
  document.getElementById("userAddress").textContent = userAddress;
  document.getElementById("userDepartment").textContent = userDepartment;
  document.getElementById("userRoleDetail").textContent =
    userRole.charAt(0).toUpperCase() + userRole.slice(1);

  // set avatar initials
  const avatarEl = document.getElementById("avatarLarge");
  const initials = userName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  avatarEl.textContent = initials;

  // edit profile button
  const editBtn = document.getElementById("editBtn");
  if (editBtn) {
    editBtn.addEventListener("click", () => {
      alert("Edit profile feature coming soon!");
      // TODO: implement modal/page for editing profile
    });
  }

  // logout button
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "auth.html"; // updated redirect
    });
  }

  // Toggle Password Form
  const togglePassBtn = document.getElementById("togglePasswordBtn");
  const passForm = document.getElementById("passwordForm");
  if (togglePassBtn && passForm) {
    togglePassBtn.addEventListener("click", () => {
      passForm.classList.toggle("hidden");
    });
  }

  // Handle Password Change
  if (passForm) {
    passForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const current = document.getElementById("currentPass").value;
      const newP = document.getElementById("newPass").value;
      
      if (!current || !newP) return alert("Please fill all fields");
      if (current !== currentUser.password) return alert("Incorrect current password");
      
      // Update local storage
      currentUser.password = newP;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      
      // Also update the user in the 'users' array if we were simulating a real DB
      // For now, just updating the session user is enough for the demo
      
      alert("Password updated successfully!");
      passForm.reset();
      passForm.classList.add("hidden");
    });
  }

  // Handle Resignation
  const resignBtn = document.getElementById("resignBtn");
  if (resignBtn) {
    resignBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to resign? This action cannot be undone.")) {
        alert("Resignation request submitted to HR. We are sorry to see you go.");
        // In a real app, this would send a request to the server
      }
    });
  }
})();
