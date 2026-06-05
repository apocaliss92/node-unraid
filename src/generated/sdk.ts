/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ArrayDiskFsColor =
  | 'BLUE_BLINK'
  | 'BLUE_ON'
  | 'GREEN_BLINK'
  | 'GREEN_ON'
  | 'GREY_OFF'
  | 'RED_OFF'
  | 'RED_ON'
  | 'YELLOW_BLINK'
  | 'YELLOW_ON';

export type ArrayDiskStatus =
  | 'DISK_DSBL'
  | 'DISK_DSBL_NEW'
  | 'DISK_INVALID'
  | 'DISK_NEW'
  | 'DISK_NP'
  | 'DISK_NP_DSBL'
  | 'DISK_NP_MISSING'
  | 'DISK_OK'
  | 'DISK_WRONG';

export type ArrayDiskType =
  | 'BOOT'
  | 'CACHE'
  | 'DATA'
  | 'FLASH'
  | 'PARITY';

export type ArrayState =
  | 'DISABLE_DISK'
  | 'INVALID_EXPANSION'
  | 'NEW_ARRAY'
  | 'NEW_DISK_TOO_SMALL'
  | 'NO_DATA_DISKS'
  | 'PARITY_NOT_BIGGEST'
  | 'RECON_DISK'
  | 'STARTED'
  | 'STOPPED'
  | 'SWAP_DSBL'
  | 'TOO_MANY_MISSING_DISKS';

export type ArrayStateInput = {
  /** Optional keyfile contents used to unlock encrypted array disks when starting the array. Accepts a data URL or raw base64 payload. */
  decryptionKeyfile?: string | null | undefined;
  /** Optional password used to unlock encrypted array disks when starting the array */
  decryptionPassword?: string | null | undefined;
  /** Array state */
  desiredState: ArrayStateInputState;
};

export type ArrayStateInputState =
  | 'START'
  | 'STOP';

export type ContainerPortType =
  | 'TCP'
  | 'UDP';

export type ContainerState =
  | 'EXITED'
  | 'PAUSED'
  | 'RUNNING';

/** The type of filesystem on the disk partition */
export type DiskFsType =
  | 'BTRFS'
  | 'EXT4'
  | 'NTFS'
  | 'VFAT'
  | 'XFS'
  | 'ZFS';

/** The type of interface the disk uses to connect to the system */
export type DiskInterfaceType =
  | 'PCIE'
  | 'SAS'
  | 'SATA'
  | 'UNKNOWN'
  | 'USB';

/** The SMART (Self-Monitoring, Analysis and Reporting Technology) status of the disk */
export type DiskSmartStatus =
  | 'OK'
  | 'UNKNOWN';

export type NotificationData = {
  description: string;
  importance: NotificationImportance;
  link?: string | null | undefined;
  subject: string;
  title: string;
};

export type NotificationFilter = {
  importance?: NotificationImportance | null | undefined;
  limit: number;
  offset: number;
  type: NotificationType;
};

export type NotificationImportance =
  | 'ALERT'
  | 'INFO'
  | 'WARNING';

export type NotificationType =
  | 'ARCHIVE'
  | 'UNREAD';

export type ParityCheckStatus =
  | 'CANCELLED'
  | 'COMPLETED'
  | 'FAILED'
  | 'NEVER_RUN'
  | 'PAUSED'
  | 'RUNNING';

export type RegistrationState =
  | 'BASIC'
  | 'EBLACKLISTED'
  | 'EBLACKLISTED1'
  | 'EBLACKLISTED2'
  | 'EEXPIRED'
  | 'EGUID'
  | 'EGUID1'
  | 'ENOCONN'
  | 'ENOFLASH'
  | 'ENOFLASH1'
  | 'ENOFLASH2'
  | 'ENOFLASH3'
  | 'ENOFLASH4'
  | 'ENOFLASH5'
  | 'ENOFLASH6'
  | 'ENOFLASH7'
  | 'ENOKEYFILE'
  | 'ENOKEYFILE1'
  | 'ENOKEYFILE2'
  | 'ETRIAL'
  | 'LIFETIME'
  | 'PLUS'
  | 'PRO'
  | 'STARTER'
  | 'TRIAL'
  | 'UNLEASHED';

export type ServerStatus =
  | 'NEVER_CONNECTED'
  | 'OFFLINE'
  | 'ONLINE';

/** The state of a virtual machine */
export type VmState =
  | 'CRASHED'
  | 'IDLE'
  | 'NOSTATE'
  | 'PAUSED'
  | 'PMSUSPENDED'
  | 'RUNNING'
  | 'SHUTDOWN'
  | 'SHUTOFF';

export type RegistrationType =
  | 'BASIC'
  | 'INVALID'
  | 'LIFETIME'
  | 'PLUS'
  | 'PRO'
  | 'STARTER'
  | 'TRIAL'
  | 'UNLEASHED';

export type ArrayDiskFieldsFragment = { id: string, idx: number, name: string | null, device: string | null, size: string | null, status: ArrayDiskStatus | null, rotational: boolean | null, temp: number | null, numReads: string | null, numWrites: string | null, numErrors: string | null, fsSize: string | null, fsFree: string | null, fsUsed: string | null, exportable: boolean | null, type: ArrayDiskType, warning: number | null, critical: number | null, fsType: string | null, comment: string | null, format: string | null, transport: string | null, color: ArrayDiskFsColor | null, isSpinning: boolean | null };

export type ParityCheckFieldsFragment = { date: string | null, duration: number | null, speed: string | null, status: ParityCheckStatus, errors: number | null, progress: number | null, correcting: boolean | null, paused: boolean | null, running: boolean | null };

export type ArrayGetQueryVariables = Exact<{ [key: string]: never; }>;


