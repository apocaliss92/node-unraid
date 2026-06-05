import type { UnraidHttp } from '../transport/http.js';
import {
  ArrayGetDocument,
  ArrayParityHistoryDocument,
  ArraySetStateDocument,
  ArrayMountDiskDocument,
  ArrayUnmountDiskDocument,
  ArrayClearDiskStatisticsDocument,
  ParityCheckStartDocument,
  ParityCheckPauseDocument,
  ParityCheckResumeDocument,
  ParityCheckCancelDocument,
  type ArrayGetQuery,
  type ArrayDiskFieldsFragment,
  type ParityCheckFieldsFragment,
  type ArraySetStateMutation,
  type ArrayMountDiskMutation,
} from '../generated/sdk.js';
import type { ArrayStateInput } from '../generated/graphql-types.js';

/** The array, its state, capacity, parity status, and member disks. */
export type ArrayInfo = ArrayGetQuery['array'];
/** A single array slot (data/parity/cache/boot disk). */
export type ArrayDisk = ArrayDiskFieldsFragment;
/** A parity check record. */
export type ParityCheck = ParityCheckFieldsFragment;
/** The minimal array shape returned by `setState`. */
export type ArraySetStateResult = ArraySetStateMutation['array']['setState'];
/** The minimal disk shape returned by mount/unmount. */
export type ArrayDiskActionResult = ArrayMountDiskMutation['array']['mountArrayDisk'];

export type { ArrayStateInput };

/** Parity check control sub-namespace. */
export interface ParityControl {
  /** Start a parity check (`correct` writes corrections to parity). */
  start(correct: boolean): Promise<unknown>;
  /** Pause a running parity check. */
  pause(): Promise<unknown>;
  /** Resume a paused parity check. */
  resume(): Promise<unknown>;
  /** Cancel a running parity check. */
  cancel(): Promise<unknown>;
}

export interface ArrayDomain {
  /** Array state, capacity, current parity check, and all member disks. */
  get(): Promise<ArrayInfo>;
  /** History of completed parity checks. */
  parityHistory(): Promise<ParityCheck[]>;
  /** Start or stop the array. */
  setState(input: ArrayStateInput): Promise<ArraySetStateResult>;
  /** Mount an array disk. */
  mountDisk(id: string): Promise<ArrayDiskActionResult>;
  /** Unmount an array disk. */
  unmountDisk(id: string): Promise<ArrayDiskActionResult>;
  /** Clear a disk's read/write/error statistics. */
  clearDiskStatistics(id: string): Promise<boolean | null>;
  /** Parity check control. */
  readonly parity: ParityControl;
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
    async setState(input: ArrayStateInput): Promise<ArraySetStateResult> {
      const result = await http.request(ArraySetStateDocument, { input });
      return result.array.setState;
    },
    async mountDisk(id: string): Promise<ArrayDiskActionResult> {
      const result = await http.request(ArrayMountDiskDocument, { id });
      return result.array.mountArrayDisk;
    },
    async unmountDisk(id: string): Promise<ArrayDiskActionResult> {
      const result = await http.request(ArrayUnmountDiskDocument, { id });
      return result.array.unmountArrayDisk;
    },
    async clearDiskStatistics(id: string): Promise<boolean | null> {
      const result = await http.request(ArrayClearDiskStatisticsDocument, { id });
      return result.array.clearArrayDiskStatistics;
    },
    parity: {
      async start(correct: boolean): Promise<unknown> {
        const result = await http.request(ParityCheckStartDocument, { correct });
        return result.parityCheck.start;
      },
      async pause(): Promise<unknown> {
        const result = await http.request(ParityCheckPauseDocument);
        return result.parityCheck.pause;
      },
      async resume(): Promise<unknown> {
        const result = await http.request(ParityCheckResumeDocument);
        return result.parityCheck.resume;
      },
      async cancel(): Promise<unknown> {
        const result = await http.request(ParityCheckCancelDocument);
        return result.parityCheck.cancel;
      },
    },
  };
}
