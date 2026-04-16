// Siili Pienkehittäjä - Data Layer
// Oikeusministeriön hallinnonalan WordPress-sivustot

const agencies = [
    { id: 'ork', name: 'Oikeusrekisterikeskus', domain: 'oikeusrekisterikeskus.fi', abbr: 'ORK', color: '#2563eb' },
    { id: 'tuomio', name: 'Tuomioistuinvirasto', domain: 'tuomioistuinvirasto.fi', abbr: 'TIV', color: '#7c3aed' },
    { id: 'rikos', name: 'Rikosseuraamuslaitos', domain: 'rikosseuraamuslaitos.fi', abbr: 'RISE', color: '#dc2626' },
    { id: 'ulos', name: 'Ulosottolaitos', domain: 'ulosottolaitos.fi', abbr: 'ULOS', color: '#059669' },
    { id: 'tietosuoja', name: 'Tietosuojavaltuutetun toimisto', domain: 'tietosuoja.fi', abbr: 'TSV', color: '#d97706' },
];

const pages = {
    'ork': ['Etusivu', 'Ajankohtaista', 'Rekisterit', 'Palvelut', 'Lomakkeet', 'Yhteystiedot', 'Tietoa virastosta', 'Julkaisut'],
    'tuomio': ['Etusivu', 'Tuomioistuimet', 'Päätökset', 'Ajankohtaista', 'Yhteystiedot', 'Lomakkeet', 'Rekrytointi', 'Istuntokalenteri'],
    'rikos': ['Etusivu', 'Seuraamukset', 'Vankilat', 'Yhdyskuntaseuraamukset', 'Ajankohtaista', 'Yhteystiedot', 'Tilastot'],
    'ulos': ['Etusivu', 'Palvelut', 'Ulosottohakemus', 'Maksaminen', 'Ajankohtaista', 'Yhteystiedot', 'UKK'],
    'tietosuoja': ['Etusivu', 'Päätökset', 'Ohjeet ja suositukset', 'Ilmoitukset', 'Ajankohtaista', 'Yhteystiedot', 'UKK'],
};

