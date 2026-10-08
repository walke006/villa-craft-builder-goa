/* ==========================================================================
   VILLACRAFT BUILDERS - ANIMATIONS & INTERSECTION OBSERVER LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveals();
  initCounterAnimations();
  initCustomCursor();
  initParallaxEffects();
});

/* 1. Scroll Reveal Observer */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Option: keep observed or unobserve after active
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

/* 2. Number Counter Animation */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.stat-number');
  let animated = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const prefix = counter.getAttribute('data-prefix') || '';
          const suffix = counter.getAttribute('data-suffix') || '';
          let count = 0;
          const speed = target > 1000 ? 50 : 20;
          const increment = Math.ceil(target / speed);

          const updateCount = () => {
            count += increment;
            if (count < target) {
              counter.innerHTML = `${prefix}${count}${suffix}`;
              setTimeout(updateCount, 40);
            } else {
              counter.innerHTML = `${prefix}${target}${suffix}`;
            }
          };

          updateCount();
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) {
    counterObserver.observe(statsSection);
  }
}

/* 3. Custom Cursor Follower */
function initCustomCursor() {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorFollower = document.querySelector('.cursor-follower');

  if (!cursorDot || !cursorFollower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  function renderCursor() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;

    cursorFollower.style.left = `${followerX}px`;
    cursorFollower.style.top = `${followerY}px`;

    requestAnimationFrame(renderCursor);
  }

  renderCursor();

  // Hover states for interactive elements
  const hoverables = document.querySelectorAll('a, button, .project-card, .service-card, .material-card');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.6)';
      cursorFollower.style.borderColor = '#D4AF37';
    });
    el.addEventListener('mouseleave', () => {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.borderColor = '#C85A32';
    });
  });
}

/* 4. Subtle Parallax Effect */
function initParallaxEffects() {
  const parallaxImages = document.querySelectorAll('.main-image-frame img');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    parallaxImages.forEach(img => {
      const parent = img.parentElement;
      const rect = parent.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const speed = 0.08;
        const yPos = -(scrolled - parent.offsetTop) * speed;
        img.style.transform = `scale(1.08) translateY(${yPos}px)`;
      }
    });
  });
}
