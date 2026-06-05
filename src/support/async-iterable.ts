/** Lazily transform each value of an async iterable (used to unwrap subscription payloads). */
export async function* mapIterable<T, R>(
  source: AsyncIterable<T>,
  select: (value: T) => R,
): AsyncIterable<R> {
  for await (const value of source) {
    yield select(value);
  }
}
