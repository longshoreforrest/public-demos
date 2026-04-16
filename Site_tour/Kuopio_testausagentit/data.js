// =============================================================================
// TESTIAUTOMAATION HAVAINTOJEN TESTIDATA
// Oikeusministeriön hallinnonalan WordPress-sivustojen testaus
// =============================================================================

const VIRASTOT = [
  { id: "om", name: "Oikeusministeriö", url: "oikeusministerio.fi" },
  { id: "rise", name: "Rikosseuraamuslaitos", url: "rikosseuraamuslaitos.fi" },
  { id: "ork", name: "Oikeusrekisterikeskus", url: "oikeusrekisterikeskus.fi" },
  { id: "ulo", name: "Ulosottolaitos", url: "ulosottolaitos.fi" },
  { id: "tuv", name: "Tuomioistuinvirasto", url: "tuomioistuinvirasto.fi" },
  { id: "tsv", name: "Tietosuojavaltuutetun toimisto", url: "tietosuoja.fi" },
  { id: "yvv", name: "Yhdenvertaisuusvaltuutettu", url: "yhdenvertaisuus.fi" },
  { id: "ka", name: "Konkurssiasiamies", url: "konkurssiasiamies.fi" },
  { id: "otk", name: "Onnettomuustutkintakeskus", url: "turvallisuustutkinta.fi" },
  { id: "krl", name: "Kuluttajariitalautakunta", url: "kuluttajariita.fi" }
];

const KATEGORIAT = {
  "ulkoinen-muutos": { name: "Ulkoinen muutos", color: "#e74c3c", description: "Ulkoisen kumppanin tai järjestelmän muutos" },
  "wordpress-ydin": { name: "WP-ydinpäivitys", color: "#3498db", description: "WordPress-ytimen päivityksestä johtuva virhe" },
  "lisaosa-paivitys": { name: "Lisäosapäivitys", color: "#2980b9", description: "WordPress-lisäosan päivityksen aiheuttama virhe" },
  "teemavirhe": { name: "Teemavirhe", color: "#9b59b6", description: "Teemaan liittyvä virhe tai regressio" },
  "integraatiovirhe": { name: "Integraatiovirhe", color: "#e67e22", description: "Rajapinta- tai integraatiovirhe" },
  "konfiguraatio": { name: "Konfiguraatiovirhe", color: "#1abc9c", description: "WordPress-konfiguraation virhe" },
  "suorituskyky": { name: "Suorituskyky", color: "#f39c12", description: "Suorituskykyyn liittyvä ongelma" },
  "saavutettavuus": { name: "Saavutettavuus", color: "#27ae60", description: "WCAG-saavutettavuusvaatimuksen rikkomus" },
  "tietoturva": { name: "Tietoturva", color: "#c0392b", description: "Tietoturvaongelma tai haavoittuvuus" },
  "lomakevirhe": { name: "Lomakevirhe", color: "#8e44ad", description: "Lomakkeen toimintavirhe" },
  "sisaltovirhe": { name: "Sisältövirhe", color: "#7f8c8d", description: "Sisältöön tai käännöksiin liittyvä virhe" },
  "hakutoiminto": { name: "Hakutoiminto", color: "#34495e", description: "Sivuston hakuun liittyvä virhe" }
};

const VAKAVUUDET = {
  "kriittinen": { name: "Kriittinen", color: "#e74c3c", weight: 4 },
  "korkea": { name: "Korkea", color: "#e67e22", weight: 3 },
  "keskitaso": { name: "Keskitaso", color: "#f1c40f", weight: 2 },
  "matala": { name: "Matala", color: "#27ae60", weight: 1 }
};

const TILAT = {
  "uusi": { name: "Uusi", color: "#3498db" },
  "tutkinnassa": { name: "Tutkinnassa", color: "#e67e22" },
  "ratkaistu": { name: "Ratkaistu", color: "#27ae60" },
  "ei-korjata": { name: "Ei korjata", color: "#95a5a6" }
};

// =============================================================================
// ARKKITYYPIT - Uniikit virheskenaariot
// =============================================================================

