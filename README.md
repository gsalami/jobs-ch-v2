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

## Brand assets

Logos are stored locally in `assets/brand/` and were sourced from the official sites:

- einstAIn: https://einstain.ch/
- Angestellte Schweiz: https://angestellte.ch/frontend/img/svg/logo-de.svg
- Kuble: https://www.kuble.com/en
