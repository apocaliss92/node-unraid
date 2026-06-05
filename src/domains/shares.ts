import type { UnraidHttp } from '../transport/http.js';
import { SharesListDocument, type SharesListQuery } from '../generated/sdk.js';

/** A user share with its allocation settings. */
export type Share = SharesListQuery['shares'][number];

export interface SharesDomain {
  /** All user shares. */
  list(): Promise<Share[]>;
}

export function createSharesDomain(http: UnraidHttp): SharesDomain {
  return {
    async list(): Promise<Share[]> {
      const result = await http.request(SharesListDocument);
      return result.shares;
    },
  };
}
