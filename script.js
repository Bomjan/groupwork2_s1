// -------------------- PRE-ADDED EVENTS (edit as you like) --------------------
let events = [
  { id: genId(), title: "Team Meeting", date: "2025-11-16", desc: "Weekly sync: discuss milestones." },
  { id: genId(), title: "Project Review", date: "2025-11-20", desc: "Review deliverables and feedback." },
  { id: genId(), title: "HR Policy Update", date: "2025-11-28", desc: "New leave policy rollout." }
];

// -------------------- UTIL --------------------
function genId(){ return 'e'+Math.random().toString(36).slice(2,9); }
function formatDateYYYY(dateObj){
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth()+1).padStart(2,'0');
  const d = String(dateObj.getDate()).padStart(2,'0');
  return `${y}-${m}-${d}`;
}
function niceDate(yyyyMMdd){
  const d = new Date(yyyyMMdd + 'T00:00:00');
  return d.toLocaleDateString(undefined, { year:'numeric', month:'short', day:'numeric' });
}

// -------------------- STATE --------------------
const calendarBody = document.getElementById('calendarBody');
const monthYear = document.getElementById('monthYear');
const notificationPanel = document.getElementById('notificationPanel');
const noNotif = document.getElementById('noNotif');

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

// Remove past events permanently on load (per request)
function purgePastEvents(){
  const todayStr = formatDateYYYY(new Date());
  events = events.filter(e => e.date >= todayStr);
}

// -------------------- CALENDAR GENERATION --------------------
function generateCalendar(month, year){
  calendarBody.innerHTML = '';
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // show correct heading (use month of current view)
  const monthName = new Date(year, month, 1).toLocaleString(undefined, { month:'long' });
  monthYear.textContent = `${monthName} ${year}`;

  let date = 1;
  for (let i=0;i<6;i++){
    const row = document.createElement('tr');
    let emptyRow = true;

    for (let j=0;j<7;j++){
      const cell = document.createElement('td');

      if (i===0 && j < firstDay) {
        cell.innerHTML = '';
      } else if (date > daysInMonth) {
        cell.innerHTML = '';
      } else {
        emptyRow = false;
        const dateNumSpan = document.createElement('span');
        dateNumSpan.className = 'date-num';
        dateNumSpan.textContent = date;

        cell.appendChild(dateNumSpan);

        const cellDate = `${year}-${String(month+1).padStart(2,'0')}-${String(date).padStart(2,'0')}`;

        // check events on this date
        const dayEvents = events.filter(e => e.date === cellDate);
        if (dayEvents.length){
          cell.classList.add('event-day');

          // show first event chip
          const chip = document.createElement('span');
          chip.className = 'event-chip';
          chip.textContent = dayEvents[0].title;
          cell.appendChild(chip);

          // add data attributes for popover / modal
          const popContent = dayEvents.map(d => `<strong>${escapeHtml(d.title)}</strong><br><small>${escapeHtml(d.desc || '')}</small>`).join('<hr style="margin:6px 0">');
          cell.setAttribute('data-bs-toggle', 'popover');
          cell.setAttribute('data-bs-trigger', 'hover focus');
          cell.setAttribute('data-bs-html', 'true');
          cell.setAttribute('data-bs-content', popContent);
          cell.setAttribute('data-date', cellDate);
        }

        // highlight today
        const todayStr = formatDateYYYY(new Date());
        if (cellDate === todayStr){
          cell.classList.add('today');
        }

        // click handler -> open modal for that first event (or list)
        cell.addEventListener('click', () => {
          const dateKey = cell.getAttribute('data-date');
          if (!dateKey) return; // nothing to open

          const dayEventsLocal = events.filter(e => e.date === dateKey);
          if (!dayEventsLocal.length) return;

          // show the first event by default, and allow deletion of whichever selected
          openEventModal(dayEventsLocal[0].id);
        });

        date++;
      }
      row.appendChild(cell);
    }

    if (!emptyRow) calendarBody.appendChild(row);
  }

  // init all popovers for new cells
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.forEach(function (el) {
    // dispose existing (prevents duplication)
    if (el._popover) {
      el._popover.dispose && el._popover.dispose();
    }
    el._popover = new bootstrap.Popover(el, { container: 'body', boundary: 'viewport' });
  });
}

