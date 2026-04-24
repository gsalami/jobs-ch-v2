# GPTs are GPTs, aktualisiert auf 2026

**Ein konservatives Framework zur Schätzung heutiger KI-Exposition in Schweizer Berufen**  
Version 0.1, Stand 24. April 2026

## Abstract

Dieses Methodenpapier erweitert das Expositionsmass von Eloundou et al. (2024) für das Dashboard "KI-Exposition nach Beruf - Schweiz". Die Originalwerte bleiben die wissenschaftliche Basis: Sie messen, wie stark Aufgaben eines Berufs durch Sprachmodelle und LLM-gestützte Anwendungen zeitlich beschleunigt werden können. Seit der Publikation haben sich vier für Arbeit relevante KI-Fähigkeiten deutlich verschoben: sehr lange Kontextfenster, multimodale Ein- und Ausgaben, agentische Tool- und Computer-Nutzung sowie reale Prozessadoption in Unternehmen. Das hier definierte 2026-Framework addiert deshalb kleine, dokumentierte Modifikatoren auf den ursprünglichen Beta-Wert, begrenzt die Werte aber durch berufsfeldspezifische Caps. Das Resultat ist kein Jobverlust- oder Automatisierungsforecast, sondern eine zweite Sicht auf heutige Exposition.

## 1. Ausgangspunkt

Eloundou et al. (2024) bewerten einzelne Arbeitsaufgaben danach, ob GPT-Systeme die Bearbeitungszeit substanziell reduzieren könnten. Die Supplementary Materials definieren insbesondere direkte Exposition durch ein LLM und zusätzliche Exposition durch LLM-gestützte Tools; für die aggregierte Kennzahl wird die Tool-Komponente schwächer gewichtet. Das Dashboard verwendet den daraus abgeleiteten Beta-Wert auf Berufsebene und transformiert ihn mit `round(beta x 10)` auf eine 0-10-Skala.

Für die Schweizer Visualisierung wurde dieser Berufswert über SOC/ISCO-Mapping auf 72 Schweizer Berufsprofile übertragen und mit BFS-Lohn- und Beschäftigungsdaten angereichert. Diese Basis bleibt unverändert, damit die Originalansicht weiterhin reproduzierbar ist.

## 2. Warum eine zweite Sicht nötig ist

Die ursprüngliche Messung wurde mit der damaligen GPT-4-Perspektive vorgenommen. Für April 2026 ist die relevante Arbeitsrealität breiter:

1. **Long Context und Dokumentenarbeit.** GPT-4.1 brachte 2025 ein Kontextfenster bis 1 Million Tokens in die API; Google hatte Gemini 1.5 Pro mit 1 Million Tokens bereits 2024 breit kommuniziert. GPT-5.4 und GPT-5.5 verschieben die praktische Nützlichkeit für lange Dokumente, Codebasen, Research und komplexe Deliverables weiter.
2. **Agenten und Computer Use.** Anthropic dokumentiert Computer Use als Tooling für Screenshot-, Maus- und Tastaturinteraktion. OpenAI beschreibt GPT-5.4 als Modell mit nativen Computer-Use-Fähigkeiten und GPT-5.5 als System, das über Tools hinweg komplexe Aufgaben fortführen kann.
3. **Multimodalität.** GPT-4o hat Text, Audio, Bild und Video in ein einheitlicheres Echtzeitmodell gebracht. Für Medien-, Design-, Bildungs-, Medizin- und Ingenieurarbeit ist deshalb nicht nur Text, sondern auch Bild-, Audio-, Video- und Dokumentverständnis relevant.
4. **Adoption in der Schweiz.** Der Microsoft Work Trend Index 2025 meldet für Schweizer Organisationen eine hohe Agenten- und Prozessadoption. Das erhöht nicht die technische Fähigkeit eines Modells, aber die Wahrscheinlichkeit, dass exponierte Aufgaben tatsächlich mit KI-Systemen bearbeitet werden.

## 3. Definition des 2026-Scores

Für jeden Beruf `i` im Berufsfeld `c` gilt:

```text
beta_2026_i = min(cap_c / 10,
                  beta_2024_i
                  + long_context_c
                  + agentic_tools_c
                  + multimodal_c
                  + adoption_c
                  + role_override_i)

score_2026_i = round(beta_2026_i x 10)
delta_i      = score_2026_i - score_2024_i
```

