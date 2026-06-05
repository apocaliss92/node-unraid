# node-unraid

Fully-typed Node.js/TypeScript client for the official **Unraid GraphQL API** — Docker, array, disks,
VMs, system info, UPS, shares, notifications, and license registration, with live subscriptions over
WebSocket.

- **Read everything** the API exposes, across typed domain namespaces.
- **Control**: start/stop containers and VMs, manage the array and parity, archive notifications, …
- **Subscribe** to live container stats, system metrics, UPS updates, and new notifications.
- Strict TypeScript, ESM + CJS, zero hand-written GraphQL types (generated from the live schema).

## Install

```bash
npm install node-unraid
```

## Authentication

The API requires an **ADMIN-role API key**. Create one on your server:

```bash
unraid-api apikey --create --name "my client" --roles ADMIN --json
```

(or Settings → Management Access → API Keys). Then:

```ts
import { UnraidClient } from 'node-unraid';

const unraid = new UnraidClient({
  host: 'tower.local', // or an IP
  port: 80, // default 80 (443 when https: true)
  apiKey: process.env.UNRAID_API_KEY!,
});
```

## Reading values

```ts
// Docker
const containers = await unraid.docker.list();
for (const c of containers) {
  console.log(c.names, c.state); // 'RUNNING' | 'PAUSED' | 'EXITED'
}
const networks = await unraid.docker.networks();

// Array, disks, parity
const array = await unraid.array.get(); // state, capacity, parity, member disks
const disks = await unraid.disks.list(); // physical disks + SMART status
const history = await unraid.array.parityHistory();

// System
const versions = await unraid.system.versions(); // { unraid, api, kernel }
const info = await unraid.system.info(); // os / cpu / memory / baseboard / devices

// VMs, shares, UPS, notifications, server
const vms = await unraid.vms.list();
const shares = await unraid.shares.list();
const ups = await unraid.ups.list();
const overview = await unraid.notifications.overview();
const notes = await unraid.notifications.list({ type: 'UNREAD', offset: 0, limit: 25 });
const server = await unraid.server.info();
const license = await unraid.server.registration();
```

## Control

```ts
await unraid.docker.start(containerId);
await unraid.docker.stop(containerId);
await unraid.docker.remove(containerId, /* withImage */ false);

await unraid.array.setState({ desiredState: 'START' }); // or 'STOP'
await unraid.array.parity.start(/* correct */ true);
await unraid.array.parity.cancel();

await unraid.vms.start(vmId);
await unraid.vms.forceStop(vmId);

await unraid.notifications.archive(notificationId);
await unraid.notifications.archiveAll('WARNING');
```

## Live subscriptions

```ts
for await (const stats of unraid.docker.stats$()) {
  console.log(stats.id, stats.cpuPercent, stats.memPercent);
}

for await (const cpu of unraid.system.cpu$()) console.log(cpu.percentTotal);
for await (const mem of unraid.system.memory$()) console.log(mem.percentTotal);
for await (const note of unraid.notifications.added$()) console.log(note.title);
for await (const ups of unraid.ups.updates$()) console.log(ups.battery.chargeLevel);

await unraid.close(); // tear down the WebSocket + active subscriptions
```

## Errors

Every failure maps to a typed error:

- `UnraidAuthError` — missing/insufficient API key (HTTP 401/403; an ADMIN key is required).
- `UnraidApiError` — the server returned GraphQL `errors[]` (see `.errors`).
- `UnraidTransportError` — network, TLS, or timeout failure.

```ts
import { UnraidAuthError } from 'node-unraid';

try {
  await unraid.docker.list();
} catch (err) {
  if (err instanceof UnraidAuthError) {
    // create an ADMIN-role API key
  }
}
```

## Version support

Generated against Unraid API **≥ 4.29**. Check a server at runtime:

```ts
const support = await unraid.system.checkApiSupport();
// { apiVersion: '4.34.0+…', minimum: '4.29.0', supported: true }
```

Older servers may lack some fields; the client still attempts queries.

## License

MIT. A client for Unraid's public GraphQL interface; no server source is included. `unraid-api` itself
(the GraphQL server) is GPL-2.0 and is **not** part of this package.