export type ArrayGetQuery = { array: { id: string, state: ArrayState, capacity: { kilobytes: { free: string, used: string, total: string }, disks: { free: string, used: string, total: string } }, parityCheckStatus: { date: string | null, duration: number | null, speed: string | null, status: ParityCheckStatus, errors: number | null, progress: number | null, correcting: boolean | null, paused: boolean | null, running: boolean | null }, boot: { id: string, idx: number, name: string | null, device: string | null, size: string | null, status: ArrayDiskStatus | null, rotational: boolean | null, temp: number | null, numReads: string | null, numWrites: string | null, numErrors: string | null, fsSize: string | null, fsFree: string | null, fsUsed: string | null, exportable: boolean | null, type: ArrayDiskType, warning: number | null, critical: number | null, fsType: string | null, comment: string | null, format: string | null, transport: string | null, color: ArrayDiskFsColor | null, isSpinning: boolean | null } | null, parities: Array<{ id: string, idx: number, name: string | null, device: string | null, size: string | null, status: ArrayDiskStatus | null, rotational: boolean | null, temp: number | null, numReads: string | null, numWrites: string | null, numErrors: string | null, fsSize: string | null, fsFree: string | null, fsUsed: string | null, exportable: boolean | null, type: ArrayDiskType, warning: number | null, critical: number | null, fsType: string | null, comment: string | null, format: string | null, transport: string | null, color: ArrayDiskFsColor | null, isSpinning: boolean | null }>, disks: Array<{ id: string, idx: number, name: string | null, device: string | null, size: string | null, status: ArrayDiskStatus | null, rotational: boolean | null, temp: number | null, numReads: string | null, numWrites: string | null, numErrors: string | null, fsSize: string | null, fsFree: string | null, fsUsed: string | null, exportable: boolean | null, type: ArrayDiskType, warning: number | null, critical: number | null, fsType: string | null, comment: string | null, format: string | null, transport: string | null, color: ArrayDiskFsColor | null, isSpinning: boolean | null }>, caches: Array<{ id: string, idx: number, name: string | null, device: string | null, size: string | null, status: ArrayDiskStatus | null, rotational: boolean | null, temp: number | null, numReads: string | null, numWrites: string | null, numErrors: string | null, fsSize: string | null, fsFree: string | null, fsUsed: string | null, exportable: boolean | null, type: ArrayDiskType, warning: number | null, critical: number | null, fsType: string | null, comment: string | null, format: string | null, transport: string | null, color: ArrayDiskFsColor | null, isSpinning: boolean | null }> } };

export type ArrayParityHistoryQueryVariables = Exact<{ [key: string]: never; }>;


export type ArrayParityHistoryQuery = { parityHistory: Array<{ date: string | null, duration: number | null, speed: string | null, status: ParityCheckStatus, errors: number | null, progress: number | null, correcting: boolean | null, paused: boolean | null, running: boolean | null }> };

export type DiskFieldsFragment = { id: string, device: string, type: string, name: string, vendor: string, size: number, firmwareRevision: string, serialNum: string, interfaceType: DiskInterfaceType, smartStatus: DiskSmartStatus, temperature: number | null, isSpinning: boolean, partitions: Array<{ name: string, fsType: DiskFsType, size: number }> };

export type DisksListQueryVariables = Exact<{ [key: string]: never; }>;


export type DisksListQuery = { disks: Array<{ id: string, device: string, type: string, name: string, vendor: string, size: number, firmwareRevision: string, serialNum: string, interfaceType: DiskInterfaceType, smartStatus: DiskSmartStatus, temperature: number | null, isSpinning: boolean, partitions: Array<{ name: string, fsType: DiskFsType, size: number }> }> };

export type DiskByIdQueryVariables = Exact<{
  id: string;
}>;


export type DiskByIdQuery = { disk: { id: string, device: string, type: string, name: string, vendor: string, size: number, firmwareRevision: string, serialNum: string, interfaceType: DiskInterfaceType, smartStatus: DiskSmartStatus, temperature: number | null, isSpinning: boolean, partitions: Array<{ name: string, fsType: DiskFsType, size: number }> } };

export type AssignableDisksQueryVariables = Exact<{ [key: string]: never; }>;


export type AssignableDisksQuery = { assignableDisks: Array<{ id: string, device: string, type: string, name: string, vendor: string, size: number, firmwareRevision: string, serialNum: string, interfaceType: DiskInterfaceType, smartStatus: DiskSmartStatus, temperature: number | null, isSpinning: boolean, partitions: Array<{ name: string, fsType: DiskFsType, size: number }> }> };

export type DockerContainerFieldsFragment = { id: string, names: Array<string>, image: string, imageId: string, command: string, created: number, state: ContainerState, status: string, autoStart: boolean, autoStartOrder: number | null, labels: unknown, networkSettings: unknown, mounts: Array<unknown> | null, sizeRootFs: string | null, sizeRw: string | null, templatePath: string | null, projectUrl: string | null, registryUrl: string | null, supportUrl: string | null, iconUrl: string | null, webUiUrl: string | null, isOrphaned: boolean, isUpdateAvailable: boolean | null, isRebuildReady: boolean | null, ports: Array<{ ip: string | null, privatePort: number | null, publicPort: number | null, type: ContainerPortType }> };

export type DockerListQueryVariables = Exact<{ [key: string]: never; }>;


export type DockerListQuery = { docker: { id: string, containers: Array<{ id: string, names: Array<string>, image: string, imageId: string, command: string, created: number, state: ContainerState, status: string, autoStart: boolean, autoStartOrder: number | null, labels: unknown, networkSettings: unknown, mounts: Array<unknown> | null, sizeRootFs: string | null, sizeRw: string | null, templatePath: string | null, projectUrl: string | null, registryUrl: string | null, supportUrl: string | null, iconUrl: string | null, webUiUrl: string | null, isOrphaned: boolean, isUpdateAvailable: boolean | null, isRebuildReady: boolean | null, ports: Array<{ ip: string | null, privatePort: number | null, publicPort: number | null, type: ContainerPortType }> }> } };

export type DockerContainerByIdQueryVariables = Exact<{
  id: string;
}>;


export type DockerContainerByIdQuery = { docker: { container: { id: string, names: Array<string>, image: string, imageId: string, command: string, created: number, state: ContainerState, status: string, autoStart: boolean, autoStartOrder: number | null, labels: unknown, networkSettings: unknown, mounts: Array<unknown> | null, sizeRootFs: string | null, sizeRw: string | null, templatePath: string | null, projectUrl: string | null, registryUrl: string | null, supportUrl: string | null, iconUrl: string | null, webUiUrl: string | null, isOrphaned: boolean, isUpdateAvailable: boolean | null, isRebuildReady: boolean | null, ports: Array<{ ip: string | null, privatePort: number | null, publicPort: number | null, type: ContainerPortType }> } | null } };

export type DockerNetworksQueryVariables = Exact<{ [key: string]: never; }>;


export type DockerNetworksQuery = { docker: { networks: Array<{ id: string, name: string, created: string, scope: string, driver: string, enableIPv6: boolean, internal: boolean, attachable: boolean, ingress: boolean, configOnly: boolean, options: unknown, labels: unknown }> } };

export type DockerStartMutationVariables = Exact<{
  id: string;
}>;


