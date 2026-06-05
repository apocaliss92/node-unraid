import { describe, it, expect } from 'vitest';
import { UnraidClient } from '../src/client.js';
import { UnraidError } from '../src/errors.js';
import { SystemVersionsDocument } from '../src/generated/sdk.js';

function fetchReturning(payload: unknown): typeof fetch {
  return async () =>
    new Response(JSON.stringify(payload), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
}

const versionsPayload = {
  data: { info: { versions: { core: { unraid: '7.3.1', api: '4.34.0', kernel: '6.18' } } } },
};

describe('UnraidClient construction', () => {
  it('throws when host is empty', () => {
    expect(() => new UnraidClient({ host: '', apiKey: 'k' })).toThrow(UnraidError);
  });

  it('throws when apiKey is empty', () => {
    expect(() => new UnraidClient({ host: 'h', apiKey: '   ' })).toThrow(UnraidError);
  });

  it('exposes the resolved endpoint', () => {
    const u = new UnraidClient({ host: 'tower', port: 8080, apiKey: 'k' });
    expect(u.endpoint).toBe('http://tower:8080/graphql');
  });
});

describe('UnraidClient.system', () => {
  it('versions() returns the core version strings', async () => {
    const u = new UnraidClient({ host: 'h', apiKey: 'k', fetch: fetchReturning(versionsPayload) });
    const core = await u.system.versions();
    expect(core).toEqual({ unraid: '7.3.1', api: '4.34.0', kernel: '6.18' });
  });
});

describe('UnraidClient lifecycle', () => {
  it('close() is a no-op when no subscription was opened', async () => {
    const u = new UnraidClient({ host: 'h', apiKey: 'k' });
    await expect(u.close()).resolves.toBeUndefined();
  });

  it('subscribe() returns an async iterable and close() tears the socket down', async () => {
    const u = new UnraidClient({ host: 'h', apiKey: 'k' });
    const iterable = u.subscribe(SystemVersionsDocument);
    expect(typeof iterable[Symbol.asyncIterator]).toBe('function');
    // Lazily created the ws transport; close() must dispose it without throwing.
    await expect(u.close()).resolves.toBeUndefined();
    // A second close() is safe.
    await expect(u.close()).resolves.toBeUndefined();
  });
});
