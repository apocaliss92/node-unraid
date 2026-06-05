import type { UnraidHttp } from '../transport/http.js';
import type { SubscribeFn } from '../transport/ws.js';
import { mapIterable } from '../support/async-iterable.js';
import { MINIMUM_API_VERSION, isApiVersionSupported } from '../support/version-gate.js';
import {
  SystemVersionsDocument,
  SystemInfoDocument,
  SystemMetricsCpuSubDocument,
  SystemMetricsMemorySubDocument,
  type SystemVersionsQuery,
  type SystemInfoQuery,
  type SystemMetricsCpuSubSubscription,
  type SystemMetricsMemorySubSubscription,
} from '../generated/sdk.js';

/** Unraid/API/kernel version strings. */
export type CoreVersions = SystemVersionsQuery['info']['versions']['core'];
/** Full system information: os, cpu, memory, baseboard, system, versions, devices. */
export type SystemInfo = SystemInfoQuery['info'];
/** Live CPU utilisation. */
export type CpuMetrics = SystemMetricsCpuSubSubscription['systemMetricsCpu'];
/** Live memory utilisation. */
export type MemoryMetrics = SystemMetricsMemorySubSubscription['systemMetricsMemory'];

/** Result of checking the server's API version against this client's target. */
export interface ApiSupport {
  /** The server's reported API version (or `null` if unavailable). */
  readonly apiVersion: string | null;
  /** The minimum API version this client targets. */
  readonly minimum: string;
  /** Whether the server meets the minimum (true when it cannot be determined). */
  readonly supported: boolean;
}

export interface SystemDomain {
  /** The server's Unraid, API, and kernel version strings. */
  versions(): Promise<CoreVersions>;
  /** Full hardware/OS information. */
  info(): Promise<SystemInfo>;
  /** Check whether the server's API version meets this client's target. */
  checkApiSupport(): Promise<ApiSupport>;
  /** Live CPU utilisation stream. */
  cpu$(): AsyncIterable<CpuMetrics>;
  /** Live memory utilisation stream. */
  memory$(): AsyncIterable<MemoryMetrics>;
}

export function createSystemDomain(http: UnraidHttp, subscribe: SubscribeFn): SystemDomain {
  return {
    async versions(): Promise<CoreVersions> {
      const result = await http.request(SystemVersionsDocument);
      return result.info.versions.core;
    },
    async info(): Promise<SystemInfo> {
      const result = await http.request(SystemInfoDocument);
      return result.info;
    },
    async checkApiSupport(): Promise<ApiSupport> {
      const result = await http.request(SystemVersionsDocument);
      const apiVersion = result.info.versions.core.api;
      return {
        apiVersion,
        minimum: MINIMUM_API_VERSION,
        supported: apiVersion === null ? true : isApiVersionSupported(apiVersion),
      };
    },
    cpu$(): AsyncIterable<CpuMetrics> {
      return mapIterable(subscribe(SystemMetricsCpuSubDocument), (r) => r.systemMetricsCpu);
    },
    memory$(): AsyncIterable<MemoryMetrics> {
      return mapIterable(subscribe(SystemMetricsMemorySubDocument), (r) => r.systemMetricsMemory);
    },
  };
}
