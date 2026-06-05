// Curated re-export of the GraphQL enums that are part of the public surface.
// These are string-literal union types (e.g. `ContainerState = 'RUNNING' | ...`),
// so consumers compare with the literal (`state === 'RUNNING'`) and annotate with
// the named type. Operation result fields use the same members, so they line up.

export type {
  ContainerState,
  ContainerPortType,
  ArrayState,
  ArrayDiskStatus,
  ArrayDiskType,
  ArrayDiskFsColor,
  DiskSmartStatus,
  DiskInterfaceType,
  DiskFsType,
  VmState,
  ParityCheckStatus,
  NotificationImportance,
  NotificationType,
  UpdateStatus,
  ServerStatus,
  RegistrationState,
  TemperatureUnit,
  UpsCableType,
  UpsType,
} from './generated/graphql-types.js';
