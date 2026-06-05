import { describe, it, expect } from 'vitest';
import * as api from '../src/index.js';

// Read from src (not dist): test:cov runs before build in CI. This locks the public
// runtime surface so transports, generated documents, and domain factories never leak.
describe('public API surface', () => {
  it('exports exactly the intended runtime values', () => {
    const actual = Object.keys(api).sort();
    const expected = [
      'LIBRARY_NAME',
      'MINIMUM_API_VERSION',
      'UnraidApiError',
      'UnraidAuthError',
      'UnraidClient',
      'UnraidError',
      'UnraidTransportError',
      'isApiVersionSupported',
      'parseApiVersion',
    ].sort();
    expect(actual).toEqual(expected);
  });

  it('does not leak transport internals or generated documents', () => {
    const names = Object.keys(api);
    expect(names.some((n) => n.endsWith('Document'))).toBe(false);
    expect(names.some((n) => n.startsWith('create') && n.endsWith('Domain'))).toBe(false);
    expect(names).not.toContain('createHttpClient');
    expect(names).not.toContain('createWsClient');
  });

  it('UnraidClient is a constructor', () => {
    expect(typeof api.UnraidClient).toBe('function');
  });
});
