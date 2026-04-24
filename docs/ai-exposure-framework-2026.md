# Konservative 2026-Heuristik auf Basis der Eloundou et al. 2024 Werte

**Heute-2026-Sicht als heuristische Erweiterung der Science-2024-Basis**  
Version 0.2, Stand 24. April 2026

## Abstract

Dieses Dokument beschreibt keine neue wissenschaftliche Messung und keine Replikation von Eloundou et al. (2024). Es ist eine transparente, konservative Dashboard-Heuristik für die Frage: Wie plausibel verändert sich die KI-erreichbare Aufgabenoberfläche Schweizer Berufe, wenn man heutige Modellfähigkeiten auf die unveränderten Science-2024-Basiswerte legt?

Die Originalwerte bleiben die wissenschaftliche Basis. Die 2026-Sicht trennt drei Ebenen:

1. **Science 2024:** Originaler Eloundou-basierter Beta-Score.
2. **Technische Exposition 2026:** Heuristische Erweiterung für Long Context, Agenten/Tool-Use, Multimodalität und klar begründete Berufs-Overrides.
3. **Adoptionsgewichtete Exposition 2026:** Separater Zusatz für organisatorische Diffusion in der Schweiz.

Ein hoher Score bedeutet nicht Jobverlust. Er bedeutet, dass ein grösserer Teil der Aufgaben durch moderne KI-Systeme unterstützt, beschleunigt, vorbereitet, geprüft, dokumentiert oder teilweise ausgeführt werden kann.

## 1. Abgrenzung zur Originalstudie

Eloundou et al. bewerten Aufgaben auf Task-Ebene anhand einer Expositionsrubrik mit E0, E1, E2 und E3. Das Dashboard nutzt die daraus abgeleiteten Berufswerte und bildet `score_2024 = round(beta_2024 x 10)`.

Die 2026-Version macht **keine vollständige neue O*NET-Task-Annotation**. Sie ist deshalb:

- keine neue wissenschaftliche Punktschätzung,
- kein Automatisierungs- oder Jobverlustforecast,
- keine Aussage zur tatsächlichen Nutzung in einem konkreten Unternehmen,
- sondern ein nachvollziehbares Szenario für heutige technische Exposition.

## 2. Regel gegen Doppelzählung

Ein Teil heutiger Fähigkeiten war im Originalframework bereits angelegt, insbesondere LLM-gestützte Software, Recherche, Organisationswissen und visuelle Fähigkeiten als Tool- oder E3-nahe Exposition. Deshalb werden Modifikatoren nicht pauschal als neue Fähigkeiten addiert.

**Regel:** Ein Modifikator wird nur dort angesetzt, wo plausibel ist, dass 2026 eine frühere E0-Aufgabe zu E2 geworden ist oder eine frühere E2-Aufgabe faktisch näher an E1 gerückt ist.

Beispiele:

- Ein langer Vertragsvergleich war früher eher E2, weil Tooling und Kontextfenster begrenzten; heute kann er näher an E1 liegen.
- Ein physischer Patientenkontakt bleibt E0, auch wenn Dokumentation und Befundvorbereitung stärker exponiert sind.
- Bildgenerierung erhöht Medien- und Designexposition, aber nicht automatisch die Exposition handwerklicher Vor-Ort-Arbeit.

## 3. Formeln

Die Hauptansicht des Dashboards zeigt technische Exposition ohne Adoption:

```text
technical_beta_2026_i =
  min(cap_c / 10,
      beta_2024_i
      + long_context_c
      + agentic_tools_c
      + multimodal_c
      + role_override_i)

technical_score_2026_i = round(technical_beta_2026_i x 10)
```

Adoption wird separat ausgewiesen:

```text
adoption_adjusted_beta_2026_i =
  min(cap_c / 10,
      technical_beta_2026_i + adoption_c)

adoption_adjusted_score_2026_i =
  round(adoption_adjusted_beta_2026_i x 10)
```

Damit bleiben technische Leistungsfähigkeit und reale Nutzung/Diffusion getrennt.

## 4. Mini-Reannotation

Zur Plausibilisierung wurde eine kleine systematische Reannotation erstellt. Sie ersetzt keine Vollreplikation, kalibriert aber die Richtung der Modifikatoren.

