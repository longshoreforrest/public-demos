// ============================================================
// Tuntikirjanpito - Application
// ============================================================
const DN = ['Ma','Ti','Ke','To','Pe','La','Su'];
const DL = ['Maanantai','Tiistai','Keskiviikko','Torstai','Perjantai','Lauantai','Sunnuntai'];
const MN = ['Tammi','Helmi','Maalis','Huhti','Touko','Kesa','Heina','Elo','Syys','Loka','Marras','Joulu'];

let S = {
  monday: getMonday(new Date()),
  hours: {}, weekProjects: {},
  tab: 'hours',       // 'hours'|'git'|'jira'|'calendar'
  view: 'timesheet',  // 'timesheet'|'analytics'
  anRange: 'quarter', anGrain: 'week', anDate: new Date(), anDrill: null,
  dirty: false,        // unsaved changes exist
  savedWeeks: {},      // { weekKey: true } — weeks explicitly saved
};
let charts = {};
let popTimer = null;

// ---- Persist ----
function save() {
  localStorage.setItem('tk2_h', JSON.stringify(S.hours));
  localStorage.setItem('tk2_wp', JSON.stringify(S.weekProjects));
}
function load() {
  try {
    const h = localStorage.getItem('tk2_h');
    const w = localStorage.getItem('tk2_wp');
    if (h) S.hours = JSON.parse(h);
    if (w) S.weekProjects = JSON.parse(w);
  } catch(e) {}
}
function loadSaved() {
  try { const s=localStorage.getItem('tk2_saved'); if(s) S.savedWeeks=JSON.parse(s); } catch(e){}
}
function saveSaved() { localStorage.setItem('tk2_saved',JSON.stringify(S.savedWeeks)); }

function markDirty() {
  S.dirty = true;
  updateSaveBtn();
}
function saveWeek() {
  save();
  S.savedWeeks[wk()] = true;
  saveSaved();
  S.dirty = false;
  updateSaveBtn();
  toast('Viikko ' + weekNumber(S.monday) + ' tallennettu');
}
function updateSaveBtn() {
  const btn = document.getElementById('saveBtn');
  const k = wk();
  const hasProjects = S.weekProjects[k] && S.weekProjects[k].length > 0;
  const hasHours = S.hours[k] && Object.values(S.hours[k]).some(pd => Object.values(pd).some(v => v > 0));

  if (S.dirty && hasProjects && hasHours) {
    btn.style.display = '';
  } else {
    btn.style.display = 'none';
  }

  // Also show saved indicator
  const ind = document.getElementById('savedInd');
  if (!S.dirty && S.savedWeeks[k] && hasHours) {
    ind.style.display = '';
  } else {
    ind.style.display = 'none';
  }
}

function wk(m) { return formatDate(m || S.monday); }
function wp(m) { const k=wk(m); if(!S.weekProjects[k]) S.weekProjects[k]=[]; return S.weekProjects[k]; }
function sh(pid,d,v) { const k=wk(); if(!S.hours[k])S.hours[k]={}; if(!S.hours[k][pid])S.hours[k][pid]={}; S.hours[k][pid][d]=v; save(); }
function gh(pid,d,m) { const k=wk(m); return (S.hours[k]&&S.hours[k][pid]&&S.hours[k][pid][d])||0; }

function ensureHistory() {
  // Generate data from Jan 1 of current year up to current week (inclusive)
  const now = new Date();
  const yearStart = getMonday(new Date(now.getFullYear(), 0, 1));
  const currentMonday = getMonday(now);

  let mon = new Date(yearStart);
  let weekIdx = 0;
  while (mon <= currentMonday) {
    const k = wk(mon);
    if (!S.weekProjects[k] || !S.weekProjects[k].length) {
      S.weekProjects[k] = PROJECTS.map(p => p.id);
      const base = generatePreviousWeekHours();
      const rand = seededRand(mon.getTime() / 100000);
      const v = {};
      Object.entries(base).forEach(([pid, days]) => {
        v[pid] = days.map((val, i) => {
          if (i >= 5) return 0;
          const delta = (rand() - 0.5) * 2.5;
          return Math.max(0, Math.round((val + delta) * 4) / 4);
        });
      });
      S.hours[k] = v;
    }
    mon = addDays(mon, 7);
    weekIdx++;
  }
  save();
}

// ---- Nav ----
function navWeek(dir) {
  S.monday=addDays(S.monday,dir*7); S.dirty=false; hidePop();
  // If the new week is empty, show welcome dialog
  const k=wk();
  if(!S.weekProjects[k]||!S.weekProjects[k].length) {
    render();
    showWelcome();
  } else {
    render();
  }
}
function goNow() { S.monday=getMonday(new Date()); S.dirty=false; hidePop(); render(); }
function copyPrev() {
  const prev=addDays(S.monday,-7), pp=wp(prev), k=wk();
  if(!pp.length){toast('Edellisella viikolla ei projekteja');return;}
  S.weekProjects[k]=[...pp];
  if(!S.hours[k])S.hours[k]={};
  pp.forEach(pid=>{if(!S.hours[k][pid])S.hours[k][pid]={};});
  save(); render(); toast(pp.length+' projektia kopioitu');
}
function addProj(pid) {
  const k=wk(); if(!S.weekProjects[k])S.weekProjects[k]=[];
  if(!S.weekProjects[k].includes(pid)){S.weekProjects[k].push(pid);save();render();}
}
function rmProj(pid) {
  const k=wk();
  if(S.weekProjects[k]){S.weekProjects[k]=S.weekProjects[k].filter(id=>id!==pid);if(S.hours[k])delete S.hours[k][pid];save();render();}
}

// ---- Views ----
function setView(v) {
  S.view=v;
  document.querySelectorAll('.nv-tab').forEach(t=>t.classList.toggle('active',t.dataset.v===v));
  document.getElementById('vSheet').style.display=v==='timesheet'?'block':'none';
  document.getElementById('vAnalytics').style.display=v==='analytics'?'block':'none';
  if(v==='analytics') {
    // Chart.js needs the canvas to be visible before rendering
    requestAnimationFrame(()=>renderAnalytics());
  }
}
function setTab(t) {
  S.tab=t;
  document.querySelectorAll('.grid-tab').forEach(b=>b.classList.toggle('active',b.dataset.t===t));
  renderGrid();
}

function toast(msg) {
  const t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2500);
}

// =============================
// MAIN RENDER
// =============================
function render() {
  renderWeekHdr();
  renderGrid();
  renderSuggestions();
  updateSaveBtn();
}

