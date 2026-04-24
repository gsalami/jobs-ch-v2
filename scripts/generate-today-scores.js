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
  "transport-logistik": "Transport & Logistik",
  "gastronomie-tourismus": "Gastronomie & Tourismus",
  "landwirtschaft": "Landwirtschaft & Natur",
  "kunst-medien": "Kunst, Design & Medien",
  "ingenieurwesen": "Ingenieurwesen",
  "soziales": "Soziales & Beratung",
  "sicherheit": "Sicherheit & Schutz"
};

const MODEL = {
  id: "ai-exposure-framework-2026-04-24",
  asOf: "2026-04-24",
  title: "GPTs are GPTs, aktualisiert auf 2026",
  formula: "today_beta = min(cap / 10, original_beta + long_context + agentic_tools + multimodal + adoption + role_override); today_score = round(today_beta * 10)",
  sources: [
    "https://www.science.org/doi/10.1126/science.adj0998",
    "https://openai.com/index/gpts-are-gpts/",
    "https://openai.com/index/introducing-gpt-5-5/",
    "https://openai.com/index/introducing-gpt-5-4/",
    "https://openai.com/index/gpt-4-1/",
    "https://openai.com/index/hello-gpt-4o/",
    "https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool",
    "https://blog.google/products-and-platforms/products/gemini/google-gemini-update-may-2024/",
    "https://news.microsoft.com/source/emea/2025/04/2025-work-trend-index-swiss-organizations-lead-in-ai-adoption-52-automate-entire-business-processes-surpassing-global-and-european-averages/"
  ],
  categoryFactors: {
    "finanzen-recht": {
      longContext: 0.10,
      agentic: 0.07,
      multimodal: 0.02,
      adoption: 0.05,
      cap: 9,
      note: "lange Verträge, Dossiers, Regulierung, Research und Reports"
    },
    "it-tech": {
      longContext: 0.09,
      agentic: 0.14,
      multimodal: 0.03,
      adoption: 0.05,
      cap: 10,
      note: "Coding-Agenten, Tool-Use, grosse Codebasen und IT-Workflows"
    },
    "gesundheit": {
      longContext: 0.07,
      agentic: 0.03,
      multimodal: 0.04,
      adoption: 0.02,
      cap: 6,
      note: "Dokumentation, Fachliteratur und multimodaler Befundkontext, aber klinische Verantwortung bleibt begrenzend"
    },
    "bildung": {
      longContext: 0.07,
      agentic: 0.03,
      multimodal: 0.04,
      adoption: 0.03,
      cap: 7,
      note: "Materialerstellung, Feedback, Research und Unterrichtsvorbereitung"
    },
    "handwerk-bau": {
      longContext: 0.03,
      agentic: 0.02,
      multimodal: 0.01,
      adoption: 0.01,
      cap: 4,
      note: "Offerten, Planung und Dokumentation, aber physische Vor-Ort-Arbeit dominiert"
    },
    "verwaltung": {
      longContext: 0.11,
      agentic: 0.14,
      multimodal: 0.02,
      adoption: 0.07,
      cap: 9,
      note: "standardisierte Dokumente, Formulare, E-Mail, Termine und Workflows"
    },
    "verkauf-handel": {
      longContext: 0.07,
      agentic: 0.09,
      multimodal: 0.03,
      adoption: 0.05,
      cap: 8,
      note: "Kundenkommunikation, Angebote, CRM, Sortiments- und Backoffice-Arbeit"
    },
    "transport-logistik": {
      longContext: 0.04,
      agentic: 0.04,
      multimodal: 0.02,
      adoption: 0.02,
      cap: 5,
      note: "Disposition, Planung und Dokumentation, aber physische Mobilität bleibt ausser Scope"
    },
    "gastronomie-tourismus": {
      longContext: 0.05,
      agentic: 0.05,
      multimodal: 0.04,
      adoption: 0.04,
      cap: 7,
      note: "Buchung, Planung, Menüs, Kommunikation und Content"
    },
    "landwirtschaft": {
      longContext: 0.03,
      agentic: 0.02,
      multimodal: 0.02,
      adoption: 0.01,
      cap: 4,
      note: "Beratung, Planung, Markt-/Wetterdaten und Marketing, aber Feldarbeit bleibt physisch"
    },
    "kunst-medien": {
      longContext: 0.09,
      agentic: 0.06,
      multimodal: 0.16,
      adoption: 0.05,
      cap: 9,
      note: "Text plus Bild-, Video- und Audio-Workflows"
    },
    "ingenieurwesen": {
      longContext: 0.09,
      agentic: 0.06,
      multimodal: 0.06,
      adoption: 0.04,
      cap: 8,
      note: "Normen, technische Dokumente, Code und visuelle Analysen"
    },
    "soziales": {
      longContext: 0.05,
      agentic: 0.03,
      multimodal: 0.01,
      adoption: 0.02,
      cap: 5,
      note: "Falldokumentation und Research, aber Beziehung und Schutzauftrag bleiben zentral"
    },
    "sicherheit": {
      longContext: 0.04,
      agentic: 0.03,
      multimodal: 0.02,
      adoption: 0.01,
      cap: 5,
      note: "Berichte, Recherche und Lagebilder, aber Einsatzsituationen bleiben menschlich"
    }
  },
  roleOverrides: {
    "softwareentwickler-in": { delta: 0.04, label: "Coding-Agenten und Repository-Kontext" },
    "data-scientist": { delta: 0.06, label: "Datenanalyse-, Notebook- und Modellierungsagenten" },
    "sysadmin": { delta: 0.04, label: "Tool-Use für IT-Betrieb und Runbooks" },
    "cybersecurity": { delta: 0.07, label: "Security-Codeanalyse und Triage-Agenten" },
    "ki-ingenieur": { delta: 0.08, label: "KI-native Workflows" },
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
    "ux-designer": { delta: 0.04, label: "Prototyping, Research-Synthese und UI-Text" },
    "hr-fachmann": { delta: 0.03, label: "Recruiting-, Policy- und Interview-Workflows" },
    "einkaeufer-in": { delta: 0.03, label: "Lieferantenrecherche und Angebotsvergleich" },
    "hotelfachmann": { delta: 0.03, label: "Buchung, Gästekommunikation und Content" },
    "hochschuldozent": { delta: 0.03, label: "Research, Materialerstellung und Feedback" },
    "maschinenbauingenieur": { delta: 0.02, label: "technische Dokumentation und CAD-nahe Analyse" },
    "elektroingenieur": { delta: 0.02, label: "technische Dokumentation, Code und Schaltplanprüfung" }
  }
};

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function round4(n) {
  return Number(n.toFixed(4));
}