// escape HTML for safety in popover content
function escapeHtml(unsafe) {
  if (!unsafe) return '';
  return unsafe.replace(/[&<>"']/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]; });
}

// -------------------- NOTIFICATIONS --------------------
function loadNotifications(){
  notificationPanel.innerHTML = '';
  const todayStr = formatDateYYYY(new Date());

  // categorize
  const todays = events.filter(e => e.date === todayStr).sort((a,b)=>a.title.localeCompare(b.title));
  const upcoming = events.filter(e => e.date > todayStr).sort((a,b)=> a.date.localeCompare(b.date));

  if (todays.length === 0 && upcoming.length === 0){
    noNotif.style.display = 'block';
  } else {
    noNotif.style.display = 'none';
    if (todays.length){
      const header = document.createElement('div');
      header.className = 'list-group-item list-group-item-action active';
      header.textContent = 'Today';
      notificationPanel.appendChild(header);

      todays.forEach(ev => {
        const li = document.createElement('div');
        li.className = 'list-group-item d-flex justify-content-between align-items-start';
        li.innerHTML = `<div class="me-2"><strong>${escapeHtml(ev.title)}</strong><div class="small text-muted">${escapeHtml(ev.desc || '')}</div></div><div class="text-end"><span class="badge bg-danger badge-date">${ev.date}</span></div>`;
        li.style.cursor = 'pointer';
        li.addEventListener('click', () => openEventModal(ev.id));
        notificationPanel.appendChild(li);
      });
    }

    if (upcoming.length){
      const header = document.createElement('div');
      header.className = 'list-group-item list-group-item-action active mt-2';
      header.textContent = 'Upcoming';
      notificationPanel.appendChild(header);

      upcoming.forEach(ev => {
        const li = document.createElement('div');
        li.className = 'list-group-item d-flex justify-content-between align-items-start';
        li.innerHTML = `<div class="me-2"><strong>${escapeHtml(ev.title)}</strong><div class="small text-muted">${escapeHtml(ev.desc || '')}</div></div><div class="text-end"><span class="badge bg-primary badge-date">${ev.date}</span></div>`;
        li.style.cursor = 'pointer';
        li.addEventListener('click', () => openEventModal(ev.id));
        notificationPanel.appendChild(li);
      });
    }
  }
}

// -------------------- MODAL --------------------
const eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalDesc = document.getElementById('modalDesc');
let currentModalEventId = null;

function openEventModal(eventId){
  const ev = events.find(e => e.id === eventId);
  if (!ev) return;
  currentModalEventId = ev.id;
  modalTitle.textContent = ev.title;
  modalDate.textContent = niceDate(ev.date);
  modalDesc.textContent = ev.desc || '(No description)';
  eventModal.show();
}

document.getElementById('deleteEventBtn').addEventListener('click', function(){
  if (!currentModalEventId) return;
  // remove event
  events = events.filter(e => e.id !== currentModalEventId);
  currentModalEventId = null;
  eventModal.hide();
  // refresh view
  generateCalendar(currentMonth, currentYear);
  loadNotifications();
});

// -------------------- ADD EVENT (with preview) --------------------
const titleInput = document.getElementById('eventTitle');
const dateInput = document.getElementById('eventDate');
const descInput = document.getElementById('eventDesc');
const previewBox = document.getElementById('eventPreview');
const addBtn = document.getElementById('addEventBtn');

function updatePreview(){
  const t = titleInput.value.trim();
  const d = dateInput.value;
  const s = descInput.value.trim();
  if (!t && !d && !s) {
    previewBox.textContent = 'Enter title, date, and description to preview.';
    return;
  }
  previewBox.innerHTML = `<strong>${escapeHtml(t || 'Untitled')}</strong><br><small>${d ? niceDate(d) : 'No date'}</small><div class="small text-muted mt-1">${escapeHtml(s || '')}</div>`;
}
titleInput.addEventListener('input', updatePreview);
dateInput.addEventListener('input', updatePreview);
descInput.addEventListener('input', updatePreview);

addBtn.addEventListener('click', () => {
  const t = titleInput.value.trim();
  const d = dateInput.value;
  const s = descInput.value.trim();

  if (!t || !d) {
    return alert('Please provide both title and date.');
  }

  const newEvent = { id: genId(), title: t, date: d, desc: s };
  events.push(newEvent);

  // if event is in the past, ignore (we keep only today/upcoming)
  const todayStr = formatDateYYYY(new Date());
  events = events.filter(e => e.date >= todayStr);

  // refresh UI
  generateCalendar(currentMonth, currentYear);
  loadNotifications();

  // reset inputs
  titleInput.value = '';
  dateInput.value = '';
  descInput.value = '';
  previewBox.textContent = 'Event added.';

  // small success feedback
  setTimeout(()=> previewBox.textContent = 'Enter title, date, and description to preview.', 2000);
});

// -------------------- NAVIGATION --------------------
document.getElementById('prevBtn').addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) { currentMonth = 11; currentYear--; }
  generateCalendar(currentMonth, currentYear);
});
document.getElementById('nextBtn').addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) { currentMonth = 0; currentYear++; }
  generateCalendar(currentMonth, currentYear);
});
document.getElementById('todayBtn').addEventListener('click', () => {
  const now = new Date();
  currentMonth = now.getMonth();
  currentYear = now.getFullYear();
  generateCalendar(currentMonth, currentYear);
});

// -------------------- INITIALIZE --------------------
(function init(){
  purgePastEvents();            // remove past events
  generateCalendar(currentMonth, currentYear);
  loadNotifications();
})();
