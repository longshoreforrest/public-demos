// ==================== Siili Pienkehittaja – App Logic ====================

// ==================== I18N / TRANSLATIONS ====================
const translations = {
    fi: {
        // Page title
        page_title: 'Siili Pienkehittäjä - WordPress Tukiagentti',
        // Header
        header_title: 'Siili Pienkehittaja',
        header_subtitle: 'WordPress-pienkehityksen AI-agentti \u2014 Oikeusministerion hallinnonala',
        header_guide_link: 'Käyttöohje \u2192',
        header_badge: 'Demo / OM-virasto multisite',
        // Tabs
        tab_chat: 'Chat',
        tab_tickets: 'Tiketit',
        tab_code: 'Koodimuutokset',
        tab_pipeline: 'Pipeline',
        tab_audit: 'Auditointi',
        tab_analytics: 'Analytiikka',
        // Chat context
        chat_label_site: 'Sivusto:',
        chat_label_page: 'Sivu:',
        chat_label_section: 'Osio:',
        chat_section_placeholder: 'esim. Lomake, Navigaatio...',
        chat_context_active: 'Konteksti aktiivinen',
        // Chat widget
        chat_widget_title: 'Siili Pienkehitysagentti',
        chat_widget_sub: 'WordPress-tuki \u00B7 online',
        chat_sim_title: 'Simuloi keskustelu',
        chat_sim_placeholder: 'Simuloi keskustelu...',
        chat_satisfaction_label: 'Asiakaskokemus:',
        chat_mic_title: 'Puhu viesti',
        chat_input_placeholder: 'Kirjoita tai puhu...',
        chat_agent_name: 'Pienkehitysagentti',
        chat_speech_unsupported: 'Puheentunnistus ei tuettu tässä selaimessa',
        // Tickets view
        tickets_search_placeholder: 'Hae tiketeistä...',
        filter_all_statuses: 'Kaikki tilat',
        filter_all_types: 'Kaikki tyypit',
        filter_all_agencies: 'Kaikki virastot',
        status_new: 'Uusi',
        status_in_progress: 'Kehityksessä',
        status_review: 'Katselmointi',
        status_approved: 'Hyväksytty',
        status_deployed: 'Tuotannossa',
        type_bug: 'Bugi',
        type_feature: 'Ominaisuus',
        stat_total: 'Yhteensä',
        stat_bugs: 'Bugeja',
        stat_features: 'Ominaisuuksia',
        stat_new: 'Uusia',
        stat_in_review: 'Katselmoinnissa',
        no_tickets: 'Ei tikettejä valituilla suodattimilla',
        // Code review
        code_sidebar_header: 'Katselmointia odottavat',
        code_empty: 'Valitse tiketti vasemmalta nähdäksesi koodimuutokset',
        btn_approve: 'Hyväksy muutos',
        btn_reject: 'Hylkää',
        btn_show_conversation: 'Näytä keskustelu',
        files_changed_singular: 'tiedosto muutettu',
        files_changed_plural: 'tiedostoa muutettu',
        reporter: 'Raportoija',
        conversation_title: 'Keskustelu',
        toast_approved: 'hyväksytty! Muutos siirtyy julkaisuputkeen.',
        toast_rejected: 'palautettu kehitykseen.',
        toast_ticket_opened: 'Tiketti {id} avattu',
        // Pipeline
        no_tickets_in_stage: 'Ei tikettejä',
        // Audit
        audit_upload_title: 'Tuo saavutettavuus- tai käytettävyysauditointi',
        audit_upload_desc: 'Lataa auditoinnin PDF- tai JSON-raportti tai käytä esitäytettyjä demotietoja',
        audit_load_demo: 'Lataa demoraportti',
        audit_analyze: 'Analysoi raportti',
        audit_demo_loaded: 'Demoraportti ladattu',
        audit_analyzing: 'Analysoidaan...',
        audit_analysis_done: 'Analyysi valmis',
        audit_toast_loaded: 'Auditoinnin demoraportti ladattu',
        audit_toast_analyzed: 'Auditoinnin analyysi valmis \u2013 backlog generoitu',
        audit_total_findings: 'Havaintoja yhteensä',
        audit_critical: 'Kriittisiä',
        audit_major: 'Merkittäviä',
        audit_minor: 'Pienempiä',
        audit_recommendations: 'Suosituksia',
        audit_overall_score: 'Kokonaispistemäärä',
        audit_tested_pages: 'Testatut sivut',
        audit_automated: 'Automatisoidut',
        audit_manual: 'Manuaaliset',
        audit_auditor: 'Auditoija',
        audit_date: 'Päivämäärä',
        audit_standard: 'Standardi',
        audit_scope: 'Laajuus',
        audit_export_pdf: 'Vie PDF',
        audit_categories_title: 'Havainnot WCAG-kategorioittain',
        audit_findings_count: 'havaintoa',
        audit_all_findings: 'Kaikki havainnot',
        audit_all: 'Kaikki',
        audit_roadmap_title: 'Korjaussuunnitelma (Roadmap)',
        audit_phase: 'Vaihe',
        audit_recommendation_label: 'Suositus:',
        audit_affected_sites: 'Vaikuttavat sivustot:',
        audit_effort_estimate: 'Työmääräarvio:',
        audit_related_ticket: 'Liittyvä tiketti',
        audit_create_backlog: 'Luo kehityspyyntö',
        audit_backlog_created: 'Kehityspyyntö luotu',
        audit_toast_backlog: 'Kehityspyyntö luotu havainnolle',
        audit_affects: 'Vaikuttaa',
        audit_pages: 'Sivut',
        audit_effort: 'Työmäärä',
        effort_S: 'Pieni (1-2h)',
        effort_M: 'Keskisuuri (4-8h)',
        effort_L: 'Suuri (2-3 pv)',
        effort_XL: 'Erittäin suuri (viikko+)',
        // Audit PDF export
        pdf_summary: 'Yhteenveto',
        pdf_findings: 'Havainnot',
        pdf_roadmap: 'Korjaussuunnitelma (Roadmap)',
        pdf_generated: 'Generoitu Siili Pienkehittäjä -järjestelmästä',
        pdf_col_id: 'ID',
        pdf_col_severity: 'Vakavuus',
        pdf_col_finding: 'Havainto',
        pdf_col_wcag: 'WCAG',
        pdf_col_effort: 'Työmäärä',
        pdf_col_ticket: 'Tiketti',
        pdf_contains: 'Sisältää',
        // Analytics
        analytics_tickets_by_agency: 'Tiketit virastoittain',
        analytics_tickets_by_status: 'Tiketit tilan mukaan',
        analytics_bugs_vs_features: 'Bugit vs. ominaisuudet',
        analytics_by_priority: 'Tiketit prioriteetin mukaan',
        analytics_accessibility_by_agency: 'Saavutettavuushavainnot virastoittain',
        analytics_severity_distribution: 'Auditoinnin vakavuusjakauma',
        analytics_accessibility_prompt: 'Lataa auditoinnin raportti Auditointi-välilehdeltä nähdäksesi saavutettavuusanalytiikan',
        analytics_accessibility_title: 'Saavutettavuusanalytiikka',
        analytics_tickets_label: 'tikettia',
        analytics_findings_label: 'havaintoa',
        priority_high: 'Korkea',
        priority_medium: 'Keskitaso',
        priority_low: 'Matala',
        label_bugs: 'Bugit',
        label_features: 'Ominaisuudet',
        label_critical: 'Kriittinen',
        label_major: 'Merkittävä',
        label_minor: 'Pienempi',
        label_recommendation: 'Suositus',
        drilldown_tickets_prefix: 'Tiketit',
        drilldown_priority_prefix: 'Prioriteetti',
        drilldown_accessibility_prefix: 'Saavutettavuus',
        // Chat responses (dynamic)
        chat_greeting: 'Hei! Olen pienkehitysagentti oikeusministerion WordPress-sivustoille. Kerro mitä ongelmaa tai toivetta sinulla on, niin autan!',
        chat_ticket_created: 'Tiketti {id} luotu! Pienkehitysagentti käsittelee sen.',
        chat_ticket_details: 'Tiketti {id} on luotu ja liitetty tähän keskusteluun. Se on nyt pienkehitysjonossa. Saat ilmoituksen kun muutos on valmis katselmoitavaksi. Onko jotain muuta jossa voin auttaa?',
        chat_no_ticket: 'Selvä, tikettiä ei luoda. Kerro jos haluat myöhemmin palata asiaan tai jos voin auttaa muussa asiassa.',
        chat_ask_details: 'Voitko ensin kertoa tarkemmin ongelmasta tai toiveesta, niin osaan luokitella sen oikein? Kuvaile mitä yritit tehdä ja mitä tapahtui (tai mitä haluaisit tapahtuvan).',
        chat_thanks_context: 'Kiitos viestistä! Ymmärrän, olet sivustolla {agency} / {page}. {clarify}',
        chat_context_detail_bug: 'Tarkistin kontekstin: {agency} / {page}{section}. Havaitsin teknisen ongelman joka liittyy kuvaamaasi tilanteeseen.',
        chat_context_detail_feature: 'Tarkistin nykyisen sivuston konfiguraation: {agency} / {page}. Tätä toiminnallisuutta ei tällä hetkellä ole.',
        // Sim website
        sim_search_placeholder: 'Hae sivustolta...',
        sim_search_button: 'Hae',
        sim_services: 'Palvelut',
        sim_news: 'Ajankohtaista',
        sim_contacts: 'Yhteystiedot',
        sim_customer_service: 'Asiakaspalvelu',
        sim_customer_service_hours: 'Puhelinpalvelu ma-pe klo 9-15',
        sim_visit_address: 'Käyntiosoite',
        sim_read_more: 'Lue lisää \u2192',
        sim_on_page: 'Olet sivulla {name} / {page}. Selaa sisältöä tai kysy apua chat-ikkunasta.',
        sim_accessibility: 'Saavutettavuusseloste',
        sim_privacy: 'Tietosuoja',
        sim_cookies: 'Evästeasetukset',
        sim_government: 'Oikeusministeriön hallinnonala \u00B7 Suomen valtioneuvosto',
    },
    en: {
        // Page title
        page_title: 'Siili Small Development - WordPress Support Agent',
        // Header
        header_title: 'Siili Small Development',
        header_subtitle: 'WordPress small development AI agent \u2014 Ministry of Justice administration',
        header_guide_link: 'User Guide \u2192',
        header_badge: 'Demo / MoJ agency multisite',
        // Tabs
        tab_chat: 'Chat',
        tab_tickets: 'Tickets',
        tab_code: 'Code Changes',
        tab_pipeline: 'Pipeline',
        tab_audit: 'Audit',
        tab_analytics: 'Analytics',
        // Chat context
        chat_label_site: 'Site:',
        chat_label_page: 'Page:',
        chat_label_section: 'Section:',
        chat_section_placeholder: 'e.g. Form, Navigation...',
        chat_context_active: 'Context active',
        // Chat widget
        chat_widget_title: 'Siili Development Agent',
        chat_widget_sub: 'WordPress support \u00B7 online',
        chat_sim_title: 'Simulate conversation',
        chat_sim_placeholder: 'Simulate conversation...',
        chat_satisfaction_label: 'Customer experience:',
        chat_mic_title: 'Voice message',
        chat_input_placeholder: 'Type or speak...',
        chat_agent_name: 'Development Agent',
        chat_speech_unsupported: 'Speech recognition is not supported in this browser',
        // Tickets view
        tickets_search_placeholder: 'Search tickets...',
        filter_all_statuses: 'All statuses',
        filter_all_types: 'All types',
        filter_all_agencies: 'All agencies',
        status_new: 'New',
        status_in_progress: 'In Progress',
        status_review: 'Review',
        status_approved: 'Approved',
        status_deployed: 'Deployed',
        type_bug: 'Bug',
        type_feature: 'Feature',
        stat_total: 'Total',
        stat_bugs: 'Bugs',
        stat_features: 'Features',
        stat_new: 'New',
        stat_in_review: 'In Review',
        no_tickets: 'No tickets match the selected filters',
        // Code review
        code_sidebar_header: 'Awaiting Review',
        code_empty: 'Select a ticket from the left to view code changes',
        btn_approve: 'Approve Change',
        btn_reject: 'Reject',
        btn_show_conversation: 'Show Conversation',
        files_changed_singular: 'file changed',
        files_changed_plural: 'files changed',
        reporter: 'Reporter',
        conversation_title: 'Conversation',
        toast_approved: 'approved! Change moves to deployment pipeline.',
        toast_rejected: 'returned to development.',
        toast_ticket_opened: 'Ticket {id} opened',
        // Pipeline
        no_tickets_in_stage: 'No tickets',
        // Audit
        audit_upload_title: 'Import accessibility or usability audit',
        audit_upload_desc: 'Upload an audit PDF or JSON report, or use pre-filled demo data',
        audit_load_demo: 'Load demo report',
        audit_analyze: 'Analyze report',
        audit_demo_loaded: 'Demo report loaded',
        audit_analyzing: 'Analyzing...',
        audit_analysis_done: 'Analysis complete',
        audit_toast_loaded: 'Audit demo report loaded',
        audit_toast_analyzed: 'Audit analysis complete \u2013 backlog generated',
        audit_total_findings: 'Total Findings',
        audit_critical: 'Critical',
        audit_major: 'Major',
        audit_minor: 'Minor',
        audit_recommendations: 'Recommendations',
        audit_overall_score: 'Overall Score',
        audit_tested_pages: 'Tested pages',
        audit_automated: 'Automated',
        audit_manual: 'Manual',
        audit_auditor: 'Auditor',
        audit_date: 'Date',
        audit_standard: 'Standard',
        audit_scope: 'Scope',
        audit_export_pdf: 'Export PDF',
        audit_categories_title: 'Findings by WCAG Category',
        audit_findings_count: 'findings',
        audit_all_findings: 'All Findings',
        audit_all: 'All',
        audit_roadmap_title: 'Remediation Roadmap',
        audit_phase: 'Phase',
        audit_recommendation_label: 'Recommendation:',
        audit_affected_sites: 'Affected sites:',
        audit_effort_estimate: 'Effort estimate:',
        audit_related_ticket: 'Related ticket',
        audit_create_backlog: 'Create backlog item',
        audit_backlog_created: 'Backlog item created',
        audit_toast_backlog: 'Backlog item created for finding',
        audit_affects: 'Affects',
        audit_pages: 'Pages',
        audit_effort: 'Effort',
        effort_S: 'Small (1-2h)',
        effort_M: 'Medium (4-8h)',
        effort_L: 'Large (2-3 days)',
        effort_XL: 'Very large (week+)',
        // Audit PDF export
        pdf_summary: 'Summary',
        pdf_findings: 'Findings',
        pdf_roadmap: 'Remediation Roadmap',
        pdf_generated: 'Generated by Siili Small Development system',
        pdf_col_id: 'ID',
        pdf_col_severity: 'Severity',
        pdf_col_finding: 'Finding',
        pdf_col_wcag: 'WCAG',
        pdf_col_effort: 'Effort',
        pdf_col_ticket: 'Ticket',
        pdf_contains: 'Contains',
        // Analytics
        analytics_tickets_by_agency: 'Tickets by Agency',
        analytics_tickets_by_status: 'Tickets by Status',
        analytics_bugs_vs_features: 'Bugs vs. Features',
        analytics_by_priority: 'Tickets by Priority',
        analytics_accessibility_by_agency: 'Accessibility Findings by Agency',
        analytics_severity_distribution: 'Audit Severity Distribution',
        analytics_accessibility_prompt: 'Load the audit report from the Audit tab to view accessibility analytics',
        analytics_accessibility_title: 'Accessibility Analytics',
        analytics_tickets_label: 'tickets',
        analytics_findings_label: 'findings',
        priority_high: 'High',
        priority_medium: 'Medium',
        priority_low: 'Low',
        label_bugs: 'Bugs',
        label_features: 'Features',
        label_critical: 'Critical',
        label_major: 'Major',
        label_minor: 'Minor',
        label_recommendation: 'Recommendation',
        drilldown_tickets_prefix: 'Tickets',
        drilldown_priority_prefix: 'Priority',
        drilldown_accessibility_prefix: 'Accessibility',
        // Chat responses (dynamic)
        chat_greeting: 'Hi! I am a development agent for Ministry of Justice WordPress sites. Tell me about any issues or requests you have, and I will help!',
        chat_ticket_created: 'Ticket {id} created! The development agent will process it.',
        chat_ticket_details: 'Ticket {id} has been created and linked to this conversation. It is now in the development queue. You will receive a notification when the change is ready for review. Is there anything else I can help with?',
        chat_no_ticket: 'Understood, no ticket will be created. Let me know if you want to revisit this later or if I can help with something else.',
        chat_ask_details: 'Could you first describe the issue or request in more detail so I can classify it correctly? Describe what you were trying to do and what happened (or what you would like to happen).',
        chat_thanks_context: 'Thank you! I can see you are on {agency} / {page}. {clarify}',
        chat_context_detail_bug: 'I checked the context: {agency} / {page}{section}. I detected a technical issue related to your description.',
        chat_context_detail_feature: 'I checked the current site configuration: {agency} / {page}. This functionality is not currently available.',
        // Sim website
        sim_search_placeholder: 'Search the site...',
        sim_search_button: 'Search',
        sim_services: 'Services',
        sim_news: 'News',
        sim_contacts: 'Contact Information',
        sim_customer_service: 'Customer Service',
        sim_customer_service_hours: 'Phone service Mon-Fri 9am-3pm',
        sim_visit_address: 'Visiting Address',
        sim_read_more: 'Read more \u2192',
        sim_on_page: 'You are on {name} / {page}. Browse content or ask for help via chat.',
        sim_accessibility: 'Accessibility Statement',
        sim_privacy: 'Privacy Policy',
        sim_cookies: 'Cookie Settings',
        sim_government: 'Ministry of Justice administration \u00B7 Finnish Government',
    }
};

