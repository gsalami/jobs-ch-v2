const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const htmlPath = path.join(ROOT, "index.html");
const dataDir = path.join(ROOT, "data");
const html = fs.readFileSync(htmlPath, "utf8");
const dataMatch = html.match(/const DATA = (\[[\s\S]*?\n\]);/);

if (!dataMatch) {
  throw new Error("Could not find const DATA array in index.html");
}

const DATA = Function("return " + dataMatch[1])();

const CATS = {
  "finanzen-recht": "Finanzen & Recht",
  "it-tech": "IT & Technologie",
  "gesundheit": "Gesundheit & Pflege",
  "bildung": "Bildung & Forschung",
  "handwerk-bau": "Handwerk & Bau",
  "verwaltung": "Verwaltung & Administration",
  "verkauf-handel": "Verkauf & Handel",
  "marketing-sales": "Marketing, Sales & Beratung",
  "transport-logistik": "Transport & Logistik",
  "gastronomie-tourismus": "Gastronomie & Tourismus",
  "landwirtschaft": "Landwirtschaft & Natur",
  "kunst-medien": "Kunst, Design & Medien",
  "ingenieurwesen": "Ingenieurwesen",
  "soziales": "Soziales & Beratung",
  "personen-dienste": "Persönliche Dienste & Reinigung",
  "sicherheit": "Sicherheit & Schutz"
};

