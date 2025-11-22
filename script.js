// utility function
const $ = (id) => document.getElementById(id);

// Form Handling, it does absolutely nothing but console.log() ToT
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const data = {
    name: $("name").value,
    email: $("email").value,
    message: $("message").value,
  };
  console.log(data);
  this.reset();
});

// Set current year in footer, always the correct year
document.getElementById("year").textContent = new Date().getFullYear();