let currentLang = localStorage.getItem('siteTourLang') || 'fi';

function t(key) {
    return (translations[currentLang] && translations[currentLang][key]) || (translations.fi && translations.fi[key]) || key;
}

function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('siteTourLang', lang);
    document.documentElement.lang = lang;

    // Update page title
    const titleEl = document.getElementById('page-title');
    if (titleEl) titleEl.textContent = t('page_title');

    // Update lang buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const val = t(key);
        if (val && val !== key) {
            el.textContent = val;
        }
    });

    // Update data-i18n-placeholder elements
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        const val = t(key);
        if (val && val !== key) {
            el.placeholder = val;
        }
    });

    // Update data-i18n-title elements
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.dataset.i18nTitle;
        const val = t(key);
        if (val && val !== key) {
            el.title = val;
        }
    });

    // Re-render dynamic views
    if (typeof renderTicketStats === 'function') renderTicketStats();
    if (typeof renderTickets === 'function') renderTickets();
    if (typeof renderPipeline === 'function') renderPipeline();
    if (typeof renderCodeSidebar === 'function') renderCodeSidebar();
    if (selectedTicketId) renderCodeMain(selectedTicketId);
    if (typeof renderAnalytics === 'function') renderAnalytics();
    if (auditLoaded && typeof renderAuditReport === 'function') renderAuditReport();
    if (typeof renderSimWebsite === 'function') renderSimWebsite();
}

// ---- State ----
let selectedTicketId = null;
let chatMessages = [];
let chatStep = 0; // 0=idle, 1=described, 2=classified, 3=ticket-offered, 4=ticket-created
let auditLoaded = false;
let auditBacklogCreated = new Set();
let drilldownFilter = null;
const drilldownStore = {}; // key -> { title, ids }
let drilldownCounter = 0;

function storeDrilldown(title, ids) {
    const key = 'dd_' + (drilldownCounter++);
    drilldownStore[key] = { title, ids };
    return key;
}

// ---- DOM refs ----
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ---- Tab switching ----
$$('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        $$('.tab').forEach(t => t.classList.remove('active'));
        $$('.view').forEach(v => v.classList.remove('active'));
        tab.classList.add('active');
        $(`#${tab.dataset.view}`).classList.add('active');
    });
});

// ---- Toast ----
function showToast(msg, type = '') {
    const t = $('#toast');
    t.textContent = msg;
    t.className = 'toast visible' + (type ? ' ' + type : '');
    setTimeout(() => t.classList.remove('visible'), 3000);
}

// ---- Modal ----
function showModal(html) {
    $('#modal-content').innerHTML = html;
    $('#modal-overlay').classList.add('active');
}
$('#modal-close').addEventListener('click', () => $('#modal-overlay').classList.remove('active'));
$('#modal-overlay').addEventListener('click', e => { if (e.target === e.currentTarget) $('#modal-overlay').classList.remove('active'); });

// ==================== CHAT ====================
function initChat() {
    const agencySel = $('#chat-agency');
    const pageSel = $('#chat-page');
    agencies.forEach(a => agencySel.innerHTML += `<option value="${a.id}">${a.name} (${a.domain})</option>`);
    agencySel.addEventListener('change', () => {
        const pgs = pages[agencySel.value] || [];
        pageSel.innerHTML = pgs.map(p => `<option>${p}</option>`).join('');
        renderSimWebsite();
    });
    pageSel.addEventListener('change', renderSimWebsite);
    agencySel.dispatchEvent(new Event('change'));

    addChatMessage('agent', t('chat_greeting'));

    $('#btn-send').addEventListener('click', sendChat);
    $('#chat-input').addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(); });

    // Speech
    const micBtn = $('#btn-mic');
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SR();
        recognition.lang = 'fi-FI';
        recognition.continuous = false;
        recognition.interimResults = false;
        let recording = false;

        micBtn.addEventListener('click', () => {
            if (recording) {
                recognition.stop();
                micBtn.classList.remove('recording');
                recording = false;
            } else {
                recognition.start();
                micBtn.classList.add('recording');
                recording = true;
            }
        });

        recognition.onresult = (e) => {
            const text = e.results[0][0].transcript;
            $('#chat-input').value = text;
            micBtn.classList.remove('recording');
            recording = false;
            sendChat();
        };
        recognition.onerror = () => { micBtn.classList.remove('recording'); recording = false; };
        recognition.onend = () => { micBtn.classList.remove('recording'); recording = false; };
    } else {
        micBtn.title = t('chat_speech_unsupported');
        micBtn.style.opacity = '0.4';
    }

    // Simulation scenarios
    initChatSimulations();
}

