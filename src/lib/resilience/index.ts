// Vendored from cubiczan-resilience (typescript/src). No npm registry available,
// so the needed primitives are copied in-tree. Keep in sync with upstream.
export {
  ResilienceError,
  isResilienceError,
  type ResilienceErrorKind,
  type ResilienceErrorOptions,
} from "./errors.js";

export { retry, computeBackoff, type RetryOptions } from "./retry.js";

export {
  safeFetch,
  type SafeFetchOptions,
  type AllowlistHook,
} from "./safeFetch.js";
