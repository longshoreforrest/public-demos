// ============================================
// OLD WORLD - GSAP master timeline for 5-phase bureaucracy animation
// ============================================

import { PROCESS_DATA } from './data.js';

let masterTimeline = null;
let isRunning = false;

export function initOldWorld() {
  const startBtn = document.getElementById('ow-start-btn');
  const resetBtn = document.getElementById('ow-reset-btn');

  if (startBtn) {
    startBtn.addEventListener('click', startTimeline);
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', resetTimeline);
  }

  // Pre-populate paper stacks
  createPaperStack('ow-papers-1', PROCESS_DATA.oldWorld.phases[0].documents);
}

function createPaperStack(containerId, docs) {
  const container = document.getElementById(containerId);
  if (!container) return;

  docs.forEach((doc, i) => {
    const paper = document.createElement('div');
    paper.className = 'ow-paper';
    paper.title = doc;
    paper.style.setProperty('--rotation', `${-5 + Math.random() * 10}deg`);
    container.appendChild(paper);
  });
}

function startTimeline() {
  if (isRunning) return;
  isRunning = true;

  const startBtn = document.getElementById('ow-start-btn');
  const resetBtn = document.getElementById('ow-reset-btn');

  if (startBtn) startBtn.style.display = 'none';
  if (resetBtn) resetBtn.style.display = 'inline-flex';

  // Build GSAP master timeline
  masterTimeline = gsap.timeline({
    onComplete: () => {
      isRunning = false;
    }
  });

  // Phase 1: PRH
  buildPhase1(masterTimeline);

  // Phase 2: Vero
  buildPhase2(masterTimeline);

  // Phase 3: Pankki
  buildPhase3(masterTimeline);

  // Phase 4: YEL
  buildPhase4(masterTimeline);

  // Phase 5: Result
  buildPhase5(masterTimeline);
}

function activatePhase(phaseNum) {
  // Deactivate all, set previous as completed
  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById(`ow-phase-${i}`);
    if (!el) continue;
    if (i < phaseNum) {
      el.classList.remove('active');
      el.classList.add('completed');
    } else if (i === phaseNum) {
      el.classList.add('active');
      el.classList.remove('completed');
    } else {
      el.classList.remove('active', 'completed');
    }
  }

  // Update progress bar
  updateProgress(phaseNum);
}

function updateProgress(phase) {
  const bar = document.getElementById('ow-progress-bar');
  if (bar) {
    const pct = ((phase - 1) / 4) * 100;
    bar.style.setProperty('--progress', `${pct}%`);
    bar.querySelector('::after') ; // CSS handles this
    // Use GSAP to animate the pseudo-element via a wrapper approach
    gsap.to(bar, {
      '--target-width': `${pct}%`,
      duration: 0.5
    });
    // Actually set width on the after pseudo via a real child
    if (!bar.querySelector('.ow-progress-fill')) {
      const fill = document.createElement('div');
      fill.className = 'ow-progress-fill';
      fill.style.cssText = 'height:100%;background:var(--old-accent);border-radius:2px;width:0;transition:width 0.5s ease;';
      bar.appendChild(fill);
    }
    const fill = bar.querySelector('.ow-progress-fill');
    if (fill) {
      fill.style.width = `${pct}%`;
    }
  }
}

