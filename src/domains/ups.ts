import type { UnraidHttp } from '../transport/http.js';
import type { SubscribeFn } from '../transport/ws.js';
import { mapIterable } from '../support/async-iterable.js';
import {
  UpsListDocument,
  UpsByIdDocument,
  UpsUpdatesSubDocument,
  type UpsDeviceFieldsFragment,
  type UpsUpdatesSubSubscription,
} from '../generated/sdk.js';

/** A UPS device with battery and power readings. */
export type UpsDevice = UpsDeviceFieldsFragment;
/** A live UPS update payload. */
export type UpsUpdate = UpsUpdatesSubSubscription['upsUpdates'];

export interface UpsDomain {
  /** All connected UPS devices. */
  list(): Promise<UpsDevice[]>;
  /** A single UPS device by id, or `null` if not found. */
  get(id: string): Promise<UpsDevice | null>;
  /** Live stream of UPS updates. */
  updates$(): AsyncIterable<UpsUpdate>;
}

export function createUpsDomain(http: UnraidHttp, subscribe: SubscribeFn): UpsDomain {
  return {
    async list(): Promise<UpsDevice[]> {
      const result = await http.request(UpsListDocument);
      return result.upsDevices;
    },
    async get(id: string): Promise<UpsDevice | null> {
      const result = await http.request(UpsByIdDocument, { id });
      return result.upsDeviceById;
    },
    updates$(): AsyncIterable<UpsUpdate> {
      return mapIterable(subscribe(UpsUpdatesSubDocument), (r) => r.upsUpdates);
    },
  };
}