const tickets = [
    // === TIK-001 ===
    {
        id: 'TIK-001',
        title: 'Yhteystietolomake ei lähetä viestejä',
        type: 'bug',
        priority: 'high',
        status: 'review',
        agencyId: 'ork',
        page: 'Yhteystiedot',
        section: 'Yhteydenottolomake',
        createdAt: '2026-04-02',
        customerName: 'Minna Korhonen',
        customerEmail: 'minna.korhonen@oikeusrekisterikeskus.fi',
        customerRole: 'Viestintäpäällikkö',
        conversation: [
            { role: 'customer', text: 'Hei, yhteydenottolomakkeemme ei näytä lähettävän viestejä. Olemme saaneet asiakkailta palautetta, etteivät he saa vahvistusviestiä lomakkeen lähettämisen jälkeen.', ts: '2026-04-02 09:14' },
            { role: 'agent', text: 'Hei Minna! Kiitos ilmoituksesta. Näen, että olet oikeusrekisterikeskus.fi/yhteystiedot -sivulla. Tarkistin järjestelmän lokit ja lomakkeen lähetys näyttää palauttavan virheen SMTP-asetuksissa. Tämä vaikuttaa olevan bugi – sähköpostin reititysasetus on muuttunut viimeisimmän päivityksen yhteydessä. Haluatko, että luon tästä tiketin korjausta varten?', ts: '2026-04-02 09:15' },
            { role: 'customer', text: 'Kyllä, tämä on kriittinen ongelma. Meillä tulee kyselyjä päivittäin ja menetämme yhteydenottoja. Luohan tiketin korkella prioriteetilla.', ts: '2026-04-02 09:17' },
            { role: 'agent', text: 'Ymmärrän, tämä on todellakin kiireellinen. Bugin syy on se, että Contact Form 7:n SMTP-konfiguraatio viittaa vanhaan sähköpostipalvelimeen. Luon tiketin nyt korkealla prioriteetilla. Tiketti TIK-001 on luotu ja ohjattu pienkehitysjonoon.', ts: '2026-04-02 09:18' },
        ],
        diff: {
            branch: 'fix/TIK-001-contact-form-smtp',
            summary: 'Korjaa yhteydenottolomakkeen SMTP-asetukset ja lisää fallback-reititys',
            files: [
                {
                    path: 'wp-content/themes/om-virasto/inc/mail-config.php',
                    type: 'modified',
                    hunks: [
                        {
                            header: '@@ -22,8 +22,12 @@ function om_configure_smtp($phpmailer) {',
                            lines: [
                                { type: 'context', content: "    $phpmailer->isSMTP();" },
                                { type: 'context', content: "    $phpmailer->Host = defined('SMTP_HOST') ? SMTP_HOST : 'localhost';" },
                                { type: 'remove', content: "    $phpmailer->Port = 25;" },
                                { type: 'remove', content: "    $phpmailer->SMTPAuth = false;" },
                                { type: 'add', content: "    $phpmailer->Port = defined('SMTP_PORT') ? SMTP_PORT : 587;" },
                                { type: 'add', content: "    $phpmailer->SMTPAuth = true;" },
                                { type: 'add', content: "    $phpmailer->Username = defined('SMTP_USER') ? SMTP_USER : '';" },
                                { type: 'add', content: "    $phpmailer->Password = defined('SMTP_PASS') ? SMTP_PASS : '';" },
                                { type: 'add', content: "    $phpmailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;" },
                                { type: 'context', content: "    $phpmailer->From = get_option('admin_email');" },
                                { type: 'context', content: "    $phpmailer->FromName = get_bloginfo('name');" },
                            ]
                        }
                    ]
                },
                {
                    path: 'wp-content/themes/om-virasto/inc/form-handler.php',
                    type: 'modified',
                    hunks: [
                        {
                            header: '@@ -45,6 +45,15 @@ function om_handle_contact_submission($posted_data) {',
                            lines: [
                                { type: 'context', content: "    $to = get_field('contact_email', 'option');" },
                                { type: 'context', content: "    if (empty($to)) {" },
                                { type: 'context', content: "        $to = get_option('admin_email');" },
                                { type: 'context', content: "    }" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "    // Lisää fallback ja logitus epäonnistuneille lähetyksille" },
                                { type: 'add', content: "    $sent = wp_mail($to, $subject, $message, $headers);" },
                                { type: 'add', content: "    if (!$sent) {" },
                                { type: 'add', content: "        error_log(sprintf(" },
                                { type: 'add', content: "            '[OM Contact] Sähköpostin lähetys epäonnistui: to=%s, subject=%s'," },
                                { type: 'add', content: "            $to, $subject" },
                                { type: 'add', content: "        ));" },
                                { type: 'add', content: "        om_queue_failed_email($to, $subject, $message, $headers);" },
                                { type: 'add', content: "    }" },
                                { type: 'context', content: "" },
                                { type: 'context', content: "    return $sent;" },
                            ]
                        }
                    ]
                }
            ]
        }
    },

    // === TIK-002 ===
    {
        id: 'TIK-002',
        title: 'Mobiilimenu ei sulkeudu koskettamalla taustaa',
        type: 'bug',
        priority: 'medium',
        status: 'review',
        agencyId: 'rikos',
        page: 'Etusivu',
        section: 'Navigaatio',
        createdAt: '2026-04-03',
        customerName: 'Juha Mäkinen',
        customerEmail: 'juha.makinen@rikosseuraamuslaitos.fi',
        customerRole: 'Sisällöntuottaja',
        conversation: [
            { role: 'customer', text: 'Mobiilissa kun avaan valikon ja yritän sulkea sen painamalla sivun taustaa, niin valikko jää auki. Ainoa tapa sulkea on painaa hampurilais-ikonia uudestaan.', ts: '2026-04-03 11:02' },
            { role: 'agent', text: 'Hei Juha! Tarkistin tilanteen – tämä vaikuttaa olevan bugi mobiilinavigaation JavaScript-käsittelijässä. Overlay-elementiltä puuttuu click-kuuntelija. Onko tämä esiintynyt pitkään vai huomasitko sen vasta äskettäin?', ts: '2026-04-03 11:03' },
            { role: 'customer', text: 'Olen huomannut tämän viime viikosta lähtien. Uskon, että se liittyy viimeisimpään päivitykseen. Erittäin ärsyttävää varsinkin puhelimella.', ts: '2026-04-03 11:05' },
            { role: 'agent', text: 'Selvä, tämä on bugi joka tuli viime viikon teemapäivityksen mukana. Luon tiketin tästä. Korjaus on yksinkertainen – lisätään overlay-elementille click-handler ja touch-event käsittely.', ts: '2026-04-03 11:06' },
            { role: 'customer', text: 'Kiitos, olisi hyvä saada korjattua pian.', ts: '2026-04-03 11:07' },
        ],
        diff: {
            branch: 'fix/TIK-002-mobile-menu-close',
            summary: 'Lisää overlay click/touch handler mobiilivalikon sulkemiseen',
            files: [
                {
                    path: 'wp-content/themes/om-virasto/assets/js/navigation.js',
                    type: 'modified',
                    hunks: [
                        {
                            header: '@@ -34,6 +34,18 @@ const MobileNav = {',
                            lines: [
                                { type: 'context', content: "    toggle.addEventListener('click', () => {" },
                                { type: 'context', content: "        nav.classList.toggle('is-open');" },
                                { type: 'context', content: "        toggle.setAttribute('aria-expanded', nav.classList.contains('is-open'));" },
                                { type: 'context', content: "    });" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "    // Sulje valikko koskettamalla/klikkaamalla overlayta" },
                                { type: 'add', content: "    const overlay = document.querySelector('.nav-overlay');" },
                                { type: 'add', content: "    if (overlay) {" },
                                { type: 'add', content: "        ['click', 'touchstart'].forEach(evt => {" },
                                { type: 'add', content: "            overlay.addEventListener(evt, (e) => {" },
                                { type: 'add', content: "                e.preventDefault();" },
                                { type: 'add', content: "                nav.classList.remove('is-open');" },
                                { type: 'add', content: "                toggle.setAttribute('aria-expanded', 'false');" },
                                { type: 'add', content: "                overlay.classList.remove('is-visible');" },
                                { type: 'add', content: "            }, { passive: false });" },
                                { type: 'add', content: "        });" },
                                { type: 'add', content: "    }" },
                                { type: 'context', content: "};" },
                            ]
                        }
                    ]
                },
                {
                    path: 'wp-content/themes/om-virasto/assets/css/components/_navigation.scss',
                    type: 'modified',
                    hunks: [
                        {
                            header: '@@ -78,6 +78,16 @@ .site-navigation {',
                            lines: [
                                { type: 'context', content: "    }" },
                                { type: 'context', content: "}" },
                                { type: 'add', content: "" },
                                { type: 'add', content: ".nav-overlay {" },
                                { type: 'add', content: "    position: fixed;" },
                                { type: 'add', content: "    inset: 0;" },
                                { type: 'add', content: "    background: rgba(0, 0, 0, 0.5);" },
                                { type: 'add', content: "    z-index: 998;" },
                                { type: 'add', content: "    opacity: 0;" },
                                { type: 'add', content: "    pointer-events: none;" },
                                { type: 'add', content: "    transition: opacity 0.3s ease;" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "    &.is-visible {" },
                                { type: 'add', content: "        opacity: 1;" },
                                { type: 'add', content: "        pointer-events: auto;" },
                                { type: 'add', content: "    }" },
                                { type: 'add', content: "}" },
                            ]
                        }
                    ]
                }
            ]
        }
    },

    // === TIK-003 ===
    {
        id: 'TIK-003',
        title: 'Murupolkunavigaatio puuttuu palvelusivuilta',
        type: 'feature',
        priority: 'medium',
        status: 'review',
        agencyId: 'ulos',
        page: 'Palvelut',
        section: 'Navigaatio',
        createdAt: '2026-04-03',
        customerName: 'Sari Leppänen',
        customerEmail: 'sari.leppanen@ulosottolaitos.fi',
        customerRole: 'Verkkopalveluvastaava',
        conversation: [
            { role: 'customer', text: 'Palvelusivuilla olisi hyvä olla murupolku (breadcrumb) navigaatio, koska sivurakenne on melko syvä ja käyttäjät eksyvät helposti. Etusivulle pääsee vain logon kautta.', ts: '2026-04-03 13:30' },
            { role: 'agent', text: 'Hei Sari! Tämä on hyvä kehitysehdotus. Murupolkunavigaatio parantaisi merkittävästi sivuston käytettävyyttä, erityisesti palvelusivujen hierarkiassa. Tämä ei ole bugi vaan uusi ominaisuus – haluaisitko, että luon tästä kehityspyynnön?', ts: '2026-04-03 13:31' },
            { role: 'customer', text: 'Kyllä, ehdottomasti. Tämä olisi tärkeä saavutettavuudenkin kannalta. Murupolku auttaa ruudunlukijoiden käyttäjiä hahmottamaan sivuhierarkian.', ts: '2026-04-03 13:33' },
            { role: 'agent', text: 'Aivan oikein – murupolku on myös WCAG 2.1 -suosituksen mukainen navigaatioelementti. Luon tiketin kehityspyyntönä. Toteutukseen sisältyisi Yoast SEO:n breadcrumb-toiminnallisuuden aktivointi ja tyylitys teeman mukaiseksi.', ts: '2026-04-03 13:34' },
        ],
        diff: {
            branch: 'feat/TIK-003-breadcrumb-navigation',
            summary: 'Lisää murupolkunavigaatio palvelusivuille Yoast SEO breadcrumbs -toiminnolla',
            files: [
                {
                    path: 'wp-content/themes/om-virasto/template-parts/breadcrumb.php',
                    type: 'added',
                    hunks: [
                        {
                            header: '@@ -0,0 +1,22 @@',
                            lines: [
                                { type: 'add', content: "<?php" },
                                { type: 'add', content: "/**" },
                                { type: 'add', content: " * Template part: Murupolkunavigaatio" },
                                { type: 'add', content: " * Käyttää Yoast SEO:n breadcrumb-toimintoa" },
                                { type: 'add', content: " */" },
                                { type: 'add', content: "if (!function_exists('yoast_breadcrumb')) {" },
                                { type: 'add', content: "    return;" },
                                { type: 'add', content: "}" },
                                { type: 'add', content: "?>" },
                                { type: 'add', content: '<nav class="breadcrumb" aria-label="<?php esc_attr_e(\'Murupolku\', \'om-virasto\'); ?>">' },
                                { type: 'add', content: "    <?php yoast_breadcrumb('<ol class=\"breadcrumb__list\" itemscope itemtype=\"https://schema.org/BreadcrumbList\">', '</ol>'); ?>" },
                                { type: 'add', content: "</nav>" },
                            ]
                        }
                    ]
                },
                {
                    path: 'wp-content/themes/om-virasto/functions.php',
                    type: 'modified',
                    hunks: [
                        {
                            header: '@@ -156,6 +156,14 @@ function om_theme_support() {',
                            lines: [
                                { type: 'context', content: "    add_theme_support('responsive-embeds');" },
                                { type: 'context', content: "    add_theme_support('custom-logo');" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "    // Aktivoi Yoast SEO breadcrumbs" },
                                { type: 'add', content: "    add_theme_support('yoast-seo-breadcrumbs');" },
                                { type: 'add', content: "}" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "// Murupolun separator-merkki" },
                                { type: 'add', content: "add_filter('wpseo_breadcrumb_separator', function() {" },
                                { type: 'add', content: "    return '<span class=\"breadcrumb__separator\" aria-hidden=\"true\">/</span>';" },
                                { type: 'add', content: "});" },
                                { type: 'context', content: "" },
                                { type: 'context', content: "add_action('after_setup_theme', 'om_theme_support');" },
                            ]
                        }
                    ]
                }
            ]
        }
    },

    // === TIK-004 ===
    {
        id: 'TIK-004',
        title: 'Hakutoiminto ei löydä ääkkösillä haettaessa',
        type: 'bug',
        priority: 'high',
        status: 'review',
        agencyId: 'ork',
        page: 'Etusivu',
        section: 'Hakukenttä',
        createdAt: '2026-04-04',
        customerName: 'Pekka Salonen',
        customerEmail: 'pekka.salonen@oikeusrekisterikeskus.fi',
        customerRole: 'Tietohallintopäällikkö',
        conversation: [
            { role: 'customer', text: 'Sivuston haku ei toimi oikein kun hakusanassa on ä, ö tai å. Esimerkiksi haettaessa "lähestymiskielto" ei tule tuloksia, mutta "lahestymiskielto" löytää.', ts: '2026-04-04 08:45' },
            { role: 'agent', text: 'Hei Pekka! Tämä on selkeä bugi merkistökoodauksessa. Hakutoiminnon SQL-kysely ei käsittele UTF-8 -merkkejä oikein. Näen, että tietokannan collation-asetus on latin1_swedish_ci, mikä aiheuttaa ongelmia ääkkösillä. Tämä vaikuttaa kaikkiin sivuston hakuihin.', ts: '2026-04-04 08:46' },
            { role: 'customer', text: 'Tämä on todella häiritsevä ongelma. Monet rekisteripalvelumme ovat suomenkielisiä ja käyttäjät hakevat luonnollisesti suomeksi.', ts: '2026-04-04 08:48' },
            { role: 'agent', text: 'Aivan. Luon tästä korkean prioriteetin bugitiketin. Korjaus edellyttää WP_Query:n charset-asetusten päivittämistä ja mahdollisesti SearchWP-pluginin konfiguraation tarkistamista.', ts: '2026-04-04 08:49' },
        ],
        diff: {
            branch: 'fix/TIK-004-search-utf8-charset',
            summary: 'Korjaa haun merkistökoodaus UTF-8:ksi ääkkösongelman ratkaisemiseksi',
            files: [
                {
                    path: 'wp-content/themes/om-virasto/inc/search-config.php',
                    type: 'modified',
                    hunks: [
                        {
                            header: '@@ -12,9 +12,17 @@ function om_modify_search_query($query) {',
                            lines: [
                                { type: 'context', content: "    if ($query->is_search() && $query->is_main_query()) {" },
                                { type: 'remove', content: "        $search_term = $query->get('s');" },
                                { type: 'add', content: "        $search_term = sanitize_text_field($query->get('s'));" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "        // Varmista UTF-8 -merkistökoodaus hakutermille" },
                                { type: 'add', content: "        if (!mb_check_encoding($search_term, 'UTF-8')) {" },
                                { type: 'add', content: "            $search_term = mb_convert_encoding($search_term, 'UTF-8', 'auto');" },
                                { type: 'add', content: "            $query->set('s', $search_term);" },
                                { type: 'add', content: "        }" },
                                { type: 'add', content: "" },
                                { type: 'context', content: "        $query->set('post_type', array('page', 'post', 'rekisteri'));" },
                                { type: 'context', content: "    }" },
                            ]
                        }
                    ]
                },
                {
                    path: 'wp-content/mu-plugins/om-db-charset-fix.php',
                    type: 'added',
                    hunks: [
                        {
                            header: '@@ -0,0 +1,18 @@',
                            lines: [
                                { type: 'add', content: "<?php" },
                                { type: 'add', content: "/**" },
                                { type: 'add', content: " * Plugin Name: OM DB Charset Fix" },
                                { type: 'add', content: " * Description: Varmistaa UTF-8 mb4 -merkistön tietokantakyselyissä" },
                                { type: 'add', content: " */" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "add_action('init', function() {" },
                                { type: 'add', content: "    global $wpdb;" },
                                { type: 'add', content: "    if ($wpdb->charset !== 'utf8mb4') {" },
                                { type: 'add', content: "        $wpdb->set_charset($wpdb->dbh, 'utf8mb4', 'utf8mb4_unicode_ci');" },
                                { type: 'add', content: "    }" },
                                { type: 'add', content: "});" },
                            ]
                        }
                    ]
                }
            ]
        }
    },

    // === TIK-005 ===
    {
        id: 'TIK-005',
        title: 'Kuvagalleria ei näy oikein tabletilla',
        type: 'bug',
        priority: 'medium',
        status: 'review',
        agencyId: 'tietosuoja',
        page: 'Ajankohtaista',
        section: 'Uutiskuvat',
        createdAt: '2026-04-04',
        customerName: 'Anna Lindström',
        customerEmail: 'anna.lindstrom@tietosuoja.fi',
        customerRole: 'Viestintäasiantuntija',
        conversation: [
            { role: 'customer', text: 'Ajankohtaista-sivun uutiskuvat näkyvät tabletilla (iPad) päällekkäin ja osa kuvista on rajautunut oudosti. Pystynäkymässä ongelma on pahempi.', ts: '2026-04-04 14:20' },
            { role: 'agent', text: 'Hei Anna! Tämä on responsiivisen layoutin bugi. Tablet-kokoisten näyttöjen breakpoint-sääntö gallerian CSS-gridissä ei ota huomioon portrait-orientaatiota. Olen paikallistanut ongelman. Haluatko, että luon tiketin?', ts: '2026-04-04 14:21' },
            { role: 'customer', text: 'Kyllä kiitos, saamme usein palautetta mobiililaitteilla selaavista käyttäjistä.', ts: '2026-04-04 14:23' },
            { role: 'agent', text: 'Tiketti luotu. Korjaus kohdistuu CSS grid -asetuksiin tablet-breakpointissa ja kuvien aspect-ratio käsittelyyn.', ts: '2026-04-04 14:24' },
        ],
        diff: {
            branch: 'fix/TIK-005-tablet-gallery-layout',
            summary: 'Korjaa kuvagallerian tablet-layout portrait-orientaatiossa',
            files: [
                {
                    path: 'wp-content/themes/om-virasto/assets/css/components/_gallery.scss',
                    type: 'modified',
                    hunks: [
                        {
                            header: '@@ -45,8 +45,18 @@ .news-gallery {',
                            lines: [
                                { type: 'context', content: "    display: grid;" },
                                { type: 'context', content: "    gap: 1rem;" },
                                { type: 'remove', content: "    grid-template-columns: repeat(3, 1fr);" },
                                { type: 'add', content: "    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));" },
                                { type: 'context', content: "" },
                                { type: 'remove', content: "    @media (max-width: 768px) {" },
                                { type: 'remove', content: "        grid-template-columns: 1fr;" },
                                { type: 'add', content: "    @media (max-width: 1024px) and (orientation: portrait) {" },
                                { type: 'add', content: "        grid-template-columns: repeat(2, 1fr);" },
                                { type: 'add', content: "    }" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "    @media (max-width: 640px) {" },
                                { type: 'add', content: "        grid-template-columns: 1fr;" },
                                { type: 'context', content: "    }" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "    &__item img {" },
                                { type: 'add', content: "        aspect-ratio: 16 / 9;" },
                                { type: 'add', content: "        object-fit: cover;" },
                                { type: 'add', content: "        width: 100%;" },
                                { type: 'add', content: "        height: auto;" },
                                { type: 'add', content: "    }" },
                                { type: 'context', content: "}" },
                            ]
                        }
                    ]
                }
            ]
        }
    },

    // === TIK-006 ===
    {
        id: 'TIK-006',
        title: 'PDF-päätökset eivät avaudu uudessa välilehdessä',
        type: 'bug',
        priority: 'medium',
        status: 'review',
        agencyId: 'tuomio',
        page: 'Päätökset',
        section: 'Päätösasiakirjat',
        createdAt: '2026-04-05',
        customerName: 'Timo Heikkinen',
        customerEmail: 'timo.heikkinen@tuomioistuinvirasto.fi',
        customerRole: 'Asiakirjahallinnon asiantuntija',
        conversation: [
            { role: 'customer', text: 'Päätökset-sivulla olevat PDF-linkit eivät avaudu uuteen välilehteen vaan ne yrittävät ladata tiedoston suoraan. Tämä on hämmentävää käyttäjille.', ts: '2026-04-05 10:15' },
            { role: 'agent', text: 'Hei Timo! Tarkistin päätöslinkit. Ongelma on siinä, että PDF-liitteiden linkki-elementeistä puuttuu target="_blank" -attribuutti ja Content-Type header palautuu virheellisesti. Tämä on bugi teeman asiakirja-templatessa.', ts: '2026-04-05 10:16' },
            { role: 'customer', text: 'Joo, juuri näin. Lisäksi olisi hyvä jos PDF:n vieressä näkyisi tiedoston koko, niin käyttäjä tietää kuinka suuren tiedoston on lataamassa.', ts: '2026-04-05 10:18' },
            { role: 'agent', text: 'Hyvä lisäys! Sisällytän molemmat korjaukset samaan tikettiin: PDF avautuu uuteen välilehteen ja tiedostokoko näytetään linkin vieressä. Tiketti TIK-006 luotu.', ts: '2026-04-05 10:19' },
        ],
        diff: {
            branch: 'fix/TIK-006-pdf-link-behavior',
            summary: 'Korjaa PDF-linkkien avautuminen uuteen välilehteen ja lisää tiedostokoon näyttö',
            files: [
                {
                    path: 'wp-content/themes/om-virasto/template-parts/content-paatos.php',
                    type: 'modified',
                    hunks: [
                        {
                            header: '@@ -28,8 +28,18 @@ $attachments = get_field(\'paatos_liitteet\');',
                            lines: [
                                { type: 'context', content: "<?php foreach ($attachments as $file) : ?>" },
                                { type: 'remove', content: '    <a href="<?php echo esc_url($file[\'url\']); ?>" class="paatos-attachment">' },
                                { type: 'remove', content: "        <?php echo esc_html($file['title']); ?>" },
                                { type: 'add', content: "    <?php $filesize = size_format(filesize(get_attached_file($file['ID'])), 1); ?>" },
                                { type: 'add', content: '    <a href="<?php echo esc_url($file[\'url\']); ?>"' },
                                { type: 'add', content: '       class="paatos-attachment"' },
                                { type: 'add', content: '       target="_blank"' },
                                { type: 'add', content: '       rel="noopener noreferrer"' },
                                { type: 'add', content: "       type=\"application/pdf\">" },
                                { type: 'add', content: '        <span class="attachment-icon" aria-hidden="true">📄</span>' },
                                { type: 'add', content: "        <?php echo esc_html($file['title']); ?>" },
                                { type: 'add', content: '        <span class="attachment-meta">(PDF, <?php echo esc_html($filesize); ?>)</span>' },
                                { type: 'context', content: "    </a>" },
                                { type: 'context', content: "<?php endforeach; ?>" },
                            ]
                        }
                    ]
                }
            ]
        }
    },

    // === TIK-007 ===
    {
        id: 'TIK-007',
        title: 'Kuvista puuttuu alt-tekstit – saavutettavuusongelma',
        type: 'bug',
        priority: 'high',
        status: 'review',
        agencyId: 'rikos',
        page: 'Etusivu',
        section: 'Kuvakaruselli',
        createdAt: '2026-04-05',
        customerName: 'Kaisa Niemi',
        customerEmail: 'kaisa.niemi@rikosseuraamuslaitos.fi',
        customerRole: 'Saavutettavuusvastaava',
        conversation: [
            { role: 'customer', text: 'Etusivun kuvakarusellissa olevista kuvista puuttuu alt-tekstit. Tämä rikkoo WCAG 2.1 AA -vaatimuksia ja saimme tästä huomautuksen saavutettavuusauditoinnissa.', ts: '2026-04-05 15:00' },
            { role: 'agent', text: 'Hei Kaisa! Tämä on vakava saavutettavuusbugi. Tarkistin karuselli-komponentin ja alt-attribuutti jää tyhjäksi koska ACF-kuvakenttä palauttaa vain URL:n eikä täyttä objektia. Alt-teksti on kyllä syötetty mediakirjastossa, mutta se ei välity templateen.', ts: '2026-04-05 15:02' },
            { role: 'customer', text: 'Tämä pitää korjata mahdollisimman nopeasti. Meillä on lakisääteinen velvoite täyttää saavutettavuusvaatimukset.', ts: '2026-04-05 15:03' },
            { role: 'agent', text: 'Ymmärrän tilanteen vakavuuden. Luon korkean prioriteetin tiketin. Korjaus muuttaa ACF-kentän palautusmuodon ja varmistaa, että alt-teksti tulostetaan karusellissa oikein.', ts: '2026-04-05 15:04' },
        ],
        diff: {
            branch: 'fix/TIK-007-carousel-alt-texts',
            summary: 'Korjaa kuvakarusellin alt-tekstien puuttuminen ACF-kentän palautusmuodon korjauksella',
            files: [
                {
                    path: 'wp-content/themes/om-virasto/template-parts/hero-carousel.php',
                    type: 'modified',
                    hunks: [
                        {
                            header: '@@ -15,9 +15,12 @@ $slides = get_field(\'hero_slides\');',
                            lines: [
                                { type: 'context', content: "<?php foreach ($slides as $slide) : ?>" },
                                { type: 'context', content: '    <div class="carousel__slide">' },
                                { type: 'remove', content: '        <img src="<?php echo esc_url($slide[\'image\']); ?>" alt="">' },
                                { type: 'add', content: "        <?php" },
                                { type: 'add', content: "            $image = $slide['image'];" },
                                { type: 'add', content: "            $alt = is_array($image) ? $image['alt'] : get_post_meta(attachment_url_to_postid($image), '_wp_attachment_image_alt', true);" },
                                { type: 'add', content: "        ?>" },
                                { type: 'add', content: '        <img src="<?php echo esc_url(is_array($image) ? $image[\'url\'] : $image); ?>"' },
                                { type: 'add', content: '             alt="<?php echo esc_attr($alt); ?>"' },
                                { type: 'add', content: '             loading="lazy">' },
                                { type: 'context', content: '        <div class="carousel__caption">' },
                            ]
                        }
                    ]
                },
                {
                    path: 'wp-content/themes/om-virasto/acf-json/group_hero_carousel.json',
                    type: 'modified',
                    hunks: [
                        {
                            header: '@@ -18,7 +18,7 @@',
                            lines: [
                                { type: 'context', content: '            "type": "image",' },
                                { type: 'context', content: '            "name": "image",' },
                                { type: 'context', content: '            "label": "Kuva",' },
                                { type: 'remove', content: '            "return_format": "url",' },
                                { type: 'add', content: '            "return_format": "array",' },
                                { type: 'context', content: '            "preview_size": "medium",' },
                                { type: 'context', content: '            "library": "all"' },
                            ]
                        }
                    ]
                }
            ]
        }
    },

    // === TIK-008 ===
    {
        id: 'TIK-008',
        title: 'Etusivun lataus kestää yli 8 sekuntia',
        type: 'bug',
        priority: 'high',
        status: 'review',
        agencyId: 'ulos',
        page: 'Etusivu',
        section: 'Suorituskyky',
        createdAt: '2026-04-06',
        customerName: 'Markku Väisänen',
        customerEmail: 'markku.vaisanen@ulosottolaitos.fi',
        customerRole: 'ICT-asiantuntija',
        conversation: [
            { role: 'customer', text: 'Etusivun lataus on todella hidasta. Google PageSpeed antaa pisteet 34/100 mobiilissa. Erityisesti kuvat lataavat hitaasti.', ts: '2026-04-06 09:30' },
            { role: 'agent', text: 'Hei Markku! Analysoin sivun suorituskykyä. Havaitsin useita ongelmia: 1) Kuvia ei ole optimoitu eikä WebP-muotoa käytetä, 2) JavaScript-tiedostoja ladataan synkronisesti headerissa, 3) Välimuisti-headerit puuttuvat staattisista tiedostoista. Suurin ongelma on kuvien koko – etusivun hero-kuva on 4.2 MB.', ts: '2026-04-06 09:32' },
            { role: 'customer', text: 'Tuo on vakava ongelma. Meidän palvelumme käyttäjistä suuri osa käyttää mobiilia ja hidas lataus aiheuttaa poistumisia.', ts: '2026-04-06 09:34' },
            { role: 'agent', text: 'Luon korkean prioriteetin tiketin. Korjauskokonaisuus sisältää kuvien lazy loading -optimoinnin, WebP-tuen ja skriptien asynkronisen latauksen.', ts: '2026-04-06 09:35' },
        ],
        diff: {
            branch: 'fix/TIK-008-performance-optimization',
            summary: 'Optimoi etusivun latausnopeutta: lazy loading, WebP-tuki ja skripti-optimointi',
            files: [
                {
                    path: 'wp-content/themes/om-virasto/functions.php',
                    type: 'modified',
                    hunks: [
                        {
                            header: '@@ -88,8 +88,22 @@ function om_enqueue_scripts() {',
                            lines: [
                                { type: 'context', content: "    wp_enqueue_style('om-main', get_stylesheet_uri(), array(), OM_VERSION);" },
                                { type: 'remove', content: "    wp_enqueue_script('om-app', get_template_directory_uri() . '/assets/js/app.js', array('jquery'), OM_VERSION);" },
                                { type: 'add', content: "    wp_enqueue_script('om-app', get_template_directory_uri() . '/assets/js/app.js', array(), OM_VERSION, true);" },
                                { type: 'context', content: "}" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "// Lisää defer/async attribuutit skripteille" },
                                { type: 'add', content: "add_filter('script_loader_tag', function(\$tag, \$handle) {" },
                                { type: 'add', content: "    \$async_scripts = ['om-app', 'om-analytics'];" },
                                { type: 'add', content: "    if (in_array(\$handle, \$async_scripts)) {" },
                                { type: 'add', content: "        return str_replace(' src', ' defer src', \$tag);" },
                                { type: 'add', content: "    }" },
                                { type: 'add', content: "    return \$tag;" },
                                { type: 'add', content: "}, 10, 2);" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "// WebP-tuki kuvien latauksessa" },
                                { type: 'add', content: "add_filter('wp_generate_attachment_metadata', 'om_generate_webp', 10, 2);" },
                                { type: 'add', content: "function om_generate_webp(\$metadata, \$attachment_id) {" },
                                { type: 'add', content: "    \$file = get_attached_file(\$attachment_id);" },
                                { type: 'add', content: "    if (function_exists('imagewebp') && preg_match('/\\.(jpe?g|png)\$/i', \$file)) {" },
                                { type: 'add', content: "        \$webp_path = preg_replace('/\\.(jpe?g|png)\$/i', '.webp', \$file);" },
                                { type: 'add', content: "        \$image = wp_get_image_editor(\$file);" },
                                { type: 'add', content: "        if (!is_wp_error(\$image)) {" },
                                { type: 'add', content: "            \$image->save(\$webp_path, 'image/webp');" },
                                { type: 'add', content: "        }" },
                                { type: 'add', content: "    }" },
                                { type: 'add', content: "    return \$metadata;" },
                                { type: 'add', content: "}" },
                            ]
                        }
                    ]
                }
            ]
        }
    },

    // === TIK-009 ===
    {
        id: 'TIK-009',
        title: 'Tapahtumakalenteri-widget ajankohtaista-sivulle',
        type: 'feature',
        priority: 'low',
        status: 'review',
        agencyId: 'ork',
        page: 'Ajankohtaista',
        section: 'Sivupalkki',
        createdAt: '2026-04-07',
        customerName: 'Riikka Tuominen',
        customerEmail: 'riikka.tuominen@oikeusrekisterikeskus.fi',
        customerRole: 'Viestintäasiantuntija',
        conversation: [
            { role: 'customer', text: 'Olisi hyödyllistä, jos ajankohtaista-sivun sivupalkissa olisi pieni tapahtumakalenteri joka näyttäisi tulevat koulutukset ja seminaarit.', ts: '2026-04-07 13:10' },
            { role: 'agent', text: 'Hei Riikka! Tämä on kehitysehdotus uudesta ominaisuudesta. Toteutettavissa WordPress-widgettinä joka hakee tapahtumat custom post typestä. Haluatko, että tähän sisällytetään myös suodatus aihealueen mukaan?', ts: '2026-04-07 13:11' },
            { role: 'customer', text: 'Kyllä, suodatus olisi hyvä. Ja mielellään niin, että tulevat tapahtumat näkyvät aikajärjestyksessä ja menneet putoavat pois.', ts: '2026-04-07 13:13' },
            { role: 'agent', text: 'Selvä! Luon kehityspyynnön tapahtumakalenteri-widgetistä: automaattinen aikajärjestys, menneiden piilotus, aihealuesuodatus.', ts: '2026-04-07 13:14' },
        ],
        diff: {
            branch: 'feat/TIK-009-event-calendar-widget',
            summary: 'Lisää tapahtumakalenteri-widget sivupalkkiin tulevien tapahtumien näyttämiseen',
            files: [
                {
                    path: 'wp-content/themes/om-virasto/inc/widgets/class-event-calendar-widget.php',
                    type: 'added',
                    hunks: [
                        {
                            header: '@@ -0,0 +1,48 @@',
                            lines: [
                                { type: 'add', content: "<?php" },
                                { type: 'add', content: "class OM_Event_Calendar_Widget extends WP_Widget {" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "    public function __construct() {" },
                                { type: 'add', content: "        parent::__construct('om_events', 'Tapahtumakalenteri', array(" },
                                { type: 'add', content: "            'description' => 'Näyttää tulevat tapahtumat kalenterinäkymässä'" },
                                { type: 'add', content: "        ));" },
                                { type: 'add', content: "    }" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "    public function widget($args, $instance) {" },
                                { type: 'add', content: "        $events = new WP_Query(array(" },
                                { type: 'add', content: "            'post_type'      => 'tapahtuma'," },
                                { type: 'add', content: "            'posts_per_page'  => $instance['count'] ?? 5," },
                                { type: 'add', content: "            'meta_key'        => 'event_date'," },
                                { type: 'add', content: "            'orderby'         => 'meta_value'," },
                                { type: 'add', content: "            'order'           => 'ASC'," },
                                { type: 'add', content: "            'meta_query'      => array(array(" },
                                { type: 'add', content: "                'key'     => 'event_date'," },
                                { type: 'add', content: "                'value'   => date('Y-m-d')," },
                                { type: 'add', content: "                'compare' => '>='," },
                                { type: 'add', content: "                'type'    => 'DATE'," },
                                { type: 'add', content: "            ))," },
                                { type: 'add', content: "        ));" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "        echo $args['before_widget'];" },
                                { type: 'add', content: "        echo $args['before_title'] . esc_html($instance['title'] ?? 'Tapahtumat') . $args['after_title'];" },
                                { type: 'add', content: "        get_template_part('template-parts/widget-events', null, array('events' => $events));" },
                                { type: 'add', content: "        echo $args['after_widget'];" },
                                { type: 'add', content: "    }" },
                                { type: 'add', content: "}" },
                            ]
                        }
                    ]
                }
            ]
        }
    },

    // === TIK-010 ===
    {
        id: 'TIK-010',
        title: 'Alatunnisteen linkit osoittavat väärille sivuille',
        type: 'bug',
        priority: 'medium',
        status: 'review',
        agencyId: 'tietosuoja',
        page: 'Kaikki sivut',
        section: 'Alatunniste (footer)',
        createdAt: '2026-04-07',
        customerName: 'Laura Repo',
        customerEmail: 'laura.repo@tietosuoja.fi',
        customerRole: 'Verkkopäätoimittaja',
        conversation: [
            { role: 'customer', text: 'Alatunnisteen linkki "Tietosuojaselosteet" ohjaa etusivulle eikä tietosuojaselosteiden sivulle. Myös "Rekisterinpitäjän opas" -linkki johtaa 404-sivulle.', ts: '2026-04-07 16:45' },
            { role: 'agent', text: 'Hei Laura! Tarkistin alatunnisteen valikkoasetukset. Ongelma johtuu siitä, että footer-valikossa olevat linkit viittaavat vanhoihin URL-osoitteisiin jotka muuttuivat kun sivuston rakennetta uudistettiin. Tämä on bugi valikkoasetuksissa.', ts: '2026-04-07 16:47' },
            { role: 'customer', text: 'Korjataanhan tämä? On noloa kun viralliset linkit eivät toimi.', ts: '2026-04-07 16:48' },
            { role: 'agent', text: 'Ehdottomasti. Luon tiketin jossa korjataan footer-valikon URL:t ja lisätään redirect-säännöt vanhoille osoitteille, jotta mahdolliset kirjanmerkit toimivat.', ts: '2026-04-07 16:49' },
        ],
        diff: {
            branch: 'fix/TIK-010-footer-links',
            summary: 'Korjaa alatunnisteen rikkinäiset linkit ja lisää redirect-säännöt vanhoille URL:ille',
            files: [
                {
                    path: 'wp-content/themes/om-virasto/inc/redirects.php',
                    type: 'modified',
                    hunks: [
                        {
                            header: '@@ -8,6 +8,18 @@ function om_legacy_redirects() {',
                            lines: [
                                { type: 'context', content: "    $redirects = array(" },
                                { type: 'context', content: "        '/tietosuoja/rekisteriseloste' => '/tietosuojaselosteet/'," },
                                { type: 'context', content: "        '/yhteystiedot/toimisto'      => '/yhteystiedot/'," },
                                { type: 'add', content: "        '/rekisterinpitajan-opas'      => '/ohjeet-ja-suositukset/rekisterinpitajan-opas/'," },
                                { type: 'add', content: "        '/tietosuojaselosteet-vanha'   => '/tietosuojaselosteet/'," },
                                { type: 'add', content: "        '/ilmoitukset/tietoturvaloukkaus' => '/ilmoitukset/tietoturvaloukkausilmoitus/'," },
                                { type: 'context', content: "    );" },
                                { type: 'context', content: "" },
                                { type: 'context', content: "    $request = $_SERVER['REQUEST_URI'];" },
                            ]
                        }
                    ]
                },
                {
                    path: 'wp-content/themes/om-virasto/inc/menus.php',
                    type: 'modified',
                    hunks: [
                        {
                            header: '@@ -32,6 +32,16 @@ function om_register_footer_menu() {',
                            lines: [
                                { type: 'context', content: "    register_nav_menus(array(" },
                                { type: 'context', content: "        'footer-primary'   => __('Alatunniste - päävalikko', 'om-virasto')," },
                                { type: 'context', content: "        'footer-secondary' => __('Alatunniste - toissijainen', 'om-virasto')," },
                                { type: 'context', content: "    ));" },
                                { type: 'add', content: "}" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "// Validoi footer-valikon linkit admin-näkymässä" },
                                { type: 'add', content: "add_action('admin_notices', function() {" },
                                { type: 'add', content: "    if (om_has_broken_menu_links('footer-primary')) {" },
                                { type: 'add', content: "        echo '<div class=\"notice notice-warning\"><p>';" },
                                { type: 'add', content: "        echo 'Alatunnisteen valikossa on rikkinäisiä linkkejä. Tarkista valikkoasetukset.';" },
                                { type: 'add', content: "        echo '</p></div>';" },
                                { type: 'add', content: "    }" },
                                { type: 'add', content: "});" },
                            ]
                        }
                    ]
                }
            ]
        }
    },

    // === TIK-011 ===
    {
        id: 'TIK-011',
        title: 'Lomakkeen validointiviestit näkyvät englanniksi',
        type: 'bug',
        priority: 'medium',
        status: 'approved',
        agencyId: 'tuomio',
        page: 'Lomakkeet',
        section: 'Palautelomake',
        createdAt: '2026-04-07',
        customerName: 'Olli Lahtinen',
        customerEmail: 'olli.lahtinen@tuomioistuinvirasto.fi',
        customerRole: 'Asiakaspalvelupäällikkö',
        conversation: [
            { role: 'customer', text: 'Palautelomakkeen virheilmoitukset tulevat englanniksi: "This field is required" ja "Please enter a valid email". Käyttäjämme eivät aina ymmärrä englantia.', ts: '2026-04-07 11:20' },
            { role: 'agent', text: 'Hei Olli! Tämä on lokalisoinnin bugi. Contact Form 7:n suomenkieliset käännökset eivät ole ladattu oikein. Todennäköisesti käännöstiedosto puuttuu tai on vanhentunut. Haluatko, että luon tiketin?', ts: '2026-04-07 11:21' },
            { role: 'customer', text: 'Kyllä kiitos, ja mielellään niin, että kaikki lomakkeen viestit tarkistetaan samalla.', ts: '2026-04-07 11:23' },
            { role: 'agent', text: 'Selvä! Tiketti kattaa kaikkien CF7-lomakkeiden validointiviestien suomentamisen.', ts: '2026-04-07 11:24' },
        ],
        diff: {
            branch: 'fix/TIK-011-form-validation-fi',
            summary: 'Suomenna lomakkeiden validointiviestit ja lisää puuttuvat käännökset',
            files: [
                {
                    path: 'wp-content/themes/om-virasto/inc/cf7-translations.php',
                    type: 'added',
                    hunks: [
                        {
                            header: '@@ -0,0 +1,24 @@',
                            lines: [
                                { type: 'add', content: "<?php" },
                                { type: 'add', content: "/**" },
                                { type: 'add', content: " * Contact Form 7 -lomakkeiden suomenkieliset validointiviestit" },
                                { type: 'add', content: " */" },
                                { type: 'add', content: "add_filter('wpcf7_messages', function($messages) {" },
                                { type: 'add', content: "    $messages['invalid_required'] = array(" },
                                { type: 'add', content: "        'description' => 'Pakollinen kenttä'," },
                                { type: 'add', content: "        'default'     => 'Tämä kenttä on pakollinen.'," },
                                { type: 'add', content: "    );" },
                                { type: 'add', content: "    $messages['invalid_email'] = array(" },
                                { type: 'add', content: "        'description' => 'Virheellinen sähköposti'," },
                                { type: 'add', content: "        'default'     => 'Syötä kelvollinen sähköpostiosoite.'," },
                                { type: 'add', content: "    );" },
                                { type: 'add', content: "    $messages['invalid_tel'] = array(" },
                                { type: 'add', content: "        'description' => 'Virheellinen puhelinnumero'," },
                                { type: 'add', content: "        'default'     => 'Syötä kelvollinen puhelinnumero.'," },
                                { type: 'add', content: "    );" },
                                { type: 'add', content: "    $messages['spam'] = array(" },
                                { type: 'add', content: "        'description' => 'Roskaposti'," },
                                { type: 'add', content: "        'default'     => 'Viestiä ei voitu lähettää. Yritä uudelleen.'," },
                                { type: 'add', content: "    );" },
                                { type: 'add', content: "    return $messages;" },
                                { type: 'add', content: "});" },
                            ]
                        }
                    ]
                }
            ]
        }
    },

    // === TIK-012 ===
    {
        id: 'TIK-012',
        title: 'Sosiaalisen median jakopainikkeet uutisiin',
        type: 'feature',
        priority: 'low',
        status: 'approved',
        agencyId: 'rikos',
        page: 'Ajankohtaista',
        section: 'Yksittäinen uutinen',
        createdAt: '2026-04-08',
        customerName: 'Henna Virtanen',
        customerEmail: 'henna.virtanen@rikosseuraamuslaitos.fi',
        customerRole: 'Viestintäkoordinaattori',
        conversation: [
            { role: 'customer', text: 'Olisi hyvä jos uutisartikkeleissa olisi jakopainikkeet Facebookiin, X:ään ja LinkedIniin. Nyt uutisia on hankala jakaa.', ts: '2026-04-08 10:30' },
            { role: 'agent', text: 'Hei Henna! Tämä on ominaisuuspyyntö. Jakopainikkeet on toteutettavissa kevyenä lisäyksenä ilman raskaita some-plugineja – käytetään natiiveja share-URL:eja. Haluatko, että lisään myös sähköpostijaon ja "kopioi linkki" -painikkeen?', ts: '2026-04-08 10:31' },
            { role: 'customer', text: 'Kyllä, ne ovat hyviä lisäyksiä. Kopioi linkki -painike olisi erityisen kätevä.', ts: '2026-04-08 10:33' },
            { role: 'agent', text: 'Selvä! Luon kehityspyynnön. Toteutus käyttää natiiveja jakoluokkia ilman kolmannen osapuolen riippuvuuksia, mikä on tietosuojan kannalta hyvä ratkaisu.', ts: '2026-04-08 10:34' },
        ],
        diff: {
            branch: 'feat/TIK-012-social-share-buttons',
            summary: 'Lisää tietosuojaystävälliset sosiaalisen median jakopainikkeet uutissivuille',
            files: [
                {
                    path: 'wp-content/themes/om-virasto/template-parts/social-share.php',
                    type: 'added',
                    hunks: [
                        {
                            header: '@@ -0,0 +1,32 @@',
                            lines: [
                                { type: 'add', content: "<?php" },
                                { type: 'add', content: "$url = urlencode(get_permalink());" },
                                { type: 'add', content: "$title = urlencode(get_the_title());" },
                                { type: 'add', content: "?>" },
                                { type: 'add', content: '<div class="social-share" aria-label="<?php esc_attr_e(\'Jaa artikkeli\', \'om-virasto\'); ?>">' },
                                { type: 'add', content: '    <span class="social-share__label"><?php _e(\'Jaa:\', \'om-virasto\'); ?></span>' },
                                { type: 'add', content: '    <a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo $url; ?>"' },
                                { type: 'add', content: '       target="_blank" rel="noopener" class="social-share__link social-share__link--facebook"' },
                                { type: 'add', content: '       aria-label="Jaa Facebookissa">Facebook</a>' },
                                { type: 'add', content: '    <a href="https://x.com/intent/tweet?url=<?php echo $url; ?>&text=<?php echo $title; ?>"' },
                                { type: 'add', content: '       target="_blank" rel="noopener" class="social-share__link social-share__link--x"' },
                                { type: 'add', content: '       aria-label="Jaa X:ssä">X</a>' },
                                { type: 'add', content: '    <a href="https://www.linkedin.com/shareArticle?mini=true&url=<?php echo $url; ?>"' },
                                { type: 'add', content: '       target="_blank" rel="noopener" class="social-share__link social-share__link--linkedin"' },
                                { type: 'add', content: '       aria-label="Jaa LinkedInissä">LinkedIn</a>' },
                                { type: 'add', content: '    <button class="social-share__link social-share__link--copy" data-url="<?php echo esc_url(get_permalink()); ?>"' },
                                { type: 'add', content: '       aria-label="Kopioi linkki">Kopioi linkki</button>' },
                                { type: 'add', content: '</div>' },
                            ]
                        }
                    ]
                }
            ]
        }
    },

    // === TIK-013 ===
    {
        id: 'TIK-013',
        title: 'Evästebanneri peittää pääsisällön mobiilissa',
        type: 'bug',
        priority: 'high',
        status: 'approved',
        agencyId: 'ulos',
        page: 'Kaikki sivut',
        section: 'Evästebanneri',
        createdAt: '2026-04-08',
        customerName: 'Petri Aaltonen',
        customerEmail: 'petri.aaltonen@ulosottolaitos.fi',
        customerRole: 'Verkkopalveluasiantuntija',
        conversation: [
            { role: 'customer', text: 'Evästeiden hyväksymisbanneri peittää mobiilissa lähes koko näytön eikä sisältöä pääse lukemaan. Scrollaus on myös estetty bannerin takana.', ts: '2026-04-08 14:00' },
            { role: 'agent', text: 'Hei Petri! Tämä on vakava käytettävyysbugi. Evästebannerin CSS estää body-elementin scrollauksen ja bannerin korkeus on liian suuri pienillä näytöillä. Korjaus vaatii bannerin responsive-tyylin päivittämistä.', ts: '2026-04-08 14:01' },
            { role: 'customer', text: 'Kyllä, tämä on häirinnyt monia asiakkaitamme. Monet soittavat asiakaspalveluun koska eivät pääse käyttämään palvelua puhelimella.', ts: '2026-04-08 14:03' },
            { role: 'agent', text: 'Ymmärrän, tämä estää palvelun käytön kokonaan. Luon korkean prioriteetin tiketin. Korjaus optimoi bannerin koon mobiilissa ja poistaa scroll-lukituksen.', ts: '2026-04-08 14:04' },
        ],
        diff: {
            branch: 'fix/TIK-013-cookie-banner-mobile',
            summary: 'Korjaa evästebannerin koko ja scrollaus mobiililaitteilla',
            files: [
                {
                    path: 'wp-content/themes/om-virasto/assets/css/components/_cookie-consent.scss',
                    type: 'modified',
                    hunks: [
                        {
                            header: '@@ -12,14 +12,22 @@ .cookie-consent {',
                            lines: [
                                { type: 'context', content: "    position: fixed;" },
                                { type: 'context', content: "    bottom: 0;" },
                                { type: 'context', content: "    left: 0;" },
                                { type: 'context', content: "    right: 0;" },
                                { type: 'remove', content: "    padding: 2rem;" },
                                { type: 'remove', content: "    background: #1a1a2e;" },
                                { type: 'add', content: "    padding: 1rem 1.5rem;" },
                                { type: 'add', content: "    background: rgba(26, 26, 46, 0.98);" },
                                { type: 'context', content: "    color: #fff;" },
                                { type: 'context', content: "    z-index: 9999;" },
                                { type: 'add', content: "    max-height: 40vh;" },
                                { type: 'add', content: "    overflow-y: auto;" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "    @media (max-width: 640px) {" },
                                { type: 'add', content: "        max-height: 50vh;" },
                                { type: 'add', content: "        padding: 0.75rem 1rem;" },
                                { type: 'add', content: "        font-size: 0.85rem;" },
                                { type: 'add', content: "    }" },
                                { type: 'context', content: "}" },
                            ]
                        }
                    ]
                },
                {
                    path: 'wp-content/themes/om-virasto/assets/js/cookie-consent.js',
                    type: 'modified',
                    hunks: [
                        {
                            header: '@@ -8,7 +8,7 @@ const CookieConsent = {',
                            lines: [
                                { type: 'context', content: "    show() {" },
                                { type: 'context', content: "        this.banner.classList.add('is-visible');" },
                                { type: 'remove', content: "        document.body.style.overflow = 'hidden';" },
                                { type: 'add', content: "        // Ei estetä body scrollausta – käyttäjä voi selata bannerin taustalla" },
                                { type: 'context', content: "    }," },
                            ]
                        }
                    ]
                }
            ]
        }
    },

    // === TIK-014 ===
    {
        id: 'TIK-014',
        title: 'Uutisarkiston sivutus näyttää väärin sivumäärän',
        type: 'bug',
        priority: 'medium',
        status: 'approved',
        agencyId: 'ork',
        page: 'Ajankohtaista',
        section: 'Uutisarkisto',
        createdAt: '2026-04-09',
        customerName: 'Ville Koivisto',
        customerEmail: 'ville.koivisto@oikeusrekisterikeskus.fi',
        customerRole: 'Tiedottaja',
        conversation: [
            { role: 'customer', text: 'Uutisarkiston sivutus näyttää 15 sivua, mutta sivuilta 8 eteenpäin tulee 404-virhe. Meillä on noin 200 uutista.', ts: '2026-04-09 09:00' },
            { role: 'agent', text: 'Hei Ville! Tämä on bugi sivutuslogiikassa. WP_Queryn posts_per_page ja sivutuksen max_num_pages eivät ole synkassa. Todennäköisesti uutisten custom query yliajaa pää-queryn sivutusasetukset.', ts: '2026-04-09 09:02' },
            { role: 'customer', text: 'Juurikin näin. Voitteko korjata tämän?', ts: '2026-04-09 09:03' },
            { role: 'agent', text: 'Totta kai. Luon tiketin – korjaus kohdistuu archive-news.php -templaten WP_Query-asetuksiin ja sivutuskomponenttiin.', ts: '2026-04-09 09:04' },
        ],
        diff: {
            branch: 'fix/TIK-014-news-pagination',
            summary: 'Korjaa uutisarkiston sivutuslogiikka ja WP_Query-asetukset',
            files: [
                {
                    path: 'wp-content/themes/om-virasto/archive-news.php',
                    type: 'modified',
                    hunks: [
                        {
                            header: '@@ -8,11 +8,13 @@ get_header();',
                            lines: [
                                { type: 'context', content: "$paged = get_query_var('paged') ? get_query_var('paged') : 1;" },
                                { type: 'remove', content: "$news_query = new WP_Query(array(" },
                                { type: 'remove', content: "    'post_type'      => 'post'," },
                                { type: 'remove', content: "    'posts_per_page'  => 30," },
                                { type: 'remove', content: "));" },
                                { type: 'add', content: "$news_query = new WP_Query(array(" },
                                { type: 'add', content: "    'post_type'      => 'post'," },
                                { type: 'add', content: "    'category_name'  => 'uutiset'," },
                                { type: 'add', content: "    'posts_per_page' => 20," },
                                { type: 'add', content: "    'paged'          => $paged," },
                                { type: 'add', content: "));" },
                                { type: 'context', content: "" },
                                { type: 'context', content: "if ($news_query->have_posts()) :" },
                            ]
                        }
                    ]
                }
            ]
        }
    },

    // === TIK-015 ===
    {
        id: 'TIK-015',
        title: 'Hakusuodattimet päätöskategorioittain',
        type: 'feature',
        priority: 'medium',
        status: 'approved',
        agencyId: 'tietosuoja',
        page: 'Päätökset',
        section: 'Hakutoiminto',
        createdAt: '2026-04-09',
        customerName: 'Elina Järvinen',
        customerEmail: 'elina.jarvinen@tietosuoja.fi',
        customerRole: 'Lakimies',
        conversation: [
            { role: 'customer', text: 'Päätösten hakuun tarvittaisiin suodattimet kategorian mukaan. Nyt on vaikea löytää tietynlaisia päätöksiä, esim. vain GDPR-artikla 83 mukaisia seuraamusmaksupäätöksiä.', ts: '2026-04-09 14:10' },
            { role: 'agent', text: 'Hei Elina! Tämä on kehityspyyntö hakutoiminnon laajentamiseksi. Suodattimet voisivat sisältää: päätöstyyppi, GDPR-artikla, vuosi, seuraamustyyppi. Onko tämä kattava lista?', ts: '2026-04-09 14:12' },
            { role: 'customer', text: 'Kyllä, noilla pärjää hyvin. Lisäksi olisi kätevä, jos suodattimia voisi yhdistää – esim. vuosi 2025 JA seuraamusmaksu.', ts: '2026-04-09 14:14' },
            { role: 'agent', text: 'Selvä, monivalintasuodatus toteutetaan. Luon kehityspyynnön joka sisältää taxonomy-pohjaiset suodattimet AJAX-haulla.', ts: '2026-04-09 14:15' },
        ],
        diff: {
            branch: 'feat/TIK-015-decision-search-filters',
            summary: 'Lisää päätösten hakusuodattimet kategorian, vuoden ja seuraamustyypin mukaan',
            files: [
                {
                    path: 'wp-content/themes/om-virasto/template-parts/decision-filters.php',
                    type: 'added',
                    hunks: [
                        {
                            header: '@@ -0,0 +1,30 @@',
                            lines: [
                                { type: 'add', content: '<form class="decision-filters" method="get" action="<?php echo get_post_type_archive_link(\'paatos\'); ?>">' },
                                { type: 'add', content: '    <div class="decision-filters__group">' },
                                { type: 'add', content: '        <label for="filter-type"><?php _e(\'Päätöstyyppi\', \'om-virasto\'); ?></label>' },
                                { type: 'add', content: "        <?php wp_dropdown_categories(array(" },
                                { type: 'add', content: "            'taxonomy'   => 'paatos_tyyppi'," },
                                { type: 'add', content: "            'name'       => 'paatos_tyyppi'," },
                                { type: 'add', content: "            'show_option_all' => __('Kaikki tyypit', 'om-virasto')," },
                                { type: 'add', content: "            'id'         => 'filter-type'," },
                                { type: 'add', content: "        )); ?>" },
                                { type: 'add', content: '    </div>' },
                                { type: 'add', content: '    <div class="decision-filters__group">' },
                                { type: 'add', content: '        <label for="filter-year"><?php _e(\'Vuosi\', \'om-virasto\'); ?></label>' },
                                { type: 'add', content: '        <select name="paatos_year" id="filter-year">' },
                                { type: 'add', content: "            <option value=\"\"><?php _e('Kaikki vuodet', 'om-virasto'); ?></option>" },
                                { type: 'add', content: "            <?php for ($y = date('Y'); $y >= 2018; $y--) : ?>" },
                                { type: 'add', content: '                <option value="<?php echo $y; ?>"><?php echo $y; ?></option>' },
                                { type: 'add', content: "            <?php endfor; ?>" },
                                { type: 'add', content: '        </select>' },
                                { type: 'add', content: '    </div>' },
                                { type: 'add', content: '    <button type="submit" class="decision-filters__submit">' },
                                { type: 'add', content: "        <?php _e('Suodata', 'om-virasto'); ?>" },
                                { type: 'add', content: '    </button>' },
                                { type: 'add', content: '</form>' },
                            ]
                        }
                    ]
                }
            ]
        }
    },

    // === TIK-016 ===
    {
        id: 'TIK-016',
        title: 'Haku ei löydä ruotsinkielistä sisältöä',
        type: 'bug',
        priority: 'medium',
        status: 'deployed',
        agencyId: 'tuomio',
        page: 'Etusivu',
        section: 'Hakutoiminto',
        createdAt: '2026-04-01',
        customerName: 'Maria Lindqvist',
        customerEmail: 'maria.lindqvist@tuomioistuinvirasto.fi',
        customerRole: 'Kielipalvelupäällikkö',
        conversation: [
            { role: 'customer', text: 'När jag söker på svenska hittas inga resultat. Till exempel "domstol" ger noll resultat fast vi har svensk text på sidan. Haun pitäisi löytää myös ruotsinkielinen sisältö.', ts: '2026-04-01 10:00' },
            { role: 'agent', text: 'Hei Maria! Tämä on bugi monikielisyyshaun konfiguraatiossa. Polylang-plugin ei indeksoi ruotsinkielisiä sivuja hakuun oikein. Tarkistin, ja ruotsinkielisten sivujen post_status on "publish" mutta ne eivät kuulu hakuindeksiin.', ts: '2026-04-01 10:02' },
            { role: 'customer', text: 'Tämä tulee korjata, meillä on lakisääteinen velvoite tarjota palvelut molemmilla kielillä.', ts: '2026-04-01 10:04' },
            { role: 'agent', text: 'Ymmärrän. Luon tiketin ja korjaus varmistaa, että Polylangin kieliversiot indeksoidaan oikein hakuun.', ts: '2026-04-01 10:05' },
        ],
        diff: {
            branch: 'fix/TIK-016-swedish-search',
            summary: 'Korjaa Polylang-haun kieliversioiden indeksointi',
            files: [
                {
                    path: 'wp-content/themes/om-virasto/inc/search-config.php',
                    type: 'modified',
                    hunks: [
                        {
                            header: '@@ -28,6 +28,12 @@ function om_multilang_search($query) {',
                            lines: [
                                { type: 'context', content: "    if ($query->is_search() && $query->is_main_query()) {" },
                                { type: 'add', content: "        // Varmista, että haku kohdistuu valitun kielen sisältöön" },
                                { type: 'add', content: "        $lang = pll_current_language();" },
                                { type: 'add', content: "        if ($lang) {" },
                                { type: 'add', content: "            $query->set('lang', $lang);" },
                                { type: 'add', content: "        }" },
                                { type: 'context', content: "    }" },
                                { type: 'context', content: "}" },
                            ]
                        }
                    ]
                }
            ]
        }
    },

    // === TIK-017 ===
    {
        id: 'TIK-017',
        title: 'Ylläpidon valikosta puuttuu Tilastot-kohta',
        type: 'bug',
        priority: 'low',
        status: 'deployed',
        agencyId: 'rikos',
        page: 'Admin',
        section: 'WP-hallinta',
        createdAt: '2026-04-01',
        customerName: 'Antti Kemppainen',
        customerEmail: 'antti.kemppainen@rikosseuraamuslaitos.fi',
        customerRole: 'Järjestelmäylläpitäjä',
        conversation: [
            { role: 'customer', text: 'WordPress-hallintapaneelin vasemmasta valikosta puuttuu Tilastot-kohta. Se oli siellä aiemmin mutta hävisi päivityksen jälkeen.', ts: '2026-04-01 08:45' },
            { role: 'agent', text: 'Hei Antti! Tarkistin admin-valikon rekisteröinnin. Tilastot-sivun menu-rekisteröinti jäi pois kun custom-admin-menu.php päivitettiin. Käyttäjäroolisi on admin, joten sinun pitäisi nähdä se. Tämä on bugi.', ts: '2026-04-01 08:47' },
            { role: 'customer', text: 'Okei, saatteko korjattua? Tarvitsen tilastoja viikkokatsauksia varten.', ts: '2026-04-01 08:48' },
            { role: 'agent', text: 'Tiketti luotu. Korjaus on nopea – lisätään puuttuva add_menu_page kutsu.', ts: '2026-04-01 08:49' },
        ],
        diff: {
            branch: 'fix/TIK-017-admin-stats-menu',
            summary: 'Palauta Tilastot-kohta admin-valikkoon',
            files: [
                {
                    path: 'wp-content/themes/om-virasto/inc/admin/custom-admin-menu.php',
                    type: 'modified',
                    hunks: [
                        {
                            header: '@@ -45,6 +45,15 @@ function om_register_admin_menus() {',
                            lines: [
                                { type: 'context', content: "    add_menu_page('Sisällönhallinta', 'Sisältö', 'edit_posts', 'om-content', 'om_content_page', 'dashicons-admin-page', 25);" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "    // Tilastot-sivu" },
                                { type: 'add', content: "    add_menu_page(" },
                                { type: 'add', content: "        'Tilastot'," },
                                { type: 'add', content: "        'Tilastot'," },
                                { type: 'add', content: "        'manage_options'," },
                                { type: 'add', content: "        'om-statistics'," },
                                { type: 'add', content: "        'om_statistics_page'," },
                                { type: 'add', content: "        'dashicons-chart-bar'," },
                                { type: 'add', content: "        30" },
                                { type: 'add', content: "    );" },
                                { type: 'context', content: "}" },
                            ]
                        }
                    ]
                }
            ]
        }
    },

    // === TIK-018 ===
    {
        id: 'TIK-018',
        title: 'XML-sivukartan automaattinen generointi',
        type: 'feature',
        priority: 'low',
        status: 'deployed',
        agencyId: 'ulos',
        page: 'Kaikki sivut',
        section: 'SEO',
        createdAt: '2026-04-02',
        customerName: 'Janne Hämäläinen',
        customerEmail: 'janne.hamalainen@ulosottolaitos.fi',
        customerRole: 'Digipalveluvastaava',
        conversation: [
            { role: 'customer', text: 'Tarvitsisimme automaattisen XML-sivukartan generoinnin. Google Search Console valittaa puuttuvasta sivukartasta.', ts: '2026-04-02 11:00' },
            { role: 'agent', text: 'Hei Janne! WordPress 5.5+ sisältää natiivin XML-sivukartan (wp-sitemap.xml), mutta teemassanne se on ilmeisesti deaktivoitu. Tämä on ominaisuuspyyntö – aktivoidaan natiivin sivukartta ja lisätään Yoast SEO:n laajennettu sivukartta.', ts: '2026-04-02 11:02' },
            { role: 'customer', text: 'Selvä, kunhan se sisältää kaikki julkaistut sivut ja uutiset.', ts: '2026-04-02 11:03' },
            { role: 'agent', text: 'Kyllä, Yoastin sivukartta kattaa kaikki post typet. Tiketti luotu.', ts: '2026-04-02 11:04' },
        ],
        diff: {
            branch: 'feat/TIK-018-xml-sitemap',
            summary: 'Aktivoi ja konfiguroi XML-sivukartta Yoast SEO:lla',
            files: [
                {
                    path: 'wp-content/themes/om-virasto/functions.php',
                    type: 'modified',
                    hunks: [
                        {
                            header: '@@ -202,8 +202,6 @@ function om_theme_support() {',
                            lines: [
                                { type: 'context', content: "    add_theme_support('responsive-embeds');" },
                                { type: 'remove', content: "    // Deaktivoi WP:n natiivi sivukartta" },
                                { type: 'remove', content: "    remove_action('init', 'wp_sitemaps_get_server');" },
                                { type: 'context', content: "}" },
                            ]
                        }
                    ]
                }
            ]
        }
    },

    // === TIK-019 ===
    {
        id: 'TIK-019',
        title: 'Rekisterit-arkistosivu palauttaa 404-virheen',
        type: 'bug',
        priority: 'high',
        status: 'in_progress',
        agencyId: 'ork',
        page: 'Rekisterit',
        section: 'Arkistosivu',
        createdAt: '2026-04-10',
        customerName: 'Tuomas Rantala',
        customerEmail: 'tuomas.rantala@oikeusrekisterikeskus.fi',
        customerRole: 'Rekisterinpitäjä',
        conversation: [
            { role: 'customer', text: 'oikeusrekisterikeskus.fi/rekisterit/ palauttaa 404-sivun. Aiemmin siellä oli lista kaikista ylläpitämistämme rekistereistä.', ts: '2026-04-10 08:30' },
            { role: 'agent', text: 'Hei Tuomas! Tämä on bugi custom post type -arkiston rewrite-säännöissä. "Rekisteri"-posttyypin has_archive asetus on muuttunut false-tilaan, mikä poistaa arkistosivun. Todennäköisesti tämä tapahtui pluginin päivityksen yhteydessä.', ts: '2026-04-10 08:32' },
            { role: 'customer', text: 'Tämä sivu on yksi sivustomme tärkeimmistä. Lähes kaikki käyttäjät tulevat sinne.', ts: '2026-04-10 08:33' },
            { role: 'agent', text: 'Ymmärrän – korkea prioriteetti. Tiketti luotu. Korjaus palauttaa arkiston ja flushaa rewrite-säännöt.', ts: '2026-04-10 08:34' },
        ],
        diff: {
            branch: 'fix/TIK-019-rekisterit-archive-404',
            summary: 'Palauta Rekisterit-arkistosivu korjaamalla CPT:n has_archive asetus',
            files: [
                {
                    path: 'wp-content/plugins/om-rekisterit/om-rekisterit.php',
                    type: 'modified',
                    hunks: [
                        {
                            header: '@@ -32,7 +32,7 @@ function om_register_rekisteri_cpt() {',
                            lines: [
                                { type: 'context', content: "    register_post_type('rekisteri', array(" },
                                { type: 'context', content: "        'labels'       => $labels," },
                                { type: 'context', content: "        'public'       => true," },
                                { type: 'remove', content: "        'has_archive'  => false," },
                                { type: 'add', content: "        'has_archive'  => 'rekisterit'," },
                                { type: 'context', content: "        'rewrite'      => array('slug' => 'rekisterit', 'with_front' => false)," },
                                { type: 'context', content: "        'supports'     => array('title', 'editor', 'thumbnail', 'custom-fields')," },
                                { type: 'context', content: "        'show_in_rest' => true," },
                            ]
                        }
                    ]
                },
                {
                    path: 'wp-content/plugins/om-rekisterit/om-rekisterit.php',
                    type: 'modified',
                    hunks: [
                        {
                            header: '@@ -55,6 +55,10 @@ function om_register_rekisteri_cpt() {',
                            lines: [
                                { type: 'context', content: "    ));" },
                                { type: 'context', content: "}" },
                                { type: 'context', content: "add_action('init', 'om_register_rekisteri_cpt');" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "// Flush rewrite rules aktivoinnin yhteydessä" },
                                { type: 'add', content: "register_activation_hook(__FILE__, function() {" },
                                { type: 'add', content: "    om_register_rekisteri_cpt();" },
                                { type: 'add', content: "    flush_rewrite_rules();" },
                                { type: 'add', content: "});" },
                            ]
                        }
                    ]
                }
            ]
        }
    },

    // === TIK-020 ===
    {
        id: 'TIK-020',
        title: 'UKK-sivun haitarielementti (accordion)',
        type: 'feature',
        priority: 'medium',
        status: 'in_progress',
        agencyId: 'tietosuoja',
        page: 'UKK',
        section: 'Sisältöelementit',
        createdAt: '2026-04-11',
        customerName: 'Saara Mäkelä',
        customerEmail: 'saara.makela@tietosuoja.fi',
        customerRole: 'Viestintäsuunnittelija',
        conversation: [
            { role: 'customer', text: 'UKK-sivulla kaikki kysymykset ja vastaukset näkyvät pitkänä listana. Olisi paljon käytettävämpää, jos vastaukset olisivat piilossa ja avautuisivat klikkaamalla kysymystä (accordion/haitari).', ts: '2026-04-11 10:40' },
            { role: 'agent', text: 'Hei Saara! Tämä on hyvä ominaisuuspyyntö. Haitarielementti parantaisi sekä käytettävyyttä että saavutettavuutta. Toteutettaisiin HTML5 details/summary -elementeillä, jolloin se toimii myös ilman JavaScriptiä. Luodaanko tiketti?', ts: '2026-04-11 10:42' },
            { role: 'customer', text: 'Kyllä, ehdottomasti. Ja olisi hyvä, jos hallintapaneelissa olisi helppo lisätä uusia kysymyksiä.', ts: '2026-04-11 10:43' },
            { role: 'agent', text: 'Toteutus tehdään ACF-repeater-kentällä, joten uusien kysymysten lisääminen hallintapaneelista on helppoa. Tiketti luotu.', ts: '2026-04-11 10:44' },
        ],
        diff: {
            branch: 'feat/TIK-020-faq-accordion',
            summary: 'Lisää saavutettava haitarielementti UKK-sivulle details/summary-elementeillä',
            files: [
                {
                    path: 'wp-content/themes/om-virasto/template-parts/faq-accordion.php',
                    type: 'added',
                    hunks: [
                        {
                            header: '@@ -0,0 +1,24 @@',
                            lines: [
                                { type: 'add', content: "<?php" },
                                { type: 'add', content: "$faqs = get_field('ukk_kysymykset');" },
                                { type: 'add', content: "if (!$faqs) return;" },
                                { type: 'add', content: "?>" },
                                { type: 'add', content: '<div class="faq-accordion" itemscope itemtype="https://schema.org/FAQPage">' },
                                { type: 'add', content: "    <?php foreach ($faqs as $i => $faq) : ?>" },
                                { type: 'add', content: '    <details class="faq-accordion__item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">' },
                                { type: 'add', content: '        <summary class="faq-accordion__question" itemprop="name">' },
                                { type: 'add', content: "            <?php echo esc_html($faq['kysymys']); ?>" },
                                { type: 'add', content: '        </summary>' },
                                { type: 'add', content: '        <div class="faq-accordion__answer" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">' },
                                { type: 'add', content: '            <div itemprop="text">' },
                                { type: 'add', content: "                <?php echo wp_kses_post($faq['vastaus']); ?>" },
                                { type: 'add', content: "            </div>" },
                                { type: 'add', content: "        </div>" },
                                { type: 'add', content: "    </details>" },
                                { type: 'add', content: "    <?php endforeach; ?>" },
                                { type: 'add', content: "</div>" },
                            ]
                        }
                    ]
                },
                {
                    path: 'wp-content/themes/om-virasto/assets/css/components/_faq-accordion.scss',
                    type: 'added',
                    hunks: [
                        {
                            header: '@@ -0,0 +1,28 @@',
                            lines: [
                                { type: 'add', content: ".faq-accordion {" },
                                { type: 'add', content: "    max-width: 800px;" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "    &__item {" },
                                { type: 'add', content: "        border-bottom: 1px solid #e0e0e0;" },
                                { type: 'add', content: "        padding: 0;" },
                                { type: 'add', content: "    }" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "    &__question {" },
                                { type: 'add', content: "        padding: 1rem 0;" },
                                { type: 'add', content: "        font-weight: 600;" },
                                { type: 'add', content: "        cursor: pointer;" },
                                { type: 'add', content: "        list-style: none;" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "        &::marker," },
                                { type: 'add', content: "        &::-webkit-details-marker {" },
                                { type: 'add', content: "            display: none;" },
                                { type: 'add', content: "        }" },
                                { type: 'add', content: "    }" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "    &__answer {" },
                                { type: 'add', content: "        padding: 0 0 1rem;" },
                                { type: 'add', content: "        line-height: 1.6;" },
                                { type: 'add', content: "        color: #555;" },
                                { type: 'add', content: "    }" },
                                { type: 'add', content: "}" },
                            ]
                        }
                    ]
                }
            ]
        }
    },

    // === TIK-021 ===
    {
        id: 'TIK-021',
        title: 'Istuntokalenteri-widget tuomioistuinsivulle',
        type: 'feature',
        priority: 'medium',
        status: 'in_progress',
        agencyId: 'tuomio',
        page: 'Istuntokalenteri',
        section: 'Kalenterinäkymä',
        createdAt: '2026-04-12',
        customerName: 'Kari Nurmi',
        customerEmail: 'kari.nurmi@tuomioistuinvirasto.fi',
        customerRole: 'Käräjäsihteeri',
        conversation: [
            { role: 'customer', text: 'Istuntokalenteri-sivulle tarvittaisiin visuaalinen kalenterinäkymä istuntoaikatauluista. Nyt ne ovat vain tekstilistana.', ts: '2026-04-12 09:00' },
            { role: 'agent', text: 'Hei Kari! Tämä olisi uusi ominaisuus. Voisimme toteuttaa interaktiivisen kalenterinäkymän jossa istuntoajat näkyvät kuukausinäkymässä ja päiväkohtaisessa listanäkymässä. Haluaisitko suodatuksen tuomioistuimen mukaan?', ts: '2026-04-12 09:02' },
            { role: 'customer', text: 'Kyllä, suodatus tuomioistuimen ja asian tyypin mukaan olisi erittäin hyödyllinen.', ts: '2026-04-12 09:04' },
            { role: 'agent', text: 'Luon kehityspyynnön. Kalenteri toteutetaan FullCalendar-kirjastolla ja data haetaan WP REST API:n kautta.', ts: '2026-04-12 09:05' },
        ],
        diff: {
            branch: 'feat/TIK-021-session-calendar',
            summary: 'Lisää interaktiivinen istuntokalenteri FullCalendar-kirjastolla',
            files: [
                {
                    path: 'wp-content/themes/om-virasto/template-parts/session-calendar.php',
                    type: 'added',
                    hunks: [
                        {
                            header: '@@ -0,0 +1,18 @@',
                            lines: [
                                { type: 'add', content: "<?php" },
                                { type: 'add', content: "wp_enqueue_script('fullcalendar', 'https://cdn.jsdelivr.net/npm/fullcalendar@6/index.global.min.js', array(), '6.1', true);" },
                                { type: 'add', content: "wp_enqueue_script('om-calendar', get_template_directory_uri() . '/assets/js/session-calendar.js', array('fullcalendar'), OM_VERSION, true);" },
                                { type: 'add', content: "wp_localize_script('om-calendar', 'omCalendar', array(" },
                                { type: 'add', content: "    'apiUrl' => rest_url('om/v1/sessions')," },
                                { type: 'add', content: "    'nonce'  => wp_create_nonce('wp_rest')," },
                                { type: 'add', content: "));" },
                                { type: 'add', content: "?>" },
                                { type: 'add', content: '<div class="session-calendar">' },
                                { type: 'add', content: '    <div class="session-calendar__filters">' },
                                { type: 'add', content: '        <select id="court-filter" aria-label="Suodata tuomioistuimen mukaan">' },
                                { type: 'add', content: "            <option value=\"\">Kaikki tuomioistuimet</option>" },
                                { type: 'add', content: "        </select>" },
                                { type: 'add', content: "    </div>" },
                                { type: 'add', content: '    <div id="session-calendar-root"></div>' },
                                { type: 'add', content: "</div>" },
                            ]
                        }
                    ]
                }
            ]
        }
    },

    // === TIK-022 ===
    {
        id: 'TIK-022',
        title: 'REST API /wp-json/om/v1/stats palauttaa 500-virheen',
        type: 'bug',
        priority: 'high',
        status: 'in_progress',
        agencyId: 'rikos',
        page: 'API',
        section: 'REST API',
        createdAt: '2026-04-13',
        customerName: 'Mikko Lehto',
        customerEmail: 'mikko.lehto@rikosseuraamuslaitos.fi',
        customerRole: 'Sovelluskehittäjä',
        conversation: [
            { role: 'customer', text: 'REST API endpoint /wp-json/om/v1/stats palauttaa 500 Internal Server Error. Tarvitsemme tätä endpointia intranet-dashboardin tilastokomponnettia varten.', ts: '2026-04-13 14:20' },
            { role: 'agent', text: 'Hei Mikko! Tarkistin API-endpointin – virheen syy on tyyppivirhe callback-funktiossa. Funktio kutsuu get_field()-metodia ilman toista parametria, jolloin se yrittää hakea kenttää olemattomasta post-objektista. Tämä on bugi.', ts: '2026-04-13 14:22' },
            { role: 'customer', text: 'Selvä, saatteko korjattua? Dashboard on rikki tämän takia.', ts: '2026-04-13 14:23' },
            { role: 'agent', text: 'Kyllä, tiketti luotu korkealla prioriteetilla. Korjaus lisää puuttuvan options-kontekstin get_field() -kutsuun.', ts: '2026-04-13 14:24' },
        ],
        diff: {
            branch: 'fix/TIK-022-rest-api-500',
            summary: 'Korjaa REST API stats-endpointin 500-virhe lisäämällä oikea ACF-konteksti',
            files: [
                {
                    path: 'wp-content/plugins/om-api/endpoints/class-stats-endpoint.php',
                    type: 'modified',
                    hunks: [
                        {
                            header: '@@ -28,10 +28,14 @@ class OM_Stats_Endpoint {',
                            lines: [
                                { type: 'context', content: "    public function get_stats(WP_REST_Request $request) {" },
                                { type: 'remove', content: "        $total_inmates   = get_field('total_inmates');" },
                                { type: 'remove', content: "        $total_community = get_field('total_community');" },
                                { type: 'remove', content: "        $total_prisons   = get_field('total_prisons');" },
                                { type: 'add', content: "        $total_inmates   = get_field('total_inmates', 'option');" },
                                { type: 'add', content: "        $total_community = get_field('total_community', 'option');" },
                                { type: 'add', content: "        $total_prisons   = get_field('total_prisons', 'option');" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "        if ($total_inmates === null) {" },
                                { type: 'add', content: "            return new WP_Error('no_data', 'Tilastotietoja ei löytynyt', array('status' => 404));" },
                                { type: 'add', content: "        }" },
                                { type: 'context', content: "" },
                                { type: 'context', content: "        return new WP_REST_Response(array(" },
                            ]
                        }
                    ]
                }
            ]
        }
    },

    // === TIK-023 ===
    {
        id: 'TIK-023',
        title: 'Tumma tila (dark mode) saavutettavuuden tueksi',
        type: 'feature',
        priority: 'low',
        status: 'new',
        agencyId: 'ulos',
        page: 'Kaikki sivut',
        section: 'Teema',
        createdAt: '2026-04-14',
        customerName: 'Leena Peltola',
        customerEmail: 'leena.peltola@ulosottolaitos.fi',
        customerRole: 'Saavutettavuusasiantuntija',
        conversation: [
            { role: 'customer', text: 'Monet käyttäjämme toivovat tummaa tilaa. Se auttaisi erityisesti näkövammaisia ja henkilöitä joilla on silmien rasitusta. Olisiko mahdollista lisätä dark mode -tuki?', ts: '2026-04-14 10:15' },
            { role: 'agent', text: 'Hei Leena! Tämä on hyvä saavutettavuuteen liittyvä kehityspyyntö. Dark mode voidaan toteuttaa CSS custom properties -muuttujilla ja prefers-color-scheme media queryllä. Haluatko myös manuaalisen kytkimen, jolla käyttäjä voi valita tilan?', ts: '2026-04-14 10:17' },
            { role: 'customer', text: 'Kyllä, manuaalinen kytkin on ehdottoman tärkeä. Pelkkä järjestelmäasetuksen seuraaminen ei riitä, koska kaikki käyttäjät eivät tiedä miten sen asettaa.', ts: '2026-04-14 10:19' },
            { role: 'agent', text: 'Ymmärrän. Tiketti luotu kehityspyyntönä. Toteutus sisältää järjestelmäasetuksen tunnistuksen, manuaalisen kytkimen ja käyttäjän valinnan tallennuksen localStorageen.', ts: '2026-04-14 10:20' },
        ],
        diff: {
            branch: 'feat/TIK-023-dark-mode',
            summary: 'Lisää tumma tila CSS-muuttujilla, manuaalisella kytkimellä ja järjestelmäasetuksen tunnistuksella',
            files: [
                {
                    path: 'wp-content/themes/om-virasto/assets/css/base/_dark-mode.scss',
                    type: 'added',
                    hunks: [
                        {
                            header: '@@ -0,0 +1,22 @@',
                            lines: [
                                { type: 'add', content: "[data-theme='dark'] {" },
                                { type: 'add', content: "    --color-bg: #1a1a2e;" },
                                { type: 'add', content: "    --color-surface: #242442;" },
                                { type: 'add', content: "    --color-text: #e0e0e0;" },
                                { type: 'add', content: "    --color-text-muted: #a0a0b0;" },
                                { type: 'add', content: "    --color-border: #3a3a5c;" },
                                { type: 'add', content: "    --color-primary: #6c8cff;" },
                                { type: 'add', content: "    --color-link: #8cacff;" },
                                { type: 'add', content: "}" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "@media (prefers-color-scheme: dark) {" },
                                { type: 'add', content: "    :root:not([data-theme='light']) {" },
                                { type: 'add', content: "        --color-bg: #1a1a2e;" },
                                { type: 'add', content: "        --color-surface: #242442;" },
                                { type: 'add', content: "        --color-text: #e0e0e0;" },
                                { type: 'add', content: "        --color-text-muted: #a0a0b0;" },
                                { type: 'add', content: "        --color-border: #3a3a5c;" },
                                { type: 'add', content: "        --color-primary: #6c8cff;" },
                                { type: 'add', content: "        --color-link: #8cacff;" },
                                { type: 'add', content: "    }" },
                                { type: 'add', content: "}" },
                            ]
                        }
                    ]
                },
                {
                    path: 'wp-content/themes/om-virasto/assets/js/dark-mode.js',
                    type: 'added',
                    hunks: [
                        {
                            header: '@@ -0,0 +1,16 @@',
                            lines: [
                                { type: 'add', content: "const ThemeToggle = {" },
                                { type: 'add', content: "    init() {" },
                                { type: 'add', content: "        const saved = localStorage.getItem('om-theme');" },
                                { type: 'add', content: "        if (saved) document.documentElement.setAttribute('data-theme', saved);" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "        document.querySelector('.theme-toggle')?.addEventListener('click', () => {" },
                                { type: 'add', content: "            const current = document.documentElement.getAttribute('data-theme');" },
                                { type: 'add', content: "            const next = current === 'dark' ? 'light' : 'dark';" },
                                { type: 'add', content: "            document.documentElement.setAttribute('data-theme', next);" },
                                { type: 'add', content: "            localStorage.setItem('om-theme', next);" },
                                { type: 'add', content: "        });" },
                                { type: 'add', content: "    }" },
                                { type: 'add', content: "};" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "document.addEventListener('DOMContentLoaded', () => ThemeToggle.init());" },
                            ]
                        }
                    ]
                }
            ]
        }
    },

    // === TIK-024 ===
    {
        id: 'TIK-024',
        title: 'Mediatiedostojen latauskoko rajoitettu 2 megatavuun',
        type: 'bug',
        priority: 'medium',
        status: 'new',
        agencyId: 'ork',
        page: 'Admin',
        section: 'Mediakirjasto',
        createdAt: '2026-04-15',
        customerName: 'Helena Koivunen',
        customerEmail: 'helena.koivunen@oikeusrekisterikeskus.fi',
        customerRole: 'Viestintäassistentti',
        conversation: [
            { role: 'customer', text: 'En pysty lataamaan PDF-tiedostoja mediakirjastoon. Saan virheen "tiedosto ylittää sallitun koon". Tiedostomme ovat yleensä 5-15 MB.', ts: '2026-04-15 11:00' },
            { role: 'agent', text: 'Hei Helena! Tämä johtuu PHP:n upload_max_filesize -asetuksesta joka on 2M. Tämä on palvelimen konfiguraatio-ongelma, ei WordPress-bugi, mutta voimme korjata sen .htaccess-tiedostossa tai php.ini:ssä.', ts: '2026-04-15 11:02' },
            { role: 'customer', text: 'Pystyttekö korjaamaan? Meillä on kiire saada vuosikatsaus julkaistua ja se on 12 MB PDF.', ts: '2026-04-15 11:03' },
            { role: 'agent', text: 'Totta kai. Tiketti luotu. Nostetaan raja 64 megatavuun, mikä riittää tyypillisille asiakirjoille.', ts: '2026-04-15 11:04' },
        ],
        diff: {
            branch: 'fix/TIK-024-upload-size-limit',
            summary: 'Nosta tiedoston latauskokorajoitus 2MB:stä 64MB:hen',
            files: [
                {
                    path: '.htaccess',
                    type: 'modified',
                    hunks: [
                        {
                            header: '@@ -12,6 +12,12 @@ RewriteRule . /index.php [L]',
                            lines: [
                                { type: 'context', content: "</IfModule>" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "# Nosta tiedostojen latauskokorajoitusta" },
                                { type: 'add', content: "php_value upload_max_filesize 64M" },
                                { type: 'add', content: "php_value post_max_size 64M" },
                                { type: 'add', content: "php_value max_execution_time 300" },
                                { type: 'add', content: "php_value max_input_time 300" },
                                { type: 'context', content: "" },
                            ]
                        }
                    ]
                },
                {
                    path: 'wp-content/themes/om-virasto/functions.php',
                    type: 'modified',
                    hunks: [
                        {
                            header: '@@ -230,6 +230,12 @@',
                            lines: [
                                { type: 'context', content: "add_action('after_setup_theme', 'om_theme_support');" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "// WordPress-tason upload-rajoitus (varmuus .htaccess-asetuksen lisäksi)" },
                                { type: 'add', content: "add_filter('upload_size_limit', function() {" },
                                { type: 'add', content: "    return 64 * 1024 * 1024; // 64 MB" },
                                { type: 'add', content: "});" },
                                { type: 'context', content: "" },
                            ]
                        }
                    ]
                }
            ]
        }
    },

    // === TIK-025 ===
    {
        id: 'TIK-025',
        title: 'Huoltokatkoilmoitusbanneri ylläpidolle',
        type: 'feature',
        priority: 'low',
        status: 'new',
        agencyId: 'tietosuoja',
        page: 'Kaikki sivut',
        section: 'Ilmoitukset',
        createdAt: '2026-04-16',
        customerName: 'Tiina Virtanen',
        customerEmail: 'tiina.virtanen@tietosuoja.fi',
        customerRole: 'Tietohallintopäällikkö',
        conversation: [
            { role: 'customer', text: 'Tarvitsisimme ylläpidosta hallittavan banneritoiminnon jolla voidaan ilmoittaa käyttäjille tulevista huoltokatkoista tai häiriöistä. Nyt joudumme muokkaamaan teeman koodia suoraan.', ts: '2026-04-16 08:00' },
            { role: 'agent', text: 'Hei Tiina! Tämä on ominaisuuspyyntö. Toteutettavissa ACF-options-sivuna, jossa ylläpitäjä voi asettaa bannerin tekstin, tyypin (info/varoitus/kriittinen), alkamisajan ja päättymisajan. Banneri näkyisi automaattisesti asetetulla aikavälillä.', ts: '2026-04-16 08:02' },
            { role: 'customer', text: 'Se kuulostaa erinomaiselta. Juuri tuollaista tarvitsemme. Meidän ei pitäisi tarvita kehittäjää tällaisen perustoiminnon tekemiseen.', ts: '2026-04-16 08:04' },
            { role: 'agent', text: 'Aivan, tämä vähentää riippuvuutta kehittäjistä rutiinitehtävissä. Luon kehityspyynnön.', ts: '2026-04-16 08:05' },
        ],
        diff: {
            branch: 'feat/TIK-025-maintenance-banner',
            summary: 'Lisää ylläpidosta hallittava huoltokatkoilmoitusbanneri ACF-options-sivulla',
            files: [
                {
                    path: 'wp-content/themes/om-virasto/inc/maintenance-banner.php',
                    type: 'added',
                    hunks: [
                        {
                            header: '@@ -0,0 +1,38 @@',
                            lines: [
                                { type: 'add', content: "<?php" },
                                { type: 'add', content: "/**" },
                                { type: 'add', content: " * Huoltokatkoilmoitusbanneri" },
                                { type: 'add', content: " * Hallittavissa WP-admin > Asetukset > Ilmoitukset" },
                                { type: 'add', content: " */" },
                                { type: 'add', content: "function om_maintenance_banner() {" },
                                { type: 'add', content: "    $enabled = get_field('banner_enabled', 'option');" },
                                { type: 'add', content: "    if (!$enabled) return;" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "    $start = get_field('banner_start', 'option');" },
                                { type: 'add', content: "    $end   = get_field('banner_end', 'option');" },
                                { type: 'add', content: "    $now   = current_time('timestamp');" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "    if ($start && strtotime($start) > $now) return;" },
                                { type: 'add', content: "    if ($end && strtotime($end) < $now) return;" },
                                { type: 'add', content: "" },
                                { type: 'add', content: "    $text = get_field('banner_text', 'option');" },
                                { type: 'add', content: "    $type = get_field('banner_type', 'option') ?: 'info';" },
                                { type: 'add', content: "    $types = array('info' => 'notice--info', 'warning' => 'notice--warning', 'critical' => 'notice--critical');" },
                                { type: 'add', content: '    $class = $types[$type] ?? "notice--info";' },
                                { type: 'add', content: "    ?>" },
                                { type: 'add', content: '    <div class="site-notice <?php echo esc_attr($class); ?>" role="alert">' },
                                { type: 'add', content: '        <div class="site-notice__inner">' },
                                { type: 'add', content: "            <?php echo wp_kses_post($text); ?>" },
                                { type: 'add', content: "        </div>" },
                                { type: 'add', content: '        <button class="site-notice__close" aria-label="Sulje ilmoitus">&times;</button>' },
                                { type: 'add', content: "    </div>" },
                                { type: 'add', content: "    <?php" },
                                { type: 'add', content: "}" },
                                { type: 'add', content: "add_action('wp_body_open', 'om_maintenance_banner');" },
                            ]
                        }
                    ]
                }
            ]
        }
    },
];

