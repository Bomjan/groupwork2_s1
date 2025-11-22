(() => {
  // get user data from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  // if no user, redirect to form
  if (!currentUser) {
    window.location.href = "/form.html";
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
      window.location.href = "/form.html";
    });
  }
})();
