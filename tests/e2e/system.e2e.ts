import { describe, it, expect } from 'vitest';
import { UnraidClient } from '../../src/index.js';

// READ-ONLY end-to-end snapshot against a real Unraid server.
// Gated by UNRAID_E2E=1; credentials come from the gitignored .env
// (loaded via `node --env-file=.env`). No control mutations are executed.
const enabled = process.env.UNRAID_E2E === '1';
const host = process.env.UNRAID_HOST ?? '';
const apiKey = process.env.UNRAID_API_KEY ?? '';
const port = process.env.UNRAID_PORT ? Number(process.env.UNRAID_PORT) : undefined;
const https = process.env.UNRAID_HTTPS === 'true';

function makeClient(): UnraidClient {
  return new UnraidClient({ host, apiKey, https, ...(port !== undefined ? { port } : {}) });
}

const CONTAINER_STATES = ['RUNNING', 'PAUSED', 'EXITED'];

describe.runIf(enabled)('e2e: READ-ONLY snapshot', () => {
  it('system.versions() returns the Unraid/API/kernel versions', async () => {
    const client = makeClient();
    try {
      const core = await client.system.versions();
      expect(core.unraid).toBeTruthy();
      expect(core.api).toBeTruthy();
      expect(core.kernel).toBeTruthy();
    } finally {
      await client.close();
    }
  });

  it('system.info() returns hostname and cpu', async () => {
    const client = makeClient();
    try {
      const info = await client.system.info();
      expect(info.os.hostname).toBeTruthy();
      expect(typeof info.cpu.cores === 'number' || info.cpu.cores === null).toBe(true);
    } finally {
      await client.close();
    }
  });

  it('array.get() returns a state and member disks', async () => {
    const client = makeClient();
    try {
      const arr = await client.array.get();
      expect(arr.state).toBeTruthy();
      expect(Array.isArray(arr.disks)).toBe(true);
    } finally {
      await client.close();
    }
  });

  it('docker.list() returns containers with valid states', async () => {
    const client = makeClient();
    try {
      const containers = await client.docker.list();
      expect(Array.isArray(containers)).toBe(true);
      for (const c of containers) {
        expect(CONTAINER_STATES).toContain(c.state);
      }
    } finally {
      await client.close();
    }
  });

  it('disks.list() returns physical disks', async () => {
    const client = makeClient();
    try {
      const disks = await client.disks.list();
      expect(Array.isArray(disks)).toBe(true);
    } finally {
      await client.close();
    }
  });

  it('notifications.overview() returns counts', async () => {
    const client = makeClient();
    try {
      const overview = await client.notifications.overview();
      expect(typeof overview.unread.total).toBe('number');
    } finally {
      await client.close();
    }
  });
});