function renderWeekHdr() {
  const n=weekNumber(S.monday), f=addDays(S.monday,4);
  document.getElementById('wkNum').textContent='Viikko '+n;
  document.getElementById('wkRange').textContent=
    S.monday.getDate()+'.'+(S.monday.getMonth()+1)+'. \u2013 '+f.getDate()+'.'+(f.getMonth()+1)+'.'+f.getFullYear();
  document.getElementById('wkNum').classList.toggle('cur',formatDate(S.monday)===formatDate(getMonday(new Date())));
}

// =============================
// GRID (hours / git / jira / calendar)
// =============================
function renderGrid() {
  const body = document.getElementById('gridBody');
  body.innerHTML = '';
  const projects = wp();
  const today = new Date(); today.setHours(0,0,0,0);

  const noSum = S.tab !== 'hours';
  // Day header row
  const hdr = mk('div','gr gr-hdr' + (noSum?' no-sum':''));
  hdr.innerHTML = `<div class="gc gc-proj">${S.tab==='hours'?'Projekti':S.tab==='git'?'Git-commitit':S.tab==='jira'?'Jira-tiketit':'Palaverit'}</div>`;
  for (let d=0;d<7;d++) {
    const dt=addDays(S.monday,d);
    const cls = (formatDate(dt)===formatDate(today)?'today ':'')+(d>=5?'we':'');
    hdr.innerHTML+=`<div class="gc gc-day ${cls}"><span class="dn">${DN[d]}</span><span class="dd">${dt.getDate()}.${dt.getMonth()+1}.</span></div>`;
  }
  if (S.tab==='hours') hdr.innerHTML+='<div class="gc gc-sum">Yht.</div>';
  body.appendChild(hdr);

  // Empty state
  if (projects.length===0) {
    body.innerHTML+=`<div class="gr-empty"><p>Ei projekteja \u2014 kopioi edellinen viikko tai lisaa projekti.</p>
      <div style="display:flex;gap:8px;justify-content:center"><button class="btn btn-pri" onclick="copyPrev()">Kopioi ed. viikko</button><button class="btn" onclick="showModal()">+ Lisaa</button></div></div>`;
    if(S.tab==='hours') appendHourTotals(body,projects);
    return;
  }

  if (S.tab==='hours') renderHoursRows(body, projects, today);
  else if (S.tab==='git') renderGitRows(body, projects);
  else if (S.tab==='jira') renderJiraRows(body, projects);
  else renderCalRows(body, projects);
}

// ---- HOURS rows ----
function renderHoursRows(body, projects, today) {
  projects.forEach(pid => {
    const p=PROJECTS.find(x=>x.id===pid); if(!p) return;
    const row=mk('div','gr');
    let tot=0, cells='';
    for(let d=0;d<7;d++){
      const v=gh(pid,d); tot+=v;
      cells+=`<div class="gc gc-day ${d>=5?'we':''}" onmouseenter="hourPop(event,'${pid}',${d})" onmouseleave="schedHide()">
        <input type="number" class="hi" value="${v||''}" min="0" max="24" step="0.25" placeholder="\u00b7" data-p="${pid}" data-d="${d}" onchange="onH(this)" onfocus="this.select()">
      </div>`;
    }
    row.innerHTML=`<div class="gc gc-proj"><div class="pc" style="background:${p.color}"></div><div class="pi"><span class="pn">${p.name}</span><span class="pd">${p.description}</span></div><button class="rx" onclick="rmProj('${pid}')">&times;</button></div>${cells}<div class="gc gc-sum">${tot?fh(tot):'\u2013'}</div>`;
    body.appendChild(row);
  });
  appendHourTotals(body, projects);
}

function appendHourTotals(body, projects) {
  const row=mk('div','gr gr-tot');
  let grand=0, cells='';
  for(let d=0;d<7;d++){
    let dt=0; projects.forEach(pid=>{dt+=gh(pid,d);}); grand+=dt;
    cells+=`<div class="gc gc-day ${d>=5?'we':''} ${dt>7.5&&d<5?'ov':''}">${dt?fh(dt):'\u2013'}</div>`;
  }
  row.innerHTML=`<div class="gc gc-proj tl">Yhteensa</div>${cells}<div class="gc gc-sum gt ${grand>37.5?'ov':''}">${grand?fh(grand):'\u2013'}<small>/ 37.5</small></div>`;
  body.appendChild(row);
}

function onH(inp) {
  let v=parseFloat(inp.value)||0;
  v=Math.round(Math.max(0,Math.min(24,v))*4)/4;
  inp.value=v||''; sh(inp.dataset.p,+inp.dataset.d,v); markDirty(); renderGrid();
}

// ---- GIT rows ----
function renderGitRows(body, projects) {
  const commits = generateGitCommits(S.monday);
  projects.forEach(pid => {
    const p=PROJECTS.find(x=>x.id===pid); if(!p)return;
    const pCommits = commits.filter(c=>c.project===pid);
    const row=mk('div','gr no-sum');
    let cells='';
    for(let d=0;d<7;d++){
      const dc = pCommits.filter(c=>c.dayIndex===d);
      let inner='';
      if(dc.length){
        inner=dc.slice(0,2).map(c=>`<div class="cell-line cell-git" title="${esc(c.message)}"><code>${c.hash.substr(0,5)}</code> <span class="cl-msg">${truncate(c.message,28)}</span></div>`).join('');
        if(dc.length>2) inner+=`<div class="cell-more">+${dc.length-2} lisaa</div>`;
      }
      cells+=`<div class="gc gc-day gc-data ${d>=5?'we':''}" onclick="popGit(event,'${pid}',${d})">${inner}</div>`;
    }
    row.innerHTML=`<div class="gc gc-proj"><div class="pc" style="background:${p.color}"></div><div class="pi"><span class="pn">${p.name}</span><span class="pd">${pCommits.length} committia</span></div></div>${cells}`;
    body.appendChild(row);
  });
}

// ---- JIRA rows ----
function renderJiraRows(body, projects) {
  const tickets = generateJiraTickets(S.monday);
  projects.forEach(pid => {
    const p=PROJECTS.find(x=>x.id===pid); if(!p)return;
    const pTix = tickets.filter(t=>t.project===pid);
    const row=mk('div','gr no-sum');
    let cells='';
    for(let d=0;d<7;d++){
      const dayEvents=[];
      pTix.forEach(t=>{
        t.events.filter(e=>e.dayIndex===d).forEach(e=>{
          dayEvents.push({ticket:t, event:e});
        });
      });
      let inner='';
      if(dayEvents.length){
        inner=dayEvents.slice(0,2).map(de=>{
          const ico=de.event.type==='transition'?'\u2192':'\u{1F4AC}';
          return `<div class="cell-line cell-jira" title="${esc(de.ticket.key+': '+de.event.text)}">${ico} <strong>${de.ticket.key}</strong></div>`;
        }).join('');
        if(dayEvents.length>2) inner+=`<div class="cell-more">+${dayEvents.length-2} lisaa</div>`;
      }
      cells+=`<div class="gc gc-day gc-data ${d>=5?'we':''}" onclick="popJira(event,'${pid}',${d})">${inner}</div>`;
    }
    row.innerHTML=`<div class="gc gc-proj"><div class="pc" style="background:${p.color}"></div><div class="pi"><span class="pn">${p.name}</span><span class="pd">${pTix.length} tikettia</span></div></div>${cells}`;
    body.appendChild(row);
  });
}

