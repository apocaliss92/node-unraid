import { describe, it, expect } from 'vitest';
import { UnraidClient } from '../src/index.js';

// Each domain method is a thin wrapper over one GraphQL document. We exercise the
// real HTTP transport with a fake fetch that returns a canned GraphQL JSON body,
// so the document is actually executed and the typed result is unwrapped.
function clientReturning(data: unknown): UnraidClient {
  const fetchImpl: typeof fetch = async () =>
    new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  return new UnraidClient({ host: 'h', apiKey: 'k', fetch: fetchImpl });
}

describe('docker domain', () => {
  it('list() returns the containers with typed state', async () => {
    const u = clientReturning({
      docker: { id: 'd', containers: [{ id: 'c1', names: ['/app'], state: 'RUNNING' }] },
    });
    const containers = await u.docker.list();
    expect(containers).toHaveLength(1);
    expect(containers[0]?.state).toBe('RUNNING');
    expect(containers[0]?.names).toEqual(['/app']);
  });

  it('get() unwraps the single container (or null)', async () => {
    const u = clientReturning({ docker: { container: { id: 'c1', state: 'EXITED' } } });
    expect((await u.docker.get('c1'))?.state).toBe('EXITED');
    const none = clientReturning({ docker: { container: null } });
    expect(await none.docker.get('x')).toBeNull();
  });

  it('networks() returns the networks', async () => {
    const u = clientReturning({ docker: { networks: [{ id: 'n1', name: 'bridge' }] } });
    expect((await u.docker.networks())[0]?.name).toBe('bridge');
  });
});

describe('array domain', () => {
  it('get() returns state, capacity, and disks', async () => {
    const u = clientReturning({
      array: {
        id: 'a',
        state: 'STARTED',
        capacity: {
          kilobytes: { free: '1', used: '2', total: '3' },
          disks: { free: '0', used: '1', total: '1' },
        },
        parityCheckStatus: { status: 'COMPLETED' },
        boot: null,
        parities: [],
        disks: [{ id: 'd1', name: 'disk1', status: 'DISK_OK', type: 'DATA' }],
        caches: [],
      },
    });
    const arr = await u.array.get();
    expect(arr.state).toBe('STARTED');
    expect(arr.capacity.kilobytes.total).toBe('3');
    expect(arr.disks[0]?.status).toBe('DISK_OK');
  });

  it('parityHistory() returns records', async () => {
    const u = clientReturning({ parityHistory: [{ status: 'COMPLETED', errors: 0 }] });
    expect((await u.array.parityHistory())[0]?.status).toBe('COMPLETED');
  });
});

describe('disks domain', () => {
  it('list() returns physical disks with SMART status', async () => {
    const u = clientReturning({
      disks: [
        { id: 'd1', device: 'sda', smartStatus: 'OK', interfaceType: 'SATA', partitions: [] },
      ],
    });
    const disks = await u.disks.list();
    expect(disks[0]?.smartStatus).toBe('OK');
    expect(disks[0]?.interfaceType).toBe('SATA');
  });

  it('get() returns a single disk', async () => {
    const u = clientReturning({ disk: { id: 'd1', device: 'sdb', partitions: [] } });
    expect((await u.disks.get('d1')).device).toBe('sdb');
  });

  it('assignable() returns disks', async () => {
    const u = clientReturning({ assignableDisks: [{ id: 'd9', device: 'sdz', partitions: [] }] });
    expect((await u.disks.assignable())[0]?.device).toBe('sdz');
  });
});

describe('system domain', () => {
  it('versions() returns the core versions', async () => {
    const u = clientReturning({
      info: { versions: { core: { unraid: '7.3.1', api: '4.34.0', kernel: 'k' } } },
    });
    expect((await u.system.versions()).unraid).toBe('7.3.1');
  });

  it('info() returns os/cpu/system', async () => {
    const u = clientReturning({
      info: {
        id: 'i',
        time: 't',
        os: { hostname: 'Tower' },
        cpu: { cores: 8 },
        memory: { layout: [] },
        baseboard: {},
        system: {},
        versions: { core: {}, packages: {} },
        devices: { gpu: [], network: [], pci: [], usb: [] },
      },
    });
    const info = await u.system.info();
    expect(info.os.hostname).toBe('Tower');
    expect(info.cpu.cores).toBe(8);
  });
});

describe('vms domain', () => {
  it('list() returns domains', async () => {
    const u = clientReturning({
      vms: { id: 'v', domains: [{ id: 'vm1', name: 'win', state: 'RUNNING' }] },
    });
    expect((await u.vms.list())[0]?.state).toBe('RUNNING');
  });

  it('list() tolerates a null domains list', async () => {
    const u = clientReturning({ vms: { id: 'v', domains: null } });
    expect(await u.vms.list()).toEqual([]);
  });
});

describe('shares domain', () => {
  it('list() returns shares', async () => {
    const u = clientReturning({ shares: [{ id: 's1', name: 'appdata', size: '100' }] });
    expect((await u.shares.list())[0]?.name).toBe('appdata');
  });
});

describe('ups domain', () => {
  it('list() returns devices with battery + power', async () => {
    const u = clientReturning({
      upsDevices: [
        { id: 'u1', name: 'apc', battery: { chargeLevel: 100 }, power: { loadPercentage: 10 } },
      ],
    });
    const list = await u.ups.list();
    expect(list[0]?.battery.chargeLevel).toBe(100);
    expect(list[0]?.power.loadPercentage).toBe(10);
  });

  it('get() returns a device or null', async () => {
    const u = clientReturning({ upsDeviceById: { id: 'u1', name: 'apc', battery: {}, power: {} } });
    expect((await u.ups.get('u1'))?.name).toBe('apc');
  });
});

describe('notifications domain', () => {
  it('overview() returns unread/archive counts', async () => {
    const u = clientReturning({
      notifications: {
        id: 'n',
        overview: {
          unread: { info: 1, warning: 0, alert: 0, total: 1 },
          archive: { info: 0, warning: 0, alert: 0, total: 0 },
        },
      },
    });
    expect((await u.notifications.overview()).unread.total).toBe(1);
  });

  it('list() passes the filter and returns entries', async () => {
    const u = clientReturning({
      notifications: { id: 'n', list: [{ id: 'e1', importance: 'WARNING', type: 'UNREAD' }] },
    });
    const items = await u.notifications.list({ type: 'UNREAD', offset: 0, limit: 10 });
    expect(items[0]?.importance).toBe('WARNING');
  });

  it('warningsAndAlerts() returns entries', async () => {
    const u = clientReturning({
      notifications: {
        id: 'n',
        warningsAndAlerts: [{ id: 'e2', importance: 'ALERT', type: 'UNREAD' }],
      },
    });
    expect((await u.notifications.warningsAndAlerts())[0]?.importance).toBe('ALERT');
  });
});

describe('server domain', () => {
  it('info() returns status + urls', async () => {
    const u = clientReturning({
      server: { id: 's', name: 'Tower', status: 'ONLINE', lanip: '192.168.1.89' },
    });
    const info = await u.server.info();
    expect(info?.status).toBe('ONLINE');
    expect(info?.lanip).toBe('192.168.1.89');
  });

  it('registration() returns license details', async () => {
    const u = clientReturning({
      registration: { id: 'r', type: 'PRO', state: 'PRO', expiration: null },
    });
    expect((await u.server.registration())?.type).toBe('PRO');
  });
});
