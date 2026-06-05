import type { UnraidHttp } from '../transport/http.js';
import {
  ServerInfoDocument,
  ServerRegistrationDocument,
  type ServerInfoQuery,
  type ServerRegistrationQuery,
} from '../generated/sdk.js';

/** Server identity and network status. */
export type ServerInfo = ServerInfoQuery['server'];
/** License registration details. */
export type Registration = ServerRegistrationQuery['registration'];

export interface ServerDomain {
  /** Server status, name, and LAN/WAN URLs (or `null` when unavailable). */
  info(): Promise<ServerInfo>;
  /** License type, state, and expiration (or `null` when unavailable). */
  registration(): Promise<Registration>;
}

export function createServerDomain(http: UnraidHttp): ServerDomain {
  return {
    async info(): Promise<ServerInfo> {
      const result = await http.request(ServerInfoDocument);
      return result.server;
    },
    async registration(): Promise<Registration> {
      const result = await http.request(ServerRegistrationDocument);
      return result.registration;
    },
  };
}