// ---- CALENDAR rows ----
function renderCalRows(body, projects) {
  const events = generateCalendarEvents(S.monday);
  projects.forEach(pid => {
    const p=PROJECTS.find(x=>x.id===pid); if(!p)return;
    const pEv = events.filter(e=>e.project===pid);
    const row=mk('div','gr no-sum');
    let cells='';
    for(let d=0;d<7;d++){
      const de = pEv.filter(e=>e.day===d).sort((a,b)=>a.time.localeCompare(b.time));
      let inner='';
      if(de.length){
        inner=de.slice(0,2).map(e=>{
          const dur=e.duration>=60?(e.duration/60)+'h':e.duration+'min';
          return `<div class="cell-line cell-cal"><span class="ct">${e.time}</span> ${truncate(e.title,20)} <span class="cd">${dur}</span></div>`;
        }).join('');
        if(de.length>2) inner+=`<div class="cell-more">+${de.length-2} lisaa</div>`;
      }
      cells+=`<div class="gc gc-day gc-data ${d>=5?'we':''}" onclick="popCal(event,'${pid}',${d})">${inner}</div>`;
    }
    // Total meeting time
    const totalMin = pEv.reduce((s,e)=>s+e.duration,0);
    const totalH = Math.round(totalMin/60*10)/10;
    row.innerHTML=`<div class="gc gc-proj"><div class="pc" style="background:${p.color}"></div><div class="pi"><span class="pn">${p.name}</span><span class="pd">${pEv.length} palaveria (${totalH}h)</span></div></div>${cells}`;
    body.appendChild(row);
  });
}

// =============================
// POPUPS
// =============================
function hourPop(evt, pid, d) {
  clearTimeout(popTimer);
  const v=gh(pid,d);
  const commits=generateGitCommits(S.monday).filter(c=>c.project===pid&&c.dayIndex===d);
  const tickets=generateJiraTickets(S.monday).filter(t=>t.project===pid&&t.events.some(e=>e.dayIndex===d));
  const events=generateCalendarEvents(S.monday).filter(e=>e.project===pid&&e.day===d);
  if(!v&&!commits.length&&!tickets.length&&!events.length) return;

  const p=PROJECTS.find(x=>x.id===pid);
  const dt=addDays(S.monday,d);
  let h=`<div class="ph" style="border-color:${p.color}"><strong>${p.name}</strong> \u2014 ${DL[d]} ${dt.getDate()}.${dt.getMonth()+1}.${v?` <span class="phv">${fh(v)} h</span>`:''}</div>`;
  if(events.length){
    h+='<div class="ps"><div class="pst">Palaverit</div>';
    events.forEach(e=>{const dur=e.duration>=60?(e.duration/60)+'h':e.duration+'min'; h+=`<div class="pl"><span class="plt">${e.time}</span>${e.title} <span class="pld">(${dur})</span></div>`;});
    h+='</div>';
  }
  if(commits.length){
    h+='<div class="ps"><div class="pst">Git</div>';
    commits.forEach(c=>{h+=`<div class="pl"><code>${c.hash.substr(0,5)}</code> ${c.message}</div>`;});
    h+='</div>';
  }
  if(tickets.length){
    h+='<div class="ps"><div class="pst">Jira</div>';
    tickets.forEach(t=>{h+=`<div class="pl"><strong>${t.key}</strong> ${t.summary}</div>`;});
    h+='</div>';
  }
  showPop(h, evt.currentTarget);
}

function popGit(evt, pid, d) {
  const commits=generateGitCommits(S.monday).filter(c=>c.project===pid&&c.dayIndex===d);
  if(!commits.length) return;
  const p=PROJECTS.find(x=>x.id===pid);
  const dt=addDays(S.monday,d);
  let h=`<div class="ph" style="border-color:${p.color}"><strong>${p.name}</strong> \u2014 Git \u2014 ${DL[d]} ${dt.getDate()}.${dt.getMonth()+1}.</div><div class="ps">`;
  commits.forEach(c=>{
    const t=c.date.toLocaleTimeString('fi-FI',{hour:'2-digit',minute:'2-digit'});
    h+=`<div class="pop-card"><div class="pop-r"><code>${c.hash}</code><span class="pld">${t}</span></div><div class="pop-msg">${c.message}</div><div class="pld">${c.branch}</div><div class="pop-stats"><span class="sta">+${c.additions}</span><span class="std">-${c.deletions}</span><span class="pld">${c.filesChanged} tiedostoa</span></div></div>`;
  });
  h+='</div>';
  showPop(h, evt.currentTarget);
}

function popJira(evt, pid, d) {
  const tickets=generateJiraTickets(S.monday).filter(t=>t.project===pid&&t.events.some(e=>e.dayIndex===d));
  if(!tickets.length) return;
  const p=PROJECTS.find(x=>x.id===pid);
  const dt=addDays(S.monday,d);
  let h=`<div class="ph" style="border-color:${p.color}"><strong>${p.name}</strong> \u2014 Jira \u2014 ${DL[d]} ${dt.getDate()}.${dt.getMonth()+1}.</div><div class="ps">`;
  tickets.forEach(t=>{
    const ico=t.type==='Bug'?'\u{1F41B}':t.type==='Epic'?'\u26A1':t.type==='Story'?'\u{1F4D6}':'\u2611\uFE0F';
    const sc=t.status.toLowerCase().replace(/\s+/g,'-');
    h+=`<div class="pop-card"><div class="pop-r">${ico} <strong class="jk">${t.key}</strong><span class="jst jst-${sc}">${t.status}</span></div><div class="pop-msg">${t.summary}</div>`;
    t.events.filter(e=>e.dayIndex===d).forEach(e=>{
      const ico2=e.type==='transition'?'\u2192':'\u{1F4AC}';
      h+=`<div class="pop-ev">${ico2} ${e.text}${e.detail?' \u2014 <em>'+e.detail+'</em>':''}</div>`;
    });
    h+='</div>';
  });
  h+='</div>';
  showPop(h, evt.currentTarget);
}

