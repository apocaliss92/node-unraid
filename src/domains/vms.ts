import type { UnraidHttp } from '../transport/http.js';
import { VmsListDocument, type VmsListQuery } from '../generated/sdk.js';

/** A virtual machine domain with its current state. */
export type VmDomain = NonNullable<VmsListQuery['vms']['domains']>[number];

export interface VmsDomain {
  /** All VM domains and their states (empty when the host runs no VMs). */
  list(): Promise<VmDomain[]>;
}

export function createVmsDomain(http: UnraidHttp): VmsDomain {
  return {
    async list(): Promise<VmDomain[]> {
      const result = await http.request(VmsListDocument);
      return result.vms.domains ?? [];
    },
  };
}
