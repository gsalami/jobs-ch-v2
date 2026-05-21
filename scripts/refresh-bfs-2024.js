const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const htmlPath = path.join(ROOT, "index.html");
const dataDir = path.join(ROOT, "data");

const GENERATED_AT = "2026-05-21";
const LSE_API =
  "https://www.pxweb.bfs.admin.ch/api/v1/de/px-x-0304010000_205/px-x-0304010000_205.px";
const LSE_BROWSER_URL =
  "https://www.pxweb-admin-a.bfs.admin.ch/pxweb/de/px-x-0304010000_205/-/px-x-0304010000_205.px/";
const LSE_FIRST_RESULTS_URL =
  "https://dam-api.bfs.admin.ch/hub/api/dam/assets/36195847/master";
const SAKE_2023_URL =
  "https://dam-api.bfs.admin.ch/hub/api/dam/assets/32069034/master";
const SAKE_2024_URL =
  "https://dam-api.bfs.admin.ch/hub/api/dam/assets/36035149/master";

const SAKE_2023_EMPLOYED = 4848000;
const SAKE_2024_EMPLOYED = 4876000;
const JOBS_REFRESH_FACTOR = SAKE_2024_EMPLOYED / SAKE_2023_EMPLOYED;

const SPECIALIZED_PAY_SOURCE =
  /(FMH|Kanton|Kantone|ETH|Uni Zürich|LMV|GAV|Swiss|Edelweiss|L-GAV|SBV|Swissem|Kantonspolizeien|Berufsfeuerwehren|Branchendaten|SBB|Schätzung)/i;

function readDashboardData() {
  const html = fs.readFileSync(htmlPath, "utf8");
  const match = html.match(/const DATA = (\[[\s\S]*?\n\]);/);
  if (!match) throw new Error("Could not find const DATA array in index.html");
  return { html, data: Function("return " + match[1])() };
}

function twoDigitIsco(isco) {
  const code = String(isco || "").slice(0, 2);
  if (!/^\d{2}$/.test(code)) throw new Error(`Invalid ISCO code: ${isco}`);
  return code;
}

function annualPay(monthlyMedian) {
  return Math.round((monthlyMedian * 13) / 1000) * 1000;
}

function roundJobs(jobs) {
  return Math.round((jobs * JOBS_REFRESH_FACTOR) / 100) * 100;
}

function specializedLabel(source) {
  return String(source || "berufsnahe Quelle")
    .replace(/^BFS LSE 2022\s*\/\s*/i, "")
    .replace(/^Kantone \(BFS 2022\)$/i, "Kantone")
    .replace(/^Schätzung BFS\/IKT 2023$/i, "BFS/IKT-Schaetzung")
    .replace(/^Bazl\/SAKE 2023$/i, "BAZL/SAKE")
    .trim();
}

