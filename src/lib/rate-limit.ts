/**
 * In-memory sliding window rate limiter for Next.js routes.
 * Tracks request timestamps per client IP without requiring external services.
 */

interface RateLimitConfig {
  /** Maximum number of allowed requests in the time window */
  limit: number;
  /** Window duration in seconds (e.g. 600 for 10 minutes) */
  windowSeconds: number;
}

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetInSeconds: number;
}

const stores = new Map<string, Map<string, number[]>>();

export function checkRateLimit(
  key: string,
  storeNamespace: string,
  config: RateLimitConfig
): RateLimitResult {
  const { limit, windowSeconds } = config;
  const now = Date.now();
  const windowMs = windowSeconds * 1000;

  if (!stores.has(storeNamespace)) {
    stores.set(storeNamespace, new Map());
  }

  const store = stores.get(storeNamespace)!;
  const timestamps = store.get(key) || [];

  // Filter out timestamps outside the active sliding window
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= limit) {
    const oldestTimestamp = validTimestamps[0];
    const resetInSeconds = Math.ceil((oldestTimestamp + windowMs - now) / 1000);

    // Save pruned timestamps
    store.set(key, validTimestamps);

    return {
      success: false,
      limit,
      remaining: 0,
      resetInSeconds: Math.max(1, resetInSeconds),
    };
  }

  // Record this request
  validTimestamps.push(now);
  store.set(key, validTimestamps);

  // Periodic cleanup if store grows large
  if (store.size > 2000) {
    for (const [entryKey, entryTimestamps] of store.entries()) {
      if (entryTimestamps.every((t) => now - t >= windowMs)) {
        store.delete(entryKey);
      }
    }
  }

  return {
    success: true,
    limit,
    remaining: limit - validTimestamps.length,
    resetInSeconds: windowSeconds,
  };
}

/**
 * Extracts a client IP address from standard request headers.
 */
export function getClientIp(request: Request): string {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const firstIp = xForwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }

  const xRealIp = request.headers.get("x-real-ip")?.trim();
  if (xRealIp) return xRealIp;

  const cfConnectingIp = request.headers.get("cf-connecting-ip")?.trim();
  if (cfConnectingIp) return cfConnectingIp;

  return "127.0.0.1";
}
