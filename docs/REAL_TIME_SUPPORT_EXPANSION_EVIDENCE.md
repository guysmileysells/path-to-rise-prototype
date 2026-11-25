# Real-Time Support expansion: evidence and limitations

**Status: five new educational drafts; clinical/SME review required before public release.** Technique-level research is not validation of the assembled app flows or evidence of fitness for duty. No efficacy, withdrawal-safety or first-responder outcome guarantee is made.

## Scope and contract

Read `docs/REAL_TIME_SUPPORT_EXPANSION.md` and the original `src/realTimeSupportContent.ts`. Added only `src/additionalSupportContent.ts` and this evidence document. Original five records were not edited. The new module exports `additionalSupportTools: SupportTool[]` with a type-only import from `./realTimeSupportContent`; extending the parent's ID type and integrating controls remain the parent's responsibility. No optional new fields are required.

| New ID | Exact display name | How count | Duration |
|---|---|---:|---|
| physical-tension-reset | Physical Tension Reset | 3: prepare / timed sequence / finish | 2 or 5 minutes |
| control-confidence-reset | Control and Confidence Reset | 5 | 1–3 minutes |
| re-engagement-reset | Re-Engagement Reset | 4 | 2–5 minutes to initiate |
| urge-craving-reset | Urge and Craving Reset | 6 | 3–5 minutes, only when safe |
| self-compassion-accountability-reset | Self-Compassion and Accountability Reset | 6 | 2–4 minutes |

All retain what / when / how / why / benefits / duration / adaptations / references in original field order, with three When and three Benefits examples each. How strings are unnumbered because the original renderer supplies numbering. New text is authored educational adaptation, not preserved original curriculum or a validated protocol. No free-text narrative, confession or trauma recount is requested. Optional ratings are not diagnostic. The content does not implement collection, persistence, timers or audio.

## Actual source retrieval

Fetched with Python `requests`, per-request timeout **15 seconds**, on **2026-11-25 UTC**. HTTP statuses below are observed responses, not assumed publisher availability. Europe PMC is used as the original bibliographic/abstract database; Crossref is the DOI-registration metadata fallback. An API metadata HTTP 200 does not mean the linked publisher/full-text page was fetched or app effectiveness established. Titles below follow returned metadata apart from terminal punctuation/capitalization. No invented citations are included.

### PMR-2024 — physical-tension-reset

- Verified API: <https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=10.2147%2FPRBM.S437277&format=json&resultType=core&pageSize=1> — **HTTP 200**, one result; metadata and abstract read.
- Title: **Efficacy of Progressive Muscle Relaxation in Adults for Stress, Anxiety, and Depression: A Systematic Review.**
- Muhammad Khir et al., 2024; **DOI 10.2147/PRBM.S437277**, **PMID 38322293**, **PMCID PMC10844009**.
- Crossref title search also returned **HTTP 200**, matching title/DOI and 2024 publication year: <https://api.crossref.org/works?query.title=Efficacy%20of%20Progressive%20Muscle%20Relaxation%20in%20Adults%20for%20Stress%20Anxiety%20and%20Depression%20A%20Systematic%20Review&rows=1>.
- Abstract reports 46 publications from 16 countries covering more than 3,402 adults. It supports PMR as a potentially helpful technique; mixed standalone/combined interventions do not establish which elements or duration produced benefit. No full-text risk-of-bias appraisal was performed here.
- **Not established:** this app, first-responder or military/veteran subgroup efficacy, the selected muscles, 5-second tension / 10-second release, or either short total duration. The exact prototype arithmetic/clock is defined by the owner contract and parent implementation, not this paper.
- Clinical review must assess injuries, pain, cramps, restrictions, gentle tension, no breath holding, no jaw clenching and natural-rest replacements for skipped areas.

### PLAN-2006 — control-confidence-reset

