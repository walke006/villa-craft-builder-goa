/* ==========================================================================
   VILLACRAFT BUILDERS - PROJECTS GALLERY & LIGHTBOX MODAL
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initProjectFilters();
  initProjectModals();
});

/* Sample Project Dataset for Lightbox Detail View */
const projectsData = {
  'project-1': {
    title: 'The Ananda Luxury Estate',
    category: 'Residential Villa',
    location: 'Assagao, North Goa',
    area: '7,500 Sq. Ft.',
    year: '2024',
    scope: 'Complete Turnkey Construction & Material Supply',
    description: 'A flagship modern architectural villa featuring exposed Goan laterite stone masonry, cantilevered concrete decks, infinity swimming pool, and custom tropical timber finishings.',
    image: 'assets/images/hero_luxury_goa_villa.jpg',
    highlights: ['Turnkey Luxury Villa', 'Goan Laterite Architecture', 'Infinity Edge Pool', 'Biophilic Design']
  },
  'project-2': {
    title: 'Aurora Commercial Galleria',
    category: 'Commercial Complex',
    location: 'Panaji, North Goa',
    area: '14,200 Sq. Ft.',
    year: '2023',
    scope: 'Grey Structure & Exterior Glazing',
    description: 'A contemporary boutique retail & commercial complex in the heart of Panaji with high-span glass facades, polished concrete columns, and integrated courtyard water features.',
    image: 'assets/images/project_commercial_complex.jpg',
    highlights: ['Commercial Retail Space', 'Post-Tensioned Slabs', 'High-Thermal Performance Glass', 'Underground Parking']
  },
  'project-3': {
    title: 'Greenvale Residences Phase 1',
    category: 'Grey Structure Construction',
    location: 'Porvorim, North Goa',
    area: '18,500 Sq. Ft.',
    year: '2024',
    scope: 'Structural Concrete & Masonry Sourcing',
    description: 'Multi-unit luxury villa enclave constructed using high-grade TMT steel, precision AAC blocks, and in-house supplied fine river sand and crushed aggregate mix.',
    image: 'assets/images/construction_site_goa.jpg',
    highlights: ['Multi-Unit Development', 'Seismic Zone Compliant Structure', 'Eco AAC Block Masonry', 'Strict Quality Audits']
  },
  'project-4': {
    title: 'Villa La Botanica',
    category: 'Turnkey Luxury Villa',
    location: 'Candolim, North Goa',
    area: '6,200 Sq. Ft.',
    year: '2023',
    scope: 'Key-in-Hand Turnkey Project',
    description: 'Private coastal estate surrounded by palm groves, showcasing warm teak wood joinery, custom stone masonry, and high-performance climate insulation.',
    image: 'assets/images/project_turnkey_villa.jpg',
    highlights: ['Coastal Villa', 'Custom Timber & Laterite Work', 'Smart Home Integration', 'Turnkey Handover']
  }
};

/* 1. Category Filter Logic */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* 2. Lightbox Modal Renderer */
function initProjectModals() {
  const projectCards = document.querySelectorAll('.project-card');
  const modalOverlay = document.getElementById('project-modal');
  const modalContainer = document.getElementById('project-modal-body');
  const closeBtn = document.getElementById('modal-close');

  if (!modalOverlay || !modalContainer) return;

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-id');
      const data = projectsData[projectId];

      if (data) {
        modalContainer.innerHTML = `
          <div class="modal-project-wrap">
            <div style="height: 320px; border-radius: 12px; overflow: hidden; margin-bottom: 1.5rem;">
              <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
              <div>
                <span style="color: var(--accent-laterite); font-weight: 700; font-family: var(--font-mono); font-size: 0.85rem; text-transform: uppercase;">${data.category}</span>
                <h2 style="font-size: 2rem; margin-top: 0.2rem;">${data.title}</h2>
                <p style="color: var(--text-muted); font-size: 0.95rem;">📍 ${data.location}</p>
              </div>
              <div style="text-align: right;">
                <span style="font-size: 1.3rem; font-weight: 800; color: var(--accent-gold); display: block;">${data.area}</span>
                <span style="font-size: 0.85rem; color: var(--text-muted);">Completed ${data.year}</span>
              </div>
            </div>
            <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 1.2rem 0;">
            <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-secondary); margin-bottom: 1.5rem;">
              ${data.description}
            </p>
            <div style="margin-bottom: 1.5rem;">
              <h4 style="font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.8rem;">Project Scope:</h4>
              <p style="font-weight: 600; color: var(--text-primary);">${data.scope}</p>
            </div>
            <div>
              <h4 style="font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.8rem;">Key Highlights:</h4>
              <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
                ${data.highlights.map(h => `<span style="background: rgba(200, 90, 50, 0.08); color: var(--accent-laterite); padding: 0.4rem 0.9rem; border-radius: 50px; font-size: 0.82rem; font-weight: 600;">✓ ${h}</span>`).join('')}
              </div>
            </div>
          </div>
        `;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}
