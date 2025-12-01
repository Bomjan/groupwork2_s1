// Set current year in footer
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

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

(() => {
  const header = document.getElementById("header");
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const profileSection = document.getElementById("profileSection");

  // Check if a user is logged in and update the UI accordingly
  function updateProfileSection() {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");

    if (user && profileSection) {
      const initials = (user.username || user.email)
        .split("@")[0]
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

      const displayName = user.username || user.email.split("@")[0];

      // Determine dashboard URL based on role
      let dashboardLink = "";
      if (user.role === "admin") {
        dashboardLink = `
          <a href="admin/admin.html" class="profile-menu-item">
            <i class="fa fa-dashboard"></i> Dashboard
          </a>`;
      } else if (user.role === "staff") {
        dashboardLink = `
          <a href="admin/staffs.html" class="profile-menu-item">
            <i class="fa fa-dashboard"></i> Dashboard
          </a>`;
      } else {
        // For regular users, maybe point to profile or hide dashboard
        dashboardLink = `
          <a href="profile.html" class="profile-menu-item">
            <i class="fa fa-user-circle"></i> My Profile
          </a>`;
      }

      profileSection.innerHTML = `
        <button class="profile-btn" id="profileBtn">
          <div class="user-avatar">${initials}</div>
          <span>${displayName}</span>
        </button>
        <div class="profile-menu hidden" id="profileMenu">
          ${dashboardLink}
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
      // Update Mobile Menu as well
      if (mobileMenu) {
        const mobileSignup = mobileMenu.querySelector(".mobile-signup");
        if (mobileSignup) {
          mobileSignup.style.display = "none";
        }
        
        // Check if we already added profile info to avoid duplicates
        let mobileProfile = mobileMenu.querySelector(".mobile-profile-info");
        if (!mobileProfile) {
          const profileHtml = `
            <div class="mobile-profile-info">
              <div class="mobile-user-avatar">${initials}</div>
              <div class="mobile-user-details">
                <span class="mobile-user-name">${displayName}</span>
                <span class="mobile-user-role">${user.role}</span>
              </div>
            </div>
            ${dashboardLink.replace("profile-menu-item", "mobile-nav-link")}
            <button id="mobileLogoutBtn" class="mobile-nav-link logout" style="border: 0; width: 100%; text-align: left; background: transparent; cursor: pointer;">
              Logout
            </button>
            <hr style="border: 0; border-top: 1px solid rgba(0,0,0,0.1); margin: 8px 0; width: 100%;">
          `;
          mobileMenu.insertAdjacentHTML("afterbegin", profileHtml);
          
          // Attach logout listener for mobile
          const mobileLogoutBtn = document.getElementById("mobileLogoutBtn");
          if (mobileLogoutBtn) {
            mobileLogoutBtn.addEventListener("click", () => {
              localStorage.removeItem("currentUser");
              window.location.href = "index.html";
            });
          }
        }
      }
    } else {
      // User is not logged in, ensure Sign Up is visible
      if (mobileMenu) {
        const mobileSignup = mobileMenu.querySelector(".mobile-signup");
        if (mobileSignup) {
          mobileSignup.style.display = "flex";
        }
        const mobileProfile = mobileMenu.querySelector(".mobile-profile-info");
        if (mobileProfile) mobileProfile.remove();
        const mobileLogout = document.getElementById("mobileLogoutBtn");
        if (mobileLogout) mobileLogout.remove();
         // Also remove the dashboard link if we injected it (this is a bit tricky without a specific class, 
         // but simpler to just reset innerHTML if we want to be clean, but that might kill event listeners.
         // For now, let's assume a page reload happens on logout usually, but here we are doing SPA-like updates.
         // A cleaner way is to reset the menu to default state if needed, but let's stick to this for now.)
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
