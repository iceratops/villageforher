# AGENTS.md — Village For Her

## Mission
Build Village For Her into a trusted, elegant, customer-obsessed business that can ship quickly, convert honestly, and scale without unnecessary complexity.

## Non-Negotiable Principles
1. Customer value beats technical novelty. Solve the user's problem before improving architecture.
2. Mobile-first is mandatory. Every customer-facing flow must work beautifully at 320px+ before desktop is considered done.
3. Preserve working architecture unless it blocks the requested outcome. Do not rewrite for taste.
4. Ship the smallest excellent solution. Avoid speculative systems, premature abstractions, and Phase-2 scope.
5. Never invent testimonials, reviews, metrics, medical claims, scarcity, customers, press, or founder stories.
6. Never expose, log, hard-code, or commit secrets. Update `.env.example` with variable names only.
7. Stripe is the active payment system for new Village For Her purchases. Square is legacy unless explicitly requested.
8. Payment success must be verified server-side/webhook-side; never trust redirect parameters alone.
9. Paid digital files must not live at obvious public URLs. Use validated entitlement or signed/tokenized access.
10. Prefer existing dependencies and primitives. Add packages only when they materially reduce risk or complexity.
11. Do not introduce a CMS, auth system, cart, customer portal, subscription system, or microservice without explicit scope.
12. Accessibility, performance, SEO, and failure states are product requirements, not cleanup tasks.
13. No generic AI design: avoid excessive gradients, glassmorphism, card grids, pills, animations, and stock imagery.
14. The visual standard is premium, warm, feminine, editorial, restrained, and highly legible.
15. Copy must be concrete, emotionally intelligent, inclusive, and understandable without motherhood jargon.
16. Never shame partners/family. Help supporters understand what useful action looks like.
17. Do not present Village For Her as therapy, medical care, diagnosis, or clinical treatment.
18. Keep analytics minimal and useful. Track funnel decisions, not vanity instrumentation.
19. Maintain clean URLs, redirects, metadata, Open Graph, sitemap, and structured data where valid.
20. Remove stale customer-facing Square, AI-companion, service, or shop flows when replaced and safe to retire.

## Execution Discipline
21. Inspect the relevant code before editing. Do not guess at existing behavior.
22. Start with a concise KEEP / REMOVE / REBUILD / RISKS note; then implement. No audit-document marathon.
23. Touch only files needed for the task or required cleanup. Do not opportunistically refactor unrelated areas.
24. Reuse strong components; delete duplication only when behavior is understood and tests/build remain healthy.
25. Keep business logic out of presentation components where practical, but do not create abstractions for one-off logic.
26. Preserve backward compatibility unless the task explicitly replaces the behavior.
27. Treat production data, payments, email delivery, and destructive actions as high-risk boundaries.
28. Never perform destructive production actions unless explicitly requested and clearly understood.
29. Prefer reversible migrations and idempotent webhook/fulfillment logic.
30. Do not silently enable taxes, paid services, third-party automations, or recurring charges.

## Quality Gate
31. Before completion, run the production build and relevant tests.
32. Manually verify the primary customer journey: discover → understand → CTA → checkout → payment → fulfillment.
33. Verify cancel/error/retry states and duplicate webhook behavior.
34. Check mobile at 320, 375, and 390px plus desktop; no horizontal overflow or hidden CTAs.
35. Check keyboard navigation, focus states, labels, contrast, headings, and meaningful alt text.
36. Check critical links, redirects, metadata, and stale Square references.
37. Do not create hundreds of low-value tests. Prioritize revenue-, trust-, security-, and regression-critical paths.
38. If something cannot be verified, state it explicitly rather than claiming completion.

## Documentation & Reporting
39. Keep documentation lean. Update existing source-of-truth docs instead of creating new ones.
40. Do not generate architecture, audit, QA, decision, or planning documents unless they will be maintained.
41. Record only durable decisions: payment flow, environment variables, deployment requirements, and important tradeoffs.
42. Final report must contain: what changed, verification performed, founder-only actions, risks, and deferred Phase-2 ideas.
43. Founder actions must be the shortest possible list. Never ask the founder to do work the agent can safely do.

## Decision Rule
44. When uncertain, choose the option that is simpler, safer, more reversible, easier to understand, and more valuable to the customer.
45. If a change does not improve customer value, conversion, trust, maintainability, security, or launch speed, do not do it.
