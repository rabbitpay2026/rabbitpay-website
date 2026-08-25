import "server-only";

/**
 * Minimal in-memory fixed-window rate limiter for /api/leads.
 *
 * IMPORTANT — what this does and does not give you:
 *
 * On AWS Amplify the App Router runs on Lambda, so these counters live in one
 * warm instance's memory. They are per-instance and reset on cold start, which
 * makes this a cheap brake on casual scripted abuse, NOT a guarantee. A
 * determined attacker spreading traffic across instances is not stopped.
 *
 * That is a deliberate trade: it costs nothing, adds no infrastructure, and the
 * endpoint's blast radius is one internal notification email. If lead spam ever
 * becomes a real problem, put AWS WAF rate-based rules in front of the route (or
 * move these counters into a shared store) — the call sites do not change.
 */

/** Bound the map so a flood of unique keys cannot grow memory without limit. */
const MAX_TRACKED_KEYS = 10_000;

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

function sweep(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitRule = { limit: number; windowMs: number };

/**
 * Two separate budgets, because they protect different things:
 *
 * REQUESTS is a brake on hammering the endpoint at all. It is generous, so a
 * merchant who mistypes their email a few times is never locked out of the lead
 * form — validation failures are cheap and must not cost them their submission.
 *
 * SENDS guards the only expensive, abusable side effect: actually dispatching
 * mail through Resend. It is consumed immediately before sending, so rejected
 * and malformed payloads never eat into it.
 */
export const REQUEST_RULE: RateLimitRule = { limit: 30, windowMs: 60_000 };
export const SEND_RULE: RateLimitRule = { limit: 5, windowMs: 60_000 };

export function checkRateLimit(
  key: string,
  rule: RateLimitRule,
): { allowed: boolean; remaining: number } {
  const now = Date.now();

  if (buckets.size > MAX_TRACKED_KEYS) sweep(now);

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + rule.windowMs });
    return { allowed: true, remaining: rule.limit - 1 };
  }

  if (existing.count >= rule.limit) {
    return { allowed: false, remaining: 0 };
  }

  existing.count += 1;
  return { allowed: true, remaining: rule.limit - existing.count };
}

/** Test-only helper so suites can start from a clean window. */
export function __resetRateLimit() {
  buckets.clear();
}
