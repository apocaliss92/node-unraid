// Typed error hierarchy for node-unraid. The transports map every failure to one
// of these so callers can branch on the cause without inspecting transport internals.

/** Base class for every error thrown by node-unraid. */
export class UnraidError extends Error {
  override readonly cause?: unknown;

  constructor(message: string, options?: { readonly cause?: unknown }) {
    super(message);
    this.name = 'UnraidError';
    if (options && options.cause !== undefined) {
      this.cause = options.cause;
    }
  }
}

/** Missing or insufficient API key (HTTP 401/403). The API needs an ADMIN-role key. */
export class UnraidAuthError extends UnraidError {
  readonly status?: number;

  constructor(message: string, options?: { readonly status?: number; readonly cause?: unknown }) {
    super(message, options);
    this.name = 'UnraidAuthError';
    if (options && options.status !== undefined) {
      this.status = options.status;
    }
  }
}

/** The server responded with a GraphQL `errors[]` payload. */
export class UnraidApiError extends UnraidError {
  readonly errors: readonly GraphQLErrorLike[];

  constructor(
    message: string,
    options: { readonly errors: readonly GraphQLErrorLike[]; readonly cause?: unknown },
  ) {
    super(message, options);
    this.name = 'UnraidApiError';
    this.errors = options.errors;
  }
}

/** Network, TLS, timeout, or other transport-level failure (no usable response). */
export class UnraidTransportError extends UnraidError {
  constructor(message: string, options?: { readonly cause?: unknown }) {
    super(message, options);
    this.name = 'UnraidTransportError';
  }
}

/** Minimal shape of a GraphQL error entry, as returned by the server. */
export interface GraphQLErrorLike {
  readonly message: string;
  readonly path?: readonly (string | number)[];
  readonly extensions?: Readonly<Record<string, unknown>>;
}

interface ResponseLike {
  readonly status?: number;
  readonly errors?: readonly GraphQLErrorLike[];
}

function getResponse(error: unknown): ResponseLike | undefined {
  if (typeof error !== 'object' || error === null || !('response' in error)) {
    return undefined;
  }
  const response = error.response;
  if (typeof response !== 'object' || response === null) {
    return undefined;
  }
  const out: { status?: number; errors?: readonly GraphQLErrorLike[] } = {};
  if ('status' in response && typeof response.status === 'number') {
    out.status = response.status;
  }
  const rawErrors = (response as { errors?: unknown }).errors;
  if (Array.isArray(rawErrors)) {
    out.errors = rawErrors.filter(
      (e): e is GraphQLErrorLike =>
        typeof e === 'object' &&
        e !== null &&
        typeof (e as { message: unknown }).message === 'string',
    );
  }
  return out;
}

function firstMessage(errors: readonly GraphQLErrorLike[] | undefined, fallback: string): string {
  return errors && errors.length > 0 ? errors[0]!.message : fallback;
}

/**
 * Map any thrown value from a transport into a typed `UnraidError`.
 * - HTTP 401/403 → {@link UnraidAuthError}
 * - a GraphQL `errors[]` payload → {@link UnraidApiError}
 * - anything else (network/TLS/timeout) → {@link UnraidTransportError}
 */
export function mapError(error: unknown): UnraidError {
  if (error instanceof UnraidError) {
    return error;
  }

  const response = getResponse(error);
  if (response?.status === 401 || response?.status === 403) {
    return new UnraidAuthError(
      `Unraid rejected the API key (HTTP ${response.status}). An ADMIN-role API key is required.`,
      { status: response.status, cause: error },
    );
  }

  if (response?.errors && response.errors.length > 0) {
    return new UnraidApiError(firstMessage(response.errors, 'GraphQL error'), {
      errors: response.errors,
      cause: error,
    });
  }

  const message = error instanceof Error ? error.message : 'Unraid transport error';
  return new UnraidTransportError(message, { cause: error });
}