function computeToday(item) {
  const factors = MODEL.categoryFactors[item.category];
  if (!factors) {
    throw new Error(`Missing category factors for ${item.category}`);
  }

  const override = MODEL.roleOverrides[item.slug] || { delta: 0, label: "" };
  const componentSum = factors.longContext + factors.agentic + factors.multimodal + factors.adoption + override.delta;
  const rawBeta = item.beta + componentSum;
  const capBeta = Math.max(item.beta, factors.cap / 10);
  const todayBeta = clamp(rawBeta, item.beta, capBeta);
  const todayScore = Math.round(todayBeta * 10);

  return {
    title: item.title,
    slug: item.slug,
    category: item.category,
    categoryLabel: CATS[item.category] || item.category,
    jobs: item.jobs,
    originalBeta: item.beta,
    originalScore: item.exposure,
    todayBeta: round4(todayBeta),
    todayScore,
    scoreDelta: todayScore - item.exposure,
    rawBeta: round4(rawBeta),
    capScore: factors.cap,
    capApplied: rawBeta > capBeta,
    components: {
      longContext: factors.longContext,
      agentic: factors.agentic,
      multimodal: factors.multimodal,
      adoption: factors.adoption,
      roleOverride: override.delta
    },
    overrideLabel: override.label,
    note: factors.note,
    isco: item.isco
  };
}

function summary(rows, field) {
  const jobs = rows.reduce((sum, row) => sum + row.jobs, 0);
  const weighted = rows.reduce((sum, row) => sum + row.jobs * row[field], 0) / jobs;
  return {
    veryHigh: rows.filter(row => row[field] >= 8).length,
    medium: rows.filter(row => row[field] >= 5 && row[field] <= 7).length,
    low: rows.filter(row => row[field] <= 4).length,
    weighted: Number(weighted.toFixed(2))
  };
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function toCsv(rows) {
  const headers = [
    "slug",
    "title",
    "category",
    "category_label",
    "isco",
    "jobs",
    "original_beta",
    "original_score",
    "today_beta",
    "today_score",
    "score_delta",
    "raw_beta",
    "cap_score",
    "cap_applied",
    "long_context",
    "agentic_tools",
    "multimodal",
    "adoption",
    "role_override",
    "override_label",
    "note"
  ];

  const lines = rows.map(row => [
    row.slug,
    row.title,
    row.category,
    row.categoryLabel,
    row.isco,
    row.jobs,
    row.originalBeta,
    row.originalScore,
    row.todayBeta,
    row.todayScore,
    row.scoreDelta,
    row.rawBeta,
    row.capScore,
    row.capApplied,
    row.components.longContext,
    row.components.agentic,
    row.components.multimodal,
    row.components.adoption,
    row.components.roleOverride,
    row.overrideLabel,
    row.note
  ].map(csvEscape).join(","));

  return `${headers.join(",")}\n${lines.join("\n")}\n`;
}

const scores = DATA.map(computeToday);
const output = {
  generatedAt: "2026-04-24",
  model: MODEL,
  summary: {
    occupations: scores.length,
    science2024: summary(scores.map(row => ({ ...row, science: row.originalScore })), "science"),
    today2026: summary(scores, "todayScore"),
    weightedDelta: Number((summary(scores, "todayScore").weighted - summary(scores.map(row => ({ ...row, science: row.originalScore })), "science").weighted).toFixed(2))
  },
  scores
};

fs.mkdirSync(dataDir, { recursive: true });
fs.writeFileSync(path.join(dataDir, "today-scores-2026.json"), JSON.stringify(output, null, 2) + "\n");
fs.writeFileSync(path.join(dataDir, "today-scores-2026.csv"), toCsv(scores));

console.log(`Generated ${scores.length} today scores`);
console.log(`Science 2024 weighted: ${output.summary.science2024.weighted}/10`);
console.log(`Today 2026 weighted: ${output.summary.today2026.weighted}/10`);
console.log(`Today 2026 buckets: ${output.summary.today2026.veryHigh} high, ${output.summary.today2026.medium} medium, ${output.summary.today2026.low} low`);
