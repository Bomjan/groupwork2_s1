(() => {
  // ----- helpers -----
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const today = () => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  };

  // ----- storage keys -----
  const S = {
    TASKS: "ig_tasks_v1",
    LEAVES: "ig_leaves_v1",
    PROMOS: "ig_promos_v1",
    EVENTS: "ig_events_v1",
  };

  // ----- state load/save -----
  const load = (key, def = []) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : def;
    } catch (e) {
      console.warn("load err", e);
      return def;
    }
  };
  const save = (key, v) => localStorage.setItem(key, JSON.stringify(v));

  // ----- initial content -----
  if (!localStorage.getItem(S.TASKS)) {
    save(S.TASKS, [
      {
        id: genId(),
        title: "Onboard new intern",
        type: "task",
        date: today(),
        done: false,
      },
      {
        id: genId(),
        title: "Field tour — site A",
        type: "tour",
        date: "",
        done: false,
      },
    ]);
  }
  if (!localStorage.getItem(S.LEAVES)) {
    save(S.LEAVES, []);
  }
  if (!localStorage.getItem(S.PROMOS)) {
    save(S.PROMOS, []);
  }
  if (!localStorage.getItem(S.EVENTS)) {
    save(S.EVENTS, [
      {
        id: genId(),
        title: "Monthly All-hands",
        date: today(),
        time: "10:00",
        createdAt: Date.now(),
      },
    ]);
  }

  // ----- utilities -----
  function genId() {
    return Math.random().toString(36).slice(2, 9);
  }

  function formatDate(d) {
    if (!d) return "";
    const [year, month, day] = d.split("-");
    return `${day}/${month}/${year}`;
  }

  function formatDateTime(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  // ----- UI wiring -----
  const sections = $$(".nav-btn");
  sections.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      sections.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      $$(".panel").forEach((p) => p.classList.remove("active-panel"));
      const id = btn.getAttribute("data-section");
      $(`#${id}`).classList.add("active-panel");
    })
  );

  // Today info
  const todayDate = new Date();
  const todayFormatted = `${String(todayDate.getDate()).padStart(
    2,
    "0"
  )}/${String(todayDate.getMonth() + 1).padStart(
    2,
    "0"
  )}/${todayDate.getFullYear()}`;
  $("#todayInfo").textContent = `Today: ${todayFormatted}`;

  // ---- Tasks ----
  const taskForm = $("#taskForm");
  const taskList = $("#taskList");
  const completedList = $("#completedList");

  function renderTasks() {
    const tasks = load(S.TASKS);
    taskList.innerHTML = "";
    completedList.innerHTML = "";
    tasks.forEach((t) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div>
          <strong>${escapeHtml(t.title)}</strong>
          <div class="small item-meta">${t.type.toUpperCase()} ${
        t.date ? "· " + formatDate(t.date) : ""
      }</div>
        </div>
        <div class="item-actions">
          ${
            t.done
              ? `<button class="secondary" data-action="undo" data-id="${t.id}">Undo</button>`
              : `<button data-action="done" data-id="${t.id}">Done</button>`
          }
          <button class="secondary" data-action="del" data-id="${
            t.id
          }">Delete</button>
        </div>
      `;
      if (t.done) completedList.appendChild(li);
      else taskList.appendChild(li);
    });
  }

  taskForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const title = $("#taskTitle").value.trim();
    if (!title) return;
    const type = $("#taskType").value;
    const date = $("#taskDate").value || "";
    const tasks = load(S.TASKS);
    tasks.unshift({ id: genId(), title, type, date, done: false });
    save(S.TASKS, tasks);
    $("#taskForm").reset();
    renderTasks();
  });

  taskList.addEventListener("click", taskAction);
  completedList.addEventListener("click", taskAction);

  function taskAction(e) {
    const btn = e.target;
    const action = btn.getAttribute("data-action");
    const id = btn.getAttribute("data-id");
    if (!action || !id) return;
    let tasks = load(S.TASKS);
    if (action === "done") {
      tasks = tasks.map((t) => (t.id === id ? { ...t, done: true } : t));
    } else if (action === "undo") {
      tasks = tasks.map((t) => (t.id === id ? { ...t, done: false } : t));
    } else if (action === "del") {
      tasks = tasks.filter((t) => t.id !== id);
    }
    save(S.TASKS, tasks);
    renderTasks();
  }

  // ---- Leave ----
  const leaveForm = $("#leaveForm");

  leaveForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const from = $("#leaveFrom").value;
    const to = $("#leaveTo").value;
    const reason = $("#leaveReason").value.trim();
    const comment = $("#leaveComment").value.trim();
    if (!from || !to || !reason) return alert("Please fill required fields.");
    const leaves = load(S.LEAVES);
    const item = {
      id: genId(),
      type: "leave",
      from,
      to,
      reason,
      comment,
      status: "pending",
      createdAt: Date.now(),
    };
    leaves.unshift(item);
    save(S.LEAVES, leaves);
    leaveForm.reset();
    renderApplications();
    alert("Leave application submitted!");
  });

  // ---- Promotions ----
  const promoForm = $("#promoForm");

  promoForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const role = $("#promoRole").value.trim();
    const justify = $("#promoJustify").value.trim();
    if (!role || !justify) return alert("Please fill required fields.");
    const arr = load(S.PROMOS);
    arr.unshift({
      id: genId(),
      type: "promotion",
      role,
      justify,
      status: "pending",
      createdAt: Date.now(),
    });
    save(S.PROMOS, arr);
    promoForm.reset();
    renderApplications();
    alert("Promotion request submitted!");
  });

  // ---- Combined Applications Status ----
  const appContainer = $("#appContainer");
  const appFilter = $("#appFilter");

  function renderApplications() {
    const leaves = load(S.LEAVES);
    const promos = load(S.PROMOS);
    const all = [
      ...leaves.map((l) => ({ ...l, type: "leave" })),
      ...promos.map((p) => ({ ...p, type: "promotion" })),
    ].sort((a, b) => b.createdAt - a.createdAt);

    const filter = appFilter.value;
    const filtered = all.filter((a) =>
      filter === "all" ? true : a.status === filter
    );

    appContainer.innerHTML = "";

    if (filtered.length === 0) {
      appContainer.innerHTML = `<div class="small">No applications found.</div>`;
      return;
    }

    filtered.forEach((app) => {
      const li = document.createElement("li");
      li.className = "list";

      let details = "";
      let statusBadgeClass = "";

      if (app.type === "leave") {
        details = `<strong>Leave Request</strong><div class="small item-meta">${formatDate(
          app.from
        )} → ${formatDate(app.to)}</div><div class="small">${escapeHtml(
          app.reason
        )}</div>`;
      } else if (app.type === "promotion") {
        details = `<strong>Promotion Request</strong><div class="small item-meta">Role: ${escapeHtml(
          app.role
        )}</div><div class="small">${escapeHtml(app.justify)}</div>`;
      }

      if (app.status === "approved") {
        statusBadgeClass = "success";
      } else if (app.status === "rejected") {
        statusBadgeClass = "danger";
      }

      li.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <div style="flex: 1;">
            ${details}
            <div class="small item-meta" style="margin-top: 8px;">
              Applied: ${formatDateTime(app.createdAt)}
            </div>
          </div>
          <div style="display: flex; gap: 10px; align-items: center; white-space: nowrap;">
            <span class="badge ${statusBadgeClass}">${app.status}</span>
          </div>
        </div>
      `;
      appContainer.appendChild(li);
    });
  }

  appFilter.addEventListener("change", renderApplications);

  // ---- Events / Calendar / Alerts ----
  const eventForm = $("#eventForm");
  const eventListEl = $("#eventList");
  const alertsEl = $("#alerts");

  eventForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const title = $("#eventTitle").value.trim();
    const date = $("#eventDate").value;
    const time = $("#eventTime").value || "";
    if (!title || !date) return alert("Title & date required.");
    const arr = load(S.EVENTS);
    arr.unshift({ id: genId(), title, date, time, createdAt: Date.now() });
    save(S.EVENTS, arr);
    eventForm.reset();
    renderEvents();
    checkAlerts();
  });

  function renderEvents() {
    const arr = load(S.EVENTS).sort((a, b) => (a.date > b.date ? 1 : -1));
    eventListEl.innerHTML = "";
    arr.forEach((ev) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div>
          <strong>${escapeHtml(ev.title)}</strong>
          <div class="small item-meta">${formatDate(ev.date)} ${
        ev.time ? "· " + ev.time : ""
      }</div>
        </div>
        <div class="item-actions">
          <button data-action="del" data-id="${
            ev.id
          }" class="secondary">Delete</button>
        </div>
      `;
      eventListEl.appendChild(li);
    });
  }

  eventListEl.addEventListener("click", (e) => {
    const btn = e.target;
    const action = btn.getAttribute("data-action");
    const id = btn.getAttribute("data-id");
    if (action === "del" && id) {
      let arr = load(S.EVENTS);
      arr = arr.filter((x) => x.id !== id);
      save(S.EVENTS, arr);
      renderEvents();
      checkAlerts();
    }
  });

  // Alerts: show events that are today
  function checkAlerts() {
    const e = load(S.EVENTS);
    const now = today();
    alertsEl.innerHTML = "";
    const todays = e.filter((x) => x.date === now);
    if (todays.length === 0) {
      alertsEl.innerHTML = `<div class="small">No events for today.</div>`;
      return;
    }
    const container = document.createElement("div");
    container.innerHTML = `<strong>Events today (${formatDate(now)})</strong>`;
    todays.forEach((t) => {
      const row = document.createElement("div");
      row.className = "small";
      row.textContent = `• ${t.title}${t.time ? " @ " + t.time : ""}`;
      container.appendChild(row);
    });
    alertsEl.appendChild(container);
  }

  // ---- initial render ----
  renderTasks();
  renderApplications();
  renderEvents();
  checkAlerts();

  // ---- small helpers ----
  function escapeHtml(s) {
    if (!s) return "";
    return s
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // ---- simulate periodic status changes for demo ----
  (function simulateApprovals() {
    const leaves = load(S.LEAVES).map((l) => {
      if (l.status === "pending" && Math.random() > 0.85) {
        l.status = Math.random() > 0.5 ? "approved" : "rejected";
      }
      return l;
    });
    save(S.LEAVES, leaves);

    const promos = load(S.PROMOS).map((p) => {
      if (p.status === "pending" && Math.random() > 0.9) {
        p.status = Math.random() > 0.5 ? "approved" : "rejected";
      }
      return p;
    });
    save(S.PROMOS, promos);

    renderApplications();
  })();
})();
