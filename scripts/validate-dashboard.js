const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const htmlPath = path.join(ROOT, "index.html");
const mappingPath = path.join(ROOT, "Files for CC", "eloundou_mapping_results.json");
const todayScoresPath = path.join(ROOT, "data", "today-scores-2026.json");
const scenarioSummaryPath = path.join(ROOT, "data", "scenario-summary-2026.json");
const reannotationPath = path.join(ROOT, "data", "reannotation-sample-2026.json");

const html = fs.readFileSync(htmlPath, "utf8");
const dataMatch = html.match(/const DATA = (\[[\s\S]*?\n\]);/);

if (!dataMatch) {
  fail(["Could not find const DATA array in index.html"]);
}

const DATA = Function("return " + dataMatch[1])();
const errors = [];
const warnings = [];

const REQUIRED = [
  "title",
  "slug",
  "category",
  "pay",
  "jobs",
  "exposure",
  "beta",
  "isco",
  "exposure_rationale",
  "source_pay",
  "source_jobs"
];

const slugs = new Map();
for (const item of DATA) {
  for (const field of REQUIRED) {
    if (item[field] === undefined || item[field] === null || item[field] === "") {
      errors.push(`${item.title || item.slug || "unknown"} is missing ${field}`);
    }
  }

  if (/[^a-z0-9-]/.test(item.slug)) {
    errors.push(`${item.title} has a non-normalized slug: ${item.slug}`);
  }

  if (slugs.has(item.slug)) {
    errors.push(`Duplicate slug: ${item.slug}`);
  }
  slugs.set(item.slug, item.title);

  const expectedScore = Math.round(item.beta * 10);
  if (item.exposure !== expectedScore) {
    errors.push(`${item.title} has exposure ${item.exposure}, expected ${expectedScore} from beta ${item.beta}`);
  }

  if (item.mapping_confidence && !["hoch", "mittel", "scope"].includes(item.mapping_confidence)) {
    errors.push(`${item.title} has invalid mapping_confidence: ${item.mapping_confidence}`);
  }

  if (item.mapping_confidence && !item.mapping_note) {
    warnings.push(`${item.title} has mapping_confidence but no mapping_note`);
  }
}

if (fs.existsSync(mappingPath)) {
  const mapping = JSON.parse(fs.readFileSync(mappingPath, "utf8"));
  const mappedSlugs = new Set((mapping.mapped || []).map(item => item.slug));
  const dataSlugs = new Set(DATA.map(item => item.slug));
  const dataOnly = [...dataSlugs].filter(slug => !mappedSlugs.has(slug));
  const mappingOnly = [...mappedSlugs].filter(slug => !dataSlugs.has(slug));
  const dataBySlug = new Map(DATA.map(item => [item.slug, item]));

  for (const slug of dataOnly) {
    const item = dataBySlug.get(slug);
    if (item && item.v4_gap_addition) {
      warnings.push(`V4 gap addition is not in original mapping JSON: ${slug}`);
    } else {
      errors.push(`Slug exists in DATA but not mapping JSON: ${slug}`);
    }
  }
  for (const slug of mappingOnly) {
    errors.push(`Slug exists in mapping JSON but not DATA: ${slug}`);
  }
}

if (fs.existsSync(todayScoresPath)) {
  const today = JSON.parse(fs.readFileSync(todayScoresPath, "utf8"));
  const todayBySlug = new Map((today.scores || []).map(item => [item.slug, item]));

  if (todayBySlug.size !== DATA.length) {
    errors.push(`Today 2026 scores contain ${todayBySlug.size} occupations, expected ${DATA.length}`);
  }

  for (const item of DATA) {
    const todayItem = todayBySlug.get(item.slug);
    if (!todayItem) {
      errors.push(`Missing Today 2026 score for ${item.slug}`);
      continue;
    }

    if (todayItem.score_2024 !== item.exposure || todayItem.beta_2024 !== item.beta) {
      errors.push(`${item.title} Today 2026 baseline does not match Science 2024 DATA`);
    }

    if (todayItem.technical_score_2026 !== Math.round(todayItem.technical_beta_2026 * 10)) {
      errors.push(`${item.title} technical_score_2026 does not match technical_beta_2026`);
    }

    if (todayItem.adoption_adjusted_score_2026 !== Math.round(todayItem.adoption_adjusted_beta_2026 * 10)) {
      errors.push(`${item.title} adoption_adjusted_score_2026 does not match adoption_adjusted_beta_2026`);
    }

    if (todayItem.adoption_adjusted_beta_2026 < todayItem.technical_beta_2026) {
      errors.push(`${item.title} adoption-adjusted beta is lower than technical beta`);
    }

    if (!["high", "medium", "low"].includes(todayItem.confidence)) {
      errors.push(`${item.title} has invalid Today 2026 confidence: ${todayItem.confidence}`);
    }
  }
}

if (fs.existsSync(scenarioSummaryPath)) {
  const scenarioSummary = JSON.parse(fs.readFileSync(scenarioSummaryPath, "utf8"));
  const scenarioCount = Object.keys(scenarioSummary.scenarios || {}).length;
  if (scenarioCount < 8) {
    errors.push(`Expected at least 8 sensitivity scenarios, found ${scenarioCount}`);
  }
}

if (fs.existsSync(reannotationPath)) {
  const reannotation = JSON.parse(fs.readFileSync(reannotationPath, "utf8"));
  const taskCount = (reannotation.tasks || []).length;
  if (taskCount < 100 || taskCount > 200) {
    errors.push(`Expected 100-200 reannotation tasks, found ${taskCount}`);
  }
}

const high = DATA.filter(d => d.exposure >= 8).length;
const medium = DATA.filter(d => d.exposure >= 5 && d.exposure <= 7).length;
const low = DATA.filter(d => d.exposure <= 4).length;
const jobs = DATA.reduce((sum, d) => sum + d.jobs, 0);
const weighted = DATA.reduce((sum, d) => sum + d.jobs * d.exposure, 0) / jobs;
const reviewCount = DATA.filter(d => d.mapping_confidence && d.mapping_confidence !== "hoch").length;

if (DATA.length !== 86) {
  warnings.push(`Expected 86 occupations, found ${DATA.length}`);
}

if (errors.length) {
  fail(errors, warnings);
}

for (const warning of warnings) {
  console.warn(`Warning: ${warning}`);
}

console.log(`OK: ${DATA.length} occupations`);
console.log(`Scores: ${high} very high, ${medium} medium, ${low} low`);
console.log(`Weighted exposure: ${weighted.toFixed(2)}/10 across ${jobs.toLocaleString("de-CH")} jobs`);
console.log(`Mapping notes: ${reviewCount}`);
if (fs.existsSync(todayScoresPath)) {
  const today = JSON.parse(fs.readFileSync(todayScoresPath, "utf8"));
  console.log(`Today 2026 technical weighted: ${today.summary.technical_base_2026.weighted_score}/10`);
  console.log(`Today 2026 adoption-adjusted weighted: ${today.summary.adoption_adjusted_base_2026.weighted_score}/10`);
}

function fail(messages, warnings = []) {
  for (const warning of warnings) {
    console.warn(`Warning: ${warning}`);
  }
  for (const message of messages) {
    console.error(`Error: ${message}`);
  }
  process.exit(1);
}
