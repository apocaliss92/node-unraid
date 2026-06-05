import { createHttpClient, type FetchImpl, type UnraidHttp } from './transport/http.js';
import { createWsClient, type UnraidWs, type WebSocketImpl } from './transport/ws.js';
import { UnraidError } from './errors.js';
import { SystemVersionsDocument, type SystemVersionsQuery } from './generated/sdk.js';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';

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

/** Core Unraid/API/kernel version strings reported by the server. */
export type CoreVersions = SystemVersionsQuery['info']['versions']['core'];

/**
 * Typed client for the Unraid GraphQL API.
 *
 * Read values and (later) control the server over HTTP, with live subscriptions
 * over WebSocket. Construct once, reuse, and call {@link UnraidClient.close} when done.
 */
export class UnraidClient {
  readonly #http: UnraidHttp;
  readonly #wsOptions: UnraidClientOptions;
  #ws: UnraidWs | null = null;

  constructor(options: UnraidClientOptions) {
    if (!options.host || options.host.trim() === '') {
      throw new UnraidError('UnraidClient requires a non-empty `host`.');
    }
    if (!options.apiKey || options.apiKey.trim() === '') {
      throw new UnraidError('UnraidClient requires an `apiKey` (an ADMIN-role API key).');
    }
    this.#http = createHttpClient(options);
    this.#wsOptions = options;
  }

  /** The resolved `http(s)://host:port/graphql` endpoint. */
  get endpoint(): string {
    return this.#http.endpoint;
  }

  /** System information domain. */
  get system(): {
    /** Read the server's Unraid, API, and kernel version strings. */
    versions(): Promise<CoreVersions>;
  } {
    return {
      versions: async (): Promise<CoreVersions> => {
        const result = await this.#http.request(SystemVersionsDocument);
        return result.info.versions.core;
      },
    };
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