const MODEL = {
  id: "ai-exposure-framework-2026-05-21-v0.5",
  asOf: "2026-05-21",
  title: "Szenariobasierte 2026-Heuristik auf Basis der Eloundou et al. 2024 Werte",
  framing: "Heuristische Erweiterung, keine vollstaendige neue Task-Annotation und keine Replikation der Science-Studie. Das Hauptszenario ist ein plausibles Basisszenario; die konservative Variante ist das Szenario mit halbierten Modifikatoren.",
  formulas: {
    technical: "technical_beta_2026 = min(cap / 10, beta_2024 + long_context + agentic_tools + multimodal + role_override)",
    adoptionAdjusted: "adoption_adjusted_beta_2026 = min(cap / 10, technical_beta_2026 + adoption)",
    score: "score = round(beta * 10)"
  },
  sources: [
    "https://www.science.org/doi/10.1126/science.adj0998",
    "https://openai.com/index/gpts-are-gpts/",
    "https://openai.com/index/introducing-gpt-5-5/",
    "https://openai.com/index/introducing-gpt-5-4/",
    "https://openai.com/index/gpt-4-1/",
    "https://openai.com/index/hello-gpt-4o/",
    "https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool",
    "https://blog.google/products-and-platforms/products/gemini/google-gemini-update-may-2024/",
    "https://news.microsoft.com/source/emea/2025/04/2025-work-trend-index-swiss-organizations-lead-in-ai-adoption-52-automate-entire-business-processes-surpassing-global-and-european-averages/",
    "https://dam-api.bfs.admin.ch/hub/api/dam/assets/36195847/master",
    "https://dam-api.bfs.admin.ch/hub/api/dam/assets/32069034/master",
    "https://dam-api.bfs.admin.ch/hub/api/dam/assets/36035149/master",
    "https://www.pxweb-admin-a.bfs.admin.ch/pxweb/de/px-x-0304010000_205/-/px-x-0304010000_205.px/"
  ],
  dataCurrency: {
    dashboardPay: "Lohnwerte wurden am 2026-05-21 mit BFS LSE 2024 nach CH-ISCO-19 Berufsgruppen aktualisiert. Wo Spezial-, Kantons-, Vertrags- oder Arbeitgeberquellen genauer sind als ein 2-Steller-Gruppenlohn, bleibt der bisherige Dashboard-Wert erhalten und LSE 2024 wird als Benchmark dokumentiert.",
    dashboardJobs: "Beschaeftigtenwerte wurden am 2026-05-21 nicht als neue Dashboard-SAKE-Mikrotabelle ersetzt. Der bestehende SAKE-2023-Berufsmix und die v4-Ergaenzungswerte wurden proportional mit dem offiziellen SAKE-Gesamtwachstum 2023-2024 skaliert.",
    latestBfsPay: "BFS LSE 2024 ist verfuegbar; der gesamtwirtschaftliche Medianlohn lag 2024 bei 7024 Franken brutto pro Monat.",
    latestBfsJobs: "BFS SAKE in Kuerze 2024 ist verfuegbar; sie weist 4.876 Mio. Erwerbstaetige aus. SAKE in Kuerze 2023 weist 4.848 Mio. Erwerbstaetige aus; daraus ergibt sich ein Kalibrierungsfaktor von rund 1.0058.",
    lsePxWebTable: "Monatlicher Bruttolohn nach Jahr, Grossregion, Berufsgruppe, Lebensalter, Geschlecht und Zentralwert und andere Perzentile, Tabelle px-x-0304010000_205.",
    refreshAudit: "data/bfs-2024-refresh.csv und data/bfs-2024-refresh.json dokumentieren pro Beruf die LSE-2024-Gruppe, den Lohnbenchmark, die Pay-Refresh-Methode und die SAKE-Kalibrierung."
  },
  categoryFactors: {
    "finanzen-recht": {
      longContext: 0.10,
      agentic: 0.07,
      multimodal: 0.02,
      adoption: 0.05,
      cap: 9,
      capType: "regulatorisch/sozial",
      capRationale: "Mandatsverantwortung, Haftung, vertrauliche Daten und finale juristische oder finanzielle Beurteilung begrenzen die Exposition.",
      capCouldRiseIf: "verifizierbare Legal-/Finance-Agenten, bessere Audit Trails und breiterer Datenzugang produktiv werden.",
      note: "lange Verträge, Dossiers, Regulierung, Research und Reports"
    },
    "it-tech": {
      longContext: 0.09,
      agentic: 0.11,
      multimodal: 0.03,
      adoption: 0.05,
      cap: 9,
      capType: "technisch/regulatorisch/sozial",
      capRationale: "Der Aufgabenraum ist stark digital, aber Schweizer IT-Rollen enthalten oft Requirement Engineering, Architektur, Testing, Stakeholder-Interaktion und Haftung in regulierten oder sicherheitskritischen Systemen. Einfachere Implementierungsaufgaben sind teils off-/nearshored.",
      capCouldRiseIf: "auditierbare Coding- und Architekturagenten in regulierten Umgebungen breit validiert werden und Verantwortung, Security Review sowie Change-Prozesse technisch besser abgesichert sind.",
      note: "Coding-Agenten und Repository-Kontext, aber Schweizer Rollen enthalten viel Architektur, Review, Interaktion und Verantwortung"
    },
    "gesundheit": {
      longContext: 0.07,
      agentic: 0.03,
      multimodal: 0.04,
      adoption: 0.02,
      cap: 6,
      capType: "regulatorisch/sozial/physisch",
      capRationale: "Klinische Verantwortung, Haftung, Patientenkontakt, körperliche Pflege, Regulierung und Datenzugang begrenzen die Exposition.",
      capCouldRiseIf: "regulierte klinische Copilots, multimodale Befundsysteme und sichere Datenintegration breiter zugelassen werden.",
      note: "Dokumentation, Fachliteratur und multimodaler Befundkontext, aber klinische Verantwortung bleibt begrenzend"
    },
    "bildung": {
      longContext: 0.07,
      agentic: 0.03,
      multimodal: 0.04,
      adoption: 0.03,
      cap: 7,
      capType: "sozial/regulatorisch",
      capRationale: "Lernbeziehung, Aufsicht, pädagogische Verantwortung und institutionelle Regeln begrenzen die Exposition.",
      capCouldRiseIf: "KI-Tutoren, Prüfungsintegration und Lernplattformen mit Qualitätssicherung breiter genutzt werden.",
      note: "Materialerstellung, Feedback, Research und Unterrichtsvorbereitung"
    },
    "handwerk-bau": {
      longContext: 0.03,
      agentic: 0.02,
      multimodal: 0.01,
      adoption: 0.01,
      cap: 4,
      capType: "physisch",
      capRationale: "Vor-Ort-Ausführung, Materialarbeit, Sicherheitsnormen und Kundenkontakt setzen eine enge Grenze.",
      capCouldRiseIf: "Robotik, AR-Assistenz oder digitale Bauakten stärker mit LLMs integriert werden.",
      note: "Offerten, Planung und Dokumentation, aber physische Vor-Ort-Arbeit dominiert"
    },
    "verwaltung": {
      longContext: 0.11,
      agentic: 0.14,
      multimodal: 0.02,
      adoption: 0.07,
      cap: 9,
      capType: "organisatorisch/regulatorisch",
      capRationale: "Standardisierte Dokumente sind stark erreichbar, aber Amtsverantwortung, Datenschutz und Ausnahmen begrenzen.",
      capCouldRiseIf: "Fachverfahren, Register und KI-Agenten mit Berechtigungs- und Prüfpfaden integriert werden.",
      note: "standardisierte Dokumente, Formulare, E-Mail, Termine und Workflows"
    },
    "verkauf-handel": {
      longContext: 0.07,
      agentic: 0.09,
      multimodal: 0.03,
      adoption: 0.05,
      cap: 8,
      capType: "sozial/organisatorisch",
      capRationale: "Kundenbeziehung, Verhandlung und Ladenpraxis begrenzen, Backoffice und CRM sind stark erreichbar.",
      capCouldRiseIf: "CRM-, ERP- und Angebotsagenten direkt in Verkaufsprozessen laufen.",
      note: "Kundenkommunikation, Angebote, CRM, Sortiments- und Backoffice-Arbeit"
    },
    "marketing-sales": {
      longContext: 0.10,
      agentic: 0.09,
      multimodal: 0.07,
      adoption: 0.05,
      cap: 8,
      capType: "sozial/marktlich/organisatorisch",
      capRationale: "Kampagnen, Research, CRM, Angebote und Präsentationen sind stark erreichbar, aber Markenurteil, Verhandlung, Kundenzugang, Umsetzung und Budgetverantwortung begrenzen.",
      capCouldRiseIf: "CRM-, Marketing-Automation-, Research- und Präsentationsagenten enger mit Unternehmensdaten und Freigabeprozessen verbunden werden.",
      note: "Kampagnen, Copy, Research, Slides, CRM, Angebote und Beratungsvorbereitung"
    },
    "transport-logistik": {
      longContext: 0.04,
      agentic: 0.04,
      multimodal: 0.02,
      adoption: 0.02,
      cap: 5,
      capType: "physisch/sicherheit",
      capRationale: "Mobilität, Maschinenbedienung, Sicherheitskontext und Ausnahmeereignisse bleiben ausserhalb reiner LLM-Exposition.",
      capCouldRiseIf: "Disposition, Flottensteuerung und autonome Systeme stärker mit Agenten gekoppelt werden.",
      note: "Disposition, Planung und Dokumentation, aber physische Mobilität bleibt ausser Scope"
    },
    "gastronomie-tourismus": {
      longContext: 0.05,
      agentic: 0.05,
      multimodal: 0.04,
      adoption: 0.04,
      cap: 7,
      capType: "physisch/sozial",
      capRationale: "Service, Küche und Gästebeziehung bleiben physisch, Buchung und Kommunikation sind erreichbar.",
      capCouldRiseIf: "Buchungs-, Revenue- und Gästeagenten flächendeckend integriert werden.",
      note: "Buchung, Planung, Menüs, Kommunikation und Content"
    },
    "landwirtschaft": {
      longContext: 0.03,
      agentic: 0.02,
      multimodal: 0.02,
      adoption: 0.01,
      cap: 4,
      capType: "physisch",
      capRationale: "Feldarbeit, Tiere, Wetter und Maschinen begrenzen reine LLM-Exposition.",
      capCouldRiseIf: "Agrarrobotik, Sensorik und Entscheidungsagenten stärker zusammenwachsen.",
      note: "Beratung, Planung, Markt-/Wetterdaten und Marketing, aber Feldarbeit bleibt physisch"
    },
    "kunst-medien": {
      longContext: 0.09,
      agentic: 0.06,
      multimodal: 0.16,
      adoption: 0.05,
      cap: 9,
      capType: "sozial/marktlich",
      capRationale: "Multimodale Tools erreichen viele Aufgaben, aber Stil, Auftrag, Rechte, Marke und menschliche Auswahl begrenzen.",
      capCouldRiseIf: "Rechteklärung, konsistente Asset-Pipelines und multimodale Agenten produktiver werden.",
      note: "Text plus Bild-, Video- und Audio-Workflows"
    },
    "ingenieurwesen": {
      longContext: 0.09,
      agentic: 0.06,
      multimodal: 0.06,
      adoption: 0.04,
      cap: 8,
      capType: "regulatorisch/technisch",
      capRationale: "Normen, Haftung, physische Systeme und Validierung begrenzen trotz hoher Dokumenten- und Analyseexposition.",
      capCouldRiseIf: "CAE/CAD-, Normen- und Simulationsagenten prüfbar integriert werden.",
      note: "Normen, technische Dokumente, Code und visuelle Analysen"
    },
    "soziales": {
      longContext: 0.05,
      agentic: 0.03,
      multimodal: 0.01,
      adoption: 0.02,
      cap: 5,
      capType: "sozial/regulatorisch",
      capRationale: "Beziehungsarbeit, Schutzauftrag, Vertrauen, Datenschutz und Verantwortung begrenzen die Exposition.",
      capCouldRiseIf: "Fallführungssysteme und Dokumentationsassistenten sicherer integriert werden.",
      note: "Falldokumentation und Research, aber Beziehung und Schutzauftrag bleiben zentral"
    },
    "personen-dienste": {
      longContext: 0.02,
      agentic: 0.02,
      multimodal: 0.02,
      adoption: 0.01,
      cap: 3,
      capType: "physisch/sozial",
      capRationale: "Die Kerntaetigkeiten sind koerperliche Dienstleistungen vor Ort; KI hilft vor allem bei Termin-, Kommunikations-, Rapport- oder Marketingnebenaufgaben.",
      capCouldRiseIf: "Serviceplanung, visuelle Assistenz und Robotik enger mit betrieblichen Workflows gekoppelt werden.",
      note: "Termine, Checklisten, Kundenkommunikation und Marketing, aber physische Dienstleistung dominiert"
    },
    "sicherheit": {
      longContext: 0.04,
      agentic: 0.03,
      multimodal: 0.02,
      adoption: 0.01,
      cap: 5,
      capType: "sicherheit/physisch",
      capRationale: "Einsatzsituationen, Zwangsmittel, Deeskalation und Verantwortung bleiben menschlich und physisch.",
      capCouldRiseIf: "Lagebild-, Rapport- und Trainingssysteme breiter eingesetzt werden.",
      note: "Berichte, Recherche und Lagebilder, aber Einsatzsituationen bleiben menschlich"
    }
  },
  roleOverrides: {
    "softwareentwickler-in": { delta: 0.02, label: "Coding-Agenten und Repository-Kontext, begrenzt durch Architektur und Review" },
    "data-scientist": { delta: 0.04, label: "Datenanalyse-, Notebook- und Modellierungsagenten" },
    "sysadmin": { delta: 0.03, label: "Tool-Use für IT-Betrieb und Runbooks" },
    "cybersecurity": { delta: 0.04, label: "Security-Codeanalyse und Triage-Agenten, begrenzt durch Haftung und Angriffskontext" },
    "ki-ingenieur": { delta: 0.05, label: "KI-native Workflows, begrenzt durch Evaluation und Produktionsverantwortung" },
    "jurist-in": { delta: 0.06, label: "Long-Context Legal Review" },
    "steuerberater-in": { delta: 0.04, label: "Steuer-Research und Mandatsdokumente" },
    "buchhalter-in": { delta: 0.05, label: "Beleg-, Report- und Abstimmungsworkflows" },
    "sachbearbeiter-verwaltung": { delta: 0.06, label: "Formular- und Prozessagenten" },
    "sekretaer-in": { delta: 0.05, label: "E-Mail-, Kalender- und Dokumentenagenten" },
    "grafiker-in": { delta: 0.09, label: "Bildgenerierung und visuelle Iteration" },
    "fotograf-in": { delta: 0.09, label: "Bild-KI und Retusche" },
    "cutter-in": { delta: 0.08, label: "Video-, Untertitel- und Schnittassistenz" },
    "journalist-in": { delta: 0.04, label: "Recherche- und Redaktionsassistenz" },
    "reisebuero": { delta: 0.06, label: "Reiseplanungs-Agenten" },
    "arzt-aerztin": { delta: 0.02, label: "medizinische Dokumentation" },
    "apotheker-in": { delta: 0.02, label: "Interaktions- und Beratungsassistenz" },
    "ux-designer": { delta: 0.03, label: "Prototyping, Research-Synthese und UI-Text" },
    "hr-fachmann": { delta: 0.03, label: "Recruiting-, Policy- und Interview-Workflows" },
    "einkaeufer-in": { delta: 0.03, label: "Lieferantenrecherche und Angebotsvergleich" },
    "hotelfachmann": { delta: 0.03, label: "Buchung, Gaestekommunikation und Content" },
    "hochschuldozent": { delta: 0.03, label: "Research, Materialerstellung und Feedback" },
    "maschinenbauingenieur": { delta: 0.02, label: "technische Dokumentation und CAD-nahe Analyse" },
    "elektroingenieur": { delta: 0.02, label: "technische Dokumentation, Code und Schaltplanpruefung" }
  }
};