function buildPhase1(tl) {
  const phase = document.getElementById('ow-phase-1');
  const papers = phase ? phase.querySelectorAll('.ow-paper') : [];
  const stamp = document.getElementById('ow-stamp-1');
  const wait = phase ? phase.querySelector('.ow-wait-indicator') : null;

  tl.call(() => activatePhase(1));

  // Papers fall in
  if (papers.length > 0) {
    tl.fromTo(papers, {
      y: -80,
      opacity: 0,
      rotation: () => gsap.utils.random(-15, 15)
    }, {
      y: 0,
      opacity: 1,
      rotation: () => gsap.utils.random(-5, 5),
      stagger: 0.15,
      duration: 0.5,
      ease: 'bounce.out'
    });
  }

  // Stamp slams down
  if (stamp) {
    tl.to(stamp, {
      duration: 0.01,
      onStart: () => stamp.classList.add('visible')
    }, '+=0.5');
    tl.fromTo(stamp, {
      scale: 3,
      opacity: 0
    }, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: 'back.out(2)'
    });

    // Screen shake
    tl.call(() => {
      document.querySelector('.section--old-world')?.classList.add('shake');
      setTimeout(() => {
        document.querySelector('.section--old-world')?.classList.remove('shake');
      }, 500);
    });
  }

  // Wait indicator
  if (wait) {
    tl.to(wait, {
      duration: 0.01,
      onStart: () => wait.classList.add('visible')
    }, '+=0.3');
    tl.to({}, { duration: 1.5 }); // pause for effect
  }

  // Trigger 3D paper burst
  tl.call(() => {
    window.dispatchEvent(new CustomEvent('ow3d:burst', { detail: { phase: 1 } }));
  });
}

function buildPhase2(tl) {
  const phase = document.getElementById('ow-phase-2');
  const forms = phase ? phase.querySelectorAll('.ow-form') : [];
  const conflict = document.getElementById('ow-conflict-2');
  const wait = phase ? phase.querySelector('.ow-wait-indicator') : null;

  tl.call(() => activatePhase(2), null, '+=0.3');

  // Forms slide in
  forms.forEach((form, i) => {
    tl.to(form, {
      duration: 0.01,
      onStart: () => form.classList.add('visible'),
      delay: i * 0.3
    });
  });

  // Conflict indicator
  if (conflict) {
    tl.to(conflict, {
      duration: 0.01,
      onStart: () => conflict.classList.add('visible')
    }, '+=0.5');
  }

  // Clock
  if (wait) {
    tl.to(wait, {
      duration: 0.01,
      onStart: () => wait.classList.add('visible')
    }, '+=0.3');
    tl.to({}, { duration: 1.2 });
  }

  tl.call(() => {
    window.dispatchEvent(new CustomEvent('ow3d:burst', { detail: { phase: 2 } }));
  });
}

function buildPhase3(tl) {
  const phase = document.getElementById('ow-phase-3');
  const vault = document.getElementById('ow-vault-3');
  const vaultDoor = vault ? vault.querySelector('.ow-vault-door') : null;
  const stamp = document.getElementById('ow-stamp-3');
  const scanLine = phase ? phase.querySelector('.ow-scan-line') : null;

  tl.call(() => activatePhase(3), null, '+=0.3');

  // Scan line animation
  if (scanLine) {
    tl.to(scanLine, { opacity: 1, duration: 0.3 });
    tl.to(scanLine, {
      x: '350%',
      duration: 1.5,
      ease: 'power1.inOut',
      repeat: 1
    });
  }

  // Vault door tries to open then slams shut
  if (vaultDoor) {
    tl.to(vaultDoor, {
      rotationY: -30,
      duration: 0.8,
      ease: 'power2.out',
      transformOrigin: 'left center',
      transformPerspective: 800
    }, '+=0.3');

    tl.to(vaultDoor, {
      rotationY: 0,
      duration: 0.3,
      ease: 'power3.in'
    }, '+=0.5');
  }

  // HYLÄTTY stamp
  if (stamp) {
    tl.to(stamp, {
      duration: 0.01,
      onStart: () => stamp.classList.add('visible')
    }, '+=0.3');
    tl.fromTo(stamp, {
      scale: 3,
      opacity: 0
    }, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: 'back.out(2)'
    });

    // Screen shake
    tl.call(() => {
      document.querySelector('.section--old-world')?.classList.add('shake');
      setTimeout(() => {
        document.querySelector('.section--old-world')?.classList.remove('shake');
      }, 500);
    });
  }

  tl.to({}, { duration: 1 });

  tl.call(() => {
    window.dispatchEvent(new CustomEvent('ow3d:burst', { detail: { phase: 3 } }));
  });
}

