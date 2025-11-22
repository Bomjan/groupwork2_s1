const loginContainer = document.getElementById("loginContainer");
const registerContainer = document.getElementById("registerContainer");

const loginRadio = document.getElementById("loginRadio");
const registerRadio = document.getElementById("registerRadio");

// SWITCH TO LOGIN
function showLogin() {
  loginContainer.style.display = "flex";
  registerContainer.style.display = "none";
  loginRadio.checked = true;
}

// SWITCH TO REGISTER
function showRegister() {
  loginContainer.style.display = "none";
  registerContainer.style.display = "flex";
  registerRadio.checked = true;
}

// RADIO EVENTS
loginRadio.addEventListener("click", showLogin);
registerRadio.addEventListener("click", showRegister);

// ================= LOGIN VALIDATION =================
const Login = document.getElementById("login");

Login.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("emailLogin").value;
  const password = document.getElementById("passwordLogin").value;

  const msgEmail = document.querySelector(".msgEmail");
  const msgPassword = document.getElementById("msgPassword");

  msgEmail.textContent = "";
  msgPassword.textContent = "";

  document.getElementById("emailLogin").style.border = "1px solid #ccc";
  document.getElementById("passwordLogin").style.border = "1px solid #ccc";

  if (email === "") {
    msgEmail.textContent = "Email is required";
    msgEmail.style.color = "red";
    document.getElementById("emailLogin").style.border = "1px solid red";
    return;
  }

  if (password === "") {
    msgPassword.textContent = "Password is required";
    msgPassword.style.color = "red";
    document.getElementById("passwordLogin").style.border = "1px solid red";
    return;
  }

  alert("Login Successful!");
});
