import type { UnraidHttp } from '../transport/http.js';
import type { SubscribeFn } from '../transport/ws.js';
import { mapIterable } from '../support/async-iterable.js';
import {
  NotificationsOverviewDocument,
  NotificationsListDocument,
  NotificationsWarningsAndAlertsDocument,
  NotificationArchiveDocument,
  NotificationUnreadDocument,
  NotificationArchiveAllDocument,
  NotificationDeleteDocument,
  NotificationDeleteArchivedDocument,
  NotificationCreateDocument,
  NotificationAddedSubDocument,
  type NotificationsOverviewQuery,
  type NotificationFieldsFragment,
  type NotificationArchiveMutation,
} from '../generated/sdk.js';
import type {
  NotificationFilter,
  NotificationData,
  NotificationImportance,
  NotificationType,
} from '../generated/graphql-types.js';

/** A notification entry. */
export type Notification = NotificationFieldsFragment;
/** Unread/archive notification counts by importance. */
export type NotificationOverview = NotificationsOverviewQuery['notifications']['overview'];
/** The minimal notification shape returned by archive/unread. */
export type NotificationActionResult = NotificationArchiveMutation['archiveNotification'];

export type { NotificationFilter, NotificationData };

export interface NotificationsDomain {
  /** Unread and archived notification counts. */
  overview(): Promise<NotificationOverview>;
  /** A page of notifications matching the filter (type/offset/limit required). */
  list(filter: NotificationFilter): Promise<Notification[]>;
  /** Current warnings and alerts. */
  warningsAndAlerts(): Promise<Notification[]>;
  /** Archive a single notification. */
  archive(id: string): Promise<NotificationActionResult>;
  /** Mark a notification unread. */
  unread(id: string): Promise<NotificationActionResult>;
  /** Archive all notifications (optionally only of a given importance). */
  archiveAll(importance?: NotificationImportance): Promise<NotificationOverview>;
  /** Delete a notification of a given type. */
  delete(id: string, type: NotificationType): Promise<NotificationOverview>;
  /** Delete all archived notifications. */
  deleteArchived(): Promise<NotificationOverview>;
  /** Create a notification. */
  create(input: NotificationData): Promise<Notification>;
  /** Live stream of newly-added notifications. */
  added$(): AsyncIterable<Notification>;
}

export function createNotificationsDomain(
  http: UnraidHttp,
  subscribe: SubscribeFn,
): NotificationsDomain {
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
    async archive(id: string): Promise<NotificationActionResult> {
      const result = await http.request(NotificationArchiveDocument, { id });
      return result.archiveNotification;
    },
    async unread(id: string): Promise<NotificationActionResult> {
      const result = await http.request(NotificationUnreadDocument, { id });
      return result.unreadNotification;
    },
    async archiveAll(importance?: NotificationImportance): Promise<NotificationOverview> {
      const result = await http.request(NotificationArchiveAllDocument, {
        ...(importance !== undefined ? { importance } : {}),
      });
      return result.archiveAll;
    },
    async delete(id: string, type: NotificationType): Promise<NotificationOverview> {
      const result = await http.request(NotificationDeleteDocument, { id, type });
      return result.deleteNotification;
    },
    async deleteArchived(): Promise<NotificationOverview> {
      const result = await http.request(NotificationDeleteArchivedDocument);
      return result.deleteArchivedNotifications;
    },
    async create(input: NotificationData): Promise<Notification> {
      const result = await http.request(NotificationCreateDocument, { input });
      return result.createNotification;
    },
    added$(): AsyncIterable<Notification> {
      return mapIterable(subscribe(NotificationAddedSubDocument), (r) => r.notificationAdded);
    },
  };
}
