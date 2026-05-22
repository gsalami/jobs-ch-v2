const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const htmlPath = path.join(ROOT, "dashboard.html");
const dataDir = path.join(ROOT, "data");
const gapSource = "Lueckenanalyse.rtf, v4";

const GAP_ADDITIONS = [
  {
    title: "Marketingfachmann/-frau",
    slug: "marketingfachmann-frau",
    category: "marketing-sales",
    pay: 98000,
    jobs: 45000,
    education: "Eidg. Fachausweis / eidg. Diplom Marketing",
    exposure: 8,
    beta: 0.845,
    isco: "2431",
    exposure_rationale: "Sehr hohe LLM-Exposition: Kampagnenkonzepte, Zielgruppenanalysen, Copy, Marktberichte, Newsletter, Briefings und Performance-Reports sind stark text- und datenbasiert. Markenurteil, Priorisierung, Budgetverantwortung und Abstimmung mit Stakeholdern bleiben menschlich.",
    url: "https://www.berufsberatung.ch/dyn/show/1900?id=3091",
    mapping_note: "V4-Ergaenzung aus Lueckenanalyse. ISCO 2431 Marketing and advertising professionals; Schweizer Label ueber eidg. FA/Diplom plausibilisiert.",
  },
  {
    title: "Übersetzer/-in & Dolmetscher/-in",
    slug: "uebersetzer-dolmetscher",
    category: "kunst-medien",
    pay: 119000,
    jobs: 12000,
    education: "Bachelor/Master Übersetzen / Dolmetschen",
    exposure: 8,
    beta: 0.758,
    isco: "2643",
    exposure_rationale: "Sehr hohe LLM-Exposition: Übersetzung, Revision, Terminologiearbeit, Zusammenfassung und mehrsprachige Varianten gehören zu den direkt erreichbaren Sprachaufgaben. Live-Dolmetschen, Fachhaftung, Kulturkontext und rechtlich/medizinisch sensible Einsätze begrenzen die Exposition.",
    url: "https://www.berufsberatung.ch/dyn/show/1900?id=2686",
    mapping_note: "V4-Ergaenzung aus Lueckenanalyse. ISCO 2643 Translators, interpreters and other linguists; in der mehrsprachigen Schweiz methodisch wichtige Luecke.",
  },
  {
    title: "Unternehmensberater/-in / Management Consultant",
    slug: "unternehmensberater-management-consultant",
    category: "marketing-sales",
    pay: 124000,
    jobs: 25000,
    education: "Bachelor/Master BWL / Consulting",
    exposure: 7,
    beta: 0.68,
    isco: "2421",
    exposure_rationale: "Hohe LLM-Exposition: Recherche, Benchmarks, Interview-Synthesen, Slides, Memos und Massnahmenpläne sind stark dokumenten- und textbasiert. Kundendynamik, politische Machbarkeit, Umsetzung und Verantwortung bleiben begrenzend.",
    url: "https://www.berufsberatung.ch/dyn/show/1900?id=3226",
    mapping_note: "V4-Ergaenzung aus Lueckenanalyse. ISCO 2421 Management and organization analysts; Schweizer Consulting-Tätigkeiten koennen je nach Senioritaet stark variieren.",
  },
  {
    title: "Controller/-in",
    slug: "controller-in",
    category: "finanzen-recht",
    pay: 124000,
    jobs: 35000,
    education: "Bachelor BWL / Controlling",
    exposure: 6,
    beta: 0.6,
    isco: "2421",
    exposure_rationale: "Hohe mittlere LLM-Exposition: Budgetkommentare, Abweichungsanalysen, Forecast-Narrative, Management-Reports und Ad-hoc-Auswertungen sind gut unterstützbar. Datenqualität, Steuerungsentscheide und betrieblicher Kontext begrenzen.",
    url: "https://www.berufsberatung.ch/dyn/show/1900?id=8100",
    mapping_note: "V4-Ergaenzung aus Lueckenanalyse. Separat von Buchhaltung, da Steuerungs-, Planungs- und Reportingaufgaben anders gewichtet sind.",
  },
  {
    title: "Wirtschaftsprüfer/-in (Auditor)",
    slug: "wirtschaftspruefer-auditor",
    category: "finanzen-recht",
    pay: 124000,
    jobs: 12000,
    education: "Dipl. Wirtschaftsprüfer/-in",
    exposure: 6,
    beta: 0.5683,
    isco: "2411",
    exposure_rationale: "Hohe mittlere LLM-Exposition: Prüfprogramme, Dossierzusammenfassungen, Stichprobenkommentare, Standardsrecherche und Berichtsentwürfe sind gut unterstützbar. Prüfungsurteil, Haftung, Unabhängigkeit und Regulierung begrenzen.",
    url: "https://www.berufsberatung.ch/dyn/show/1900?id=8417",
    mapping_note: "V4-Ergaenzung aus Lueckenanalyse. Separat von Steuerberatung und Buchhaltung, da Testierung und regulatorische Verantwortung den Cap stärker begrenzen.",
  },
  {
    title: "Notar/-in",
    slug: "notar-in",
    category: "finanzen-recht",
    pay: 119000,
    jobs: 3500,
    education: "Juristische Ausbildung / kantonale Zulassung",
    exposure: 4,
    beta: 0.425,
    isco: "2611",
    exposure_rationale: "Moderate LLM-Exposition: Vertragsentwürfe, Urkundenvorbereitung, Recherche und Mandantenkorrespondenz können unterstützt werden. Beurkundungspflicht, Identitätsprüfung, kantonale Regulierung, Haftung und Vertrauensfunktion begrenzen stark.",
    url: "https://www.berufsberatung.ch/dyn/show/1900?id=3307",
    mapping_note: "V4-Ergaenzung aus Lueckenanalyse. Schweizer Notariat ist kantonal reguliert und nur grob ueber ISCO 2611 juristische Berufe abbildbar.",
  },
  {
    title: "Aussendienstmitarbeiter/-in B2B / Verkaufsberater/-in",
    slug: "aussendienst-b2b-verkaufsberater",
    category: "marketing-sales",
    pay: 103000,
    jobs: 45000,
    education: "EFZ / FA Verkauf / Branchenwissen",
    exposure: 5,
    beta: 0.48,
    isco: "3322",
    exposure_rationale: "Mittlere LLM-Exposition: CRM-Pflege, Angebotsentwürfe, Follow-ups, Besuchsvorbereitung, Einwandbehandlung und Marktinformationen sind gut unterstützbar. Feldbesuche, Beziehungsaufbau, Verhandlung und Produkteinsatz vor Ort bleiben menschlich.",
    url: "https://www.berufsberatung.ch/dyn/show/1900?id=3127",
    mapping_note: "V4-Ergaenzung aus Lueckenanalyse. Ergänzt Key Account Management um breitere B2B-Aussendienst- und Verkaufsberaterrollen.",
  },
  {
    title: "Architekt/-in",
    slug: "architekt-in",
    category: "ingenieurwesen",
    pay: 113000,
    jobs: 22000,
    education: "Bachelor/Master Architektur",
    exposure: 5,
    beta: 0.45,
    isco: "2161",
    exposure_rationale: "Mittlere LLM-Exposition: Wettbewerbsbriefings, Baubeschriebe, Normenrecherche, Variantenkommunikation, Visualisierungsbriefings und Einreichungsunterlagen können unterstützt werden. Entwurf, Bauherrenarbeit, Verantwortung, Bewilligung und Baustellenkontext begrenzen.",
    url: "https://www.berufsberatung.ch/dyn/show/1900?id=3936",
    mapping_note: "V4-Ergaenzung aus Lueckenanalyse. Sichtbarer Schweizer Beruf, bisher trotz Ingenieur- und Bauberufen nicht separat abgebildet.",
  },
  {
    title: "Fachfrau/-mann Gesundheit (FaGe)",
    slug: "fachfrau-mann-gesundheit-fage",
    category: "gesundheit",
    pay: 73000,
    jobs: 80000,
    education: "EFZ Fachfrau/-mann Gesundheit",
    exposure: 3,
    beta: 0.252,
    isco: "5321",
    exposure_rationale: "Niedrige bis moderate LLM-Exposition: Pflegedokumentation, Übergaben, Checklisten und Informationsmaterial können unterstützt werden. Körperpflege, Beobachtung, Patientenkontakt, Teamarbeit und Verantwortung am Bett bleiben zentral.",
    url: "https://www.berufsberatung.ch/dyn/show/1900?id=3038",
    mapping_note: "V4-Ergaenzung aus Lueckenanalyse. Schweizer EFZ-Beruf mit grosser Beschäftigtenzahl; nicht identisch mit diplomierter Pflege.",
  },
  {
    title: "Medizinische Praxisassistent/-in (MPA)",
    slug: "medizinische-praxisassistent-in-mpa",
    category: "gesundheit",
    pay: 81000,
    jobs: 50000,
    education: "EFZ Medizinische/-r Praxisassistent/-in",
    exposure: 6,
    beta: 0.55,
    isco: "3256",
    exposure_rationale: "Hohe mittlere LLM-Exposition: Terminierung, Telefonnotizen, Triage-Vorbereitung, Rechnungs- und Versicherungsfragen, Patienteninformationen und Dokumentation sind stark unterstützbar. Medizinische Verantwortung, Patientenkontakt und praktische Assistenz begrenzen.",
    url: "https://www.berufsberatung.ch/dyn/show/1900?id=2897",
    mapping_note: "V4-Ergaenzung aus Lueckenanalyse. Schweizer Praxisrolle mit hohem administrativem Anteil; Score wegen Patientenkontakt und klinischen Grenzen gedeckelt.",
  },
  {
    title: "Polymechaniker/-in",
    slug: "polymechaniker-in",
    category: "handwerk-bau",
    pay: 81000,
    jobs: 45000,
    education: "EFZ Polymechaniker/-in",
    exposure: 2,
    beta: 0.18,
    isco: "7223",
    exposure_rationale: "Niedrige LLM-Exposition: Fertigung, Montage, CNC-Rüsten, Messen und Instandhaltung sind stark physisch und maschinenbezogen. LLMs helfen bei Dokumentation, Arbeitsanweisungen, Normensuche und Fehlerberichten.",
    url: "https://www.berufsberatung.ch/dyn/show/1900?id=2948",
    mapping_note: "V4-Ergaenzung aus Lueckenanalyse. Schweizer Industrie- und Lehrberuf; LLM-Score bewusst niedrig, weil Robotik/CNC-Automation nicht Teil des LLM-Masses ist.",
  },
  {
    title: "Coiffeur/Coiffeuse",
    slug: "coiffeur-coiffeuse",
    category: "personen-dienste",
    pay: 65000,
    jobs: 25000,
    education: "EFZ Coiffeur/-euse",
    exposure: 2,
    beta: 0.15,
    isco: "5141",
    exposure_rationale: "Niedrige LLM-Exposition: Beratung, Termintexte, Social Media und Produktkommunikation können unterstützt werden. Haarschnitt, Färben, Stilgefühl am Menschen und persönlicher Service bleiben physisch und sozial.",
    url: "https://www.berufsberatung.ch/dyn/show/1900?id=2863",
    mapping_note: "V4-Ergaenzung aus Lueckenanalyse. Sichtbare personenbezogene Dienstleistung mit niedriger LLM-Exposition.",
  },
  {
    title: "Reinigungspersonal / Reinigungsfachfrau",
    slug: "reinigungspersonal-reinigungsfachfrau",
    category: "personen-dienste",
    pay: 57000,
    jobs: 120000,
    education: "EBA/EFZ Reinigung / Praxis",
    exposure: 1,
    beta: 0.05,
    isco: "9112",
    exposure_rationale: "Sehr niedrige LLM-Exposition: Die Kerntätigkeit ist körperliche Arbeit vor Ort. LLMs können Checklisten, Einsatzplanung, Rapportierung oder Kundenkommunikation unterstützen, verändern aber den Hauptanteil der Arbeit kaum.",
    url: "https://www.berufsberatung.ch/dyn/show/1900?id=3046",
    mapping_note: "V4-Ergaenzung aus Lueckenanalyse. Grosse Beschäftigtengruppe mit niedriger LLM-Exposition; wichtig fuer Arbeitsmarktgewichtung.",
  },
  {
    title: "Hebamme",
    slug: "hebamme",
    category: "gesundheit",
    pay: 106000,
    jobs: 4500,
    education: "Bachelor Hebamme",
    exposure: 3,
    beta: 0.257,
    isco: "2222",
    exposure_rationale: "Niedrige bis moderate LLM-Exposition: Dokumentation, Aufklärungsmaterial, Literatur und administrative Kommunikation können unterstützt werden. Geburtshilfe, klinische Verantwortung, Notfallsituationen, Körperarbeit und Beziehung begrenzen stark.",
    url: "https://www.berufsberatung.ch/dyn/show/1900?id=3024",
    mapping_note: "V4-Ergaenzung aus Lueckenanalyse. Separat von Pflege, da Aufgabenprofil und Verantwortung eigenständig sind.",
  }
].map(item => ({
  ...item,
  mapping_confidence: "mittel",
  v4_gap_addition: true,
  v4_gap_source: gapSource,
  source_pay: "V4 Gap-Addendum; BFS LSE 2024 wird per Refresh gemappt",
  source_jobs: "V4 Gap-Addendum; SAKE-2023-Startwert wird mit SAKE-2024-Gesamtwachstum kalibriert",
  pay_previous: item.pay,
  jobs_2023_base: item.jobs,
  source_pay_previous: "V4 Gap-Addendum",
  source_jobs_previous: "V4 Gap-Addendum"
}));