- Europe PMC exact DOI query: <https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI%3A%2210.1016%2FS0065-2601%2806%2938002-1%22&format=json&resultType=core&pageSize=4> — **HTTP 200, zero hits**. This is not PubMed-index verification.
- DOI-registration fallback: <https://api.crossref.org/works/10.1016/S0065-2601(06)38002-1> — **HTTP 200**.
- Returned title: **Implementation Intentions and Goal Achievement: A Meta‐analysis of Effects and Processes**.
- Peter M. Gollwitzer and Paschal Sheeran; 2006; *Advances in Experimental Social Psychology*; **DOI 10.1016/S0065-2601(06)38002-1** (returned lowercase DOI is equivalent).
- Author/title/year/DOI verified from registration metadata. Abstract/full text was not available in the retrieved metadata and no quantitative effect claim is used. This establishes a real source and its subject, not a completed quality appraisal.
- **Evidence limit:** indirect rationale for cue-linked if–then plans only. It does not validate the control/influence/outside-control categories, the five-step app flow, confidence restoration or first-responder operational judgment. Examples are educational adaptations and must not override duties or safety protocols.

### BA-2020 — re-engagement-reset

- Verified Europe PMC query: <https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID%3A32628265+OR+DOI%3A10.1002%2F14651858.CD013305.pub2&format=json&pageSize=3> — **HTTP 200**, two results. **Only the exact DOI-matched record is used.** The alternate ID 32628265 returned an unrelated dementia article and was excluded; it is not the review's PMID.
- Title: **Behavioural activation therapy for depression in adults.**
- Uphoff et al., 2020; *Cochrane Database of Systematic Reviews*; **DOI 10.1002/14651858.CD013305.pub2**, **PMID 32628293**, **PMCID PMC7390059**.
- Returned publication classification includes systematic review and meta-analysis. Core/abstract follow-up requests timed out; therefore no review effect sizes, certainty grading or superiority claim is presented.
- **Evidence limit:** structured behavioural activation therapy for depression is not a brief self-guided activity selector. The six activity areas, small-action examples and 2–5-minute initiation are adapted prompts, not tested treatment. No claim that activity must improve mood; rest, clinical care and safety take priority when indicated.

### MBRP-2014 — urge-craving-reset

- DOI search <https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI%3A10.1001%2Fjamapsychiatry.2013.4546&format=json&pageSize=3> — **HTTP 200**, one matching record.
- Abstract: <https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID%3A24647726&format=json&resultType=core&pageSize=1> — **HTTP 200**.
- Title: **Relative efficacy of mindfulness-based relapse prevention, standard relapse prevention, and treatment as usual for substance use disorders: a randomized clinical trial.**
- Bowen et al., 2014; *JAMA Psychiatry*; **DOI 10.1001/jamapsychiatry.2013.4546**, **PMID 24647726**, **PMCID PMC4489711**.
- Abstract: 286 participants who had completed initial substance-use treatment, were medically cleared for continuing care, and were assigned to eight weekly group sessions of MBRP, relapse prevention or treatment as usual; follow-up to 12 months. Findings concern programmes and follow-up substance-use outcomes, not a single exercise.
- **Not established:** isolated urge surfing, this six-step app adaptation, a reliably falling craving rating, an urge disappearing within minutes, standalone relapse prevention or withdrawal treatment. The optional 0–10 rating is neither diagnosis nor a safety test; no reduction is promised.

### NHS-ALCOHOL — withdrawal safety, not effectiveness evidence

- Requested <https://www.nhs.uk/conditions/alcohol-misuse/treatment/>; final redirected URL <https://www.nhs.uk/conditions/alcohol-use-disorder/> — **HTTP 200**.
- Actual HTML title: **Alcohol-use disorder - NHS**. Institutional NHS guidance; **no DOI**.
- Read guidance warning that sudden stopping when dependent can be dangerous and to get medical help before trying to stop. Severe withdrawal section directs emergency care for symptoms including confusion, hallucinations and seizures.
- NHS emergency numbers and care pathways are UK-specific. Content uses urgent medical care/local emergency services rather than importing UK numbers as Canadian support resources. Emergency symptom examples are not an exhaustive checklist or a diagnostic tool.

### NHS-BENZO — withdrawal safety, not effectiveness evidence

- Requested <https://www.nhs.uk/medicines/lorazepam/common-questions-about-lorazepam/>; final redirected URL <https://www.nhs.uk/medicines/lorazepam/> — **HTTP 200**.
- Actual HTML title: **Lorazepam: a medicine to treat anxiety - NHS**. **No DOI**.
- Explicit text read: “Do not stop taking lorazepam suddenly because this can cause withdrawal symptoms such as confusion or seizures (fits).” It describes prescriber-guided dose reduction and following the doctor's advice; the app supplies no taper schedule or medication instructions.
- Additional corroboration <https://www.nhs.uk/medicines/diazepam/> — **HTTP 200**, title **Diazepam - NHS**. Identifies diazepam as a benzodiazepine and warns that stopping suddenly can cause withdrawal; advises following the doctor’s advice. **No DOI**.
- **Required conservative boundary in the record:** severe alcohol or benzodiazepine withdrawal can be a medical emergency; seek urgent medical care, do not surf through symptoms or detox alone. No advice to abruptly stop or self-manage withdrawal. Prescribed-medication changes belong with a clinician.

