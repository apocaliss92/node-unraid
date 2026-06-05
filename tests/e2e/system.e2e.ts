import { describe, it, expect } from 'vitest';
import { UnraidClient } from '../../src/index.js';

// READ-ONLY end-to-end smoke test against a real Unraid server.
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

describe.runIf(enabled)('e2e: system (READ-ONLY)', () => {
  it('reads the server Unraid/API/kernel versions', async () => {
    const client = makeClient();
    try {
      const core = await client.system.versions();
      expect(core.unraid).toBeTruthy();
      expect(core.api).toBeTruthy();
      expect(core.kernel).toBeTruthy();
      // eslint-disable-next-line no-console
      console.log('[e2e] Unraid', core.unraid, '| API', core.api, '| kernel', core.kernel);
    } finally {
      await client.close();
    }
  });
});
