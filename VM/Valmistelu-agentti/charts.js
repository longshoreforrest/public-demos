/* ============================================================
   charts.js — Chart.js visualisoinnit
   Donitsikaavio, pinottu pylväs, vaakapalkit, tutkakaavio
   ============================================================ */

class ChartManager {
  constructor() {
    this.charts = {};
    this._setDefaults();
  }

  _setDefaults() {
    Chart.defaults.color = '#475569';
    Chart.defaults.font.family = "'Inter', 'Segoe UI', system-ui, sans-serif";
    Chart.defaults.font.size = 12;
    Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(30, 41, 59, 0.92)';
    Chart.defaults.plugins.tooltip.titleColor = '#f1f5f9';
    Chart.defaults.plugins.tooltip.bodyColor = '#e2e8f0';
    Chart.defaults.plugins.tooltip.borderColor = 'rgba(148, 163, 184, 0.3)';
    Chart.defaults.plugins.tooltip.borderWidth = 1;
    Chart.defaults.plugins.tooltip.cornerRadius = 8;
    Chart.defaults.plugins.tooltip.padding = 10;
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    Chart.defaults.plugins.legend.labels.pointStyleWidth = 8;
    Chart.defaults.animation.duration = 800;
    Chart.defaults.animation.easing = 'easeOutQuart';
  }

  _destroy(id) {
    if (this.charts[id]) {
      this.charts[id].destroy();
      delete this.charts[id];
    }
  }

  // ── Source Distribution Donut ──────────────────────────────
  renderSourceDistribution() {
    const id = 'chartSourceDistribution';
    this._destroy(id);
    const ctx = document.getElementById(id);
    if (!ctx) return;

    this.charts[id] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['EU-sääntely', 'Kansainväliset vertailut', 'Kotimainen lainsäädäntö'],
        datasets: [{
          data: [
            DATA.sources.eu.length,
            DATA.sources.international.length,
            DATA.sources.domestic.length
          ],
          backgroundColor: [
            'rgba(0, 100, 117, 0.7)',
            'rgba(14, 165, 233, 0.7)',
            'rgba(245, 158, 11, 0.7)'
          ],
          borderColor: [
            'rgba(0, 100, 117, 1)',
            'rgba(14, 165, 233, 1)',
            'rgba(245, 158, 11, 1)'
          ],
          borderWidth: 2,
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 16, font: { size: 13 } }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: ${ctx.parsed} lähdettä`
            }
          }
        }
      }
    });
  }

  // ── Fiscal Impact (Stacked Bar) ───────────────────────────
  renderFiscalChart() {
    const id = 'chartFiscal';
    this._destroy(id);
    const ctx = document.getElementById(id);
    if (!ctx) return;

    const fiscal = DATA.impact.fiscal;

    this.charts[id] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: fiscal.years,
        datasets: [
          {
            label: 'Kustannukset',
            data: fiscal.costs.map(v => -v),
            backgroundColor: 'rgba(244, 63, 94, 0.6)',
            borderColor: 'rgba(244, 63, 94, 1)',
            borderWidth: 1,
            borderRadius: 4
          },
          {
            label: 'Säästöt',
            data: fiscal.savings,
            backgroundColor: 'rgba(16, 185, 129, 0.6)',
            borderColor: 'rgba(16, 185, 129, 1)',
            borderWidth: 1,
            borderRadius: 4
          },
          {
            label: 'Nettovaikutus',
            data: fiscal.net,
            type: 'line',
            borderColor: 'rgba(0, 100, 117, 1)',
            backgroundColor: 'rgba(0, 100, 117, 0.1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(0, 100, 117, 1)',
            pointRadius: 5,
            fill: false,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        scales: {
          x: {
            grid: { color: 'rgba(148, 163, 184, 0.2)' },
            ticks: { font: { weight: 600 } }
          },
          y: {
            grid: { color: 'rgba(148, 163, 184, 0.2)' },
            ticks: {
              callback: (v) => v + ' M€'
            },
            title: {
              display: true,
              text: 'Milj. €',
              font: { size: 12 }
            }
          }
        },
        plugins: {
          legend: { position: 'bottom', labels: { padding: 16 } },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const val = ctx.parsed.y;
                return `${ctx.dataset.label}: ${val > 0 ? '+' : ''}${val.toFixed(1)} M€`;
              }
            }
          }
        }
      }
    });
  }

  // ── Regulatory Burden (Horizontal Bar) ────────────────────
  renderBurdenChart() {
    const id = 'chartBurden';
    this._destroy(id);
    const ctx = document.getElementById(id);
    if (!ctx) return;

    const burden = DATA.impact.regulatoryBurden;

    this.charts[id] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: burden.map(b => b.sector),
        datasets: [{
          label: 'Sääntelytaakka (0–100)',
          data: burden.map(b => b.burden),
          backgroundColor: burden.map(b => {
            if (b.burden >= 70) return 'rgba(244, 63, 94, 0.6)';
            if (b.burden >= 50) return 'rgba(245, 158, 11, 0.6)';
            return 'rgba(16, 185, 129, 0.6)';
          }),
          borderColor: burden.map(b => {
            if (b.burden >= 70) return 'rgba(244, 63, 94, 1)';
            if (b.burden >= 50) return 'rgba(245, 158, 11, 1)';
            return 'rgba(16, 185, 129, 1)';
          }),
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            max: 100,
            grid: { color: 'rgba(148, 163, 184, 0.2)' },
            ticks: { callback: (v) => v + '/100' }
          },
          y: {
            grid: { display: false },
            ticks: { font: { size: 12 } }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              afterLabel: (ctx) => {
                const item = burden[ctx.dataIndex];
                return `Trendi: ${item.trend}`;
              }
            }
          }
        }
      }
    });
  }

  // ── Stakeholder Radar ─────────────────────────────────────
  renderStakeholderChart() {
    const id = 'chartStakeholders';
    this._destroy(id);
    const ctx = document.getElementById(id);
    if (!ctx) return;

    const sh = DATA.impact.stakeholders;

    this.charts[id] = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: sh.labels,
        datasets: sh.groups.map(g => ({
          label: g.name,
          data: g.values,
          borderColor: g.color,
          backgroundColor: g.color + '20',
          borderWidth: 2,
          pointBackgroundColor: g.color,
          pointRadius: 4,
          pointHoverRadius: 6
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 20,
              backdropColor: 'transparent',
              font: { size: 10 }
            },
            grid: { color: 'rgba(148, 163, 184, 0.2)' },
            angleLines: { color: 'rgba(148, 163, 184, 0.2)' },
            pointLabels: { font: { size: 11 } }
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 16, font: { size: 12 } }
          }
        }
      }
    });
  }

  // ── Render all impact charts ──────────────────────────────
  renderAllImpactCharts() {
    this.renderFiscalChart();
    this.renderBurdenChart();
    this.renderStakeholderChart();
  }

  // ── Destroy all ───────────────────────────────────────────
  destroyAll() {
    Object.keys(this.charts).forEach(id => this._destroy(id));
  }
}