// Chat-simulaation vastausmalleja
const chatResponses = {
    greeting: [
        'Hei! Olen pienkehitysagentti. Näen, että olet sivustolla {agency} kohdassa {page}. Miten voin auttaa?',
        'Tervetuloa! Toimin WordPress-tukiagenttina sivustolle {domain}. Kerro, miten voin olla avuksi.',
    ],
    bugConfirm: [
        'Tämä näyttää olevan bugi. {detail} Haluatko, että luon tästä tiketin korjausta varten?',
        'Selvä – tämä on tekninen ongelma joka vaatii korjausta. {detail} Luodaanko tiketti?',
    ],
    featureConfirm: [
        'Tämä on hyvä kehitysehdotus. {detail} Kyseessä ei ole bugi vaan uusi ominaisuus. Haluatko, että luon kehityspyynnön?',
        'Ymmärrän – toivoisit uutta toiminnallisuutta. {detail} Tämä toteutetaan kehityspyyntönä. Luodaanko tiketti?',
    ],
    ticketCreated: 'Tiketti {id} on luotu! Se on nyt pienkehitysjonossa ja agenttikehittäjä käsittelee sen. Saat ilmoituksen kun muutos on valmis arvioitavaksi.',
    clarify: [
        'Voitko kertoa tarkemmin, mitä yritit tehdä ja mitä odotit tapahtuvan?',
        'Millä laitteella ja selaimella tämä ongelma esiintyy?',
        'Onko tämä toistuva ongelma vai tapahtuiko se vain kerran?',
    ],
    help: 'Voin auttaa seuraavissa asioissa:\n• Bugin raportointi ja selvitys\n• Kehityspyynnön luominen\n• Ominaisuuden käyttöohje\n• Sivuston tekninen tuki\n\nKerro vain, mitä ongelmaa tai toivetta sinulla on!',
};

