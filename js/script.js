// utility function
const $ = (id) => document.getElementById(id);

// Contact form handling
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

// Set current year in footer
if ($("year")) {
  $("year").textContent = new Date().getFullYear();
}

(() => {
  const header = document.getElementById("header");
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const profileSection = document.getElementById("profileSection");
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  // Update profile section based on login status
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
        user.role === "admin" ? "/admin/admin.html" : "/admin/staffs.html";

      profileSection.innerHTML = `
        <button class="profile-btn" id="profileBtn">
          <div class="user-avatar">${initials}</div>
          <span>${user.username || user.email.split("@")[0]}</span>
        </button>
        <div class="profile-menu hidden" id="profileMenu">
          <a href="/profile.html" class="profile-menu-item">
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

      // Profile menu toggle
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

      // Logout handler
      const logoutBtn = $("logoutBtn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
          localStorage.removeItem("currentUser");
          window.location.href = "/";
        });
      }
    }
  }

  // Initialize profile on load
  updateProfileSection();

  // Mobile menu toggle with animated hamburger
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const isActive = mobileMenu.classList.toggle("active");
      menuBtn.classList.toggle("active", isActive);
      menuBtn.setAttribute("aria-expanded", isActive ? "true" : "false");
      mobileMenu.setAttribute("aria-hidden", isActive ? "false" : "true");
    });

    // Close menu on link click
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        menuBtn.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
        mobileMenu.setAttribute("aria-hidden", "true");
      });
    });
  }

  // Header shadow on scroll
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

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();