const CATEGORY_CONFIDENCE = {
  "finanzen-recht": { confidence: "medium", reasons: ["Hohe regulatorische Verantwortung", "Datenzugang und Auditierbarkeit entscheidend"] },
  "it-tech": { confidence: "medium", reasons: ["Klar digitales Text-, Code- und Toolprofil", "Schweizer Rollen enthalten oft mehr Architektur, Testing, Stakeholder-Interaktion und regulatorische Verantwortung", "Einfache Implementierungsaufgaben koennen off-/nearshored sein"] },
  "gesundheit": { confidence: "low", reasons: ["Hohe regulatorische Verantwortung", "Patientenkontakt und Datenzugang begrenzen"] },
  "bildung": { confidence: "medium", reasons: ["Starke Variation zwischen Institutionen", "Beziehungs- und Aufsichtsanteil"] },
  "handwerk-bau": { confidence: "low", reasons: ["Hoher physischer Anteil", "Vor-Ort-Kontext dominiert"] },
  "verwaltung": { confidence: "high", reasons: ["Viele standardisierte digitale Dokumenten- und Prozessaufgaben"] },
  "verkauf-handel": { confidence: "medium", reasons: ["Starke Variation zwischen Organisationen", "Kundenkontakt und Datenzugang relevant"] },
  "marketing-sales": { confidence: "medium", reasons: ["Starke Variation zwischen Organisationen", "Kundenzugang, Marke und Datenzugang relevant"] },
  "transport-logistik": { confidence: "low", reasons: ["Hoher physischer Anteil", "Sicherheits- und Mobilitaetskontext"] },
  "gastronomie-tourismus": { confidence: "medium", reasons: ["Gemischtes digitales und physisches Aufgabenprofil"] },
  "landwirtschaft": { confidence: "low", reasons: ["Hoher physischer Anteil", "Sensorik und Robotik ausserhalb des LLM-Scopes"] },
  "kunst-medien": { confidence: "medium", reasons: ["Starke Variation nach Auftrag, Rechten und Organisation"] },
  "ingenieurwesen": { confidence: "medium", reasons: ["Validierung, Normen und physische Systeme begrenzen"] },
  "soziales": { confidence: "low", reasons: ["Beziehungsarbeit und Schutzauftrag zentral", "Datenzugang stark begrenzt"] },
  "personen-dienste": { confidence: "low", reasons: ["Hoher physischer Anteil", "Vor-Ort-Service und menschliche Beziehung dominieren"] },
  "sicherheit": { confidence: "low", reasons: ["Einsatzsituationen und Verantwortung stark kontextabhaengig"] }
};

const SCENARIOS = [
  { id: "science_2024", label: "Science 2024", description: "Originale Eloundou-basierte Dashboard-Scores", adoption: false, roleScale: 0, factorScale: 0, capMode: "base" },
  { id: "technical_base_2026", label: "Heute 2026 technisch", description: "Plausibles Basisszenario ohne Adoption; nicht als defensives Szenario zu lesen", adoption: false, roleScale: 1, factorScale: 1, capMode: "base" },
  { id: "adoption_adjusted_base_2026", label: "Heute 2026 adoptionsgewichtet", description: "Technische Exposition plus separater Adoptionaufschlag", adoption: true, roleScale: 1, factorScale: 1, capMode: "base" },
  { id: "no_role_overrides", label: "Ohne Berufs-Overrides", description: "Technische Modifikatoren ohne berufsspezifische Overrides", adoption: false, roleScale: 0, factorScale: 1, capMode: "base" },
  { id: "half_modifiers", label: "Halbierte Modifikatoren", description: "Konservativere technische Fortschrittsannahmen", adoption: false, roleScale: 0.5, factorScale: 0.5, capMode: "base" },
  { id: "aggressive_modifiers", label: "Aggressivere Modifikatoren", description: "Hoehere technische Fortschrittsannahmen bei gleichen Caps", adoption: false, roleScale: 1.35, factorScale: 1.35, capMode: "base" },
  { id: "no_caps", label: "Ohne Caps", description: "Technisches Basisszenario ohne berufsfeldspezifische Obergrenzen", adoption: false, roleScale: 1, factorScale: 1, capMode: "none" },
  { id: "strict_caps", label: "Strengere Caps", description: "Technisches Basisszenario mit um einen Scorepunkt strengeren Caps", adoption: false, roleScale: 1, factorScale: 1, capMode: "strict" }
];

function task(category, taskText, oldLabel, newLabel, driver, rationale) {
  return { category, categoryLabel: CATS[category], task: taskText, oldLabel, newLabel, transition: `${oldLabel}->${newLabel}`, driver, rationale };
}

