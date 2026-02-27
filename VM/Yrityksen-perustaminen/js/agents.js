// ============================================
// AGENTS - Agent simulation: typing animations, state machines
// ============================================

import { PROCESS_DATA } from './data.js';

// Agent state machine
const STATES = {
  IDLE: 'idle',
  WORKING: 'working',
  DONE: 'done'
};

export class AgentSimulator {
  constructor() {
    this.agents = {};
    this.chatMessages = PROCESS_DATA.newWorld.chatMessages;
    this.onComplete = null;

    // Initialize agent states
    PROCESS_DATA.newWorld.agents.forEach(agent => {
      this.agents[agent.id] = {
        ...agent,
        state: STATES.IDLE,
        currentTask: -1,
        progress: 0
      };
    });
  }

  // Typing animation for chat messages
  async typeMessage(container, message, speed = 30) {
    return new Promise(resolve => {
      const msgEl = document.createElement('div');
      msgEl.className = `nw-chat-msg nw-chat-msg--${message.type}`;

      const avatar = document.createElement('div');
      avatar.className = 'nw-chat-avatar';
      avatar.textContent = message.type === 'user' ? '👤' : '🤖';

      const bubble = document.createElement('div');
      bubble.className = 'nw-chat-bubble';

      msgEl.appendChild(avatar);
      msgEl.appendChild(bubble);
      container.appendChild(msgEl);

      // Animate in
      requestAnimationFrame(() => {
        msgEl.classList.add('visible');
      });

      // Type characters
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        if (charIndex < message.text.length) {
          bubble.textContent = message.text.substring(0, charIndex + 1);
          charIndex++;
          // Auto-scroll
          container.scrollTop = container.scrollHeight;
        } else {
          clearInterval(typeInterval);
          resolve();
        }
      }, speed);
    });
  }

  // Run chat sequence
  async runChatSequence() {
    const container = document.getElementById('nw-chat-messages');
    if (!container) return;

    container.innerHTML = '';

    for (const msg of this.chatMessages) {
      await this.typeMessage(container, msg, msg.type === 'user' ? 40 : 20);
      await this.delay(300);
    }
  }

  // Run parallel agent work
  async runParallelWork() {
    const agentConfigs = PROCESS_DATA.newWorld.agents;
    const columnMap = {
      foundation: 'prh',
      authority: 'vero',
      finance: 'pankki'
    };

    // Create all task elements first
    agentConfigs.forEach(agent => {
      const colId = columnMap[agent.id];
      const tasksContainer = document.getElementById(`nw-tasks-${colId}`);
      if (!tasksContainer) return;
      tasksContainer.innerHTML = '';

      agent.tasks.forEach((task, idx) => {
        const taskEl = document.createElement('div');
        taskEl.className = 'nw-task';
        taskEl.id = `nw-task-${agent.id}-${idx}`;

        const icon = document.createElement('span');
        icon.className = 'nw-task-icon nw-task-icon--pending';
        icon.id = `nw-task-icon-${agent.id}-${idx}`;

        const label = document.createElement('span');
        label.textContent = task;

        taskEl.appendChild(icon);
        taskEl.appendChild(label);
        tasksContainer.appendChild(taskEl);
      });
    });

    // Start the human lounge activity cycle
    this.startHumanLounge();

    // Run all three agents in parallel
    const promises = agentConfigs.map(agent =>
      this.runAgentTasks(agent, columnMap[agent.id])
    );

    await Promise.all(promises);

    // All done - update human
    this.stopHumanLounge();
  }

  // Run a single agent's task sequence
  async runAgentTasks(agent, colId) {
    const totalTasks = agent.tasks.length;

    for (let i = 0; i < totalTasks; i++) {
      const taskEl = document.getElementById(`nw-task-${agent.id}-${i}`);
      const iconEl = document.getElementById(`nw-task-icon-${agent.id}-${i}`);

      if (taskEl) {
        taskEl.classList.add('visible');
        await this.delay(100);

        // Set as active
        taskEl.classList.add('active');
        if (iconEl) {
          iconEl.className = 'nw-task-icon nw-task-icon--active';
        }

        // "Work" for a random duration
        await this.delay(400 + Math.random() * 600);

        // Set as done
        taskEl.classList.remove('active');
        taskEl.classList.add('done');
        if (iconEl) {
          iconEl.className = 'nw-task-icon nw-task-icon--done';
        }

        // Notify the human lounge ticker
        this.addLoungeTick(agent.tasks[i]);
      }

      // Update column progress bar
      this.updateColumnProgress(colId, (i + 1) / totalTasks * 100);
    }
  }

  updateColumnProgress(colId, percent) {
    const bar = document.getElementById(`nw-progress-${colId}`);
    if (bar) {
      // Use ::after width via inline style workaround
      if (!bar.querySelector('.nw-prog-fill')) {
        const fill = document.createElement('div');
        fill.className = 'nw-prog-fill';
        fill.style.cssText = `height:100%;border-radius:2px;width:0;transition:width 0.3s ease;`;
        // Set color based on column
        const colors = { prh: '#3b82f6', vero: '#059669', pankki: '#8b5cf6' };
        fill.style.background = colors[colId] || '#059669';
        bar.appendChild(fill);
      }
      const fill = bar.querySelector('.nw-prog-fill');
      if (fill) {
        fill.style.width = `${percent}%`;
      }
    }
  }

  // Handoff animation
  async runHandoffAnimation() {
    const packets = document.querySelectorAll('.nw-h-packet');

    // Animate packets moving along connections
    for (const packet of packets) {
      gsap.set(packet, { opacity: 0 });
    }

    const packet1 = document.querySelector('.nw-h-packet--1');
    const packet2 = document.querySelector('.nw-h-packet--2');
    const packet3 = document.querySelector('.nw-h-packet--3');

    if (packet1) {
      gsap.to(packet1, {
        attr: { cx: 260 },
        opacity: 1,
        duration: 1.5,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: 2
      });
    }

    if (packet2) {
      gsap.to(packet2, {
        attr: { cx: 460 },
        opacity: 1,
        duration: 1.5,
        ease: 'power1.inOut',
        delay: 0.3,
        yoyo: true,
        repeat: 2
      });
    }

    if (packet3) {
      gsap.to(packet3, {
        attr: { cx: 460, cy: 80 },
        opacity: 1,
        duration: 2,
        ease: 'power1.inOut',
        delay: 0.6,
        yoyo: true,
        repeat: 2
      });
    }

    await this.delay(4000);
  }

  // Show results
  async showResults() {
    const cards = document.querySelectorAll('.nw-result-card');
    for (const card of cards) {
      card.classList.add('visible');
      await this.delay(200);
    }
  }

  // Impact counter
  async animateImpact() {
    const el = document.getElementById('nw-impact-hours');
    if (!el) return;

    const target = PROCESS_DATA.newWorld.impact.hoursSaved;
    const duration = 2000;
    const startTime = performance.now();

    return new Promise(resolve => {
      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * eased);

        el.textContent = current.toLocaleString('fi-FI');

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          resolve();
        }
      };

      requestAnimationFrame(update);
    });
  }

  // Human lounge activity cycling
  startHumanLounge() {
    const activities = [
      { emoji: '☕', text: 'Juo kahvia rauhassa...' },
      { emoji: '📱', text: 'Selaa uutisia...' },
      { emoji: '🧘', text: 'Hengittää syvään...' },
      { emoji: '💡', text: 'Miettii liikeideaa...' },
      { emoji: '🎵', text: 'Kuuntelee musiikkia...' },
      { emoji: '🌤️', text: 'Katselee ikkunasta ulos...' },
      { emoji: '📖', text: 'Lukee kirjaa...' },
      { emoji: '🍩', text: 'Syö munkkia...' },
    ];

    let idx = 0;
    const avatarEl = document.getElementById('nw-lounge-avatar');
    const activityEl = document.getElementById('nw-lounge-activity');

    this._loungeInterval = setInterval(() => {
      idx = (idx + 1) % activities.length;
      const a = activities[idx];
      if (avatarEl) avatarEl.textContent = a.emoji;
      if (activityEl) activityEl.textContent = a.text;
    }, 2500);
  }

  stopHumanLounge() {
    if (this._loungeInterval) {
      clearInterval(this._loungeInterval);
      this._loungeInterval = null;
    }
    const avatarEl = document.getElementById('nw-lounge-avatar');
    const activityEl = document.getElementById('nw-lounge-activity');
    if (avatarEl) avatarEl.textContent = '🎉';
    if (activityEl) activityEl.textContent = 'Kaikki valmis! Ei tarvinnut tehdä mitään.';
  }

  addLoungeTick(taskName) {
    const ticker = document.getElementById('nw-lounge-ticker');
    if (!ticker) return;

    // Keep max 3 ticks visible
    while (ticker.children.length >= 3) {
      ticker.removeChild(ticker.firstChild);
    }

    const tick = document.createElement('span');
    tick.className = 'nw-lounge-tick';
    tick.textContent = `✓ ${taskName}`;
    ticker.appendChild(tick);

    requestAnimationFrame(() => {
      tick.classList.add('visible');
    });

    // Auto-remove after a while
    setTimeout(() => {
      tick.classList.remove('visible');
      setTimeout(() => tick.remove(), 300);
    }, 3000);
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
