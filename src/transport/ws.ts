import { createClient, type Client } from 'graphql-ws';
import { print } from 'graphql';
import WebSocket from 'ws';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { UnraidApiError } from '../errors.js';

/** Injectable WebSocket implementation (typed seam for tests). */
export type WebSocketImpl = typeof WebSocket;

/** The subset of the graphql-ws `Client` this transport uses (also the test seam). */
export type WsTransport = Pick<Client, 'iterate' | 'dispose'>;

export interface WsClientOptions {
  readonly host: string;
  readonly port?: number;
  readonly https?: boolean;
  readonly apiKey: string;
  /** Custom WebSocket constructor (defaults to the `ws` package). */
  readonly webSocketImpl?: WebSocketImpl;
  /** Override the graphql-ws client (test seam). */
  readonly client?: WsTransport;
}

export interface UnraidWs {
  /** Subscribe to a typed operation, yielding each payload as it arrives. */
  subscribe<TResult, TVariables>(
    document: TypedDocumentNode<TResult, TVariables>,
    variables?: TVariables,
  ): AsyncIterable<TResult>;
  /** Close the underlying socket and stop all active subscriptions. */
  dispose(): Promise<void>;
}

/** A bound subscribe function handed to domains that expose `*$()` subscriptions. */
export type SubscribeFn = <TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables,
) => AsyncIterable<TResult>;

/** Build the WebSocket endpoint URL from connection options. */
export function buildWsEndpoint(host: string, port?: number, https?: boolean): string {
  const scheme = https ? 'wss' : 'ws';
  const resolvedPort = port ?? (https ? 443 : 80);
  return `${scheme}://${host}:${resolvedPort}/graphql`;
}

// Accepts `unknown` (not the caller's generic) so the object->Record bridge is a
// genuinely-needed narrowing the type-checker and linter both agree on. Every
// generated operation's variables type is an object, so this never loses data.
function toVariables(variables: unknown): Record<string, unknown> | undefined {
  if (variables === undefined || variables === null || typeof variables !== 'object') {
    return undefined;
  }
  return variables as Record<string, unknown>;
}

/** Create the subscription transport over `graphql-ws`. The socket connects lazily. */
export function createWsClient(options: WsClientOptions): UnraidWs {
  const client: WsTransport =
    options.client ??
    createClient({
      url: buildWsEndpoint(options.host, options.port, options.https),
      webSocketImpl: options.webSocketImpl ?? WebSocket,
      lazy: true,
      connectionParams: { 'x-api-key': options.apiKey },
    });

  return {
    subscribe<TResult, TVariables>(
      document: TypedDocumentNode<TResult, TVariables>,
      variables?: TVariables,
    ): AsyncIterable<TResult> {
      const query = print(document);
      const vars = toVariables(variables);
      return {
        async *[Symbol.asyncIterator]() {
          for await (const result of client.iterate<TResult>({
            query,
            ...(vars ? { variables: vars } : {}),
          })) {
            if (result.errors && result.errors.length > 0) {
              throw new UnraidApiError(result.errors[0]!.message, {
                errors: result.errors,
              });
            }
            if (result.data !== null && result.data !== undefined) {
              yield result.data;
            }
          }
        },
      };
    },
    async dispose() {
      await client.dispose();
    },
  };
}
