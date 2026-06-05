import { describe, it, expect, vi } from 'vitest';
import type { FormattedExecutionResult } from 'graphql';
import { buildWsEndpoint, createWsClient, type WsTransport } from '../../src/transport/ws.js';
import { SystemVersionsDocument } from '../../src/generated/sdk.js';
import { UnraidApiError } from '../../src/errors.js';

describe('buildWsEndpoint', () => {
  it('defaults to ws on port 80', () => {
    expect(buildWsEndpoint('tower.local')).toBe('ws://tower.local:80/graphql');
  });
  it('uses wss + 443 for https', () => {
    expect(buildWsEndpoint('h', undefined, true)).toBe('wss://h:443/graphql');
  });
  it('honours an explicit port', () => {
    expect(buildWsEndpoint('h', 9000)).toBe('ws://h:9000/graphql');
  });
});

function fakeTransport(results: ReadonlyArray<FormattedExecutionResult>): WsTransport {
  const iterate: WsTransport['iterate'] = function iterate<Data, Ext>(): AsyncIterableIterator<
    FormattedExecutionResult<Data, Ext>
  > {
    async function* gen(): AsyncIterableIterator<FormattedExecutionResult<Data, Ext>> {
      for (const r of results) {
        yield r as FormattedExecutionResult<Data, Ext>;
      }
    }
    return gen();
  };
  return {
    iterate,
    dispose: vi.fn(async () => {}),
  };
}

async function collect<T>(iterable: AsyncIterable<T>): Promise<T[]> {
  const out: T[] = [];
  for await (const item of iterable) {
    out.push(item);
  }
  return out;
}

describe('createWsClient.subscribe', () => {
  it('yields the data payload of each result', async () => {
    const transport = fakeTransport([{ data: { tick: 1 } }, { data: { tick: 2 } }]);
    const ws = createWsClient({ host: 'h', apiKey: 'k', client: transport });
    const items = await collect(ws.subscribe(SystemVersionsDocument));
    expect(items).toEqual([{ tick: 1 }, { tick: 2 }]);
  });

  it('skips results with null/undefined data', async () => {
    const transport = fakeTransport([{ data: null }, { data: { ok: true } }, {}]);
    const ws = createWsClient({ host: 'h', apiKey: 'k', client: transport });
    const items = await collect(ws.subscribe(SystemVersionsDocument));
    expect(items).toEqual([{ ok: true }]);
  });

  it('throws UnraidApiError when a result carries errors', async () => {
    const transport = fakeTransport([{ errors: [{ message: 'sub failed' }] }]);
    const ws = createWsClient({ host: 'h', apiKey: 'k', client: transport });
    await expect(collect(ws.subscribe(SystemVersionsDocument))).rejects.toBeInstanceOf(
      UnraidApiError,
    );
  });

  it('dispose() delegates to the underlying client', async () => {
    const transport = fakeTransport([]);
    const ws = createWsClient({ host: 'h', apiKey: 'k', client: transport });
    await ws.dispose();
    expect(transport.dispose).toHaveBeenCalledOnce();
  });
});
