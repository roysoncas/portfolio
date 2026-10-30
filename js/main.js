/**
 * ==============================================================================
 * MAIN.JS - Modern Developer UX & Interactive Systems
 * Zero external dependencies. Instant execution.
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Glass State on Scroll
  const navbar = document.getElementById('main-navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. Mobile Hamburger Menu
  const mobileToggle = document.getElementById('mobile-toggle-btn');
  const navLinks = document.getElementById('nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      mobileToggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.classList.remove('active');
      });
    });
  }

  // 3. Scrollspy active link highlight
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 180;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });

  // 4. Skills Category Filtering
  const skillPills = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');
  skillPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      skillPills.forEach(p => p.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const cat = e.currentTarget.getAttribute('data-cat');

      skillCards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-cat') === cat) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // 5. Interactive Project Deep-Dive Modal
  const projectData = {
    epharmacy: {
      title: 'E-Pharmacy — Online Medicine Ordering Platform',
      badge: 'Academic Project | Full-Stack Web Application',
      period: '01/2025 – 02/2025',
      tech: ['PHP 8.x', 'MySQL', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap 5', 'Apache', 'XAMPP'],
      summary: 'A secure pharmaceutical ecommerce system engineered to streamline searching, prescription verification, order management, and medicine delivery tracking.',
      features: [
        'Secure user authentication and customer portal with encrypted password hashing.',
        'Real-time medicine search with category filtering and composition lookups.',
        'Digital prescription upload and pharmacist review pipeline.',
        'Shopping cart state management with live inventory stock verification.',
        'Comprehensive admin panel for stock quantity tracking and batch updates.',
        'Cash-On-Delivery (COD) lifecycle state management with order status transitions.'
      ],
      architecture: [
        { title: 'Frontend Layer', desc: 'Responsive Bootstrap 5 UI with AJAX cart updates and form validation' },
        { title: 'Backend Engine', desc: 'Modular PHP backend with MVC-patterned session & request sanitization' },
        { title: 'Relational Database', desc: 'Normalized MySQL schemas for Users, Medicines, Orders, and Prescriptions' },
        { title: 'Security Safeguards', desc: 'Prepared SQL Statements to eliminate SQL injection and secure file MIME verification' }
      ]
    },
    quickdoc: {
      title: 'QuickDoc — Doctor Appointment Booking System',
      badge: 'Team Project | Native Android & Firebase Cloud',
      period: 'Collaborative Project | Android Studio',
      tech: ['Java', 'Android Studio', 'XML UI', 'Firebase Authentication', 'Cloud Firestore', 'Firebase Storage', 'Firebase Cloud Messaging (FCM)'],
      summary: 'A high-performance Android mobile application built for instantaneous doctor discovery, real-time appointment scheduling, and automated cloud sync.',
      features: [
        'Dual patient and doctor onboarding with secure Firebase Authentication.',
        'Doctor discovery sorted by medical specialty, ratings, and real-time calendar slots.',
        'Real-time appointment scheduling synchronized instantly via Cloud Firestore listeners.',
        'Instant push notifications dispatched via Firebase Cloud Messaging (FCM).',
        'Secure medical reports and prescription storage in Firebase Cloud Storage.',
        'Modern Android Material Design XML interfaces with custom RecyclerView adapters.'
      ],
      architecture: [
        { title: 'Native Android App', desc: 'Java-based Android application leveraging ViewBinding and Material XML layouts' },
        { title: 'Cloud Identity', desc: 'Firebase Auth tokenized credentials for patients and practitioners' },
        { title: 'Real-Time Database', desc: 'NoSQL Cloud Firestore ensuring synchronized booking states without server polling' },
        { title: 'Notification System', desc: 'FCM push alert triggers for booking confirmations and cancellation alerts' }
      ]
    }
  };

  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content-area');
  const modalClose = document.getElementById('modal-close');

  document.querySelectorAll('.open-project-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const key = e.currentTarget.getAttribute('data-project');
      const data = projectData[key];
      if (!data || !modal || !modalContent) return;

      modalContent.innerHTML = `
        <div class="modal-header">
          <div class="modal-badge-row">
            <span class="m-badge">${data.badge}</span>
            <span class="m-period">${data.period}</span>
          </div>
          <h2 class="m-title">${data.title}</h2>
          <p class="m-summary">${data.summary}</p>
        </div>

        <div class="modal-block">
          <h4 class="m-section-heading">Technology Stack</h4>
          <div class="m-tech-cloud">
            ${data.tech.map(t => `<span class="m-tech-pill">${t}</span>`).join('')}
          </div>
        </div>

        <div class="modal-block">
          <h4 class="m-section-heading">Core Features & Capabilities</h4>
          <ul class="m-feature-list">
            ${data.features.map(f => `<li><span class="m-bullet">▹</span> ${f}</li>`).join('')}
          </ul>
        </div>

        <div class="modal-block">
          <h4 class="m-section-heading">System Architecture</h4>
          <div class="m-arch-grid">
            ${data.architecture.map(a => `
              <div class="m-arch-card">
                <strong>${a.title}</strong>
                <p>${a.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // 6. Copy to Clipboard with Animated Toast
  document.querySelectorAll('.copy-action').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const text = e.currentTarget.getAttribute('data-copy');
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(`Copied: ${text}`);
        }).catch(() => {
          showToast('Copy successful');
        });
      }
    });
  });

  // 7. Contact Form Handler (Direct mailto trigger)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name')?.value || '';
      const email = document.getElementById('email')?.value || '';
      const message = document.getElementById('message')?.value || '';

      const mailto = `mailto:roysoncastelino04@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Sender: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      showToast('Opening email client...');
      setTimeout(() => {
        window.location.href = mailto;
      }, 400);
    });
  }

  // 8. 3D Tilt Effect on Identity & Project Cards
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.tilt-element').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        card.style.transform = `perspective(800px) rotateX(${(-y / rect.height) * 8}deg) rotateY(${(x / rect.width) * 8}deg) translateZ(6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)';
      });
    });
  }
});

// Toast notification helper
function showToast(msg) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-box';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}