async function fetchLse2024(groupCodes) {
  const query = {
    query: [
      { code: "Jahr", selection: { filter: "item", values: ["2024"] } },
      { code: "Grossregion", selection: { filter: "item", values: ["-1"] } },
      { code: "Berufsgruppe", selection: { filter: "item", values: groupCodes } },
      { code: "Lebensalter", selection: { filter: "item", values: ["-1"] } },
      { code: "Geschlecht", selection: { filter: "item", values: ["-1"] } },
      { code: "Zentralwert und andere Perzentile", selection: { filter: "item", values: ["1"] } }
    ],
    response: { format: "JSON-stat2" }
  };

  const response = await fetch(LSE_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(query)
  });

  if (!response.ok) {
    throw new Error(`BFS PxWeb request failed: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  const category = json.dimension.Berufsgruppe.category;
  const medians = new Map();

  for (const code of groupCodes) {
    const index = category.index[code];
    const value = json.value[index];
    if (typeof value !== "number") {
      throw new Error(`Missing LSE 2024 median for CH-ISCO group ${code}`);
    }
    medians.set(code, {
      code,
      label: category.label[code].replace(/^>\s*/, ""),
      monthlyMedian: value,
      annualBenchmark: annualPay(value)
    });
  }

  return medians;
}

function refreshRow(item, lseMedian) {
  const previousPay = item.pay_previous || item.pay;
  const previousJobs = item.jobs_2023_base || item.jobs;
  const sourcePayPrevious = item.source_pay_previous || item.source_pay;
  const sourceJobsPrevious = item.source_jobs_previous || item.source_jobs;
  const hasSpecializedPaySource =
    item.pay_refresh_method === "specialized_source_retained_lse_2024_benchmark_added" ||
    SPECIALIZED_PAY_SOURCE.test(sourcePayPrevious || "");
  const refreshedPay = hasSpecializedPaySource ? previousPay : lseMedian.annualBenchmark;
  const payRefreshMethod = hasSpecializedPaySource
    ? "specialized_source_retained_lse_2024_benchmark_added"
    : "lse_2024_ch_isco_group_median";

  return {
    ...item,
    pay: refreshedPay,
    jobs: roundJobs(previousJobs),
    pay_previous: previousPay,
    jobs_2023_base: previousJobs,
    source_pay_previous: sourcePayPrevious,
    source_jobs_previous: sourceJobsPrevious,
    lse_2024_monthly_median: lseMedian.monthlyMedian,
    lse_2024_annual_benchmark: lseMedian.annualBenchmark,
    lse_2024_group_code: lseMedian.code,
    lse_2024_group_label: lseMedian.label,
    lse_2024_source_url: LSE_BROWSER_URL,
    pay_refresh_method: payRefreshMethod,
    pay_mapping_level: "CH-ISCO-19 Berufsgruppe, 2-Steller",
    pay_mapping_confidence: hasSpecializedPaySource ? "benchmark" : "mittel",
    jobs_refresh_method: "SAKE-2023-Berufsmix proportional mit SAKE-Gesamtwachstum 2023-2024 skaliert",
    jobs_refresh_factor: Number(JOBS_REFRESH_FACTOR.toFixed(6)),
    sake_2023_total_employed: SAKE_2023_EMPLOYED,
    sake_2024_total_employed: SAKE_2024_EMPLOYED,
    source_pay: hasSpecializedPaySource
      ? `Spezialquelle beibehalten (${specializedLabel(sourcePayPrevious)}); LSE 2024 CH-ISCO ${lseMedian.code} Benchmark`
      : `BFS LSE 2024 CH-ISCO ${lseMedian.code}`,
    source_jobs: "BFS SAKE 2024 total-skaliert (2023 Berufsmix)"
  };
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

async function main() {
  const { html, data } = readDashboardData();
  const groupCodes = [...new Set(data.map(item => twoDigitIsco(item.isco)))].sort();
  const medians = await fetchLse2024(groupCodes);
  const refreshed = data.map(item => refreshRow(item, medians.get(twoDigitIsco(item.isco))));

  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(htmlPath, replaceDataInHtml(html, refreshed));

  const auditRows = refreshed.map(item => ({
    slug: item.slug,
    occupation: item.title,
    isco: item.isco,
    lse_2024_group_code: item.lse_2024_group_code,
    lse_2024_group_label: item.lse_2024_group_label,
    lse_2024_monthly_median: item.lse_2024_monthly_median,
    lse_2024_annual_benchmark: item.lse_2024_annual_benchmark,
    pay_previous: item.pay_previous,
    source_pay_previous: item.source_pay_previous,
    pay_dashboard: item.pay,
    pay_refresh_method: item.pay_refresh_method,
    pay_mapping_level: item.pay_mapping_level,
    pay_mapping_confidence: item.pay_mapping_confidence,
    jobs_2023_base: item.jobs_2023_base,
    source_jobs_previous: item.source_jobs_previous,
    v4_gap_addition: Boolean(item.v4_gap_addition),
    v4_gap_source: item.v4_gap_source || "",
    mapping_note: item.mapping_note || "",
    jobs_dashboard_2024_calibrated: item.jobs,
    jobs_refresh_factor: item.jobs_refresh_factor,
    jobs_refresh_method: item.jobs_refresh_method,
    source_pay: item.source_pay,
    source_jobs: item.source_jobs
  }));

  const audit = {
    generated_at: GENERATED_AT,
    method: {
      pay:
        "BFS LSE 2024 median monthly gross pay by Switzerland, total age, total sex, central value, CH-ISCO-19 two-digit occupation group. Dashboard pay is replaced where the previous source was a generic LSE value; specialized, contract, canton or employer estimates are retained and the LSE 2024 group value is stored as benchmark.",
      jobs:
        "No official BFS table was found that directly maps SAKE 2024 employment to the dashboard occupation labels. Existing SAKE-2023 occupation estimates and v4 gap-addition starting values are therefore proportionally calibrated with total SAKE employed persons 2023 to 2024.",
      jobs_refresh_factor: Number(JOBS_REFRESH_FACTOR.toFixed(6)),
      sake_2023_total_employed: SAKE_2023_EMPLOYED,
      sake_2024_total_employed: SAKE_2024_EMPLOYED
    },
    sources: {
      lse_2024_pxweb_api: LSE_API,
      lse_2024_pxweb_table: LSE_BROWSER_URL,
      lse_2024_first_results: LSE_FIRST_RESULTS_URL,
      sake_2023: SAKE_2023_URL,
      sake_2024: SAKE_2024_URL
    },
    occupations: auditRows
  };

  fs.writeFileSync(path.join(dataDir, "bfs-2024-refresh.json"), JSON.stringify(audit, null, 2) + "\n");
  writeCsv(path.join(dataDir, "bfs-2024-refresh.csv"), auditRows);

  console.log(`Refreshed ${refreshed.length} occupations`);
  console.log(`LSE 2024 CH-ISCO groups: ${groupCodes.join(", ")}`);
  console.log(`SAKE jobs factor: ${JOBS_REFRESH_FACTOR.toFixed(6)}`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
