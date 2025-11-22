(() => {
  const current = JSON.parse(localStorage.getItem("currentUser") || "null");

  // guard: no user -> form
  if (!current) {
    window.location.href = "/form.html";
    return;
  }

  // redirect non-admins to staffs page
  if (current.role && current.role !== "admin") {
    window.location.href = "/admin/staffs.html";
    return;
  }

  // elements
  const sidebar = document.getElementById("sidebar");
  const toggle = document.getElementById("sidebarToggle");
  const overlay = document.getElementById("overlay");
  const profileBtn = document.getElementById("profileBtn");
  const profileMenu = document.getElementById("profileMenu");
  const logoutBtn = document.getElementById("logoutBtn");
  const usernameEl = document.getElementById("username");
  const avatarEl = document.getElementById("avatar");
  const navItems = Array.from(document.querySelectorAll(".nav-item"));
  const pageTitle = document.getElementById("pageTitle");

  // show username + avatar
  const nameSource = (current.username || current.email || "Admin").split(
    "@"
  )[0];
  const displayName = nameSource.charAt(0).toUpperCase() + nameSource.slice(1);
  if (usernameEl) usernameEl.textContent = displayName;
  if (avatarEl) avatarEl.textContent = displayName.slice(0, 2).toUpperCase();

  // logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "/form.html";
    });
  }

  // profile menu toggle
  if (profileBtn && profileMenu) {
    profileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isHidden = profileMenu.classList.toggle("hidden");
      profileMenu.setAttribute("aria-hidden", isHidden ? "true" : "false");
      profileBtn.setAttribute("aria-expanded", isHidden ? "false" : "true");
    });
  }

  // close profile menu on outside click
  document.addEventListener("click", (e) => {
    if (!profileMenu || profileMenu.classList.contains("hidden")) return;
    if (!profileMenu.contains(e.target) && !profileBtn.contains(e.target)) {
      profileMenu.classList.add("hidden");
      profileMenu.setAttribute("aria-hidden", "true");
      profileBtn && profileBtn.setAttribute("aria-expanded", "false");
    }
  });

  // close profile menu on ESC
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      profileMenu &&
      !profileMenu.classList.contains("hidden")
    ) {
      profileMenu.classList.add("hidden");
      profileMenu.setAttribute("aria-hidden", "true");
      profileBtn && profileBtn.setAttribute("aria-expanded", "false");
    }
  });

  // MOBILE: sidebar drawer (hide toggle button on desktop via CSS)
  function openMobileSidebar() {
    sidebar.classList.add("mobile-open");
    overlay.classList.add("show");
    overlay.classList.remove("hidden");
    toggle.setAttribute("aria-expanded", "true");
  }

  function closeMobileSidebar() {
    sidebar.classList.remove("mobile-open");
    overlay.classList.remove("show");
    overlay.classList.add("hidden");
    toggle.setAttribute("aria-expanded", "false");
  }

  // toggle only opens/closes mobile drawer (no desktop collapse)
  if (toggle) {
    toggle.addEventListener("click", () => {
      if (sidebar.classList.contains("mobile-open")) {
        closeMobileSidebar();
      } else {
        openMobileSidebar();
      }
    });
  }

  // close mobile sidebar on overlay click
  if (overlay) {
    overlay.addEventListener("click", closeMobileSidebar);
  }

  // close mobile sidebar when nav item clicked
  navItems.forEach((el) => {
    el.addEventListener("click", () => {
      if (sidebar.classList.contains("mobile-open")) {
        closeMobileSidebar();
      }
    });
  });

  // nav interaction: click & keyboard
  navItems.forEach((el) => {
    function activate() {
      navItems.forEach((n) => n.classList.remove("active"));
      el.classList.add("active");
      const section = el.dataset.section;
      const label = el.querySelector(".label")?.textContent || section;
      if (pageTitle) pageTitle.textContent = label;
      // smooth scroll if target exists
      const target = document.getElementById(section);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    el.addEventListener("click", activate);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate();
      }
    });
  });

  // animate stat counters
  document.querySelectorAll(".stat").forEach((el) => {
    const to = Number(el.dataset.to || 0);
    let i = 0;
    const step = Math.max(1, Math.floor(to / 40));
    const t = setInterval(() => {
      i += step;
      if (i >= to) {
        el.textContent = to;
        clearInterval(t);
      } else {
        el.textContent = i;
      }
    }, 25);
  });

  // Shortcuts and pending items
  const shortcuts = [
    {
      id: "pub",
      title: "New Publication",
      desc: "Create a news or policy item",
      icon: "fa-newspaper",
    },
    {
      id: "inv",
      title: "Inventory",
      desc: "Track assets & stock",
      icon: "fa-boxes-stacked",
    },
    {
      id: "task",
      title: "Assign Task",
      desc: "Create staff tasks",
      icon: "fa-tasks",
    },
    {
      id: "leave",
      title: "Leaves",
      desc: "Review leave applications",
      icon: "fa-calendar-check",
    },
  ];

  const pendingItems = [
    {
      id: 1,
      type: "Leave",
      title: "Leave - Paula",
      time: "2d",
      meta: "3 days, urgent",
    },
    {
      id: 2,
      type: "Inventory",
      title: "Asset audit - Storage A",
      time: "1d",
      meta: "missing items",
    },
    {
      id: 3,
      type: "Publication",
      title: "Policy Draft #12",
      time: "3h",
      meta: "review required",
    },
  ];

  function renderShortcuts() {
    const grid = document.getElementById("shortcutsGrid");
    if (!grid) return;
    grid.innerHTML = "";
    shortcuts.forEach((s) => {
      const el = document.createElement("div");
      el.className = "module";
      el.innerHTML = `
        <h4><i class="fa ${s.icon}" aria-hidden="true"></i> ${s.title}</h4>
        <p class="muted">${s.desc}</p>
        <div class="module-actions">
          <button class="btn open-shortcut" data-id="${s.id}" aria-label="${s.title}">Open</button>
        </div>
      `;
      grid.appendChild(el);
    });
  }

  function renderPending() {
    const list = document.getElementById("pendingList");
    if (!list) return;
    list.innerHTML = "";
    pendingItems.forEach((p) => {
      const row = document.createElement("div");
      row.className = "recent-item";
      row.dataset.id = p.id;
      row.innerHTML = `
        <div class="dot ${
          p.type === "Leave"
            ? "yellow"
            : p.type === "Inventory"
            ? "green"
            : "blue"
        }" aria-hidden="true"></div>
        <div class="text"><strong>${p.title}</strong><span class="muted"> — ${
        p.meta
      }</span></div>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn small approve" data-id="${
            p.id
          }" title="Approve" aria-label="Approve ${p.title}">✓</button>
          <button class="btn small reject" data-id="${
            p.id
          }" title="Reject" aria-label="Reject ${
        p.title
      }" style="background:#ef4444;box-shadow:none">✕</button>
        </div>
      `;
      list.appendChild(row);
    });
  }

  // delegated click handlers
  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest(".open-shortcut");
    if (openBtn) {
      const id = openBtn.dataset.id;
      showToast(`Opening ${id}...`);
      return;
    }
    const approve = e.target.closest(".approve");
    if (approve) {
      const id = Number(approve.dataset.id);
      handlePendingAction(id, "approve");
      return;
    }
    const reject = e.target.closest(".reject");
    if (reject) {
      const id = Number(reject.dataset.id);
      handlePendingAction(id, "reject");
      return;
    }
  });

  function handlePendingAction(id, action) {
    const idx = pendingItems.findIndex((p) => p.id === id);
    if (idx === -1) return;
    const item = pendingItems[idx];
    const dom = document.querySelector(`.recent-item[data-id="${id}"]`);
    if (dom) {
      dom.classList.add("removing");
      setTimeout(() => {
        pendingItems.splice(idx, 1);
        renderPending();
        showToast(
          (action === "approve" ? "Approved" : "Rejected") + ` • ${item.title}`
        );
      }, 260);
    } else {
      pendingItems.splice(idx, 1);
      renderPending();
      showToast(
        (action === "approve" ? "Approved" : "Rejected") + ` • ${item.title}`
      );
    }
  }

  // initial render
  renderShortcuts();
  renderPending();

  // toast helper
  function showToast(msg, time = 2600) {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("show"));
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 260);
    }, time);
  }
})();
