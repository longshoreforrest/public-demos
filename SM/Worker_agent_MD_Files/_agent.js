const https = require('https');

const PROJECT = 'ideaagent-prod';
const API_KEY = 'AIzaSyAKqHpaXRvzmKCa2gVi_7OS1dYWf50bIj4';
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;

function firestoreGet(path) {
  return new Promise((resolve, reject) => {
    https.get(`${BASE}/${path}?key=${API_KEY}`, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        resolve(JSON.parse(data));
      });
    }).on('error', reject);
  });
}

function firestoreList(path, query) {
  const url = query
    ? `${BASE}/${path}?key=${API_KEY}&${query}`
    : `${BASE}/${path}?key=${API_KEY}`;
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        resolve(JSON.parse(data));
      });
    }).on('error', reject);
  });
}

function firestorePatch(path, fields) {
  const body = JSON.stringify({ fields });
  const fieldNames = Object.keys(fields);
  const maskParams = fieldNames.map(f => `updateMask.fieldPaths=${f}`).join('&');
  const urlObj = new URL(`${BASE}/${path}?key=${API_KEY}&${maskParams}`);
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        resolve(JSON.parse(data));
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function parseDoc(doc) {
  const f = doc.fields || {};
  const result = {};
  for (const [k, v] of Object.entries(f)) {
    if (v.stringValue !== undefined) result[k] = v.stringValue;
    else if (v.integerValue !== undefined) result[k] = parseInt(v.integerValue);
    else if (v.arrayValue) {
      result[k] = (v.arrayValue.values || []).map(item => {
        if (item.mapValue) {
          const m = {};
          for (const [mk, mv] of Object.entries(item.mapValue.fields || {})) {
            if (mv.stringValue !== undefined) m[mk] = mv.stringValue;
            else if (mv.integerValue !== undefined) m[mk] = parseInt(mv.integerValue);
          }
          return m;
        }
        return item;
      });
    }
    else result[k] = v;
  }
  return result;
}

function getRawMessages(rawDoc) {
  if (!rawDoc.fields || !rawDoc.fields.messages || !rawDoc.fields.messages.arrayValue) return [];
  return rawDoc.fields.messages.arrayValue.values || [];
}

function messageToFirestore(msg) {
  return {
    mapValue: {
      fields: {
        role: { stringValue: msg.role },
        author: { stringValue: msg.author },
        text: { stringValue: msg.text },
        timestamp: { stringValue: msg.timestamp }
      }
    }
  };
}

function printMessage(m, index) {
  const icon = m.role === 'agent' ? '🤖' : '👤';
  console.log(`  [${index}] ${icon} ${m.role} | ${m.author} | ${m.timestamp}`);
  console.log(`      ${m.text}`);
}

async function registerAgentSession(category) {
  const agentId = 'claude-code-' + (process.env.USER || 'default');
  const fields = {
    agent: { stringValue: 'Claude Code' },
    agentId: { stringValue: agentId },
    lastActiveAt: { stringValue: new Date().toISOString() },
    host: { stringValue: require('os').hostname() }
  };
  await firestorePatch(`categories/${category}/agentSessions/${agentId}`, fields);
}

async function fetchAllIdeas(category, statusFilter) {
  const result = await firestoreList(`categories/${category}/ideas`, 'orderBy=createdAt');
  if (!result.documents) return [];
  return result.documents.map(parseDoc).filter(d =>
    statusFilter === 'all' ? true : d.status === statusFilter
  );
}

async function main() {
  const cmd = process.argv[2];
  const category = process.argv[3] || 'default';

  // Rekisteröi agentin sessio (paitsi help)
  if (cmd && cmd !== 'help') {
    await registerAgentSession(category);
  }

  // ── fetch: hae koko keskustelu ──
  if (cmd === 'fetch') {
    const ideaId = process.argv[4];
    if (!ideaId) { console.log('Käyttö: node _agent.js fetch <category> <ideaId>'); process.exit(1); }

    const rawDoc = await firestoreGet(`categories/${category}/ideas/${ideaId}`);
    const idea = parseDoc(rawDoc);

    console.log(`\n=== Idea: ${idea.ideaId} ===`);
    console.log(`Tekijä: ${idea.author}`);
    console.log(`Status: ${idea.status}`);
    console.log(`Luotu: ${idea.createdAt}`);
    console.log(`lastProcessedIndex: ${idea.lastProcessedIndex ?? -1}`);
    console.log(`\n--- Koko viestiketju (${(idea.messages || []).length} viestiä) ---`);
    (idea.messages || []).forEach((m, i) => printMessage(m, i));

    const rawMsgs = getRawMessages(rawDoc);
    const logEntry = messageToFirestore({
      role: 'agent', author: 'Claude Code', timestamp: new Date().toISOString(),
      text: 'Agentti kävi lukemassa ideoitasi'
    });
    rawMsgs.push(logEntry);
    await firestorePatch(`categories/${category}/ideas/${ideaId}`, {
      messages: { arrayValue: { values: rawMsgs } }
    });
    console.log(`\n✓ Kirjoitettu viestiketjuun: "Agentti kävi lukemassa ideoitasi"`);
  }

  // ── pending: hae vain käsittelemättömät viestit ──
  else if (cmd === 'pending') {
    const ideaId = process.argv[4];
    if (!ideaId) { console.log('Käyttö: node _agent.js pending <category> <ideaId>'); process.exit(1); }

    const rawDoc = await firestoreGet(`categories/${category}/ideas/${ideaId}`);
    const idea = parseDoc(rawDoc);
    const messages = idea.messages || [];
    const lastIdx = idea.lastProcessedIndex ?? -1;

    const pending = messages
      .map((m, i) => ({ ...m, index: i }))
      .filter(m => m.index > lastIdx && m.role === 'user');

    console.log(`\n=== Idea: ${idea.ideaId} — Käsittelemättömät viestit ===`);
    console.log(`Tekijä: ${idea.author} | Status: ${idea.status}`);
    console.log(`Viestejä yhteensä: ${messages.length} | lastProcessedIndex: ${lastIdx}`);
    console.log(`Käsittelemättömiä käyttäjäviestejä: ${pending.length}\n`);

    if (pending.length === 0) {
      console.log('Ei uusia käsittelemättömiä viestejä.');
    } else {
      pending.forEach(m => printMessage(m, m.index));
    }
  }

  // ── reply: agentti kirjoittaa viestin ketjuun ja päivittää lastProcessedIndex ──
  else if (cmd === 'reply') {
    const ideaId = process.argv[4];
    const message = process.argv.slice(5).join(' ');
    if (!ideaId || !message) {
      console.log('Käyttö: node _agent.js reply <category> <ideaId> <viesti>');
      process.exit(1);
    }

    const rawDoc = await firestoreGet(`categories/${category}/ideas/${ideaId}`);
    const idea = parseDoc(rawDoc);
    const rawMsgs = getRawMessages(rawDoc);

    // Etsi viimeisen käyttäjäviestin indeksi → tähän asti käsitelty
    let lastUserIndex = -1;
    (idea.messages || []).forEach((m, i) => { if (m.role === 'user') lastUserIndex = i; });

    const agentMsg = messageToFirestore({
      role: 'agent', author: 'Claude Code', timestamp: new Date().toISOString(),
      text: message
    });
    rawMsgs.push(agentMsg);

    await firestorePatch(`categories/${category}/ideas/${ideaId}`, {
      messages: { arrayValue: { values: rawMsgs } },
      lastProcessedIndex: { integerValue: String(lastUserIndex) }
    });

    console.log(`\n✓ Viesti lisätty ketjuun (index ${rawMsgs.length - 1})`);
    console.log(`✓ lastProcessedIndex → ${lastUserIndex}`);
    console.log(`  🤖 Claude Code: ${message}`);
  }

  // ── status: vaihda idean status ja kirjoita viesti ──
  else if (cmd === 'status') {
    const ideaId = process.argv[4];
    const newStatus = process.argv[5];
    const message = process.argv.slice(6).join(' ');
    if (!ideaId || !newStatus) {
      console.log('Käyttö: node _agent.js status <category> <ideaId> <new|in-progress|done|blocked> [viesti]');
      process.exit(1);
    }

    const rawDoc = await firestoreGet(`categories/${category}/ideas/${ideaId}`);
    const idea = parseDoc(rawDoc);
    const rawMsgs = getRawMessages(rawDoc);

    const statusText = message || `Status vaihdettu → ${newStatus}`;
    const agentMsg = messageToFirestore({
      role: 'agent', author: 'Claude Code', timestamp: new Date().toISOString(),
      text: statusText
    });
    rawMsgs.push(agentMsg);

    let lastUserIndex = -1;
    (idea.messages || []).forEach((m, i) => { if (m.role === 'user') lastUserIndex = i; });

    const fields = {
      status: { stringValue: newStatus },
      messages: { arrayValue: { values: rawMsgs } },
      lastProcessedIndex: { integerValue: String(lastUserIndex) }
    };
    if (newStatus === 'done') {
      fields.completedAt = { stringValue: new Date().toISOString() };
    }

    await firestorePatch(`categories/${category}/ideas/${ideaId}`, fields);
    console.log(`\n✓ Status: ${newStatus}`);
    console.log(`✓ lastProcessedIndex → ${lastUserIndex}`);
    console.log(`✓ Viesti: ${statusText}`);
  }

  // ── summarize: kirjoita 2-3 sanan tiivistelmä ──
  else if (cmd === 'summarize') {
    const ideaId = process.argv[4];
    const summary = process.argv.slice(5).join(' ');
    if (!ideaId || !summary) {
      console.log('Käyttö: node _agent.js summarize <category> <ideaId> <2-3 sanan tiivistelmä>');
      process.exit(1);
    }
    await firestorePatch(`categories/${category}/ideas/${ideaId}`, {
      agentSummary: { stringValue: summary }
    });
    console.log(`\n✓ Tiivistelmä: "${summary}"`);
  }

  // ── link: aseta sovelluksen URL ──
  else if (cmd === 'link') {
    const ideaId = process.argv[4];
    const url = process.argv[5];
    if (!ideaId || !url) {
      console.log('Käyttö: node _agent.js link <category> <ideaId> <url>');
      process.exit(1);
    }
    await firestorePatch(`categories/${category}/ideas/${ideaId}`, {
      appUrl: { stringValue: url }
    });
    console.log(`\n✓ Linkki sovellukseen: ${url}`);
  }

  // ── list: listaa ideat ──
  else if (cmd === 'list') {
    const statusFilter = process.argv[4] || 'all';
    const ideas = await fetchAllIdeas(category, statusFilter);
    console.log(`\n=== ${category} — ${ideas.length} ideaa (filter: ${statusFilter}) ===\n`);
    ideas.forEach(idea => {
      const msgCount = (idea.messages || []).length;
      const lastIdx = idea.lastProcessedIndex ?? -1;
      const userMsgs = (idea.messages || []).filter(m => m.role === 'user');
      const pendingCount = userMsgs.filter((m, i) => {
        const realIdx = (idea.messages || []).indexOf(m);
        return realIdx > lastIdx;
      }).length;
      const pendingTag = pendingCount > 0 ? ` [${pendingCount} uutta]` : '';
      console.log(`${idea.ideaId} | ${idea.author} | ${idea.status} | ${msgCount} viestiä${pendingTag} | ${(idea.text || '').substring(0, 80)}`);
    });
  }

  // ── queue: toteuttamattomat ideat ──
  else if (cmd === 'queue') {
    const ideas = await fetchAllIdeas(category, 'new');
    if (ideas.length === 0) {
      console.log('Jono tyhjä — ei toteuttamattomia ideoita.');
      process.exit(0);
    }
    console.log(`\n=== Toteuttamattomat ideat: ${ideas.length} kpl ===\n`);
    for (const idea of ideas) {
      const lastIdx = idea.lastProcessedIndex ?? -1;
      const pending = (idea.messages || [])
        .map((m, i) => ({ ...m, index: i }))
        .filter(m => m.index > lastIdx && m.role === 'user');
      console.log(`--- ${idea.ideaId} (${idea.author}) — ${pending.length} käsittelemätöntä ---`);
      pending.forEach(m => printMessage(m, m.index));
      console.log();
    }
  }

  // ── help ──
  else {
    console.log(`Agentic Discovery CLI — Agentin vuoropuhelutyökalu

Komennot:
  node _agent.js fetch     <category> <ideaId>                — Hae koko viestiketju
  node _agent.js pending   <category> <ideaId>                — Näytä vain käsittelemättömät viestit
  node _agent.js reply     <category> <ideaId> <viesti>       — Kirjoita agentin viesti + päivitä lastProcessedIndex
  node _agent.js status    <category> <ideaId> <status> [msg] — Vaihda status (new/in-progress/done/blocked)
  node _agent.js summarize <category> <ideaId> <tiivistelmä>  — Kirjoita 2-3 sanan ydinajatus
  node _agent.js list      <category> [status]                — Listaa ideat (all/new/in-progress/done)
  node _agent.js queue     <category>                         — Näytä toteuttamattomien jono

Esimerkit:
  node _agent.js pending Siili-Site-Tour-2026 20260429_0623_124
  node _agent.js reply   Siili-Site-Tour-2026 20260429_0623_124 "Aloitan toteutuksen: sääsovellus Helsingille"
  node _agent.js status  Siili-Site-Tour-2026 20260429_0623_124 in-progress "Työ aloitettu"
  node _agent.js status  Siili-Site-Tour-2026 20260429_0623_124 done "Kaikki toiveet toteutettu"
  node _agent.js list    Siili-Site-Tour-2026 new
  node _agent.js queue   Siili-Site-Tour-2026`);
  }
}

main().catch(e => { console.error('Virhe:', e.message); process.exit(1); });