const ARKKITYYPIT = [
  // --- ULKOISET MUUTOKSET (0-7) ---
  {
    testSuite: "Salesforce-integraatio",
    testCase: "Lead-luonti yhteydenottolomakkeesta",
    category: "ulkoinen-muutos",
    component: "Lomakkeet",
    testTool: "Cypress",
    description: "Yhteydenottolomakkeen tietojen synkronointi Salesforce Lead -objektiin epäonnistuu. HTTP 400 -virhe SF REST API -kutsussa. Kenttä 'Source__c' ei löydy kohde-objektista.",
    agentAnalysis: "**Juurisyyanalyysi:** Salesforce-kumppani (Accenture) on uudelleennimennyt Lead-objektin kentän 'Source__c' muotoon 'LeadSource__c' osana CRM-modernisaatiota 14.1.2026. Muutos tehtiin ilman ennakkoilmoitusta WordPress-tiimille.\n\n**Vaikutusarvio:** Kaikki virastosivujen yhteydenottolomakkeet, jotka synkronoivat dataa Salesforceen, ovat rikki. Lomakkeet näyttävät käyttäjälle virheilmoituksen lähetyksen jälkeen.\n\n**Luokittelu:** ULKOINEN MUUTOS - Salesforce-kumppanin tekemä kenttämuutos.\n\n**Suositus:** Päivitä WP Salesforce -pluginin kenttämäppäys: Source__c → LeadSource__c. Lisää integraatiotestit jotka validoivat kenttämäppäyksen SF:n schemaa vasten.",
    rootCause: "Salesforce-kumppani nimesi Lead-objektin 'Source__c' -kentän uudelleen → 'LeadSource__c'",
    recommendation: "Päivitä kenttämäppäys WP Salesforce -pluginissa kaikilla virastosivuilla"
  },
  {
    testSuite: "Salesforce-integraatio",
    testCase: "Case-luonti palautelomakkeesta",
    category: "ulkoinen-muutos",
    component: "Lomakkeet",
    testTool: "Cypress",
    description: "Palautelomakkeen lähetys luo Salesforce Casen, mutta Case-tyyppi on väärä. Uusi pakollinen kenttä 'Priority__c' puuttuu pyynnöstä.",
    agentAnalysis: "**Juurisyyanalyysi:** Salesforce-tiimi on lisännyt uuden pakollisen kentän 'Priority__c' Case-objektiin. WordPress-integraatio ei lähetä tätä kenttää, jolloin SF API palauttaa osittaisen virheen.\n\n**Luokittelu:** ULKOINEN MUUTOS - Salesforce-skeeman laajennus.\n\n**Suositus:** Lisää Priority__c -kentän oletusarvo ('Medium') WP-integraatioon. Sovi Salesforce-kumppanin kanssa muutosilmoituskäytännöstä.",
    rootCause: "Salesforce Case-objektiin lisätty uusi pakollinen kenttä 'Priority__c' ilman koordinointia",
    recommendation: "Lisää Priority__c -kentän käsittely integraatioon ja sovi muutosilmoitusprosessista"
  },
  {
    testSuite: "Salesforce-integraatio",
    testCase: "SF OAuth -autentikointi",
    category: "ulkoinen-muutos",
    component: "Integraatiot",
    testTool: "Cypress",
    description: "Salesforce-yhteys epäonnistuu OAuth 2.0 -autentikaatiossa. Virhe: 'invalid_grant - authentication failure'. Kaikki SF-integraatiot alhaalla.",
    agentAnalysis: "**Juurisyyanalyysi:** Salesforce on pakottanut MFA:n (Multi-Factor Authentication) kaikille API-yhteyksille security-päivityksessä. WordPress-palvelimen Service Account ei tue MFA:ta.\n\n**Vaikutusarvio:** KRIITTINEN - Kaikki Salesforce-integraatiot ovat täysin poissa käytöstä. Lomakkeet, datasyötteet ja synkronoinnit eivät toimi.\n\n**Luokittelu:** ULKOINEN MUUTOS - Salesforce-alustan tietoturvapäivitys.\n\n**Suositus:** Siirry OAuth 2.0 JWT Bearer Flow -autentikointiin, joka toimii MFA:n kanssa. Luo uusi Connected App Salesforceen.",
    rootCause: "Salesforce pakottanut MFA kaikille API-yhteyksille - nykyinen OAuth flow ei tue MFA:ta",
    recommendation: "Siirry JWT Bearer Flow -autentikointiin ja luo uusi Connected App"
  },
  {
    testSuite: "Suomi.fi-tunnistus",
    testCase: "SAML-kirjautuminen",
    category: "ulkoinen-muutos",
    component: "Käyttäjähallinta",
    testTool: "Playwright",
    description: "Suomi.fi-tunnistautuminen epäonnistuu. SAML Response -validointi palauttaa virheen: 'Signature verification failed'. IdP-metadatan sertifikaatti ei vastaa.",
    agentAnalysis: "**Juurisyyanalyysi:** DVV (Digi- ja väestötietovirasto) on uusinut Suomi.fi-tunnistuksen IdP-sertifikaatin osana normaalia sertifikaattikiertoa. WordPress-sivustojen SAML-konfiguraatiossa on vanha sertifikaatti.\n\n**Luokittelu:** ULKOINEN MUUTOS - DVV:n sertifikaattikierto.\n\n**Suositus:** Päivitä IdP-metadatan sertifikaatti kaikilla virastosivuilla. Automatisoi metadata-päivitys.",
    rootCause: "DVV uusinut Suomi.fi IdP-sertifikaatin - vanhat sertifikaatit WP-konfiguraatioissa",
    recommendation: "Päivitä IdP-sertifikaatti ja automatisoi metadata-synkronointi"
  },
  {
    testSuite: "DVV-rajapinta",
    testCase: "Väestötietojärjestelmä-kysely",
    category: "ulkoinen-muutos",
    component: "Integraatiot",
    testTool: "Playwright",
    description: "DVV:n väestötietojärjestelmän rajapintakutsu palauttaa HTTP 503. Rajapinnan vastausmuoto muuttunut - XML-kentän nimi 'henkilotunnus' vaihtunut muotoon 'hetu'.",
    agentAnalysis: "**Juurisyyanalyysi:** DVV on julkaissut VTJ-rajapinnan version 3.0, jossa useita kenttänimiä on modernisoitu. WordPress-integraatio käyttää vielä v2.0-skeemaa.\n\n**Luokittelu:** ULKOINEN MUUTOS - DVV:n rajapintapäivitys.\n\n**Suositus:** Päivitä VTJ-integraatio v3.0-skeemaan. Tarkista kaikki kenttämäppäykset.",
    rootCause: "DVV VTJ-rajapinta päivitetty v3.0:aan - kenttänimet muuttuneet",
    recommendation: "Päivitä integraatio VTJ v3.0 -skeemaan"
  },
  {
    testSuite: "Posti-integraatio",
    testCase: "Osoitehaun automaattitäydennys",
    category: "ulkoinen-muutos",
    component: "Lomakkeet",
    testTool: "Cypress",
    description: "Lomakkeiden osoitekenttien automaattitäydennys ei toimi. Postin osoitehaku-API palauttaa HTTP 401 Unauthorized.",
    agentAnalysis: "**Juurisyyanalyysi:** Posti on siirtänyt osoitehaku-API:n uuteen autentikointimalliin (API key → OAuth 2.0). Vanha API-avain ei enää kelpaa.\n\n**Luokittelu:** ULKOINEN MUUTOS - Postin API-autentikoinnin muutos.\n\n**Suositus:** Rekisteröi uusi OAuth-client Postin kehittäjäportaalissa ja päivitä integraatio.",
    rootCause: "Posti siirtynyt API key -autentikoinnista OAuth 2.0:aan",
    recommendation: "Rekisteröi OAuth-client ja päivitä autentikointitapa"
  },
  {
    testSuite: "Karttapalvelu",
    testCase: "Google Maps -upotus toimipaikkanäkymässä",
    category: "ulkoinen-muutos",
    component: "Sivupohjat",
    testTool: "Playwright",
    description: "Google Maps -karttaupotus ei lataudu toimipaikka-sivuilla. Konsolissa virhe: 'Google Maps JavaScript API error: ApiNotActivatedMapError'.",
    agentAnalysis: "**Juurisyyanalyysi:** Google on päivittänyt Maps Platform -hinnoitteluaan ja deaktivoinut Maps JavaScript API:n projektista, koska maksutiedot puuttuivat uudessa billing-mallissa.\n\n**Luokittelu:** ULKOINEN MUUTOS - Google-alustan laskutusmuutos.\n\n**Suositus:** Aktivoi Maps JavaScript API uudelleen Google Cloud Consolessa ja päivitä laskutustiedot. Harkitse siirtymistä OpenStreetMap-pohjaiseen ratkaisuun.",
    rootCause: "Google Maps API deaktivoitu uuden laskutusmallin vuoksi",
    recommendation: "Aktivoi API uudelleen tai siirry OpenStreetMap-ratkaisuun"
  },
  {
    testSuite: "Analytiikka",
    testCase: "Google Analytics 4 -seuranta",
    category: "ulkoinen-muutos",
    component: "Analytiikka",
    testTool: "Playwright",
    description: "GA4-tapahtumat eivät kirjaudu. Consent Mode v2 -päivitys rikkoi datavirran. Evästebannerin hyväksyntä ei välity GA:lle oikein.",
    agentAnalysis: "**Juurisyyanalyysi:** Google on pakottanut Consent Mode v2:n EU-alueella. WordPress-sivuston evästehallintaplugini (CookieYes) ei vielä tue uutta Consent Mode v2 -rajapintaa, jolloin GA4 ei saa consent-signaalia.\n\n**Luokittelu:** ULKOINEN MUUTOS - Googlen EU-vaatimus (DMA).\n\n**Suositus:** Päivitä CookieYes-plugin uusimpaan versioon joka tukee Consent Mode v2. Testaa consent flow kattavasti.",
    rootCause: "Google Consent Mode v2 -vaatimus - CookieYes-plugin ei tue uutta versiota",
    recommendation: "Päivitä CookieYes-plugin ja validoi consent flow"
  },

  // --- WORDPRESS-YDINPÄIVITYS (8-12) ---
  {
    testSuite: "WordPress-ydin",
    testCase: "Gutenberg-editori - mukautetut lohkot",
    category: "wordpress-ydin",
    component: "Sisällönhallinta",
    testTool: "Cypress",
    description: "WordPress 6.7 -päivityksen jälkeen mukautetut ACF-lohkot eivät renderöidy oikein. Lohkojen sisältö näkyy editorissa mutta ei julkaistuilla sivuilla.",
    agentAnalysis: "**Juurisyyanalyysi:** WordPress 6.7 muutti Block API:n render_callback -funktion kutsujärjestystä. ACF:n mukautetut lohkot käyttävät vanhaa kutsutapaa joka ei enää toimi.\n\n**Luokittelu:** WORDPRESS-YDINPÄIVITYS - Block API:n breaking change.\n\n**Suositus:** Päivitä ACF Pro vähintään versioon 6.3.1 joka korjaa WP 6.7 -yhteensopivuuden. Testaa kaikki mukautetut lohkot.",
    rootCause: "WP 6.7 Block API render_callback -muutos rikkoo ACF-lohkojen renderöinnin",
    recommendation: "Päivitä ACF Pro versioon 6.3.1+ ja testaa lohkot"
  },
  {
    testSuite: "WordPress-ydin",
    testCase: "REST API -autentikointi",
    category: "wordpress-ydin",
    component: "REST API",
    testTool: "Playwright",
    description: "WP REST API palauttaa 403 Forbidden kaikille autentikoiduille pyynnöille. Application Passwords -toiminnallisuus rikki WP 6.7 -päivityksen jälkeen.",
    agentAnalysis: "**Juurisyyanalyysi:** WordPress 6.7 tiukensi REST API:n autentikointia. Application Passwords vaatii nyt HTTPS:n myös kehitysympäristöissä, tai erillisen filtteriasetuksen.\n\n**Luokittelu:** WORDPRESS-YDINPÄIVITYS - REST API -tietoturvaparannus.\n\n**Suositus:** Lisää wp-config.php:hen: define('WP_ENVIRONMENT_TYPE', 'staging'); tai varmista HTTPS staging-ympäristössä.",
    rootCause: "WP 6.7 vaatii HTTPS:n Application Passwords -autentikoinnille",
    recommendation: "Konfiguroi WP_ENVIRONMENT_TYPE tai ota HTTPS käyttöön staging-ympäristössä"
  },
  {
    testSuite: "WordPress-ydin",
    testCase: "Mediagalleria - kuvan rajaus",
    category: "wordpress-ydin",
    component: "Mediahallinta",
    testTool: "Cypress",
    description: "Kuvien rajaus (crop) ei toimi WP-mediagalleriassa. JavaScript-virhe: 'imgareaselect is not a function'. Media-kirjaston rajaustyökalu kaatuu.",
    agentAnalysis: "**Juurisyyanalyysi:** WP 6.7 poisti vanhan jQuery UI -riippuvuuden ja siirtyi moderniin Image Cropper -kirjastoon. Teeman functions.php lataa vanhan imgareaselect-skriptin joka aiheuttaa konfliktin.\n\n**Luokittelu:** WORDPRESS-YDINPÄIVITYS - jQuery UI -deprecation.\n\n**Suositus:** Poista vanha imgareaselect-skriptin enqueue teeman functions.php:sta. Käytä WP:n natiiveja rajaustyökaluja.",
    rootCause: "WP 6.7 poisti jQuery UI -riippuvuuden - teema lataa vanhan skriptin",
    recommendation: "Päivitä teeman functions.php poistamaan vanhan kirjaston lataus"
  },
  {
    testSuite: "WordPress-ydin",
    testCase: "Multisiten käyttäjähallinta",
    category: "wordpress-ydin",
    component: "Käyttäjähallinta",
    testTool: "Playwright",
    description: "Multisite-verkoston Super Admin ei pysty lisäämään käyttäjiä alasivustoille. Virhe: 'Sorry, you are not allowed to create users.'",
    agentAnalysis: "**Juurisyyanalyysi:** WP 6.7 muutti multisite-käyttöoikeuksien tarkistuslogiikkaa. Uusi capability 'create_users' on nyt erillinen 'manage_network_users' -oikeudesta.\n\n**Luokittelu:** WORDPRESS-YDINPÄIVITYS - Multisite capability -muutos.\n\n**Suositus:** Päivitä custom role -konfiguraatio lisäämään 'create_users' capability Super Admin -rooliin.",
    rootCause: "WP 6.7 erotti 'create_users' ja 'manage_network_users' capabilityt",
    recommendation: "Lisää 'create_users' capability Super Admin -rooliin"
  },
  {
    testSuite: "WordPress-ydin",
    testCase: "Sivuston terveystarkastus",
    category: "wordpress-ydin",
    component: "Ylläpito",
    testTool: "Robot Framework",
    description: "Site Health -sivu raportoi kriittisiä ongelmia: 'Background updates are not working as expected' ja 'REST API encountered an unexpected result'.",
    agentAnalysis: "**Juurisyyanalyysi:** WP 6.7 -päivitys muutti taustapäivitysten loopback-testiä. Palvelimen palomuurisäännöt estävät uuden health check -endpointin.\n\n**Luokittelu:** WORDPRESS-YDINPÄIVITYS - Health check -muutos.\n\n**Suositus:** Päivitä palomuurisäännöt sallimaan /wp-json/wp-site-health/v1/ -endpoint.",
    rootCause: "Palomuurisäännöt estävät uuden WP 6.7 site health -endpointin",
    recommendation: "Salli /wp-json/wp-site-health/v1/ palomuurissa"
  },

  // --- LISÄOSAPÄIVITYKSET (13-22) ---
  {
    testSuite: "Lisäosat",
    testCase: "WPML - kieliversioiden synkronointi",
    category: "lisaosa-paivitys",
    component: "Käännökset",
    testTool: "Cypress",
    description: "WPML 4.7 -päivityksen jälkeen kieliversioiden synkronointi rikki. Ruotsinkieliset sivut näyttävät suomenkielistä sisältöä. Kielenvaihto ei toimi.",
    agentAnalysis: "**Juurisyyanalyysi:** WPML 4.7 muutti translation memory -tietokantataulujen rakennetta. Migraatioskripti epäonnistui osittain staging-ympäristössä ja jätti käännöslinkitykset rikkinäisiksi.\n\n**Luokittelu:** LISÄOSAPÄIVITYS - WPML-migraatiovirhe.\n\n**Suositus:** Aja WPML:n korjaustyökalu: WPML → Support → Fix translation tables. Varmista backupit ennen ajoa.",
    rootCause: "WPML 4.7 tietokantataulujen migraatio epäonnistui osittain",
    recommendation: "Aja WPML:n korjaustyökalu ja varmista tietokannan eheys"
  },
  {
    testSuite: "Lisäosat",
    testCase: "Yoast SEO - metatiedot",
    category: "lisaosa-paivitys",
    component: "SEO",
    testTool: "Playwright",
    description: "Yoast SEO 23.0 -päivitys rikkoi Open Graph -metatietojen generoinnin. Facebook- ja LinkedIn-jaot näyttävät väärän kuvan ja otsikon.",
    agentAnalysis: "**Juurisyyanalyysi:** Yoast SEO 23.0 muutti OG-metatietojen prioriteettijärjestystä. Custom fields -pohjaiset OG-tagit eivät enää ylikirjoita oletusarvoja oikein.\n\n**Luokittelu:** LISÄOSAPÄIVITYS - Yoast SEO:n metatietoprioriteetti muuttunut.\n\n**Suositus:** Päivitä teeman yoast-hooks.php vastaamaan uutta prioriteettijärjestystä.",
    rootCause: "Yoast SEO 23.0 muutti OG-metatietojen prioriteettijärjestystä",
    recommendation: "Päivitä teeman Yoast-hookit uuteen prioriteettimalliin"
  },
  {
    testSuite: "Lisäosat",
    testCase: "Gravity Forms - tiedoston lataus",
    category: "lisaosa-paivitys",
    component: "Lomakkeet",
    testTool: "Cypress",
    description: "Gravity Forms 2.9 -päivityksen jälkeen tiedostojen lataus lomakkeissa epäonnistuu. Virhe: 'The uploaded file could not be moved to the upload directory.'",
    agentAnalysis: "**Juurisyyanalyysi:** Gravity Forms 2.9 muutti upload-hakemiston polkua turvallisuussyistä. Uusi polku /wp-content/uploads/gravity_forms_secure/ vaatii oikeat tiedosto-oikeudet.\n\n**Luokittelu:** LISÄOSAPÄIVITYS - Gravity Forms upload-polun muutos.\n\n**Suositus:** Luo hakemisto gravity_forms_secure ja aseta oikeudet 755. Tarkista myös .htaccess-suojaus.",
    rootCause: "Gravity Forms 2.9 muutti upload-hakemistoa - uutta hakemistoa ei ole luotu",
    recommendation: "Luo upload-hakemisto oikeilla tiedosto-oikeuksilla"
  },
  {
    testSuite: "Lisäosat",
    testCase: "WP Rocket - välimuisti",
    category: "lisaosa-paivitys",
    component: "Suorituskyky",
    testTool: "Lighthouse",
    description: "WP Rocket 3.17 -päivitys aiheutti CSS/JS-yhdistelyn hajoamisen. Sivut latautuvat ilman tyylejä ensimmäisellä vierailulla.",
    agentAnalysis: "**Juurisyyanalyysi:** WP Rocket 3.17 otti käyttöön uuden CSS-minifioinnin joka on ristiriidassa teeman Tailwind CSS -build-prosessin kanssa. Minifioitu CSS on korruptoitunut.\n\n**Luokittelu:** LISÄOSAPÄIVITYS - WP Rocket / Tailwind CSS -konflikti.\n\n**Suositus:** Poista Tailwind-tiedostot WP Rocketin minifioinnista: Settings → File Optimization → Excluded CSS Files.",
    rootCause: "WP Rocket 3.17 CSS-minifiointi ristiriidassa Tailwind CSS:n kanssa",
    recommendation: "Lisää Tailwind-tiedostot WP Rocketin minifioinnin poikkeuslistaan"
  },
  {
    testSuite: "Lisäosat",
    testCase: "ACF Pro - kenttäryhmien vienti",
    category: "lisaosa-paivitys",
    component: "Sisällönhallinta",
    testTool: "Cypress",
    description: "ACF Pro 6.3 rikkoi JSON-synkronoinnin. Kenttäryhmien automaattinen synkronointi staging → production ei toimi. Kenttämuutokset eivät siirry.",
    agentAnalysis: "**Juurisyyanalyysi:** ACF Pro 6.3 muutti JSON-kenttäryhmien tallennusformaattia. Vanha formaatti ei ole yhteensopiva uuden version kanssa, jolloin sync-toiminto ei tunnista muutoksia.\n\n**Luokittelu:** LISÄOSAPÄIVITYS - ACF JSON-formaattimuutos.\n\n**Suositus:** Vie kaikki kenttäryhmät uudelleen ACF:n uudessa formaatissa ja päivitä acf-json-hakemisto.",
    rootCause: "ACF Pro 6.3 JSON-tallennusformaatti muuttunut - vanha ja uusi eivät yhteensopivia",
    recommendation: "Vie kenttäryhmät uudelleen uudessa formaatissa"
  },
  {
    testSuite: "Lisäosat",
    testCase: "Redirection - URL-ohjaukset",
    category: "lisaosa-paivitys",
    component: "Navigaatio",
    testTool: "Robot Framework",
    description: "Redirection-pluginin päivitys poisti kaikki 301-uudelleenohjaukset. Vanhat URL:t palauttavat 404-sivun eikä ohjaudu uusille sivuille.",
    agentAnalysis: "**Juurisyyanalyysi:** Redirection 5.5 muutti tietokanta-skeemaansa ja migraatio epäonnistui. Uudelleenohjaustaulut ovat tyhjiä.\n\n**Luokittelu:** LISÄOSAPÄIVITYS - Redirection-pluginin tietokantamigraatiovirhe.\n\n**Suositus:** Palauta ohjaukset tietokannan backupista tai tuo ne uudelleen CSV-tuontina.",
    rootCause: "Redirection 5.5 tietokantamigraatio epäonnistui - ohjaukset hävinneet",
    recommendation: "Palauta uudelleenohjaukset backupista tai CSV-tuontina"
  },
  {
    testSuite: "Lisäosat",
    testCase: "Wordfence - kirjautumissuojaus",
    category: "lisaosa-paivitys",
    component: "Tietoturva",
    testTool: "Playwright",
    description: "Wordfence 8.0 -päivitys lukitsee kaikki admin-kirjautumiset. Kaksivaihtoinen tunnistautuminen ei hyväksy koodeja. Admin-paneeliin ei pääse.",
    agentAnalysis: "**Juurisyyanalyysi:** Wordfence 8.0 siirtyi uuteen 2FA-toteutukseen (WebAuthn). Vanhat TOTP-konfiguraatiot eivät toimi uudessa versiossa ja tarvitsevat uudelleenaktivoinnin.\n\n**Luokittelu:** LISÄOSAPÄIVITYS - Wordfence 2FA -migraatiovirhe.\n\n**Suositus:** Poista Wordfence 2FA tilapäisesti wp-cli:llä: wp option delete wordfence_2fa_settings. Konfiguroi uudelleen.",
    rootCause: "Wordfence 8.0 muutti 2FA-toteutusta - vanhat TOTP-asetukset eivät yhteensopivia",
    recommendation: "Resetoi 2FA-asetukset wp-cli:llä ja konfiguroi uudelleen"
  },
  {
    testSuite: "Lisäosat",
    testCase: "TablePress - taulukoiden renderöinti",
    category: "lisaosa-paivitys",
    component: "Sisällönhallinta",
    testTool: "Cypress",
    description: "TablePress 3.0 rikkoi taulukoiden responsiivisen näkymän. Taulukot ylivuotavat mobiilissa ja vaakasuora skrollaus ei toimi.",
    agentAnalysis: "**Juurisyyanalyysi:** TablePress 3.0 poisti DataTables-kirjaston ja siirtyi omaan renderöintiin. Teeman CSS-tyylimäärittelyt kohdistavat DataTables-luokkiin jotka eivät enää ole olemassa.\n\n**Luokittelu:** LISÄOSAPÄIVITYS - TablePress renderöintimoottori muuttunut.\n\n**Suositus:** Päivitä teeman taulukko-CSS vastaamaan TablePress 3.0:n uusia CSS-luokkia.",
    rootCause: "TablePress 3.0 poisti DataTables-kirjaston - teeman CSS kohdistuu vanhoihin luokkiin",
    recommendation: "Päivitä teeman taulukko-CSS uusiin CSS-luokkiin"
  },
  {
    testSuite: "Lisäosat",
    testCase: "UpdraftPlus - varmuuskopiointi",
    category: "lisaosa-paivitys",
    component: "Ylläpito",
    testTool: "Robot Framework",
    description: "UpdraftPlus 2.24 ei onnist varmuuskopioimaan tietokantaa. Virhe: 'Table wp_options is too large for single packet'. Backup epäonnistuu joka yö.",
    agentAnalysis: "**Juurisyyanalyysi:** UpdraftPlus 2.24 muutti tietokannan dump-menetelmää. Uusi menetelmä ei osaa käsitellä suuria wp_options-tauluja jotka sisältävät transient-dataa.\n\n**Luokittelu:** LISÄOSAPÄIVITYS - UpdraftPlus backup-menetelmän muutos.\n\n**Suositus:** Puhdista vanhat transientit: wp transient delete --all. Konfiguroi UpdraftPlus käyttämään mysqldump-menetelmää.",
    rootCause: "UpdraftPlus 2.24:n uusi backup-menetelmä ei käsittele suuria tauluja",
    recommendation: "Puhdista transientit ja vaihda mysqldump-menetelmään"
  },

  // --- TEEMAVIRHEET (23-28) ---
  {
    testSuite: "Teema - visuaalinen regressio",
    testCase: "Etusivun hero-osio",
    category: "teemavirhe",
    component: "Etusivu",
    testTool: "Playwright",
    description: "Etusivun hero-kuva ei skaalaudu oikein mobiilissa (< 768px). Kuva rajautuu vasemmalta ja teksti on lukukelvoton tumman alueen päällä.",
    agentAnalysis: "**Juurisyyanalyysi:** Teeman hero-osion CSS käyttää object-position: center -arvoa, mutta virastojen hero-kuvat ovat optimoitu desktop-näkymään. Mobiilissa kuvan focal point leikkautuu pois.\n\n**Luokittelu:** TEEMAVIRHE - Responsiivinen suunnittelu.\n\n**Suositus:** Lisää focal point -toiminnallisuus hero-kuvalle ACF-kentän kautta, jotta sisällöntuottaja voi määrittää kuvan painopisteen.",
    rootCause: "Hero-kuvan object-position ei ota huomioon kuvan focal pointia mobiilissa",
    recommendation: "Lisää ACF focal point -kenttä hero-kuvan hallintaan"
  },
  {
    testSuite: "Teema - visuaalinen regressio",
    testCase: "Navigaation dropdown-valikko",
    category: "teemavirhe",
    component: "Navigaatio",
    testTool: "Cypress",
    description: "Desktop-navigaation dropdown-valikko ei avaudu hover-tilassa. Kolmannen tason alavalikot puuttuvat kokonaan.",
    agentAnalysis: "**Juurisyyanalyysi:** Teemapäivityksessä mega-menu-komponentti refaktoroitiin, mutta kolmannen tason valikkorakenne jäi toteuttamatta. CSS z-index-ongelma estää dropdownin näkymisen.\n\n**Luokittelu:** TEEMAVIRHE - Navigaatiokomponentin regressio.\n\n**Suositus:** Korjaa mega-menu-komponentin z-index (nostettava > 1000) ja lisää kolmannen tason tuki.",
    rootCause: "Mega-menu-refaktorointi jäi keskeneräiseksi - 3. tason tuki puuttuu, z-index väärin",
    recommendation: "Korjaa z-index ja lisää kolmannen tason valikkorakenne"
  },
  {
    testSuite: "Teema - visuaalinen regressio",
    testCase: "Footer - yhteystiedot",
    category: "teemavirhe",
    component: "Footer",
    testTool: "Playwright",
    description: "Footerin yhteystietosarakkeet menevät päällekkäin tablet-koossa (768px-1024px). Puhelinnumerot ja osoitteet sekoittuvat.",
    agentAnalysis: "**Juurisyyanalyysi:** Footer-grid käyttää kiinteitä pikselilevyyksiä flexboxin sijaan. Tablet-breakpointia ei ole määritelty teeman grid-järjestelmässä.\n\n**Luokittelu:** TEEMAVIRHE - Responsiivinen grid puutteellinen.\n\n**Suositus:** Vaihda footer-grid CSS Grid -pohjaiseksi ja lisää tablet-breakpoint (768px-1024px).",
    rootCause: "Footer-gridin kiinteät pikselileveydet - tablet-breakpoint puuttuu",
    recommendation: "Siirry CSS Grid -pohjaiseen footer-layoutiin"
  },
  {
    testSuite: "Teema - visuaalinen regressio",
    testCase: "Tulostustyylit",
    category: "teemavirhe",
    component: "Sivupohjat",
    testTool: "Playwright",
    description: "Sivujen tulostustyylit puuttuvat kokonaan. Tulostettaessa näkyy navigaatio, footer ja kaikki interaktiiviset elementit. Sisältö katkeaa sivunvaihdoissa.",
    agentAnalysis: "**Juurisyyanalyysi:** Teeman print stylesheet (@media print) puuttuu kokonaan. Uutta teemaa rakennettaessa tulostustyylejä ei ole toteutettu.\n\n**Luokittelu:** TEEMAVIRHE - Print stylesheet puuttuu.\n\n**Suositus:** Luo print.css joka piilottaa navigaation/footerin, optimoi typografian ja käsittelee sivunvaihdot.",
    rootCause: "Teemasta puuttuu print stylesheet kokonaan",
    recommendation: "Luo print.css tulostustyyleillä"
  },
  {
    testSuite: "Teema - visuaalinen regressio",
    testCase: "Dark mode -tuki",
    category: "teemavirhe",
    component: "Sivupohjat",
    testTool: "Playwright",
    description: "Käyttöjärjestelmän dark mode -asetus rikkoo sivuston värit. Teksti muuttuu valkoiseksi valkoista taustaa vasten - sisältö lukukelvoton.",
    agentAnalysis: "**Juurisyyanalyysi:** Selaimet soveltavat automaattisesti dark mode -värejä (prefers-color-scheme: dark) kun sivusto ei eksplisiittisesti estä sitä. Teemassa ei ole color-scheme-määrittelyä.\n\n**Luokittelu:** TEEMAVIRHE - Dark mode -käsittely puuttuu.\n\n**Suositus:** Lisää metatagi <meta name='color-scheme' content='light'> tai toteuta varsinainen dark mode -tuki.",
    rootCause: "Teema ei käsittele prefers-color-scheme: dark -asetusta",
    recommendation: "Lisää color-scheme: light tai toteuta dark mode"
  },
  {
    testSuite: "Teema - visuaalinen regressio",
    testCase: "Breadcrumb-navigaatio",
    category: "teemavirhe",
    component: "Navigaatio",
    testTool: "Cypress",
    description: "Breadcrumb-navigaation murupolku katkeaa 4+ tason syvyydessä. Viimeiset tasot eivät näy ja linkitys on väärä.",
    agentAnalysis: "**Juurisyyanalyysi:** Breadcrumb-komponentti rajoittaa näytettävien tasojen määrän kolmeen. Virastojen sivurakenne on syvempi kuin teeman suunnittelussa oletettiin.\n\n**Luokittelu:** TEEMAVIRHE - Breadcrumb-komponentti ei tue syvää hierarkiaa.\n\n**Suositus:** Päivitä breadcrumb-komponentti tukemaan mielivaltaista syvyyttä. Lisää ellipsis pitkille poluille.",
    rootCause: "Breadcrumb rajoitettu 3 tasoon - virastojen sivurakenne on syvempi",
    recommendation: "Poista tasorajoitus ja lisää ellipsis pitkille poluille"
  },

  // --- INTEGRAATIOVIRHEET (29-37) ---
  {
    testSuite: "REST API",
    testCase: "Sivustojen välinen sisältösynkronointi",
    category: "integraatiovirhe",
    component: "REST API",
    testTool: "Playwright",
    description: "Multisite-verkoston sivustojen välinen sisältösynkronointi epäonnistuu. REST API palauttaa timeout-virheen suurilla sisältöpaketeilla (> 100 artikkelia).",
    agentAnalysis: "**Juurisyyanalyysi:** REST API:n sisältösynkronointi yrittää siirtää kaiken datan yhdessä pyynnössä. PHP:n max_execution_time (30s) ja memory_limit (256M) eivät riitä suurille datamäärille.\n\n**Luokittelu:** INTEGRAATIOVIRHE - REST API:n suorituskykyraja.\n\n**Suositus:** Toteuta synkronointi sivutetusti (batch processing) ja lisää tausta-ajomahdollisuus WP-Cron-pohjaisena.",
    rootCause: "REST API:n synkronointi ei ole sivutettu - PHP timeout suurilla datamäärillä",
    recommendation: "Toteuta batch-pohjainen synkronointi WP-Cron-tuella"
  },
  {
    testSuite: "REST API",
    testCase: "Headless-frontend data-haku",
    category: "integraatiovirhe",
    component: "REST API",
    testTool: "Cypress",
    description: "Next.js-headless-frontend saa vanhentuneita tietoja REST API:sta. Sisällön päivitykset eivät näy tunnin sisällä.",
    agentAnalysis: "**Juurisyyanalyysi:** WP REST API:n vastaukset cachetetaan Varnish-tasolla aggressiivisesti (TTL: 3600s). Purge-mekanismi ei laukea sisältöpäivityksistä.\n\n**Luokittelu:** INTEGRAATIOVIRHE - Välimuistin invalidointi rikki.\n\n**Suositus:** Konfiguroi Varnish purge -hook sisältöpäivitysten yhteyteen. Käytä ETag/If-None-Match -headereitä.",
    rootCause: "Varnish-välimuistin purge-mekanismi ei laukea sisältöpäivityksistä",
    recommendation: "Konfiguroi automaattinen cache purge sisältöpäivityksille"
  },
  {
    testSuite: "Sähköposti-integraatio",
    testCase: "SMTP-lähetys lomakevahvistukset",
    category: "integraatiovirhe",
    component: "Sähköposti",
    testTool: "Robot Framework",
    description: "Lomakevahvistussähköpostit eivät lähde. SMTP-yhteys epäonnistuu: 'Connection timed out to smtp.gov.fi:587'.",
    agentAnalysis: "**Juurisyyanalyysi:** Valtion sähköpostipalvelun (smtp.gov.fi) IP-whitelisting muuttunut palvelinmigraation yhteydessä. WordPress-palvelimen IP-osoite ei ole uudella whitelist-listalla.\n\n**Luokittelu:** INTEGRAATIOVIRHE - SMTP-palomuurimuutos.\n\n**Suositus:** Ilmoita uusi palvelin-IP valtionhallinnon IT-palvelukeskukseen (Valtori) whitelist-päivitystä varten.",
    rootCause: "WP-palvelimen IP ei ole valtion SMTP-palvelun uudella whitelistillä",
    recommendation: "Pyydä IP-whitelisting Valtorilta"
  },
  {
    testSuite: "Hakuindeksi",
    testCase: "Elasticsearch-synkronointi",
    category: "integraatiovirhe",
    component: "Hakutoiminto",
    testTool: "Robot Framework",
    description: "Elasticsearch-hakuindeksin synkronointi epäonnistuu. Virhe: 'mapper_parsing_exception - failed to parse field [post_date]'. Uudet sisällöt eivät löydy hausta.",
    agentAnalysis: "**Juurisyyanalyysi:** Elasticsearch-klusteri päivitettiin versioon 8.x joka käsittelee päivämääräformaatteja tiukemmin. WP:n date-kenttä ei vastaa ES:n odottamaa ISO 8601 -formaattia.\n\n**Luokittelu:** INTEGRAATIOVIRHE - Elasticsearch-yhteensopivuus.\n\n**Suositus:** Päivitä ElasticPress-pluginin date mapping ISO 8601 -muotoon ja reindeksoi kaikki sisällöt.",
    rootCause: "Elasticsearch 8.x tiukempi date-formaattivaatimus - WP:n formaatti ei kelpaa",
    recommendation: "Päivitä date mapping ja reindeksoi sisällöt"
  },
  {
    testSuite: "CDN-integraatio",
    testCase: "Median jakelu CloudFrontin kautta",
    category: "integraatiovirhe",
    component: "Mediahallinta",
    testTool: "Lighthouse",
    description: "Kuvat ja mediatiedostot eivät lataudu CloudFrontin kautta. CORS-virhe konsolissa: 'Access-Control-Allow-Origin header missing'.",
    agentAnalysis: "**Juurisyyanalyysi:** CloudFront-jakelun CORS-konfiguraatio ei salli virastosivujen domaineja. Multisite-asennuksessa jokainen virasto käyttää omaa domainiaan.\n\n**Luokittelu:** INTEGRAATIOVIRHE - CDN CORS -konfiguraatio.\n\n**Suositus:** Lisää kaikkien virastosivujen domainit CloudFrontin CORS-konfiguraatioon.",
    rootCause: "CloudFront CORS ei salli multisite-verkoston kaikkia domaineja",
    recommendation: "Päivitä CloudFrontin CORS-konfiguraatio kaikille domaineille"
  },
  {
    testSuite: "Chatbot-integraatio",
    testCase: "Asiakaspalvelu-chatbot",
    category: "integraatiovirhe",
    component: "Chatbot",
    testTool: "Cypress",
    description: "Asiakaspalvelu-chatbotin yhteys katkeaa satunnaisesti. WebSocket-yhteys sulkeutuu 30 sekunnin jälkeen. Chatbot-ikkuna näyttää 'Yhteys katkennut'.",
    agentAnalysis: "**Juurisyyanalyysi:** Load balancerin WebSocket-timeout on asetettu 30 sekuntiin. Chatbot-palvelu vaatii pysyvän yhteyden joka voi olla idle pitkiä aikoja.\n\n**Luokittelu:** INTEGRAATIOVIRHE - Load balancer -konfiguraatio.\n\n**Suositus:** Nosta load balancerin WebSocket idle timeout vähintään 300 sekuntiin. Lisää heartbeat-mekanismi chatbot-clientiin.",
    rootCause: "Load balancerin WebSocket idle timeout liian lyhyt (30s)",
    recommendation: "Nosta timeout 300s:iin ja lisää heartbeat-mekanismi"
  },
  {
    testSuite: "Tunnistautuminen",
    testCase: "Azure AD SSO -kirjautuminen",
    category: "integraatiovirhe",
    component: "Käyttäjähallinta",
    testTool: "Playwright",
    description: "Azure AD SSO -kirjautuminen WordPress-adminiin epäonnistuu. Virhe: 'AADSTS50011: The reply URL specified in the request does not match'. Redirect URI väärin.",
    agentAnalysis: "**Juurisyyanalyysi:** Azure AD App Registration -konfiguraatiossa on vanha redirect URI joka osoittaa HTTP:hen. Staging-ympäristö käyttää HTTPS:ää.\n\n**Luokittelu:** INTEGRAATIOVIRHE - Azure AD -konfiguraatio.\n\n**Suositus:** Päivitä Azure AD App Registration redirect URI HTTPS-muotoon: https://staging.oikeusministerio.fi/wp-login.php",
    rootCause: "Azure AD redirect URI osoittaa HTTP:hen - ympäristö käyttää HTTPS:ää",
    recommendation: "Päivitä redirect URI Azure AD App Registrationissa"
  },
  {
    testSuite: "PDF-generointi",
    testCase: "Päätösdokumentin PDF-vienti",
    category: "integraatiovirhe",
    component: "Dokumentit",
    testTool: "Robot Framework",
    description: "PDF-generointi kaatuu suurilla dokumenteilla (> 50 sivua). PHP memory exhausted -virhe. Päätösdokumentit eivät generoidu.",
    agentAnalysis: "**Juurisyyanalyysi:** PDF-generointiin käytettävä mPDF-kirjasto lataa koko dokumentin muistiin kerralla. Suuret taulukot ja kuvat ylittävät PHP memory limitin.\n\n**Luokittelu:** INTEGRAATIOVIRHE - PHP muistirajoitus PDF-generoinnissa.\n\n**Suositus:** Nosta PHP memory_limit 512M:iin PDF-generoinnissa tai siirry streamaavaan PDF-kirjastoon (TCPDF).",
    rootCause: "mPDF lataa koko dokumentin muistiin - PHP memory_limit ylittyy",
    recommendation: "Nosta memory_limit tai vaihda TCPDF-kirjastoon"
  },

  // --- KONFIGURAATIOVIRHEET (38-42) ---
  {
    testSuite: "Konfiguraatio",
    testCase: "wp-config.php - tietokantayhteys",
    category: "konfiguraatio",
    component: "Tietokanta",
    testTool: "Robot Framework",
    description: "Staging-ympäristön tietokantayhteys katkeaa satunnaisesti. 'Error establishing a database connection' -virhe esiintyy ruuhka-aikoina.",
    agentAnalysis: "**Juurisyyanalyysi:** wp-config.php:n DB_HOST osoittaa yksittäiseen tietokantapalvelimeen eikä RDS-klusteriin. Connection pool on liian pieni (max 10) tuotantokuormalle.\n\n**Luokittelu:** KONFIGURAATIOVIRHE - Tietokantakonfiguraatio puutteellinen.\n\n**Suositus:** Vaihda DB_HOST osoittamaan RDS-klusterin read replica -endpointiin ja nosta max_connections 50:een.",
    rootCause: "DB_HOST osoittaa yksittäiseen palvelimeen - connection pool liian pieni",
    recommendation: "Käytä RDS-klusterin endpointia ja nosta connection pool"
  },
  {
    testSuite: "Konfiguraatio",
    testCase: "Multisite - domain mapping",
    category: "konfiguraatio",
    component: "Multisite",
    testTool: "Playwright",
    description: "Uuden virastosivuston domain mapping ei toimi. Sivu vastaa päädomainilla mutta ei virastokohtaisella domainilla (esim. konkurssiasiamies.fi).",
    agentAnalysis: "**Juurisyyanalyysi:** WordPress Multisite -domain mapping vaatii sekä DNS-tietueen, sunrise.php-konfiguraation että SSL-sertifikaatin jokaiselle domainille. konkurssiasiamies.fi:n sunrise.php-merkintä puuttuu.\n\n**Luokittelu:** KONFIGURAATIOVIRHE - Domain mapping puutteellinen.\n\n**Suositus:** Lisää domain mapping sunrise.php:hen ja varmista wildcard SSL -sertifikaatti kattaa domainin.",
    rootCause: "sunrise.php:sta puuttuu domain mapping -merkintä uudelle virastosivulle",
    recommendation: "Lisää sunrise.php-merkintä ja varmista SSL-sertifikaatti"
  },
  {
    testSuite: "Konfiguraatio",
    testCase: "PHP-versio - yhteensopivuus",
    category: "konfiguraatio",
    component: "Palvelin",
    testTool: "Robot Framework",
    description: "PHP 8.3 -päivityksen jälkeen useita deprecation warning -viestejä. Jotkin pluginit käyttävät PHP 8.2:ssa poistettuja funktioita.",
    agentAnalysis: "**Juurisyyanalyysi:** PHP 8.3 poisti utf8_encode()/utf8_decode() -funktiot. Useat pluginit ja teema käyttävät näitä funktioita tietokantadatan käsittelyssä.\n\n**Luokittelu:** KONFIGURAATIOVIRHE - PHP-versioyhteensopivuus.\n\n**Suositus:** Korvaa utf8_encode() → mb_convert_encoding($s, 'UTF-8', 'ISO-8859-1') kaikissa plugineissa ja teemassa.",
    rootCause: "PHP 8.3 poisti utf8_encode()/utf8_decode() - pluginit käyttävät näitä",
    recommendation: "Vaihda mb_convert_encoding()-funktioon kaikkialla"
  },
  {
    testSuite: "Konfiguraatio",
    testCase: ".htaccess - URL-rewrite",
    category: "konfiguraatio",
    component: "Palvelin",
    testTool: "Robot Framework",
    description: "Kauniit URL:t (permalinks) eivät toimi. Kaikki sivut paitsi etusivu palauttavat 404. .htaccess-tiedostossa väärät rewrite-säännöt.",
    agentAnalysis: "**Juurisyyanalyysi:** Apache mod_rewrite ei ole aktivoitu uudella palvelimella. .htaccess-tiedoston RewriteRules eivät toimi ilman mod_rewrite-moduulia.\n\n**Luokittelu:** KONFIGURAATIOVIRHE - Apache-moduuli puuttuu.\n\n**Suositus:** Aktivoi mod_rewrite: a2enmod rewrite && systemctl restart apache2.",
    rootCause: "Apache mod_rewrite ei ole aktivoitu palvelimella",
    recommendation: "Aktivoi mod_rewrite-moduuli"
  },
  {
    testSuite: "Konfiguraatio",
    testCase: "Cron-ajastukset",
    category: "konfiguraatio",
    component: "Ylläpito",
    testTool: "Robot Framework",
    description: "WP-Cron-ajastukset eivät suoriudu ajallaan. Ajastetut julkaisut, varmuuskopiot ja synkronoinnit myöhästyvät tunneilla.",
    agentAnalysis: "**Juurisyyanalyysi:** WP-Cron perustuu sivulatausten triggeröintiin. Staging-ympäristössä on vähän liikennettä, joten cron-ajot eivät käynnisty.\n\n**Luokittelu:** KONFIGURAATIOVIRHE - WP-Cron ei sovellu vähäliikenteiseen ympäristöön.\n\n**Suositus:** Ota käyttöön system cron: define('DISABLE_WP_CRON', true); ja lisää crontab: */5 * * * * wget -q -O - https://site.fi/wp-cron.php",
    rootCause: "WP-Cron riippuu sivulatauksista - staging-ympäristössä vähän liikennettä",
    recommendation: "Vaihda system croniin ja poista WP-Cron käytöstä"
  },

  // --- SUORITUSKYKYONGELMAT (43-51) ---
  {
    testSuite: "Suorituskyky",
    testCase: "Etusivun latausaika",
    category: "suorituskyky",
    component: "Etusivu",
    testTool: "Lighthouse",
    description: "Etusivun LCP (Largest Contentful Paint) on 5.8s - tavoite < 2.5s. Hero-kuva on 4.2MB eikä ole WebP-muodossa.",
    agentAnalysis: "**Juurisyyanalyysi:** Hero-kuva on alkuperäisessä JPEG-muodossa ilman optimointia. WordPress ei generoi automaattisesti WebP-versioita. Kuvaa ei lazyloadata, joten se estää renderöinnin.\n\n**Luokittelu:** SUORITUSKYKYONGELMA - Kuvaoptimointi puuttuu.\n\n**Suositus:** Ota WebP-konversio käyttöön (ShortPixel/Imagify-plugin). Lisää srcset ja sizes -attribuutit. Preloadaa hero-kuva.",
    rootCause: "Hero-kuva 4.2MB ilman optimointia - ei WebP, ei lazy load",
    recommendation: "Ota WebP-konversio käyttöön ja preloadaa hero-kuva"
  },
  {
    testSuite: "Suorituskyky",
    testCase: "Tietokantakyselyiden suorituskyky",
    category: "suorituskyky",
    component: "Tietokanta",
    testTool: "Robot Framework",
    description: "wp_postmeta-taulun kyselyt kestävät > 3s. EXPLAIN-analyysi näyttää full table scanin 2.5M rivillä. Indeksit puuttuvat.",
    agentAnalysis: "**Juurisyyanalyysi:** wp_postmeta-taulusta puuttuu komposiitti-indeksi (meta_key, meta_value) jota ACF-kenttäkyselyt käyttävät. Taulu on kasvanut 2.5M riviin ilman ylläpitoa.\n\n**Luokittelu:** SUORITUSKYKYONGELMA - Tietokantaindeksit puuttuvat.\n\n**Suositus:** Lisää indeksi: CREATE INDEX idx_postmeta_key_value ON wp_postmeta (meta_key(191), meta_value(191)). Harkitse postmeta-taulun siivousta.",
    rootCause: "wp_postmeta-taulusta puuttuu komposiitti-indeksi - 2.5M riviä full scan",
    recommendation: "Lisää komposiitti-indeksi ja siivoa tarpeettomat metatiedot"
  },
  {
    testSuite: "Suorituskyky",
    testCase: "JavaScript-bundle koko",
    category: "suorituskyky",
    component: "Frontend",
    testTool: "Lighthouse",
    description: "JavaScript-bundle on 1.8MB (gzipped 450KB). TBT (Total Blocking Time) 2.1s. Lighthouse Performance-pisteet 38/100.",
    agentAnalysis: "**Juurisyyanalyysi:** Teeman build-prosessi ei tee code splitting -optimointia. Kaikki JavaScript pakataan yhteen bundle.js-tiedostoon, mukaan lukien kirjastot joita käytetään vain yksittäisillä sivuilla.\n\n**Luokittelu:** SUORITUSKYKYONGELMA - JavaScript-optimointi puuttuu.\n\n**Suositus:** Toteuta code splitting webpack/vite-konfiguraatiossa. Lataa kirjastot (Swiper, Chart.js) vain sivuilla jotka niitä käyttävät.",
    rootCause: "JavaScript-bundle ei ole code splitted - kaikki yhdessä tiedostossa",
    recommendation: "Toteuta code splitting ja lataa kirjastot vain tarvittaessa"
  },
  {
    testSuite: "Suorituskyky",
    testCase: "TTFB (Time to First Byte)",
    category: "suorituskyky",
    component: "Palvelin",
    testTool: "Lighthouse",
    description: "TTFB on 2.3s - tavoite < 0.8s. Palvelin vastaa hitaasti erityisesti arkivirastosivuilla joilla on paljon ACF-kenttähakuja.",
    agentAnalysis: "**Juurisyyanalyysi:** Jokainen ACF-kenttähaku tekee erillisen tietokantakyselyn. Arkistosivu tekee 150+ meta-kyselyä per sivu ilman object cachea.\n\n**Luokittelu:** SUORITUSKYKYONGELMA - N+1 query -ongelma.\n\n**Suositus:** Ota Redis object cache käyttöön. Optimoi ACF-kyselyt eager loading -tekniikalla.",
    rootCause: "150+ meta-kyselyä per sivu ilman object cachea - N+1 query ongelma",
    recommendation: "Ota Redis object cache käyttöön ja optimoi ACF-kyselyt"
  },
  {
    testSuite: "Suorituskyky",
    testCase: "Cumulative Layout Shift",
    category: "suorituskyky",
    component: "Frontend",
    testTool: "Lighthouse",
    description: "CLS (Cumulative Layout Shift) arvo 0.42 - tavoite < 0.1. Sivun elementit hyppivät kun kuvat, fontit ja mainokset latautuvat.",
    agentAnalysis: "**Juurisyyanalyysi:** Kuvilla ei ole width/height-attribuutteja HTML:ssä. Web-fontit latauvat FOUT-efektillä (Flash of Unstyled Text) ja aiheuttavat layout shiftejä.\n\n**Luokittelu:** SUORITUSKYKYONGELMA - Layout stability puutteellinen.\n\n**Suositus:** Lisää width/height kuville, käytä font-display: optional ja aspect-ratio CSS-ominaisuutta.",
    rootCause: "Kuvien dimensiot puuttuvat HTML:stä ja fontit aiheuttavat FOUT-efektin",
    recommendation: "Lisää kuvien dimensiot ja käytä font-display: optional"
  },
  {
    testSuite: "Suorituskyky",
    testCase: "API-vastausajat",
    category: "suorituskyky",
    component: "REST API",
    testTool: "Robot Framework",
    description: "REST API:n /wp-json/wp/v2/posts -endpoint vastausaika 4.7s 100 artikkelilla. WPGraphQL-endpoint samalle datalle 1.2s.",
    agentAnalysis: "**Juurisyyanalyysi:** WP REST API serialisoi kaikki kentät jokaiselle artikkelille, mukaan lukien ACF-kentät ja oEmbed-sisällöt. _fields-parametria ei käytetä kyselyissä.\n\n**Luokittelu:** SUORITUSKYKYONGELMA - REST API overfetching.\n\n**Suositus:** Käytä _fields-parametria: /wp/v2/posts?_fields=id,title,date,slug. Harkitse WPGraphQL-siirtymää.",
    rootCause: "REST API serialisoi kaikki kentät - overfetching ilman _fields-parametria",
    recommendation: "Käytä _fields-parametria tai siirry WPGraphQL:ään"
  },
  {
    testSuite: "Suorituskyky",
    testCase: "WooCommerce-ostoskori",
    category: "suorituskyky",
    component: "Verkkokauppa",
    testTool: "Lighthouse",
    description: "Julkaisukaupan (maksulliset säädöskokoelmat) ostoskori latautuu hitaasti. Ajax cart -päivitys kestää 8s kun korissa > 20 tuotetta.",
    agentAnalysis: "**Juurisyyanalyysi:** WooCommerce cart fragment -Ajax-kutsu laskee verot ja toimituskulut joka päivityksessä. 20+ tuotteella laskenta on raskas ilman cachea.\n\n**Luokittelu:** SUORITUSKYKYONGELMA - WooCommerce cart -laskenta hidas.\n\n**Suositus:** Cacheta cart fragment -vastaukset. Siirrä vero/toimituslaskenta checkout-vaiheeseen.",
    rootCause: "Cart fragment laskee verot/toimitukset joka päivityksellä - hidas > 20 tuotteella",
    recommendation: "Cacheta cart fragment ja siirrä laskenta checkoutiin"
  },
  {
    testSuite: "Suorituskyky",
    testCase: "Mobiili First Input Delay",
    category: "suorituskyky",
    component: "Frontend",
    testTool: "Lighthouse",
    description: "Mobiilissa FID 340ms - tavoite < 100ms. Käyttäjän ensimmäinen vuorovaikutus (esim. valikon avaus) reagoi hitaasti.",
    agentAnalysis: "**Juurisyyanalyysi:** Main thread on blokattuna 340ms JavaScript-parsinnin aikana. Render-blocking skriptit latautuvat synkronisesti header-osiossa.\n\n**Luokittelu:** SUORITUSKYKYONGELMA - JavaScript render-blocking.\n\n**Suositus:** Siirrä non-critical JS:t defer/async-lataukseen. Käytä requestIdleCallback ei-kriittisille skripteille.",
    rootCause: "Render-blocking JavaScript blokaa main threadin 340ms",
    recommendation: "Käytä defer/async ja requestIdleCallback"
  },

  // --- SAAVUTETTAVUUSVIRHEET (52-60) ---
  {
    testSuite: "Saavutettavuus - WCAG 2.1 AA",
    testCase: "Värikontrasti - leipäteksti",
    category: "saavutettavuus",
    component: "Sivupohjat",
    testTool: "WAVE",
    description: "Leipätekstin värikontrasti 3.2:1 - WCAG AA vaatii vähintään 4.5:1. Harmaa teksti (#999) valkoisella taustalla. 47 sivua affected.",
    agentAnalysis: "**Juurisyyanalyysi:** Teeman design system käyttää liian vaaleaa harmaata (#999999) leipätekstissä. Tämä alittaa WCAG 2.1 AA -kontrastivaatimuksen (4.5:1 normaalille tekstille).\n\n**Luokittelu:** SAAVUTETTAVUUSVIRHE - WCAG 1.4.3 Contrast (Minimum).\n\n**Suositus:** Vaihda leipätekstin väri vähintään #595959 (kontrasti 7:1) tai #767676 (4.5:1 minimiraja).",
    rootCause: "Teeman leipätekstiväri #999 alittaa WCAG AA 4.5:1 kontrastivaatimuksen",
    recommendation: "Vaihda leipätekstiväriksi vähintään #767676"
  },
  {
    testSuite: "Saavutettavuus - WCAG 2.1 AA",
    testCase: "Kuvien alt-tekstit",
    category: "saavutettavuus",
    component: "Sisällönhallinta",
    testTool: "WAVE",
    description: "234 kuvaa ilman alt-tekstiä. Sisällöntuottajat eivät ole täyttäneet alt-kenttiä mediagalleriassa. Ruudunlukija ohittaa informatiiviset kuvat.",
    agentAnalysis: "**Juurisyyanalyysi:** WordPress ei pakota alt-tekstin syöttämistä kuvan lisäyksessä. Sisällöntuottajille ei ole annettu ohjeistusta alt-tekstien kirjoittamiseen.\n\n**Luokittelu:** SAAVUTETTAVUUSVIRHE - WCAG 1.1.1 Non-text Content.\n\n**Suositus:** Lisää pakollinen alt-kenttä kuvan lisäysdialogiin (custom plugin). Tee alt-teksti-ohjeistus sisällöntuottajille.",
    rootCause: "WP ei pakota alt-tekstiä - sisällöntuottajilla ei ohjeistusta",
    recommendation: "Pakota alt-kenttä ja luo ohjeistus sisällöntuottajille"
  },
  {
    testSuite: "Saavutettavuus - WCAG 2.1 AA",
    testCase: "Näppäimistönavigaatio",
    category: "saavutettavuus",
    component: "Navigaatio",
    testTool: "WAVE",
    description: "Tab-järjestys on rikki päänavigaatiossa. Focus skippaa dropdown-valikon ja hyppää suoraan footeriin. Näppäimistökäyttäjä ei pääse alasivuille.",
    agentAnalysis: "**Juurisyyanalyysi:** Mega-menu-komponentti käyttää visibility: hidden piilottamiseen, joka poistaa elementit tab-järjestyksestä. Focus trap puuttuu dropdown-valikosta.\n\n**Luokittelu:** SAAVUTETTAVUUSVIRHE - WCAG 2.1.1 Keyboard.\n\n**Suositus:** Vaihda visibility:hidden → aria-expanded/aria-hidden ja lisää focus management dropdown-valikolle.",
    rootCause: "Mega-menu käyttää visibility:hidden - poistaa elementit tab-järjestyksestä",
    recommendation: "Käytä aria-expanded/aria-hidden ja lisää focus management"
  },
  {
    testSuite: "Saavutettavuus - WCAG 2.1 AA",
    testCase: "Lomakkeiden virheilmoitukset",
    category: "saavutettavuus",
    component: "Lomakkeet",
    testTool: "WAVE",
    description: "Lomakkeiden virheilmoitukset eivät välity ruudunlukijalle. Virheen sattuessa vain visuaalinen punainen reunus - ei ARIA-ilmoitusta eikä virheviestiä ruudunlukijalle.",
    agentAnalysis: "**Juurisyyanalyysi:** Lomakkeiden validointi käyttää puhtaasti visuaalista palautetta (punainen border) ilman ARIA-attribuutteja. aria-invalid, aria-describedby ja role='alert' puuttuvat.\n\n**Luokittelu:** SAAVUTETTAVUUSVIRHE - WCAG 3.3.1 Error Identification.\n\n**Suositus:** Lisää aria-invalid='true' virheellisille kentille, aria-describedby virheviesteille ja role='alert' virhealueille.",
    rootCause: "Lomakevirheiden ARIA-attribuutit puuttuvat - vain visuaalinen palaute",
    recommendation: "Lisää aria-invalid, aria-describedby ja role='alert'"
  },
  {
    testSuite: "Saavutettavuus - WCAG 2.1 AA",
    testCase: "Skip navigation -linkki",
    category: "saavutettavuus",
    component: "Navigaatio",
    testTool: "WAVE",
    description: "Skip to main content -linkki puuttuu kaikilta sivuilta. Näppäimistökäyttäjä joutuu tabbaamaan koko navigaation läpi jokaisella sivulatauksella.",
    agentAnalysis: "**Juurisyyanalyysi:** Skip navigation -linkki ei ole toteutettu teemassa. Tämä on perustavanlaatuinen saavutettavuuspuute joka vaikuttaa kaikkiin näppäimistökäyttäjiin.\n\n**Luokittelu:** SAAVUTETTAVUUSVIRHE - WCAG 2.4.1 Bypass Blocks.\n\n**Suositus:** Lisää <a href='#main-content' class='skip-link'>Siirry sisältöön</a> heti body-tagin jälkeen.",
    rootCause: "Skip navigation -linkki puuttuu teemasta kokonaan",
    recommendation: "Lisää skip-link jokaiselle sivulle"
  },
  {
    testSuite: "Saavutettavuus - WCAG 2.1 AA",
    testCase: "Heading-hierarkia",
    category: "saavutettavuus",
    component: "Sisällönhallinta",
    testTool: "WAVE",
    description: "Heading-hierarkia rikki useilla sivuilla. H1 puuttuu, H2:n jälkeen tulee suoraan H4. Ruudunlukijan navigointi otsikkohierarkialla epälooginen.",
    agentAnalysis: "**Juurisyyanalyysi:** Sisällöntuottajat valitsevat heading-tasoja visuaalisen koon perusteella, ei semanttisen hierarkian. WP-editori ei varoita rikkinäisestä hierarkiasta.\n\n**Luokittelu:** SAAVUTETTAVUUSVIRHE - WCAG 1.3.1 Info and Relationships.\n\n**Suositus:** Lisää heading-hierarkian validointi editoriin (custom plugin). Korjaa olemassa olevien sivujen hierarkia.",
    rootCause: "Sisällöntuottajat valitsevat heading-tasoja visuaalisesti - ei hierarkiavalidointia",
    recommendation: "Lisää heading-hierarkian validointi ja korjaa nykyiset sivut"
  },
  {
    testSuite: "Saavutettavuus - WCAG 2.1 AA",
    testCase: "Video-tekstitykset",
    category: "saavutettavuus",
    component: "Mediahallinta",
    testTool: "WAVE",
    description: "12 upotetusta videosta 9:llä puuttuu tekstitykset. Videoissa puhutaan suomeksi mutta tekstityksiä ei ole suomeksi, ruotsiksi eikä englanniksi.",
    agentAnalysis: "**Juurisyyanalyysi:** Videopalvelun (YouTube/Vimeo) automaattiset tekstitykset eivät ole riittävän laadukkaita viralliseen käyttöön. Manuaalisia tekstityksiä ei ole tilattu.\n\n**Luokittelu:** SAAVUTETTAVUUSVIRHE - WCAG 1.2.2 Captions (Prerecorded).\n\n**Suositus:** Tilaa manuaaliset tekstitykset kaikille videoille (FI, SV, EN). Käytä VTT-formaattia.",
    rootCause: "Videoiden manuaaliset tekstitykset puuttuvat - automaattiset eivät riitä",
    recommendation: "Tilaa manuaaliset tekstitykset (FI/SV/EN) VTT-formaatissa"
  },
  {
    testSuite: "Saavutettavuus - WCAG 2.1 AA",
    testCase: "Focus-indikaattori",
    category: "saavutettavuus",
    component: "Sivupohjat",
    testTool: "WAVE",
    description: "Focus-indikaattori (outline) on piilotettu CSS:llä: outline: none. Näppäimistökäyttäjä ei näe missä elementissä focus on.",
    agentAnalysis: "**Juurisyyanalyysi:** Teeman CSS sisältää globaalin *:focus { outline: none; } -säännön, todennäköisesti visuaalisten syiden vuoksi. Tämä poistaa focus-indikaattorin kaikilta elementeiltä.\n\n**Luokittelu:** SAAVUTETTAVUUSVIRHE - WCAG 2.4.7 Focus Visible.\n\n**Suositus:** Poista outline:none ja korvaa :focus-visible-selektorilla joka näyttää outlandin vain näppäimistökäyttäjille.",
    rootCause: "Globaali CSS outline:none piilottaa focus-indikaattorin",
    recommendation: "Käytä :focus-visible -selektoria outline:none sijaan"
  },
  {
    testSuite: "Saavutettavuus - WCAG 2.1 AA",
    testCase: "Kielen määritys",
    category: "saavutettavuus",
    component: "Sivupohjat",
    testTool: "WAVE",
    description: "HTML lang-attribuutti on 'en' vaikka sisältö on suomeksi. Ruudunlukija lukee suomenkielisen sisällön englannin ääntämyssäännöillä.",
    agentAnalysis: "**Juurisyyanalyysi:** WordPress-asennuksen kieliasetus on suomi, mutta WPML-plugin ylikirjoittaa html lang -attribuutin arvolla 'en' virheellisesti.\n\n**Luokittelu:** SAAVUTETTAVUUSVIRHE - WCAG 3.1.1 Language of Page.\n\n**Suositus:** Korjaa WPML-konfiguraatio: Settings → Language → SEO → varmista 'Use language in HTML lang' on oikein.",
    rootCause: "WPML ylikirjoittaa html lang -attribuutin virheellisesti arvolla 'en'",
    recommendation: "Korjaa WPML:n kieliasetukset"
  },

  // --- TIETOTURVAONGELMAT (61-67) ---
  {
    testSuite: "Tietoturva - OWASP",
    testCase: "XSS - hakukenttä",
    category: "tietoturva",
    component: "Hakutoiminto",
    testTool: "OWASP ZAP",
    description: "Reflected XSS -haavoittuvuus hakukentässä. Hakutermi tulostetaan sivulle ilman sanitointia: /?s=<script>alert(1)</script> suorittaa skriptin.",
    agentAnalysis: "**Juurisyyanalyysi:** Teeman search.php tulostaa hakutermin get_search_query() -funktiolla ilman esc_html() -wrapperia. WordPress ei automaattisesti sanitoi kaikkia tulosteita.\n\n**Luokittelu:** TIETOTURVAONGELMA - OWASP A7: Cross-Site Scripting (XSS). KRIITTINEN.\n\n**Suositus:** Wrap kaikki tulosteet esc_html():llä: esc_html(get_search_query()). Auditoi kaikki template-tiedostot vastaavien puutteiden varalta.",
    rootCause: "Hakutermi tulostetaan ilman esc_html()-sanitointia search.php:ssä",
    recommendation: "Lisää esc_html() ja auditoi kaikki template-tulosteet"
  },
  {
    testSuite: "Tietoturva - OWASP",
    testCase: "SQL Injection - ACF-kenttähaku",
    category: "tietoturva",
    component: "REST API",
    testTool: "OWASP ZAP",
    description: "SQL Injection -haavoittuvuus custom REST API -endpointissa. ACF-kenttähaku ei käytä prepared statementsia: /wp-json/custom/v1/search?meta='; DROP TABLE--",
    agentAnalysis: "**Juurisyyanalyysi:** Custom REST API -endpoint käyttää suoraa $wpdb->query() -kutsua ilman $wpdb->prepare() -funktiota. Käyttäjän syöte menee suoraan SQL-kyselyyn.\n\n**Luokittelu:** TIETOTURVAONGELMA - OWASP A3: Injection. KRIITTINEN.\n\n**Suositus:** Käytä $wpdb->prepare() kaikissa tietokantakyselyissä. Auditoi kaikki custom REST API -endpointit.",
    rootCause: "Custom REST endpoint ei käytä $wpdb->prepare() - SQL injection mahdollinen",
    recommendation: "Käytä $wpdb->prepare() ja auditoi kaikki custom endpointit"
  },
  {
    testSuite: "Tietoturva - OWASP",
    testCase: "CSRF - asetussivut",
    category: "tietoturva",
    component: "Admin",
    testTool: "OWASP ZAP",
    description: "CSRF-suojaus puuttuu custom asetussivuilta. Hyökkääjä voi muuttaa sivuston asetuksia lähettämällä adminille linkki joka tekee POST-pyynnön.",
    agentAnalysis: "**Juurisyyanalyysi:** Custom settings -sivut eivät käytä wp_nonce_field()/wp_verify_nonce() -mekanismia. Lomakkeista puuttuu CSRF-token.\n\n**Luokittelu:** TIETOTURVAONGELMA - OWASP A5: Security Misconfiguration.\n\n**Suositus:** Lisää wp_nonce_field('custom_settings') kaikkiin admin-lomakkeisiin ja tarkista wp_verify_nonce() käsittelijässä.",
    rootCause: "Custom admin-sivujen CSRF-suojaus (nonce) puuttuu",
    recommendation: "Lisää wp_nonce_field/wp_verify_nonce kaikkiin admin-lomakkeisiin"
  },
  {
    testSuite: "Tietoturva - SSL/TLS",
    testCase: "Mixed content -varoitukset",
    category: "tietoturva",
    component: "Sivupohjat",
    testTool: "OWASP ZAP",
    description: "23 sivulla mixed content -varoituksia. HTTP-kuvia ladataan HTTPS-sivulle: ulkoiset logot ja vanhan sisällön kuvat viittaavat HTTP-osoitteisiin.",
    agentAnalysis: "**Juurisyyanalyysi:** Sisältömigraatiossa vanhat HTTP-URL:t eivät ole päivittyneet HTTPS-muotoon. Joidenkin ulkoisten palveluiden logot ovat hardkoodattuja HTTP:nä.\n\n**Luokittelu:** TIETOTURVAONGELMA - Mixed content.\n\n**Suositus:** Aja Search & Replace tietokannassa: http://→ https://. Päivitä ulkoiset URL:t.",
    rootCause: "Vanhat HTTP-URL:t sisällössä ja ulkoisissa viitteissä",
    recommendation: "Aja Search & Replace ja päivitä ulkoiset URL:t"
  },
  {
    testSuite: "Tietoturva - headerit",
    testCase: "Security headers puuttuvat",
    category: "tietoturva",
    component: "Palvelin",
    testTool: "OWASP ZAP",
    description: "Tietoturvaheaderit puuttuvat: Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.",
    agentAnalysis: "**Juurisyyanalyysi:** Palvelinkonfiguraatiossa ei ole määritelty security headereitä. WordPress ei lisää niitä oletuksena.\n\n**Luokittelu:** TIETOTURVAONGELMA - Puuttuvat security headers.\n\n**Suositus:** Lisää security headers .htaccess-tiedostoon tai nginx-konfiguraatioon. Aloita X-Content-Type-Options ja X-Frame-Options -headereista.",
    rootCause: "Security headers puuttuvat palvelinkonfiguraatiosta",
    recommendation: "Lisää security headers palvelinkonfiguraatioon"
  },
  {
    testSuite: "Tietoturva - tiedostot",
    testCase: "Arkaluontoiset tiedostot saavutettavissa",
    category: "tietoturva",
    component: "Palvelin",
    testTool: "OWASP ZAP",
    description: "wp-config.php backup-tiedosto (wp-config.php.bak) saavutettavissa selaimella. Sisältää tietokantakredentiaalit ja salausavaimet.",
    agentAnalysis: "**Juurisyyanalyysi:** Joku on luonut wp-config.php:n backup-kopion palvelimelle. .htaccess ei estä .bak-tiedostojen lataamista.\n\n**Luokittelu:** TIETOTURVAONGELMA - KRIITTINEN. Tietokantakredentiaalit alttiina.\n\n**Suositus:** Poista wp-config.php.bak välittömästi. Lisää .htaccess-sääntö estämään .bak/.sql/.log tiedostojen lataus. Vaihda tietokannan salasana ja salausavaimet.",
    rootCause: "wp-config.php.bak backup-tiedosto saavutettavissa julkisesti",
    recommendation: "Poista tiedosto, estä .bak-lataukset, vaihda salasanat ja avaimet"
  },
  {
    testSuite: "Tietoturva - autentikointi",
    testCase: "Käyttäjien enumerointi",
    category: "tietoturva",
    component: "Käyttäjähallinta",
    testTool: "OWASP ZAP",
    description: "Käyttäjätunnukset ovat lueteltavissa REST API:n kautta: /wp-json/wp/v2/users palauttaa kaikki käyttäjät ja heidän login-nimensä.",
    agentAnalysis: "**Juurisyyanalyysi:** WP REST API paljastaa oletuksena käyttäjien tiedot (username, slug, name). Tätä voidaan hyödyntää brute force -hyökkäyksissä.\n\n**Luokittelu:** TIETOTURVAONGELMA - Käyttäjätietojen vuoto.\n\n**Suositus:** Estä /wp-json/wp/v2/users -endpoint autentikoimattomilta käyttäjiltä. Käytä Wordfencen user enumeration protection -ominaisuutta.",
    rootCause: "WP REST API paljastaa käyttäjätiedot autentikoimattomille pyynnöille",
    recommendation: "Rajoita users-endpoint autentikoiduille käyttäjille"
  },

  // --- LOMAKEVIRHEET (68-74) ---
  {
    testSuite: "Lomakkeet",
    testCase: "Yhteydenottolomake - validointi",
    category: "lomakevirhe",
    component: "Lomakkeet",
    testTool: "Cypress",
    description: "Yhteydenottolomakkeen sähköpostivalidointi hyväksyy virheellisiä osoitteita: 'user@' ja '@domain.fi' menevät läpi. Backend-validointi puuttuu.",
    agentAnalysis: "**Juurisyyanalyysi:** Lomake käyttää vain HTML5 type='email' -validointia joka on riittämätön. Server-side validointi puuttuu kokonaan Gravity Forms -hookista.\n\n**Luokittelu:** LOMAKEVIRHE - Puutteellinen validointi.\n\n**Suositus:** Lisää server-side sähköpostivalidointi gform_validation -hookiin. Käytä is_email() WordPress-funktiota.",
    rootCause: "Vain HTML5-validointi - server-side sähköpostivalidointi puuttuu",
    recommendation: "Lisää server-side validointi gform_validation-hookilla"
  },
  {
    testSuite: "Lomakkeet",
    testCase: "Valituslomake - tiedostolataus",
    category: "lomakevirhe",
    component: "Lomakkeet",
    testTool: "Cypress",
    description: "Valituslomakkeen liitetiedoston lataus epäonnistuu yli 2MB tiedostoilla. Virheviesti epäselvä: 'Lomakkeen lähetys epäonnistui' - ei mainita tiedostokokorajoitusta.",
    agentAnalysis: "**Juurisyyanalyysi:** PHP upload_max_filesize on 2M mutta lomake sallii 10MB liitteet. Virheenkäsittely ei tunnista PHP-upload virhettä ja näyttää geneerisen virheviestin.\n\n**Luokittelu:** LOMAKEVIRHE - PHP/lomake-konfiguraatioristiriita.\n\n**Suositus:** Nosta PHP upload_max_filesize 10M:iin tai rajoita lomake 2M:iin. Paranna virheviestiä.",
    rootCause: "PHP upload_max_filesize (2M) ristiriidassa lomakkeen 10M-rajan kanssa",
    recommendation: "Synkronoi rajoitukset ja paranna virheviestiä"
  },
  {
    testSuite: "Lomakkeet",
    testCase: "Ajanvarauslomake - päivämäärä",
    category: "lomakevirhe",
    component: "Lomakkeet",
    testTool: "Cypress",
    description: "Ajanvarauslomakkeen päivämäärävalitsin näyttää menneitä päivämääriä valittavina. Käyttäjä voi varata ajan eiliselle päivälle.",
    agentAnalysis: "**Juurisyyanalyysi:** Datepicker-komponentissa ei ole minDate-rajoitusta. jQuery UI Datepicker ei oletuksena estä menneitä päivämääriä.\n\n**Luokittelu:** LOMAKEVIRHE - Päivämäärävalidointi puutteellinen.\n\n**Suositus:** Lisää minDate: 1 (huominen) datepicker-konfiguraatioon. Lisää myös server-side validointi.",
    rootCause: "Datepicker-komponentista puuttuu minDate-rajoitus",
    recommendation: "Lisää minDate-rajoitus ja server-side validointi"
  },
  {
    testSuite: "Lomakkeet",
    testCase: "Hakemuslomake - monisivuinen",
    category: "lomakevirhe",
    component: "Lomakkeet",
    testTool: "Cypress",
    description: "Monisivuisen hakemuslomakkeen edistymispalkki ei päivity. Käyttäjä ei tiedä missä vaiheessa on. Takaisin-painike tyhjentää edelliset vastaukset.",
    agentAnalysis: "**Juurisyyanalyysi:** Gravity Forms -multistep lomakkeen JavaScript-komponentti on ristiriidassa teeman jQuery-version kanssa. Progress bar ei saa päivitystapahtumia.\n\n**Luokittelu:** LOMAKEVIRHE - jQuery-versiokonflikt.\n\n**Suositus:** Varmista yhteensopiva jQuery-versio. Toteuta edistymispalkki ja vastaustalletus sessionStorageen.",
    rootCause: "jQuery-versiokonflikt rikkoo multistep-lomakkeen progress barin",
    recommendation: "Ratkaise jQuery-konflikti ja tallenna vastaukset sessionStorageen"
  },
  {
    testSuite: "Lomakkeet",
    testCase: "Palautelomake - CAPTCHA",
    category: "lomakevirhe",
    component: "Lomakkeet",
    testTool: "Cypress",
    description: "reCAPTCHA v3 ei lataudu palautelomakkeella. Konsolissa: 'ReCaptcha placeholder element must be an element or id'. Bottispämmi läpi.",
    agentAnalysis: "**Juurisyyanalyysi:** reCAPTCHA v3 -skripti latautuu ennen DOM-elementtiä johon se kiinnittyy. Asynkroninen latausjärjestys on väärä teeman script-enqueue -järjestyksessä.\n\n**Luokittelu:** LOMAKEVIRHE - reCAPTCHA latausjärjestysvirhe.\n\n**Suositus:** Siirrä reCAPTCHA-skriptin lataus footer-hookiin. Käytä DOMContentLoaded-tapahtumaa alustuksessa.",
    rootCause: "reCAPTCHA-skripti latautuu ennen DOM-elementtiä - latausjärjestys väärä",
    recommendation: "Lataa reCAPTCHA footerissa ja käytä DOMContentLoaded"
  },
  {
    testSuite: "Lomakkeet",
    testCase: "Lomakkeen kieliversiot",
    category: "lomakevirhe",
    component: "Lomakkeet",
    testTool: "Cypress",
    description: "Ruotsinkielisen lomakkeen kenttänimet ovat suomeksi. Validointiviestit englannniksi. Kolme kieltä sekaisin yhdessä lomakkeessa.",
    agentAnalysis: "**Juurisyyanalyysi:** Gravity Forms -lomakkeiden käännökset tehdään WPML String Translation -moduulilla, mutta lomakekenttien label-käännökset ovat jääneet tekemättä. JavaScript-validointiviestit tulevat selaimen oletuskielellä.\n\n**Luokittelu:** LOMAKEVIRHE - Monikielisyysongelma.\n\n**Suositus:** Käännä kaikki lomakekentät WPML String Translationilla. Käännä JavaScript-validointiviestit lokalisaatiotiedostoissa.",
    rootCause: "Lomakekenttien WPML-käännökset puuttuvat - validointiviestit ei-lokalisoitu",
    recommendation: "Käännä kaikki kentät ja validointiviestit"
  },
  {
    testSuite: "Lomakkeet",
    testCase: "Henkilötunnuksen validointi",
    category: "lomakevirhe",
    component: "Lomakkeet",
    testTool: "Cypress",
    description: "Henkilötunnuskentän validointi hyväksyy uudenmuotoiset välimerkit (A-Y) mutta hylkää vanhat (+, -, A). Vuosien 1900-1999 henkilötunnukset eivät kelpaa.",
    agentAnalysis: "**Juurisyyanalyysi:** Henkilötunnuksen validointiregex on päivitetty vuoden 2023 uudistuksen mukaiseksi mutta vanha validointi on poistettu kokonaan. Pitäisi tukea sekä vanhaa että uutta muotoa.\n\n**Luokittelu:** LOMAKEVIRHE - Henkilötunnusvalidointi liian tiukka.\n\n**Suositus:** Päivitä regex tukemaan molempia muotoja: vanha (+,-,A) ja uusi (A-Y välimerkit).",
    rootCause: "Henkilötunnusvalidointi ei tue vanhoja välimerkkejä (+, -, A)",
    recommendation: "Tue sekä vanhaa (+,-,A) että uutta (A-Y) henkilötunnusmuotoa"
  },

  // --- SISÄLTÖVIRHEET (75-79) ---
  {
    testSuite: "Sisältö",
    testCase: "Rikkinäiset linkit",
    category: "sisaltovirhe",
    component: "Sisällönhallinta",
    testTool: "Robot Framework",
    description: "87 rikkinäistä sisäistä linkkiä löydetty. Vanhan sivurakenteen URL:t eivät ohjaudu uusille sivuille. 404-virheet.",
    agentAnalysis: "**Juurisyyanalyysi:** Sivuston rakenneuudistuksessa vanhojen sivujen URL:t muuttuivat mutta uudelleenohjauksia ei luotu kattavasti. Redirection-pluginin ohjaustaulukko on vajavainen.\n\n**Luokittelu:** SISÄLTÖVIRHE - Puuttuvat uudelleenohjaukset.\n\n**Suositus:** Tuo vanhojen URL:ien ohjauskartta Redirection-pluginiin. Aja linkintarkistustyökalu koko sivustolle.",
    rootCause: "Rakenneuudistuksen jälkeen uudelleenohjaukset puuttuvat vanhoille URL:eille",
    recommendation: "Luo uudelleenohjauskartta ja tuo se Redirection-pluginiin"
  },
  {
    testSuite: "Sisältö",
    testCase: "Puuttuvat käännökset",
    category: "sisaltovirhe",
    component: "Käännökset",
    testTool: "Robot Framework",
    description: "43 sivua puuttuu ruotsinkielisestä kieliversiosta. Pakollinen kaksikielisyys (FI/SV) ei toteudu lakisääteisten sisältöjen osalta.",
    agentAnalysis: "**Juurisyyanalyysi:** WPML-käännöstyökalusta puuttuu monitorointi joka ilmoittaisi kääntämättömistä sivuista. Sisällöntuottajat eivät tiedä mitkä sivut odottavat käännöstä.\n\n**Luokittelu:** SISÄLTÖVIRHE - Lakisääteinen kaksikielisyysvaatimus.\n\n**Suositus:** Luo WPML-käännösmonitorointi-dashboard joka näyttää kääntämättömät sivut. Priorisoi lakisääteiset sisällöt.",
    rootCause: "43 lakisääteistä sivua puuttuu ruotsinkielisestä versiosta",
    recommendation: "Luo käännösmonitorointi ja priorisoi lakisääteiset sisällöt"
  },
  {
    testSuite: "Sisältö",
    testCase: "Vanhentuneet yhteystiedot",
    category: "sisaltovirhe",
    component: "Sisällönhallinta",
    testTool: "Robot Framework",
    description: "15 sivulla vanhentuneita puhelinnumeroita ja sähköpostiosoitteita. Organisaatiomuutoksen jälkeiset yhteystiedot päivittämättä.",
    agentAnalysis: "**Juurisyyanalyysi:** Yhteystiedot on kovakoodattu yksittäisille sivuille eikä hallittu keskitetysti. Organisaatiomuutoksessa ei ole systemaattista tapaa päivittää kaikkia esiintymiä.\n\n**Luokittelu:** SISÄLTÖVIRHE - Yhteystietojen hallinta puutteellinen.\n\n**Suositus:** Toteuta keskitetty yhteystietorekisteri ACF Options Page -toiminnolla. Korvaa kovakoodatut yhteystiedot shortcodeilla.",
    rootCause: "Yhteystiedot kovakoodattu sivuille - ei keskitettyä hallintaa",
    recommendation: "Luo keskitetty yhteystietorekisteri ACF Options Pagella"
  },
  {
    testSuite: "Sisältö",
    testCase: "PDF-dokumenttien saavutettavuus",
    category: "sisaltovirhe",
    component: "Dokumentit",
    testTool: "WAVE",
    description: "28 PDF-dokumenttia ei ole saavutettavia. Puuttuvat: PDF/UA-tagi, dokumentin kieli, alt-tekstit kuville, heading-rakenne.",
    agentAnalysis: "**Juurisyyanalyysi:** PDF-dokumentit on luotu Word-tiedostoista ilman saavutettavuusasetuksia. Word-lähdedokumenteista puuttuvat heading-tyylit ja kuvien alt-tekstit.\n\n**Luokittelu:** SISÄLTÖVIRHE - PDF-saavutettavuus (EU-direktiivi 2016/2102).\n\n**Suositus:** Korjaa Word-lähdedokumentit: lisää heading-tyylit, alt-tekstit ja kieliasetus. Generoi PDF:t uudelleen saavutettavuusasetuksilla.",
    rootCause: "PDF:t luotu ilman saavutettavuusasetuksia - Word-lähteet puutteelliset",
    recommendation: "Korjaa Word-dokumentit ja generoi saavutettavat PDF:t"
  },
  {
    testSuite: "Sisältö",
    testCase: "Metatiedot - sivukuvaukset",
    category: "sisaltovirhe",
    component: "SEO",
    testTool: "Robot Framework",
    description: "156 sivulta puuttuu meta description. Googlehaussa näkyy satunnainen tekstinpätkä sivulta eikä kuvaavaa yhteenvetoa.",
    agentAnalysis: "**Juurisyyanalyysi:** Yoast SEO -plugin on asennettu mutta sisällöntuottajat eivät ole täyttäneet meta description -kenttää. Oletuskuvaus generoidaan automaattisesti ensimmäisestä kappaleesta.\n\n**Luokittelu:** SISÄLTÖVIRHE - Puuttuvat metatiedot.\n\n**Suositus:** Luo sisällöntuottajille meta description -kirjoitusohje. Listaa sivut joilta puuttuu kuvaus Yoast SEO -työkalulla.",
    rootCause: "Meta description -kentät täyttämättä - ei sisällöntuottajaohjeistusta",
    recommendation: "Luo ohjeistus ja täytä puuttuvat meta descriptionit"
  },

  // --- HAKUTOIMINTOVIRHEET (80-82) ---
  {
    testSuite: "Hakutoiminto",
    testCase: "Sivuston sisäinen haku - relevanssi",
    category: "hakutoiminto",
    component: "Hakutoiminto",
    testTool: "Cypress",
    description: "Sivuston haku palauttaa epärelevantteja tuloksia. Haulla 'avioliitto' ensimmäiset 10 tulosta ovat vanhoja blogikirjoituksia - lakisivu löytyy vasta sijalta 47.",
    agentAnalysis: "**Juurisyyanalyysi:** WordPress-oletushaku käyttää yksinkertaista LIKE-kyselyä eikä huomioi sisällön tyyppiä, tuoreutta tai relevanssia. Blogikirjoituksilla on enemmän osumia koska niissä mainitaan termi useammin.\n\n**Luokittelu:** HAKUTOIMINTOVIRHE - Relevanssijärjestys puutteellinen.\n\n**Suositus:** Ota käyttöön Relevanssi-plugin tai ElasticPress. Konfiguroi sisältötyyppien painotus (sivut > artikkelit).",
    rootCause: "WP-oletushaku ei huomioi relevanssia - yksinkertainen LIKE-kysely",
    recommendation: "Ota Relevanssi/ElasticPress käyttöön ja painota sisältötyyppejä"
  },
  {
    testSuite: "Hakutoiminto",
    testCase: "Haun automaattitäydennys",
    category: "hakutoiminto",
    component: "Hakutoiminto",
    testTool: "Cypress",
    description: "Haun automaattitäydennys (autocomplete) lakkasi toimimasta. AJAX-pyyntö /wp-admin/admin-ajax.php palauttaa tyhjän vastauksen.",
    agentAnalysis: "**Juurisyyanalyysi:** Teeman automaattitäydennys käyttää admin-ajax.php:tä joka vaatii wp_ajax_nopriv_ -hookin julkiselle haulle. Hook-rekisteröinti poistui teemapäivityksessä.\n\n**Luokittelu:** HAKUTOIMINTOVIRHE - Ajax-hookin rekisteröinti puuttuu.\n\n**Suositus:** Palauta wp_ajax_nopriv_autocomplete_search -hookin rekisteröinti functions.php:hen.",
    rootCause: "Ajax autocomplete -hookin rekisteröinti puuttuu teemapäivityksen jälkeen",
    recommendation: "Palauta wp_ajax_nopriv_ hook functions.php:hen"
  },
  {
    testSuite: "Hakutoiminto",
    testCase: "Faceted search - suodattimet",
    category: "hakutoiminto",
    component: "Hakutoiminto",
    testTool: "Cypress",
    description: "Haun suodattimet (virastot, sisältötyyppi, päivämäärä) eivät suodata tuloksia. Kaikki suodatinyhdistelmät palauttavat saman tulosjoukon.",
    agentAnalysis: "**Juurisyyanalyysi:** FacetWP-pluginin lisenssi on vanhentunut ja suodatustoiminto on deaktivoitunut. Plugin näyttää suodattimet mutta ei tee kyselysuodatusta.\n\n**Luokittelu:** HAKUTOIMINTOVIRHE - FacetWP-lisenssi vanhentunut.\n\n**Suositus:** Uusi FacetWP-lisenssi tai korvaa avoimella vaihtoehdolla (SearchWP Facets).",
    rootCause: "FacetWP-lisenssi vanhentunut - suodatustoiminto deaktivoitunut",
    recommendation: "Uusi lisenssi tai vaihda avoimeen vaihtoehtoon"
  }
];