const REANNOTATION_SAMPLE = [
  task("finanzen-recht", "Mehrere Vertragsversionen vergleichen", "E2", "E1", "long_context", "Lange Dokumente passen heute eher direkt in den Modellkontext."),
  task("finanzen-recht", "Mandantenbrief zu Steuerfrage vorbereiten", "E1", "E1", "none", "Textarbeit war bereits direkt exponiert."),
  task("finanzen-recht", "Belege klassifizieren und Rueckfragen formulieren", "E2", "E1", "agentic_tools", "Dokumenten- und Workflowtools reduzieren Tool-Reibung."),
  task("finanzen-recht", "Gerichtsstrategie festlegen", "E0", "E0", "cap", "Verantwortung und Urteil bleiben ausserhalb."),
  task("finanzen-recht", "Regulatorische Neuerungen recherchieren", "E2", "E1", "agentic_tools", "Rechercheagenten und Quellenarbeit sind reifer."),
  task("finanzen-recht", "Kundengespraech fuehren", "E0", "E0", "social", "Vertrauen und Haftung bleiben menschlich."),
  task("finanzen-recht", "Due-Diligence-Dossier zusammenfassen", "E2", "E1", "long_context", "Lange Kontexte senken den Integrationsaufwand."),
  task("finanzen-recht", "Standardreport aus Transaktionen entwerfen", "E1", "E1", "none", "Bereits text- und datenbasiert exponiert."),

  task("it-tech", "Bug in grosser Codebasis lokalisieren", "E2", "E1", "long_context", "Repository-Kontext und Coding-Agenten machen die Aufgabe direkter erreichbar."),
  task("it-tech", "Unit-Tests fuer Modul schreiben", "E1", "E1", "none", "Bereits direkt durch LLMs unterstuetzbar."),
  task("it-tech", "Deployment-Runbook ausfuehren", "E2", "E2", "agentic_tools", "Tool-Use reduziert Reibung, aber Produktivsysteme, Berechtigungen und Change-Freigaben bleiben begrenzend."),
  task("it-tech", "Physischen Server tauschen", "E0", "E0", "physical", "Physische Arbeit bleibt ausser Scope."),
  task("it-tech", "Security Findings priorisieren", "E2", "E2", "agentic_tools", "Codeanalyse und Triageagenten sind staerker, aber Angriffskontext, Haftung und False Positives verhindern eine direkte Einstufung."),
  task("it-tech", "Architekturentscheidung verantworten", "E0", "E0", "long_context", "KI kann Optionen vorbereiten, aber Systemverantwortung, Trade-offs und Stakeholder-Kontext bleiben ausserhalb direkter Exposition."),
  task("it-tech", "Datenpipeline dokumentieren", "E1", "E1", "none", "Dokumentation war bereits exponiert."),
  task("it-tech", "UI-Prototyp aus Briefing erstellen", "E2", "E1", "multimodal", "Text-, Bild- und Codegenerierung wachsen zusammen."),

  task("gesundheit", "Arztbrief aus Notizen entwerfen", "E1", "E1", "none", "Dokumentation war bereits exponiert."),
  task("gesundheit", "Befundbild sprachlich einordnen", "E2", "E2", "multimodal", "Multimodalitaet hilft, bleibt wegen Verantwortung aber Tool-gestuetzt."),
  task("gesundheit", "Patienten koerperlich untersuchen", "E0", "E0", "physical", "Physische Untersuchung und Verantwortung bleiben menschlich."),
  task("gesundheit", "Fachliteratur zu Therapieoptionen zusammenfassen", "E2", "E1", "long_context", "Lange Kontexte verbessern Literaturarbeit."),
  task("gesundheit", "Pflegedokumentation strukturieren", "E1", "E1", "none", "Text- und Formulararbeit bereits exponiert."),
  task("gesundheit", "Medikationsinteraktion vorpruefen", "E2", "E2", "agentic_tools", "Vorpruefung moeglich, finale Entscheidung reguliert."),
  task("gesundheit", "Notfalleinsatz durchfuehren", "E0", "E0", "physical", "Zeitkritische physische Handlung bleibt ausser Scope."),
  task("gesundheit", "Patientenkommunikation empathisch fuehren", "E0", "E0", "social", "Beziehungsarbeit begrenzt."),

  task("bildung", "Unterrichtsmaterial differenziert erstellen", "E1", "E1", "none", "Direkte Text- und Materialarbeit."),
  task("bildung", "Schuelerarbeiten vorstrukturieren und Feedback entwerfen", "E2", "E1", "agentic_tools", "Workflownahe KI reduziert Aufwand."),
  task("bildung", "Klassenfuehrung im Unterricht", "E0", "E0", "social", "Praesenz und Beziehung bleiben zentral."),
  task("bildung", "Forschungsstand aus vielen PDFs synthetisieren", "E2", "E1", "long_context", "Long Context reduziert Recherchefriktion."),
  task("bildung", "Pruefung rechtsgueltig bewerten", "E0", "E2", "agentic_tools", "Assistenz moeglich, Verantwortung bleibt menschlich."),
  task("bildung", "Lernvideo und Quiz aus Thema erstellen", "E2", "E1", "multimodal", "Multimodale Erstellung ist deutlich naeher an direkt."),
  task("bildung", "Elterngespraech fuehren", "E0", "E0", "social", "Beziehung und Kontext begrenzen."),
  task("bildung", "Vorlesungsskript aktualisieren", "E1", "E1", "none", "Textarbeit bereits exponiert."),

  task("handwerk-bau", "Offerte aus Kundenangaben formulieren", "E1", "E1", "none", "Text- und Kalkulationsvorbereitung."),
  task("handwerk-bau", "Baustellenfoto beschreiben", "E2", "E2", "multimodal", "Bildanalyse hilft, ersetzt Vor-Ort-Pruefung nicht."),
  task("handwerk-bau", "Leitung installieren", "E0", "E0", "physical", "Physische Ausfuehrung bleibt ausser Scope."),
  task("handwerk-bau", "Materialliste aus Plan ableiten", "E2", "E2", "multimodal", "Assistenz moeglich, Plaene und Kontext bleiben limitiert."),
  task("handwerk-bau", "Sicherheitsprotokoll schreiben", "E1", "E1", "none", "Dokumentation bereits exponiert."),
  task("handwerk-bau", "Mauerwerk erstellen", "E0", "E0", "physical", "Koerperliche Arbeit dominiert."),
  task("handwerk-bau", "Normenstelle fuer Installation recherchieren", "E2", "E1", "long_context", "Normenrecherche wird direkter erreichbar."),
  task("handwerk-bau", "Kundenberatung vor Ort", "E0", "E0", "social", "Vor-Ort-Vertrauen und Messung begrenzen."),

  task("verwaltung", "Formularfall pruefen und Antwort entwerfen", "E2", "E1", "agentic_tools", "Formular- und Registerworkflows sind agentenfaehiger."),
  task("verwaltung", "E-Mail triagieren", "E1", "E1", "none", "Bereits direkt exponiert."),
  task("verwaltung", "Terminserie organisieren", "E2", "E1", "agentic_tools", "Kalenderagenten machen Tool-Use direkter."),
  task("verwaltung", "Rechtsverbindliche Verfuegung verantworten", "E0", "E2", "long_context", "Entwurf und Pruefung moeglich, Verantwortung bleibt."),
  task("verwaltung", "Aktenstapel zusammenfassen", "E2", "E1", "long_context", "Lange Kontexte reduzieren Aktenfriktion."),
  task("verwaltung", "Buergergespraech in Konfliktlage fuehren", "E0", "E0", "social", "Soziale Situation begrenzt."),
  task("verwaltung", "Protokoll aus Sitzung erstellen", "E1", "E1", "none", "Textarbeit bereits exponiert."),
  task("verwaltung", "Daten zwischen Fachsystemen abgleichen", "E2", "E1", "agentic_tools", "Computer-Use und Integrationen senken Aufwand."),

  task("verkauf-handel", "Angebot aus CRM-Daten vorbereiten", "E2", "E1", "agentic_tools", "CRM-Agenten machen Aufgabe direkter."),
  task("verkauf-handel", "Produktbeschreibung schreiben", "E1", "E1", "none", "Direkte Textarbeit."),
  task("verkauf-handel", "Preisverhandlung fuehren", "E0", "E0", "social", "Beziehung und Strategie bleiben menschlich."),
  task("verkauf-handel", "Sortimentsanalyse aus Reports erstellen", "E2", "E1", "long_context", "Mehr Dokumente und Daten koennen verarbeitet werden."),
  task("verkauf-handel", "Ladenregal einraeumen", "E0", "E0", "physical", "Physische Ausfuehrung."),
  task("verkauf-handel", "Kundenmail beantworten", "E1", "E1", "none", "Bereits exponiert."),
  task("verkauf-handel", "Produktbild fuer Kampagne variieren", "E2", "E1", "multimodal", "Bild-KI senkt Reibung."),
  task("verkauf-handel", "Lieferantenvergleich erstellen", "E2", "E1", "agentic_tools", "Recherche und Tabellenarbeit naeher an direkt."),

  task("marketing-sales", "Kampagnenbriefing in Zielgruppen-Copy uebersetzen", "E1", "E1", "none", "Text- und Variantenarbeit war bereits direkt exponiert."),
  task("marketing-sales", "Markt- und Wettbewerbsrecherche fuer Pitch verdichten", "E2", "E1", "long_context", "Viele Quellen und Reports koennen heute direkter synthetisiert werden."),
  task("marketing-sales", "CRM-Follow-up nach Kundentermin vorbereiten", "E2", "E1", "agentic_tools", "CRM- und E-Mail-Agenten reduzieren Tool-Reibung."),
  task("marketing-sales", "Preis- und Vertragsverhandlung fuehren", "E0", "E0", "social", "Vertrauen, Timing und Verhandlungsverantwortung bleiben menschlich."),
  task("marketing-sales", "Praesentationsdeck aus Interviewnotizen erstellen", "E2", "E1", "agentic_tools", "Recherche-, Schreib- und Slide-Workflows sind agentenfaehiger."),
  task("marketing-sales", "Markenpositionierung final entscheiden", "E0", "E2", "long_context", "KI kann Optionen und Evidenz vorbereiten, aber Entscheidung und Verantwortung bleiben."),
  task("marketing-sales", "Produktvisual fuer Kampagne variieren", "E2", "E1", "multimodal", "Bild- und Layoutgenerierung senken Reibung deutlich."),
  task("marketing-sales", "B2B-Besuch vor Ort durchfuehren", "E0", "E0", "social", "Praesenz, Beziehung und Fachkontext beim Kunden begrenzen."),

  task("transport-logistik", "Tourenplan aus Auftraegen vorbereiten", "E2", "E2", "agentic_tools", "Planungsassistenz steigt, Kontext bleibt operativ."),
  task("transport-logistik", "Fahrzeug sicher fuehren", "E0", "E0", "physical", "Autonomes Fahren ausserhalb LLM-Scope."),
  task("transport-logistik", "Frachtpapiere pruefen", "E2", "E1", "long_context", "Dokumentenabgleich wird direkter."),
  task("transport-logistik", "Kundenstatusmeldung schreiben", "E1", "E1", "none", "Textarbeit bereits exponiert."),
  task("transport-logistik", "Lagerware bewegen", "E0", "E0", "physical", "Physische Arbeit."),
  task("transport-logistik", "Stoerungsmeldung triagieren", "E2", "E2", "agentic_tools", "Assistenz moeglich, Echtzeitkontext begrenzt."),
  task("transport-logistik", "Schichtbericht erstellen", "E1", "E1", "none", "Dokumentation."),
  task("transport-logistik", "Sicherheitsentscheidung im Betrieb treffen", "E0", "E0", "safety", "Verantwortung und Situation vor Ort."),

  task("gastronomie-tourismus", "Reiseroute mit Praeferenzen planen", "E2", "E1", "agentic_tools", "Reiseagenten sind deutlich staerker."),
  task("gastronomie-tourismus", "Menuebeschreibung schreiben", "E1", "E1", "none", "Textarbeit."),
  task("gastronomie-tourismus", "Speisen zubereiten", "E0", "E0", "physical", "Physische Arbeit."),
  task("gastronomie-tourismus", "Gästemail beantworten", "E1", "E1", "none", "Direkt exponiert."),
  task("gastronomie-tourismus", "Buchungsdaten abgleichen", "E2", "E1", "agentic_tools", "Tool-Use senkt Reibung."),
  task("gastronomie-tourismus", "Beschwerdegespraech vor Ort fuehren", "E0", "E0", "social", "Empathie und Situation begrenzen."),
  task("gastronomie-tourismus", "Social-Media-Visual erstellen", "E2", "E1", "multimodal", "Multimodale Generierung direkter."),
  task("gastronomie-tourismus", "Hygienekontrolle physisch durchfuehren", "E0", "E0", "physical", "Vor-Ort-Pruefung."),

  task("landwirtschaft", "Wetter- und Marktbericht zusammenfassen", "E1", "E1", "none", "Text- und Datenarbeit."),
  task("landwirtschaft", "Pflanzenbild grob einordnen", "E2", "E2", "multimodal", "Assistenz moeglich, Feldkontext begrenzt."),
  task("landwirtschaft", "Ernte physisch einbringen", "E0", "E0", "physical", "Physische Arbeit."),
  task("landwirtschaft", "Foerderantrag vorbereiten", "E2", "E1", "long_context", "Formulare und Regeln besser erreichbar."),
  task("landwirtschaft", "Tier behandeln", "E0", "E0", "physical", "Physische und fachliche Verantwortung."),
  task("landwirtschaft", "Marketingtext fuer Hofladen schreiben", "E1", "E1", "none", "Direkte Textarbeit."),
  task("landwirtschaft", "Sensorwerte interpretieren", "E2", "E2", "agentic_tools", "Datenassistenz, aber Integration variiert."),
  task("landwirtschaft", "Maschine warten", "E0", "E0", "physical", "Vor-Ort-Arbeit."),

  task("kunst-medien", "Bildvarianten fuer Kampagne erzeugen", "E2", "E1", "multimodal", "Bildgenerierung ist deutlich direkter geworden."),
  task("kunst-medien", "Artikelentwurf schreiben", "E1", "E1", "none", "Textarbeit."),
  task("kunst-medien", "Interview vor Ort fuehren", "E0", "E0", "social", "Beziehung und Situation begrenzen."),
  task("kunst-medien", "Video transkribieren und schneiden lassen", "E2", "E1", "multimodal", "Video- und Untertiteltools naeher an direkt."),
  task("kunst-medien", "Markenstrategie entscheiden", "E0", "E2", "long_context", "Assistenz moeglich, Entscheidung menschlich."),
  task("kunst-medien", "Pressemitteilung variieren", "E1", "E1", "none", "Direkte Textarbeit."),
  task("kunst-medien", "Foto retuschieren", "E2", "E1", "multimodal", "Bild-KI senkt Tool-Reibung."),
  task("kunst-medien", "Rechte und Freigaben klaeren", "E0", "E2", "agentic_tools", "Vorbereitung moeglich, finale Klaerung bleibt."),

  task("ingenieurwesen", "Normen und Spezifikationen vergleichen", "E2", "E1", "long_context", "Lange technische Dokumente besser erreichbar."),
  task("ingenieurwesen", "Berechnungsbericht entwerfen", "E1", "E1", "none", "Text- und Rechenassistenz."),
  task("ingenieurwesen", "Anlage vor Ort abnehmen", "E0", "E0", "physical", "Physische Pruefung und Haftung."),
  task("ingenieurwesen", "CAD-Screenshot kommentieren", "E2", "E2", "multimodal", "Visuelle Assistenz, aber fachliche Validierung."),
  task("ingenieurwesen", "Python-Skript fuer Simulation schreiben", "E1", "E1", "none", "Codearbeit bereits exponiert."),
  task("ingenieurwesen", "Technische Risikoanalyse vorbereiten", "E2", "E1", "long_context", "Dokumenten- und Normenkontext hilft."),
  task("ingenieurwesen", "Bauleitung auf Baustelle", "E0", "E0", "physical", "Vor-Ort-Koordination."),
  task("ingenieurwesen", "Messdaten plausibilisieren", "E2", "E2", "agentic_tools", "Assistenz, aber Validierung bleibt."),

  task("soziales", "Falldokumentation strukturieren", "E1", "E1", "none", "Textarbeit."),
  task("soziales", "Hilfsangebote recherchieren", "E2", "E1", "agentic_tools", "Rechercheagenten helfen."),
  task("soziales", "Krisengespraech fuehren", "E0", "E0", "social", "Beziehung und Verantwortung zentral."),
  task("soziales", "Foerderplan entwerfen", "E2", "E2", "long_context", "Assistenz moeglich, Individualkontext begrenzt."),
  task("soziales", "Kind betreuen", "E0", "E0", "physical", "Praesenz und Fuersorge."),
  task("soziales", "Bericht an Behoerde formulieren", "E1", "E1", "none", "Dokumentation."),
  task("soziales", "Risikoabschaetzung verantworten", "E0", "E0", "social", "Schutzauftrag und Urteil."),
  task("soziales", "Termine und Nachweise koordinieren", "E2", "E1", "agentic_tools", "Administrative Agenten senken Reibung."),

  task("personen-dienste", "Termin- und Einsatzplan erstellen", "E2", "E1", "agentic_tools", "Planungs- und Kommunikationsagenten machen Nebenaufgaben direkter erreichbar."),
  task("personen-dienste", "Kundenantwort oder Offertentext formulieren", "E1", "E1", "none", "Textarbeit war bereits exponiert."),
  task("personen-dienste", "Haarschnitt oder Reinigung vor Ort ausfuehren", "E0", "E0", "physical", "Die Kerntaetigkeit ist koerperliche Arbeit am Ort."),
  task("personen-dienste", "Foto eines Arbeitsbereichs fuer Checkliste beschreiben", "E2", "E2", "multimodal", "Visuelle Assistenz hilft, ersetzt aber Vor-Ort-Beurteilung nicht."),
  task("personen-dienste", "Social-Media-Post fuer Salon oder Betrieb erstellen", "E1", "E1", "none", "Direkte Text- und Bildideenarbeit."),
  task("personen-dienste", "Qualitaetskontrolle vor Ort verantworten", "E0", "E0", "physical", "Sensorik, Verantwortung und Umgebung bleiben ausserhalb reiner LLM-Exposition."),
  task("personen-dienste", "Rapport oder Checkliste aus Stichworten schreiben", "E1", "E1", "none", "Dokumentation ist direkt erreichbar."),
  task("personen-dienste", "Kundengespraech ueber Stil, Erwartungen oder Beschwerden fuehren", "E0", "E0", "social", "Menschliche Beziehung, Vertrauen und Situation begrenzen."),

  task("sicherheit", "Rapport aus Stichworten erstellen", "E1", "E1", "none", "Textarbeit."),
  task("sicherheit", "Lagebild aus Meldungen zusammenfassen", "E2", "E1", "long_context", "Viele Meldungen koennen besser synthetisiert werden."),
  task("sicherheit", "Einsatz vor Ort fuehren", "E0", "E0", "safety", "Verantwortung und physische Lage."),
  task("sicherheit", "Videoausschnitt beschreiben", "E2", "E2", "multimodal", "Assistenz, aber Beweiskraft und Kontext begrenzen."),
  task("sicherheit", "Deeskalationsgespraech fuehren", "E0", "E0", "social", "Menschliche Praesenz zentral."),
  task("sicherheit", "Checkliste fuer Schulung erstellen", "E1", "E1", "none", "Textarbeit."),
  task("sicherheit", "Zutrittsdaten pruefen", "E2", "E2", "agentic_tools", "Assistenz, aber Systeme und Berechtigungen variieren."),
  task("sicherheit", "Brandbekaempfung durchfuehren", "E0", "E0", "physical", "Physische Einsatzarbeit.")
];

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function round4(n) {
  return Number(n.toFixed(4));
}

