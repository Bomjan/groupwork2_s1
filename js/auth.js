class FormValidator {
  constructor() {
    this.loginForm = document.getElementById("loginForm");
    this.registerForm = document.getElementById("registerForm");
    this.loginContainer = document.querySelector(".login");
    this.registerContainer = document.querySelector(".register-page");

    this.forgotForm = document.getElementById("forgotForm");
    this.forgotContainer = document.querySelector(".forgot-password");

    // Load users from localStorage or use mock data
    const storedUsers = localStorage.getItem("allUsers");
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    } else {
      this.users = [
        {
          username: "admin",
          email: "admin@example.com",
          password: "admin123",
          role: "admin",
        },
        {
          username: "staff1",
          email: "staff1@example.com",
          password: "staff123",
          role: "staff",
        },
        {
          username: "staff2",
          email: "staff2@example.com",
          password: "staff123",
          role: "staff",
        },
      ];
      // Save initial mock data to localStorage
      localStorage.setItem("allUsers", JSON.stringify(this.users));
    }

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.logAvailableUsers();
  }

  setupEventListeners() {
    if (this.loginForm) {
      this.loginForm.addEventListener("submit", (e) =>
        this.handleLoginSubmit(e)
      );
      this.attachInputListeners(this.loginForm);
    }

    if (this.registerForm) {
      this.registerForm.addEventListener("submit", (e) =>
        this.handleRegisterSubmit(e)
      );
      this.attachInputListeners(this.registerForm);
    }

    if (this.forgotForm) {
      this.forgotForm.addEventListener("submit", (e) =>
        this.handleForgotSubmit(e)
      );
      this.attachInputListeners(this.forgotForm);
    }
  }

  attachInputListeners(form) {
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("focus", () => this.clearError(input));
      input.addEventListener("input", () => this.validateField(input));
    });
  }

  switchToRegister() {
    this.loginContainer.classList.add("hidden");
    this.registerContainer.classList.remove("hidden");
    this.forgotContainer.classList.add("hidden");
  }

  switchToLogin() {
    this.registerContainer.classList.add("hidden");
    this.loginContainer.classList.remove("hidden");
    this.forgotContainer.classList.add("hidden");
  }

  showForgotPassword() {
    this.loginContainer.classList.add("hidden");
    this.registerContainer.classList.add("hidden");
    this.forgotContainer.classList.remove("hidden");
  }

  handleLoginSubmit(e) {
    e.preventDefault();

    const email = document.getElementById("emailLogin");
    const password = document.getElementById("passwordLogin");

    this.clearAllErrors(this.loginForm);

    if (!this.validateLogin(email, password)) {
      return;
    }

    // Find user by email and password
    const user = this.users.find(
      (u) => u.email === email.value && u.password === password.value
    );

    if (!user) {
      this.showError(email, "Invalid email or password");
      return;
    }

    // Store user data in localStorage
    localStorage.setItem("currentUser", JSON.stringify(user));

    this.showSuccess(`Welcome ${user.username}! Redirecting...`);
    setTimeout(() => {
      // Redirect based on role
      if (user.role === "admin") {
        window.location.href = "admin/admin.html";
      } else if (user.role === "staff") {
        window.location.href = "admin/staffs.html";
      } else {
        // Default redirect for normal users
        window.location.href = "index.html";
      }
    }, 1500);
  }

  handleRegisterSubmit(e) {
    e.preventDefault();

    const email = document.getElementById("emailRegister");
    const username = document.getElementById("usernameRegister");
    const password = document.getElementById("passwordRegister");
    const confirmPassword = document.getElementById("confirmPassword");
    const termsCheckbox = document.getElementById("termsCheckbox");

    this.clearAllErrors(this.registerForm);

    if (
      !this.validateRegister(
        email,
        username,
        password,
        confirmPassword,
        termsCheckbox
      )
    ) {
      return;
    }

    // Check if user already exists
    if (this.users.some((u) => u.email === email.value)) {
      this.showError(email, "Email already registered");
      return;
    }

    if (this.users.some((u) => u.username === username.value)) {
      this.showError(username, "Username already taken");
      return;
    }

    // Create new user with user role by default
    const newUser = {
      username: username.value,
      email: email.value,
      password: password.value,
      role: "user",
    };

    this.users.push(newUser);

    // Store in localStorage
    localStorage.setItem("allUsers", JSON.stringify(this.users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    this.showSuccess("Account created successfully! Redirecting...");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  }

  handleForgotSubmit(e) {
    e.preventDefault();
    const email = document.getElementById("emailForgot");
    this.clearAllErrors(this.forgotForm);

    if (!email.value.trim()) {
      this.showError(email, "Email is required");
      return;
    } else if (!this.isValidEmail(email.value)) {
      this.showError(email, "Please enter a valid email");
      return;
    }

    // Simulate sending email
    this.showSuccess("Reset link sent to your email!");
    setTimeout(() => {
      this.switchToLogin();
    }, 2000);
  }

  validateLogin(email, password) {
    let isValid = true;

    if (!email.value.trim()) {
      this.showError(email, "Email is required");
      isValid = false;
    } else if (!this.isValidEmail(email.value)) {
      this.showError(email, "Please enter a valid email");
      isValid = false;
    }

    if (!password.value.trim()) {
      this.showError(password, "Password is required");
      isValid = false;
    } else if (password.value.length < 6) {
      this.showError(password, "Password must be at least 6 characters");
      isValid = false;
    }

    return isValid;
  }

  validateRegister(email, username, password, confirmPassword, terms) {
    let isValid = true;

    if (!email.value.trim()) {
      this.showError(email, "Email is required");
      isValid = false;
    } else if (!this.isValidEmail(email.value)) {
      this.showError(email, "Please enter a valid email");
      isValid = false;
    }

    if (!username.value.trim()) {
      this.showError(username, "Username is required");
      isValid = false;
    } else if (username.value.length < 3) {
      this.showError(username, "Username must be at least 3 characters");
      isValid = false;
    }

    if (!password.value.trim()) {
      this.showError(password, "Password is required");
      isValid = false;
    } else if (password.value.length < 6) {
      this.showError(password, "Password must be at least 6 characters");
      isValid = false;
    }

    if (confirmPassword.value !== password.value) {
      this.showError(confirmPassword, "Passwords do not match");
      isValid = false;
    }

    if (!terms.checked) {
      this.showError(terms, "You must agree to the terms and conditions");
      isValid = false;
    }

    return isValid;
  }

  validateField(input) {
    const value = input.value.trim();
    const type = input.type;
    const id = input.id;

    if (!value) {
      return true;
    }

    if (type === "email" && !this.isValidEmail(value)) {
      this.showError(input, "Invalid email format");
      return false;
    }

    if (
      (id === "passwordRegister" || id === "passwordLogin") &&
      value.length < 6
    ) {
      this.showError(input, "Password must be at least 6 characters");
      return false;
    }

    if (id === "usernameRegister" && value.length < 3) {
      this.showError(input, "Username must be at least 3 characters");
      return false;
    }

    this.clearError(input);
    return true;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showError(input, message) {
    const wrapper = input.parentElement;
    let errorMsg = wrapper.querySelector(".error-message");

    if (!errorMsg) {
      errorMsg = document.createElement("span");
      errorMsg.className = "error-message";
      wrapper.appendChild(errorMsg);
    }

    errorMsg.textContent = message;
    input.style.borderColor = "#dc2626";
    input.style.backgroundColor = "rgba(220, 38, 38, 0.05)";
  }

  clearError(input) {
    const wrapper = input.parentElement;
    const errorMsg = wrapper.querySelector(".error-message");

    if (errorMsg) {
      errorMsg.remove();
    }

    input.style.borderColor = "rgba(10, 30, 20, 0.1)";
    input.style.backgroundColor =
      "linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(251, 255, 249, 0.8))";
  }

  clearAllErrors(form) {
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => this.clearError(input));
  }

  showSuccess(message) {
    const toast = document.createElement("div");
    toast.className = "toast success";
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("show");
    }, 100);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  logAvailableUsers() {
    console.log("Available Users for Login:");
    console.log("==========================");
    this.users.forEach((user) => {
      console.log(
        `Username: ${user.username} | Email: ${user.email} | Password: ${user.password} | Role: ${user.role}`
      );
    });
  }
}

// Global functions for HTML onclick
function switchToRegister() {
  validator.switchToRegister();
}

function switchToLogin() {
  validator.switchToLogin();
}

function showForgotPassword() {
  validator.showForgotPassword();
}

// Initialize when DOM is ready
let validator;
document.addEventListener("DOMContentLoaded", () => {
  validator = new FormValidator();
});
