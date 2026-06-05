import { createHttpClient, type FetchImpl, type UnraidHttp } from './transport/http.js';
import {
  createWsClient,
  type UnraidWs,
  type WebSocketImpl,
  type SubscribeFn,
} from './transport/ws.js';
import { UnraidError } from './errors.js';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { createDockerDomain, type DockerDomain } from './domains/docker.js';
import { createArrayDomain, type ArrayDomain } from './domains/array.js';
import { createDisksDomain, type DisksDomain } from './domains/disks.js';
import { createSystemDomain, type SystemDomain } from './domains/system.js';
import { createVmsDomain, type VmsDomain } from './domains/vms.js';
import { createSharesDomain, type SharesDomain } from './domains/shares.js';
import { createUpsDomain, type UpsDomain } from './domains/ups.js';
import { createNotificationsDomain, type NotificationsDomain } from './domains/notifications.js';
import { createServerDomain, type ServerDomain } from './domains/server.js';

export interface UnraidClientOptions {
  /** Hostname or IP of the Unraid WebGUI that serves `/graphql`. */
  readonly host: string;
  /** Port (default 80, or 443 when `https` is true). */
  readonly port?: number;
  /** Use https/wss for the WebGUI. */
  readonly https?: boolean;
  /** An ADMIN-role API key (`unraid-api apikey --create`). */
  readonly apiKey: string;
  /** Custom fetch (e.g. an undici fetch that allows self-signed TLS). */
  readonly fetch?: FetchImpl;
  /** Custom WebSocket constructor (defaults to the `ws` package). */
  readonly webSocketImpl?: WebSocketImpl;
}

/**
 * Typed client for the Unraid GraphQL API.
 *
 * Read values across domain namespaces (`docker`, `array`, `disks`, `system`, `vms`,
 * `shares`, `ups`, `notifications`, `server`) over HTTP, with live subscriptions over
 * WebSocket. Construct once, reuse, and call {@link UnraidClient.close} when done.
 */
export class UnraidClient {
  readonly #http: UnraidHttp;
  readonly #wsOptions: UnraidClientOptions;
  #ws: UnraidWs | null = null;

  /** Docker containers and networks. */
  readonly docker: DockerDomain;
  /** Array state, capacity, parity, and member disks. */
  readonly array: ArrayDomain;
  /** Physical disks and SMART status. */
  readonly disks: DisksDomain;
  /** OS, CPU, memory, versions, and devices. */
  readonly system: SystemDomain;
  /** Virtual machines. */
  readonly vms: VmsDomain;
  /** User shares. */
  readonly shares: SharesDomain;
  /** UPS devices. */
  readonly ups: UpsDomain;
  /** Notifications. */
  readonly notifications: NotificationsDomain;
  /** Server identity, status, and license registration. */
  readonly server: ServerDomain;

  constructor(options: UnraidClientOptions) {
    if (!options.host || options.host.trim() === '') {
      throw new UnraidError('UnraidClient requires a non-empty `host`.');
    }
    if (!options.apiKey || options.apiKey.trim() === '') {
      throw new UnraidError('UnraidClient requires an `apiKey` (an ADMIN-role API key).');
    }
    this.#http = createHttpClient(options);
    this.#wsOptions = options;

    const subscribe: SubscribeFn = (document, variables) =>
      this.#subscriptions().subscribe(document, variables);

    this.docker = createDockerDomain(this.#http, subscribe);
    this.array = createArrayDomain(this.#http);
    this.disks = createDisksDomain(this.#http);
    this.system = createSystemDomain(this.#http, subscribe);
    this.vms = createVmsDomain(this.#http);
    this.shares = createSharesDomain(this.#http);
    this.ups = createUpsDomain(this.#http, subscribe);
    this.notifications = createNotificationsDomain(this.#http, subscribe);
    this.server = createServerDomain(this.#http);
  }

  /** The resolved `http(s)://host:port/graphql` endpoint. */
  get endpoint(): string {
    return this.#http.endpoint;
  }

  /** Lazily create the subscription transport on first use. */
  #subscriptions(): UnraidWs {
    this.#ws ??= createWsClient(this.#wsOptions);
    return this.#ws;
  }

  /**
   * Subscribe to any typed operation, yielding each payload as it arrives.
   * The foundation the domain `*$()` subscription helpers build on. Connects lazily.
   */
  subscribe<TResult, TVariables>(
    document: TypedDocumentNode<TResult, TVariables>,
    variables?: TVariables,
  ): AsyncIterable<TResult> {
    return this.#subscriptions().subscribe(document, variables);
  }

  /** Tear down the WebSocket client and any active subscriptions. */
  async close(): Promise<void> {
    if (this.#ws) {
      await this.#ws.dispose();
      this.#ws = null;
    }
  }
}
