// =========================================
// LANDING PAGE INTERACTIVITY — script.js
// =========================================

// 1. Sticky navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// 2. Message carousel — single slot, updated by JS
const MESSAGES = [
  { icon: '💪', text: '"Hey there! You\'ve been scrolling for a while. Time to do 10 pushups!"' },
  { icon: '👀', text: '"Look away from the screen for 20 seconds. Save those eyes!"' },
  { icon: '💧', text: '"Hydration check! Go grab a glass of water, you deserve it."' },
  { icon: '🚶', text: '"Get up and stretch those legs! A quick walk does wonders."' },
  { icon: '🌬️', text: '"Correct your posture! Sit up straight and take a deep breath."' },
  { icon: '📚', text: '"Are you still watching? Maybe it\'s time to read a book or learn something new!"' },
];

const ticker = document.getElementById('messages-ticker');
const iconEl = document.getElementById('msg-icon');
const textEl = document.getElementById('msg-text');
const dots   = document.querySelectorAll('.ticker-dot');
let currentIndex = 0;
let autoPlay;

function showMessage(index) {
  // Fade out
  ticker.style.opacity = '0';

  setTimeout(() => {
    iconEl.textContent = MESSAGES[index].icon;
    textEl.textContent = MESSAGES[index].text;

    // Update dots
    dots.forEach(d => d.classList.remove('active'));
    dots[index].classList.add('active');

    // Fade in
    ticker.style.opacity = '1';
    currentIndex = index;
  }, 280);
}

function nextMessage() {
  showMessage((currentIndex + 1) % MESSAGES.length);
}

// Smooth opacity transition on ticker
ticker.style.transition = 'opacity 0.28s ease';

// Dot click control
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    clearInterval(autoPlay);
    showMessage(parseInt(dot.dataset.index));
    autoPlay = setInterval(nextMessage, 3500);
  });
});

// Start rotation
autoPlay = setInterval(nextMessage, 3500);

// 3. Scroll reveal animation with IntersectionObserver
document.querySelectorAll(
  '.feature-card, .step, .download-card, .section-title, .section-label, .download-text p, .messages-ticker'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.65s ease, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.feature-card, .step, .download-card, .section-title, .section-label, .messages-ticker').forEach(el => observer.observe(el));

// 4. Smooth anchor navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
