<<<<<<< HEAD
// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();
=======
// A handy shortcut for selecting elements by ID
const $ = (id) => document.getElementById(id);
>>>>>>> sujal

// Handle the contact form submission gracefully
const contactForm = $("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = {
      name: $("name").value,
      email: $("email").value,
      message: $("message").value,
    };

    console.log(data);
    this.reset();
    $("success").textContent =
      "Your message has been sent successfully, thank you for reaching us";

    setTimeout(() => {
      $("success").textContent = "";
    }, 3000);
  });
}

// Automatically update the copyright year so we don't have to
if ($("year")) {
  $("year").textContent = new Date().getFullYear();
}

(() => {
  const header = document.getElementById("header");
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const profileSection = document.getElementById("profileSection");
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  // Check if a user is logged in and update the UI accordingly
  function updateProfileSection() {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");

    if (user) {
      const initials = (user.username || user.email)
        .split("@")[0]
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

      const dashboardUrl =
        user.role === "admin" ? "admin/admin.html" : "admin/staffs.html";

      profileSection.innerHTML = `
        <button class="profile-btn" id="profileBtn">
          <div class="user-avatar">${initials}</div>
          <span>${user.username || user.email.split("@")[0]}</span>
        </button>
        <div class="profile-menu hidden" id="profileMenu">
          <a href="profile.html" class="profile-menu-item">
            <i class="fa fa-user"></i> My Profile
          </a>
          <a href="${dashboardUrl}" class="profile-menu-item">
            <i class="fa fa-dashboard"></i> Dashboard
          </a>
          <button id="logoutBtn" class="profile-menu-item logout" style="border: 0; width: 100%; text-align: left; background: transparent; cursor: pointer;">
            <i class="fa fa-sign-out-alt"></i> Logout
          </button>
        </div>
      `;

      // Toggle the profile dropdown menu when clicked
      const profileBtn = $("profileBtn");
      const profileMenu = $("profileMenu");

      if (profileBtn && profileMenu) {
        profileBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          profileMenu.classList.toggle("hidden");
        });

        document.addEventListener("click", (e) => {
          if (!profileMenu.classList.contains("hidden")) {
            if (
              !profileMenu.contains(e.target) &&
              !profileBtn.contains(e.target)
            ) {
              profileMenu.classList.add("hidden");
            }
          }
        });
      }

      // Handle user logout and redirect to home
      const logoutBtn = $("logoutBtn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
          localStorage.removeItem("currentUser");
          window.location.href = "index.html";
        });
      }
    }
  }

  // Run the profile check as soon as the script loads
  updateProfileSection();

  // Handle the mobile menu toggle and hamburger animation
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const isActive = mobileMenu.classList.toggle("active");
      menuBtn.classList.toggle("active", isActive);
      menuBtn.setAttribute("aria-expanded", isActive ? "true" : "false");
      mobileMenu.setAttribute("aria-hidden", isActive ? "false" : "true");
    });

    // Close the mobile menu when a link is clicked for better UX
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        menuBtn.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
        mobileMenu.setAttribute("aria-hidden", "true");
      });
    });
  }

  // Add a subtle shadow to the header when scrolling down
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (window.scrollY > 10) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }, 0);
  });

  // Enable smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Logic for the Scroll to Top button visibility and action
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (scrollToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add("visible");
      } else {
        scrollToTopBtn.classList.remove("visible");
      }
    });

<<<<<<< HEAD
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
=======
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
})();
>>>>>>> sujal
