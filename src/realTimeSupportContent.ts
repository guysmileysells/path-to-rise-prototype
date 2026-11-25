// New educational draft for the owner-locked Real-Time Support flows.
// Not clinical approval or validated first-responder treatment. See the evidence matrix.
// How strings are unnumbered: the UI supplies numbering and one-step presentation.
export type SupportTool = {
  id:
    | 'physiological-reset'
    | 'here-now-reset'
    | 'intrusive-thought-reset'
    | 'respond-dont-react'
    | 'post-incident-reset'
    | 'physical-tension-reset'
    | 'control-confidence-reset'
    | 're-engagement-reset'
    | 'urge-craving-reset'
    | 'self-compassion-accountability-reset'
  title: string
  what: string
  when: string[]
  how: string[]
  why: string
  benefits: string[]
  duration: string
  adaptations: string[]
  references: { title: string; url: string; note: string }[]
}

export const gentleBreathingGuide = 'Follow the 4-second inhale / 6-second exhale below. Keep breaths easy, without holding or forcing. Stop if uncomfortable.'

export const realTimeSupportTools: SupportTool[] = [
  {
    id: 'physiological-reset',
    title: 'Physiological Reset',
    what: 'A short, gentle paced-breathing practice with a slightly longer out-breath. It offers a pause when you feel keyed up, without forcing calm.',
    when: [
      'After a demanding call, once you are safely off task.',
      'Before a difficult conversation during a safe break.',
      'When settling after a shift feels difficult.',
    ],
    how: [
      'Prepare: stop in a safe, stationary place, away from driving, equipment and safety-critical duties. Sit or stand with comfortable support, keep your eyes open or close them only if comfortable, and choose 1, 3 or 5 minutes.',
      'Breathe gently: follow the timer with an easy inhale for 4 seconds and an easy exhale for 6 seconds. Use a normal-sized breath, with no hold or forcing. Repeat only while comfortable; if dizzy, breathless, uncomfortable or more distressed, stop the timer and return to ordinary breathing.',
      'Finish: let your breathing return to its own rhythm. Look around, notice your support surface and decide whether to resume a safe activity, rest or connect with support. You can finish early; a calmer feeling is not required.',
    ],
    why: 'Slow breathing can influence breathing–heart-rate coordination and may support settling. Research supports slow breathing in general, not the effectiveness of this exact 4-in/6-out timer or its short duration choices.',
    benefits: [
      'May offer a more comfortable breathing rhythm.',
      'May create a brief pause before the next task.',
      'May help you notice whether rest or support is needed.',
    ],
    duration: 'Choose 1, 3 or 5 minutes of paced breathing, plus a brief preparation and finish. Stop sooner whenever needed.',
    adaptations: [
      'If counting or breath focus is uncomfortable, skip pacing and notice a neutral object or sound instead.',
      'If 4-in/6-out is not comfortable, return to ordinary breathing rather than trying to keep up.',
      'Use seated, standing or mobility-aid support that works for you; eyes may stay open throughout.',
      'Follow any existing professional guidance about breathing or physical symptoms; this practice is not a medical assessment.',
    ],
    references: [
      {
        title: 'How Breath-Control Can Change Your Life: A Systematic Review on Psycho-Physiological Correlates of Slow Breathing',
        url: 'https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2018.00353/full',
        note: 'Zaccaro et al., 2018; DOI 10.3389/fnhum.2018.00353. Review of 15 studies in healthy participants. Indirect support for slow breathing; not a trial of this exact timing, app or first-responder flow.',
      },
    ],
  },
  {
    id: 'here-now-reset',
    title: 'Here and Now Reset',
    what: 'A sensory orientation practice that brings attention to your present surroundings. Move through 5 things you see, 4 you feel, 3 you hear, 2 you smell and 1 you taste, then orient to where you are now.',
    when: [
      'When attention feels caught in a replay during a safe break.',
      'When you feel scattered after a demanding shift.',
      'Before returning to an ordinary activity, once immediate duties are covered.',
    ],
    how: [
      'See: first stop in a safe, stationary place, away from driving, equipment and safety-critical duties. With eyes open if comfortable, quietly notice 5 neutral things you can see, such as colours or shapes. If sight is unavailable or triggering, notice 5 neutral sounds or contact sensations instead.',
      'Feel: notice 4 comfortable contact sensations, such as clothing, a chair or a support surface. You do not need to touch anything new. Substitute another neutral sense or skip this step if touch is uncomfortable.',
      'Hear: notice 3 sounds around you, without searching for their cause. If hearing is unavailable or triggering, notice 3 neutral visual details or contact sensations instead.',
      'Smell: notice 2 neutral smells only if they are already safely present. Do not seek out fumes, substances or triggering scents. If none are available or comfortable, notice 2 more details through another neutral sense.',
      'Taste: notice 1 taste already present in your mouth only if comfortable; there is no need to eat, drink or taste an object. If taste is unavailable or triggering, notice 1 neutral detail through another sense.',
      'Orient: quietly name your current location and the current day or approximate time, as far as you know. Notice an ordinary feature of this place and choose one safe next action. If you feel more distressed, stop, attend to a neutral external detail and connect with support.',
    ],
    why: 'Noticing neutral sensory details offers a concrete focus on the present. University of Rochester Medical Center guidance describes the 5–4–3–2–1 sensory sequence; this is practical guidance, not trial evidence that the app treats flashbacks or overwhelm.',
    benefits: [
      'May make present surroundings easier to notice.',
      'May provide a neutral focus when attention is crowded.',
      'May help you choose a manageable next step.',
    ],
    duration: 'About 2–5 minutes at your own pace; fewer details or an early finish are equally valid.',
    adaptations: [
      'Use any available neutral sense; repeating a sense or noticing fewer details is fine.',
      'Keep eyes open if helpful. No step requires closing your eyes, moving or removing protective equipment.',
      'Skip any sensation linked with distress; never touch, smell or taste unsafe items or substances.',
      'Use supported contact or a trusted person’s description of the surroundings if useful and available.',
    ],
    references: [
      {
        title: '5-4-3-2-1 Coping Technique for Anxiety',
        url: 'https://www.urmc.rochester.edu/behavioral-health-partners/bhp-blog/april-2018/5-4-3-2-1-coping-technique-for-anxiety',
        note: 'Sara Smith, BSW, University of Rochester Medical Center Behavioral Health Partners, 10 April 2018. Original guidance verified for the exact five senses/counts. This is clinical education, not a randomized trial or validation of the app flow.',
      },
      {
        title: 'Managing anxiety and worry',
        url: 'https://www.keepingwellnwl.nhs.uk/self-help-resources/common-problems/managing-anxiety-and-worries',
        note: 'Keeping Well, Central and North West London NHS Foundation Trust. Clinical self-help guidance on grounding, not a clinical trial or a local support-service recommendation.',
      },
    ],
  },
  {
    id: 'intrusive-thought-reset',
    title: 'Intrusive Thought Reset',
    what: 'An ACT-informed way to notice an unwanted thought without treating it as an instruction. The aim is room for a constructive action, not suppression, reassurance or making the thought disappear.',
    when: [
      'When a repeated self-critical thought pulls you away from a safe next task.',
      'When a what-if loop continues after immediate risks have been addressed.',
      'When you want a pause from arguing with an unwanted thought.',
    ],
    how: [
      'Notice: pause in a safe, stationary place, away from driving, equipment and safety-critical duties. Notice that a thought has shown up; you do not need to recall an incident or write anything down.',
      'Identify: quietly label the kind of thought, such as “worry”, “self-criticism” or simply “a thought”. Keep it brief; there is no need to examine its details.',
      'Separate from thought: try “I am noticing a thought” or “My mind is offering a worry”. Let it be present without obeying it, proving it wrong or pushing it away.',
      'Identify controllable action: ask what small, useful action is within your control now. Choose something consistent with safety and what matters to you, such as asking for clarification or taking an agreed break; do not dismiss a real hazard as just a thought.',
      'Take constructive action: carry out that small step, or ask someone for help with it. The thought can remain while you act. If this increases distress, stop, notice your surroundings and connect with support.',
    ],
    why: 'Defusion changes how a person relates to a thought rather than trying to remove it. An early small experimental study supports that principle, but used rapid word repetition—not this five-step noticing-and-action sequence.',
    benefits: [
      'May create distance from an unhelpful thought.',
      'May reduce time spent struggling to suppress a thought.',
      'May help you return attention to a useful, chosen action.',
    ],
    duration: 'About 1–3 minutes, followed by one small action; no repetition target is required.',
    adaptations: [
      'Use a broad label such as “a thought”; you do not need to repeat upsetting words or describe an incident.',
      'Keep eyes open and focus externally if internal attention is uncomfortable.',
      'If the thought signals immediate danger, act on safety and seek help rather than continuing the exercise.',
      'For repeated or disruptive difficulties, consider peer, EAP or professional support; this tool is not an assessment or treatment.',
    ],
    references: [
      {
        title: 'Cognitive defusion and self-relevant negative thoughts: examining the impact of a ninety year old technique',
        url: 'https://doi.org/10.1016/j.brat.2003.10.008',
        note: 'Masuda, Hayes, Sackett and Twohig, 2004; DOI 10.1016/j.brat.2003.10.008, PMID 14998740. Crossref metadata and indexed abstract verified. Eight single-case alternating-treatment designs studied word repetition; indirect evidence only, not validation of these five steps.',
      },
    ],
  },
  {
    id: 'respond-dont-react',
    title: "Respond, Don't React",
    what: 'A short pause between an emotional urge and your next response. Follow Stop, Take a moment, Observe emotion and immediate urge, then Proceed intentionally.',
    when: [
      'Before responding to a tense message during a safe break.',
      'When irritation rises in a conversation that can safely pause.',
      'Before making a non-urgent decision while emotionally charged.',
    ],
    how: [
      'Stop: pause before speaking, sending or acting, only when it is safe to do so. Be stationary and off driving, equipment and safety-critical duties; do not delay an urgent safety response.',
      'Take a moment: allow a few seconds of space with ordinary, comfortable breathing. Keep your eyes open if helpful and notice one neutral feature around you; no breath hold is needed.',
      'Observe emotion and immediate urge: quietly name an emotion, such as frustration or fear, and the urge that comes with it, such as interrupting or sending a sharp reply. No analysis or disclosure is required.',
      'Proceed intentionally: choose one response that fits safety and your priorities—ask a clear question, speak respectfully or take an agreed break—then do it. If distress increases, stop the exercise and connect with support.',
    ],
    why: 'Briefly naming an emotion may help create a pause before action. Laboratory affect-labeling research offers indirect support for that component; it does not establish this owner-worded STOP sequence or better decisions during operational incidents.',
    benefits: [
      'May help you notice an urge before acting on it.',
      'May create space for a more deliberate response.',
      'May support clearer communication or a useful pause.',
    ],
    duration: 'About 30–90 seconds when a pause is safe; take longer or seek support if needed.',
    adaptations: [
      'Use a simple label such as “strong feeling” or “urge”; precise emotion words are optional.',
      'Notice a neutral sound or contact sensation if visual attention is unavailable or uncomfortable.',
      'You may leave a non-urgent conversation safely and return later; pausing does not require staying in an unsafe interaction.',
      'This pause does not override training, operational protocols or immediate protective action.',
    ],
    references: [
      {
        title: 'Putting feelings into words: affect labeling disrupts amygdala activity in response to affective stimuli',
        url: 'https://doi.org/10.1111/j.1467-9280.2007.01916.x',
        note: 'Lieberman et al., 2007; DOI 10.1111/j.1467-9280.2007.01916.x, PMID 17576282. Indexed abstract verified: an fMRI affect-labeling task with negative images. Indirect mechanism evidence, not a trial of STOP, this wording or real-world first-responder outcomes.',
      },
    ],
  },
  {
    id: 'post-incident-reset',
    title: 'Post-Incident Recovery Reset',
    what: 'A PFA-informed check of safety, current state, practical needs and connection after a demanding incident. It does not ask you to recount what happened or take part in a debrief.',
    when: [
      'After immediate incident duties have ended or been safely handed over.',
      'At a safe break when basic needs have been pushed aside.',
      'Before leaving a shift, when you want to plan support and the next practical step.',
    ],
    how: [
      'Establish safety: stop in a safe, stationary place, away from driving, equipment and safety-critical duties. Check for ongoing hazards and whether urgent help is needed; leave the exercise and seek emergency or medical help if safety is uncertain.',
      'Check physical and emotional state: quietly notice pain, injury, temperature, exhaustion and your present emotion, without judging or replaying the incident. Do not assume physical symptoms are stress; seek medical help for concerning symptoms.',
      'Regulate: if comfortable, take a few ordinary, unforced breaths and notice one neutral detail in your surroundings. Keep eyes open if helpful. If attention inward increases distress, stop and orient externally or ask someone to stay with you.',
      'Check immediate needs: identify what is needed now—water or food if appropriate, warmth, a toilet, rest, medical care or practical cover. Address the most urgent safe need first, or ask for help arranging it.',
      'Connect: choose a trusted colleague, peer supporter, friend, EAP or professional service if available. A simple “I could use company or practical support” is enough; sharing incident details is not required. Use Connect With Support if you need help finding options.',
      'Choose the next constructive action: take one manageable step, such as arranging a handover, a rest break or safe transport. Recheck safety and needs before resuming activity; finishing this exercise does not establish fitness for duty or driving.',
    ],
    why: 'Psychological First Aid emphasizes humane, practical help, safety, immediate needs and social support without pressure to tell an incident story. These principles inform this self-guided check; PFA guidance does not validate this six-step app flow or guarantee prevention of later difficulties.',
    benefits: [
      'May help identify an unmet physical or practical need.',
      'May make asking for company or assistance easier.',
      'May support a manageable plan for the next few minutes.',
      'May provide a pause without pressure to recount the incident.',
    ],
    duration: 'About 3–5 minutes for the check-in; meeting needs and connecting may take longer. Stop or seek help at any point.',
    adaptations: [
      'Work through the check with a trusted person, or ask them to help arrange practical needs.',
      'Use an available neutral sense; no step requires closing your eyes, moving, or describing the incident.',
      'Skip breath focus if uncomfortable. Seek support instead of pushing through distress.',
      'Use urgent services for immediate danger or concerning physical symptoms; this check is not emergency care or a fitness assessment.',
    ],
    references: [
      {
        title: 'Psychological first aid: Guide for field workers',
        url: 'https://www.who.int/publications/i/item/9789241548205',
        note: 'WHO, War Trauma Foundation and World Vision International, 2011; ISBN 978 92 4 154820 5. Official publication page and overview verified; guide download was blocked. Principle-level guidance for helpers, not efficacy evidence for a self-guided six-step recovery tool.',
      },
      {
        title: 'Psychological First Aid: Field Operations Guide, 2nd Edition',
        url: 'https://www.nctsn.org/sites/default/files/resources/pfa_field_operations_guide.pdf',
        note: 'National Child Traumatic Stress Network and National Center for PTSD. Original PDF verified; printed page 8 says not to debrief by asking for details. PFA is evidence-informed guidance, not proof that this app prevents later mental-health problems.',
      },
    ],
  },
]
