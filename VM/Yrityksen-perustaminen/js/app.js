// ============================================
// APP - Navigation, section management, initialization
// ============================================

import { initOldWorld } from './old-world.js';
import { initOldWorld3D } from './old-world-3d.js';
import { initNewWorld } from './new-world.js';
import { initBusinessCase } from './business-case.js';

class App {
  constructor() {
    this.currentSection = 'hero';
    this.sections = ['hero', 'old-world', 'new-world', 'business-case'];
    this.navLinks = document.querySelectorAll('.nav-link');
    this.sectionEls = {};

    this.sections.forEach(id => {
      this.sectionEls[id] = document.getElementById(id);
    });

    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupHero();
    this.animateHeroCounters();

    // Initialize modules
    initOldWorld();
    initOldWorld3D();
    initNewWorld();
    initBusinessCase();
  }

  setupNavigation() {
    // Nav link clicks
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const section = link.dataset.section;
        this.navigateTo(section);
      });
    });

    // CTA button navigation
    document.querySelectorAll('[data-navigate]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.navigateTo(btn.dataset.navigate);
      });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      const idx = this.sections.indexOf(this.currentSection);
      if (e.key === 'ArrowRight' && idx < this.sections.length - 1) {
        this.navigateTo(this.sections[idx + 1]);
      } else if (e.key === 'ArrowLeft' && idx > 0) {
        this.navigateTo(this.sections[idx - 1]);
      }
    });
  }

  navigateTo(sectionId) {
    if (sectionId === this.currentSection) return;

    // Hide current section
    const currentEl = this.sectionEls[this.currentSection];
    if (currentEl) {
      currentEl.classList.remove('active');
    }

    // Show new section
    const newEl = this.sectionEls[sectionId];
    if (newEl) {
      // Small delay for transition
      requestAnimationFrame(() => {
        newEl.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
    }

    // Update nav
    this.navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === sectionId);
    });

    this.currentSection = sectionId;

    // Dispatch event for modules to react
    window.dispatchEvent(new CustomEvent('sectionchange', {
      detail: { section: sectionId }
    }));
  }

  setupHero() {
    // "Why this demo" toggle
    const whyLink = document.getElementById('why-link');
    const whyContent = document.getElementById('hero-why');

    if (whyLink && whyContent) {
      whyLink.addEventListener('click', (e) => {
        e.preventDefault();
        whyContent.classList.toggle('open');
        whyLink.textContent = whyContent.classList.contains('open')
          ? 'Piilota ↑'
          : 'Miksi tämä demo? ↓';
      });
    }
  }

  animateHeroCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target, 10);
      this.animateCounter(counter, 0, target, 1500);
    });
  }

  animateCounter(el, start, end, duration) {
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);

      el.textContent = current.toLocaleString('fi-FI');

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