export type DockerStartMutation = { docker: { start: { id: string, state: ContainerState, status: string } } };

export type DockerStopMutationVariables = Exact<{
  id: string;
}>;


export type DockerStopMutation = { docker: { stop: { id: string, state: ContainerState, status: string } } };

export type DockerPauseMutationVariables = Exact<{
  id: string;
}>;


export type DockerPauseMutation = { docker: { pause: { id: string, state: ContainerState, status: string } } };

export type DockerUnpauseMutationVariables = Exact<{
  id: string;
}>;


export type DockerUnpauseMutation = { docker: { unpause: { id: string, state: ContainerState, status: string } } };

export type DockerUpdateContainerMutationVariables = Exact<{
  id: string;
}>;


export type DockerUpdateContainerMutation = { docker: { updateContainer: { id: string, state: ContainerState, status: string } } };

export type DockerRemoveContainerMutationVariables = Exact<{
  id: string;
  withImage?: boolean | null | undefined;
}>;


export type DockerRemoveContainerMutation = { docker: { removeContainer: boolean } };

export type ArraySetStateMutationVariables = Exact<{
  input: ArrayStateInput;
}>;


export type ArraySetStateMutation = { array: { setState: { id: string, state: ArrayState } } };

export type ArrayMountDiskMutationVariables = Exact<{
  id: string;
}>;


export type ArrayMountDiskMutation = { array: { mountArrayDisk: { id: string, status: ArrayDiskStatus | null } } };

export type ArrayUnmountDiskMutationVariables = Exact<{
  id: string;
}>;


export type ArrayUnmountDiskMutation = { array: { unmountArrayDisk: { id: string, status: ArrayDiskStatus | null } } };

export type ArrayClearDiskStatisticsMutationVariables = Exact<{
  id: string;
}>;


export type ArrayClearDiskStatisticsMutation = { array: { clearArrayDiskStatistics: boolean } };

export type ParityCheckStartMutationVariables = Exact<{
  correct: boolean;
}>;


export type ParityCheckStartMutation = { parityCheck: { start: unknown } };

export type ParityCheckPauseMutationVariables = Exact<{ [key: string]: never; }>;


export type ParityCheckPauseMutation = { parityCheck: { pause: unknown } };

export type ParityCheckResumeMutationVariables = Exact<{ [key: string]: never; }>;


export type ParityCheckResumeMutation = { parityCheck: { resume: unknown } };

export type ParityCheckCancelMutationVariables = Exact<{ [key: string]: never; }>;


export type ParityCheckCancelMutation = { parityCheck: { cancel: unknown } };

export type VmStartMutationVariables = Exact<{
  id: string;
}>;


export type VmStartMutation = { vm: { start: boolean } };

export type VmStopMutationVariables = Exact<{
  id: string;
}>;


export type VmStopMutation = { vm: { stop: boolean } };

export type VmPauseMutationVariables = Exact<{
  id: string;
}>;


export type VmPauseMutation = { vm: { pause: boolean } };

export type VmResumeMutationVariables = Exact<{
  id: string;
}>;


export type VmResumeMutation = { vm: { resume: boolean } };

export type VmForceStopMutationVariables = Exact<{
  id: string;
}>;


export type VmForceStopMutation = { vm: { forceStop: boolean } };

export type VmRebootMutationVariables = Exact<{
  id: string;
}>;


export type VmRebootMutation = { vm: { reboot: boolean } };

export type VmResetMutationVariables = Exact<{
  id: string;
}>;


export type VmResetMutation = { vm: { reset: boolean } };

export type NotificationArchiveMutationVariables = Exact<{
  id: string;
}>;


export type NotificationArchiveMutation = { archiveNotification: { id: string, type: NotificationType } };

export type NotificationUnreadMutationVariables = Exact<{
  id: string;
}>;


export type NotificationUnreadMutation = { unreadNotification: { id: string, type: NotificationType } };

export type NotificationArchiveAllMutationVariables = Exact<{
  importance?: NotificationImportance | null | undefined;
}>;


export type NotificationArchiveAllMutation = { archiveAll: { unread: { info: number, warning: number, alert: number, total: number }, archive: { info: number, warning: number, alert: number, total: number } } };

export type NotificationDeleteMutationVariables = Exact<{
  id: string;
  type: NotificationType;
}>;


export type NotificationDeleteMutation = { deleteNotification: { unread: { info: number, warning: number, alert: number, total: number }, archive: { info: number, warning: number, alert: number, total: number } } };

export type NotificationDeleteArchivedMutationVariables = Exact<{ [key: string]: never; }>;


export type NotificationDeleteArchivedMutation = { deleteArchivedNotifications: { unread: { info: number, warning: number, alert: number, total: number }, archive: { info: number, warning: number, alert: number, total: number } } };

export type NotificationCreateMutationVariables = Exact<{
  input: NotificationData;
}>;


export type NotificationCreateMutation = { createNotification: { id: string, title: string, subject: string, description: string, importance: NotificationImportance, link: string | null, type: NotificationType, timestamp: string | null, formattedTimestamp: string | null } };

export type NotificationCountsFieldsFragment = { info: number, warning: number, alert: number, total: number };

export type NotificationFieldsFragment = { id: string, title: string, subject: string, description: string, importance: NotificationImportance, link: string | null, type: NotificationType, timestamp: string | null, formattedTimestamp: string | null };

export type NotificationsOverviewQueryVariables = Exact<{ [key: string]: never; }>;


export type NotificationsOverviewQuery = { notifications: { id: string, overview: { unread: { info: number, warning: number, alert: number, total: number }, archive: { info: number, warning: number, alert: number, total: number } } } };

export type NotificationsListQueryVariables = Exact<{
  filter: NotificationFilter;
}>;


export type NotificationsListQuery = { notifications: { id: string, list: Array<{ id: string, title: string, subject: string, description: string, importance: NotificationImportance, link: string | null, type: NotificationType, timestamp: string | null, formattedTimestamp: string | null }> } };

export type NotificationsWarningsAndAlertsQueryVariables = Exact<{ [key: string]: never; }>;


export type NotificationsWarningsAndAlertsQuery = { notifications: { id: string, warningsAndAlerts: Array<{ id: string, title: string, subject: string, description: string, importance: NotificationImportance, link: string | null, type: NotificationType, timestamp: string | null, formattedTimestamp: string | null }> } };

export type ServerInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type ServerInfoQuery = { server: { id: string, name: string, guid: string, comment: string | null, status: ServerStatus, wanip: string, lanip: string, localurl: string, remoteurl: string } | null };

