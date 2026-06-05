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
    'src/generated/sdk.ts': {
      // TypedDocumentNode (not the getSdk wrapper): each named operation becomes a
      // `<Name>Document: TypedDocumentNode<Result, Variables>` that graphql-request v7
      // consumes directly with full type inference — no graphql-tag, no getSdk overloads.
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: {
        scalars: {
          BigInt: 'string',
          DateTime: 'string',
          JSON: 'unknown',
          Port: 'number',
          PrefixedID: 'string',
        },
        skipTypename: true,
        useTypeImports: true,
        enumsAsTypes: false,
        avoidOptionals: { field: true, object: true, inputValue: false },
        maybeValue: 'T | null',
      },
    },
  },
};

export default config;