function scoreFromBeta(beta) {
  return Math.round(beta * 10);
}

function capFor(item, factors, scenario) {
  if (scenario.capMode === "none") return 10;
  if (scenario.capMode === "strict") return Math.max(item.exposure, Math.max(1, factors.cap - 1));
  return factors.cap;
}

function computeScenario(item, scenario) {
  if (scenario.id === "science_2024") {
    return {
      beta: item.beta,
      score: item.exposure,
      rawBeta: item.beta,
      cap: 10,
      capApplied: false
    };
  }

  const factors = MODEL.categoryFactors[item.category];
  const override = MODEL.roleOverrides[item.slug] || { delta: 0, label: "" };
  const techDelta = scenario.factorScale * (factors.longContext + factors.agentic + factors.multimodal);
  const roleDelta = scenario.roleScale * override.delta;
  const adoptionDelta = scenario.adoption ? factors.adoption : 0;
  const rawBeta = item.beta + techDelta + roleDelta + adoptionDelta;
  const capScore = capFor(item, factors, scenario);
  const capBeta = scenario.capMode === "none" ? 1 : Math.max(item.beta, capScore / 10);
  const beta = clamp(rawBeta, item.beta, capBeta);

  return {
    beta,
    score: scoreFromBeta(beta),
    rawBeta,
    cap: capScore,
    capApplied: rawBeta > capBeta
  };
}

