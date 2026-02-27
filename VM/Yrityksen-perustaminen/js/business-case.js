// ============================================
// BUSINESS CASE - Counter animations, comparison charts, flip cards
// ============================================

let hasAnimated = false;
let observer = null;

export function initBusinessCase() {
  // Use section change event to trigger animations
  window.addEventListener('sectionchange', (e) => {
    if (e.detail.section === 'business-case' && !hasAnimated) {
      hasAnimated = true;
      requestAnimationFrame(() => {
        animateNumbers();
        animateComparisonBars();
      });
    }
  });

  // Setup flip cards (hover is CSS, but add click toggle for mobile)
  setupFlipCards();
}

function animateNumbers() {
  const cards = document.querySelectorAll('.bc-number');

  cards.forEach((card, index) => {
    const target = parseInt(card.dataset.target, 10);
    const suffix = card.dataset.suffix || '';

    // Stagger start
    setTimeout(() => {
      animateCounter(card, 0, target, 2000, suffix);
    }, index * 200);
  });
}

function animateCounter(el, start, end, duration, suffix = '') {
  const startTime = performance.now();

  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (end - start) * eased);

    el.textContent = formatNumber(current) + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
}

function formatNumber(num) {
  return num.toLocaleString('fi-FI');
}

function animateComparisonBars() {
  const bars = document.querySelectorAll('.bc-comp-bar');

  bars.forEach((bar, index) => {
    const targetWidth = bar.dataset.width;

    setTimeout(() => {
      bar.style.width = `${targetWidth}%`;
    }, 800 + index * 150);
  });
}

function setupFlipCards() {
  const cards = document.querySelectorAll('.bc-card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });

    // Also handle keyboard
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Klikkaa nähdäksesi lisätiedot');

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    });
  });
}
