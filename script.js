// Nav scroll state
const navEl = document.getElementById("nav");
window.addEventListener(
  "scroll",
  () => {
    navEl.classList.toggle("scrolled", window.scrollY > 10);
  },
  { passive: true },
);

// Active nav link via IntersectionObserver
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll("#navLinks a, #mobileNav a");

const sectionObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        navAnchors.forEach((a) => {
          a.classList.toggle(
            "active",
            a.getAttribute("href") === "#" + e.target.id,
          );
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" },
);

sections.forEach((s) => sectionObs.observe(s));

// Hamburger menu
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");

hamburger.addEventListener("click", () => {
  const isOpen = hamburger.classList.toggle("open");
  mobileNav.classList.toggle("open", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
});

mobileNav.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    hamburger.classList.remove("open");
    mobileNav.classList.remove("open");
    document.body.style.overflow = "";
  });
});

// Reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        revealObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);

revealEls.forEach((el) => revealObs.observe(el));

// Form validation
const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const successEl = document.getElementById("formSuccess");

function validateEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
}
function setError(inputId, errId, msg) {
  const inp = document.getElementById(inputId);
  const err = document.getElementById(errId);
  if (msg) {
    inp.classList.add("error");
    err.textContent = msg;
    return false;
  } else {
    inp.classList.remove("error");
    err.textContent = "";
    return true;
  }
}

// Live validation
["fname", "email", "message"].forEach((id) => {
  document.getElementById(id).addEventListener("input", () => {
    clearError(id);
  });
});
function clearError(id) {
  const inp = document.getElementById(id);
  const err = document.getElementById(id + "-error");
  inp.classList.remove("error");
  if (err) err.textContent = "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  const fname = document.getElementById("fname").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  valid =
    setError(
      "fname",
      "fname-error",
      !fname ? "Please enter your first name." : "",
    ) && valid;
  valid =
    setError(
      "email",
      "email-error",
      !email
        ? "Email is required."
        : !validateEmail(email)
          ? "Please enter a valid email address."
          : "",
    ) && valid;
  valid =
    setError(
      "message",
      "message-error",
      !message
        ? "Message cannot be empty."
        : message.length < 10
          ? "Message is too short (min 10 characters)."
          : "",
    ) && valid;

  if (!valid) return;

  // Simulate send
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 0.8s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        Sending…
      `;

  setTimeout(() => {
    form.style.display = "none";
    successEl.classList.add("show");
  }, 1400);
});