function readDashboardData() {
  const html = fs.readFileSync(htmlPath, "utf8");
  const match = html.match(/const DATA = (\[[\s\S]*?\n\]);/);
  if (!match) throw new Error("Could not find const DATA array in dashboard.html");
  return { html, data: Function("return " + match[1])() };
}

function replaceDataInHtml(html, data) {
  const serialized = `[\n${data.map(item => `  ${JSON.stringify(item)}`).join(",\n")}\n]`;
  return html.replace(/const DATA = \[[\s\S]*?\n\];/, `const DATA = ${serialized};`);
}

function csvEscape(value) {
  const text = Array.isArray(value) ? value.join("; ") : String(value ?? "");
  return /[",\n;]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function writeCsv(filePath, rows) {
  const headers = Object.keys(rows[0]);
  const lines = rows.map(row => headers.map(header => csvEscape(row[header])).join(","));
  fs.writeFileSync(filePath, `${headers.join(",")}\n${lines.join("\n")}\n`);
}

function main() {
  const { html, data } = readDashboardData();
  const additionsBySlug = new Map(GAP_ADDITIONS.map(item => [item.slug, item]));
  const baseWithoutExistingAdditions = data.filter(item => !additionsBySlug.has(item.slug));
  const updatedBase = baseWithoutExistingAdditions.map(item => (
    item.slug === "key-account-manager"
      ? { ...item, category: "marketing-sales", mapping_note: `${item.mapping_note || "B2B-Vertrieb wird in v4 dem neuen Berufsfeld Marketing, Sales & Beratung zugeordnet."}` }
      : item
  ));
  const nextData = [...updatedBase, ...GAP_ADDITIONS];

  fs.writeFileSync(htmlPath, replaceDataInHtml(html, nextData));
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(path.join(dataDir, "gap-additions-v4.json"), JSON.stringify({ source: gapSource, generated_at: "2026-05-21", occupations: GAP_ADDITIONS }, null, 2) + "\n");
  writeCsv(path.join(dataDir, "gap-additions-v4.csv"), GAP_ADDITIONS);

  console.log(`Applied ${GAP_ADDITIONS.length} v4 gap additions`);
  console.log(`Dashboard rows: ${nextData.length}`);
}

main();
