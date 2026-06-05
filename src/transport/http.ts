import { GraphQLClient } from 'graphql-request';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { mapError } from '../errors.js';

/** Injectable `fetch` implementation (typed seam for tests and custom TLS handling). */
export type FetchImpl = typeof fetch;

export interface HttpClientOptions {
  /** Hostname or IP of the Unraid WebGUI that serves `/graphql`. */
  readonly host: string;
  /** Port (default 80, or 443 when `https` is true). */
  readonly port?: number;
  /** Use https for the WebGUI. */
  readonly https?: boolean;
  /** An ADMIN-role API key. */
  readonly apiKey: string;
  /** Custom fetch (e.g. an undici fetch bound to an agent that allows self-signed TLS). */
  readonly fetch?: FetchImpl;
}

export interface UnraidHttp {
  /** The resolved `http(s)://host:port/graphql` endpoint. */
  readonly endpoint: string;
  /** Execute a typed operation, mapping any failure to a {@link UnraidError}. */
  request<TResult, TVariables>(
    document: TypedDocumentNode<TResult, TVariables>,
    variables?: TVariables,
  ): Promise<TResult>;
}

/** Build the GraphQL endpoint URL from connection options. */
export function buildEndpoint(host: string, port?: number, https?: boolean): string {
  const scheme = https ? 'https' : 'http';
  const resolvedPort = port ?? (https ? 443 : 80);
  return `${scheme}://${host}:${resolvedPort}/graphql`;
}

/** Create the HTTP transport: a `graphql-request` client with the `x-api-key` header. */
export function createHttpClient(options: HttpClientOptions): UnraidHttp {
  const endpoint = buildEndpoint(options.host, options.port, options.https);
  const client = new GraphQLClient(endpoint, {
    headers: { 'x-api-key': options.apiKey },
    ...(options.fetch ? { fetch: options.fetch } : {}),
  });

  return {
    endpoint,
    async request(document, variables) {
      try {
        return await client.request(document, variables ?? undefined);
      } catch (error: unknown) {
        throw mapError(error);
      }
    },
  };
}
