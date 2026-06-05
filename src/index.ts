// Public API surface of node-unraid.
// Only the client, its options/result types, the typed errors, and the public
// enums are exported here; transport, generated SDK internals, and the operation
// documents stay private to keep the published surface small and stable.

export { LIBRARY_NAME } from './support/version.js';

export { UnraidClient } from './client.js';
export type { UnraidClientOptions } from './client.js';

export { UnraidError, UnraidAuthError, UnraidApiError, UnraidTransportError } from './errors.js';
export type { GraphQLErrorLike } from './errors.js';

export type { FetchImpl } from './transport/http.js';
export type { WebSocketImpl } from './transport/ws.js';

// Domain interfaces + their result types.
export type { DockerDomain, DockerContainer, DockerNetwork } from './domains/docker.js';
export type { ArrayDomain, ArrayInfo, ArrayDisk, ParityCheck } from './domains/array.js';
export type { DisksDomain, Disk } from './domains/disks.js';
export type { SystemDomain, CoreVersions, SystemInfo } from './domains/system.js';
export type { VmsDomain, VmDomain } from './domains/vms.js';
export type { SharesDomain, Share } from './domains/shares.js';
export type { UpsDomain, UpsDevice } from './domains/ups.js';
export type {
  NotificationsDomain,
  Notification,
  NotificationOverview,
  NotificationFilter,
} from './domains/notifications.js';
export type { ServerDomain, ServerInfo, Registration } from './domains/server.js';

export * from './enums.js';
