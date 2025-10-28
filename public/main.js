document.addEventListener("DOMContentLoaded", function() {
  initializeMotion();
  initializeCollapsibles();
  initializeCopyButtons();
});

function initializeCollapsibles() {
  const triggers = document.querySelectorAll(".collapsible-trigger");
  
  triggers.forEach(trigger => {
    trigger.addEventListener("click", function() {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      
      if (content && content.classList.contains("collapsible-content")) {
        content.classList.toggle("active");
      }
    });
  });
}

function initializeCopyButtons() {
  document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      const targetId = btn.getAttribute("data-copy-target");
      const codeElem = document.getElementById(targetId);
      
      if (codeElem) {
        navigator.clipboard
          .writeText(codeElem.innerText)
          .then(() => {
            const originalText = btn.textContent;
            btn.textContent = "Copied!";
            setTimeout(() => {
              btn.textContent = originalText;
            }, 1200);
          })
          .catch(err => {
            console.error("Failed to copy: ", err);
          });
      }
    });
  });
}

function initializeMotion() {
  // Motion One globally available as window.motion from UMD bundle
  const m = window.motion;
  if (!m || !m.animate) return;

  // Header entrance
  const header = document.querySelector('header');
  if (header) {
    m.animate(header, { opacity: [0, 1], transform: ["translateY(-10px)", "none"] }, { duration: 0.5, easing: "ease-out" });
  }

  // Cards subtle pop
  document.querySelectorAll('.card').forEach((card, idx) => {
    m.animate(card, { opacity: [0, 1], transform: ["translateY(6px)", "none"] }, { delay: 0.08 * idx, duration: 0.45, easing: "cubic-bezier(.22,.61,.36,1)" });
    card.addEventListener('mouseenter', () => {
      m.animate(card, { transform: ["none", "translateY(-2px)"] }, { duration: 0.2 });
    });
    card.addEventListener('mouseleave', () => {
      m.animate(card, { transform: ["translateY(-2px)", "none"] }, { duration: 0.2 });
    });
  });

  // Feature and step hover emphasis (icon + title slight motion)
  document.querySelectorAll('.feature .card-head, .step .card-head').forEach((head) => {
    const icon = head.querySelector('.icon');
    const title = head.querySelector('h3, h4');
    const parent = head.closest('.card') || head;
    if (!parent) return;
    parent.addEventListener('mouseenter', () => {
      if (icon) m.animate(icon, { transform: ["none", "scale(1.06)"] }, { duration: 0.18 });
      if (title) m.animate(title, { transform: ["none", "translateX(2px)"] }, { duration: 0.18 });
    });
    parent.addEventListener('mouseleave', () => {
      if (icon) m.animate(icon, { transform: ["scale(1.06)", "none"] }, { duration: 0.18 });
      if (title) m.animate(title, { transform: ["translateX(2px)", "none"] }, { duration: 0.18 });
    });
  });

  // CTA micro interaction
  document.querySelectorAll('.cta-button').forEach((btn) => {
    btn.addEventListener('mousedown', () => {
      m.animate(btn, { transform: ["none", "scale(0.98)"] }, { duration: 0.12 });
    });
    btn.addEventListener('mouseup', () => {
      m.animate(btn, { transform: ["scale(0.98)", "none"] }, { duration: 0.12 });
    });
  });
}