function confidenceFor(item) {
  const base = CATEGORY_CONFIDENCE[item.category] || { confidence: "medium", reasons: ["Gemischtes Aufgabenprofil"] };
  let confidence = base.confidence;
  const reasons = [...base.reasons];

  if (item.mapping_confidence === "scope") {
    confidence = "low";
    reasons.push("Originalscore hat Scope-Hinweis");
  } else if (item.mapping_confidence === "mittel" && confidence === "high") {
    confidence = "medium";
    reasons.push("Unklare Schweizer Berufszuordnung");
  } else if (item.mapping_confidence === "mittel") {
    reasons.push("Unklare Schweizer Berufszuordnung");
  }

  if (MODEL.roleOverrides[item.slug]) {
    reasons.push("Berufsspezifischer Override sensitiv");
  }

  return {
    confidence,
    uncertaintyReason: [...new Set(reasons)].slice(0, 5)
  };
}

function computeRows() {
  const rows = DATA.map(item => {
    const factors = MODEL.categoryFactors[item.category];
    if (!factors) throw new Error(`Missing category factors for ${item.category}`);
    const override = MODEL.roleOverrides[item.slug] || { delta: 0, label: "" };
    const technical = computeScenario(item, SCENARIOS.find(s => s.id === "technical_base_2026"));
    const adoptionAdjusted = computeScenario(item, SCENARIOS.find(s => s.id === "adoption_adjusted_base_2026"));
    const scenarioScores = Object.fromEntries(SCENARIOS.map(scenario => {
      const result = computeScenario(item, scenario);
      return [scenario.id, {
        beta: round4(result.beta),
        score: result.score,
        delta: result.score - item.exposure,
        cap: result.cap,
        capApplied: result.capApplied
      }];
    }));
    const variantScores = Object.values(scenarioScores).filter((_, index) => SCENARIOS[index].id !== "science_2024").map(result => result.score);
    const minScenarioScore = Math.min(...variantScores);
    const maxScenarioScore = Math.max(...variantScores);
    const uncertainty = confidenceFor(item);

    return {
      occupation: item.title,
      title: item.title,
      slug: item.slug,
      category: item.category,
      category_label: CATS[item.category] || item.category,
      isco: item.isco,
      pay: item.pay,
      jobs: item.jobs,
      pay_previous: item.pay_previous || null,
      source_pay_previous: item.source_pay_previous || "",
      lse_2024_monthly_median: item.lse_2024_monthly_median || null,
      lse_2024_annual_benchmark: item.lse_2024_annual_benchmark || null,
      lse_2024_group_code: item.lse_2024_group_code || "",
      lse_2024_group_label: item.lse_2024_group_label || "",
      lse_2024_source_url: item.lse_2024_source_url || "",
      pay_refresh_method: item.pay_refresh_method || "",
      pay_mapping_level: item.pay_mapping_level || "",
      pay_mapping_confidence: item.pay_mapping_confidence || "",
      jobs_2023_base: item.jobs_2023_base || null,
      source_jobs_previous: item.source_jobs_previous || "",
      jobs_refresh_method: item.jobs_refresh_method || "",
      jobs_refresh_factor: item.jobs_refresh_factor || null,
      sake_2023_total_employed: item.sake_2023_total_employed || null,
      sake_2024_total_employed: item.sake_2024_total_employed || null,
      score_2024: item.exposure,
      beta_2024: item.beta,
      technical_beta_2026: round4(technical.beta),
      technical_score_2026: technical.score,
      adoption_adjusted_beta_2026: round4(adoptionAdjusted.beta),
      adoption_adjusted_score_2026: adoptionAdjusted.score,
      delta_technical: technical.score - item.exposure,
      delta_adoption_adjusted: adoptionAdjusted.score - item.exposure,
      raw_technical_beta_2026: round4(technical.rawBeta),
      raw_adoption_adjusted_beta_2026: round4(adoptionAdjusted.rawBeta),
      cap: factors.cap,
      cap_type: factors.capType,
      cap_rationale: factors.capRationale,
      cap_could_rise_if: factors.capCouldRiseIf,
      cap_applied_technical: technical.capApplied,
      cap_applied_adoption_adjusted: adoptionAdjusted.capApplied,
      modifiers: {
        long_context: factors.longContext,
        agentic_tools: factors.agentic,
        multimodal: factors.multimodal,
        adoption: factors.adoption,
        role_override: override.delta
      },
      override_label: override.label,
      confidence: uncertainty.confidence,
      uncertainty_reason: uncertainty.uncertaintyReason,
      scenario_score_range: maxScenarioScore - minScenarioScore,
      min_scenario_score: minScenarioScore,
      max_scenario_score: maxScenarioScore,
      mapping_confidence: item.mapping_confidence || (item.mapping_note ? "mittel" : "hoch"),
      mapping_note: item.mapping_note || "",
      v4_gap_addition: Boolean(item.v4_gap_addition),
      v4_gap_source: item.v4_gap_source || "",
      source_pay: item.source_pay,
      source_jobs: item.source_jobs,
      scenario: "base_2026",
      scenario_scores: scenarioScores,
      note: factors.note
    };
  });

  return rows;
}

