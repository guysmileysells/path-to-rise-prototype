# PATH TO RISE — PROMPT #13 SME / PRIVACY / SECURITY REVIEW PACKAGES

These packages prepare human/external review. The agent must not mark them PASS unless actual qualified review occurs.

## 1. SME / content review package

Reviewer focus:

- trauma-informed language;
- first-responder relevance;
- wellness vs clinical boundaries;
- unsupported claims;
- potentially misleading statements;
- tone;
- appropriateness;
- potentially harmful interpretation;
- Support wording;
- RESET wording;
- Day 1–28 content;
- post-program messaging;
- whether active and retired first responders are both respected.

Reviewer should not be asked to validate software implementation unless they are also acting as a product tester.

SME result status: NOT VERIFIED until actual human review is recorded.

## 2. Privacy / legal review package

Current architecture facts to review:

- Reflections and progress are stored in browser localStorage in the prototype.
- There is no production account system.
- There is no production auth/storage/encryption model.
- There is no cross-device recovery.
- There is no real production push notification system.
- Testers must use synthetic reflections only.
- Testing must not collect private journal text, trauma details, diagnoses, medical history, incident details, employer-sensitive details, crisis disclosures, or unnecessary personal identifiers.
- Screenshots must be redacted before sharing.
- Support/crisis resources are not a substitute for emergency services.

Review questions:

1. Is the prototype/local data disclosure understandable?
2. Does any copy imply production-secure health record storage?
3. Are deletion/reset boundaries sufficient for a prototype?
4. Does notification copy avoid sensitive lock-screen content?
5. Are testers protected from over-disclosure during validation?
6. What must be resolved before closed beta/public launch?

Privacy/legal result status: NOT VERIFIED until actual qualified review is recorded.

## 3. Security review package

Current verified baseline:

- `npm audit --omit=dev --audit-level=low` found 0 vulnerabilities at Prompt #12 checkpoint.
- Static checks did not find obvious client secrets in staged files before checkpoint.
- No production infrastructure exists yet.

Important boundary:

Dependency audit is not application security review, penetration testing, or production infrastructure security validation.

Security questions:

1. Does the app expose private reflection text to URLs, logs, notifications, analytics, or third parties?
2. Are localStorage risks clearly disclosed for prototype testing?
3. Is there any sensitive information in the client bundle?
4. What security requirements are needed before production storage/auth?
5. What monitoring can be used without collecting private wellness/reflection content?

Security review result status: NOT VERIFIED until actual qualified review is recorded.
