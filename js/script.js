// A handy shortcut for selecting elements by ID
const $ = (id) => document.getElementById(id);

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

    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
})();