- 14 Berufsfelder
- 8 repräsentative Aufgaben je Berufsfeld
- 112 Aufgaben insgesamt
- Labels: E0, E1, E2
- explizite Transitionen: E0 bleibt E0, E0 wird E2, E2 wird E1, E1 bleibt E1, E2 bleibt E2

Gesamtergebnis der Stichprobe:

| Transition | Anzahl |
|---|---:|
| E2 -> E1 | 34 |
| E1 -> E1 | 28 |
| E0 -> E0 | 32 |
| E2 -> E2 | 13 |
| E0 -> E2 | 5 |

Interpretation: Der wichtigste 2026-Effekt ist nicht, dass alle nicht exponierten Aufgaben plötzlich exponiert werden. Der häufigste Effekt ist, dass frühere toolabhängige E2-Aufgaben durch Long Context, Agenten, Computer Use und multimodale Systeme näher an direkte Nutzbarkeit rücken.

Die vollständige Stichprobe liegt in:

- `data/reannotation-sample-2026.csv`
- `data/reannotation-sample-2026.json`

## 5. Modifikatoren

Die Modifikatoren sind Beta-Punkte. Sie werden durch die Mini-Reannotation, die ursprüngliche E-Logik und die heutigen Primärquellen plausibilisiert.

| Berufsfeld | Long Context | Agenten/Tools | Multimodalität | Adoption separat | Cap |
|---|---:|---:|---:|---:|---:|
| Finanzen & Recht | 0.10 | 0.07 | 0.02 | 0.05 | 9 |
| IT & Technologie | 0.09 | 0.14 | 0.03 | 0.05 | 10 |
| Gesundheit & Pflege | 0.07 | 0.03 | 0.04 | 0.02 | 6 |
| Bildung & Forschung | 0.07 | 0.03 | 0.04 | 0.03 | 7 |
| Handwerk & Bau | 0.03 | 0.02 | 0.01 | 0.01 | 4 |
| Verwaltung & Administration | 0.11 | 0.14 | 0.02 | 0.07 | 9 |
| Verkauf & Handel | 0.07 | 0.09 | 0.03 | 0.05 | 8 |
| Transport & Logistik | 0.04 | 0.04 | 0.02 | 0.02 | 5 |
| Gastronomie & Tourismus | 0.05 | 0.05 | 0.04 | 0.04 | 7 |
| Landwirtschaft & Natur | 0.03 | 0.02 | 0.02 | 0.01 | 4 |
| Kunst, Design & Medien | 0.09 | 0.06 | 0.16 | 0.05 | 9 |
| Ingenieurwesen | 0.09 | 0.06 | 0.06 | 0.04 | 8 |
| Soziales & Beratung | 0.05 | 0.03 | 0.01 | 0.02 | 5 |
| Sicherheit & Schutz | 0.04 | 0.03 | 0.02 | 0.01 | 5 |

Berufs-Overrides werden nur dort genutzt, wo der Beruf innerhalb des Berufsfeldes besonders klar von heutigen KI-Fähigkeiten betroffen ist, zum Beispiel Coding-Agenten bei Softwareentwicklung, Bild-KI bei Grafik/Fotografie oder Formularagenten in der Verwaltung.

## 6. Caps

Caps verhindern, dass technische Fortschritte Aufgabenanteile überzeichnen, die wegen physischer Präsenz, Haftung, Regulierung, sozialer Beziehung oder fehlendem Datenzugang nicht direkt KI-erreichbar sind.

