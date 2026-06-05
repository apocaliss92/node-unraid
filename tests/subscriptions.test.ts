import { describe, it, expect } from 'vitest';
import type { UnraidHttp } from '../src/transport/http.js';
import type { SubscribeFn } from '../src/transport/ws.js';
import { createDockerDomain } from '../src/domains/docker.js';
import { createNotificationsDomain } from '../src/domains/notifications.js';
import { createUpsDomain } from '../src/domains/ups.js';
import { createSystemDomain } from '../src/domains/system.js';

// The http transport is unused by the subscription methods under test.
const noopHttp: UnraidHttp = {
  endpoint: 'http://test/graphql',
  request: () => Promise.reject(new Error('http not used in subscription tests')),
};

// A fake SubscribeFn that yields the canned payloads for whatever document is passed.
function fakeSubscribe(payloads: ReadonlyArray<unknown>): SubscribeFn {
  return <TResult>(): AsyncIterable<TResult> => {
    async function* gen(): AsyncIterable<TResult> {
      for (const p of payloads) {
        yield p as TResult;
      }
    }
    return gen();
  };
}

async function collect<T>(iterable: AsyncIterable<T>): Promise<T[]> {
  const out: T[] = [];
  for await (const item of iterable) {
    out.push(item);
  }
  return out;
}

describe('docker.stats$', () => {
  it('unwraps the dockerContainerStats payload', async () => {
    const subscribe = fakeSubscribe([
      { dockerContainerStats: { id: 'c1', cpuPercent: 12.5, memPercent: 30 } },
      { dockerContainerStats: { id: 'c2', cpuPercent: 1, memPercent: 5 } },
    ]);
    const docker = createDockerDomain(noopHttp, subscribe);
    const items = await collect(docker.stats$());
    expect(items.map((s) => s.id)).toEqual(['c1', 'c2']);
    expect(items[0]?.cpuPercent).toBe(12.5);
  });
});

describe('notifications.added$', () => {
  it('unwraps the notificationAdded payload', async () => {
    const subscribe = fakeSubscribe([
      { notificationAdded: { id: 'e1', importance: 'ALERT', type: 'UNREAD' } },
    ]);
    const notifications = createNotificationsDomain(noopHttp, subscribe);
    const items = await collect(notifications.added$());
    expect(items[0]?.importance).toBe('ALERT');
  });
});

describe('ups.updates$', () => {
  it('unwraps the upsUpdates payload', async () => {
    const subscribe = fakeSubscribe([
      { upsUpdates: { id: 'u1', name: 'apc', battery: { chargeLevel: 90 }, power: {} } },
    ]);
    const ups = createUpsDomain(noopHttp, subscribe);
    const items = await collect(ups.updates$());
    expect(items[0]?.battery.chargeLevel).toBe(90);
  });
});

describe('system metrics subscriptions', () => {
  it('cpu$ unwraps systemMetricsCpu', async () => {
    const subscribe = fakeSubscribe([{ systemMetricsCpu: { id: 'cpu', percentTotal: 42 } }]);
    const system = createSystemDomain(noopHttp, subscribe);
    const items = await collect(system.cpu$());
    expect(items[0]?.percentTotal).toBe(42);
  });

  it('memory$ unwraps systemMetricsMemory', async () => {
    const subscribe = fakeSubscribe([
      { systemMetricsMemory: { id: 'mem', percentTotal: 60, total: '16', used: '8' } },
    ]);
    const system = createSystemDomain(noopHttp, subscribe);
    const items = await collect(system.memory$());
    expect(items[0]?.percentTotal).toBe(60);
  });
});