// Ticket data created by simulations
const simTicketData = {
    'TIK-026': {
        id: 'TIK-026',
        title: 'Palautelomakkeen lähetys ei toimi – CF7 JS-virhe',
        type: 'bug',
        priority: 'high',
        status: 'new',
        agencyId: 'rikos',
        page: 'Yhteystiedot',
        section: 'Palautelomake',
        createdAt: '2026-04-16',
        customerName: 'Juha Mäkinen',
        customerEmail: 'juha.makinen@rikosseuraamuslaitos.fi',
        customerRole: 'Verkkopalvelupäällikkö',
        conversation: [
            { role: 'customer', text: 'Yhteystietosivun palautelomake ei toimi. Kun painan "Lähetä", mitään ei tapahdu. Selain on Chrome, versio 124.', ts: '2026-04-16 10:30' },
            { role: 'agent', text: 'Hei Juha! Tarkistin lomakkeen – JavaScript-konsolissa näkyy "TypeError: Cannot read properties of null". Bugi lomakkeen validointiskriptissä CF7-päivityksen jäljiltä.', ts: '2026-04-16 10:31' },
            { role: 'customer', text: 'Kyllä ehdottomasti korjatkaa. Tämä on estänyt palautteen antamisen jo parin päivän ajan.', ts: '2026-04-16 10:32' },
            { role: 'agent', text: 'Tiketti TIK-026 luotu korkealla prioriteetilla. Ohjataan pienkehitysjonoon.', ts: '2026-04-16 10:33' },
        ],
        diff: {
            branch: 'fix/TIK-026-cf7-form-validation',
            summary: 'Korjaa CF7-lomakkeen validointi-JS joka rikkoutui päivityksessä 5.9.1',
            files: [
                {
                    path: 'wp-content/themes/om-virasto/assets/js/form-validation.js',
                    type: 'modified',
                    hunks: [
                        {
                            header: '@@ -18,7 +18,9 @@ document.addEventListener("DOMContentLoaded", function() {',
                            lines: [
                                { type: 'context', content: '    const forms = document.querySelectorAll(".wpcf7-form");' },
                                { type: 'remove', content: '    const submitBtn = document.querySelector(".wpcf7-submit");' },
                                { type: 'add', content: '    forms.forEach(function(form) {' },
                                { type: 'add', content: '        const submitBtn = form.querySelector(".wpcf7-submit");' },
                                { type: 'add', content: '        if (!submitBtn) return;' },
                                { type: 'context', content: '' },
                                { type: 'context', content: '        submitBtn.addEventListener("click", function(e) {' },
                            ]
                        },
                        {
                            header: '@@ -42,6 +44,8 @@ document.addEventListener("DOMContentLoaded", function() {',
                            lines: [
                                { type: 'context', content: '            form.submit();' },
                                { type: 'context', content: '        });' },
                                { type: 'add', content: '    }); // end forms.forEach' },
                                { type: 'context', content: '});' },
                            ]
                        }
                    ]
                },
                {
                    path: 'wp-content/themes/om-virasto/inc/cf7-compat.php',
                    type: 'added',
                    hunks: [
                        {
                            header: '@@ -0,0 +1,15 @@',
                            lines: [
                                { type: 'add', content: '<?php' },
                                { type: 'add', content: '/**' },
                                { type: 'add', content: ' * CF7 5.9.x yhteensopivuuskorjaus' },
                                { type: 'add', content: ' * TIK-026: Lomakkeen submit-handler kaatui kun .wpcf7-submit' },
                                { type: 'add', content: ' * elementtiä ei löytynyt uudella DOM-rakenteella.' },
                                { type: 'add', content: ' */' },
                                { type: 'add', content: "add_filter('wpcf7_form_elements', function($content) {" },
                                { type: 'add', content: '    // Varmista submit-napin luokka uudessa CF7-versiossa' },
                                { type: 'add', content: '    $content = str_replace(' },
                                { type: 'add', content: "        'class=\"wpcf7-form-control has-spinner wpcf7-submit\"'," },
                                { type: 'add', content: "        'class=\"wpcf7-form-control has-spinner wpcf7-submit btn-submit\"'," },
                                { type: 'add', content: '        $content' },
                                { type: 'add', content: '    );' },
                                { type: 'add', content: '    return $content;' },
                                { type: 'add', content: '});' },
                            ]
                        }
                    ]
                }
            ]
        }
    },
    'TIK-027': {
        id: 'TIK-027',
        title: 'Haku palauttaa draft/private-sisältöä julkisille käyttäjille',
        type: 'bug',
        priority: 'high',
        status: 'new',
        agencyId: 'ulos',
        page: 'Etusivu',
        section: 'Hakutoiminto',
        createdAt: '2026-04-16',
        customerName: 'Markku Väisänen',
        customerEmail: 'markku.vaisanen@ulosottolaitos.fi',
        customerRole: 'Tietoturvavastaava',
        conversation: [
            { role: 'customer', text: 'Hakutoiminto on rikki. Haen "maksusuunnitelma" ja tuloksena tulee henkilöstöhallinnon sisäisiä sivuja jotka eivät pitäisi näkyä julkisesti.', ts: '2026-04-16 11:05' },
            { role: 'agent', text: 'Tämä on vakava tietoturvaongelma. Hakuindeksi sisältää draft- ja private-sivuja. Bugi WP_Queryn post_status -suodatuksessa.', ts: '2026-04-16 11:06' },
            { role: 'customer', text: 'Sisäisiä dokumentteja ei saa näkyä ulkopuolisille. Korjatkaa heti!', ts: '2026-04-16 11:07' },
            { role: 'agent', text: 'Tiketti TIK-027 luotu kriittisellä prioriteetilla. Suosittelen hakutoiminnon väliaikaista poistamista.', ts: '2026-04-16 11:08' },
        ],
        diff: {
            branch: 'fix/TIK-027-search-post-status-leak',
            summary: 'Korjaa hakutoiminnon post_status-suodatus estämään draft/private-sisällön vuotaminen',
            files: [
                {
                    path: 'wp-content/themes/om-virasto/inc/search-query.php',
                    type: 'modified',
                    hunks: [
                        {
                            header: '@@ -8,6 +8,11 @@ function om_filter_search_query($query) {',
                            lines: [
                                { type: 'context', content: "    if ($query->is_search() && $query->is_main_query() && !is_admin()) {" },
                                { type: 'context', content: "        $query->set('posts_per_page', 20);" },
                                { type: 'add', content: '' },
                                { type: 'add', content: "        // TIK-027: Pakota vain julkaistut sisällöt hakutuloksiin" },
                                { type: 'add', content: "        $query->set('post_status', 'publish');" },
                                { type: 'add', content: '' },
                                { type: 'add', content: "        // Sulje pois sisäiset post-tyypit" },
                                { type: 'add', content: "        $excluded = array('revision', 'nav_menu_item', 'acf-field', 'acf-field-group');" },
                                { type: 'add', content: "        $allowed = array_diff(get_post_types(array('public' => true)), $excluded);" },
                                { type: 'add', content: "        $query->set('post_type', array_values($allowed));" },
                                { type: 'context', content: "    }" },
                                { type: 'context', content: "}" },
                            ]
                        }
                    ]
                },
                {
                    path: 'wp-content/themes/om-virasto/searchform.php',
                    type: 'modified',
                    hunks: [
                        {
                            header: '@@ -1,5 +1,6 @@',
                            lines: [
                                { type: 'context', content: '<form role="search" method="get" class="search-form" action="<?php echo esc_url(home_url(\'/\')); ?>">' },
                                { type: 'add', content: '    <input type="hidden" name="post_status" value="publish">' },
                                { type: 'context', content: '    <label class="screen-reader-text" for="site-search"><?php _e(\'Hae sivustolta\', \'om-virasto\'); ?></label>' },
                                { type: 'context', content: '    <input type="search" id="site-search" class="search-field"' },
                                { type: 'context', content: '           name="s" placeholder="<?php esc_attr_e(\'Hae sivustolta...\', \'om-virasto\'); ?>"' },
                            ]
                        }
                    ]
                }
            ]
        }
    },
    'TIK-028': {
        id: 'TIK-028',
        title: 'Sähköposti-ilmoitukset uusista päätöksistä aihealueittain',
        type: 'feature',
        priority: 'medium',
        status: 'new',
        agencyId: 'tuomio',
        page: 'Päätökset',
        section: 'Tilausilmoitukset',
        createdAt: '2026-04-16',
        customerName: 'Elina Järvinen',
        customerEmail: 'elina.jarvinen@tuomioistuinvirasto.fi',
        customerRole: 'Viestintäsuunnittelija',
        conversation: [
            { role: 'customer', text: 'Olisi hyödyllistä, jos päätössivulla voisi tilata sähköposti-ilmoituksia kun tietyn aihealueen uusia päätöksiä julkaistaan.', ts: '2026-04-16 13:00' },
            { role: 'agent', text: 'Kiinnostava ehdotus. Tällä hetkellä ilmoitustoimintoa ei ole. Toteutus voisi käyttää WordPressin tilaustoimintoa yhdistettynä kategorisointiin.', ts: '2026-04-16 13:01' },
            { role: 'customer', text: 'Lakimiehet seuraisivat mielellään omien aihealueidensa päätöksiä, esim. "siviilioikeus" tai "hallinto-oikeus".', ts: '2026-04-16 13:03' },
            { role: 'agent', text: 'Kehityspyyntö TIK-028 luotu. Toteutus sisältää aihealuevalinnan, tilauslomakkeen ja automaattiset ilmoitukset.', ts: '2026-04-16 13:04' },
        ],
        diff: {
            branch: 'feat/TIK-028-decision-email-subscriptions',
            summary: 'Lisää sähköposti-ilmoitustoiminto päätöksille aihealueittain (siviilioikeus, hallinto-oikeus jne.)',
            files: [
                {
                    path: 'wp-content/themes/om-virasto/inc/decision-subscriptions.php',
                    type: 'added',
                    hunks: [
                        {
                            header: '@@ -0,0 +1,45 @@',
                            lines: [
                                { type: 'add', content: '<?php' },
                                { type: 'add', content: '/**' },
                                { type: 'add', content: ' * TIK-028: Päätösten sähköposti-ilmoitukset aihealueittain' },
                                { type: 'add', content: ' */' },
                                { type: 'add', content: '' },
                                { type: 'add', content: "// Rekisteröi tilausten custom post type" },
                                { type: 'add', content: "function om_register_decision_subscriptions() {" },
                                { type: 'add', content: "    register_post_type('om_subscription', array(" },
                                { type: 'add', content: "        'public'   => false," },
                                { type: 'add', content: "        'supports' => array('title', 'custom-fields')," },
                                { type: 'add', content: "    ));" },
                                { type: 'add', content: "}" },
                                { type: 'add', content: "add_action('init', 'om_register_decision_subscriptions');" },
                                { type: 'add', content: '' },
                                { type: 'add', content: "// Käsittele tilauslomake" },
                                { type: 'add', content: "function om_handle_subscription_form() {" },
                                { type: 'add', content: "    if (!isset($_POST['om_subscribe_nonce'])) return;" },
                                { type: 'add', content: "    if (!wp_verify_nonce($_POST['om_subscribe_nonce'], 'om_subscribe')) return;" },
                                { type: 'add', content: '' },
                                { type: 'add', content: "    $email      = sanitize_email($_POST['subscriber_email']);" },
                                { type: 'add', content: "    $categories = array_map('intval', $_POST['decision_categories'] ?? array());" },
                                { type: 'add', content: '' },
                                { type: 'add', content: "    $post_id = wp_insert_post(array(" },
                                { type: 'add', content: "        'post_type'   => 'om_subscription'," },
                                { type: 'add', content: "        'post_title'  => $email," },
                                { type: 'add', content: "        'post_status' => 'publish'," },
                                { type: 'add', content: "    ));" },
                                { type: 'add', content: "    update_post_meta($post_id, '_subscriber_email', $email);" },
                                { type: 'add', content: "    update_post_meta($post_id, '_decision_categories', $categories);" },
                                { type: 'add', content: "}" },
                                { type: 'add', content: "add_action('template_redirect', 'om_handle_subscription_form');" },
                                { type: 'add', content: '' },
                                { type: 'add', content: "// Lähetä ilmoitukset kun uusi päätös julkaistaan" },
                                { type: 'add', content: "function om_notify_decision_subscribers($post_id) {" },
                                { type: 'add', content: "    if (get_post_type($post_id) !== 'decision') return;" },
                                { type: 'add', content: "    $cats = wp_get_post_categories($post_id);" },
                                { type: 'add', content: '' },
                                { type: 'add', content: "    $subs = get_posts(array('post_type' => 'om_subscription', 'numberposts' => -1));" },
                                { type: 'add', content: "    foreach ($subs as $sub) {" },
                                { type: 'add', content: "        $sub_cats = get_post_meta($sub->ID, '_decision_categories', true);" },
                                { type: 'add', content: "        if (array_intersect($cats, $sub_cats)) {" },
                                { type: 'add', content: "            $email = get_post_meta($sub->ID, '_subscriber_email', true);" },
                                { type: 'add', content: "            wp_mail($email, 'Uusi päätös: ' . get_the_title($post_id)," },
                                { type: 'add', content: "                om_build_decision_email($post_id));" },
                                { type: 'add', content: "        }" },
                                { type: 'add', content: "    }" },
                                { type: 'add', content: "}" },
                                { type: 'add', content: "add_action('publish_decision', 'om_notify_decision_subscribers');" },
                            ]
                        }
                    ]
                },
                {
                    path: 'wp-content/themes/om-virasto/template-parts/decision-subscribe-form.php',
                    type: 'added',
                    hunks: [
                        {
                            header: '@@ -0,0 +1,18 @@',
                            lines: [
                                { type: 'add', content: '<div class="decision-subscribe">' },
                                { type: 'add', content: '    <h3>Tilaa ilmoitukset uusista päätöksistä</h3>' },
                                { type: 'add', content: '    <form method="post" class="subscribe-form">' },
                                { type: 'add', content: '        <?php wp_nonce_field("om_subscribe", "om_subscribe_nonce"); ?>' },
                                { type: 'add', content: '        <label for="sub-email">Sähköpostiosoite</label>' },
                                { type: 'add', content: '        <input type="email" id="sub-email" name="subscriber_email" required>' },
                                { type: 'add', content: '        <fieldset>' },
                                { type: 'add', content: '            <legend>Valitse aihealueet:</legend>' },
                                { type: 'add', content: '            <?php foreach (get_categories(array("taxonomy" => "decision_area")) as $cat) : ?>' },
                                { type: 'add', content: '                <label><input type="checkbox" name="decision_categories[]"' },
                                { type: 'add', content: '                    value="<?php echo $cat->term_id; ?>"> <?php echo $cat->name; ?></label>' },
                                { type: 'add', content: '            <?php endforeach; ?>' },
                                { type: 'add', content: '        </fieldset>' },
                                { type: 'add', content: '        <button type="submit" class="btn-subscribe">Tilaa ilmoitukset</button>' },
                                { type: 'add', content: '    </form>' },
                                { type: 'add', content: '</div>' },
                            ]
                        }
                    ]
                }
            ]
        }
    }
};

