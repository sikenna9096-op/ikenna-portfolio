// Shared navigation and small site-wide enhancements.
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
      menuButton.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
        menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  // Contact form uses the visitor's email application; no server is required.
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;

      const formData = new FormData(contactForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const subject = String(formData.get("subject") || "Portfolio enquiry").trim();
      const message = String(formData.get("message") || "").trim();
      const recipient = contactForm.dataset.recipient || "YOUR-EMAIL@example.com";

      const body = `Hello Ikenna,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`;
      const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;

      const status = document.querySelector("#form-status");
      if (status) status.textContent = "Your email app should open with the message ready to send.";
    });
  }

  // Lightweight local task planner. Tasks stay in this browser only.
  const plannerForm = document.querySelector("#planner-form");
  const taskList = document.querySelector("#task-list");
  if (plannerForm && taskList) {
    const storageKey = "ijs-portfolio-planner-v1";
    let tasks = [];

    try {
      tasks = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (!Array.isArray(tasks)) tasks = [];
    } catch {
      tasks = [];
    }

    const saveTasks = () => localStorage.setItem(storageKey, JSON.stringify(tasks));

    const renderTasks = () => {
      taskList.innerHTML = "";
      const count = document.querySelector("#task-count");
      const remaining = tasks.filter((task) => !task.done).length;
      if (count) count.textContent = `${remaining} remaining · ${tasks.length} total`;

      if (tasks.length === 0) {
        taskList.innerHTML = '<div class="empty-state"><i class="fa-regular fa-calendar-check"></i><p>No tasks yet. Add one to get started.</p></div>';
        return;
      }

      tasks.forEach((task) => {
        const item = document.createElement("div");
        item.className = `task-item${task.done ? " done" : ""}`;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = Boolean(task.done);
        checkbox.setAttribute("aria-label", `Mark ${task.title} as ${task.done ? "not complete" : "complete"}`);
        checkbox.addEventListener("change", () => {
          task.done = checkbox.checked;
          saveTasks();
          renderTasks();
        });

        const textWrap = document.createElement("div");
        textWrap.className = "task-text";
        const title = document.createElement("strong");
        title.textContent = task.title;
        const meta = document.createElement("small");
        meta.textContent = task.date ? `Due ${task.date}` : "No due date";
        textWrap.append(title, meta);

        const remove = document.createElement("button");
        remove.className = "delete-task";
        remove.type = "button";
        remove.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        remove.setAttribute("aria-label", `Delete ${task.title}`);
        remove.addEventListener("click", () => {
          tasks = tasks.filter((entry) => entry.id !== task.id);
          saveTasks();
          renderTasks();
        });

        item.append(checkbox, textWrap, remove);
        taskList.append(item);
      });
    };

    plannerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!plannerForm.reportValidity()) return;
      const title = plannerForm.querySelector("#task-title").value.trim();
      const date = plannerForm.querySelector("#task-date").value;
      if (!title) return;

      tasks.unshift({ id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, title, date, done: false });
      saveTasks();
      plannerForm.reset();
      renderTasks();
    });

    const clearCompleted = document.querySelector("#clear-completed");
    if (clearCompleted) {
      clearCompleted.addEventListener("click", () => {
        tasks = tasks.filter((task) => !task.done);
        saveTasks();
        renderTasks();
      });
    }

    renderTasks();
  }
});
