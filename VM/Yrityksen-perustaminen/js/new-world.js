// ============================================
// NEW WORLD - AI agent parallel visualization
// ============================================

import { AgentSimulator } from './agents.js';

let simulator = null;
let isRunning = false;

export function initNewWorld() {
  const startBtn = document.getElementById('nw-start-btn');
  const resetBtn = document.getElementById('nw-reset-btn');
  const restartBtn = document.getElementById('nw-restart-btn');

  if (startBtn) {
    startBtn.addEventListener('click', startSequence);
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', resetSequence);
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      resetSequence();
      // Small delay so reset visually completes before restarting
      setTimeout(() => startSequence(), 300);
    });
  }
}

async function startSequence() {
  if (isRunning) return;
  isRunning = true;

  const startBtn = document.getElementById('nw-start-btn');
  const resetBtn = document.getElementById('nw-reset-btn');

  if (startBtn) startBtn.style.display = 'none';
  if (resetBtn) resetBtn.style.display = 'inline-flex';

  simulator = new AgentSimulator();

  // Step 1: Show agent architecture
  showStep(1);
  const humanStatus = document.getElementById('nw-human-status');
  if (humanStatus) humanStatus.textContent = '"Haluan perustaa yrityksen"';
  await delay(800);

  // Step 2: Chat sequence
  showStep(2);
  await simulator.runChatSequence();
  await delay(500);

  // Step 3: Parallel work
  showStep(3);
  await simulator.runParallelWork();
  await delay(500);

  // Step 4: Handoff animation
  showStep(4);
  await simulator.runHandoffAnimation();

  // Step 5: Results
  showStep(5);
  await simulator.showResults();
  await delay(800);

  // Step 6: National impact
  showStep(6);
  await simulator.animateImpact();

  // Show restart button at the bottom
  const bottomControls = document.getElementById('nw-controls-bottom');
  if (bottomControls) {
    bottomControls.style.display = 'flex';
    bottomControls.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  isRunning = false;
}

function showStep(num) {
  const step = document.getElementById(`nw-step-${num}`);
  if (step) {
    step.classList.add('visible');
    // Scroll into view smoothly
    step.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function resetSequence() {
  isRunning = false;

  const startBtn = document.getElementById('nw-start-btn');
  const resetBtn = document.getElementById('nw-reset-btn');

  if (startBtn) startBtn.style.display = 'inline-flex';
  if (resetBtn) resetBtn.style.display = 'none';

  // Hide all steps
  for (let i = 1; i <= 6; i++) {
    const step = document.getElementById(`nw-step-${i}`);
    if (step) step.classList.remove('visible');
  }

  // Clear chat
  const chatContainer = document.getElementById('nw-chat-messages');
  if (chatContainer) chatContainer.innerHTML = '';

  // Clear task lists
  ['prh', 'vero', 'pankki'].forEach(col => {
    const tasks = document.getElementById(`nw-tasks-${col}`);
    if (tasks) tasks.innerHTML = '';
    const bar = document.getElementById(`nw-progress-${col}`);
    if (bar) {
      const fill = bar.querySelector('.nw-prog-fill');
      if (fill) fill.style.width = '0';
    }
  });

  // Hide result cards
  document.querySelectorAll('.nw-result-card').forEach(card => {
    card.classList.remove('visible');
  });

  // Reset impact counter
  const impactEl = document.getElementById('nw-impact-hours');
  if (impactEl) impactEl.textContent = '0';

  // Reset handoff packets
  document.querySelectorAll('.nw-h-packet').forEach(p => {
    gsap.set(p, { opacity: 0 });
  });

  // Reset human lounge
  const loungeAvatar = document.getElementById('nw-lounge-avatar');
  const loungeActivity = document.getElementById('nw-lounge-activity');
  const loungeTicker = document.getElementById('nw-lounge-ticker');
  if (loungeAvatar) loungeAvatar.textContent = '☕';
  if (loungeActivity) loungeActivity.textContent = 'Juo kahvia rauhassa...';
  if (loungeTicker) loungeTicker.innerHTML = '';

  // Reset human status in step 1
  const humanStatus = document.getElementById('nw-human-status');
  if (humanStatus) humanStatus.textContent = '"Haluan perustaa yrityksen"';

  // Hide bottom restart button
  const bottomControls = document.getElementById('nw-controls-bottom');
  if (bottomControls) bottomControls.style.display = 'none';

  // Scroll back to top of section
  document.getElementById('new-world')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