const chatSimulations = [
    {
        id: 'sim-ohje-minna',
        label: 'Minna Korhonen – Ohje: Kuvan lisaaminen',
        agencyId: 'ork',
        page: 'Ajankohtaista',
        messages: [
            { role: 'customer', text: 'Hei, miten lisään kuvan uutisartikkeliin? En löydä "Lisää media" -painiketta editorissa.', delay: 400, sentiment: 25 },
            { role: 'agent', text: 'Hei Minna! Näen, että olet Oikeusrekisterikeskuksen Ajankohtaista-sivulla. Uudessa Gutenberg-editorissa "Lisää media" -painike on korvattu lohkoilla. Klikkaa editorialueella + -merkkiä ja valitse "Kuva"-lohko.<br><br><a class="chat-action-link" onclick="chatHighlightSite(\'.sim-news-list\', \'Uutisartikkelit – tähän lisätään kuva\')">&#128270; Näytä uutisosio sivustolla</a>', delay: 700, sentiment: 50 },
            { role: 'customer', text: 'Ahaa, löysin sen! Mutta miten asetan kuvan alt-tekstin? Se on tärkeä saavutettavuuden vuoksi.', delay: 500, sentiment: 60, reaction: '👍 Selkeä ohje' },
            { role: 'agent', text: 'Hieno kysymys! Kun kuva on lisätty, klikkaa sitä. Oikeaan reunaan avautuu "Lohkon asetukset" -paneeli. Sieltä löytyy "Alt-teksti" -kenttä. Kirjoita kuvaava teksti, esim. "Pääjohtaja puhumassa seminaarissa".<br><br><a class="chat-action-link" onclick="chatHighlightSite(\'.sim-card:first-child\', \'Esimerkki: tämän kortin kuva tarvitsee alt-tekstin\')">&#128270; Näytä esimerkki sivustolla</a>', delay: 700, sentiment: 80 },
            { role: 'customer', text: 'Kiitos, nyt onnistui! Ei tarvitse tehdä tikettiä.', delay: 400, sentiment: 95, reaction: '⭐ Erinomainen apu' },
            { role: 'agent', text: 'Hienoa! Jos tulee muita kysymyksiä, olen täällä auttamassa. Hyvää päivän jatkoa!', delay: 400, sentiment: 100 },
        ]
    },
    {
        id: 'sim-tiketti-juha',
        label: 'Juha Makinen – Tiketti: Lomake ei toimi',
        agencyId: 'rikos',
        page: 'Yhteystiedot',
        messages: [
            { role: 'customer', text: 'Yhteystietosivun palautelomake ei toimi. Kun painan "Lähetä", mitään ei tapahdu. Selain on Chrome, versio 124.', delay: 400, sentiment: 15 },
            { role: 'agent', text: 'Hei Juha! Näen kontekstin: rikosseuraamuslaitos.fi / Yhteystiedot. Tarkistin lomakkeen – JavaScript-konsolissa näkyy "TypeError: Cannot read properties of null". Bugi lomakkeen validointiskriptissä CF7-päivityksen jäljiltä.<br><br><a class="chat-action-link" onclick="chatHighlightSite(\'.sim-card:first-child\', \'Yhteystiedot – lomake tässä osiossa\')">&#128270; Näytä yhteystietoalue</a>', delay: 900, sentiment: 40, reaction: '🔍 Analysoitu' },
            { role: 'customer', text: 'Kyllä ehdottomasti. Tämä on estänyt palautteen antamisen jo parin päivän ajan.', delay: 400, sentiment: 35 },
            { role: 'agent', text: 'Selvä. Luon korkean prioriteetin bugitiketin.', delay: 400, sentiment: 50 },
            { role: 'system', text: '📋 Tiketti TIK-026 luotu: "Palautelomakkeen lähetys ei toimi – CF7 JS-virhe" (Bugi, Korkea prioriteetti)', delay: 300, sentiment: 70 },
            { role: 'agent', text: 'Tiketti TIK-026 on luotu ja ohjattu pienkehitysjonoon korkealla prioriteetilla. Saat ilmoituksen kun korjaus on katselmoitavissa.<br><br><a class="chat-action-link" onclick="openSimTicket(\'TIK-026\')">&#128196; Avaa tiketti TIK-026</a>', delay: 600, sentiment: 85, reaction: '✅ Tiketti luotu' },
        ]
    },
    {
        id: 'sim-ohje-laura',
        label: 'Laura Repo – Ohje: Sivun julkaisun ajastus',
        agencyId: 'tietosuoja',
        page: 'Ajankohtaista',
        messages: [
            { role: 'customer', text: 'Miten voin ajastaa uutisartikkelin julkaisun tulevaisuuteen? Haluaisin, että artikkeli julkaistaan automaattisesti ensi maanantaina klo 9.', delay: 400, sentiment: 30 },
            { role: 'agent', text: 'Hei Laura! Sivuston tietosuoja.fi / Ajankohtaista. Julkaisun ajastus onnistuu näin:<br><br>1. Avaa artikkeli editorissa<br>2. Klikkaa "Julkaise" (sininen painike)<br>3. Klikkaa "Julkaise: Heti"<br>4. Valitse päivämäärä (ma 20.4.2026 klo 09:00)<br>5. Klikkaa "Ajasta"<br><br><a class="chat-action-link" onclick="chatHighlightSite(\'.sim-news-list li:first-child\', \'Tämä artikkeli on ajastettu julkaisu\')">&#128270; Näytä esimerkki julkaisusta</a>', delay: 800, sentiment: 60 },
            { role: 'customer', text: 'Entä jos haluan muokata ajastettua artikkelia jälkikäteen?', delay: 400, sentiment: 65, reaction: '👍 Hyödyllinen' },
            { role: 'agent', text: 'Ajastettu artikkeli näkyy tilassa "Ajastettu". Voit muokata sisältöä normaalisti – ajastus säilyy. Julkaisuaikaa voit vaihtaa samasta kohdasta.<br><br><a class="chat-action-link" onclick="chatHighlightSite(\'.sim-news-list\', \'Artikkelilista – ajastetut näkyvät tässä\')">&#128270; Näytä artikkelilista</a>', delay: 600, sentiment: 80 },
            { role: 'customer', text: 'Selvä, kiitos! Tämä riittää.', delay: 300, sentiment: 92, reaction: '⭐ Selkeät ohjeet' },
            { role: 'agent', text: 'Ole hyvä! Muista myös "Esikatsele"-painike ennen julkaisua. Hyvää päivän jatkoa!', delay: 400, sentiment: 100 },
        ]
    },
    {
        id: 'sim-tiketti-markku',
        label: 'Markku Vaisanen – Tiketti: Haku rikki',
        agencyId: 'ulos',
        page: 'Etusivu',
        messages: [
            { role: 'customer', text: 'Hakutoiminto on rikki. Haen "maksusuunnitelma" ja tuloksena tulee täysin epärelevantteja sivuja, kuten henkilöstöhallinnon sisäisiä sivuja jotka eivät pitäisi näkyä julkisesti.', delay: 400, sentiment: 10 },
            { role: 'agent', text: 'Hei Markku! Tämä on vakava ongelma. Analysoin hakua – hakuindeksi sisältää draft- ja private-sivuja joiden ei pitäisi näkyä julkisessa haussa. Tietoturvaan liittyvä bugi WP_Queryn post_status -suodatuksessa.<br><br><a class="chat-action-link" onclick="chatHighlightSite(\'.sim-site-search\', \'⚠️ Hakutoiminto – tietoturvaongelma\')">&#128270; Näytä hakukenttä sivustolla</a>', delay: 900, sentiment: 30, reaction: '🔍 Analysoitu' },
            { role: 'customer', text: 'Tämä on todella vakava juttu! Sisäisiä dokumentteja ei saa näkyä ulkopuolisille. Korjatkaa heti!', delay: 400, sentiment: 20 },
            { role: 'agent', text: 'Ymmärrän täysin – tämä on kriittinen tietoturvaongelma. Luon tiketin korkeimmalla prioriteetilla.', delay: 400, sentiment: 40 },
            { role: 'system', text: '🚨 Tiketti TIK-027 luotu: "Haku palauttaa draft/private-sisältöä julkisille käyttäjille" (Bugi, Kriittinen)', delay: 300, sentiment: 60 },
            { role: 'agent', text: 'Tiketti TIK-027 luotu kriittisellä prioriteetilla. Suosittelen hakutoiminnon väliaikaista poistamista kunnes korjaus on valmis.<br><br><a class="chat-action-link" onclick="chatHighlightSite(\'.sim-site-search\', \'Suositus: poista käytöstä väliaikaisesti\')">&#128270; Näytä hakukenttä</a>&nbsp;&nbsp;<a class="chat-action-link" onclick="openSimTicket(\'TIK-027\')">&#128196; Avaa tiketti TIK-027</a>', delay: 600, sentiment: 75, reaction: '✅ Tiketti luotu' },
        ]
    },
    {
        id: 'sim-tiketti-elina',
        label: 'Elina Jarvinen – Tiketti: Uusi ominaisuus',
        agencyId: 'tuomio',
        page: 'Päätökset',
        messages: [
            { role: 'customer', text: 'Olisi todella hyödyllistä, jos päätössivulla olisi mahdollisuus tilata sähköposti-ilmoituksia kun tietyn aihealueen uusia päätöksiä julkaistaan.', delay: 400, sentiment: 35 },
            { role: 'agent', text: 'Hei Elina! Kiinnostava ehdotus. Tällä hetkellä sivustolla ei ole ilmoitustoimintoa päätöksille. Toteutus voisi käyttää WordPressin tilaustoimintoa yhdistettynä kategorisointiin.<br><br><a class="chat-action-link" onclick="chatHighlightSite(\'.sim-cards\', \'Päätökset-osio – tähän tulisi tilaustoiminto\')">&#128270; Näytä päätösosio sivustolla</a>', delay: 800, sentiment: 55 },
            { role: 'customer', text: 'Kyllä! Lakimiehet seuraisivat mielellään omien aihealueidensa päätöksiä, esim. "siviilioikeus" tai "hallinto-oikeus" kategorioittain.', delay: 500, sentiment: 60, reaction: '💡 Hyvä tarkennus' },
            { role: 'agent', text: 'Erinomainen tarkennus. Luon kehityspyynnön: kategoriakohtaiset sähköposti-ilmoitukset päätöksistä.', delay: 400, sentiment: 70 },
            { role: 'system', text: '📋 Tiketti TIK-028 luotu: "Sähköposti-ilmoitukset uusista päätöksistä aihealueittain" (Ominaisuus, Keskitaso)', delay: 300, sentiment: 85 },
            { role: 'agent', text: 'Kehityspyyntö TIK-028 luotu. Toteutus sisältää aihealuevalinnan, tilauslomakkeen ja automaattiset ilmoitukset. Kiitos erinomaisesta ehdotuksesta!<br><br><a class="chat-action-link" onclick="openSimTicket(\'TIK-028\')">&#128196; Avaa tiketti TIK-028</a>', delay: 500, sentiment: 95, reaction: '⭐ Loistava idea' },
        ]
    },
];

function initChatSimulations() {
    const sel = $('#chat-sim-select');
    chatSimulations.forEach(sim => {
        const opt = document.createElement('option');
        opt.value = sim.id;
        opt.textContent = sim.label;
        sel.appendChild(opt);
    });
    sel.addEventListener('change', () => {
        if (!sel.value) return;
        const sim = chatSimulations.find(s => s.id === sel.value);
        if (sim) runChatSimulation(sim);
        sel.value = '';
    });
}

function runChatSimulation(sim) {
    // Set context
    const agencySel = $('#chat-agency');
    agencySel.value = sim.agencyId;
    agencySel.dispatchEvent(new Event('change'));
    setTimeout(() => {
        const pageSel = $('#chat-page');
        const opts = [...pageSel.options].map(o => o.value);
        if (opts.includes(sim.page)) pageSel.value = sim.page;
        renderSimWebsite();
    }, 50);

    // Clear chat and activate simulation mode
    chatMessages = [];
    chatStep = 0;
    renderChatMessages();
    clearSimHighlights();
    $('.chat-widget').classList.add('sim-active');
    const satMeter = $('#chat-satisfaction');
    if (satMeter) { satMeter.classList.remove('visible'); }
    updateSatisfaction(0);

    // Play messages with delays
    let totalDelay = 200;
    sim.messages.forEach((msg, i) => {
        totalDelay += msg.delay;

        // Show typing indicator before agent messages
        if (msg.role === 'agent') {
            setTimeout(() => showTypingIndicator(), totalDelay - Math.min(msg.delay, 350));
        }

        setTimeout(() => {
            hideTypingIndicator();
            addChatMessage(msg.role, msg.text, msg.reaction);
            if (msg.sentiment !== undefined) updateSatisfaction(msg.sentiment);
            // Auto-create ticket when system message fires
            if (msg.role === 'system') {
                const ticketMatch = msg.text.match(/TIK-\d+/);
                if (ticketMatch && simTicketData[ticketMatch[0]] && !tickets.find(t => t.id === ticketMatch[0])) {
                    tickets.push(simTicketData[ticketMatch[0]]);
                    renderTicketStats();
                    renderTickets();
                    renderPipeline();
                }
            }
        }, totalDelay);
    });
}

