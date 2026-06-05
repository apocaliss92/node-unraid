// Public API surface of node-unraid.
// Only the client, its options/result types, the typed errors, and the public
// enums are exported here; transport, generated SDK internals, and the operation
// documents stay private to keep the published surface small and stable.

export { LIBRARY_NAME } from './support/version.js';

export { UnraidClient } from './client.js';
export type { UnraidClientOptions, CoreVersions } from './client.js';

export { UnraidError, UnraidAuthError, UnraidApiError, UnraidTransportError } from './errors.js';
export type { GraphQLErrorLike } from './errors.js';

export type { FetchImpl } from './transport/http.js';
export type { WebSocketImpl } from './transport/ws.js';

export * from './enums.js';
