// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// FAQ toggle functionality
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const item = question.parentElement;
    item.classList.toggle("active");
  });
});

// Form submissions
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you! Your message has been received.");
  this.reset();
});

document.getElementById("hrForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Your HR inquiry has been submitted. We will get back to you soon.");
  this.reset();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });

      // Update active nav link
      document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
        link.classList.remove("active");
      });
      this.classList.add("active");
    }
  });
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});

// Dashboard statistics animation
function animateStats() {
  const statElements = document.querySelectorAll(".stat-number");
  statElements.forEach((stat) => {
    const targetValue = parseInt(stat.textContent);
    let currentValue = 0;
    const increment = targetValue / 50;
    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        stat.textContent = targetValue;
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(currentValue);
      }
    }, 30);
  });
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.id === "dashboard") {
        animateStats();
      }
      entry.target.classList.add("animate-in");
    }
  });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Add loading animation
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});

// Add CSS for animations
const style = document.createElement("style");
style.textContent = `
    .navbar-scrolled {
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    body:not(.loaded) * {
        transition: none !important;
    }
`;
document.head.appendChild(style);
/**
.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,–,C,C,C,C,–,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,$,H,C,–,!,Q,;,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,–,N,N,?,;,:,H,!,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,!,N,Q,O,>,>,C,?,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,>,Q,!,–,>,:,>,C,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,!,$,>,.,.,.,>,O,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,:,$,7,.,.,.,:,$,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,;,Q,7,–,!,–,>,Q,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,;,H,?,7,O,7,>,H,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,;,Q,?,!,>,–,:,H,;,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,;,N,?,–,;,!,–,O,–,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,;,H,7,;,;,7,–,C,:,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,;,>,C,$,Q,H,Q,Q,$,$,H,7,;,;,:,;,7,!,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,!,H,H,N,Q,H,N,H,N,N,N,Q,>,;,.,.,.,!,>,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,–,N,N,M,M,M,N,N,O,O,O,Q,$,>,;,.,.,.,!,7,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,>,M,M,Q,C,?,?,?,:,–,–,:,H,>,.,.,.,.,:,?,;,–,;,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,7,Q,$,?,>,:,:,:,?,–,;,:,M,7,;,;,!,;,!,M,N,H,Q,O,:,–,7,C,7,;,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,>,Q,7,–,;,.,.,;,:,7,C,$,N,?,>,>,>,:,!,N,O,Q,H,O,Q,N,M,H,$,$,7,;,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,;,H,C,:,;,;,7,H,M,M,M,H,N,C,:,7,?,:,:,M,N,Q,$,O,?,N,M,Q,H,Q,O,O,:,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,$,$,?,7,Q,N,$,?,O,C,C,N,?,:,–,?,?,–,N,?,!,!,>,!,O,M,M,Q,O,O,O,O,;,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,>,N,H,N,M,$,?,>,–,–,:,H,?,:,;,>,:,–,Q,O,–,.,;,;,>,M,$,7,!,:,:,>,7,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,;,H,$,H,N,C,:,;,;,.,–,M,O,–,;,!,;,–,H,O,:,.,:,!,:,H,C,:,.,.,–,7,O,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,:,O,Q,$,7,–,.,:,:,–,N,>,–,;,:,;,;,Q,C,:,.,:,:,–,H,$,!,.,.,;,!,$,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,–,N,H,O,>,–,.,!,–,:,H,7,.,.,!,;,;,H,C,>,.,–,:,;,Q,O,>,.,.,.,–,Q,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,!,H,N,C,>,;,.,–,;,!,Q,C,;,;,!,;,;,Q,O,7,.,–,;,.,O,$,>,;,.,.,.,Q,:,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,:,C,H,O,>,;,.,;,;,7,$,7,;,.,–,.,;,Q,O,?,;,;,.,.,C,Q,7,–,.,.,–,O,O,;,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,O,Q,C,7,;,.,.,.,?,O,>,;,.,;,.,.,$,O,?,–,.,.,.,7,Q,7,:,.,.,–,?,H,!,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,C,Q,C,7,–,.,.,.,O,$,7,;,.,.,.,.,O,O,?,–,.,.,.,!,H,?,C,:,.,–,!,Q,?,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,O,$,?,7,:,.,.,.,$,Q,7,–,;,;,;,.,O,Q,?,:,;,.,.,;,H,?,7,>,.,:,!,$,7,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,C,H,C,7,!,.,;,.,$,$,>,:,–,!,:,;,O,$,?,!,:,.,.,:,$,O,C,!,.,.,7,O,7,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,!,M,C,?,!,.,–,;,>,Q,7,–,;,:,>,–,$,$,C,!,–,.,.,;,7,C,?,!,.,:,7,Q,>,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,;,H,C,?,:,.,–,.,:,$,7,:,–,;,–,;,>,?,?,7,–,:,;,.,!,O,?,:,.,.,!,Q,!,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,?,$,7,;,–,!,.,–,C,7,:,–,;,–,.,;,C,$,7,–,;,:,.,;,>,7,;,.,.,–,H,;,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,:,O,:,;,;,!,;,!,7,>,:,;,;,!,.,.,7,H,?,;,.,!,–,:,–,!,.,.,.,!,7,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,.,C,7,7,;,:,:,>,7,7,–,.,;,!,–,;,7,O,>,;,.,;,.,.,;,>,;,.,;,?,;,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,.,;,O,?,!,:,:,>,>,>,;,;,.,:,–,.,–,7,!,;,.,.,.,.,:,?,!,>,C,–,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,.,.,–,O,!,;,;,>,>,–,.,;,.,.,;,.,.,:,–,>,.,.,.,–,?,7,:,:,;,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,.,.,.,;,C,:,;,–,:,;,–,7,;,.,.,.,;,!,?,?,–,;,:,O,:,.,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,–,C,7,!,7,?,$,C,;,.,.,;,7,C,>,>,7,>,:,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,;,;,;,.,.,!,C,7,>,C,!,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,–,–,;,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,
,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,

*/
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