function summaryFor(rows, scenarioId) {
  const jobs = rows.reduce((sum, row) => sum + row.jobs, 0);
  const scoreFor = row => row.scenario_scores[scenarioId].score;
  const weighted = rows.reduce((sum, row) => sum + row.jobs * scoreFor(row), 0) / jobs;
  return {
    very_high_8_10: rows.filter(row => scoreFor(row) >= 8).length,
    medium_5_7: rows.filter(row => scoreFor(row) >= 5 && scoreFor(row) <= 7).length,
    low_0_4: rows.filter(row => scoreFor(row) <= 4).length,
    weighted_score: Number(weighted.toFixed(2)),
    top_10_deltas: rows
      .map(row => ({
        slug: row.slug,
        occupation: row.occupation,
        score_2024: row.score_2024,
        scenario_score: scoreFor(row),
        delta: scoreFor(row) - row.score_2024
      }))
      .sort((a, b) => b.delta - a.delta || b.scenario_score - a.scenario_score || a.occupation.localeCompare(b.occupation, "de"))
      .slice(0, 10),
    top_10_uncertainty: rows
      .map(row => ({
        slug: row.slug,
        occupation: row.occupation,
        confidence: row.confidence,
        scenario_score_range: row.scenario_score_range,
        min_scenario_score: row.min_scenario_score,
        max_scenario_score: row.max_scenario_score,
        uncertainty_reason: row.uncertainty_reason
      }))
      .sort((a, b) => b.scenario_score_range - a.scenario_score_range || confidenceRank(b.confidence) - confidenceRank(a.confidence))
      .slice(0, 10)
  };
}

function confidenceRank(confidence) {
  return { low: 3, medium: 2, high: 1 }[confidence] || 0;
}

function reannotationSummary() {
  const byCategory = {};
  for (const row of REANNOTATION_SAMPLE) {
    byCategory[row.category] ||= {
      category: row.category,
      category_label: row.categoryLabel,
      tasks: 0,
      transitions: {},
      e0_stays_e0: 0,
      e0_to_e2: 0,
      e2_to_e1: 0,
      e1_stays_e1: 0
    };
    const bucket = byCategory[row.category];
    bucket.tasks += 1;
    bucket.transitions[row.transition] = (bucket.transitions[row.transition] || 0) + 1;
    if (row.oldLabel === "E0" && row.newLabel === "E0") bucket.e0_stays_e0 += 1;
    if (row.oldLabel === "E0" && row.newLabel === "E2") bucket.e0_to_e2 += 1;
    if (row.oldLabel === "E2" && row.newLabel === "E1") bucket.e2_to_e1 += 1;
    if (row.oldLabel === "E1" && row.newLabel === "E1") bucket.e1_stays_e1 += 1;
  }
  return Object.values(byCategory);
}