| Berufsfeld | Cap | Cap-Typ | Warum nicht höher? |
|---|---:|---|---|
| IT & Technologie | 10 | technisch | Stark digitaler Aufgabenraum; kaum physische Grenze innerhalb des LLM-Scopes. |
| Finanzen & Recht | 9 | regulatorisch/sozial | Mandatsverantwortung, Haftung, vertrauliche Daten und finale Beurteilung bleiben begrenzend. |
| Verwaltung & Administration | 9 | organisatorisch/regulatorisch | Dokumente und Prozesse sind erreichbar, aber Amtsverantwortung und Datenschutz begrenzen. |
| Kunst, Design & Medien | 9 | sozial/marktlich | Rechte, Stil, Marke, Auftrag und Auswahl bleiben begrenzend. |
| Ingenieurwesen | 8 | regulatorisch/technisch | Normen, Haftung, physische Systeme und Validierung begrenzen. |
| Verkauf & Handel | 8 | sozial/organisatorisch | Kundenbeziehung und Verhandlung bleiben relevant. |
| Bildung & Forschung | 7 | sozial/regulatorisch | Lernbeziehung, Aufsicht und Prüfungskontext begrenzen. |
| Gastronomie & Tourismus | 7 | physisch/sozial | Service, Küche und Gästebeziehung bleiben physisch. |
| Gesundheit & Pflege | 6 | regulatorisch/sozial/physisch | Klinische Verantwortung, Patientenkontakt, körperliche Pflege, Regulierung und Datenzugang begrenzen. |
| Transport & Logistik | 5 | physisch/sicherheit | Mobilität, Maschinenbedienung und Sicherheit bleiben ausserhalb reiner LLM-Exposition. |
| Soziales & Beratung | 5 | sozial/regulatorisch | Beziehungsarbeit, Schutzauftrag, Datenschutz und Verantwortung begrenzen. |
| Sicherheit & Schutz | 5 | sicherheit/physisch | Einsatzsituationen, Deeskalation und Verantwortung bleiben menschlich. |
| Handwerk & Bau | 4 | physisch | Vor-Ort-Ausführung, Materialarbeit und Sicherheitsnormen dominieren. |
| Landwirtschaft & Natur | 4 | physisch | Feldarbeit, Tiere, Wetter und Maschinen begrenzen reine LLM-Exposition. |

Caps könnten in Zukunft steigen, wenn Robotik, sichere Fachsystemintegration, auditierbare Agenten, regulierte klinische Copilots oder CAD/CAE-Integrationen deutlich breiter verfügbar und validiert werden.

## 7. Unsicherheit und Mapping

Jeder Beruf erhält eine Confidence-Kategorie:

- **High:** klar digitales Text-, Code-, Dokumenten- oder Prozessprofil.
- **Medium:** gemischte Aufgaben, starke Organisationsvariation oder regulatorische Grenzen.
- **Low:** hohe physische Präsenz, Beziehungsarbeit, Sicherheitsverantwortung, Regulierung oder grobe Berufszuordnung.

Zusätzlich enthält jeder Beruf ein Feld `uncertainty_reason`, zum Beispiel:

- hoher physischer Anteil,
- hohe regulatorische Verantwortung,
- unklare Schweizer Berufszuordnung,
- starke Variation zwischen Organisationen,
- KI-Nutzung abhängig von Datenzugang.

Die SOC/ISCO/Schweizer Berufsprofil-Zuordnung ist in `data/mapping-2026.csv` dokumentiert. Dort stehen Schweizer Berufsbezeichnung, ISCO-Code, Mapping-Confidence, Mapping-Hinweis sowie die verwendeten Lohn- und Beschäftigungsquellen. Die bestehenden BFS-Angaben bleiben Näherungen auf Basis von BFS LSE 2022 und BFS SAKE 2023.

## 8. Sensitivitätsanalyse

Die Ergebnisse sind Szenarien, keine Punktprognosen.

| Szenario | Score 8-10 | Score 5-7 | Score 0-4 | Gewichteter Score |
|---|---:|---:|---:|---:|
| Science 2024 | 1 | 33 | 38 | 3.92 |
| Heute 2026 technisch | 21 | 23 | 28 | 5.60 |
| Heute 2026 adoptionsgewichtet | 24 | 20 | 28 | 5.84 |
| Ohne Berufs-Overrides | 20 | 24 | 28 | 5.56 |
| Halbierte Modifikatoren | 8 | 34 | 30 | 4.86 |
| Aggressivere Modifikatoren | 27 | 19 | 26 | 5.94 |
| Ohne Caps | 21 | 23 | 28 | 5.66 |
| Strengere Caps | 19 | 25 | 28 | 5.40 |

Im Basisszenario der 2026-Heuristik steigt die Zahl der Berufe mit Score 8 bis 10 von 1 auf 21. Adoptionsgewichtet steigt sie auf 24. Diese Werte sind sensitiv gegenüber Modifikatoren, Caps und Adoptionannahmen und sollten als Szenario gelesen werden.

Top-Deltas im technischen Basisszenario:

