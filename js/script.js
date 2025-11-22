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

  // You can do anything with this data bro
  // console.log(data);
  this.reset();
  $("success").textContent =
    "Your message has been sent successfully, thank you for reaching us";

  setTimeout(() => {
    $("success").textContent = "";
  }, 3000);
});

// Set current year in footer, always the correct year
document.getElementById("year").textContent = new Date().getFullYear();