function popCal(evt, pid, d) {
  const events=generateCalendarEvents(S.monday).filter(e=>e.project===pid&&e.day===d);
  if(!events.length) return;
  const p=PROJECTS.find(x=>x.id===pid);
  const dt=addDays(S.monday,d);
  let h=`<div class="ph" style="border-color:${p.color}"><strong>${p.name}</strong> \u2014 Kalenteri \u2014 ${DL[d]} ${dt.getDate()}.${dt.getMonth()+1}.</div><div class="ps">`;
  events.sort((a,b)=>a.time.localeCompare(b.time)).forEach(e=>{
    const dur=e.duration>=60?(e.duration/60)+'h':e.duration+'min';
    h+=`<div class="pop-card"><div class="pop-r"><span class="plt">${e.time}</span><strong>${e.title}</strong></div><div class="pld">${dur} \u00B7 ${e.recurring?'\u{1F501} toistuva':'kertaluonteinen'}</div></div>`;
  });
  h+='</div>';
  showPop(h, evt.currentTarget);
}

function showPop(html, anchor) {
  clearTimeout(popTimer);
  const pop=document.getElementById('pop');
  pop.innerHTML=html;
  pop.classList.add('show');
  const r=anchor.getBoundingClientRect();
  const pw=360;
  let left=r.left+r.width/2-pw/2;
  if(left<8) left=8;
  if(left+pw>window.innerWidth-8) left=window.innerWidth-pw-8;
  let top=r.bottom+6;
  pop.style.left=left+'px'; pop.style.top=top+'px'; pop.style.width=pw+'px';
  // If goes below viewport, flip up
  requestAnimationFrame(()=>{
    if(pop.getBoundingClientRect().bottom>window.innerHeight-8){
      pop.style.top=(r.top-pop.offsetHeight-6)+'px';
    }
  });
}
function schedHide(){popTimer=setTimeout(hidePop,200);}
function keepPop(){clearTimeout(popTimer);}
function hidePop(){document.getElementById('pop').classList.remove('show');}

// ---- Suggestions ----
function renderSuggestions() {
  const c=document.getElementById('sug');
  const cur=wp();
  const commits=generateGitCommits(S.monday);
  const events=generateCalendarEvents(S.monday);
  const miss=new Set();
  commits.forEach(cm=>{if(!cur.includes(cm.project))miss.add(cm.project);});
  events.forEach(e=>{if(!cur.includes(e.project))miss.add(e.project);});
  if(!miss.size||!cur.length){c.innerHTML='';return;}
  let h='<span class="sug-l">Ehdotukset:</span>';
  miss.forEach(pid=>{const p=PROJECTS.find(x=>x.id===pid); h+=`<button class="sug-c" onclick="addProj('${pid}')"><span class="pd2" style="background:${p.color}"></span>${p.name} <span class="sug-p">+</span></button>`;});
  c.innerHTML=h;
}

// ---- Modal ----
function showModal() {
  const cur=wp(), avail=PROJECTS.filter(p=>!cur.includes(p.id));
  const list=document.getElementById('mList');
  list.innerHTML=avail.length?avail.map(p=>`<div class="mi" onclick="addProj('${p.id}');hideModal();"><div class="pc" style="background:${p.color}"></div><div class="pi"><span class="pn">${p.name}</span><span class="pd">${p.description}</span></div></div>`).join(''):'<div style="padding:20px;color:#94a3b8;text-align:center">Kaikki lisatty</div>';
  document.getElementById('modal').classList.add('show');
}
function hideModal(){document.getElementById('modal').classList.remove('show');}

// =============================
// ANALYTICS
// =============================
function renderAnalytics() {
  S.anDrill=null;
  renderAnNav();
  renderAnCharts();
  renderAnDrill();
}
function setAnRange(r){
  S.anRange=r; S.anDrill=null;
  document.querySelectorAll('#anRange .am-btn').forEach(b=>b.classList.toggle('active',b.dataset.r===r));
  renderAnNav(); renderAnCharts(); renderAnDrill();
}
function setAnGrain(g){
  S.anGrain=g; S.anDrill=null;
  document.querySelectorAll('#anGrain .am-btn').forEach(b=>b.classList.toggle('active',b.dataset.g===g));
  renderAnCharts(); renderAnDrill();
}
function navAn(dir){
  if(S.anRange==='week') S.anDate=addDays(S.anDate,dir*7);
  else if(S.anRange==='month') S.anDate=new Date(S.anDate.getFullYear(),S.anDate.getMonth()+dir,1);
  else if(S.anRange==='quarter') S.anDate=new Date(S.anDate.getFullYear(),S.anDate.getMonth()+dir*3,1);
  else S.anDate=new Date(S.anDate.getFullYear()+dir,0,1);
  S.anDrill=null; renderAnNav(); renderAnCharts(); renderAnDrill();
}
function getQuarter(d){return Math.floor(d.getMonth()/3)+1;}
function renderAnNav(){
  const d=S.anDate; let label;
  if(S.anRange==='week'){const m=getMonday(d),f=addDays(m,4); label=`Viikko ${weekNumber(m)} \u2014 ${m.getDate()}.${m.getMonth()+1}. \u2013 ${f.getDate()}.${f.getMonth()+1}.${f.getFullYear()}`;}
  else if(S.anRange==='month') label=`${MN[d.getMonth()]} ${d.getFullYear()}`;
  else if(S.anRange==='quarter') label=`Q${getQuarter(d)} \u2014 ${d.getFullYear()}`;
  else label=`${d.getFullYear()}`;
  document.getElementById('anLbl').textContent=label;
}

// Collect months included in current range
function getRangeMonths(){
  const yr=S.anDate.getFullYear(),mo=S.anDate.getMonth();
  if(S.anRange==='month') return [{year:yr,month:mo}];
  if(S.anRange==='quarter'){const s=(getQuarter(S.anDate)-1)*3;return [{year:yr,month:s},{year:yr,month:s+1},{year:yr,month:s+2}];}
  const r=[];for(let m=0;m<12;m++)r.push({year:yr,month:m});return r; // year
}