`beta_2024_i` und `score_2024_i` stammen aus der bestehenden Eloundou-basierten Dashboard-Datenbasis. Die vier Kategorie-Modifikatoren sind bewusst klein gehalten. Sie sind keine neue Task-Annotation aller O*NET-Aufgaben, sondern eine konservative, nachvollziehbare Aktualisierung für heutige KI-Fähigkeiten. `cap_c` verhindert, dass physische Präsenz, Regulierung, Verantwortung oder Beziehungsarbeit durch reine Modellfortschritte überzeichnet werden.

## 4. Kategorie-Modifikatoren

| Berufsfeld | Long Context | Agenten/Tools | Multimodalität | Adoption | Cap | Begründung |
|---|---:|---:|---:|---:|---:|---|
| Finanzen & Recht | 0.10 | 0.07 | 0.02 | 0.05 | 9 | Lange Verträge, Dossiers, Research, Korrespondenz und Reports profitieren stark; Verantwortung und Mandatsbeziehung bleiben begrenzend. |
| IT & Technologie | 0.09 | 0.14 | 0.03 | 0.05 | 10 | Coding-Agenten, Tool-Use, Debugging, grosse Repositories und IT-Workflows sind direkt betroffen. |
| Gesundheit & Pflege | 0.07 | 0.03 | 0.04 | 0.02 | 6 | Dokumentation, Fachliteratur und Bild-/Befundkontext steigen; klinische Verantwortung und physische Pflege begrenzen. |
| Bildung & Forschung | 0.07 | 0.03 | 0.04 | 0.03 | 7 | Unterrichtsvorbereitung, Feedback, Lernmaterial und Research profitieren; Beziehung und Aufsicht bleiben zentral. |
| Handwerk & Bau | 0.03 | 0.02 | 0.01 | 0.01 | 4 | Planung, Offerten und Dokumentation steigen leicht; Vor-Ort-Arbeit dominiert. |
| Verwaltung & Administration | 0.11 | 0.14 | 0.02 | 0.07 | 9 | Standardisierte Dokumente, Formulare, E-Mail, Termine und Workflows sind stark agentenfähig. |
| Verkauf & Handel | 0.07 | 0.09 | 0.03 | 0.05 | 8 | Kundenkommunikation, Angebote, CRM, Sortiments- und Backoffice-Arbeit profitieren; persönliche Beziehung bleibt relevant. |
| Transport & Logistik | 0.04 | 0.04 | 0.02 | 0.02 | 5 | Disposition, Dokumentation und Planung steigen; Fahren, Bewegung und Sicherheitskontext bleiben ausserhalb reiner LLM-Exposition. |
| Gastronomie & Tourismus | 0.05 | 0.05 | 0.04 | 0.04 | 7 | Buchung, Planung, Menüs, Kommunikation und Content steigen; Service und Küche bleiben physisch. |
| Landwirtschaft & Natur | 0.03 | 0.02 | 0.02 | 0.01 | 4 | Beratung, Planung, Wetter-/Marktdaten und Marketing steigen leicht; Feldarbeit bleibt physisch. |
| Kunst, Design & Medien | 0.09 | 0.06 | 0.16 | 0.05 | 9 | Bild-, Audio-, Video- und Textmodelle verschieben die Arbeitsmittel stark. |
| Ingenieurwesen | 0.09 | 0.06 | 0.06 | 0.04 | 8 | Normen, technische Dokumente, CAD-nahe Analysen, Code und visuelle Prüfung profitieren. |
| Soziales & Beratung | 0.05 | 0.03 | 0.01 | 0.02 | 5 | Falldokumentation und Research steigen; Beziehung, Schutzauftrag und Urteil begrenzen. |
| Sicherheit & Schutz | 0.04 | 0.03 | 0.02 | 0.01 | 5 | Berichte, Recherche und Lagebilder profitieren; Einsatzsituationen und Verantwortung bleiben menschlich. |

## 5. Berufs-Overrides

Einige Berufe werden durch heutige KI-Systeme stärker verschoben als ihr Berufsfeld allein nahelegt. Die Overrides sind zusätzliche Beta-Punkte, nicht zusätzliche Score-Punkte.