| Beruf | 2024 | Technisch 2026 | Delta |
|---|---:|---:|---:|
| Grafiker/-in | 5 | 9 | +4 |
| Fotograf/-in | 4 | 8 | +4 |
| Cybersecurity-Spezialist/-in | 7 | 10 | +3 |
| Data Scientist | 7 | 10 | +3 |
| KI-Ingenieur/-in | 7 | 10 | +3 |
| Systemadministrator/-in | 7 | 10 | +3 |
| Journalist/-in | 6 | 9 | +3 |
| PR-Fachmann/-frau | 6 | 9 | +3 |
| Sachbearbeiter/-in Verwaltung | 6 | 9 | +3 |
| Sekretär/-in | 6 | 9 | +3 |

Berufe mit besonders grosser Szenario-Spannweite sind unter anderem Fotografie, Video/Film-Schnitt, HR-Fachleute und Zollbeamtinnen/Zollbeamte. Diese Spannweite wird in `scenario_score_range` je Beruf dokumentiert.

Die vollständige Sensitivitätsanalyse liegt in:

- `data/scenario-summary-2026.json`
- `data/scenario-summary-2026.csv`

## 9. Ergebnisdateien

Die Zahlen werden mit `scripts/generate-today-scores.js` erzeugt.

Ausgaben:

- `data/today-scores-2026.json`
- `data/today-scores-2026.csv`
- `data/scenario-summary-2026.json`
- `data/scenario-summary-2026.csv`
- `data/reannotation-sample-2026.json`
- `data/reannotation-sample-2026.csv`
- `data/mapping-2026.csv`

Beispielstruktur pro Beruf:

```json
{
  "occupation": "Jurist/-in",
  "score_2024": 4,
  "beta_2024": 0.425,
  "technical_beta_2026": 0.675,
  "technical_score_2026": 7,
  "adoption_adjusted_beta_2026": 0.725,
  "adoption_adjusted_score_2026": 7,
  "delta_technical": 3,
  "delta_adoption_adjusted": 3,
  "cap": 9,
  "modifiers": {
    "long_context": 0.1,
    "agentic_tools": 0.07,
    "multimodal": 0.02,
    "adoption": 0.05,
    "role_override": 0.06
  },
  "confidence": "medium",
  "uncertainty_reason": [
    "Hohe regulatorische Verantwortung",
    "Datenzugang und Auditierbarkeit entscheidend",
    "Unklare Schweizer Berufszuordnung",
    "Berufsspezifischer Override sensitiv"
  ],
  "scenario": "base_2026"
}
```

## 10. Quellen

Es wurden nur Primärquellen oder projektinterne Datenartefakte als methodische Grundlage verwendet. Modellveröffentlichungen werden als Fähigkeits- und Verfügbarkeitsindikatoren gelesen, nicht als direkte Messung der Schweizer Arbeitsmarktwirkung.

- Eloundou, T., Manning, S., Mishkin, P., & Rock, D. (2024). *GPTs are GPTs: Labor market impact potential of LLMs*. Science 384, 1306-1308. https://www.science.org/doi/10.1126/science.adj0998
- OpenAI. *GPTs are GPTs: An early look at the labor market impact potential of large language models*. https://openai.com/index/gpts-are-gpts/
- OpenAI. *Introducing GPT-5.5* (23. April 2026). https://openai.com/index/introducing-gpt-5-5/
- OpenAI. *Introducing GPT-5.4* (5. März 2026). https://openai.com/index/introducing-gpt-5-4/
- OpenAI. *Introducing GPT-4.1 in the API* (14. April 2025). https://openai.com/index/gpt-4-1/
- OpenAI. *Hello GPT-4o* (13. Mai 2024). https://openai.com/index/hello-gpt-4o/
- Anthropic. *Computer use tool*. https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool
- Google. *Get more done with Gemini: Try 1.5 Pro and more intelligent features* (14. Mai 2024). https://blog.google/products-and-platforms/products/gemini/google-gemini-update-may-2024/
- Microsoft Switzerland. *2025 Work Trend Index: Swiss Organizations Lead in AI Adoption* (23. April 2025). https://news.microsoft.com/source/emea/2025/04/2025-work-trend-index-swiss-organizations-lead-in-ai-adoption-52-automate-entire-business-processes-surpassing-global-and-european-averages/
- Bundesamt für Statistik. Arbeit und Erwerb. https://www.bfs.admin.ch/bfs/de/home/statistiken/arbeit-erwerb.html