function getAnData() {
  const R={byProject:{},byDay:[],total:0,entries:[]};

  // Step 1: Collect all entries in range
  if(S.anRange==='week'){
    const mon=getMonday(S.anDate),projects=wp(mon);
    for(let d=0;d<7;d++){const dd=addDays(mon,d);
      projects.forEach(pid=>{const v=gh(pid,d,mon);if(v){if(!R.byProject[pid])R.byProject[pid]=0;R.byProject[pid]+=v;R.total+=v;
        R.entries.push({project:pid,day:d,date:dd,hours:v,wm:mon,month:dd.getMonth(),year:dd.getFullYear()});}});
    }
  } else {
    getRangeMonths().forEach(({year,month})=>{
      const last=new Date(year,month+1,0);let mon=getMonday(new Date(year,month,1));const seen=new Set();
      while(mon<=last){const k=wk(mon);if(!seen.has(k)){seen.add(k);const projects=wp(mon);
        projects.forEach(pid=>{for(let d=0;d<7;d++){const dd=addDays(mon,d);if(dd.getMonth()!==month||dd.getFullYear()!==year)continue;const v=gh(pid,d,mon);if(v){if(!R.byProject[pid])R.byProject[pid]=0;R.byProject[pid]+=v;R.total+=v;
          R.entries.push({project:pid,day:d,date:dd,hours:v,wm:new Date(mon),month:month,year:year});}}});}mon=addDays(mon,7);}
    });
  }

  // Step 2: Group by grain
  if(S.anGrain==='day'){
    const map={};R.entries.forEach(e=>{const k=formatDate(e.date);if(!map[k])map[k]={date:new Date(e.date),total:0};map[k].total+=e.hours;});
    R.byDay=Object.values(map).sort((a,b)=>a.date-b.date).map(d=>{const di=(d.date.getDay()+6)%7;return{label:`${DN[di]} ${d.date.getDate()}.${d.date.getMonth()+1}.`,total:d.total,date:d.date,dayIndex:di};});
  } else if(S.anGrain==='week'){
    const map={};R.entries.forEach(e=>{const k=formatDate(e.wm);if(!map[k])map[k]={wm:new Date(e.wm),total:0};map[k].total+=e.hours;});
    R.byDay=Object.values(map).sort((a,b)=>a.wm-b.wm).map(w=>({label:'Vk '+weekNumber(w.wm),total:w.total,wm:w.wm}));
  } else {
    const map={};R.entries.forEach(e=>{const k=e.year*100+e.month;if(!map[k])map[k]={month:e.month,year:e.year,total:0};map[k].total+=e.hours;});
    R.byDay=Object.values(map).sort((a,b)=>(a.year*100+a.month)-(b.year*100+b.month)).map(m=>({label:MN[m.month],total:m.total,month:m.month,year:m.year}));
  }
  return R;
}

function matchEntryToGroup(e,bd){
  if(S.anGrain==='day') return formatDate(e.date)===formatDate(bd.date);
  if(S.anGrain==='week') return formatDate(e.wm)===formatDate(bd.wm);
  return e.month===bd.month&&e.year===bd.year;
}

function renderAnCharts(){
  if(typeof Chart === 'undefined') {
    document.getElementById('anSum').innerHTML='<div class="as" style="flex:none;width:100%"><span class="asl">Chart.js ei latautunut. Avaa sovellus HTTP-palvelimella (esim. npx serve .)</span></div>';
    return;
  }
  const data=getAnData();
  if(data.total===0){
    document.getElementById('anSum').innerHTML=`
      <div class="as" style="flex:none;width:100%"><span class="asv">Ei dataa</span><span class="asl">Talla ajanjaksolla ei ole kirjattuja tunteja.</span></div>`;
    if(charts.donut)charts.donut.destroy();charts.donut=null;
    if(charts.bar)charts.bar.destroy();charts.bar=null;
    return;
  }
  // Donut
  const dCtx=document.getElementById('cDonut').getContext('2d');
  if(charts.donut)charts.donut.destroy();
  const pids=Object.keys(data.byProject);
  const pLabels=pids.map(pid=>PROJECTS.find(p=>p.id===pid)?.name||pid);
  const pColors=pids.map(pid=>PROJECTS.find(p=>p.id===pid)?.color||'#999');
  const pVals=pids.map(pid=>Math.round(data.byProject[pid]*100)/100);
  charts.donut=new Chart(dCtx,{type:'doughnut',data:{labels:pLabels,datasets:[{data:pVals,backgroundColor:pColors,borderWidth:2,borderColor:'#fff'}]},options:{responsive:true,maintainAspectRatio:false,cutout:'60%',plugins:{legend:{position:'bottom',labels:{padding:14,usePointStyle:true,pointStyle:'circle',font:{size:11}}},tooltip:{callbacks:{label:c=>`${c.label}: ${c.parsed}h (${Math.round(c.parsed/data.total*100)}%)`}}},onClick:(e,els)=>{if(els.length){S.anDrill={type:'project',id:pids[els[0].index]};renderAnDrill();}}}});
  // Bar
  const bCtx=document.getElementById('cBar').getContext('2d');
  if(charts.bar)charts.bar.destroy();
  const bDS=pids.map(pid=>{const p=PROJECTS.find(x=>x.id===pid);return{label:p.name,backgroundColor:p.color+'cc',borderRadius:4,
    data:data.byDay.map(bd=>data.entries.filter(e=>e.project===pid&&matchEntryToGroup(e,bd)).reduce((s,e)=>s+e.hours,0))};});
  const sugMax=S.anGrain==='day'?10:S.anGrain==='week'?45:180;
  charts.bar=new Chart(bCtx,{type:'bar',data:{labels:data.byDay.map(d=>d.label),datasets:bDS},options:{responsive:true,maintainAspectRatio:false,scales:{x:{stacked:true,grid:{display:false}},y:{stacked:true,beginAtZero:true,grid:{color:'#f1f5f9'},ticks:{callback:v=>v+'h'},suggestedMax:sugMax}},plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>`${c.dataset.label}: ${c.parsed.y}h`}}},
    onClick:(e,els)=>{if(els.length){const bd=data.byDay[els[0].index];
      if(S.anGrain==='day') S.anDrill={type:'day',date:bd.date,dayIndex:bd.dayIndex};
      else if(S.anGrain==='week') S.anDrill={type:'week',monday:bd.wm};
      else S.anDrill={type:'month',month:bd.month,year:bd.year};
      renderAnDrill();}}}});
  // Summary
  const avgLabel=S.anGrain==='day'?'pv':S.anGrain==='week'?'vk':'kk';
  document.getElementById('anSum').innerHTML=`
    <div class="as"><span class="asv">${fh(data.total)}</span><span class="asl">tuntia</span></div>
    <div class="as"><span class="asv">${pids.length}</span><span class="asl">projektia</span></div>
    <div class="as"><span class="asv">${data.total>0?fh(data.total/Math.max(1,data.byDay.filter(d=>d.total>0).length)):'0'}</span><span class="asl">h / ${avgLabel}</span></div>`;
}

function drillTo(drill){S.anDrill=drill;renderAnDrill();}

