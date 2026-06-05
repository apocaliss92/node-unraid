import { describe, it, expect } from 'vitest';
import { buildEndpoint, createHttpClient } from '../../src/transport/http.js';
import { SystemVersionsDocument } from '../../src/generated/sdk.js';
import { UnraidAuthError, UnraidApiError } from '../../src/errors.js';

describe('buildEndpoint', () => {
  it('defaults to http on port 80', () => {
    expect(buildEndpoint('tower.local')).toBe('http://tower.local:80/graphql');
  });
  it('uses an explicit port', () => {
    expect(buildEndpoint('1.2.3.4', 8080)).toBe('http://1.2.3.4:8080/graphql');
  });
  it('defaults to https on port 443', () => {
    expect(buildEndpoint('tower.local', undefined, true)).toBe('https://tower.local:443/graphql');
  });
});

interface Captured {
  url: string;
  apiKey: string | null;
  body: string;
}

function fetchReturning(
  payload: unknown,
  status = 200,
): { fetch: typeof fetch; calls: Captured[] } {
  const calls: Captured[] = [];
  const fetchImpl: typeof fetch = async (input, init) => {
    const headers = new Headers(init?.headers);
    calls.push({
      url: String(input),
      apiKey: headers.get('x-api-key'),
      body: typeof init?.body === 'string' ? init.body : '',
    });
    return new Response(JSON.stringify(payload), {
      status,
      headers: { 'content-type': 'application/json' },
    });
  };
  return { fetch: fetchImpl, calls };
}

const versionsPayload = {
  data: { info: { versions: { core: { unraid: '7.3.1', api: '4.34.0', kernel: '6.x' } } } },
};

describe('createHttpClient', () => {
  it('exposes the resolved endpoint', () => {
    const http = createHttpClient({ host: 'h', apiKey: 'k' });
    expect(http.endpoint).toBe('http://h:80/graphql');
  });

  it('sends the x-api-key header and returns typed data', async () => {
    const { fetch, calls } = fetchReturning(versionsPayload);
    const http = createHttpClient({ host: 'h', port: 80, apiKey: 'secret-key', fetch });
    const result = await http.request(SystemVersionsDocument);
    expect(result.info.versions.core.unraid).toBe('7.3.1');
    expect(calls).toHaveLength(1);
    expect(calls[0]?.apiKey).toBe('secret-key');
    // The default :80 is stripped by URL normalisation before fetch is called.
    expect(calls[0]?.url).toContain('http://h');
    expect(calls[0]?.url).toContain('/graphql');
    expect(calls[0]?.body).toContain('SystemVersions');
  });

  it('maps a 401 response to UnraidAuthError', async () => {
    const { fetch } = fetchReturning({ errors: [{ message: 'unauthorized' }] }, 401);
    const http = createHttpClient({ host: 'h', apiKey: 'bad', fetch });
    await expect(http.request(SystemVersionsDocument)).rejects.toBeInstanceOf(UnraidAuthError);
  });

  it('maps a GraphQL errors[] payload to UnraidApiError', async () => {
    const { fetch } = fetchReturning({ errors: [{ message: 'boom' }] }, 200);
    const http = createHttpClient({ host: 'h', apiKey: 'k', fetch });
    await expect(http.request(SystemVersionsDocument)).rejects.toBeInstanceOf(UnraidApiError);
  });
});
