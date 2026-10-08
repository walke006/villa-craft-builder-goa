/* ==========================================================================
   VILLACRAFT BUILDERS - MAIN APPLICATION CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initActiveNavLinkObserver();
  initContactForm();
  initWhatsAppButtons();
});

/* 1. Navbar Scroll Shrink & Glass Effect */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* 2. Mobile Drawer Navigation */
function initMobileMenu() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.mobile-drawer-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburgerBtn || !mobileDrawer) return;

  function toggleMenu() {
    hamburgerBtn.classList.toggle('active');
    mobileDrawer.classList.toggle('open');
    if (drawerOverlay) drawerOverlay.classList.toggle('active');
    
    const isOpen = mobileDrawer.classList.contains('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburgerBtn.addEventListener('click', toggleMenu);
  if (drawerOverlay) drawerOverlay.addEventListener('click', toggleMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer.classList.contains('open')) {
        toggleMenu();
      }
    });
  });
}

/* 3. Highlight Active Section in Navigation */
function initActiveNavLinkObserver() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* 4. Contact Form Submission Handler */
function initContactForm() {
  const form = document.getElementById('enquiry-form');
  const successModal = document.getElementById('success-modal');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name')?.value || 'Valued Client';
    const phone = document.getElementById('form-phone')?.value || '';
    const email = document.getElementById('form-email')?.value || '';
    const projectType = document.getElementById('form-project-type')?.value || 'Construction';
    const location = document.getElementById('form-location')?.value || 'North Goa';
    const message = document.getElementById('form-message')?.value || '';

    // Simulate backend submission response
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Submitting Enquiry...';
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'SUBMIT ENQUIRY';
      }

      form.reset();

      // Populate success modal
      const modalBody = document.getElementById('success-modal-body');
      if (modalBody && successModal) {
        modalBody.innerHTML = `
          <div style="text-align: center; padding: 1rem 0;">
            <div style="width: 70px; height: 70px; background: rgba(37, 211, 102, 0.12); color: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; margin: 0 auto 1.5rem;">
              ✓
            </div>
            <h3 style="font-size: 1.8rem; margin-bottom: 0.5rem; color: var(--text-primary);">Enquiry Received!</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
              Thank you, <strong>${name}</strong>. Our senior project management team in North Goa will contact you shortly at <strong>${phone || email}</strong>.
            </p>
            <div style="background: var(--bg-secondary); padding: 1.2rem; border-radius: 8px; text-align: left; font-size: 0.9rem; margin-bottom: 1.5rem;">
              <p><strong>Project Type:</strong> ${projectType}</p>
              <p><strong>Location:</strong> ${location}</p>
              <p><strong>Reference ID:</strong> VC-${Math.floor(100000 + Math.random() * 900000)}</p>
            </div>
            <button class="btn btn-primary" onclick="document.getElementById('success-modal').classList.remove('active')">
              Done
            </button>
          </div>
        `;
        successModal.classList.add('active');
      }
    }, 800);
  });
}

/* 5. Pre-filled WhatsApp Communication */
function initWhatsAppButtons() {
  const whatsappBtns = document.querySelectorAll('.btn-whatsapp');

  whatsappBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const defaultMsg = encodeURIComponent("Hello VillaCraft Builders, I would like to enquire about construction & building material supply in North Goa.");
      window.open(`https://wa.me/919876543210?text=${defaultMsg}`, '_blank');
    });
  });
}
