import type { UnraidHttp } from '../transport/http.js';
import {
  NotificationsOverviewDocument,
  NotificationsListDocument,
  NotificationsWarningsAndAlertsDocument,
  type NotificationsOverviewQuery,
  type NotificationFieldsFragment,
} from '../generated/sdk.js';
import type { NotificationFilter } from '../generated/graphql-types.js';

/** A notification entry. */
export type Notification = NotificationFieldsFragment;
/** Unread/archive notification counts by importance. */
export type NotificationOverview = NotificationsOverviewQuery['notifications']['overview'];

export type { NotificationFilter };

export interface NotificationsDomain {
  /** Unread and archived notification counts. */
  overview(): Promise<NotificationOverview>;
  /** A page of notifications matching the filter (type/offset/limit required). */
  list(filter: NotificationFilter): Promise<Notification[]>;
  /** Current warnings and alerts. */
  warningsAndAlerts(): Promise<Notification[]>;
}

export function createNotificationsDomain(http: UnraidHttp): NotificationsDomain {
  return {
    async overview(): Promise<NotificationOverview> {
      const result = await http.request(NotificationsOverviewDocument);
      return result.notifications.overview;
    },
    async list(filter: NotificationFilter): Promise<Notification[]> {
      const result = await http.request(NotificationsListDocument, { filter });
      return result.notifications.list;
    },
    async warningsAndAlerts(): Promise<Notification[]> {
      const result = await http.request(NotificationsWarningsAndAlertsDocument);
      return result.notifications.warningsAndAlerts;
    },
  };
}