function renderAnDrill(){
  const c=document.getElementById('anDr');
  if(!S.anDrill){c.innerHTML='<div class="dr-hint">Klikkaa kaaviota porautuaksesi</div>';return;}
  const data=getAnData(),dr=S.anDrill;

  // Level 1: Project overview — show breakdown by grain period
  if(dr.type==='project'){
    const p=PROJECTS.find(x=>x.id===dr.id);
    const entries=data.entries.filter(e=>e.project===dr.id);
    const totalH=entries.reduce((s,e)=>s+e.hours,0);
    const colLabel=S.anGrain==='day'?'Päivä':S.anGrain==='week'?'Viikko':'Kuukausi';
    const maxH=Math.max(...data.byDay.map(bd=>entries.filter(e=>matchEntryToGroup(e,bd)).reduce((s,e)=>s+e.hours,0)),1);
    let h=drBreadcrumb([{label:'Yhteenveto',action:'S.anDrill=null;renderAnDrill()'}])+
      `<div class="dr-hdr"><span class="pd2" style="background:${p.color}"></span><strong>${p.name}</strong> &mdash; ${p.description}<span class="pld" style="margin-left:auto">${fh(totalH)} h</span></div>`;
    h+=`<table class="dr-tbl"><thead><tr><th>${colLabel}</th><th>Tunnit</th><th></th><th class="r">h</th></tr></thead><tbody>`;
    data.byDay.forEach(bd=>{
      const dayEntries=entries.filter(e=>matchEntryToGroup(e,bd));
      const dh=dayEntries.reduce((s,e)=>s+e.hours,0);
      if(dh===0)return;
      const pct=Math.round(dh/maxH*100);
      let drillArg;
      if(S.anGrain==='day') drillArg=`{type:'project-day',id:'${dr.id}',day:${bd.dayIndex},date:new Date('${bd.date.toISOString()}'),wm:new Date('${getMonday(bd.date).toISOString()}')}`;
      else if(S.anGrain==='week') drillArg=`{type:'project-week',id:'${dr.id}',monday:new Date('${bd.wm.toISOString()}')}`;
      else drillArg=`{type:'project-month',id:'${dr.id}',month:${bd.month},year:${bd.year||S.anDate.getFullYear()}}`;
      h+=`<tr class="dr-row" onclick="drillTo(${drillArg})"><td><strong>${bd.label}</strong></td><td><div style="display:flex;align-items:center;gap:6px;min-width:120px"><div class="dr-bar-bg"><div class="dr-bar" style="width:${pct}%;background:${p.color}"></div></div></div></td><td style="font-size:10px;color:var(--dim)">${dayEntries.length} kirjausta</td><td class="r">${fh(dh)}</td></tr>`;
    });
    h+='</tbody></table>';
    c.innerHTML=h;return;
  }

  // Level 1: Time period (day/week/month) — show breakdown by project
  if(dr.type==='day'||dr.type==='week'||dr.type==='month'){
    let title,entries;
    if(dr.type==='day'){
      title=DL[dr.dayIndex]+' '+dr.date.getDate()+'.'+(dr.date.getMonth()+1)+'.';
      entries=data.entries.filter(e=>formatDate(e.date)===formatDate(dr.date));
    } else if(dr.type==='week'){
      title='Viikko '+weekNumber(dr.monday);
      entries=data.entries.filter(e=>formatDate(e.wm)===formatDate(dr.monday));
    } else {
      title=MN[dr.month]+' '+dr.year;
      entries=data.entries.filter(e=>e.month===dr.month&&e.year===dr.year);
    }
    const totalH=entries.reduce((s,e)=>s+e.hours,0);
    const byPid={};entries.forEach(e=>{if(!byPid[e.project])byPid[e.project]=[];byPid[e.project].push(e);});
    const maxH=Math.max(...Object.values(byPid).map(arr=>arr.reduce((s,e)=>s+e.hours,0)),1);
    let h=drBreadcrumb([{label:'Yhteenveto',action:'S.anDrill=null;renderAnDrill()'}])+
      `<div class="dr-hdr"><strong>${title}</strong><span class="pld" style="margin-left:auto">${fh(totalH)} h</span></div>`;
    h+='<table class="dr-tbl"><thead><tr><th>Projekti</th><th>Tunnit</th><th></th><th class="r">h</th></tr></thead><tbody>';
    Object.keys(byPid).forEach(pid=>{
      const p=PROJECTS.find(x=>x.id===pid);
      const ph=byPid[pid].reduce((s,e)=>s+e.hours,0);
      const pct=Math.round(ph/maxH*100);
      let drillArg;
      if(dr.type==='day') drillArg=`{type:'project-day',id:'${pid}',day:${dr.dayIndex},date:new Date('${dr.date.toISOString()}'),wm:new Date('${getMonday(dr.date).toISOString()}')}`;
      else if(dr.type==='week') drillArg=`{type:'project-week',id:'${pid}',monday:new Date('${dr.monday.toISOString()}')}`;
      else drillArg=`{type:'project-month',id:'${pid}',month:${dr.month},year:${dr.year}}`;
      h+=`<tr class="dr-row" onclick="drillTo(${drillArg})"><td><span class="pd2" style="background:${p.color}"></span> <strong>${p.name}</strong></td><td><div style="display:flex;align-items:center;gap:6px;min-width:120px"><div class="dr-bar-bg"><div class="dr-bar" style="width:${pct}%;background:${p.color}"></div></div></div></td><td style="font-size:10px;color:var(--dim)">${byPid[pid].length} kirjausta</td><td class="r">${fh(ph)}</td></tr>`;
    });
    h+='</tbody></table>';
    c.innerHTML=h;return;
  }

  // Level 2: Project + specific day — full Git/Jira/Calendar detail
  if(dr.type==='project-day'){
    const p=PROJECTS.find(x=>x.id===dr.id);
    const v=gh(dr.id,dr.day,dr.wm);
    const bc=[{label:'Yhteenveto',action:'S.anDrill=null;renderAnDrill()'},{label:p.name,action:`drillTo({type:'project',id:'${dr.id}'})`}];
    const dt=dr.date;
    let h=drBreadcrumb(bc)+
      `<div class="dr-hdr"><span class="pd2" style="background:${p.color}"></span><strong>${p.name}</strong> &mdash; ${DL[dr.day]} ${dt.getDate()}.${dt.getMonth()+1}.<span class="dr-h">${fh(v)} h</span></div>`;
    h+=renderDetailActivity(dr.id,dr.day,dr.wm);
    c.innerHTML=h;return;
  }

  // Level 2: Project + month — weekly breakdown with Git/Jira/Calendar
  if(dr.type==='project-month'){
    const p=PROJECTS.find(x=>x.id===dr.id);
    const yr=dr.year,mo=dr.month;
    const entries=data.entries.filter(e=>e.project===dr.id&&e.month===mo&&e.year===yr);
    const totalH=entries.reduce((s,e)=>s+e.hours,0);
    const bc=[
      {label:'Yhteenveto',action:'S.anDrill=null;renderAnDrill()'},
      {label:p.name,action:`drillTo({type:'project',id:'${dr.id}'})`}
    ];
    let h=drBreadcrumb(bc)+
      `<div class="dr-hdr"><span class="pd2" style="background:${p.color}"></span><strong>${p.name}</strong> &mdash; ${MN[mo]} ${yr}<span class="pld" style="margin-left:auto">${fh(totalH)} h</span></div>`;
    const byWeek={};
    entries.forEach(e=>{const k=formatDate(e.wm);if(!byWeek[k])byWeek[k]={wm:e.wm,entries:[]};byWeek[k].entries.push(e);});
    Object.values(byWeek).sort((a,b)=>a.wm-b.wm).forEach(wg=>{
      const wh=wg.entries.reduce((s,e)=>s+e.hours,0);
      h+=`<div class="dr-detail-day"><div class="dr-dd-hdr"><strong>Viikko ${weekNumber(wg.wm)}</strong><span class="dr-dd-h">${fh(wh)} h</span></div>`;
      wg.entries.sort((a,b)=>a.day-b.day).forEach(entry=>{
        h+=`<div style="margin-left:12px;margin-bottom:6px"><div style="font-size:11px;font-weight:600;margin-bottom:2px">${DL[entry.day]} ${entry.date.getDate()}.${entry.date.getMonth()+1}. &mdash; ${fh(entry.hours)} h</div>`;
        h+=renderDetailActivity(dr.id,entry.day,entry.wm);
        h+='</div>';
      });
      h+='</div>';
    });
    c.innerHTML=h;return;
  }

  // Level 2: Project + week — daily breakdown with Git/Jira/Calendar
  if(dr.type==='project-week'){
    const p=PROJECTS.find(x=>x.id===dr.id);
    const bc=[{label:'Yhteenveto',action:'S.anDrill=null;renderAnDrill()'},{label:p.name,action:`drillTo({type:'project',id:'${dr.id}'})`}];
    let h=drBreadcrumb(bc)+
      `<div class="dr-hdr"><span class="pd2" style="background:${p.color}"></span><strong>${p.name}</strong> &mdash; Viikko ${weekNumber(dr.monday)}</div>`;
    for(let d=0;d<7;d++){
      const dd=addDays(dr.monday,d);
      const v=gh(dr.id,d,dr.monday);
      if(v===0)continue;
      h+=`<div class="dr-detail-day"><div class="dr-dd-hdr"><strong>${DL[d]}</strong> ${dd.getDate()}.${dd.getMonth()+1}.<span class="dr-dd-h">${fh(v)} h</span></div>`;
      h+=renderDetailActivity(dr.id,d,dr.monday);
      h+='</div>';
    }
    c.innerHTML=h;return;
  }
}