// =============================================================================
// HAVAINTOINSTANSSIT - Arkkityyppi-instanssit eri virastoille ja ajankohtiin
// Muoto: [arkkityypin_indeksi, päivämäärä, viraston_indeksi, vakavuus, tila]
// =============================================================================

const INSTANSSIT = [
  // Salesforce Lead field (0) - vaikuttaa kolmeen virastoon
  [0, "2026-01-15T09:23", 0, "kriittinen", "ratkaistu"],
  [0, "2026-01-15T10:05", 2, "kriittinen", "ratkaistu"],
  [0, "2026-01-15T10:12", 4, "kriittinen", "ratkaistu"],
  // Salesforce Case (1)
  [1, "2026-02-03T14:30", 0, "korkea", "ratkaistu"],
  [1, "2026-02-03T14:45", 5, "korkea", "tutkinnassa"],
  // SF OAuth (2) - vaikuttaa kaikkiin
  [2, "2026-03-01T07:15", 0, "kriittinen", "ratkaistu"],
  [2, "2026-03-01T07:15", 1, "kriittinen", "ratkaistu"],
  [2, "2026-03-01T07:16", 3, "kriittinen", "ratkaistu"],
  [2, "2026-03-01T07:16", 6, "kriittinen", "ratkaistu"],
  // Suomi.fi (3) - viisi virastoa
  [3, "2026-02-15T08:30", 0, "kriittinen", "ratkaistu"],
  [3, "2026-02-15T08:31", 1, "kriittinen", "ratkaistu"],
  [3, "2026-02-15T08:32", 3, "kriittinen", "ratkaistu"],
  [3, "2026-02-15T08:33", 5, "kriittinen", "ratkaistu"],
  [3, "2026-02-15T08:34", 9, "kriittinen", "ratkaistu"],
  // DVV (4)
  [4, "2026-03-10T11:20", 0, "korkea", "tutkinnassa"],
  [4, "2026-03-10T11:25", 3, "korkea", "tutkinnassa"],
  // Posti (5)
  [5, "2026-01-22T16:00", 0, "keskitaso", "ratkaistu"],
  [5, "2026-01-22T16:05", 9, "keskitaso", "ratkaistu"],
  // Google Maps (6)
  [6, "2026-03-20T13:40", 1, "keskitaso", "uusi"],
  [6, "2026-03-20T13:45", 8, "keskitaso", "uusi"],
  // GA4 (7)
  [7, "2026-02-28T10:00", 0, "korkea", "ratkaistu"],
  [7, "2026-02-28T10:05", 4, "korkea", "tutkinnassa"],
  // WP Gutenberg (8)
  [8, "2026-01-20T09:00", 0, "korkea", "ratkaistu"],
  [8, "2026-01-20T09:10", 2, "korkea", "ratkaistu"],
  [8, "2026-01-20T09:15", 7, "korkea", "ratkaistu"],
  // WP REST API (9)
  [9, "2026-01-20T10:30", 0, "korkea", "ratkaistu"],
  [9, "2026-01-20T10:35", 4, "korkea", "ratkaistu"],
  // WP Media (10)
  [10, "2026-01-21T14:00", 0, "keskitaso", "ratkaistu"],
  // WP Multisite (11)
  [11, "2026-01-22T08:45", 0, "korkea", "ratkaistu"],
  // WP Health (12)
  [12, "2026-01-25T11:00", 0, "keskitaso", "ratkaistu"],
  [12, "2026-01-25T11:05", 1, "keskitaso", "ratkaistu"],
  // WPML (13)
  [13, "2026-02-10T09:30", 0, "kriittinen", "ratkaistu"],
  [13, "2026-02-10T09:35", 5, "kriittinen", "tutkinnassa"],
  [13, "2026-02-10T09:40", 9, "kriittinen", "ratkaistu"],
  // Yoast (14)
  [14, "2026-02-20T15:00", 0, "keskitaso", "ratkaistu"],
  [14, "2026-02-20T15:10", 2, "keskitaso", "ratkaistu"],
  // Gravity Forms (15)
  [15, "2026-03-05T10:00", 0, "korkea", "tutkinnassa"],
  [15, "2026-03-05T10:10", 1, "korkea", "uusi"],
  [15, "2026-03-05T10:15", 5, "korkea", "uusi"],
  // WP Rocket (16)
  [16, "2026-02-25T12:00", 0, "korkea", "ratkaistu"],
  [16, "2026-02-25T12:10", 3, "korkea", "ratkaistu"],
  // ACF JSON (17)
  [17, "2026-03-12T09:00", 0, "keskitaso", "tutkinnassa"],
  // Redirection (18)
  [18, "2026-01-30T14:00", 0, "kriittinen", "ratkaistu"],
  [18, "2026-01-30T14:10", 4, "kriittinen", "ratkaistu"],
  // Wordfence (19)
  [19, "2026-03-15T07:00", 0, "kriittinen", "uusi"],
  [19, "2026-03-15T07:05", 2, "kriittinen", "uusi"],
  // TablePress (20)
  [20, "2026-02-18T11:30", 0, "keskitaso", "ratkaistu"],
  [20, "2026-02-18T11:35", 6, "keskitaso", "ei-korjata"],
  // UpdraftPlus (21)
  [21, "2026-03-08T03:00", 0, "korkea", "tutkinnassa"],
  // Hero (22)
  [22, "2026-01-10T09:00", 0, "keskitaso", "ratkaistu"],
  [22, "2026-01-10T09:10", 1, "keskitaso", "ratkaistu"],
  [22, "2026-01-10T09:15", 4, "keskitaso", "ei-korjata"],
  // Nav dropdown (23)
  [23, "2026-02-05T10:00", 0, "korkea", "ratkaistu"],
  [23, "2026-02-05T10:10", 3, "korkea", "tutkinnassa"],
  // Footer (24)
  [24, "2026-02-12T14:30", 0, "matala", "ei-korjata"],
  [24, "2026-02-12T14:35", 7, "matala", "ei-korjata"],
  // Print (25)
  [25, "2026-01-28T16:00", 0, "matala", "ei-korjata"],
  // Dark mode (26)
  [26, "2026-03-18T11:00", 0, "keskitaso", "uusi"],
  [26, "2026-03-18T11:05", 5, "keskitaso", "uusi"],
  // Breadcrumb (27)
  [27, "2026-02-08T09:30", 0, "matala", "ratkaistu"],
  [27, "2026-02-08T09:35", 8, "matala", "ratkaistu"],
  // REST sync (28)
  [28, "2026-03-02T08:00", 0, "korkea", "tutkinnassa"],
  // Headless (29)
  [29, "2026-02-22T13:00", 0, "korkea", "ratkaistu"],
  // SMTP (30)
  [30, "2026-01-18T09:00", 0, "korkea", "ratkaistu"],
  [30, "2026-01-18T09:10", 2, "korkea", "ratkaistu"],
  [30, "2026-01-18T09:15", 6, "korkea", "ratkaistu"],
  // Elasticsearch (31)
  [31, "2026-03-22T10:00", 0, "korkea", "uusi"],
  // CDN (32)
  [32, "2026-02-14T15:00", 0, "keskitaso", "ratkaistu"],
  [32, "2026-02-14T15:05", 1, "keskitaso", "ratkaistu"],
  // Chatbot (33)
  [33, "2026-03-25T14:00", 0, "keskitaso", "uusi"],
  // Azure AD (34)
  [34, "2026-01-12T08:00", 0, "korkea", "ratkaistu"],
  [34, "2026-01-12T08:05", 4, "korkea", "ratkaistu"],
  // PDF gen (35)
  [35, "2026-03-28T09:30", 3, "korkea", "uusi"],
  // DB config (36)
  [36, "2026-02-01T07:30", 0, "kriittinen", "ratkaistu"],
  // Domain mapping (37)
  [37, "2026-01-08T10:00", 7, "korkea", "ratkaistu"],
  // PHP compat (38)
  [38, "2026-03-05T14:00", 0, "keskitaso", "tutkinnassa"],
  [38, "2026-03-05T14:10", 1, "keskitaso", "tutkinnassa"],
  // htaccess (39)
  [39, "2026-01-05T09:00", 8, "kriittinen", "ratkaistu"],
  // Cron (40)
  [40, "2026-02-06T06:00", 0, "keskitaso", "ratkaistu"],
  // LCP (41)
  [41, "2026-01-15T14:00", 0, "korkea", "ratkaistu"],
  [41, "2026-01-15T14:10", 2, "korkea", "tutkinnassa"],
  [41, "2026-01-15T14:15", 5, "korkea", "tutkinnassa"],
  // DB queries (42)
  [42, "2026-02-20T08:00", 0, "korkea", "tutkinnassa"],
  // JS bundle (43)
  [43, "2026-01-25T13:00", 0, "korkea", "ratkaistu"],
  // TTFB (44)
  [44, "2026-03-01T09:00", 0, "korkea", "tutkinnassa"],
  [44, "2026-03-01T09:10", 4, "korkea", "uusi"],
  // CLS (45)
  [45, "2026-02-15T11:00", 0, "keskitaso", "ratkaistu"],
  [45, "2026-02-15T11:05", 1, "keskitaso", "ratkaistu"],
  // API perf (46)
  [46, "2026-03-10T15:00", 0, "keskitaso", "uusi"],
  // WooCommerce (47)
  [47, "2026-03-15T10:00", 2, "keskitaso", "uusi"],
  // FID (48)
  [48, "2026-02-28T16:00", 0, "korkea", "tutkinnassa"],
  [48, "2026-02-28T16:10", 3, "korkea", "tutkinnassa"],
  // Kontrasti (49)
  [49, "2026-01-10T10:00", 0, "korkea", "ratkaistu"],
  [49, "2026-01-10T10:05", 1, "korkea", "ratkaistu"],
  [49, "2026-01-10T10:10", 3, "korkea", "ratkaistu"],
  // Alt-tekstit (50)
  [50, "2026-01-12T11:00", 0, "korkea", "tutkinnassa"],
  [50, "2026-01-12T11:05", 5, "korkea", "uusi"],
  // Näppäimistö (51)
  [51, "2026-02-01T10:00", 0, "kriittinen", "ratkaistu"],
  // Lomakevirheet a11y (52)
  [52, "2026-02-05T14:00", 0, "korkea", "ratkaistu"],
  [52, "2026-02-05T14:05", 9, "korkea", "tutkinnassa"],
  // Skip nav (53)
  [53, "2026-01-10T12:00", 0, "keskitaso", "ratkaistu"],
  // Headings (54)
  [54, "2026-01-15T15:00", 0, "keskitaso", "tutkinnassa"],
  [54, "2026-01-15T15:05", 2, "keskitaso", "uusi"],
  // Video (55)
  [55, "2026-03-20T09:00", 0, "korkea", "uusi"],
  [55, "2026-03-20T09:05", 4, "korkea", "uusi"],
  // Focus (56)
  [56, "2026-01-18T13:00", 0, "korkea", "ratkaistu"],
  // Kieli (57)
  [57, "2026-02-25T10:00", 0, "keskitaso", "ratkaistu"],
  [57, "2026-02-25T10:05", 6, "keskitaso", "ratkaistu"],
  // XSS (58)
  [58, "2026-01-08T09:00", 0, "kriittinen", "ratkaistu"],
  [58, "2026-01-08T09:05", 1, "kriittinen", "ratkaistu"],
  [58, "2026-01-08T09:10", 4, "kriittinen", "ratkaistu"],
  // SQL Injection (59)
  [59, "2026-01-09T10:00", 0, "kriittinen", "ratkaistu"],
  // CSRF (60)
  [60, "2026-01-10T08:00", 0, "korkea", "ratkaistu"],
  // Mixed content (61)
  [61, "2026-02-10T14:00", 0, "keskitaso", "ratkaistu"],
  [61, "2026-02-10T14:05", 8, "keskitaso", "tutkinnassa"],
  // Security headers (62)
  [62, "2026-01-05T11:00", 0, "korkea", "ratkaistu"],
  // wp-config.bak (63)
  [63, "2026-01-06T08:30", 0, "kriittinen", "ratkaistu"],
  // User enum (64)
  [64, "2026-01-07T09:00", 0, "korkea", "ratkaistu"],
  // Lomake email (65)
  [65, "2026-02-15T14:00", 0, "keskitaso", "ratkaistu"],
  [65, "2026-02-15T14:05", 5, "keskitaso", "ratkaistu"],
  // Lomake upload (66)
  [66, "2026-03-01T11:00", 3, "korkea", "tutkinnassa"],
  // Ajanvaraus (67)
  [67, "2026-02-20T10:00", 0, "keskitaso", "ratkaistu"],
  [67, "2026-02-20T10:05", 9, "keskitaso", "ratkaistu"],
  // Monisivuinen (68)
  [68, "2026-03-08T13:00", 0, "korkea", "uusi"],
  // CAPTCHA (69)
  [69, "2026-02-28T09:00", 0, "korkea", "ratkaistu"],
  [69, "2026-02-28T09:05", 2, "korkea", "ratkaistu"],
  // Kieliversiot (70)
  [70, "2026-03-12T15:00", 0, "keskitaso", "uusi"],
  [70, "2026-03-12T15:05", 7, "keskitaso", "uusi"],
  // Hetu (71)
  [71, "2026-03-25T10:00", 0, "korkea", "uusi"],
  // Linkit (72)
  [72, "2026-01-20T16:00", 0, "keskitaso", "ratkaistu"],
  [72, "2026-01-20T16:05", 4, "keskitaso", "tutkinnassa"],
  // Käännökset (73)
  [73, "2026-02-01T12:00", 0, "korkea", "tutkinnassa"],
  // Yhteystiedot (74)
  [74, "2026-03-01T14:00", 0, "keskitaso", "uusi"],
  [74, "2026-03-01T14:05", 1, "keskitaso", "uusi"],
  // PDF a11y (75)
  [75, "2026-02-22T09:00", 0, "korkea", "tutkinnassa"],
  // Metatiedot (76)
  [76, "2026-01-28T10:00", 0, "matala", "ei-korjata"],
  // Haku relevanssi (77)
  [77, "2026-02-10T11:00", 0, "korkea", "tutkinnassa"],
  // Autocomplete (78)
  [78, "2026-03-18T14:00", 0, "keskitaso", "uusi"],
  // Faceted (79)
  [79, "2026-03-22T16:00", 0, "keskitaso", "uusi"],
];