function addChatMessage(role, text, reaction) {
    chatMessages.push({ role, text, reaction, ts: new Date().toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' }) });
    renderChatMessages();
}

function renderChatMessages() {
    const el = $('#chat-messages');
    el.innerHTML = chatMessages.map(m => {
        if (m.role === 'system') {
            return `<div class="chat-msg system"><div class="bubble">${m.text}</div></div>`;
        }
        const senderLabel = m.role === 'agent' ? `<div class="sender">${t('chat_agent_name')}</div>` : '';
        const reactionHtml = m.reaction ? `<div class="chat-reaction">${m.reaction}</div>` : '';
        return `<div class="chat-msg ${m.role}">${senderLabel}<div class="bubble">${m.text}</div>${reactionHtml}<div class="meta">${m.ts}</div></div>`;
    }).join('');
    el.scrollTop = el.scrollHeight;
}

// ---- Typing indicator ----
function showTypingIndicator() {
    hideTypingIndicator();
    const el = $('#chat-messages');
    const indicator = document.createElement('div');
    indicator.id = 'typing-indicator';
    indicator.className = 'chat-msg agent';
    indicator.innerHTML = `<div class="sender">${t('chat_agent_name')}</div><div class="typing-indicator"><span></span><span></span><span></span></div>`;
    el.appendChild(indicator);
    el.scrollTop = el.scrollHeight;
}

function hideTypingIndicator() {
    const el = $('#typing-indicator');
    if (el) el.remove();
}

// ---- Satisfaction meter ----
function updateSatisfaction(value) {
    const fill = $('#satisfaction-fill');
    const label = $('#satisfaction-label');
    const meter = $('#chat-satisfaction');
    if (!fill || !label || !meter) return;
    meter.classList.add('visible');
    fill.style.width = value + '%';
    if (value >= 80) { fill.style.background = '#10b981'; label.textContent = '😊'; }
    else if (value >= 50) { fill.style.background = '#f59e0b'; label.textContent = '🙂'; }
    else if (value > 0) { fill.style.background = '#ef4444'; label.textContent = '😐'; }
    else { fill.style.background = '#e0e0e5'; label.textContent = ''; }
}

// ---- Website highlight interaction ----
function chatHighlightSite(selector, labelText) {
    clearSimHighlights();
    const website = $('#sim-website');
    const target = website.querySelector(selector);
    if (!target) return;

    target.classList.add('sim-highlight');
    target.style.position = 'relative';

    if (labelText) {
        const lbl = document.createElement('div');
        lbl.className = 'sim-highlight-label';
        lbl.textContent = labelText;
        target.appendChild(lbl);
    }

    website.scrollTo({ top: Math.max(0, target.offsetTop - 80), behavior: 'smooth' });

    setTimeout(() => clearSimHighlights(), 5000);
}

function clearSimHighlights() {
    $$('.sim-highlight').forEach(el => {
        el.classList.remove('sim-highlight');
        const lbl = el.querySelector('.sim-highlight-label');
        if (lbl) lbl.remove();
    });
}

function openSimTicket(ticketId) {
    // Ensure the ticket exists in the global array
    if (!tickets.find(t => t.id === ticketId) && simTicketData[ticketId]) {
        tickets.push(simTicketData[ticketId]);
        renderTicketStats();
        renderTickets();
        renderPipeline();
    }
    // Navigate to ticket detail (code review view)
    selectTicket(ticketId);
    showToast(t('toast_ticket_opened').replace('{id}', ticketId), 'success');
}

function sendChat() {
    const input = $('#chat-input');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    // Exit simulation mode on manual input
    $('.chat-widget').classList.remove('sim-active');
    $('#chat-satisfaction').classList.remove('visible');
    clearSimHighlights();
    addChatMessage('customer', text);

    const lower = text.toLowerCase();
    const agency = agencies.find(a => a.id === $('#chat-agency').value);
    const page = $('#chat-page').value;
    const section = $('#chat-section').value || '';

    setTimeout(() => {
        if (chatStep === 3) {
            // User responding to ticket offer
            if (lower.includes('kylla') || lower.includes('kyllä') || lower.includes('joo') || lower.includes('ok') || lower.includes('luohan') || lower.includes('tee') || lower.includes('yes') || lower.includes('create') || lower.includes('sure')) {
                chatStep = 4;
                const newId = 'TIK-' + String(tickets.length + 1).padStart(3, '0');
                addChatMessage('system', t('chat_ticket_created').replace('{id}', newId));
                addChatMessage('agent', t('chat_ticket_details').replace('{id}', newId));
                chatStep = 0;
            } else {
                addChatMessage('agent', t('chat_no_ticket'));
                chatStep = 0;
            }
            return;
        }

        // Detect intent
        const bugWords = ['ei toimi', 'rikki', 'virhe', 'bugi', 'bug', 'ei näy', 'ei lataudu', 'hidas', 'kaatuu', 'error', '404', '500', 'ei löydä', 'ei avaudu', 'ei sulkeudu', 'puuttuu', 'väärin', 'ei lähety'];
        const featureWords = ['lisätä', 'uusi', 'ominaisuus', 'feature', 'kehitys', 'toive', 'haluaisin', 'olisi hyvä', 'pitäisi olla', 'ehdotus', 'parantaa', 'mahdollista'];
        const helpWords = ['apu', 'help', 'ohje', 'miten', 'mita', 'mitä'];
        const ticketWords = ['tiketti', 'ticket', 'luo', 'tee tiketti', 'kirjaa'];

        const isBug = bugWords.some(w => lower.includes(w));
        const isFeature = featureWords.some(w => lower.includes(w));
        const isHelp = helpWords.some(w => lower.includes(w)) && !isBug && !isFeature;

        if (isHelp && chatStep === 0) {
            addChatMessage('agent', chatResponses.help);
        } else if (isBug) {
            chatStep = 3;
            const detail = t('chat_context_detail_bug').replace('{agency}', agency.name).replace('{page}', page).replace('{section}', section ? ' / ' + section : '');
            const tpl = chatResponses.bugConfirm[Math.floor(Math.random() * chatResponses.bugConfirm.length)];
            addChatMessage('agent', tpl.replace('{detail}', detail));
        } else if (isFeature) {
            chatStep = 3;
            const detail = t('chat_context_detail_feature').replace('{agency}', agency.name).replace('{page}', page);
            const tpl = chatResponses.featureConfirm[Math.floor(Math.random() * chatResponses.featureConfirm.length)];
            addChatMessage('agent', tpl.replace('{detail}', detail));
        } else if (ticketWords.some(w => lower.includes(w))) {
            addChatMessage('agent', t('chat_ask_details'));
            chatStep = 1;
        } else if (chatStep === 0 || chatStep === 1) {
            chatStep = 1;
            const clar = chatResponses.clarify[Math.floor(Math.random() * chatResponses.clarify.length)];
            addChatMessage('agent', t('chat_thanks_context').replace('{agency}', agency.name).replace('{page}', page).replace('{clarify}', clar));
        } else {
            const clar = chatResponses.clarify[Math.floor(Math.random() * chatResponses.clarify.length)];
            addChatMessage('agent', clar);
        }
    }, 600 + Math.random() * 400);
}

// ==================== SIMULATED WEBSITE ====================
function renderSimWebsite() {
    const agencyId = $('#chat-agency').value;
    const agency = agencies.find(a => a.id === agencyId);
    const page = $('#chat-page').value || 'Etusivu';
    if (!agency) return;

    const siteData = {
        ork: {
            name: 'Oikeusrekisterikeskus',
            nameEn: 'Legal Register Centre',
            logo: 'ORK',
            heroTitle: 'Oikeusrekisterikeskus',
            heroDesc: 'Oikeusrekisterikeskus on oikeusministerion hallinnonalalla toimiva virasto, joka yllapitaa oikeushallinnon rekistereita ja tietojarjestelmia seka tuottaa tietoja ja palveluja.',
            navItems: ['Etusivu', 'Rekisterit', 'Palvelut', 'Ajankohtaista', 'Lomakkeet', 'Yhteystiedot'],
            cards: [
                { title: 'Rikosrekisteriote', desc: 'Tilaa rikosrekisteriote sahkoisesti tai lomakkeella. Ote tarvitaan esimerkiksi tyoskenneltaessa lasten parissa.' },
                { title: 'Kaupparekisteri', desc: 'Hae tietoja kaupparekisterista tai ilmoita muutoksista yrityksesi tietoihin.' },
                { title: 'Lainhuutorekisteri', desc: 'Kiinteiston omistajatiedot ja lainhuudot. Tarkista kiinteiston omistussuhteet.' },
                { title: 'Sahkoiset palvelut', desc: 'Asioi sahkoisesti. Laheta hakemuksia ja seuraa kasittelya verkossa.' },
            ],
            news: [
                { date: '15.4.2026', title: 'Rikosrekisteriotteen tilaaminen uudistuu', desc: 'Sahkoinen tilauspalvelu paivittyy 1.5.2026.' },
                { date: '10.4.2026', title: 'Huoltokatko sahkoisissa palveluissa 20.4.', desc: 'Sahkoiset palvelut eivat ole kaytossa klo 18-22.' },
                { date: '3.4.2026', title: 'Verkkosivusto uudistunut', desc: 'Sivustomme on uudistettu. Tervetuloa tutustumaan!' },
            ],
        },
        tuomio: {
            name: 'Tuomioistuinvirasto',
            nameEn: 'National Courts Administration',
            logo: 'TIV',
            heroTitle: 'Tuomioistuinvirasto',
            heroDesc: 'Tuomioistuinvirasto on tuomioistuinlaitoksen keskushallintovirasto, joka palvelee tuomioistuimia niiden toimintaedellytysten turvaamisessa.',
            navItems: ['Etusivu', 'Tuomioistuimet', 'Paatokset', 'Ajankohtaista', 'Rekrytointi', 'Yhteystiedot'],
            cards: [
                { title: 'Tuomioistuinhaku', desc: 'Etsi lahin tuomioistuin tai hae tietoja oikeudenkaynnista.' },
                { title: 'Istuntokalenteri', desc: 'Selaa tuomioistuinten julkisia istuntoaikoja.' },
                { title: 'Paatokset', desc: 'Lue tuomioistuinten antamia ratkaisuja ja paatoksia.' },
                { title: 'Tyoskentely tuomioistuimissa', desc: 'Avoimet tyopaikat ja tietoa urasta oikeushallinnossa.' },
            ],
            news: [
                { date: '14.4.2026', title: 'Karajaoikeuksien ruuhkatilanne helpottanut', desc: 'Kasittelyajat lyhentyneet keskimaarin 15%.' },
                { date: '8.4.2026', title: 'Sahkoinen asiointi laajenee', desc: 'Uusia asiointitapoja karajaoikeuksiin.' },
                { date: '1.4.2026', title: 'Tuomioistuinviraston vuosikertomus 2025', desc: 'Vuosikertomuksemme on nyt luettavissa.' },
            ],
        },
        rikos: {
            name: 'Rikosseuraamuslaitos',
            nameEn: 'Criminal Sanctions Agency',
            logo: 'RISE',
            heroTitle: 'Rikosseuraamuslaitos',
            heroDesc: 'Rikosseuraamuslaitos vastaa tuomioistuinten maaramien yhdyskuntaseuraamusten ja vankeusrangaistusten taytantoonpanosta.',
            navItems: ['Etusivu', 'Seuraamukset', 'Vankilat', 'Ajankohtaista', 'Tilastot', 'Yhteystiedot'],
            cards: [
                { title: 'Vankilat ja yhdyskuntaseuraamustoimistot', desc: 'Tietoa Suomen vankiloista ja yhdyskuntaseuraamustoimistoista.' },
                { title: 'Vierailut', desc: 'Ohjeet vankilan vierailuaikojen varaamiseen ja vierailukaytantoihin.' },
                { title: 'Tilastot', desc: 'Rikosseuraamuslaitoksen tilastotietoja vankiluvuista ja seuraamuksista.' },
                { title: 'Tutkimus', desc: 'Rikosseuraamusalan tutkimustietoa ja julkaisuja.' },
            ],
            news: [
                { date: '12.4.2026', title: 'Avovankilatoiminnan laajentaminen', desc: 'Uusia avovankilapaikkoja avattu Ita-Suomeen.' },
                { date: '5.4.2026', title: 'Sahkoinen ajanvaraus vierailuihin', desc: 'Vierailuajat voi nyt varata verkossa.' },
                { date: '28.3.2026', title: 'Henkilostotutkimuksen tulokset', desc: 'Tyotyytyaisyys parantunut merkittavasti.' },
            ],
        },
        ulos: {
            name: 'Ulosottolaitos',
            nameEn: 'National Enforcement Authority',
            logo: 'ULOS',
            heroTitle: 'Ulosottolaitos',
            heroDesc: 'Ulosottolaitos huolehtii tuomioistuinten paatoksilla vahvistettujen saatavien perinnasta seka muista taytantoonpanotehtavista.',
            navItems: ['Etusivu', 'Palvelut', 'Ulosottohakemus', 'Maksaminen', 'UKK', 'Yhteystiedot'],
            cards: [
                { title: 'Ulosottohakemus', desc: 'Tee ulosottohakemus sahkoisesti tai ladata hakulomake.' },
                { title: 'Maksajan opas', desc: 'Ohjeita velalliselle ulosoton maksujarjestelyista ja maksusuunnitelmasta.' },
                { title: 'Velkajan opas', desc: 'Tietoa velkojalle saatavan perinnasta ulosoton kautta.' },
                { title: 'Ulosottovelan tarkistus', desc: 'Tarkista ulosottovelkasi tilanne sahkoisesti.' },
            ],
            news: [
                { date: '11.4.2026', title: 'Maksuehtojen joustot kayttoon', desc: 'Uudet joustavammat maksuaikataulut velallisille.' },
                { date: '4.4.2026', title: 'Sahkoinen asiointi paivittyy', desc: 'Sahkoisen asioinnin uusi versio otetaan kayttoon.' },
                { date: '25.3.2026', title: 'Tilastokatsaus Q1/2026', desc: 'Ulosottoasioiden maara laskenut 8%.' },
            ],
        },
        tietosuoja: {
            name: 'Tietosuojavaltuutetun toimisto',
            nameEn: 'Office of the Data Protection Ombudsman',
            logo: 'TSV',
            heroTitle: 'Tietosuojavaltuutetun toimisto',
            heroDesc: 'Tietosuojavaltuutetun toimisto valvoo henkilotietojen kasittelyn lainmukaisuutta ja ihmisten tietosuojaoikeuksien toteutumista.',
            navItems: ['Etusivu', 'Paatokset', 'Ohjeet', 'Ilmoitukset', 'UKK', 'Yhteystiedot'],
            cards: [
                { title: 'Tee ilmoitus tietoturvaloukkauksesta', desc: 'Rekisterinpitajan velvollisuus ilmoittaa henkilotietojen tietoturvaloukkauksesta.' },
                { title: 'Tarkastuspyynto', desc: 'Joka henkilolla on oikeus tarkistaa, mita tietoja hanesta on tallennettu.' },
                { title: 'Ohjeet rekisterinpitajille', desc: 'GDPR-vaatimukset ja ohjeet henkilotietojen kasittelyyn.' },
                { title: 'Paatokset ja kannanotot', desc: 'Tietosuojavaltuutetun antamat paatokset ja kannanotot.' },
            ],
            news: [
                { date: '13.4.2026', title: 'Seuraamusmaksupaatos tietojen kasittelysta', desc: '50 000 euron seuraamusmaksu GDPR-rikkomuksesta.' },
                { date: '7.4.2026', title: 'Uusi ohje evastekaytannoista', desc: 'Paivitetty ohjeistus evastebannereiden toteutukseen.' },
                { date: '30.3.2026', title: 'Euroopan tietosuojaneuvoston linjaus', desc: 'Uusi linjaus tekoalyn kayttoon henkilotietojen kasittelyssa.' },
            ],
        },
    };

    const site = siteData[agencyId] || siteData.ork;
    const el = $('#sim-website');

    el.innerHTML = `
        <div class="sim-site-banner">
            <a href="#">Suomeksi</a>
            <a href="#">På svenska</a>
            <a href="#">In English</a>
        </div>
        <div class="sim-site-header">
            <div class="sim-site-logo">
                <div class="logo-icon">${site.logo}</div>
                <div>
                    <div class="logo-text">${site.name}</div>
                    <div class="logo-sub">${site.nameEn}</div>
                </div>
            </div>
            <nav class="sim-site-nav">
                ${site.navItems.map(n => `<a href="#" class="${n === page ? 'active' : ''}">${n}</a>`).join('')}
            </nav>
        </div>
        <div class="sim-site-search">
            <input type="text" placeholder="${t('sim_search_placeholder')}">
            <button>${t('sim_search_button')}</button>
        </div>
        <div class="sim-hero">
            <h1>${page === 'Etusivu' ? site.heroTitle : page}</h1>
            <p>${page === 'Etusivu' ? site.heroDesc : t('sim_on_page').replace('{name}', site.name).replace('{page}', page)}</p>
        </div>
        <div class="sim-content">
            ${page === 'Etusivu' || page === 'Palvelut' || page === 'Rekisterit' ? `
                <h2>${page === 'Etusivu' ? t('sim_services') : page}</h2>
                <div class="sim-cards">
                    ${site.cards.map(c => `
                        <div class="sim-card">
                            <h3>${c.title}</h3>
                            <p>${c.desc}</p>
                            <a href="#" class="sim-link">${t('sim_read_more')}</a>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            <h2>${t('sim_news')}</h2>
            <ul class="sim-news-list">
                ${site.news.map(n => `
                    <li>
                        <div class="news-date">${n.date}</div>
                        <div class="news-title">${n.title}</div>
                        <div class="news-desc">${n.desc}</div>
                    </li>
                `).join('')}
            </ul>
            <h2>${t('sim_contacts')}</h2>
            <div class="sim-cards">
                <div class="sim-card">
                    <h3>${t('sim_customer_service')}</h3>
                    <p>${t('sim_customer_service_hours')}<br>Puh. 029 566 XXXX</p>
                </div>
                <div class="sim-card">
                    <h3>${t('sim_visit_address')}</h3>
                    <p>Lintulahdenkuja 4, Helsinki<br>PL 157, 00024 Oikeusministerio</p>
                </div>
            </div>
        </div>
        <div class="sim-footer">
            <div style="max-width:800px;margin:0 auto">
                &copy; ${site.name} ${new Date().getFullYear()} &middot;
                <a href="#">${t('sim_accessibility')}</a> &middot;
                <a href="#">${t('sim_privacy')}</a> &middot;
                <a href="#">${t('sim_cookies')}</a><br>
                <span style="opacity:0.5">${t('sim_government')}</span>
            </div>
        </div>
    `;
}

// ==================== TICKETS ====================
function initTickets() {
    const agencyFilter = $('#ticket-filter-agency');
    agencies.forEach(a => agencyFilter.innerHTML += `<option value="${a.id}">${a.name}</option>`);

    renderTicketStats();
    renderTickets();

    $('#ticket-search').addEventListener('input', renderTickets);
    $('#ticket-filter-status').addEventListener('change', renderTickets);
    $('#ticket-filter-type').addEventListener('change', renderTickets);
    $('#ticket-filter-agency').addEventListener('change', renderTickets);
}

function renderTicketStats() {
    const el = $('#ticket-stats');
    const counts = { total: tickets.length, bug: 0, feature: 0, new: 0, review: 0 };
    tickets.forEach(tk => {
        if (tk.type === 'bug') counts.bug++;
        else counts.feature++;
        if (tk.status === 'new') counts.new++;
        if (tk.status === 'review') counts.review++;
    });
    el.innerHTML = `
        <div class="stat-card"><div class="stat-num">${counts.total}</div><div class="stat-label">${t('stat_total')}</div></div>
        <div class="stat-card"><div class="stat-num" style="color:#dc2626">${counts.bug}</div><div class="stat-label">${t('stat_bugs')}</div></div>
        <div class="stat-card"><div class="stat-num" style="color:#2563eb">${counts.feature}</div><div class="stat-label">${t('stat_features')}</div></div>
        <div class="stat-card"><div class="stat-num" style="color:#6366f1">${counts.new}</div><div class="stat-label">${t('stat_new')}</div></div>
        <div class="stat-card"><div class="stat-num" style="color:#3b82f6">${counts.review}</div><div class="stat-label">${t('stat_in_review')}</div></div>
    `;
}

function renderTickets() {
    const search = ($('#ticket-search').value || '').toLowerCase();
    const statusF = $('#ticket-filter-status').value;
    const typeF = $('#ticket-filter-type').value;
    const agencyF = $('#ticket-filter-agency').value;

    const filtered = tickets.filter(tk => {
        if (statusF && tk.status !== statusF) return false;
        if (typeF && tk.type !== typeF) return false;
        if (agencyF && tk.agencyId !== agencyF) return false;
        if (search && !tk.title.toLowerCase().includes(search) && !tk.id.toLowerCase().includes(search)) return false;
        return true;
    });

    const el = $('#ticket-list');
    if (!filtered.length) {
        el.innerHTML = `<div class="no-results" style="padding:40px;text-align:center;color:#aaa">${t('no_tickets')}</div>`;
        return;
    }
    const statusLabels = { new: t('status_new'), in_progress: t('status_in_progress'), review: t('status_review'), approved: t('status_approved'), deployed: t('status_deployed') };
    el.innerHTML = filtered.map(tk => {
        const agency = agencies.find(a => a.id === tk.agencyId);
        return `
        <div class="ticket-card ${tk.type}" data-id="${tk.id}" onclick="selectTicket('${tk.id}')">
            <span class="ticket-id">${tk.id}</span>
            <div class="ticket-info">
                <div class="ticket-title">${tk.title}</div>
                <div class="ticket-meta">
                    <span class="badge badge-${tk.type}">${tk.type === 'bug' ? t('type_bug') : t('type_feature')}</span>
                    <span class="badge badge-${tk.priority}">${tk.priority}</span>
                    <span>${agency ? agency.name : ''}</span>
                    <span>${tk.page}</span>
                    <span>${tk.createdAt}</span>
                </div>
            </div>
            <span class="status-badge status-${tk.status}">${statusLabels[tk.status] || tk.status}</span>
        </div>`;
    }).join('');
}

function selectTicket(id) {
    selectedTicketId = id;
    // Switch to code view
    $$('.tab').forEach(t => t.classList.remove('active'));
    $$('.view').forEach(v => v.classList.remove('active'));
    $$('.tab')[2].classList.add('active');
    $('#code-view').classList.add('active');
    renderCodeSidebar();
    renderCodeMain(id);
}

// ==================== CODE REVIEW ====================
function initCodeReview() {
    renderCodeSidebar();
}

function renderCodeSidebar() {
    const reviewable = tickets.filter(tk => ['review', 'in_progress', 'new'].includes(tk.status));
    const el = $('#code-sidebar-list');
    el.innerHTML = reviewable.map(tk => {
        const agency = agencies.find(a => a.id === tk.agencyId);
        return `
        <div class="code-sidebar-item ${selectedTicketId === tk.id ? 'active' : ''}" onclick="renderCodeMain('${tk.id}')">
            <div class="csi-id">${tk.id} &middot; <span class="badge badge-${tk.type}" style="font-size:0.6rem">${tk.type === 'bug' ? 'BUG' : 'FEAT'}</span></div>
            <div class="csi-title">${tk.title}</div>
            <div class="csi-meta">${agency ? agency.abbr : ''} &middot; ${tk.page}</div>
        </div>`;
    }).join('');
}

function renderCodeMain(id) {
    selectedTicketId = id;
    const tk = tickets.find(x => x.id === id);
    if (!tk) return;
    renderCodeSidebar();

    const agency = agencies.find(a => a.id === tk.agencyId);
    const el = $('#code-main');

    let diffHtml = '';
    tk.diff.files.forEach(file => {
        const badgeClass = file.type;
        const badgeLabel = file.type === 'modified' ? 'M' : file.type === 'added' ? 'A' : 'D';
        let linesHtml = '';
        file.hunks.forEach(hunk => {
            linesHtml += `<div class="diff-hunk-header">${hunk.header}</div>`;
            hunk.lines.forEach(line => {
                const cls = line.type === 'add' ? 'add' : line.type === 'remove' ? 'remove' : 'context';
                linesHtml += `<div class="diff-line ${cls}">${escHtml(line.content)}</div>`;
            });
        });
        diffHtml += `
        <div class="diff-file">
            <div class="diff-file-header">
                <span class="file-badge ${badgeClass}">${badgeLabel}</span>
                ${file.path}
            </div>
            ${linesHtml}
        </div>`;
    });

    const statusLabels = { new: t('status_new'), in_progress: t('status_in_progress'), review: t('status_review'), approved: t('status_approved'), deployed: t('status_deployed') };
    const canApprove = ['review', 'in_progress', 'new'].includes(tk.status);
    const filesCount = tk.diff.files.length;
    const filesChangedLabel = filesCount > 1 ? t('files_changed_plural') : t('files_changed_singular');

    el.innerHTML = `
        <div class="pr-header">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px">
                <div>
                    <div class="pr-title">${tk.diff.summary}</div>
                    <div style="margin:6px 0"><span class="pr-branch">${tk.diff.branch}</span> &rarr; <span class="pr-branch">main</span></div>
                </div>
                <span class="status-badge status-${tk.status}">${statusLabels[tk.status] || tk.status}</span>
            </div>
            <div class="pr-summary">
                <strong>${tk.id}</strong> &middot; ${tk.title}<br>
                ${agency ? agency.name : ''} &middot; ${tk.page} / ${tk.section}<br>
                ${t('reporter')}: ${tk.customerName} (${tk.customerRole})
            </div>
            <div class="pr-actions">
                ${canApprove ? `
                    <button class="btn-approve" onclick="approveTicket('${tk.id}')">${t('btn_approve')}</button>
                    <button class="btn-reject" onclick="rejectTicket('${tk.id}')">${t('btn_reject')}</button>
                ` : ''}
                <button class="btn-conversation" onclick="showConversation('${tk.id}')">${t('btn_show_conversation')}</button>
            </div>
        </div>
        <div style="font-size:0.82rem;color:#666;margin-bottom:10px">${filesCount} ${filesChangedLabel}</div>
        ${diffHtml}
    `;
}

function escHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function approveTicket(id) {
    const tk = tickets.find(x => x.id === id);
    if (!tk) return;
    tk.status = 'approved';
    showToast(`${id} ${t('toast_approved')}`, 'success');
    renderCodeMain(id);
    renderCodeSidebar();
}

function rejectTicket(id) {
    const tk = tickets.find(x => x.id === id);
    if (!tk) return;
    tk.status = 'in_progress';
    showToast(`${id} ${t('toast_rejected')}`, 'error');
    renderCodeMain(id);
    renderCodeSidebar();
}

function showConversation(id) {
    const tk = tickets.find(x => x.id === id);
    if (!tk) return;
    const convHtml = tk.conversation.map(m => `
        <div class="chat-msg ${m.role}" style="margin-bottom:10px">
            ${m.role === 'agent' ? `<div class="sender">${t('chat_agent_name')}</div>` : `<div class="sender" style="color:#666">${tk.customerName}</div>`}
            <div class="bubble">${m.text}</div>
            <div class="meta">${m.ts}</div>
        </div>
    `).join('');
    showModal(`<h3>${t('conversation_title')} \u2013 ${tk.id}</h3><div style="max-height:50vh;overflow-y:auto">${convHtml}</div>`);
}

// ==================== PIPELINE ====================
function initPipeline() {
    renderPipeline();
}

function getPipelineStageLabel(stageId) {
    const labels = { new: t('status_new'), in_progress: t('status_in_progress'), review: t('status_review'), approved: t('status_approved'), deployed: t('status_deployed') };
    return labels[stageId] || stageId;
}

function renderPipeline() {
    const el = $('#pipeline-container');
    el.innerHTML = pipelineStages.map(stage => {
        const stageLabel = getPipelineStageLabel(stage.id);
        const stageTickets = tickets.filter(tk => tk.status === stage.id);
        return `
        <div class="pipeline-column">
            <div class="pipeline-col-header" style="border-top:3px solid ${stage.color}">
                <span>${stage.icon} ${stageLabel}</span>
                <span class="count">${stageTickets.length}</span>
            </div>
            <div class="pipeline-col-body">
                ${stageTickets.map(tk => {
                    const agency = agencies.find(a => a.id === tk.agencyId);
                    return `
                    <div class="pipeline-card" onclick="selectTicket('${tk.id}')">
                        <div class="pc-id">${tk.id} &middot; <span class="badge badge-${tk.type}" style="font-size:0.6rem">${tk.type === 'bug' ? 'BUG' : 'FEAT'}</span></div>
                        <div class="pc-title">${tk.title}</div>
                        <div class="pc-agency">${agency ? agency.abbr : ''} &middot; ${tk.page}</div>
                    </div>`;
                }).join('')}
                ${stageTickets.length === 0 ? `<div style="text-align:center;color:#ccc;font-size:0.8rem;padding:20px">${t('no_tickets_in_stage')}</div>` : ''}
            </div>
        </div>`;
    }).join('');
}

// ==================== AUDIT ====================
function initAudit() {
    $('#btn-load-demo-audit').addEventListener('click', () => {
        auditLoaded = true;
        $('#btn-load-demo-audit').textContent = t('audit_demo_loaded');
        $('#btn-load-demo-audit').style.background = '#10b981';
        $('#btn-analyze-audit').style.display = 'inline-block';
        showToast(t('audit_toast_loaded'), 'success');
    });

    $('#btn-analyze-audit').addEventListener('click', () => {
        $('#btn-analyze-audit').textContent = t('audit_analyzing');
        $('#btn-analyze-audit').disabled = true;
        setTimeout(() => {
            renderAuditReport();
            $('#btn-analyze-audit').textContent = t('audit_analysis_done');
            $('#btn-analyze-audit').style.background = '#10b981';
            showToast(t('audit_toast_analyzed'), 'success');
        }, 1500);
    });
}

function renderAuditReport() {
    const r = auditReport;
    const el = $('#audit-content');

    // Summary section
    let summaryHtml = `
        <div class="audit-report">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:16px">
                <div>
                    <h3>${r.title}</h3>
                    <div style="font-size:0.82rem;color:#666">
                        ${t('audit_auditor')}: ${r.auditor} &middot; ${t('audit_date')}: ${r.date}<br>
                        ${t('audit_standard')}: ${r.standard}<br>
                        ${t('audit_scope')}: ${r.scope}
                    </div>
                </div>
                <button class="btn-export-pdf" onclick="exportAuditPdf()">${t('audit_export_pdf')}</button>
            </div>
            <div class="audit-summary-grid">
                <div class="audit-stat" onclick="filterAuditFindings('all')" id="audit-stat-all">
                    <div class="as-num">${r.summary.totalFindings}</div>
                    <div class="as-label">${t('audit_total_findings')}</div>
                </div>
                <div class="audit-stat" onclick="filterAuditFindings('critical')" id="audit-stat-critical">
                    <div class="as-num" style="color:#dc2626">${r.summary.critical}</div>
                    <div class="as-label">${t('audit_critical')}</div>
                </div>
                <div class="audit-stat" onclick="filterAuditFindings('major')" id="audit-stat-major">
                    <div class="as-num" style="color:#f59e0b">${r.summary.major}</div>
                    <div class="as-label">${t('audit_major')}</div>
                </div>
                <div class="audit-stat" onclick="filterAuditFindings('minor')" id="audit-stat-minor">
                    <div class="as-num" style="color:#3b82f6">${r.summary.minor}</div>
                    <div class="as-label">${t('audit_minor')}</div>
                </div>
                <div class="audit-stat" onclick="filterAuditFindings('info')" id="audit-stat-info">
                    <div class="as-num" style="color:#10b981">${r.summary.info}</div>
                    <div class="as-label">${t('audit_recommendations')}</div>
                </div>
                <div class="audit-stat">
                    <div class="as-num" style="color:#7c3aed">${r.summary.overallScore}/100</div>
                    <div class="as-label">${t('audit_overall_score')}</div>
                </div>
            </div>
            <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:0.78rem;color:#888">
                <span>${t('audit_tested_pages')}: ${r.summary.testedPages}</span>
                <span>${t('audit_automated')}: ${r.summary.automatedTests}</span>
                <span>${t('audit_manual')}: ${r.summary.manualTests}</span>
            </div>
        </div>
    `;

    // WCAG Category breakdown
    let categoriesHtml = `
        <div class="audit-report">
            <h3>${t('audit_categories_title')}</h3>
            ${r.categories.map(c => `
                <div class="chart-bar-group">
                    <div class="chart-bar-label"><span>${c.name}</span><span>${c.count} ${t('audit_findings_count')}</span></div>
                    <div class="chart-bar-track" onclick="filterAuditByCategory('${c.id}')">
                        <div class="chart-bar-fill" style="width:${(c.count / r.summary.totalFindings * 100)}%;background:${c.color}">${c.count}</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    // Findings list
    let findingsHtml = `
        <div class="audit-report" id="audit-findings-section">
            <h3 id="audit-findings-title">${t('audit_all_findings')} (${r.findings.length})</h3>
            <div id="audit-findings-list">
                ${renderAuditFindings(r.findings)}
            </div>
        </div>
    `;

    // Roadmap
    let roadmapHtml = `
        <div class="audit-report roadmap-container">
            <h3>${t('audit_roadmap_title')}</h3>
            <div class="roadmap-timeline">
                ${r.roadmap.map(phase => {
                    const items = phase.items.map(fid => r.findings.find(f => f.id === fid)).filter(Boolean);
                    return `
                    <div class="roadmap-phase phase-${phase.phase}">
                        <div class="rp-header">${t('audit_phase')} ${phase.phase}: ${phase.label}</div>
                        <div class="rp-date">${phase.timeline}</div>
                        <div style="font-size:0.78rem;color:#666;margin-bottom:6px">${phase.description}</div>
                        <ul class="rp-items">
                            ${items.map(f => `
                                <li class="rp-item" onclick="scrollToFinding('${f.id}')">
                                    <span class="rp-ticket-id">${f.id}</span>
                                    <span class="af-severity sev-${f.severity}" style="font-size:0.6rem">${f.severity}</span>
                                    ${f.title}
                                    ${f.relatedTicket ? `<span class="badge badge-feature" style="margin-left:auto;font-size:0.6rem">${f.relatedTicket}</span>` : ''}
                                </li>
                            `).join('')}
                        </ul>
                    </div>`;
                }).join('')}
            </div>
        </div>
    `;

    el.innerHTML = summaryHtml + categoriesHtml + findingsHtml + roadmapHtml;
}

function renderAuditFindings(findingsList) {
    return findingsList.map(f => {
        const relatedHtml = f.relatedTicket
            ? `<div style="margin-top:6px;font-size:0.75rem">${t('audit_related_ticket')}: <strong style="cursor:pointer;color:#2563eb" onclick="event.stopPropagation();selectTicket('${f.relatedTicket}')">${f.relatedTicket}</strong></div>`
            : '';
        const affectedNames = f.affected.map(aid => { const a = agencies.find(x => x.id === aid); return a ? a.abbr : aid; }).join(', ');
        const backlogCreated = auditBacklogCreated.has(f.id);
        const effortLabels = { 'S': t('effort_S'), 'M': t('effort_M'), 'L': t('effort_L'), 'XL': t('effort_XL') };
        return `
        <div class="audit-finding ${f.severity}" id="finding-${f.id}" onclick="toggleFindingDetail('${f.id}')">
            <div class="af-header">
                <span class="af-title">${f.id}: ${f.title}</span>
                <span class="af-severity sev-${f.severity}">${f.severity}</span>
            </div>
            <div class="af-desc">${f.description}</div>
            <div class="af-wcag">${f.wcag} &middot; ${t('audit_affects')}: ${affectedNames} &middot; ${t('audit_pages')}: ${f.pages.join(', ')} &middot; ${t('audit_effort')}: ${f.effort}</div>
            ${relatedHtml}
            <div class="af-detail" id="detail-${f.id}">
                <strong>${t('audit_recommendation_label')}</strong> ${f.recommendation}<br><br>
                <strong>${t('audit_affected_sites')}</strong> ${f.affected.map(aid => { const a = agencies.find(x => x.id === aid); return a ? a.name : aid; }).join(', ')}<br>
                <strong>${t('audit_effort_estimate')}</strong> ${effortLabels[f.effort] || f.effort}<br>
                ${!backlogCreated ? `<button class="af-backlog-btn" onclick="event.stopPropagation();createBacklogFromFinding('${f.id}')">${t('audit_create_backlog')}</button>` : `<button class="af-backlog-btn created" disabled>${t('audit_backlog_created')}</button>`}
            </div>
        </div>`;
    }).join('');
}

function toggleFindingDetail(id) {
    const detail = $(`#detail-${id}`);
    if (detail) detail.classList.toggle('visible');
}

function filterAuditFindings(severity) {
    $$('.audit-stat').forEach(s => s.classList.remove('active'));
    const statEl = $(`#audit-stat-${severity}`);
    if (statEl) statEl.classList.add('active');

    const filtered = severity === 'all'
        ? auditReport.findings
        : auditReport.findings.filter(f => f.severity === severity);

    const titleEl = $('#audit-findings-title');
    const listEl = $('#audit-findings-list');
    if (titleEl) titleEl.textContent = `${severity === 'all' ? t('audit_all') : severity} ${t('audit_findings_count')} (${filtered.length})`;
    if (listEl) listEl.innerHTML = renderAuditFindings(filtered);
}

function filterAuditByCategory(catId) {
    const filtered = auditReport.findings.filter(f => f.category === catId);
    const cat = auditReport.categories.find(c => c.id === catId);
    const titleEl = $('#audit-findings-title');
    const listEl = $('#audit-findings-list');
    if (titleEl) titleEl.textContent = `${cat ? cat.name : catId} (${filtered.length})`;
    if (listEl) listEl.innerHTML = renderAuditFindings(filtered);
    const section = $('#audit-findings-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
}

function scrollToFinding(id) {
    const el = $(`#finding-${id}`);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.3)';
        setTimeout(() => el.style.boxShadow = '', 2000);
        toggleFindingDetail(id);
    }
}

function createBacklogFromFinding(findingId) {
    auditBacklogCreated.add(findingId);
    const f = auditReport.findings.find(x => x.id === findingId);
    if (!f) return;
    showToast(`${t('audit_toast_backlog')} ${findingId}`, 'success');
    // Re-render the finding
    const el = $(`#finding-${findingId}`);
    if (el) {
        const btn = el.querySelector('.af-backlog-btn');
        if (btn) { btn.textContent = t('audit_backlog_created'); btn.classList.add('created'); btn.disabled = true; }
    }
}

function exportAuditPdf() {
    // Generate a printable version
    const r = auditReport;
    const win = window.open('', '_blank');
    const styles = `
        body { font-family: -apple-system, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; color: #333; }
        h1 { font-size: 1.5rem; border-bottom: 2px solid #1a1a2e; padding-bottom: 8px; }
        h2 { font-size: 1.1rem; margin-top: 24px; color: #1a1a2e; }
        .meta { font-size: 0.85rem; color: #666; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 0.85rem; }
        th, td { padding: 6px 10px; border: 1px solid #ddd; text-align: left; }
        th { background: #f5f5f7; font-weight: 600; }
        .sev { display: inline-block; padding: 1px 6px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; }
        .sev-critical { background: #fef2f2; color: #dc2626; }
        .sev-major { background: #fffbeb; color: #d97706; }
        .sev-minor { background: #eff6ff; color: #3b82f6; }
        .sev-info { background: #ecfdf5; color: #10b981; }
        .roadmap { margin-top: 16px; }
        .phase { margin-bottom: 12px; padding: 10px; border-left: 4px solid #ccc; }
        @media print { body { padding: 20px; } }
    `;
    let findingsTable = r.findings.map(f => `
        <tr>
            <td>${f.id}</td>
            <td><span class="sev sev-${f.severity}">${f.severity}</span></td>
            <td>${f.title}</td>
            <td>${f.wcag}</td>
            <td>${f.effort}</td>
            <td>${f.relatedTicket || '-'}</td>
        </tr>
    `).join('');

    let roadmapHtml = r.roadmap.map(p => `
        <div class="phase" style="border-color:${p.color}">
            <strong>${t('audit_phase')} ${p.phase}: ${p.label}</strong> (${p.timeline})<br>
            ${p.description}<br>
            <em>${t('pdf_contains')}: ${p.items.join(', ')}</em>
        </div>
    `).join('');

    win.document.write(`<!DOCTYPE html><html lang="${currentLang}"><head><title>${r.title}</title><style>${styles}</style></head><body>
        <h1>${r.title}</h1>
        <div class="meta">
            <strong>${t('audit_auditor')}:</strong> ${r.auditor} | <strong>${t('audit_date')}:</strong> ${r.date}<br>
            <strong>${t('audit_standard')}:</strong> ${r.standard}<br>
            <strong>${t('audit_scope')}:</strong> ${r.scope}
        </div>
        <h2>${t('pdf_summary')}</h2>
        <table>
            <tr><th>${t('audit_total_findings')}</th><th>${t('audit_critical')}</th><th>${t('audit_major')}</th><th>${t('audit_minor')}</th><th>${t('audit_recommendations')}</th><th>${t('audit_overall_score')}</th></tr>
            <tr><td>${r.summary.totalFindings}</td><td>${r.summary.critical}</td><td>${r.summary.major}</td><td>${r.summary.minor}</td><td>${r.summary.info}</td><td>${r.summary.overallScore}/100</td></tr>
        </table>
        <h2>${t('pdf_findings')}</h2>
        <table>
            <tr><th>${t('pdf_col_id')}</th><th>${t('pdf_col_severity')}</th><th>${t('pdf_col_finding')}</th><th>${t('pdf_col_wcag')}</th><th>${t('pdf_col_effort')}</th><th>${t('pdf_col_ticket')}</th></tr>
            ${findingsTable}
        </table>
        <h2>${t('pdf_roadmap')}</h2>
        <div class="roadmap">${roadmapHtml}</div>
        <hr style="margin-top:30px">
        <p style="font-size:0.75rem;color:#999">${t('pdf_generated')} ${new Date().toLocaleDateString(currentLang === 'fi' ? 'fi-FI' : 'en-GB')}</p>
    </body></html>`);
    win.document.close();
    setTimeout(() => win.print(), 500);
}

// ==================== ANALYTICS ====================
function initAnalytics() {
    renderAnalytics();
    $('#drilldown-close').addEventListener('click', () => {
        $('#drilldown-panel').classList.remove('visible');
    });
}

function renderAnalytics() {
    const grid = $('#analytics-grid');

    // 1) Tickets by agency
    const byAgency = {};
    agencies.forEach(a => byAgency[a.id] = { agency: a, count: 0, bugs: 0, features: 0, tickets: [] });
    tickets.forEach(tk => {
        if (byAgency[tk.agencyId]) {
            byAgency[tk.agencyId].count++;
            byAgency[tk.agencyId].tickets.push(tk);
            if (tk.type === 'bug') byAgency[tk.agencyId].bugs++;
            else byAgency[tk.agencyId].features++;
        }
    });
    const maxByAgency = Math.max(...Object.values(byAgency).map(v => v.count));

    // 2) Tickets by status (donut)
    const byStatus = {};
    pipelineStages.forEach(s => byStatus[s.id] = { stage: s, count: 0, tickets: [] });
    tickets.forEach(tk => {
        if (byStatus[tk.status]) { byStatus[tk.status].count++; byStatus[tk.status].tickets.push(tk); }
    });

    // 3) Tickets by type
    const bugCount = tickets.filter(tk => tk.type === 'bug').length;
    const featCount = tickets.filter(tk => tk.type === 'feature').length;

    // 4) Tickets by priority
    const byPriority = { high: [], medium: [], low: [] };
    tickets.forEach(tk => { if (byPriority[tk.priority]) byPriority[tk.priority].push(tk); });

    // 5) Timeline (by creation date)
    const byWeek = {};
    tickets.forEach(tk => {
        const week = tk.createdAt.substring(0, 7) + '-W' + Math.ceil(parseInt(tk.createdAt.substring(8, 10)) / 7);
        if (!byWeek[week]) byWeek[week] = [];
        byWeek[week].push(tk);
    });

    // 6) Audit findings by agency
    const auditByAgency = {};
    if (auditLoaded) {
        agencies.forEach(a => auditByAgency[a.id] = { agency: a, count: 0, findings: [] });
        auditReport.findings.forEach(f => {
            f.affected.forEach(aid => {
                if (auditByAgency[aid]) { auditByAgency[aid].count++; auditByAgency[aid].findings.push(f); }
            });
        });
    }
    const maxAuditByAgency = auditLoaded ? Math.max(...Object.values(auditByAgency).map(v => v.count)) : 1;

    // Pre-store drilldown data
    const ddByAgency = {};
    Object.values(byAgency).forEach(v => { ddByAgency[v.agency.id] = storeDrilldown(t('drilldown_tickets_prefix') + ': ' + v.agency.name, v.tickets.map(tk => tk.id)); });
    const ddByStatus = {};
    Object.values(byStatus).forEach(v => { ddByStatus[v.stage.id] = storeDrilldown(getPipelineStageLabel(v.stage.id), v.tickets.map(tk => tk.id)); });
    const ddBugs = storeDrilldown(t('label_bugs'), tickets.filter(tk => tk.type === 'bug').map(tk => tk.id));
    const ddFeats = storeDrilldown(t('label_features'), tickets.filter(tk => tk.type === 'feature').map(tk => tk.id));
    const ddPrio = {};
    ['high', 'medium', 'low'].forEach(p => { ddPrio[p] = storeDrilldown(t('drilldown_priority_prefix') + ': ' + t('priority_' + p), byPriority[p].map(tk => tk.id)); });

    let auditDdByAgency = {};
    if (auditLoaded) {
        Object.values(auditByAgency).forEach(v => {
            auditDdByAgency[v.agency.id] = storeDrilldown(t('drilldown_accessibility_prefix') + ': ' + v.agency.name, v.findings.map(f => f.id));
        });
    }

    // Build charts
    grid.innerHTML = `
        <!-- Tickets by agency -->
        <div class="analytics-card">
            <h4>${t('analytics_tickets_by_agency')}</h4>
            ${Object.values(byAgency).map(v => `
                <div class="chart-bar-group">
                    <div class="chart-bar-label"><span>${v.agency.abbr}</span><span>${v.count} (${v.bugs}B / ${v.features}F)</span></div>
                    <div class="chart-bar-track" onclick="showDrilldown('${ddByAgency[v.agency.id]}')">
                        <div class="chart-bar-fill" style="width:${(v.count/maxByAgency*100)}%;background:${v.agency.color}">${v.count}</div>
                    </div>
                </div>
            `).join('')}
        </div>

        <!-- Tickets by status (donut) -->
        <div class="analytics-card">
            <h4>${t('analytics_tickets_by_status')}</h4>
            <div class="chart-donut">
                ${renderDonut(Object.values(byStatus).map(v => ({ label: getPipelineStageLabel(v.stage.id), value: v.count, color: v.stage.color, ddKey: ddByStatus[v.stage.id] })))}
                <div class="chart-donut-center">
                    <div class="num">${tickets.length}</div>
                    <div class="lbl">${t('analytics_tickets_label')}</div>
                </div>
            </div>
            <div class="chart-legend">
                ${Object.values(byStatus).map(v => `
                    <div class="chart-legend-item" onclick="showDrilldown('${ddByStatus[v.stage.id]}')">
                        <span class="chart-legend-dot" style="background:${v.stage.color}"></span>
                        ${getPipelineStageLabel(v.stage.id)} (${v.count})
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Bug vs Feature -->
        <div class="analytics-card">
            <h4>${t('analytics_bugs_vs_features')}</h4>
            <div class="chart-donut">
                ${renderDonut([
                    { label: t('label_bugs'), value: bugCount, color: '#dc2626', ddKey: ddBugs },
                    { label: t('label_features'), value: featCount, color: '#2563eb', ddKey: ddFeats }
                ])}
                <div class="chart-donut-center">
                    <div class="num">${Math.round(bugCount / tickets.length * 100)}%</div>
                    <div class="lbl">${t('stat_bugs').toLowerCase()}</div>
                </div>
            </div>
            <div class="chart-legend">
                <div class="chart-legend-item" onclick="showDrilldown('${ddBugs}')">
                    <span class="chart-legend-dot" style="background:#dc2626"></span> ${t('label_bugs')} (${bugCount})
                </div>
                <div class="chart-legend-item" onclick="showDrilldown('${ddFeats}')">
                    <span class="chart-legend-dot" style="background:#2563eb"></span> ${t('label_features')} (${featCount})
                </div>
            </div>
        </div>

        <!-- Priority -->
        <div class="analytics-card">
            <h4>${t('analytics_by_priority')}</h4>
            ${[
                { key: 'high', label: t('priority_high'), color: '#dc2626' },
                { key: 'medium', label: t('priority_medium'), color: '#f59e0b' },
                { key: 'low', label: t('priority_low'), color: '#10b981' },
            ].map(p => `
                <div class="chart-bar-group">
                    <div class="chart-bar-label"><span>${p.label}</span><span>${byPriority[p.key].length}</span></div>
                    <div class="chart-bar-track" onclick="showDrilldown('${ddPrio[p.key]}')">
                        <div class="chart-bar-fill" style="width:${(byPriority[p.key].length/tickets.length*100)}%;background:${p.color}">${byPriority[p.key].length}</div>
                    </div>
                </div>
            `).join('')}
        </div>

        ${auditLoaded ? `
        <!-- Audit findings by agency -->
        <div class="analytics-card">
            <h4>${t('analytics_accessibility_by_agency')}</h4>
            ${Object.values(auditByAgency).map(v => `
                <div class="chart-bar-group">
                    <div class="chart-bar-label"><span>${v.agency.abbr}</span><span>${v.count} ${t('analytics_findings_label')}</span></div>
                    <div class="chart-bar-track" onclick="showAuditDrilldownByKey('${auditDdByAgency[v.agency.id]}')">
                        <div class="chart-bar-fill" style="width:${(v.count/maxAuditByAgency*100)}%;background:${v.agency.color}">${v.count}</div>
                    </div>
                </div>
            `).join('')}
        </div>

        <!-- Audit severity distribution -->
        <div class="analytics-card">
            <h4>${t('analytics_severity_distribution')}</h4>
            <div class="chart-donut">
                ${renderDonut([
                    { label: t('label_critical'), value: auditReport.summary.critical, color: '#dc2626', ddKey: storeDrilldown(t('audit_critical'), auditReport.findings.filter(f=>f.severity==='critical').map(f=>f.id)) },
                    { label: t('label_major'), value: auditReport.summary.major, color: '#f59e0b', ddKey: storeDrilldown(t('audit_major'), auditReport.findings.filter(f=>f.severity==='major').map(f=>f.id)) },
                    { label: t('label_minor'), value: auditReport.summary.minor, color: '#3b82f6', ddKey: storeDrilldown(t('audit_minor'), auditReport.findings.filter(f=>f.severity==='minor').map(f=>f.id)) },
                    { label: t('label_recommendation'), value: auditReport.summary.info, color: '#10b981', ddKey: storeDrilldown(t('audit_recommendations'), auditReport.findings.filter(f=>f.severity==='info').map(f=>f.id)) },
                ])}
                <div class="chart-donut-center">
                    <div class="num">${auditReport.summary.totalFindings}</div>
                    <div class="lbl">${t('analytics_findings_label')}</div>
                </div>
            </div>
            <div class="chart-legend">
                <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#dc2626"></span>${t('label_critical')} (${auditReport.summary.critical})</div>
                <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#f59e0b"></span>${t('label_major')} (${auditReport.summary.major})</div>
                <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#3b82f6"></span>${t('label_minor')} (${auditReport.summary.minor})</div>
                <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#10b981"></span>${t('label_recommendation')} (${auditReport.summary.info})</div>
            </div>
        </div>
        ` : `
        <div class="analytics-card" style="grid-column:1/-1">
            <h4>${t('analytics_accessibility_title')}</h4>
            <div style="text-align:center;padding:30px;color:#aaa">
                ${t('analytics_accessibility_prompt')}
            </div>
        </div>
        `}
    `;
}

function renderDonut(segments) {
    const total = segments.reduce((s, seg) => s + seg.value, 0);
    if (total === 0) return '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="#eee" stroke-width="18"/></svg>';
    let accum = 0;
    const paths = segments.map(seg => {
        const pct = seg.value / total;
        const startAngle = accum * 2 * Math.PI - Math.PI / 2;
        accum += pct;
        const endAngle = accum * 2 * Math.PI - Math.PI / 2;
        const largeArc = pct > 0.5 ? 1 : 0;
        const x1 = 50 + 40 * Math.cos(startAngle);
        const y1 = 50 + 40 * Math.sin(startAngle);
        const x2 = 50 + 40 * Math.cos(endAngle);
        const y2 = 50 + 40 * Math.sin(endAngle);
        const idsAttr = seg.ddKey ? `onclick="showDrilldown('${seg.ddKey}')"` : '';
        return `<path d="M ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2}" fill="none" stroke="${seg.color}" stroke-width="18" style="cursor:pointer" ${idsAttr}/>`;
    });
    return `<svg viewBox="0 0 100 100">${paths.join('')}</svg>`;
}

function showDrilldown(keyOrTitle, ticketIds) {
    let title, ids;
    if (drilldownStore[keyOrTitle]) {
        title = drilldownStore[keyOrTitle].title;
        ids = drilldownStore[keyOrTitle].ids;
    } else {
        title = keyOrTitle;
        ids = ticketIds || [];
    }

    const panel = $('#drilldown-panel');
    const titleEl = $('#drilldown-title');
    const listEl = $('#drilldown-list');

    titleEl.textContent = title;
    const relevantTickets = ids.map(id => tickets.find(tk => tk.id === id)).filter(Boolean);
    const statusLabels = { new: t('status_new'), in_progress: t('status_in_progress'), review: t('status_review'), approved: t('status_approved'), deployed: t('status_deployed') };

    listEl.innerHTML = relevantTickets.map(tk => {
        const agency = agencies.find(a => a.id === tk.agencyId);
        return `
        <li onclick="selectTicket('${tk.id}')">
            <span style="font-weight:600;min-width:50px;color:#999">${tk.id}</span>
            <span class="badge badge-${tk.type}" style="font-size:0.65rem">${tk.type === 'bug' ? 'BUG' : 'FEAT'}</span>
            <span style="flex:1">${tk.title}</span>
            <span class="status-badge status-${tk.status}" style="font-size:0.65rem">${statusLabels[tk.status]}</span>
        </li>`;
    }).join('');

    panel.classList.add('visible');
    panel.scrollIntoView({ behavior: 'smooth' });
}

function showAuditDrilldownByKey(ddKey) {
    const data = drilldownStore[ddKey];
    if (!data) return;
    showAuditDrilldown(data.title, data.ids);
}

function showAuditDrilldown(agencyName, findingIds) {
    const panel = $('#drilldown-panel');
    const titleEl = $('#drilldown-title');
    const listEl = $('#drilldown-list');

    titleEl.textContent = agencyName;
    const findings = findingIds.map(id => auditReport.findings.find(f => f.id === id)).filter(Boolean);

    listEl.innerHTML = findings.map(f => `
        <li onclick="navigateToAuditFinding('${f.id}')">
            <span style="font-weight:600;min-width:60px;color:#999">${f.id}</span>
            <span class="af-severity sev-${f.severity}" style="font-size:0.6rem">${f.severity}</span>
            <span style="flex:1">${f.title}</span>
            ${f.relatedTicket ? `<span class="badge badge-feature" style="font-size:0.6rem">${f.relatedTicket}</span>` : ''}
        </li>
    `).join('');

    panel.classList.add('visible');
    panel.scrollIntoView({ behavior: 'smooth' });
}

function navigateToAuditFinding(findingId) {
    // Switch to audit view
    $$('.tab').forEach(t => t.classList.remove('active'));
    $$('.view').forEach(v => v.classList.remove('active'));
    $$('.tab')[4].classList.add('active');
    $('#audit-view').classList.add('active');
    setTimeout(() => scrollToFinding(findingId), 300);
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
    initChat();
    initTickets();
    initCodeReview();
    initPipeline();
    initAudit();
    initAnalytics();

    // Language switcher
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
    });
    // Apply saved or default language
    applyLanguage(currentLang);
});