export type ServerRegistrationQueryVariables = Exact<{ [key: string]: never; }>;


export type ServerRegistrationQuery = { registration: { id: string, type: RegistrationType | null, state: RegistrationState | null, expiration: string | null, updateExpiration: string | null } | null };

export type SharesListQueryVariables = Exact<{ [key: string]: never; }>;


export type SharesListQuery = { shares: Array<{ id: string, name: string | null, free: string | null, used: string | null, size: string | null, include: Array<string> | null, exclude: Array<string> | null, cache: boolean | null, nameOrig: string | null, comment: string | null, allocator: string | null, splitLevel: string | null, floor: string | null, cow: string | null, color: string | null, luksStatus: string | null }> };

export type DockerContainerStatsSubSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type DockerContainerStatsSubSubscription = { dockerContainerStats: { id: string, cpuPercent: number, memUsage: string, memPercent: number, netIO: string, blockIO: string } };

export type NotificationAddedSubSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NotificationAddedSubSubscription = { notificationAdded: { id: string, title: string, subject: string, description: string, importance: NotificationImportance, link: string | null, type: NotificationType, timestamp: string | null, formattedTimestamp: string | null } };

export type UpsUpdatesSubSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type UpsUpdatesSubSubscription = { upsUpdates: { id: string, name: string, model: string, status: string, battery: { chargeLevel: number, estimatedRuntime: number, health: string }, power: { inputVoltage: number, outputVoltage: number, loadPercentage: number, nominalPower: number | null, currentPower: number | null } } };

export type SystemMetricsCpuSubSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SystemMetricsCpuSubSubscription = { systemMetricsCpu: { id: string, percentTotal: number } };

export type SystemMetricsMemorySubSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SystemMetricsMemorySubSubscription = { systemMetricsMemory: { id: string, total: string, used: string, free: string, available: string, percentTotal: number, swapTotal: string, swapUsed: string, swapFree: string } };

export type SystemVersionsQueryVariables = Exact<{ [key: string]: never; }>;


export type SystemVersionsQuery = { info: { versions: { core: { unraid: string | null, api: string | null, kernel: string | null } } } };

export type SystemInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type SystemInfoQuery = { info: { id: string, time: string, os: { platform: string | null, distro: string | null, release: string | null, codename: string | null, kernel: string | null, arch: string | null, hostname: string | null, build: string | null, uptime: string | null, serial: string | null, uefi: boolean | null }, cpu: { manufacturer: string | null, brand: string | null, vendor: string | null, family: string | null, model: string | null, stepping: number | null, revision: string | null, speed: number | null, speedmin: number | null, speedmax: number | null, threads: number | null, cores: number | null, processors: number | null, socket: string | null, flags: Array<string> | null }, memory: { layout: Array<{ size: string, bank: string | null, type: string | null, clockSpeed: number | null, manufacturer: string | null, formFactor: string | null, partNum: string | null }> }, baseboard: { manufacturer: string | null, model: string | null, version: string | null, serial: string | null, assetTag: string | null, memMax: number | null, memSlots: number | null }, system: { manufacturer: string | null, model: string | null, version: string | null, serial: string | null, uuid: string | null, sku: string | null, virtual: boolean | null }, versions: { core: { unraid: string | null, api: string | null, kernel: string | null }, packages: { docker: string | null, node: string | null, npm: string | null, php: string | null, nginx: string | null, openssl: string | null } | null }, devices: { network: Array<{ iface: string, model: string | null, vendor: string | null, mac: string | null, speed: string | null, dhcp: boolean | null }> | null, pci: Array<{ vendorname: string | null, productname: string | null, class: string }> | null, usb: Array<{ name: string, bus: string | null, device: string | null }> | null } } };

export type UpsDeviceFieldsFragment = { id: string, name: string, model: string, status: string, battery: { chargeLevel: number, estimatedRuntime: number, health: string }, power: { inputVoltage: number, outputVoltage: number, loadPercentage: number, nominalPower: number | null, currentPower: number | null } };

export type UpsListQueryVariables = Exact<{ [key: string]: never; }>;


export type UpsListQuery = { upsDevices: Array<{ id: string, name: string, model: string, status: string, battery: { chargeLevel: number, estimatedRuntime: number, health: string }, power: { inputVoltage: number, outputVoltage: number, loadPercentage: number, nominalPower: number | null, currentPower: number | null } }> };

export type UpsByIdQueryVariables = Exact<{
  id: string;
}>;


export type UpsByIdQuery = { upsDeviceById: { id: string, name: string, model: string, status: string, battery: { chargeLevel: number, estimatedRuntime: number, health: string }, power: { inputVoltage: number, outputVoltage: number, loadPercentage: number, nominalPower: number | null, currentPower: number | null } } | null };

export type VmsListQueryVariables = Exact<{ [key: string]: never; }>;


export type VmsListQuery = { vms: { id: string, domains: Array<{ id: string, name: string | null, state: VmState }> | null } };

