/* main.js — Micko Adrielle De Dios Portfolio */

// --- Mobile Nav Toggle ---
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks && navLinks.classList.remove('open');
    navToggle && navToggle.setAttribute('aria-expanded', 'false');
  });
});

// --- Scroll-based nav shadow ---
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  if (window.scrollY > 10) {
    nav.style.boxShadow = '0 4px 32px rgba(0,0,0,.5)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

// --- Intersection Observer for animate-in ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.animate-in').forEach(el => {
  // Only pause non-hero elements (hero animates immediately)
  if (!el.closest('.hero') && !el.closest('.page-hero')) {
    el.style.animationPlayState = 'paused';
  }
  observer.observe(el);
});

// --- Contact Form Handler ---
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const subject = form.querySelector('#subject').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !subject || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Simulate submission success
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      form.reset();
      btn.textContent = 'Send Message ✉️';
      btn.disabled = false;
      if (formSuccess) {
        formSuccess.classList.add('show');
        setTimeout(() => formSuccess.classList.remove('show'), 6000);
      }
    }, 1200);
  });
}

// --- Smooth active link highlight on scroll ---
// (For single-page scrollable portfolios, not needed here as we use separate pages)

// --- Keyboard Accessibility: close nav on Escape ---
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    navToggle && navToggle.setAttribute('aria-expanded', 'false');
    navToggle && navToggle.focus();
  }
});

console.log('👋 Micko Adrielle De Dios Portfolio — Built with HTML, CSS & JavaScript');
