import type { UnraidHttp } from '../transport/http.js';
import {
  SystemVersionsDocument,
  SystemInfoDocument,
  type SystemVersionsQuery,
  type SystemInfoQuery,
} from '../generated/sdk.js';

/** Unraid/API/kernel version strings. */
export type CoreVersions = SystemVersionsQuery['info']['versions']['core'];
/** Full system information: os, cpu, memory, baseboard, system, versions, devices. */
export type SystemInfo = SystemInfoQuery['info'];

export interface SystemDomain {
  /** The server's Unraid, API, and kernel version strings. */
  versions(): Promise<CoreVersions>;
  /** Full hardware/OS information. */
  info(): Promise<SystemInfo>;
}

export function createSystemDomain(http: UnraidHttp): SystemDomain {
  return {
    async versions(): Promise<CoreVersions> {
      const result = await http.request(SystemVersionsDocument);
      return result.info.versions.core;
    },
    async info(): Promise<SystemInfo> {
      const result = await http.request(SystemInfoDocument);
      return result.info;
    },
  };
}
