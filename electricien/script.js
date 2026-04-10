// Électricité Martin — Pierre Martin — 2026-04-10

document.addEventListener('DOMContentLoaded', () => {

  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  const hamburger   = document.getElementById('hamburger');
  const mobileNav   = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobileClose');
  const openMenu  = () => { hamburger.classList.add('active'); mobileNav.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const closeMenu = () => { hamburger.classList.remove('active'); mobileNav.classList.remove('open'); document.body.style.overflow = ''; };
  hamburger.addEventListener('click', () => mobileNav.classList.contains('open') ? closeMenu() : openMenu());
  mobileClose.addEventListener('click', closeMenu);
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 140) current = sec.id; });
    navLinks.forEach(a => { a.classList.toggle('active', a.getAttribute('href') === `#${current}`); });
  }, { passive: true });

  const statEls = document.querySelectorAll('.stat-num[data-target]');
  const runCounter = (el) => {
    if (el.dataset.animated) return;
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    el.dataset.animated = '1';
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 60));
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, 20);
  };
  const checkStats = () => { statEls.forEach(el => { const rect = el.getBoundingClientRect(); if (rect.top < window.innerHeight - 60) runCounter(el); }); };
  window.addEventListener('scroll', checkStats, { passive: true });
  checkStats();

  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  const urgenceCheck = document.getElementById('urgenceCheck');
  const urgenceRow   = document.getElementById('urgenceRow');
  if (urgenceCheck && urgenceRow) {
    urgenceCheck.addEventListener('change', () => { urgenceRow.classList.toggle('checked', urgenceCheck.checked); });
  }

  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (form && success) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => { field.style.borderColor = ''; if (!field.value.trim()) { field.style.borderColor = '#E57373'; valid = false; } });
      if (!valid) return;
      form.style.display = 'none';
      success.style.display = 'block';
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = header.offsetHeight + 8;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });

});