| Beruf | Override | Begründung |
|---|---:|---|
| Softwareentwickler/-in | 0.04 | Coding-Agenten und Repository-Kontext |
| Data Scientist | 0.06 | Datenanalyse, Code, Notebook- und Modellierungsagenten |
| Systemadministrator/-in | 0.04 | Tool-Use für IT-Betrieb und Runbooks |
| Cybersecurity-Spezialist/-in | 0.07 | Codeanalyse, Triage, Reports und Security-Agenten |
| KI-Ingenieur/-in | 0.08 | KI-native Workflows |
| Jurist/-in | 0.06 | Long-Context Legal Review |
| Steuerberater/-in | 0.04 | Steuer-Research und Mandatsdokumente |
| Buchhalter/-in | 0.05 | Beleg-, Report- und Abstimmungsworkflows |
| Sachbearbeiter/-in Verwaltung | 0.06 | Formular- und Prozessagenten |
| Sekretär/-in | 0.05 | E-Mail-, Kalender- und Dokumentenagenten |
| Grafiker/-in | 0.09 | Bildgenerierung und visuelle Iteration |
| Fotograf/-in | 0.09 | Bild-KI, Retusche und Generierung |
| Cutter/-in | 0.08 | Video-, Untertitel- und Schnittassistenz |
| Journalist/-in | 0.04 | Recherche- und Redaktionsassistenz |
| Reisebüro | 0.06 | Reiseplanungs-Agenten |
| Arzt/Ärztin | 0.02 | medizinische Dokumentation |
| Apotheker/-in | 0.02 | Interaktions- und Beratungsassistenz |
| UX Designer/-in | 0.04 | Prototyping, Research-Synthese und UI-Text |
| HR-Fachmann/-frau | 0.03 | Recruiting-, Policy- und Interview-Workflows |
| Einkäufer/-in | 0.03 | Lieferantenrecherche und Angebotsvergleich |
| Hotelfachmann/-frau | 0.03 | Buchung, Gästekommunikation und Content |
| Hochschuldozent/-in | 0.03 | Research, Materialerstellung und Feedback |
| Maschinenbauingenieur/-in | 0.02 | technische Dokumentation und CAD-nahe Analyse |
| Elektroingenieur/-in | 0.02 | technische Dokumentation, Code und Schaltplanprüfung |

## 6. Interpretation

Die neue Ansicht ist eine **heutige Expositionsperspektive**, keine Vorhersage über Entlassungen. Ein höherer Wert bedeutet: Mehr Aufgaben in diesem Beruf lassen sich durch moderne KI-Systeme beschleunigen, vorbereiten, prüfen, dokumentieren oder teilweise ausführen. Ob daraus Produktivität, Reorganisation, höhere Anforderungen oder Substitution entsteht, hängt von Organisation, Regulierung, Datenzugang, Qualitätssicherung und sozialer Akzeptanz ab.

Die wichtigste Leseregel lautet: Der 2026-Score ist relativ zum Original-Score zu lesen. Ein Delta von `+3` bedeutet nicht, dass der Beruf um drei Stufen "gefährlicher" wurde. Es bedeutet, dass heutige KI-Systeme im Vergleich zur GPT-4-basierten Originalmessung mehr relevante Aufgabenoberfläche erreichen.

## 7. Reproduzierbarkeit

Die Zahlen werden mit `scripts/generate-today-scores.js` erzeugt. Das Skript liest die bestehenden Dashboard-Berufe aus `index.html`, wendet die hier definierte Formel an und schreibt:

- `data/today-scores-2026.json`
- `data/today-scores-2026.csv`

Die Originaldaten werden nicht überschrieben. Damit bleiben die Science-2024-Ansicht und die Heute-2026-Ansicht getrennt prüfbar.

## 8. Aggregierte Resultate

Mit den 72 Berufen im Dashboard ergibt die 2026-Rechnung:

| Kennzahl | Science 2024 | Heute 2026 |
|---|---:|---:|
| Sehr hohe Exposition (Score 8-10) | 1 Beruf | 24 Berufe |
| Mittlere Exposition (Score 5-7) | 33 Berufe | 20 Berufe |
| Niedrige Exposition (Score 0-4) | 38 Berufe | 28 Berufe |
| Beschäftigungsgewichteter Score | 3.92/10 | 5.84/10 |

Die stärksten Deltas entstehen in Berufen, deren Aufgabenoberfläche durch multimodale KI, agentische Workflows oder grosse Kontextfenster besonders stark gewachsen ist: HR-Fachleute, UX Design, Grafik, Video/Film-Schnitt, Fotografie, Data Science, Systemadministration, Cybersecurity und KI-Engineering. Die niedrigsten Werte bleiben bei Tätigkeiten, deren Kern physische Präsenz, Fürsorge, Sicherheit oder Vor-Ort-Ausführung verlangt.

## 9. Quellen

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
