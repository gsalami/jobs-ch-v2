# jobs-ch-v2

Static dashboard for Swiss occupations and LLM exposure scores based on Eloundou et al. (2024), mapped through SOC/ISCO crosswalk data and enriched with Swiss labour-market context.

## Local preview

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000>.

## Validation

```bash
node scripts/validate-dashboard.js
```

## Today 2026 framework

The updated AI-exposure view is a scenario-based heuristic extension of the Science 2024 base values, not a full task-level replication. It separates technical exposure from adoption-adjusted exposure and includes sensitivity, uncertainty, mapping, and mini-reannotation artifacts.

Documentation:

- `docs/ai-exposure-framework-2026.md`
- `docs/ai-exposure-framework-2026.html`
- `docs/ai-exposure-framework-2026.pdf`

Apply the v4 gap additions from `Lückenanalyse.rtf` first:

```bash
node scripts/apply-v4-gap-additions.js
```

Then refresh the BFS 2024 labour-market fields:

```bash
node scripts/refresh-bfs-2024.js
```

This pulls the BFS LSE 2024 PxWeb table by CH-ISCO-19 occupation group and documents the SAKE 2024 employment calibration. It intentionally does not invent a new dashboard-level SAKE microtable.

Finally regenerate the 2026 score files:

```bash
node scripts/generate-today-scores.js
```

Outputs:

- `data/bfs-2024-refresh.json`
- `data/bfs-2024-refresh.csv`
- `data/gap-additions-v4.json`
- `data/gap-additions-v4.csv`
- `data/today-scores-2026.json`
- `data/today-scores-2026.csv`
- `data/scenario-summary-2026.json`
- `data/scenario-summary-2026.csv`
- `data/reannotation-sample-2026.json`
- `data/reannotation-sample-2026.csv`
- `data/mapping-2026.csv`

## Brand assets

Logos are stored locally in `assets/brand/` and were sourced from the official sites:

- einstAIn: https://einstain.ch/
- Angestellte Schweiz: https://angestellte.ch/frontend/img/svg/logo-de.svg
- Kuble: https://www.kuble.com/en