// =============================================================================
// GENEROI HAVAINNOT
// =============================================================================

function generateTestData() {
  const observations = [];

  INSTANSSIT.forEach((inst, idx) => {
    const [arkkiIdx, timestamp, siteIdx, severity, status] = inst;
    const arch = ARKKITYYPIT[arkkiIdx];
    const site = VIRASTOT[siteIdx];

    observations.push({
      id: `HAV-${String(idx + 1).padStart(3, '0')}`,
      timestamp: timestamp,
      testSuite: arch.testSuite,
      testCase: arch.testCase,
      category: arch.category,
      severity: severity,
      status: status,
      site: site.name,
      siteId: site.id,
      siteUrl: site.url,
      component: arch.component,
      testTool: arch.testTool,
      description: arch.description,
      agentAnalysis: arch.agentAnalysis.replace(/\{site\}/g, site.name),
      rootCause: arch.rootCause,
      recommendation: arch.recommendation,
      environment: idx % 5 === 0 ? "production" : "staging",
      arkkityyppiId: arkkiIdx
    });
  });

  // Lisää related IDs (saman arkkityypin havainnot linkittyvät toisiinsa)
  const archGroups = {};
  observations.forEach(obs => {
    if (!archGroups[obs.arkkityyppiId]) archGroups[obs.arkkityyppiId] = [];
    archGroups[obs.arkkityyppiId].push(obs.id);
  });
  observations.forEach(obs => {
    obs.relatedIds = archGroups[obs.arkkityyppiId].filter(id => id !== obs.id);
  });

  return observations;
}
