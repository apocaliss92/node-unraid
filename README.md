# node-unraid

Fully-typed Node.js/TypeScript client for the **Unraid GraphQL API** — Docker, array, disks, VMs,
system info, UPS, notifications, with live subscriptions.

> Work in progress. Read-all-values + control, over HTTP + WebSocket. Not a UI.

## Install

```bash
npm install node-unraid
```

## Auth

Create an **ADMIN** API key on your Unraid server: `unraid-api apikey --create` (or Settings →
Management Access → API Keys), then:

```ts
const u = new UnraidClient({ host: 'tower.local', apiKey: process.env.UNRAID_API_KEY });
```

## License

MIT. A client for Unraid's public GraphQL interface; no server source is included.
