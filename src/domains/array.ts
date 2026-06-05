import type { UnraidHttp } from '../transport/http.js';
import {
  ArrayGetDocument,
  ArrayParityHistoryDocument,
  type ArrayGetQuery,
  type ArrayDiskFieldsFragment,
  type ParityCheckFieldsFragment,
} from '../generated/sdk.js';

/** The array, its state, capacity, parity status, and member disks. */
export type ArrayInfo = ArrayGetQuery['array'];
/** A single array slot (data/parity/cache/boot disk). */
export type ArrayDisk = ArrayDiskFieldsFragment;
/** A parity check record. */
export type ParityCheck = ParityCheckFieldsFragment;

export interface ArrayDomain {
  /** Array state, capacity, current parity check, and all member disks. */
  get(): Promise<ArrayInfo>;
  /** History of completed parity checks. */
  parityHistory(): Promise<ParityCheck[]>;
}

export function createArrayDomain(http: UnraidHttp): ArrayDomain {
  return {
    async get(): Promise<ArrayInfo> {
      const result = await http.request(ArrayGetDocument);
      return result.array;
    },
    async parityHistory(): Promise<ParityCheck[]> {
      const result = await http.request(ArrayParityHistoryDocument);
      return result.parityHistory;
    },
  };
}
