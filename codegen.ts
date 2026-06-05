import type { CodegenConfig } from '@graphql-codegen/cli';

// Dev-only, one-time (or per-API-version) type generation.
// Runs against the LIVE introspected schema of a real Unraid server, so it
// requires the server's GraphQL sandbox to be enabled and an ADMIN API key:
//
//   1. unraid-api developer --sandbox true        (on the server)
//   2. node --env-file=.env node_modules/.bin/graphql-codegen --config codegen.ts
//   3. unraid-api developer --sandbox false        (restore the server)
//
// The generated TypeScript (src/generated/sdk.ts) is COMMITTED. The published
// package therefore performs NO runtime codegen and vendors NO server schema.
const host = process.env.UNRAID_HOST ?? '';
const port = process.env.UNRAID_PORT ?? '80';
const apiKey = process.env.UNRAID_API_KEY ?? '';
const scheme = (process.env.UNRAID_HTTPS ?? 'false') === 'true' ? 'https' : 'http';

if (!host || !apiKey) {
  throw new Error(
    'codegen requires UNRAID_HOST and UNRAID_API_KEY in the environment ' +
      '(run with: node --env-file=.env node_modules/.bin/graphql-codegen --config codegen.ts)',
  );
}

const sharedConfig = {
  scalars: {
    BigInt: 'string',
    DateTime: 'string',
    JSON: 'unknown',
    Port: 'number',
    PrefixedID: 'string',
  },
  skipTypename: true,
  useTypeImports: true,
  // String-literal unions (not runtime enums): the two generated files then share
  // identical enum *members*, so an operation result's `state` field and the public
  // re-exported enum type line up exactly with no nominal mismatch — and it matches
  // the project's "prefer string-literal unions over enum" style.
  enumsAsTypes: true,
  avoidOptionals: { field: true, object: true, inputValue: false },
  maybeValue: 'T | null',
};

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [`${scheme}://${host}:${port}/graphql`]: {
        headers: { 'x-api-key': apiKey },
      },
    },
  ],
  documents: ['src/operations/**/*.graphql'],
  generates: {
    // Full schema (every enum + input/object type) — the source of the public enum
    // re-exports and any standalone type access.
    'src/generated/graphql-types.ts': {
      plugins: ['typescript'],
      config: sharedConfig,
    },
    // Self-contained: operation result/variable types + TypedDocumentNode constants.
    // Deliberately NOT importing graphql-types — typescript-operations re-emits the
    // enums/inputs it uses as local unions with identical members, so the two files
    // never collide (codegen 7.x does not dedupe typescript vs typescript-operations
    // in one file, and import-types mis-prefixes typed-document-node's local types).
    'src/generated/sdk.ts': {
      plugins: ['typescript-operations', 'typed-document-node'],
      config: sharedConfig,
    },
  },
};

export default config;
