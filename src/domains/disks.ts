import type { UnraidHttp } from '../transport/http.js';
import {
  DisksListDocument,
  DiskByIdDocument,
  AssignableDisksDocument,
  type DiskFieldsFragment,
} from '../generated/sdk.js';

/** A physical disk with SMART status and partitions. */
export type Disk = DiskFieldsFragment;

export interface DisksDomain {
  /** All physical disks known to the server. */
  list(): Promise<Disk[]>;
  /** A single physical disk by id. */
  get(id: string): Promise<Disk>;
  /** Disks that can be assigned to the array. */
  assignable(): Promise<Disk[]>;
}

export function createDisksDomain(http: UnraidHttp): DisksDomain {
  return {
    async list(): Promise<Disk[]> {
      const result = await http.request(DisksListDocument);
      return result.disks;
    },
    async get(id: string): Promise<Disk> {
      const result = await http.request(DiskByIdDocument, { id });
      return result.disk;
    },
    async assignable(): Promise<Disk[]> {
      const result = await http.request(AssignableDisksDocument);
      return result.assignableDisks;
    },
  };
}