function csvEscape(value) {
  const text = Array.isArray(value) ? value.join("; ") : String(value ?? "");
  return /[",\n;]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function writeCsv(fileName, headers, rows) {
  const lines = rows.map(row => headers.map(header => csvEscape(row[header])).join(","));
  fs.writeFileSync(path.join(dataDir, fileName), `${headers.join(",")}\n${lines.join("\n")}\n`);
}

const scores = computeRows();
const scenarioSummary = Object.fromEntries(SCENARIOS.map(scenario => [scenario.id, {
  id: scenario.id,
  label: scenario.label,
  description: scenario.description,
  ...summaryFor(scores, scenario.id)
}]));

const output = {
  generated_at: MODEL.asOf,
  model: MODEL,
  scenarios: SCENARIOS,
  summary: {
    occupations: scores.length,
    science_2024: scenarioSummary.science_2024,
    technical_base_2026: scenarioSummary.technical_base_2026,
    adoption_adjusted_base_2026: scenarioSummary.adoption_adjusted_base_2026,
    weighted_delta_technical: Number((scenarioSummary.technical_base_2026.weighted_score - scenarioSummary.science_2024.weighted_score).toFixed(2)),
    weighted_delta_adoption_adjusted: Number((scenarioSummary.adoption_adjusted_base_2026.weighted_score - scenarioSummary.science_2024.weighted_score).toFixed(2))
  },
  scores
};

fs.mkdirSync(dataDir, { recursive: true });
fs.writeFileSync(path.join(dataDir, "today-scores-2026.json"), JSON.stringify(output, null, 2) + "\n");
fs.writeFileSync(path.join(dataDir, "scenario-summary-2026.json"), JSON.stringify({ generated_at: MODEL.asOf, scenarios: scenarioSummary }, null, 2) + "\n");
fs.writeFileSync(path.join(dataDir, "reannotation-sample-2026.json"), JSON.stringify({ generated_at: MODEL.asOf, tasks: REANNOTATION_SAMPLE, summary: reannotationSummary() }, null, 2) + "\n");

writeCsv("today-scores-2026.csv", [
  "slug",
  "occupation",
  "category",
  "category_label",
  "isco",
  "pay",
  "jobs",
  "pay_previous",
  "source_pay_previous",
  "lse_2024_group_code",
  "lse_2024_monthly_median",
  "lse_2024_annual_benchmark",
  "pay_refresh_method",
  "jobs_2023_base",
  "source_jobs_previous",
  "jobs_refresh_factor",
  "jobs_refresh_method",
  "beta_2024",
  "score_2024",
  "technical_beta_2026",
  "technical_score_2026",
  "adoption_adjusted_beta_2026",
  "adoption_adjusted_score_2026",
  "delta_technical",
  "delta_adoption_adjusted",
  "cap",
  "cap_type",
  "cap_applied_technical",
  "long_context",
  "agentic_tools",
  "multimodal",
  "adoption",
  "role_override",
  "confidence",
  "uncertainty_reason",
  "mapping_confidence",
  "v4_gap_addition",
  "v4_gap_source"
], scores.map(row => ({
  slug: row.slug,
  occupation: row.occupation,
  category: row.category,
  category_label: row.category_label,
  isco: row.isco,
  pay: row.pay,
  jobs: row.jobs,
  pay_previous: row.pay_previous,
  source_pay_previous: row.source_pay_previous,
  lse_2024_group_code: row.lse_2024_group_code,
  lse_2024_monthly_median: row.lse_2024_monthly_median,
  lse_2024_annual_benchmark: row.lse_2024_annual_benchmark,
  pay_refresh_method: row.pay_refresh_method,
  jobs_2023_base: row.jobs_2023_base,
  source_jobs_previous: row.source_jobs_previous,
  jobs_refresh_factor: row.jobs_refresh_factor,
  jobs_refresh_method: row.jobs_refresh_method,
  beta_2024: row.beta_2024,
  score_2024: row.score_2024,
  technical_beta_2026: row.technical_beta_2026,
  technical_score_2026: row.technical_score_2026,
  adoption_adjusted_beta_2026: row.adoption_adjusted_beta_2026,
  adoption_adjusted_score_2026: row.adoption_adjusted_score_2026,
  delta_technical: row.delta_technical,
  delta_adoption_adjusted: row.delta_adoption_adjusted,
  cap: row.cap,
  cap_type: row.cap_type,
  cap_applied_technical: row.cap_applied_technical,
  long_context: row.modifiers.long_context,
  agentic_tools: row.modifiers.agentic_tools,
  multimodal: row.modifiers.multimodal,
  adoption: row.modifiers.adoption,
  role_override: row.modifiers.role_override,
  confidence: row.confidence,
  uncertainty_reason: row.uncertainty_reason,
  mapping_confidence: row.mapping_confidence,
  v4_gap_addition: row.v4_gap_addition,
  v4_gap_source: row.v4_gap_source
})));

writeCsv("scenario-summary-2026.csv", [
  "scenario",
  "label",
  "very_high_8_10",
  "medium_5_7",
  "low_0_4",
  "weighted_score"
], Object.values(scenarioSummary).map(row => ({
  scenario: row.id,
  label: row.label,
  very_high_8_10: row.very_high_8_10,
  medium_5_7: row.medium_5_7,
  low_0_4: row.low_0_4,
  weighted_score: row.weighted_score
})));

writeCsv("reannotation-sample-2026.csv", [
  "category",
  "categoryLabel",
  "task",
  "oldLabel",
  "newLabel",
  "transition",
  "driver",
  "rationale"
], REANNOTATION_SAMPLE);

writeCsv("mapping-2026.csv", [
  "slug",
  "occupation",
  "category",
  "isco",
  "mapping_confidence",
  "mapping_note",
  "lse_2024_group_code",
  "lse_2024_group_label",
  "lse_2024_monthly_median",
  "lse_2024_annual_benchmark",
  "pay_refresh_method",
  "source_pay_previous",
  "pay_mapping_level",
  "pay_mapping_confidence",
  "jobs_2023_base",
  "jobs",
  "jobs_refresh_factor",
  "jobs_refresh_method",
  "source_jobs_previous",
  "v4_gap_addition",
  "v4_gap_source",
  "source_pay",
  "source_jobs"
], DATA.map(item => ({
  slug: item.slug,
  occupation: item.title,
  category: item.category,
  isco: item.isco,
  mapping_confidence: item.mapping_confidence || (item.mapping_note ? "mittel" : "hoch"),
  mapping_note: item.mapping_note || "",
  lse_2024_group_code: item.lse_2024_group_code || "",
  lse_2024_group_label: item.lse_2024_group_label || "",
  lse_2024_monthly_median: item.lse_2024_monthly_median || "",
  lse_2024_annual_benchmark: item.lse_2024_annual_benchmark || "",
  pay_refresh_method: item.pay_refresh_method || "",
  source_pay_previous: item.source_pay_previous || "",
  pay_mapping_level: item.pay_mapping_level || "",
  pay_mapping_confidence: item.pay_mapping_confidence || "",
  jobs_2023_base: item.jobs_2023_base || "",
  jobs: item.jobs,
  jobs_refresh_factor: item.jobs_refresh_factor || "",
  jobs_refresh_method: item.jobs_refresh_method || "",
  source_jobs_previous: item.source_jobs_previous || "",
  v4_gap_addition: Boolean(item.v4_gap_addition),
  v4_gap_source: item.v4_gap_source || "",
  source_pay: item.source_pay,
  source_jobs: item.source_jobs
})));

console.log(`Generated ${scores.length} occupation scores`);
console.log(`Reannotation sample: ${REANNOTATION_SAMPLE.length} tasks`);
console.log(`Science 2024 weighted: ${scenarioSummary.science_2024.weighted_score}/10`);
console.log(`Technical 2026 weighted: ${scenarioSummary.technical_base_2026.weighted_score}/10`);
console.log(`Adoption-adjusted 2026 weighted: ${scenarioSummary.adoption_adjusted_base_2026.weighted_score}/10`);
console.log(`Technical 2026 buckets: ${scenarioSummary.technical_base_2026.very_high_8_10} high, ${scenarioSummary.technical_base_2026.medium_5_7} medium, ${scenarioSummary.technical_base_2026.low_0_4} low`);