### MSC-2013 — self-compassion-accountability-reset

- Europe PMC: <https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:23070875&format=json&resultType=core> — **HTTP 200**, matching metadata and abstract.
- Title: **A pilot study and randomized controlled trial of the mindful self-compassion program.**
- Neff KD and Germer CK; indexed publication year **2013**; **DOI 10.1002/jclp.21923**, **PMID 23070875**.
- Crossref <https://api.crossref.org/works/10.1002/jclp.21923> — **HTTP 200**, matching title/authors/DOI, online publication date **2012-10-15**. Online 2012 versus indexed 2013 is a publication-date distinction, not a different study.
- Abstract: an eight-week programme; pilot N=21; trial intervention N=25 versus waitlist N=27, predominantly female community adults. Reports self-compassion, mindfulness and wellbeing gains; waitlist comparison and sample composition limit generalization.
- **Not established:** this short six-step sequence, first-responder/military/veteran outcomes, moral-injury treatment, accountability determinations, legal responsibility or clinical efficacy in trauma. Compassion is not absolution; duties, repair, supervision and reporting remain intact. No forced disclosure or trauma narrative.

## Failed/limited attempts retained honestly

- Several Europe PMC broad/exact DOI/core queries reached the 15-second read timeout. No HTTP response status was obtained for those attempts; they are not described as HTTP errors or negative evidence. Bounded retries retrieved the verified records above, except BA abstract/full text.
- Initial NHS diazepam subpages `/common-questions-about-diazepam/` and `/how-and-when-to-take-diazepam/` returned **HTTP 404**, title **Page not found - NHS**; excluded as references. Current medicine root pages worked.
- FDA benzodiazepine boxed-warning URL request returned **HTTP 404** at `https://www.fda.gov/apology_objects/abuse-detection-apology.html`, with no HTML title; not used as a source. No claim about the FDA page's substantive contents is made.
- Broad PMR searching returned irrelevant/newer records; they were not substituted for the identified systematic review. The actual DOI-matched review was fetched afterward.

## Scoped artifact verification

A read-only Python contract check exited **0** after both artifacts were written: exactly five IDs in requested order; original field order retained; How counts **3 / 5 / 4 / 6 / 6**; three When and three Benefits entries per record; **seven reference entries**; type-only import present; evidence document exists. This is structural content verification, not TypeScript integration, runtime, clinical or accessibility validation.

## Release and integration gates

1. Clinical/SME review of all five educational adaptations **before public release**, especially PMR injury restrictions, activation appropriateness, addiction/withdrawal emergency wording and guilt/moral distress/accountability.
2. Parent to extend `SupportTool.id`, preserve original-five identity, and implement elapsed-time PMR timing from the owner contract. Skipped muscle areas must become rest slots without shortening selected total. Exact timing is a prototype design, not a published protocol.
3. Optional urge/distress ratings, activity selection and muscle skips remain session-only and clear on the agreed lifecycle. This content module must not become permission for free-text collection, stored health details or hidden inference.
4. Parent to verify UI numbering, support access, stop/exit, safety-critical gating, timer/audio lifecycle, viewport/accessibility and storage/privacy isolation. Text alone proves none of these runtime behaviours.
5. No builds, servers, commits, deployment, runtime or clinical approval were performed in this scoped content task. The tool's initial automatic per-file TypeScript invocation returned TS5112 (tsconfig present while files passed on command line). After the parent expanded the ID union, fresh scoped verification passed: `npm run lint -- src/additionalSupportContent.ts` exited 0 with zero warnings/errors; `node node_modules/typescript/bin/tsc --ignoreConfig --noEmit --strict --target ES2022 --module ESNext --moduleResolution bundler --skipLibCheck src/additionalSupportContent.ts` exited 0. These are targeted lint/type checks, not a full-project build or runtime integration verification.
