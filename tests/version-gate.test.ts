import { describe, it, expect } from 'vitest';
import {
  MINIMUM_API_VERSION,
  parseApiVersion,
  isApiVersionSupported,
} from '../src/support/version-gate.js';
import { UnraidClient } from '../src/index.js';

describe('parseApiVersion', () => {
  it('parses major.minor.patch and ignores a +build suffix', () => {
    expect(parseApiVersion('4.34.0+a2d48433')).toEqual([4, 34, 0]);
  });
  it('returns null for an unparseable version', () => {
    expect(parseApiVersion('not-a-version')).toBeNull();
  });
});

describe('isApiVersionSupported', () => {
  it('accepts a newer version', () => {
    expect(isApiVersionSupported('4.34.0+x')).toBe(true);
  });
  it('accepts exactly the minimum', () => {
    expect(isApiVersionSupported(MINIMUM_API_VERSION)).toBe(true);
  });
  it('rejects an older version', () => {
    expect(isApiVersionSupported('4.10.0')).toBe(false);
    expect(isApiVersionSupported('3.99.99')).toBe(false);
  });
  it('does not block when a version cannot be parsed', () => {
    expect(isApiVersionSupported('weird')).toBe(true);
  });
});

describe('system.checkApiSupport', () => {
  function clientReturning(api: string | null): UnraidClient {
    const fetchImpl: typeof fetch = async () =>
      new Response(
        JSON.stringify({
          data: { info: { versions: { core: { unraid: '7.3.1', api, kernel: 'k' } } } },
        }),
        {
          status: 200,
          headers: { 'content-type': 'application/json' },
        },
      );
    return new UnraidClient({ host: 'h', apiKey: 'k', fetch: fetchImpl });
  }

  it('reports supported for a current server', async () => {
    const support = await clientReturning('4.34.0+a2d48433').system.checkApiSupport();
    expect(support.supported).toBe(true);
    expect(support.apiVersion).toBe('4.34.0+a2d48433');
    expect(support.minimum).toBe(MINIMUM_API_VERSION);
  });

  it('reports unsupported for an old server', async () => {
    expect((await clientReturning('4.0.0').system.checkApiSupport()).supported).toBe(false);
  });

  it('does not block when the server omits the api version', async () => {
    const support = await clientReturning(null).system.checkApiSupport();
    expect(support.apiVersion).toBeNull();
    expect(support.supported).toBe(true);
  });
});