function drBreadcrumb(items){
  let h='<div class="dr-breadcrumb">';
  items.forEach((item,i)=>{
    h+=`<span class="dr-bc-link" onclick="${item.action}">${item.label}</span>`;
    h+=' <span>&rsaquo;</span> ';
  });
  h+='<span>Tiedot</span></div>';
  return h;
}

function renderDetailActivity(pid,day,monday){
  const commits=generateGitCommits(monday).filter(c=>c.project===pid&&c.dayIndex===day);
  const tickets=generateJiraTickets(monday).filter(t=>t.project===pid&&t.events.some(e=>e.dayIndex===day));
  const events=generateCalendarEvents(monday).filter(e=>e.project===pid&&e.day===day);
  let h='<div class="dr-act">';
  if(events.length){
    h+='<div class="dr-act-sec"><div class="dr-act-t">Palaverit</div>';
    events.forEach(e=>{const dur=e.duration>=60?(e.duration/60)+'h':e.duration+'min';h+=`<div class="dr-act-l">${e.time} ${e.title} <span style="color:var(--mut)">(${dur})</span></div>`;});
    h+='</div>';
  }
  if(commits.length){
    h+='<div class="dr-act-sec"><div class="dr-act-t">Git-commitit</div>';
    commits.forEach(c=>{
      const t=c.date.toLocaleTimeString('fi-FI',{hour:'2-digit',minute:'2-digit'});
      h+=`<div class="dr-act-l"><code>${c.hash.substr(0,5)}</code> ${c.message} <span style="color:var(--mut)">${t}</span></div>`;
      h+=`<div style="font-size:10px;color:var(--dim);margin-left:52px;margin-bottom:2px">${c.branch} &middot; <span style="color:var(--ok)">+${c.additions}</span> <span style="color:var(--err)">-${c.deletions}</span> &middot; ${c.filesChanged} tiedostoa</div>`;
    });
    h+='</div>';
  }
  if(tickets.length){
    h+='<div class="dr-act-sec"><div class="dr-act-t">Jira</div>';
    tickets.forEach(t=>{
      const ico=t.type==='Bug'?'\u{1F41B}':t.type==='Epic'?'\u26A1':t.type==='Story'?'\u{1F4D6}':'\u2611\uFE0F';
      const sc=t.status.toLowerCase().replace(/\s+/g,'-');
      h+=`<div class="dr-act-l">${ico} <strong style="color:var(--pri)">${t.key}</strong> ${t.summary} <span class="jst jst-${sc}">${t.status}</span></div>`;
      t.events.filter(e=>e.dayIndex===day).forEach(e=>{
        const ico2=e.type==='transition'?'\u2192':'\u{1F4AC}';
        h+=`<div style="font-size:10px;color:var(--dim);margin-left:24px">${ico2} ${e.text}${e.detail?' &mdash; <em>'+e.detail+'</em>':''}</div>`;
      });
    });
    h+='</div>';
  }
  if(!events.length&&!commits.length&&!tickets.length){
    h+='<div style="color:var(--mut);font-size:11px;padding:4px 0">Ei aktiviteettidataa</div>';
  }
  h+='</div>';
  return h;
}