// Pipeline-tilojen nimet ja värit
const pipelineStages = [
    { id: 'new', label: 'Uusi', color: '#6366f1', icon: '📥' },
    { id: 'in_progress', label: 'Kehityksessä', color: '#f59e0b', icon: '⚙️' },
    { id: 'review', label: 'Katselmointi', color: '#3b82f6', icon: '👁️' },
    { id: 'approved', label: 'Hyväksytty', color: '#10b981', icon: '✅' },
    { id: 'deployed', label: 'Tuotannossa', color: '#059669', icon: '🚀' },
];

// ==================== AUDIT DATA ====================
const auditReport = {
    title: 'Saavutettavuusauditointi – OM-hallinnonalan verkkosivustot',
    auditor: 'Eficode Oy / Saavutettavuustiimi',
    date: '2026-03-15',
    standard: 'WCAG 2.1 AA + Laki digitaalisten palvelujen tarjoamisesta (306/2019)',
    scope: 'Oikeusrekisterikeskus, Tuomioistuinvirasto, Rikosseuraamuslaitos, Ulosottolaitos, Tietosuojavaltuutetun toimisto – WordPress multisite',
    summary: {
        totalFindings: 42,
        critical: 6,
        major: 14,
        minor: 16,
        info: 6,
        overallScore: 68,
        testedPages: 85,
        automatedTests: 'axe-core 4.8, Lighthouse, WAVE',
        manualTests: 'Ruudunlukija (NVDA, VoiceOver), nappaimistonavigaatio, kognitiivinen lapikaynti',
    },
    categories: [
        { id: 'perceivable', name: 'Havaittava (1.x)', count: 14, color: '#dc2626' },
        { id: 'operable', name: 'Hallittava (2.x)', count: 12, color: '#f59e0b' },
        { id: 'understandable', name: 'Ymmärrettävä (3.x)', count: 10, color: '#3b82f6' },
        { id: 'robust', name: 'Lujatekoisuus (4.x)', count: 6, color: '#10b981' },
    ],
    findings: [
        {
            id: 'AUD-001', category: 'perceivable', severity: 'critical',
            title: 'Kuvista puuttuu vaihtoehtoisteksti (alt)',
            wcag: '1.1.1 Ei-tekstuaalinen sisältö (A)',
            description: 'Etusivujen kuvakarusellien kuvista puuttuu alt-tekstit kokonaan. Ruudunlukija ilmoittaa vain tiedostonimen.',
            affected: ['ork', 'rikos', 'tuomio'],
            pages: ['Etusivu', 'Ajankohtaista'],
            recommendation: 'Lisää kuvaavat alt-tekstit kaikkiin informatiivisiin kuviin. Koristeelliset kuvat merkitään alt="".',
            effort: 'S', relatedTicket: 'TIK-007',
        },
        {
            id: 'AUD-002', category: 'perceivable', severity: 'critical',
            title: 'Värikontrastit eivät täytä AA-tasoa',
            wcag: '1.4.3 Kontrasti (minimi) (AA)',
            description: 'Harmaa teksti (#999) vaalean taustan (#fff) päällä. Kontrastisuhde 2.8:1, vaadittava minimi 4.5:1.',
            affected: ['ork', 'ulos', 'tietosuoja', 'rikos', 'tuomio'],
            pages: ['Kaikki sivut – meta-teksti, alaviitteet'],
            recommendation: 'Päivitä meta-tekstin väri vähintään tasolle #767676 (kontrastisuhde 4.54:1).',
            effort: 'S',
        },
        {
            id: 'AUD-003', category: 'operable', severity: 'critical',
            title: 'Navigaatio ei toimi näppäimistöllä',
            wcag: '2.1.1 Näppäimistö (A)',
            description: 'Dropdown-alivalikot eivät avaudu Tab/Enter-näppäimillä. Focus siirtyy suoraan alivalikon ohi.',
            affected: ['ork', 'ulos', 'tietosuoja', 'rikos', 'tuomio'],
            pages: ['Kaikki sivut – päänavigaatio'],
            recommendation: 'Toteuta näppäimistökäsittely aria-expanded-attribuutilla ja Enter/Space/Escape-näppäinkuuntelijoilla.',
            effort: 'M',
        },
        {
            id: 'AUD-004', category: 'perceivable', severity: 'critical',
            title: 'Videosisällöistä puuttuvat tekstitykset',
            wcag: '1.2.2 Tekstitys (A)',
            description: 'Ajankohtaista-sivujen upotetuista videoista puuttuvat suomen- ja ruotsinkieliset tekstitykset.',
            affected: ['rikos', 'tuomio'],
            pages: ['Ajankohtaista'],
            recommendation: 'Lisää SRT/VTT-tekstitykset kaikkiin videoihin suomeksi ja ruotsiksi.',
            effort: 'L',
        },
        {
            id: 'AUD-005', category: 'operable', severity: 'critical',
            title: 'Focus-tila ei ole näkyvä',
            wcag: '2.4.7 Näkyvä kohdistus (AA)',
            description: 'Useissa interaktiivisissa elementeissä (linkit, painikkeet) ei ole näkyvää focus-indikaattoria outline:none -tyylin vuoksi.',
            affected: ['ork', 'ulos', 'tietosuoja', 'rikos', 'tuomio'],
            pages: ['Kaikki sivut'],
            recommendation: 'Poista outline:none ja korvaa se selkeällä focus-visible -tyylillä.',
            effort: 'S',
        },
        {
            id: 'AUD-006', category: 'robust', severity: 'critical',
            title: 'Lomake-elementeiltä puuttuvat label-assosiaatiot',
            wcag: '4.1.2 Nimi, rooli, arvo (A)',
            description: 'Yhteystietolomakkeiden kentillä ei ole assosioituja label-elementtejä. Ruudunlukija ei ilmoita kenttien tarkoitusta.',
            affected: ['ork', 'tuomio', 'ulos'],
            pages: ['Yhteystiedot', 'Lomakkeet'],
            recommendation: 'Lisää for/id-assosiaatiot kaikkiin lomakekenttiin tai käytä aria-labelledby.',
            effort: 'S',
        },
        {
            id: 'AUD-007', category: 'perceivable', severity: 'major',
            title: 'Taulukoissa puuttuvat otsikkorivit',
            wcag: '1.3.1 Informaatio ja suhteet (A)',
            description: 'Tilastotaulukoissa ei käytetä th-elementtejä eikä scope-attribuutteja.',
            affected: ['rikos', 'ork'],
            pages: ['Tilastot', 'Rekisterit'],
            recommendation: 'Merkitse taulukoiden otsikkosolut th-elementeillä ja lisää scope="col/row".',
            effort: 'S',
        },
        {
            id: 'AUD-008', category: 'operable', severity: 'major',
            title: 'Linkkien teksti ei ole kuvaava',
            wcag: '2.4.4 Linkin tarkoitus kontekstissa (A)',
            description: '"Lue lisää" ja "Klikkaa tästä" -linkit eivät ilmaise kohdesivua ilman ympäröivää kontekstia.',
            affected: ['ork', 'ulos', 'tietosuoja'],
            pages: ['Ajankohtaista', 'Palvelut'],
            recommendation: 'Muuta linkkitekstit kuvaaviksi tai lisää aria-label joka sisältää kohdesivun nimen.',
            effort: 'M',
        },
        {
            id: 'AUD-009', category: 'understandable', severity: 'major',
            title: 'Sivun kieli ei vaihdu ruotsinkielisessä sisällössä',
            wcag: '3.1.2 Osien kieli (AA)',
            description: 'Ruotsinkielisiä tekstilohkoja ei ole merkitty lang="sv" -attribuutilla.',
            affected: ['tuomio', 'ork'],
            pages: ['Kieliversiot, Ajankohtaista'],
            recommendation: 'Lisää lang-attribuutti kaikkiin vieraskielisiin sisältölohkoihin.',
            effort: 'M',
        },
        {
            id: 'AUD-010', category: 'perceivable', severity: 'major',
            title: 'Responsiivinen näkymä rikkoutuu 320px leveydellä',
            wcag: '1.4.10 Sisällön sovittaminen (AA)',
            description: 'Sisältö leikkautuu tai vaatii vaakasuuntaista vieritystä 320px leveydellä (400% zoomaus).',
            affected: ['ork', 'rikos', 'ulos'],
            pages: ['Lomakkeet', 'Rekisterit', 'Palvelut'],
            recommendation: 'Tarkista ja korjaa CSS-layoutit min-width: 320px breakpointissa.',
            effort: 'M',
        },
        {
            id: 'AUD-011', category: 'operable', severity: 'major',
            title: 'Mobiilimenu jää lukkoon scroll-asemaan',
            wcag: '2.1.1 Näppäimistö (A)',
            description: 'Mobiilivalikko estää sivun scrollaamisen eikä sulje koskettamalla overlayta.',
            affected: ['rikos'],
            pages: ['Kaikki sivut – mobiili'],
            recommendation: 'Lisää overlay click/touch handler ja poista scroll-lukitus.',
            effort: 'S', relatedTicket: 'TIK-002',
        },
        {
            id: 'AUD-012', category: 'understandable', severity: 'major',
            title: 'Lomakkeiden virheilmoitukset englanniksi',
            wcag: '3.3.1 Virheen tunnistaminen (A)',
            description: 'Contact Form 7:n validointiviestit näkyvät englanniksi suomenkielisillä sivuilla.',
            affected: ['tuomio', 'ork'],
            pages: ['Lomakkeet', 'Yhteystiedot'],
            recommendation: 'Lisää suomen- ja ruotsinkieliset käännöstiedostot CF7-pluginille.',
            effort: 'S', relatedTicket: 'TIK-011',
        },
        {
            id: 'AUD-013', category: 'perceivable', severity: 'major',
            title: 'PDF-tiedostot eivät ole saavutettavia',
            wcag: '1.1.1 Ei-tekstuaalinen sisältö (A)',
            description: 'Julkaisut ja päätökset ovat skannattuina PDF-tiedostoina joissa ei ole tekstikerrosta eikä rakennemerkintöjä.',
            affected: ['tuomio', 'tietosuoja'],
            pages: ['Päätökset', 'Julkaisut'],
            recommendation: 'Konvertoi skannatut PDF:t tagged PDF -muotoon OCR:llä ja lisää rakennemerkinnät.',
            effort: 'XL',
        },
        {
            id: 'AUD-014', category: 'operable', severity: 'major',
            title: 'Sivukarttasivu (sitemap) puuttuu',
            wcag: '2.4.5 Useita tapoja (AA)',
            description: 'Sivustolla ei ole HTML-sivukarttasivua joka tarjoaisi vaihtoehtoisen navigointitavan.',
            affected: ['ulos'],
            pages: ['Sivukartta puuttuu'],
            recommendation: 'Lisää automaattisesti generoitu HTML-sivukarttasivu.',
            effort: 'S', relatedTicket: 'TIK-018',
        },
        {
            id: 'AUD-015', category: 'perceivable', severity: 'major',
            title: 'Evästebanneri peittää sisällön mobiililla',
            wcag: '1.4.10 Sisällön sovittaminen (AA)',
            description: 'Evästebanneri peittää mobiilissa lähes koko näytön ja estää sisällön lukemisen.',
            affected: ['ulos'],
            pages: ['Kaikki sivut – mobiili'],
            recommendation: 'Rajoita bannerin korkeus max-height: 50vh ja salli taustasisällön scrollaus.',
            effort: 'S', relatedTicket: 'TIK-013',
        },
        {
            id: 'AUD-016', category: 'understandable', severity: 'major',
            title: 'Epäjohdonmukaiset navigaatiorakenteet',
            wcag: '3.2.3 Johdonmukainen navigointi (AA)',
            description: 'Päänavigaation rakenne ja järjestys vaihtelee eri agenttisivustojen välillä.',
            affected: ['ork', 'ulos', 'rikos'],
            pages: ['Kaikki sivut'],
            recommendation: 'Yhtenäistä navigaatiorakenne shared base-teeman kautta kaikkien sivustojen osalta.',
            effort: 'L',
        },
        {
            id: 'AUD-017', category: 'robust', severity: 'major',
            title: 'ARIA-roolit puuttuvat pääalueilta',
            wcag: '4.1.2 Nimi, rooli, arvo (A)',
            description: 'Sivuston pääalueet (navigation, main, complementary, contentinfo) eivät käytä landmark-rooleja.',
            affected: ['ork', 'ulos', 'tietosuoja', 'rikos', 'tuomio'],
            pages: ['Kaikki sivut'],
            recommendation: 'Lisää role-attribuutit tai käytä semanttisia HTML5-elementtejä (nav, main, aside, footer).',
            effort: 'S',
        },
        {
            id: 'AUD-018', category: 'operable', severity: 'major',
            title: 'Hakutoiminto ei löydä ääkkösillä',
            wcag: '2.4.5 Useita tapoja (AA)',
            description: 'Sivuston haku ei palauta tuloksia kun hakusanassa on ä, ö tai å.',
            affected: ['ork'],
            pages: ['Haku'],
            recommendation: 'Korjaa haun merkistökoodaus UTF-8:ksi.',
            effort: 'M', relatedTicket: 'TIK-004',
        },
        {
            id: 'AUD-019', category: 'perceivable', severity: 'major',
            title: 'Linkkien ja leipätekstin erottaminen värin avulla',
            wcag: '1.4.1 Värien käyttö (A)',
            description: 'Linkit erotetaan leipätekstistä vain sinisellä värillä ilman alleviivausta. Värisokeat eivät erota linkkejä.',
            affected: ['ork', 'ulos', 'tietosuoja', 'rikos', 'tuomio'],
            pages: ['Kaikki sisältösivut'],
            recommendation: 'Lisää text-decoration: underline linkkeihin tai muu ei-väripohjainen erottelu.',
            effort: 'S',
        },
        {
            id: 'AUD-020', category: 'understandable', severity: 'major',
            title: 'Sivun otsikkohierarkia on rikki',
            wcag: '1.3.1 Informaatio ja suhteet (A)',
            description: 'Otsikkotasot hyppivät h1 -> h3 -> h2 useilla sivuilla. H1 puuttuu joiltakin sivuilta kokonaan.',
            affected: ['tuomio', 'rikos'],
            pages: ['Palvelut, Ajankohtaista'],
            recommendation: 'Korjaa otsikkohierarkia loogiseksi: h1 -> h2 -> h3 ilman tasohyppyjä.',
            effort: 'M',
        },
        {
            id: 'AUD-021', category: 'perceivable', severity: 'minor',
            title: 'Kuvat eivät käytä lazy loading -tekniikkaa',
            wcag: 'Suorituskyky (ei WCAG)',
            description: 'Sivun kaikki kuvat latautuvat kerralla, mikä hidastaa sivun latautumista erityisesti hitailla yhteyksillä.',
            affected: ['ulos'],
            pages: ['Etusivu'],
            recommendation: 'Lisää loading="lazy" kuviin ja ota käyttöön WebP-formaatti.',
            effort: 'M', relatedTicket: 'TIK-008',
        },
        {
            id: 'AUD-022', category: 'operable', severity: 'minor',
            title: 'Skip to content -linkki puuttuu',
            wcag: '2.4.1 Ohita lohkot (A)',
            description: 'Sivuston alussa ei ole piilotettua "Siirry sisältöön" -linkkiä.',
            affected: ['ork', 'ulos', 'tietosuoja', 'rikos', 'tuomio'],
            pages: ['Kaikki sivut'],
            recommendation: 'Lisää visuaalisesti piilotettu skip-link sivun alkuun joka näkyy focus-tilassa.',
            effort: 'S',
        },
        {
            id: 'AUD-023', category: 'understandable', severity: 'minor',
            title: 'Automaattinen sivunvaihto karusellissa',
            wcag: '2.2.2 Pysäytä, keskeytä, piilota (A)',
            description: 'Etusivun kuvakaruselli vaihtuu automaattisesti 3 sekunnin välein ilman pysäytyspainiketta.',
            affected: ['ork', 'rikos'],
            pages: ['Etusivu'],
            recommendation: 'Lisää pysäytyspainike tai poista automaattinen vaihto.',
            effort: 'S',
        },
        {
            id: 'AUD-024', category: 'understandable', severity: 'minor',
            title: 'Alatunnisteen linkit viittaavat vanhoihin URL:eihin',
            wcag: '3.2.3 Johdonmukainen navigointi (AA)',
            description: 'Alatunnisteen linkkejä johtaa 404-sivulle tai väärille sivuille.',
            affected: ['tietosuoja'],
            pages: ['Alatunniste'],
            recommendation: 'Päivitä footer-valikon linkit ja lisää redirect-säännöt vanhoille osoitteille.',
            effort: 'S', relatedTicket: 'TIK-010',
        },
        {
            id: 'AUD-025', category: 'robust', severity: 'minor',
            title: 'HTML-validointivirheitä useilla sivuilla',
            wcag: '4.1.1 Jäsentäminen (A)',
            description: 'W3C-validaattori löytää keskimäärin 15 virhettä per sivu (duplikaatti-ID:t, sulkemattomat tagit).',
            affected: ['ork', 'ulos', 'rikos'],
            pages: ['Useita sivuja'],
            recommendation: 'Korjaa HTML-validointivirheet teeman template-tiedostoissa.',
            effort: 'M',
        },
        {
            id: 'AUD-026', category: 'perceivable', severity: 'minor',
            title: 'Lomakekenttien placeholder-teksti liian vaalea',
            wcag: '1.4.3 Kontrasti (AA)',
            description: 'Lomakekenttien placeholder-teksti (#ccc) ei täytä kontrastivaatimusta.',
            affected: ['ork', 'tuomio', 'ulos'],
            pages: ['Lomakkeet, Yhteystiedot'],
            recommendation: 'Tummenna placeholder-väri tasolle #757575 tai käytä näkyviä label-elementtejä.',
            effort: 'S',
        },
        {
            id: 'AUD-027', category: 'operable', severity: 'minor',
            title: 'Kosketusalueet liian pieniä mobiilissa',
            wcag: '2.5.5 Kohdekoko (AAA) / 2.5.8 (AA)',
            description: 'Alatunnisteen linkkien ja sivutuspainikkeiden kosketus-/klikkaus-alueet ovat alle 24x24 CSS-pikseliä.',
            affected: ['ork', 'ulos', 'tietosuoja'],
            pages: ['Alatunniste, Uutisarkisto'],
            recommendation: 'Kasvata interaktiivisten elementtien minimitarget koko 44x44px:iin.',
            effort: 'S',
        },
        {
            id: 'AUD-028', category: 'perceivable', severity: 'minor',
            title: 'Kuvagallerian layout rikkoutuu tabletilla',
            wcag: '1.4.10 Sisällön sovittaminen (AA)',
            description: 'Kuvagallerian grid-asettelu näyttää kuvat päällekkäin iPad portrait-tilassa.',
            affected: ['tietosuoja'],
            pages: ['Ajankohtaista'],
            recommendation: 'Päivitä grid breakpointit ja lisää portrait-orientaation tuki.',
            effort: 'S', relatedTicket: 'TIK-005',
        },
        {
            id: 'AUD-029', category: 'understandable', severity: 'minor',
            title: 'Murupolkunavigaatio puuttuu syvilta sivuilta',
            wcag: '2.4.8 Sijainti (AAA)',
            description: 'Käyttäjä ei näe sijaintiaan sivuhierarkiassa ilman murupolkua.',
            affected: ['ulos'],
            pages: ['Palvelut ja alisivut'],
            recommendation: 'Lisää murupolkunavigaatio kaikille sivuille joiden syvyys on >= 2.',
            effort: 'S', relatedTicket: 'TIK-003',
        },
        {
            id: 'AUD-030', category: 'operable', severity: 'minor',
            title: 'Hakulomake ei tue Enter-näppäintä',
            wcag: '2.1.1 Näppäimistö (A)',
            description: 'Hakukentässä Enter-painallus ei suorita hakua, vaan se vaatii hiiren painallusta.',
            affected: ['rikos'],
            pages: ['Etusivu, Ajankohtaista'],
            recommendation: 'Lisää form-elementti hakukentän ympärille tai keydown Enter-käsittelijä.',
            effort: 'S',
        },
        {
            id: 'AUD-031', category: 'perceivable', severity: 'minor',
            title: 'Ikonit ilman tekstivastinetta',
            wcag: '1.1.1 Ei-tekstuaalinen sisältö (A)',
            description: 'Some-ikonit ja toimintopainikkeet käyttävät vain ikoneita ilman näkyvää tai piilotettu teksti.',
            affected: ['rikos', 'ork'],
            pages: ['Alatunniste, Ajankohtaista'],
            recommendation: 'Lisää aria-label tai sr-only teksti kaikkiin ikonilinkkeihin/-painikkeisiin.',
            effort: 'S',
        },
        {
            id: 'AUD-032', category: 'understandable', severity: 'minor',
            title: 'Virhesivun (404) sisältö ei ole hyödyllinen',
            wcag: '3.3.3 Virheen korjausehdotus (AA)',
            description: '404-sivu näyttää vain "Sivua ei löytynyt" ilman hakukenttää, sivukarttaa tai ehdotuksia.',
            affected: ['ork', 'ulos', 'tietosuoja', 'rikos', 'tuomio'],
            pages: ['404-sivu'],
            recommendation: 'Lisää 404-sivulle hakukenttä, suositut linkit ja sivukarttaan ohjaus.',
            effort: 'S',
        },
        {
            id: 'AUD-033', category: 'perceivable', severity: 'minor',
            title: 'Animaatioita ei voi pysäyttää (prefers-reduced-motion)',
            wcag: '2.3.3 Animaatio interaktioista (AAA)',
            description: 'CSS-animaatiot ja siirtymät eivät kunnioita prefers-reduced-motion media queryä.',
            affected: ['ork', 'rikos'],
            pages: ['Etusivu'],
            recommendation: 'Lisää @media (prefers-reduced-motion: reduce) sääntö joka poistaa animaatiot.',
            effort: 'S',
        },
        {
            id: 'AUD-034', category: 'understandable', severity: 'minor',
            title: 'Pitkät lomakkeet ilman edistymisen ilmaisinta',
            wcag: '3.3.2 Nimilaput tai ohjeet (A)',
            description: 'Monisivuiset lomakkeet eivät näytä käyttäjälle missä vaiheessa prosessia he ovat.',
            affected: ['ulos'],
            pages: ['Ulosottohakemus'],
            recommendation: 'Lisää vaihe-indikaattori (step indicator) monisivuisiin lomakkeisiin.',
            effort: 'M',
        },
        {
            id: 'AUD-035', category: 'robust', severity: 'minor',
            title: 'Custom-elementit ilman ARIA-merkintöjä',
            wcag: '4.1.2 Nimi, rooli, arvo (A)',
            description: 'Haitarielementit ja modaalit on toteutettu div-elementeillä ilman ARIA-rooleja.',
            affected: ['tietosuoja'],
            pages: ['UKK'],
            recommendation: 'Käytä details/summary -elementtejä tai lisää asianmukaiset ARIA-roolit.',
            effort: 'S', relatedTicket: 'TIK-020',
        },
        {
            id: 'AUD-036', category: 'perceivable', severity: 'minor',
            title: 'Taulukot eivät ole responsiivisia',
            wcag: '1.4.10 Sisällön sovittaminen (AA)',
            description: 'Laajat taulukot ylittävät näkymän mobiililla ja vaativat vaakasuuntaista vieritystä.',
            affected: ['rikos', 'ork'],
            pages: ['Tilastot, Rekisterit'],
            recommendation: 'Lisää overflow-x: auto -säiliö taulukoiden ympärille tai käytä responsiivista card-layoutia.',
            effort: 'S',
        },
        {
            id: 'AUD-037', category: 'operable', severity: 'info',
            title: 'Saavutettavuusselosteen päivityspäivä vanhentunut',
            wcag: 'Saavutettavuusdirektiivin velvoite',
            description: 'Saavutettavuusseloste on päivätty 2024-01-15 eikä sitä ole päivitetty lakisääteisen vuosittaisen tarkistuksen mukaan.',
            affected: ['ork', 'ulos', 'tietosuoja', 'rikos', 'tuomio'],
            pages: ['Saavutettavuusseloste'],
            recommendation: 'Päivitä saavutettavuusseloste vastaamaan tämän auditoinnin havaintoja.',
            effort: 'S',
        },
        {
            id: 'AUD-038', category: 'operable', severity: 'info',
            title: 'Suositus: Anna käyttäjän valita tumma/vaalea tila',
            wcag: 'Suositus (AAA-taso)',
            description: 'Sivusto ei tarjoa tumma-/vaalea-tilan valitsinta, mikä auttaisi erityisesti näkövammaisia.',
            affected: ['ork', 'ulos', 'tietosuoja', 'rikos', 'tuomio'],
            pages: ['Kaikki sivut'],
            recommendation: 'Toteuta dark mode -kytkin ja prefers-color-scheme -tuki.',
            effort: 'M', relatedTicket: 'TIK-023',
        },
        {
            id: 'AUD-039', category: 'understandable', severity: 'info',
            title: 'Suositus: Selkokielinen yhteenveto monimutkaisista sivuista',
            wcag: '3.1.5 Lukutaso (AAA)',
            description: 'Oikeudelliset termit ja virastokieli voivat olla vaikeita ymmärtää tavalliselle kansalaiselle.',
            affected: ['tuomio', 'tietosuoja'],
            pages: ['Päätökset, Ohjeet'],
            recommendation: 'Lisää selkokieliset yhteenvedot virallisten tekstien yhteyteen.',
            effort: 'L',
        },
        {
            id: 'AUD-040', category: 'robust', severity: 'info',
            title: 'Suositus: Strukturoitu data (Schema.org)',
            wcag: 'SEO / rakenteinen data',
            description: 'Sivustolla ei ole Schema.org -merkintöjä (Organization, GovernmentOrganization, WebPage).',
            affected: ['ork', 'ulos', 'tietosuoja', 'rikos', 'tuomio'],
            pages: ['Kaikki sivut'],
            recommendation: 'Lisää JSON-LD Schema.org -merkinnät parantamaan hakukonenäkyvyyttä.',
            effort: 'M',
        },
        {
            id: 'AUD-041', category: 'robust', severity: 'info',
            title: 'Suositus: Content Security Policy header',
            wcag: 'Tietoturva',
            description: 'Sivusto ei aseta CSP-headeria, mikä altistaa XSS-hyökkäyksille.',
            affected: ['ork', 'ulos', 'tietosuoja', 'rikos', 'tuomio'],
            pages: ['Kaikki sivut'],
            recommendation: 'Aseta Content-Security-Policy -header palvelimella.',
            effort: 'M',
        },
        {
            id: 'AUD-042', category: 'perceivable', severity: 'info',
            title: 'Suositus: Käytä WebP-kuvformaattia',
            wcag: 'Suorituskyky',
            description: 'Sivuston kuvat ovat JPEG/PNG-muodossa. WebP vähentäisi tiedostokokoa 25-35%.',
            affected: ['ork', 'ulos', 'tietosuoja', 'rikos', 'tuomio'],
            pages: ['Kaikki sivut'],
            recommendation: 'Aktivoi WordPressin WebP-tuki ja konvertoi olemassa olevat kuvat.',
            effort: 'M', relatedTicket: 'TIK-008',
        },
    ],
    roadmap: [
        {
            phase: 1, label: 'Kriittiset korjaukset', timeline: 'Huhti 2026 (2 viikkoa)', color: '#dc2626',
            items: ['AUD-001', 'AUD-002', 'AUD-003', 'AUD-005', 'AUD-006'],
            description: 'Lakisääteiset A-tason vaatimukset jotka estävät palvelun käytön',
        },
        {
            phase: 2, label: 'Merkittävät parannukset', timeline: 'Touko 2026 (3 viikkoa)', color: '#f59e0b',
            items: ['AUD-004', 'AUD-007', 'AUD-008', 'AUD-009', 'AUD-010', 'AUD-011', 'AUD-012', 'AUD-013'],
            description: 'AA-tason vaatimukset ja merkittävimmät käytettävyysongelmat',
        },
        {
            phase: 3, label: 'Pienet korjaukset ja hionta', timeline: 'Kesä-Heinä 2026 (4 viikkoa)', color: '#3b82f6',
            items: ['AUD-014', 'AUD-015', 'AUD-016', 'AUD-017', 'AUD-018', 'AUD-019', 'AUD-020', 'AUD-021', 'AUD-022', 'AUD-023', 'AUD-024', 'AUD-025', 'AUD-026', 'AUD-027', 'AUD-028', 'AUD-029', 'AUD-030', 'AUD-031', 'AUD-032', 'AUD-033', 'AUD-034', 'AUD-035', 'AUD-036'],
            description: 'Vähäisemmät A/AA-puutteet ja laadulliset parannukset',
        },
        {
            phase: 4, label: 'Suositukset ja AAA-taso', timeline: 'Elo-Syys 2026 (jatkuva)', color: '#10b981',
            items: ['AUD-037', 'AUD-038', 'AUD-039', 'AUD-040', 'AUD-041', 'AUD-042'],
            description: 'AAA-tason suositukset, SEO, tietoturva ja suorituskyky',
        },
    ],
};
