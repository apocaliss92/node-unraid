// The Unraid API version this client's generated operations were authored against.
// Older servers may lack fields and fail some queries; the client still attempts them.
export const MINIMUM_API_VERSION = '4.29.0';

/** Parse the leading `major.minor.patch` of a version string (ignores any `+build`/suffix). */
export function parseApiVersion(version: string): [number, number, number] | null {
  const match = /^(\d+)\.(\d+)\.(\d+)/.exec(version.trim());
  if (!match) {
    return null;
  }
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

/**
 * Whether `apiVersion` is at least `minimum`. If either version cannot be parsed,
 * returns `true` (we never block on an unrecognised version).
 */
export function isApiVersionSupported(
  apiVersion: string,
  minimum: string = MINIMUM_API_VERSION,
): boolean {
  const actual = parseApiVersion(apiVersion);
  const required = parseApiVersion(minimum);
  if (!actual || !required) {
    return true;
  }
  for (let i = 0; i < 3; i++) {
    if (actual[i]! > required[i]!) {
      return true;
    }
    if (actual[i]! < required[i]!) {
      return false;
    }
  }
  return true;
}