// =============================
// WELCOME DIALOG (empty week)
// =============================
function showWelcome() {
  const prev = findPreviousWeekWithData();
  if (!prev) return; // no history at all

  const wn = weekNumber(S.monday);
  const prevProjects = wp(prev);
  const prevProjectNames = prevProjects.map(pid => PROJECTS.find(p=>p.id===pid)).filter(Boolean);

  document.getElementById('welcomeTitle').textContent = 'Viikko ' + wn + ' on tyhja';
  document.getElementById('welcomeDesc').textContent =
    'Haluatko kopioida edellisen viikon projektit pohjaksi? Voin myos arvata tunnit edellisten viikkojen, Git-committien ja kalenteritapahtumien perusteella.';

  let projHtml = '<ul class="welcome-proj">';
  prevProjectNames.forEach(p => {
    projHtml += `<li><span class="pd2" style="background:${p.color}"></span><strong>${p.name}</strong> <span style="color:var(--dim);font-size:11px">${p.description}</span></li>`;
  });
  projHtml += '</ul>';
  document.getElementById('welcomeProjects').innerHTML = projHtml;

  document.getElementById('welcomeDlg').classList.add('show');
}

function hideWelcome() {
  document.getElementById('welcomeDlg').classList.remove('show');
}

function welcomeEmpty() {
  hideWelcome();
}

function welcomeCopy() {
  const prev = findPreviousWeekWithData();
  if (!prev) return;
  const pp = wp(prev), k = wk();
  S.weekProjects[k] = [...pp];
  if (!S.hours[k]) S.hours[k] = {};
  pp.forEach(pid => { if(!S.hours[k][pid]) S.hours[k][pid] = {}; });
  save();
  hideWelcome();
  render();
  toast('Projektit kopioitu');
}

function welcomeSmart() {
  // Copy projects + estimate hours from history, git and calendar
  const prev = findPreviousWeekWithData();
  if (!prev) return;
  const pp = wp(prev), k = wk();
  S.weekProjects[k] = [...pp];
  if (!S.hours[k]) S.hours[k] = {};

  // Gather historical averages (last 4 weeks)
  const avgHours = {};
  pp.forEach(pid => { avgHours[pid] = [0,0,0,0,0,0,0]; });
  let weeksFound = 0;
  for (let w = 1; w <= 4; w++) {
    const mon = addDays(S.monday, -7*w);
    const hk = wk(mon);
    if (S.hours[hk]) {
      weeksFound++;
      pp.forEach(pid => {
        if (S.hours[hk][pid]) {
          for (let d = 0; d < 7; d++) {
            avgHours[pid][d] += (S.hours[hk][pid][d] || 0);
          }
        }
      });
    }
  }

  // Average
  if (weeksFound > 0) {
    pp.forEach(pid => {
      avgHours[pid] = avgHours[pid].map(v => Math.round(v / weeksFound * 4) / 4);
    });
  }

  // Adjust based on calendar events for this week
  const calEvents = generateCalendarEvents(S.monday);
  const calMinsByProject = {};
  pp.forEach(pid => { calMinsByProject[pid] = [0,0,0,0,0,0,0]; });
  calEvents.forEach(e => {
    if (calMinsByProject[e.project]) {
      calMinsByProject[e.project][e.day] += e.duration;
    }
  });

  // Adjust based on git commits for this week
  const commits = generateGitCommits(S.monday);
  const commitsByProject = {};
  pp.forEach(pid => { commitsByProject[pid] = [0,0,0,0,0,0,0]; });
  commits.forEach(c => {
    if (commitsByProject[c.project]) {
      commitsByProject[c.project][c.dayIndex]++;
    }
  });

  // Build estimated hours: blend average + calendar + commit signal
  pp.forEach(pid => {
    if (!S.hours[k][pid]) S.hours[k][pid] = {};
    for (let d = 0; d < 7; d++) {
      let est = avgHours[pid][d];

      // If there are calendar events but historical avg is 0, add meeting time
      const calH = calMinsByProject[pid][d] / 60;
      if (est === 0 && calH > 0) {
        est = Math.round(calH * 4) / 4;
      }

      // If there are commits but no hours estimated, add at least 1h
      if (est === 0 && commitsByProject[pid][d] > 0) {
        est = Math.max(1, Math.round(commitsByProject[pid][d] * 0.75 * 4) / 4);
      }

      // Weekends stay 0 unless historical says otherwise
      if (d >= 5 && est < 0.5) est = 0;

      S.hours[k][pid][d] = est;
    }
  });

  save();
  hideWelcome();
  markDirty();
  render();
  toast('Tunnit arvioitu \u2014 tarkista ja tallenna');
}

function findPreviousWeekWithData() {
  for (let w = 1; w <= 12; w++) {
    const mon = addDays(S.monday, -7*w);
    const k = wk(mon);
    if (S.weekProjects[k] && S.weekProjects[k].length > 0) return mon;
  }
  return null;
}

// ---- Helpers ----
function mk(tag,cls){const e=document.createElement(tag);e.className=cls;return e;}
function fh(v){return v%1?v.toFixed(2):v.toString();}
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');}
function truncate(s,n){return s.length>n?s.substr(0,n)+'\u2026':s;}

// ---- Init ----
function init(){
  load(); loadSaved();
  // Force regeneration: version check ensures fresh full-year data
  const DATA_VERSION = 4;
  const storedVer = parseInt(localStorage.getItem('tk2_ver')) || 0;
  if (storedVer < DATA_VERSION) {
    S.hours = {};
    S.weekProjects = {};
    localStorage.setItem('tk2_ver', DATA_VERSION);
  }
  ensureHistory();
  render();

  document.querySelectorAll('.nv-tab').forEach(b=>b.addEventListener('click',()=>setView(b.dataset.v)));
  document.querySelectorAll('.grid-tab').forEach(b=>b.addEventListener('click',()=>setTab(b.dataset.t)));
  document.querySelectorAll('#anRange .am-btn').forEach(b=>b.addEventListener('click',()=>setAnRange(b.dataset.r)));
  document.querySelectorAll('#anGrain .am-btn').forEach(b=>b.addEventListener('click',()=>setAnGrain(b.dataset.g)));
  document.getElementById('modal').addEventListener('click',e=>{if(e.target.id==='modal')hideModal();});
  document.getElementById('welcomeDlg').addEventListener('click',e=>{if(e.target.id==='welcomeDlg')hideWelcome();});
  document.getElementById('pop').addEventListener('mouseenter',keepPop);
  document.getElementById('pop').addEventListener('mouseleave',hidePop);
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){hideModal();hidePop();hideWelcome();}
    if(e.altKey&&e.key==='ArrowLeft'){if(S.view==='timesheet')navWeek(-1);else navAn(-1);}
    if(e.altKey&&e.key==='ArrowRight'){if(S.view==='timesheet')navWeek(1);else navAn(1);}
  });
  document.querySelector('.main-area')?.addEventListener('scroll',hidePop);
}
document.addEventListener('DOMContentLoaded',init);
