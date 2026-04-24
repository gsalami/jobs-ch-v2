const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const htmlPath = path.join(ROOT, "index.html");
const mappingPath = path.join(ROOT, "Files for CC", "eloundou_mapping_results.json");

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

  for (const slug of dataOnly) {
    errors.push(`Slug exists in DATA but not mapping JSON: ${slug}`);
  }
  for (const slug of mappingOnly) {
    errors.push(`Slug exists in mapping JSON but not DATA: ${slug}`);
  }
}

const high = DATA.filter(d => d.exposure >= 8).length;
const medium = DATA.filter(d => d.exposure >= 5 && d.exposure <= 7).length;
const low = DATA.filter(d => d.exposure <= 4).length;
const jobs = DATA.reduce((sum, d) => sum + d.jobs, 0);
const weighted = DATA.reduce((sum, d) => sum + d.jobs * d.exposure, 0) / jobs;
const reviewCount = DATA.filter(d => d.mapping_confidence && d.mapping_confidence !== "hoch").length;

if (DATA.length !== 72) {
  warnings.push(`Expected 72 occupations, found ${DATA.length}`);
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

function fail(messages, warnings = []) {
  for (const warning of warnings) {
    console.warn(`Warning: ${warning}`);
  }
  for (const message of messages) {
    console.error(`Error: ${message}`);
  }
  process.exit(1);
}
