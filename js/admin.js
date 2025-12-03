(() => {
  const current = JSON.parse(localStorage.getItem("currentUser") || "null");

  // guard: no user -> form
  if (!current) {
    window.location.href = "../form.html";
    return;
  }

  // redirect non-admins to staffs page
  if (current.role && current.role !== "admin") {
    window.location.href = "staffs.html";
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
      window.location.href = "../form.html";
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

  // --- NAVIGATION LOGIC ---
  function switchSection(sectionId) {
      // Update Sidebar
      navItems.forEach(n => {
          if(n.dataset.section === sectionId) n.classList.add('active');
          else n.classList.remove('active');
      });

      // Update Title
      const activeNav = navItems.find(n => n.dataset.section === sectionId);
      if(activeNav && pageTitle) {
          pageTitle.textContent = activeNav.querySelector(".label")?.textContent || sectionId;
      }

      // Hide all sections
      document.querySelectorAll('main .section').forEach(sec => {
        sec.classList.add('hidden');
      });

      // Show target section
      const target = document.getElementById(sectionId);
      if (target) {
        target.classList.remove('hidden');
        
        // Overview specific logic
        if(sectionId === 'overview') {
            document.getElementById('shortcuts').classList.remove('hidden');
            document.getElementById('hr').classList.remove('hidden');
        } else {
            document.getElementById('shortcuts').classList.add('hidden');
            document.getElementById('hr').classList.add('hidden');
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
  }

  // nav interaction: click & keyboard
  navItems.forEach((el) => {
    el.addEventListener("click", () => switchSection(el.dataset.section));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        switchSection(el.dataset.section);
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
      id: "notifications", // Changed ID to match section ID
      title: "New Publication",
      desc: "Create a news or policy item",
      icon: "fa-newspaper",
    },
    {
      id: "inventory", // Matches section ID
      title: "Inventory",
      desc: "Track assets & stock",
      icon: "fa-boxes-stacked",
    },
    {
      id: "task", // Special case: opens modal
      title: "Assign Task",
      desc: "Create staff tasks",
      icon: "fa-tasks",
    },
    {
      id: "hr", // Matches section ID (Leaves are in HR section)
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
      
      // Special case for Task Assignment Modal
      if (id === 'task') {
        openModal('Assign Task', [
            { id: 'taskTitle', label: 'Task Title', placeholder: 'e.g. Update Homepage' },
            { id: 'taskType', label: 'Type', placeholder: 'Task / Tour / Meeting' },
            { id: 'taskDate', label: 'Due Date', type: 'date' }
        ], (data) => {
            if (!data.taskTitle) return showToast('Title is required');
            const tasks = JSON.parse(localStorage.getItem('ig_tasks_v1')) || [];
            tasks.push({
                id: Date.now(),
                title: data.taskTitle,
                type: data.taskType || 'Task',
                date: data.taskDate || new Date().toISOString().split('T')[0],
                status: 'Pending'
            });
            localStorage.setItem('ig_tasks_v1', JSON.stringify(tasks));
            closeModal();
            showToast('Task assigned');
        });
        return;
      }

      // Default: Switch Section
      switchSection(id);
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
  // --- NEW FUNCTIONALITIES ---

  // Data
  let inventory = JSON.parse(localStorage.getItem('ig_inventory')) || [];
  let notifications = JSON.parse(localStorage.getItem('ig_notifications_v1')) || [];
  
  // Modal System
  const modal = document.getElementById('adminModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalConfirmBtn = document.getElementById('modalConfirmBtn');
  let currentModalCallback = null;

  window.closeModal = function() {
    if(!modal) return;
    modal.classList.remove('show');
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
    }, 200);
  };

  function openModal(title, fields, callback) {
    if(!modal) return;
    modalTitle.textContent = title;
    modalBody.innerHTML = fields.map(f => `
        <div class="modal-group">
            <label class="modal-label">${f.label}</label>
            <input class="modal-input" type="${f.type || 'text'}" id="${f.id}" placeholder="${f.placeholder || ''}" value="${f.value || ''}">
        </div>
    `).join('');
    
    currentModalCallback = callback;
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => modal.classList.add('show'));
    
    // Focus first input
    setTimeout(() => {
        const firstInput = modalBody.querySelector('input');
        if(firstInput) firstInput.focus();
    }, 100);
  }

  if(modalConfirmBtn) {
      modalConfirmBtn.onclick = () => {
        if (currentModalCallback) {
            const inputs = modalBody.querySelectorAll('input');
            const data = {};
            inputs.forEach(input => data[input.id] = input.value);
            currentModalCallback(data);
        }
      };
  }

  // Inventory
  window.addInventoryItem = function() {
    openModal('Add Inventory Item', [
        { id: 'invName', label: 'Item Name', placeholder: 'e.g. Office Chairs' },
        { id: 'invCat', label: 'Category', placeholder: 'e.g. Furniture' },
        { id: 'invQty', label: 'Quantity', type: 'number', placeholder: '0' }
    ], (data) => {
        if (!data.invName) return showToast('Name is required');
        inventory.push({
            id: Date.now(),
            name: data.invName,
            category: data.invCat || 'General',
            qty: Number(data.invQty) || 0,
            status: (Number(data.invQty) || 0) < 10 ? 'Low Stock' : 'In Stock'
        });
        saveInventory();
        renderInventory();
        closeModal();
        showToast('Item added');
    });
  };

  function saveInventory() {
    localStorage.setItem('ig_inventory', JSON.stringify(inventory));
  }

  function renderInventory() {
    const tbody = document.getElementById('inventoryList');
    if (!tbody) return;
    if (inventory.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:20px">No items found</td></tr>';
        return;
    }
    tbody.innerHTML = inventory.map(item => `
        <tr>
            <td><strong>${item.name}</strong></td>
            <td>${item.category}</td>
            <td>${item.qty}</td>
            <td><span class="badge ${item.status === 'Low Stock' ? 'yellow' : 'green'}">${item.status}</span></td>
            <td>
                <button class="btn small" style="background:#ef4444;box-shadow:none" onclick="deleteInventory(${item.id})">Delete</button>
            </td>
        </tr>
    `).join('');
  }
  
  window.deleteInventory = function(id) {
     // Direct delete as per "no prompt" preference
     inventory = inventory.filter(i => i.id !== id);
     saveInventory();
     renderInventory();
     showToast('Item deleted');
  };

  // Notifications
  window.broadcastNotification = function() {
    openModal('Broadcast Notification', [
        { id: 'notifMsg', label: 'Message', placeholder: 'Enter notification message' }
    ], (data) => {
        if (!data.notifMsg) return showToast('Message is required');
        notifications.unshift({
            id: Date.now(),
            text: data.notifMsg,
            time: new Date().toISOString()
        });
        saveNotifications();
        renderNotifications();
        closeModal();
        showToast('Notification sent');
    });
  };

  function saveNotifications() {
    localStorage.setItem('ig_notifications_v1', JSON.stringify(notifications));
  }

  function renderNotifications() {
    const list = document.getElementById('notificationList');
    if (!list) return;
    if (notifications.length === 0) {
        list.innerHTML = '<p class="muted">No new notifications.</p>';
        return;
    }
    list.innerHTML = notifications.map(n => `
        <div class="recent-item">
            <div class="dot blue"></div>
            <div class="text">
                <strong>System Broadcast</strong>
                <span class="muted">${n.text}</span>
            </div>
            <div class="time">
                ${new Date(n.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
            <button class="delete-notif" onclick="deleteNotification(${n.id})" title="Delete">
                <i class="fa fa-trash"></i>
            </button>
        </div>
    `).join('');
  }

  window.deleteNotification = function(id) {
    notifications = notifications.filter(n => n.id !== id);
    saveNotifications();
    renderNotifications();
    showToast('Notification removed');
  };

  // Init
  renderInventory();
  renderNotifications();

})();