export const ArrayDiskFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ArrayDiskFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ArrayDisk"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"idx"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"device"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"rotational"}},{"kind":"Field","name":{"kind":"Name","value":"temp"}},{"kind":"Field","name":{"kind":"Name","value":"numReads"}},{"kind":"Field","name":{"kind":"Name","value":"numWrites"}},{"kind":"Field","name":{"kind":"Name","value":"numErrors"}},{"kind":"Field","name":{"kind":"Name","value":"fsSize"}},{"kind":"Field","name":{"kind":"Name","value":"fsFree"}},{"kind":"Field","name":{"kind":"Name","value":"fsUsed"}},{"kind":"Field","name":{"kind":"Name","value":"exportable"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"warning"}},{"kind":"Field","name":{"kind":"Name","value":"critical"}},{"kind":"Field","name":{"kind":"Name","value":"fsType"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"transport"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isSpinning"}}]}}]} as unknown as DocumentNode<ArrayDiskFieldsFragment, unknown>;
export const ParityCheckFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ParityCheckFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParityCheck"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"speed"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"correcting"}},{"kind":"Field","name":{"kind":"Name","value":"paused"}},{"kind":"Field","name":{"kind":"Name","value":"running"}}]}}]} as unknown as DocumentNode<ParityCheckFieldsFragment, unknown>;
export const DiskFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DiskFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Disk"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"device"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"vendor"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"firmwareRevision"}},{"kind":"Field","name":{"kind":"Name","value":"serialNum"}},{"kind":"Field","name":{"kind":"Name","value":"interfaceType"}},{"kind":"Field","name":{"kind":"Name","value":"smartStatus"}},{"kind":"Field","name":{"kind":"Name","value":"temperature"}},{"kind":"Field","name":{"kind":"Name","value":"isSpinning"}},{"kind":"Field","name":{"kind":"Name","value":"partitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fsType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}}]}}]}}]} as unknown as DocumentNode<DiskFieldsFragment, unknown>;
export const DockerContainerFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DockerContainerFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DockerContainer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"names"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"imageId"}},{"kind":"Field","name":{"kind":"Name","value":"command"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"ports"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ip"}},{"kind":"Field","name":{"kind":"Name","value":"privatePort"}},{"kind":"Field","name":{"kind":"Name","value":"publicPort"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"autoStart"}},{"kind":"Field","name":{"kind":"Name","value":"autoStartOrder"}},{"kind":"Field","name":{"kind":"Name","value":"labels"}},{"kind":"Field","name":{"kind":"Name","value":"networkSettings"}},{"kind":"Field","name":{"kind":"Name","value":"mounts"}},{"kind":"Field","name":{"kind":"Name","value":"sizeRootFs"}},{"kind":"Field","name":{"kind":"Name","value":"sizeRw"}},{"kind":"Field","name":{"kind":"Name","value":"templatePath"}},{"kind":"Field","name":{"kind":"Name","value":"projectUrl"}},{"kind":"Field","name":{"kind":"Name","value":"registryUrl"}},{"kind":"Field","name":{"kind":"Name","value":"supportUrl"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"webUiUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isOrphaned"}},{"kind":"Field","name":{"kind":"Name","value":"isUpdateAvailable"}},{"kind":"Field","name":{"kind":"Name","value":"isRebuildReady"}}]}}]} as unknown as DocumentNode<DockerContainerFieldsFragment, unknown>;
export const NotificationCountsFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotificationCountsFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationCounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"warning"}},{"kind":"Field","name":{"kind":"Name","value":"alert"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]} as unknown as DocumentNode<NotificationCountsFieldsFragment, unknown>;
export const NotificationFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotificationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Notification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"importance"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"formattedTimestamp"}}]}}]} as unknown as DocumentNode<NotificationFieldsFragment, unknown>;
export const UpsDeviceFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UpsDeviceFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UPSDevice"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"battery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chargeLevel"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedRuntime"}},{"kind":"Field","name":{"kind":"Name","value":"health"}}]}},{"kind":"Field","name":{"kind":"Name","value":"power"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inputVoltage"}},{"kind":"Field","name":{"kind":"Name","value":"outputVoltage"}},{"kind":"Field","name":{"kind":"Name","value":"loadPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"nominalPower"}},{"kind":"Field","name":{"kind":"Name","value":"currentPower"}}]}}]}}]} as unknown as DocumentNode<UpsDeviceFieldsFragment, unknown>;
export const ArrayGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArrayGet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"array"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"kilobytes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"free"}},{"kind":"Field","name":{"kind":"Name","value":"used"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"disks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"free"}},{"kind":"Field","name":{"kind":"Name","value":"used"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"parityCheckStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ParityCheckFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"boot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArrayDiskFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"parities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArrayDiskFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"disks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArrayDiskFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"caches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArrayDiskFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ParityCheckFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParityCheck"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"speed"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"correcting"}},{"kind":"Field","name":{"kind":"Name","value":"paused"}},{"kind":"Field","name":{"kind":"Name","value":"running"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ArrayDiskFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ArrayDisk"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"idx"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"device"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"rotational"}},{"kind":"Field","name":{"kind":"Name","value":"temp"}},{"kind":"Field","name":{"kind":"Name","value":"numReads"}},{"kind":"Field","name":{"kind":"Name","value":"numWrites"}},{"kind":"Field","name":{"kind":"Name","value":"numErrors"}},{"kind":"Field","name":{"kind":"Name","value":"fsSize"}},{"kind":"Field","name":{"kind":"Name","value":"fsFree"}},{"kind":"Field","name":{"kind":"Name","value":"fsUsed"}},{"kind":"Field","name":{"kind":"Name","value":"exportable"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"warning"}},{"kind":"Field","name":{"kind":"Name","value":"critical"}},{"kind":"Field","name":{"kind":"Name","value":"fsType"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"transport"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isSpinning"}}]}}]} as unknown as DocumentNode<ArrayGetQuery, ArrayGetQueryVariables>;
export const ArrayParityHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArrayParityHistory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parityHistory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ParityCheckFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ParityCheckFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ParityCheck"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"speed"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"correcting"}},{"kind":"Field","name":{"kind":"Name","value":"paused"}},{"kind":"Field","name":{"kind":"Name","value":"running"}}]}}]} as unknown as DocumentNode<ArrayParityHistoryQuery, ArrayParityHistoryQueryVariables>;
export const DisksListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DisksList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"disks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DiskFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DiskFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Disk"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"device"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"vendor"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"firmwareRevision"}},{"kind":"Field","name":{"kind":"Name","value":"serialNum"}},{"kind":"Field","name":{"kind":"Name","value":"interfaceType"}},{"kind":"Field","name":{"kind":"Name","value":"smartStatus"}},{"kind":"Field","name":{"kind":"Name","value":"temperature"}},{"kind":"Field","name":{"kind":"Name","value":"isSpinning"}},{"kind":"Field","name":{"kind":"Name","value":"partitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fsType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}}]}}]}}]} as unknown as DocumentNode<DisksListQuery, DisksListQueryVariables>;
export const DiskByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DiskById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrefixedID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"disk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DiskFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DiskFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Disk"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"device"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"vendor"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"firmwareRevision"}},{"kind":"Field","name":{"kind":"Name","value":"serialNum"}},{"kind":"Field","name":{"kind":"Name","value":"interfaceType"}},{"kind":"Field","name":{"kind":"Name","value":"smartStatus"}},{"kind":"Field","name":{"kind":"Name","value":"temperature"}},{"kind":"Field","name":{"kind":"Name","value":"isSpinning"}},{"kind":"Field","name":{"kind":"Name","value":"partitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fsType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}}]}}]}}]} as unknown as DocumentNode<DiskByIdQuery, DiskByIdQueryVariables>;
export const AssignableDisksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AssignableDisks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignableDisks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DiskFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DiskFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Disk"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"device"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"vendor"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"firmwareRevision"}},{"kind":"Field","name":{"kind":"Name","value":"serialNum"}},{"kind":"Field","name":{"kind":"Name","value":"interfaceType"}},{"kind":"Field","name":{"kind":"Name","value":"smartStatus"}},{"kind":"Field","name":{"kind":"Name","value":"temperature"}},{"kind":"Field","name":{"kind":"Name","value":"isSpinning"}},{"kind":"Field","name":{"kind":"Name","value":"partitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fsType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}}]}}]}}]} as unknown as DocumentNode<AssignableDisksQuery, AssignableDisksQueryVariables>;
export const DockerListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DockerList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"containers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DockerContainerFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DockerContainerFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DockerContainer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"names"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"imageId"}},{"kind":"Field","name":{"kind":"Name","value":"command"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"ports"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ip"}},{"kind":"Field","name":{"kind":"Name","value":"privatePort"}},{"kind":"Field","name":{"kind":"Name","value":"publicPort"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"autoStart"}},{"kind":"Field","name":{"kind":"Name","value":"autoStartOrder"}},{"kind":"Field","name":{"kind":"Name","value":"labels"}},{"kind":"Field","name":{"kind":"Name","value":"networkSettings"}},{"kind":"Field","name":{"kind":"Name","value":"mounts"}},{"kind":"Field","name":{"kind":"Name","value":"sizeRootFs"}},{"kind":"Field","name":{"kind":"Name","value":"sizeRw"}},{"kind":"Field","name":{"kind":"Name","value":"templatePath"}},{"kind":"Field","name":{"kind":"Name","value":"projectUrl"}},{"kind":"Field","name":{"kind":"Name","value":"registryUrl"}},{"kind":"Field","name":{"kind":"Name","value":"supportUrl"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"webUiUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isOrphaned"}},{"kind":"Field","name":{"kind":"Name","value":"isUpdateAvailable"}},{"kind":"Field","name":{"kind":"Name","value":"isRebuildReady"}}]}}]} as unknown as DocumentNode<DockerListQuery, DockerListQueryVariables>;
export const DockerContainerByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DockerContainerById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrefixedID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"container"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DockerContainerFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DockerContainerFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DockerContainer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"names"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"imageId"}},{"kind":"Field","name":{"kind":"Name","value":"command"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"ports"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ip"}},{"kind":"Field","name":{"kind":"Name","value":"privatePort"}},{"kind":"Field","name":{"kind":"Name","value":"publicPort"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"autoStart"}},{"kind":"Field","name":{"kind":"Name","value":"autoStartOrder"}},{"kind":"Field","name":{"kind":"Name","value":"labels"}},{"kind":"Field","name":{"kind":"Name","value":"networkSettings"}},{"kind":"Field","name":{"kind":"Name","value":"mounts"}},{"kind":"Field","name":{"kind":"Name","value":"sizeRootFs"}},{"kind":"Field","name":{"kind":"Name","value":"sizeRw"}},{"kind":"Field","name":{"kind":"Name","value":"templatePath"}},{"kind":"Field","name":{"kind":"Name","value":"projectUrl"}},{"kind":"Field","name":{"kind":"Name","value":"registryUrl"}},{"kind":"Field","name":{"kind":"Name","value":"supportUrl"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"webUiUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isOrphaned"}},{"kind":"Field","name":{"kind":"Name","value":"isUpdateAvailable"}},{"kind":"Field","name":{"kind":"Name","value":"isRebuildReady"}}]}}]} as unknown as DocumentNode<DockerContainerByIdQuery, DockerContainerByIdQueryVariables>;
export const DockerNetworksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DockerNetworks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"scope"}},{"kind":"Field","name":{"kind":"Name","value":"driver"}},{"kind":"Field","name":{"kind":"Name","value":"enableIPv6"}},{"kind":"Field","name":{"kind":"Name","value":"internal"}},{"kind":"Field","name":{"kind":"Name","value":"attachable"}},{"kind":"Field","name":{"kind":"Name","value":"ingress"}},{"kind":"Field","name":{"kind":"Name","value":"configOnly"}},{"kind":"Field","name":{"kind":"Name","value":"options"}},{"kind":"Field","name":{"kind":"Name","value":"labels"}}]}}]}}]}}]} as unknown as DocumentNode<DockerNetworksQuery, DockerNetworksQueryVariables>;
export const DockerStartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DockerStart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrefixedID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"start"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<DockerStartMutation, DockerStartMutationVariables>;
export const DockerStopDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DockerStop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrefixedID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<DockerStopMutation, DockerStopMutationVariables>;
export const DockerPauseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DockerPause"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrefixedID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pause"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<DockerPauseMutation, DockerPauseMutationVariables>;
export const DockerUnpauseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DockerUnpause"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrefixedID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unpause"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<DockerUnpauseMutation, DockerUnpauseMutationVariables>;
export const DockerUpdateContainerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DockerUpdateContainer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrefixedID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateContainer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<DockerUpdateContainerMutation, DockerUpdateContainerMutationVariables>;
export const DockerRemoveContainerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DockerRemoveContainer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrefixedID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"withImage"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeContainer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"withImage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"withImage"}}}]}]}}]}}]} as unknown as DocumentNode<DockerRemoveContainerMutation, DockerRemoveContainerMutationVariables>;
export const ArraySetStateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ArraySetState"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArrayStateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"array"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setState"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]}}]}}]} as unknown as DocumentNode<ArraySetStateMutation, ArraySetStateMutationVariables>;
export const ArrayMountDiskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ArrayMountDisk"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrefixedID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"array"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mountArrayDisk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<ArrayMountDiskMutation, ArrayMountDiskMutationVariables>;
export const ArrayUnmountDiskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ArrayUnmountDisk"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrefixedID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"array"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unmountArrayDisk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<ArrayUnmountDiskMutation, ArrayUnmountDiskMutationVariables>;
export const ArrayClearDiskStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ArrayClearDiskStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrefixedID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"array"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clearArrayDiskStatistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]} as unknown as DocumentNode<ArrayClearDiskStatisticsMutation, ArrayClearDiskStatisticsMutationVariables>;
export const ParityCheckStartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ParityCheckStart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"correct"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parityCheck"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"start"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"correct"},"value":{"kind":"Variable","name":{"kind":"Name","value":"correct"}}}]}]}}]}}]} as unknown as DocumentNode<ParityCheckStartMutation, ParityCheckStartMutationVariables>;
export const ParityCheckPauseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ParityCheckPause"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parityCheck"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pause"}}]}}]}}]} as unknown as DocumentNode<ParityCheckPauseMutation, ParityCheckPauseMutationVariables>;
export const ParityCheckResumeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ParityCheckResume"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parityCheck"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resume"}}]}}]}}]} as unknown as DocumentNode<ParityCheckResumeMutation, ParityCheckResumeMutationVariables>;
export const ParityCheckCancelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ParityCheckCancel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parityCheck"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancel"}}]}}]}}]} as unknown as DocumentNode<ParityCheckCancelMutation, ParityCheckCancelMutationVariables>;
export const VmStartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VmStart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrefixedID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"start"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]} as unknown as DocumentNode<VmStartMutation, VmStartMutationVariables>;
export const VmStopDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VmStop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrefixedID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]} as unknown as DocumentNode<VmStopMutation, VmStopMutationVariables>;
export const VmPauseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VmPause"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrefixedID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pause"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]} as unknown as DocumentNode<VmPauseMutation, VmPauseMutationVariables>;
export const VmResumeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VmResume"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrefixedID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resume"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]} as unknown as DocumentNode<VmResumeMutation, VmResumeMutationVariables>;
export const VmForceStopDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VmForceStop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrefixedID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forceStop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]} as unknown as DocumentNode<VmForceStopMutation, VmForceStopMutationVariables>;
export const VmRebootDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VmReboot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrefixedID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reboot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]} as unknown as DocumentNode<VmRebootMutation, VmRebootMutationVariables>;
export const VmResetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VmReset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrefixedID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]} as unknown as DocumentNode<VmResetMutation, VmResetMutationVariables>;
export const NotificationArchiveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"NotificationArchive"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrefixedID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"archiveNotification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<NotificationArchiveMutation, NotificationArchiveMutationVariables>;
export const NotificationUnreadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"NotificationUnread"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrefixedID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unreadNotification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<NotificationUnreadMutation, NotificationUnreadMutationVariables>;
export const NotificationArchiveAllDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"NotificationArchiveAll"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"importance"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationImportance"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"archiveAll"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"importance"},"value":{"kind":"Variable","name":{"kind":"Name","value":"importance"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unread"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotificationCountsFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"archive"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotificationCountsFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotificationCountsFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationCounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"warning"}},{"kind":"Field","name":{"kind":"Name","value":"alert"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]} as unknown as DocumentNode<NotificationArchiveAllMutation, NotificationArchiveAllMutationVariables>;
export const NotificationDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"NotificationDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrefixedID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteNotification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unread"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotificationCountsFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"archive"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotificationCountsFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotificationCountsFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationCounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"warning"}},{"kind":"Field","name":{"kind":"Name","value":"alert"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]} as unknown as DocumentNode<NotificationDeleteMutation, NotificationDeleteMutationVariables>;
export const NotificationDeleteArchivedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"NotificationDeleteArchived"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteArchivedNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unread"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotificationCountsFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"archive"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotificationCountsFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotificationCountsFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationCounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"warning"}},{"kind":"Field","name":{"kind":"Name","value":"alert"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]} as unknown as DocumentNode<NotificationDeleteArchivedMutation, NotificationDeleteArchivedMutationVariables>;
export const NotificationCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"NotificationCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationData"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createNotification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotificationFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotificationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Notification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"importance"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"formattedTimestamp"}}]}}]} as unknown as DocumentNode<NotificationCreateMutation, NotificationCreateMutationVariables>;
export const NotificationsOverviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NotificationsOverview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"overview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unread"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotificationCountsFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"archive"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotificationCountsFields"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotificationCountsFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationCounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"warning"}},{"kind":"Field","name":{"kind":"Name","value":"alert"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]} as unknown as DocumentNode<NotificationsOverviewQuery, NotificationsOverviewQueryVariables>;
export const NotificationsListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NotificationsList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"list"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotificationFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotificationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Notification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"importance"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"formattedTimestamp"}}]}}]} as unknown as DocumentNode<NotificationsListQuery, NotificationsListQueryVariables>;
export const NotificationsWarningsAndAlertsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NotificationsWarningsAndAlerts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"warningsAndAlerts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotificationFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotificationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Notification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"importance"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"formattedTimestamp"}}]}}]} as unknown as DocumentNode<NotificationsWarningsAndAlertsQuery, NotificationsWarningsAndAlertsQueryVariables>;
export const ServerInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ServerInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"server"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"guid"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"wanip"}},{"kind":"Field","name":{"kind":"Name","value":"lanip"}},{"kind":"Field","name":{"kind":"Name","value":"localurl"}},{"kind":"Field","name":{"kind":"Name","value":"remoteurl"}}]}}]}}]} as unknown as DocumentNode<ServerInfoQuery, ServerInfoQueryVariables>;
export const ServerRegistrationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ServerRegistration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"expiration"}},{"kind":"Field","name":{"kind":"Name","value":"updateExpiration"}}]}}]}}]} as unknown as DocumentNode<ServerRegistrationQuery, ServerRegistrationQueryVariables>;
export const SharesListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SharesList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"free"}},{"kind":"Field","name":{"kind":"Name","value":"used"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"include"}},{"kind":"Field","name":{"kind":"Name","value":"exclude"}},{"kind":"Field","name":{"kind":"Name","value":"cache"}},{"kind":"Field","name":{"kind":"Name","value":"nameOrig"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"allocator"}},{"kind":"Field","name":{"kind":"Name","value":"splitLevel"}},{"kind":"Field","name":{"kind":"Name","value":"floor"}},{"kind":"Field","name":{"kind":"Name","value":"cow"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"luksStatus"}}]}}]}}]} as unknown as DocumentNode<SharesListQuery, SharesListQueryVariables>;
export const DockerContainerStatsSubDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"DockerContainerStatsSub"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dockerContainerStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cpuPercent"}},{"kind":"Field","name":{"kind":"Name","value":"memUsage"}},{"kind":"Field","name":{"kind":"Name","value":"memPercent"}},{"kind":"Field","name":{"kind":"Name","value":"netIO"}},{"kind":"Field","name":{"kind":"Name","value":"blockIO"}}]}}]}}]} as unknown as DocumentNode<DockerContainerStatsSubSubscription, DockerContainerStatsSubSubscriptionVariables>;
export const NotificationAddedSubDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"NotificationAddedSub"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notificationAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotificationFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotificationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Notification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"importance"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"formattedTimestamp"}}]}}]} as unknown as DocumentNode<NotificationAddedSubSubscription, NotificationAddedSubSubscriptionVariables>;
export const UpsUpdatesSubDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"UpsUpdatesSub"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsUpdates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UpsDeviceFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UpsDeviceFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UPSDevice"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"battery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chargeLevel"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedRuntime"}},{"kind":"Field","name":{"kind":"Name","value":"health"}}]}},{"kind":"Field","name":{"kind":"Name","value":"power"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inputVoltage"}},{"kind":"Field","name":{"kind":"Name","value":"outputVoltage"}},{"kind":"Field","name":{"kind":"Name","value":"loadPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"nominalPower"}},{"kind":"Field","name":{"kind":"Name","value":"currentPower"}}]}}]}}]} as unknown as DocumentNode<UpsUpdatesSubSubscription, UpsUpdatesSubSubscriptionVariables>;
export const SystemMetricsCpuSubDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"SystemMetricsCpuSub"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"systemMetricsCpu"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"percentTotal"}}]}}]}}]} as unknown as DocumentNode<SystemMetricsCpuSubSubscription, SystemMetricsCpuSubSubscriptionVariables>;
export const SystemMetricsMemorySubDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"SystemMetricsMemorySub"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"systemMetricsMemory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"used"}},{"kind":"Field","name":{"kind":"Name","value":"free"}},{"kind":"Field","name":{"kind":"Name","value":"available"}},{"kind":"Field","name":{"kind":"Name","value":"percentTotal"}},{"kind":"Field","name":{"kind":"Name","value":"swapTotal"}},{"kind":"Field","name":{"kind":"Name","value":"swapUsed"}},{"kind":"Field","name":{"kind":"Name","value":"swapFree"}}]}}]}}]} as unknown as DocumentNode<SystemMetricsMemorySubSubscription, SystemMetricsMemorySubSubscriptionVariables>;
export const SystemVersionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SystemVersions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"core"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unraid"}},{"kind":"Field","name":{"kind":"Name","value":"api"}},{"kind":"Field","name":{"kind":"Name","value":"kernel"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SystemVersionsQuery, SystemVersionsQueryVariables>;
export const SystemInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SystemInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"os"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"distro"}},{"kind":"Field","name":{"kind":"Name","value":"release"}},{"kind":"Field","name":{"kind":"Name","value":"codename"}},{"kind":"Field","name":{"kind":"Name","value":"kernel"}},{"kind":"Field","name":{"kind":"Name","value":"arch"}},{"kind":"Field","name":{"kind":"Name","value":"hostname"}},{"kind":"Field","name":{"kind":"Name","value":"build"}},{"kind":"Field","name":{"kind":"Name","value":"uptime"}},{"kind":"Field","name":{"kind":"Name","value":"serial"}},{"kind":"Field","name":{"kind":"Name","value":"uefi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cpu"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"vendor"}},{"kind":"Field","name":{"kind":"Name","value":"family"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"stepping"}},{"kind":"Field","name":{"kind":"Name","value":"revision"}},{"kind":"Field","name":{"kind":"Name","value":"speed"}},{"kind":"Field","name":{"kind":"Name","value":"speedmin"}},{"kind":"Field","name":{"kind":"Name","value":"speedmax"}},{"kind":"Field","name":{"kind":"Name","value":"threads"}},{"kind":"Field","name":{"kind":"Name","value":"cores"}},{"kind":"Field","name":{"kind":"Name","value":"processors"}},{"kind":"Field","name":{"kind":"Name","value":"socket"}},{"kind":"Field","name":{"kind":"Name","value":"flags"}}]}},{"kind":"Field","name":{"kind":"Name","value":"memory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"layout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"bank"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"clockSpeed"}},{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"formFactor"}},{"kind":"Field","name":{"kind":"Name","value":"partNum"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"baseboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"serial"}},{"kind":"Field","name":{"kind":"Name","value":"assetTag"}},{"kind":"Field","name":{"kind":"Name","value":"memMax"}},{"kind":"Field","name":{"kind":"Name","value":"memSlots"}}]}},{"kind":"Field","name":{"kind":"Name","value":"system"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"serial"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"virtual"}}]}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"core"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unraid"}},{"kind":"Field","name":{"kind":"Name","value":"api"}},{"kind":"Field","name":{"kind":"Name","value":"kernel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docker"}},{"kind":"Field","name":{"kind":"Name","value":"node"}},{"kind":"Field","name":{"kind":"Name","value":"npm"}},{"kind":"Field","name":{"kind":"Name","value":"php"}},{"kind":"Field","name":{"kind":"Name","value":"nginx"}},{"kind":"Field","name":{"kind":"Name","value":"openssl"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"devices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"network"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"iface"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"vendor"}},{"kind":"Field","name":{"kind":"Name","value":"mac"}},{"kind":"Field","name":{"kind":"Name","value":"speed"}},{"kind":"Field","name":{"kind":"Name","value":"dhcp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pci"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendorname"}},{"kind":"Field","name":{"kind":"Name","value":"productname"}},{"kind":"Field","name":{"kind":"Name","value":"class"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usb"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bus"}},{"kind":"Field","name":{"kind":"Name","value":"device"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SystemInfoQuery, SystemInfoQueryVariables>;
export const UpsListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UpsList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsDevices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UpsDeviceFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UpsDeviceFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UPSDevice"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"battery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chargeLevel"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedRuntime"}},{"kind":"Field","name":{"kind":"Name","value":"health"}}]}},{"kind":"Field","name":{"kind":"Name","value":"power"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inputVoltage"}},{"kind":"Field","name":{"kind":"Name","value":"outputVoltage"}},{"kind":"Field","name":{"kind":"Name","value":"loadPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"nominalPower"}},{"kind":"Field","name":{"kind":"Name","value":"currentPower"}}]}}]}}]} as unknown as DocumentNode<UpsListQuery, UpsListQueryVariables>;
export const UpsByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UpsById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsDeviceById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UpsDeviceFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UpsDeviceFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UPSDevice"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"battery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chargeLevel"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedRuntime"}},{"kind":"Field","name":{"kind":"Name","value":"health"}}]}},{"kind":"Field","name":{"kind":"Name","value":"power"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inputVoltage"}},{"kind":"Field","name":{"kind":"Name","value":"outputVoltage"}},{"kind":"Field","name":{"kind":"Name","value":"loadPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"nominalPower"}},{"kind":"Field","name":{"kind":"Name","value":"currentPower"}}]}}]}}]} as unknown as DocumentNode<UpsByIdQuery, UpsByIdQueryVariables>;
export const VmsListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VmsList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"domains"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]}}]}}]} as unknown as DocumentNode<VmsListQuery, VmsListQueryVariables>;