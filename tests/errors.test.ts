import { describe, it, expect } from 'vitest';
import {
  mapError,
  UnraidError,
  UnraidAuthError,
  UnraidApiError,
  UnraidTransportError,
} from '../src/errors.js';

describe('mapError', () => {
  it('maps HTTP 401 to UnraidAuthError with status', () => {
    const err = mapError({ response: { status: 401 } });
    expect(err).toBeInstanceOf(UnraidAuthError);
    expect((err as UnraidAuthError).status).toBe(401);
    expect(err.message).toContain('ADMIN');
  });

  it('maps HTTP 403 to UnraidAuthError', () => {
    const err = mapError({ response: { status: 403, errors: [{ message: 'forbidden' }] } });
    expect(err).toBeInstanceOf(UnraidAuthError);
    expect((err as UnraidAuthError).status).toBe(403);
  });

  it('maps a GraphQL errors[] payload to UnraidApiError', () => {
    const err = mapError({
      response: { status: 200, errors: [{ message: 'Field x not found', path: ['x'] }] },
    });
    expect(err).toBeInstanceOf(UnraidApiError);
    expect(err.message).toBe('Field x not found');
    expect((err as UnraidApiError).errors).toHaveLength(1);
    expect((err as UnraidApiError).errors[0]?.path).toEqual(['x']);
  });

  it('filters out malformed GraphQL error entries', () => {
    const err = mapError({
      response: { status: 200, errors: [{ nope: true }, { message: 'real' }] },
    });
    expect(err).toBeInstanceOf(UnraidApiError);
    expect((err as UnraidApiError).errors).toHaveLength(1);
    expect((err as UnraidApiError).errors[0]?.message).toBe('real');
  });

  it('maps a network error (no response) to UnraidTransportError', () => {
    const err = mapError(new TypeError('fetch failed'));
    expect(err).toBeInstanceOf(UnraidTransportError);
    expect(err.message).toBe('fetch failed');
    expect(err.cause).toBeInstanceOf(TypeError);
  });

  it('maps an unknown non-error value to UnraidTransportError', () => {
    const err = mapError('boom');
    expect(err).toBeInstanceOf(UnraidTransportError);
    expect(err.message).toBe('Unraid transport error');
  });

  it('passes an existing UnraidError through unchanged', () => {
    const original = new UnraidApiError('x', { errors: [{ message: 'x' }] });
    expect(mapError(original)).toBe(original);
  });

  it('treats an empty errors[] as a transport error, not an API error', () => {
    const err = mapError({ response: { status: 200, errors: [] } });
    expect(err).toBeInstanceOf(UnraidTransportError);
  });
});

describe('UnraidError base', () => {
  it('records the cause when provided', () => {
    const cause = new Error('root');
    expect(new UnraidError('msg', { cause }).cause).toBe(cause);
  });

  it('has no cause when none provided', () => {
    expect(new UnraidError('msg').cause).toBeUndefined();
  });

  it('sets the subclass name', () => {
    expect(new UnraidTransportError('t').name).toBe('UnraidTransportError');
    expect(new UnraidAuthError('a').name).toBe('UnraidAuthError');
  });
});
