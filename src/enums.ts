// Curated re-export of the GraphQL enums that are part of the public surface.
// These are real runtime enums (generated), so consumers can both compare against
// them (`state === ContainerState.Running`) and read their values.

export {
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
} from './generated/sdk.js';