function buildPhase4(tl) {
  const calcValue = document.getElementById('ow-calc-value');
  const calcFill = document.getElementById('ow-calc-fill');
  const catch22 = document.getElementById('ow-catch22');

  tl.call(() => activatePhase(4), null, '+=0.3');

  // Calculator animation
  if (calcValue && calcFill) {
    const values = [
      { value: '500 €/kk', fill: '20%' },
      { value: '1 200 €/kk', fill: '45%' },
      { value: '2 500 €/kk', fill: '70%' },
      { value: '???', fill: '50%' }
    ];

    values.forEach((v, i) => {
      tl.to(calcFill, {
        width: v.fill,
        duration: 0.4,
        ease: 'power2.out',
        delay: i === 0 ? 0 : 0.3,
        onStart: () => {
          calcValue.textContent = v.value;
        }
      });
    });
  }

  // Catch-22 visualization
  if (catch22) {
    tl.to(catch22, {
      duration: 0.01,
      onStart: () => catch22.classList.add('visible')
    }, '+=0.3');
  }

  tl.to({}, { duration: 1 });
}

function buildPhase5(tl) {
  const hoursEl = document.getElementById('ow-result-hours');
  const weeksEl = document.getElementById('ow-result-weeks');
  const nationalEl = document.getElementById('ow-national');

  tl.call(() => activatePhase(5), null, '+=0.3');

  // Animate counters
  if (hoursEl) {
    const counter = { val: 0 };
    tl.to(counter, {
      val: 137,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        hoursEl.textContent = Math.round(counter.val);
      }
    });
  }

  if (weeksEl) {
    const counter = { val: 0 };
    tl.to(counter, {
      val: 6,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: () => {
        weeksEl.textContent = Math.round(counter.val);
      }
    }, '<+=0.3');
  }

  // National impact
  if (nationalEl) {
    tl.to(nationalEl, {
      duration: 0.01,
      onStart: () => nationalEl.classList.add('visible')
    }, '+=0.5');
  }

  // Update progress to 100%
  tl.call(() => {
    const fill = document.querySelector('.ow-progress-fill');
    if (fill) fill.style.width = '100%';
  });
}

function resetTimeline() {
  if (masterTimeline) {
    masterTimeline.kill();
    masterTimeline = null;
  }
  isRunning = false;

  const startBtn = document.getElementById('ow-start-btn');
  const resetBtn = document.getElementById('ow-reset-btn');

  if (startBtn) startBtn.style.display = 'inline-flex';
  if (resetBtn) resetBtn.style.display = 'none';

  // Reset all phases
  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById(`ow-phase-${i}`);
    if (el) {
      el.classList.remove('active', 'completed');
    }
  }

  // Reset stamps
  document.querySelectorAll('.ow-stamp').forEach(s => s.classList.remove('visible'));

  // Reset forms
  document.querySelectorAll('.ow-form').forEach(f => f.classList.remove('visible'));

  // Reset conflict indicators
  document.querySelectorAll('.ow-conflict-indicator').forEach(c => c.classList.remove('visible'));

  // Reset wait indicators
  document.querySelectorAll('.ow-wait-indicator').forEach(w => w.classList.remove('visible'));

  // Reset catch22
  const catch22 = document.getElementById('ow-catch22');
  if (catch22) catch22.classList.remove('visible');

  // Reset national
  const national = document.getElementById('ow-national');
  if (national) national.classList.remove('visible');

  // Reset counters
  const hoursEl = document.getElementById('ow-result-hours');
  const weeksEl = document.getElementById('ow-result-weeks');
  if (hoursEl) hoursEl.textContent = '0';
  if (weeksEl) weeksEl.textContent = '0';

  // Reset calculator
  const calcValue = document.getElementById('ow-calc-value');
  const calcFill = document.getElementById('ow-calc-fill');
  if (calcValue) calcValue.textContent = '0 €/kk';
  if (calcFill) calcFill.style.width = '0';

  // Reset progress
  const fill = document.querySelector('.ow-progress-fill');
  if (fill) fill.style.width = '0';

  // Reset 3D
  window.dispatchEvent(new CustomEvent('ow3d:reset'));
}
