/* ─── Dark / Light mode toggle ───────────────────────────────── */
(function initTheme() {
  const stored = localStorage.getItem("theme");
  if (stored) {
    document.documentElement.setAttribute("data-theme", stored);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();

const themeToggle = document.getElementById("themeToggle");
themeToggle && themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const next = isDark ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

/* ─── Reveal on scroll ───────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ─── Nav scroll state ───────────────────────────────────────── */
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

/* ─── Active nav link ────────────────────────────────────────── */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navLinks.forEach((a) => {
          a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
sections.forEach((s) => sectionObserver.observe(s));

/* ─── Hamburger / mobile drawer ─────────────────────────────── */
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileNav.classList.toggle("open");
});

// Close drawer on link click
mobileNav.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    hamburger.classList.remove("open");
    mobileNav.classList.remove("open");
  });
});

// Close on outside click
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
    hamburger.classList.remove("open");
    mobileNav.classList.remove("open");
  }
});

/* ─── Contact form validation ────────────────────────────────── */
const form = document.getElementById("contactForm");
const success = document.getElementById("formSuccess");
const submitBtn = document.getElementById("submitBtn");

function setError(inputId, errorId, msg) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (msg) {
    input.classList.add("error");
    error.textContent = msg;
  } else {
    input.classList.remove("error");
    error.textContent = "";
  }
}

function validateEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

form && form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  const fname = document.getElementById("fname").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!fname) {
    setError("fname", "fname-error", "First name is required.");
    valid = false;
  } else {
    setError("fname", "fname-error", "");
  }

  if (!email) {
    setError("email", "email-error", "Email address is required.");
    valid = false;
  } else if (!validateEmail(email)) {
    setError("email", "email-error", "Please enter a valid email address.");
    valid = false;
  } else {
    setError("email", "email-error", "");
  }

  if (!message) {
    setError("message", "message-error", "Message cannot be empty.");
    valid = false;
  } else {
    setError("message", "message-error", "");
  }

  if (!valid) return;

  // Simulate send
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending…";

  setTimeout(() => {
    form.style.display = "none";
    success.classList.add("show");
  }, 1000);
});