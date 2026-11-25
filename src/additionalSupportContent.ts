import type { SupportTool } from './realTimeSupportContent'

// New educational drafts, not original curriculum or clinically approved treatment.
// All five adapted flows require clinical/SME review before public release.
// The renderer supplies numbering. Timers and optional session-only controls live elsewhere.
export const additionalSupportTools: SupportTool[] = [
  {
    id: 'physical-tension-reset',
    title: 'Physical Tension Reset',
    what: 'A gentle progressive muscle relaxation practice: lightly tense and release comfortable muscle groups, then let the jaw rest. The aim is noticing tension, not forcing relaxation.',
    when: [
      'During a safe break when your hands or shoulders feel tight.',
      'After a demanding shift, once immediate duties are covered.',
      'Before an ordinary rest period when you want to notice physical tension.',
    ],
    how: [
      'Prepare: stop in a safe, stationary place, away from driving, equipment and safety-critical duties. Use comfortable support and choose 2 or 5 minutes. Skip painful, injured or medically restricted areas; a skipped slot is ordinary rest. Keep breathing naturally, with no breath hold.',
      'Timed muscle sequence: follow the timer through hands, shoulders, legs and feet. In each comfortable area, use only light tension for 5 seconds, then release for 10 seconds; do not strain. The 2-minute option uses one round and the 5-minute option uses three rounds. Let your jaw rest without clenching, then remain in ordinary rest for the remaining timer time. Stop for pain, cramp, dizziness or increasing distress.',
      'Finish: allow all muscles to rest, notice the support beneath you and look around. Decide whether a safe next activity, further rest or support is appropriate. You do not need to feel relaxed to finish.',
    ],
    why: 'PMR uses gentle tension and release to help notice muscle tension and allow rest. A systematic review supports progressive muscle relaxation as a potentially helpful approach to stress, anxiety and depression in adults. It does not validate this short adapted muscle order, 5-second/10-second timing, app timer or first-responder outcomes.',
    benefits: [
      'May help you notice the difference between tension and release.',
      'May offer a brief opportunity for physical rest.',
      'May help identify an area that needs gentler treatment or medical advice.',
    ],
    duration: 'Choose 2 or 5 minutes including preparation, gentle muscle slots, relaxed jaw and natural rest; stop earlier whenever needed.',
    adaptations: [
      'Rest through any painful, injured or restricted muscle slot; skipping is not failure.',
      'Imagine releasing tension without tightening if active tension is uncomfortable.',
      'Keep eyes open, use mobility-aid support and avoid changing position unnecessarily.',
      'Never clench the jaw, hold the breath or use forceful tension. Follow existing medical advice; new or concerning symptoms need medical attention, not a relaxation test.',
    ],
    references: [
      {
        title: 'Efficacy of Progressive Muscle Relaxation in Adults for Stress, Anxiety, and Depression: A Systematic Review',
        url: 'https://europepmc.org/article/MED/38322293',
        note: 'Muhammad Khir et al., 2024; DOI 10.2147/PRBM.S437277; PMID 38322293. Europe PMC metadata and abstract verified: 46 publications. Technique-level evidence only; the exact 2-/5-minute prototype sequence is not a validated protocol.',
      },
    ],
  },
  {
    id: 'control-confidence-reset',
    title: 'Control and Confidence Reset',
    what: 'A brief way to separate a concern from what you can control, influence or cannot control, then choose a small constructive action. Confidence is not a required outcome.',
    when: [
      'When a non-urgent worry remains after immediate hazards are addressed.',
      'Before asking a colleague or supervisor for clarification during a safe break.',
      'When changing plans or a difficult shift leaves you unsure where to begin.',
    ],
    how: [
      'Name the concern: pause somewhere safe and stationary, off driving, equipment and safety-critical duties. Quietly identify one present concern in a few words; no writing, incident description or disclosure is needed.',
      'Sort the concern: distinguish what you control, what you can influence and what is outside your control. For example, you may control checking your equipment, influence a handover by asking a clear question, but not control an earlier dispatch decision. Do not dismiss a real hazard as outside your responsibility.',
      'Choose a constructive action: pick one small step within your control, such as checking an instruction, requesting practical cover or arranging appropriate support. Follow training and reporting requirements.',
      'Make an if–then plan: link an available cue to that action, such as “If the handover is complete and it is safe, then I will ask the supervisor to clarify the next task.” Choose a realistic cue, not a promise to control the outcome.',
      'Begin or arrange the step: take the action when safe, or identify the next suitable opportunity. Ask for help if needed; revise the plan if circumstances change. Stop if the exercise adds distress.',
    ],
    why: 'Problem-focused coping directs attention toward manageable actions; if–then plans link a cue to a chosen response. Implementation-intention research examines linking a situation cue to a planned response. That evidence supports the if–then planning component indirectly; it does not validate this control/influence sorting exercise, restore confidence on demand or establish operational decision quality.',
    benefits: [
      'May clarify one manageable next action.',
      'May reduce time spent trying to control an unavailable outcome.',
      'May make an appropriate request for help more specific.',
    ],
    duration: 'About 1–3 minutes to choose a plan; the action itself may take longer.',
    adaptations: [
      'Use a broad concern label without revisiting an incident or collecting free text.',
      'If categories overlap, choose one useful safe action rather than getting the sorting perfect.',
      'Ask a trusted colleague to help clarify roles without sharing private details.',
      'Immediate safety actions and professional duties take priority over completing this exercise.',
    ],
    references: [
      {
        title: 'Implementation Intentions and Goal Achievement: A Meta-analysis of Effects and Processes',
        url: 'https://doi.org/10.1016/S0065-2601(06)38002-1',
        note: 'Gollwitzer and Sheeran, 2006; DOI 10.1016/S0065-2601(06)38002-1. Crossref author/title/year/DOI metadata verified; Europe PMC returned zero exact-DOI hits. Metadata establishes provenance, not a full-text appraisal. Indirect support for if–then planning only.',
      },
    ],
  },
  {
    id: 're-engagement-reset',
    title: 'Re-Engagement Reset',
    what: 'A behavioural-activation-informed prompt to begin one small, safe and meaningful activity, without waiting to feel motivated or treating productivity as a measure of worth.',
    when: [
      'During off-duty time when starting an ordinary activity feels difficult.',
      'When you have drifted away from a small activity that matters to you.',
      'When choosing between rest, basic care and a manageable connection would help.',
    ],
    how: [
      'Acknowledge your state: pause safely, away from driving, equipment and safety-critical duties. Notice low energy, disconnection or reluctance without judging it. Check whether rest, medical care or urgent support is needed instead of activation.',
      'Select an activity area: choose movement, nature, social connection, personal care, enjoyment or accomplishment. Pick what fits your needs and circumstances; you do not need to explain or record the choice.',
      'Choose the smallest safe meaningful action: for example, a comfortable stretch, looking at nearby greenery, contacting a trusted person, washing your face, listening to a song or putting away one item. Match the action to mobility, energy, access and duty requirements.',
      'Begin when appropriate: try the small action now if safe, or choose a suitable opportunity. You can stop, scale it down or choose rest. Notice what was possible without requiring an improvement in mood, then decide whether to continue or connect with support.',
    ],
    why: 'Small meaningful activities may offer opportunities for care, connection or rewarding experiences even when motivation is low. Behavioural activation is a structured psychological therapy studied for depression. A Cochrane review provides treatment-level evidence; this brief activity-choice prompt is not that therapy, a depression assessment or a validated 2–5-minute intervention.',
    benefits: [
      'May lower the practical barrier to starting a meaningful activity.',
      'May help match an action to current energy and access.',
      'May create an opportunity for care, connection or enjoyment without performance pressure.',
    ],
    duration: 'About 2–5 minutes to select and initiate an action; the chosen activity can be shorter or longer.',
    adaptations: [
      'Use seated, supported, indoor or low-sensory alternatives; movement and going outdoors are optional.',
      'Rest and basic care can be appropriate choices; this is not an instruction to push through exhaustion, illness or injury.',
      'Choose a tiny action or ask for practical help if energy is limited.',
      'Persistent low mood or difficulty functioning deserves professional support; this prompt does not replace care.',
    ],
    references: [
      {
        title: 'Behavioural activation therapy for depression in adults',
        url: 'https://europepmc.org/article/MED/32628293',
        note: 'Uphoff et al., 2020, Cochrane Database of Systematic Reviews; DOI 10.1002/14651858.CD013305.pub2; PMID 32628293. Europe PMC metadata and systematic-review classification verified; abstract/full-text appraisal not completed. Evidence concerns therapy, not this standalone activity menu.',
      },
    ],
  },
  {
    id: 'urge-craving-reset',
    title: 'Urge and Craving Reset',
    what: 'An urge-surfing-informed pause for noticing an urge and choosing a safer response with support. It is not addiction treatment or withdrawal care and does not guarantee that a craving will pass.',
    when: [
      'When a familiar non-emergency urge appears during a safe break.',
      'When you want space before an unhelpful habitual response.',
      'Alongside an existing recovery plan, when your clinician considers this appropriate.',
    ],
    how: [
      'Recognize and check safety: stop in a safe, stationary place, off driving, equipment and safety-critical duties. Quietly acknowledge “an urge is here.” If there may be withdrawal, intoxication or immediate risk, choose medical or emergency help instead. Severe alcohol or benzodiazepine withdrawal can be a medical emergency; seizures, hallucinations or severe confusion need urgent medical care. Do not try to surf through symptoms or detox alone.',
      'Optionally rate intensity: if useful, choose 0–10, where 0 is no urge and 10 is the strongest you can imagine. You may skip this; the number is not a diagnosis, safety clearance or progress target.',
      'Observe neutrally: briefly notice a comfortable physical sensation such as contact with the chair or feet supported. If inward attention is uncomfortable, use a neutral external detail. Do not search for, intensify or test symptoms.',
      'Notice change or steadiness: observe whether sensations shift, stay the same or strengthen, with ordinary breathing. There is no required reduction and no deadline for an urge to disappear. Stop if distress increases; do not delay needed support to finish.',
      'Identify needs: consider whether rest, food or water if appropriate, company, a safer environment or professional help is needed. An urge or physical symptom may need assessment; do not assume it is harmless.',
      'Choose a healthier response and support: move away from a risky situation if safe, use an agreed recovery-plan action and contact a trusted person, addiction service or clinician. Use Connect With Support if needed. Do not abruptly stop or change alcohol or benzodiazepine use when dependence may be present without medical guidance; arrange medical advice rather than unsupervised detox. Use local emergency services for immediate danger.',
    ],
    why: 'Urge surfing invites noticing an urge without automatically acting on it, while seeking help or changing attention whenever needed. A randomized trial studied an eight-week mindfulness-based relapse prevention programme after initial substance-use treatment. It offers indirect support for noticing discomfort and responding skillfully, not proof that this short urge exercise reduces cravings, prevents relapse or manages withdrawal.',
    benefits: [
      'May provide a pause before an automatic response.',
      'May help identify an immediate practical or support need.',
      'May support using an existing recovery plan or contacting help.',
    ],
    duration: 'About 3–5 minutes only when safe; seek support sooner whenever needed. Never wait out emergency or withdrawal symptoms.',
    adaptations: [
      'Skip the optional rating or internal observation; neutral external attention is an alternative.',
      'Use alongside, not instead of, an agreed clinical or recovery plan; a trusted person can help you access care.',
      'Severe alcohol or benzodiazepine withdrawal can be a medical emergency. Seek urgent medical care for seizures, hallucinations, severe confusion or other severe symptoms; do not detox alone or try to surf through them.',
      'This tool gives no taper, medication or detox instructions. Obtain medical guidance before changing use when dependence may be present.',
    ],
    references: [
      {
        title: 'Relative efficacy of mindfulness-based relapse prevention, standard relapse prevention, and treatment as usual for substance use disorders: a randomized clinical trial',
        url: 'https://europepmc.org/article/MED/24647726',
        note: 'Bowen et al., 2014; DOI 10.1001/jamapsychiatry.2013.4546; PMID 24647726. Metadata and abstract verified: 286 medically cleared aftercare participants, eight weekly group sessions. Not a trial of isolated urge surfing, this six-step flow or detox safety.',
      },
      {
        title: 'Alcohol-use disorder - NHS',
        url: 'https://www.nhs.uk/conditions/alcohol-use-disorder/',
        note: 'Official NHS guidance fetched successfully. Warns against sudden stopping with dependence and directs severe withdrawal symptoms to emergency care. UK care pathways are not a local Canadian service recommendation. No DOI; safety guidance, not efficacy evidence.',
      },
      {
        title: 'Lorazepam: a medicine to treat anxiety - NHS',
        url: 'https://www.nhs.uk/medicines/lorazepam/',
        note: 'Official NHS guidance fetched successfully. Warns that sudden stopping can cause confusion or seizures and advises following the prescriber’s guidance. Lorazepam is a benzodiazepine; this page is safety guidance, not a general self-detox protocol. No DOI.',
      },
    ],
  },
  {
    id: 'self-compassion-accountability-reset',
    title: 'Self-Compassion and Accountability Reset',
    what: 'A brief, non-punitive reflection that pairs a fair view of yourself with appropriate responsibility and a constructive next action. Kindness is not absolution or a decision about fault.',
    when: [
      'When harsh self-criticism is crowding out a useful next step.',
      'After a difficult ordinary interaction, once immediate safety needs are addressed.',
      'When hindsight makes it difficult to separate known facts from assumptions.',
    ],
    how: [
      'Name the emotion: pause safely, away from driving, equipment and safety-critical duties. Quietly acknowledge a feeling such as guilt, sadness, shame or uncertainty. No incident retelling, confession or writing is required; you may use “a difficult feeling.”',
      'Separate facts from assumptions: notice the difference between what is known and what you are inferring, without reconstructing an incident. Leave uncertain matters uncertain; this exercise does not investigate events or determine fault.',
      'Consider information then available: recognize what you reasonably knew and the constraints at that time, rather than assuming you had today’s information. Context can support a fair assessment without excusing harmful conduct.',
      'Take a respected colleague’s perspective: consider how you would speak honestly and humanely to a colleague in the same circumstances. Try that respectful tone with yourself, without needing to reassure yourself that everything was acceptable.',
      'Acknowledge appropriate responsibility: distinguish your own actions and duties from matters outside your role or control. Do not decide legal liability here. Maintain required safety, reporting and professional obligations; seek appropriate supervision or professional advice when unsure.',
      'Choose a constructive next action: identify a proportionate step such as seeking supervision, making an appropriate repair, learning a skill or contacting support. Avoid self-punishment and do not bypass required procedures. Stop and seek support if the exercise deepens distress.',
    ],
    why: 'Self-compassion uses a respectful rather than punitive response; factual reflection and appropriate responsibility support choosing a constructive action. A small trial of an eight-week Mindful Self-Compassion programme found improvements in self-compassion and wellbeing. That is indirect support for a compassionate tone, not evidence for this brief accountability sequence, moral-injury treatment or conclusions about responsibility.',
    benefits: [
      'May support a less punitive way of considering a difficult feeling.',
      'May help distinguish established facts from assumptions.',
      'May make a responsible next step easier to identify.',
    ],
    duration: 'About 2–4 minutes; stop sooner or continue with appropriate support rather than repeating until you feel reassured.',
    adaptations: [
      'Use broad emotion words and stay with the present; no trauma narrative or disclosure is needed.',
      'If guilt, shame or moral distress intensifies, stop and connect with an appropriately qualified professional or trusted support person.',
      'Use “What would be fair and useful?” if compassionate language feels uncomfortable.',
      'This is not absolution, legal advice, a substitute for reporting duties or a replacement for clinical care.',
    ],
    references: [
      {
        title: 'A pilot study and randomized controlled trial of the mindful self-compassion program',
        url: 'https://europepmc.org/article/MED/23070875',
        note: 'Neff and Germer, 2013 (online 2012); DOI 10.1002/jclp.21923; PMID 23070875. Europe PMC metadata/abstract and Crossref metadata verified. Eight-week programme; pilot N=21, randomized groups N=25 and N=27. Not a trial of this brief flow, accountability decisions or first-responder moral injury.',
      },
    ],
  },
]
