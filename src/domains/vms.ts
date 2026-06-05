import type { UnraidHttp } from '../transport/http.js';
import {
  VmsListDocument,
  VmStartDocument,
  VmStopDocument,
  VmPauseDocument,
  VmResumeDocument,
  VmForceStopDocument,
  VmRebootDocument,
  VmResetDocument,
  type VmsListQuery,
} from '../generated/sdk.js';

/** A virtual machine domain with its current state. */
export type VmDomain = NonNullable<VmsListQuery['vms']['domains']>[number];

export interface VmsDomain {
  /** All VM domains and their states (empty when the host runs no VMs). */
  list(): Promise<VmDomain[]>;
  /** Start a VM. */
  start(id: string): Promise<boolean | null>;
  /** Gracefully stop a VM. */
  stop(id: string): Promise<boolean | null>;
  /** Pause a VM. */
  pause(id: string): Promise<boolean | null>;
  /** Resume a paused VM. */
  resume(id: string): Promise<boolean | null>;
  /** Force-stop (power off) a VM. */
  forceStop(id: string): Promise<boolean | null>;
  /** Reboot a VM. */
  reboot(id: string): Promise<boolean | null>;
  /** Reset a VM. */
  reset(id: string): Promise<boolean | null>;
}

export function createVmsDomain(http: UnraidHttp): VmsDomain {
  return {
    async list(): Promise<VmDomain[]> {
      const result = await http.request(VmsListDocument);
      return result.vms.domains ?? [];
    },
    async start(id: string): Promise<boolean | null> {
      return (await http.request(VmStartDocument, { id })).vm.start;
    },
    async stop(id: string): Promise<boolean | null> {
      return (await http.request(VmStopDocument, { id })).vm.stop;
    },
    async pause(id: string): Promise<boolean | null> {
      return (await http.request(VmPauseDocument, { id })).vm.pause;
    },
    async resume(id: string): Promise<boolean | null> {
      return (await http.request(VmResumeDocument, { id })).vm.resume;
    },
    async forceStop(id: string): Promise<boolean | null> {
      return (await http.request(VmForceStopDocument, { id })).vm.forceStop;
    },
    async reboot(id: string): Promise<boolean | null> {
      return (await http.request(VmRebootDocument, { id })).vm.reboot;
    },
    async reset(id: string): Promise<boolean | null> {
      return (await http.request(VmResetDocument, { id })).vm.reset;
    },
  };
}
