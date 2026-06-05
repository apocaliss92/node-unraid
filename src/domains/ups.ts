import type { UnraidHttp } from '../transport/http.js';
import {
  UpsListDocument,
  UpsByIdDocument,
  type UpsDeviceFieldsFragment,
} from '../generated/sdk.js';

/** A UPS device with battery and power readings. */
export type UpsDevice = UpsDeviceFieldsFragment;

export interface UpsDomain {
  /** All connected UPS devices. */
  list(): Promise<UpsDevice[]>;
  /** A single UPS device by id, or `null` if not found. */
  get(id: string): Promise<UpsDevice | null>;
}

export function createUpsDomain(http: UnraidHttp): UpsDomain {
  return {
    async list(): Promise<UpsDevice[]> {
      const result = await http.request(UpsListDocument);
      return result.upsDevices;
    },
    async get(id: string): Promise<UpsDevice | null> {
      const result = await http.request(UpsByIdDocument, { id });
      return result.upsDeviceById;
    },
  };
}
