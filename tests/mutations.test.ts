import { describe, it, expect } from 'vitest';
import { UnraidClient } from '../src/index.js';

// Mutations go through the HTTP transport like reads; we return a canned GraphQL
// body and assert the unwrapped result + that the variables reach the request.
function clientCapturing(data: unknown): { client: UnraidClient; bodies: string[] } {
  const bodies: string[] = [];
  const fetchImpl: typeof fetch = async (_input, init) => {
    bodies.push(typeof init?.body === 'string' ? init.body : '');
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  };
  return { client: new UnraidClient({ host: 'h', apiKey: 'k', fetch: fetchImpl }), bodies };
}

describe('docker mutations', () => {
  it('start() returns the updated container and sends the id', async () => {
    const { client, bodies } = clientCapturing({
      docker: { start: { id: 'c1', state: 'RUNNING', status: 'Up' } },
    });
    const result = await client.docker.start('c1');
    expect(result.state).toBe('RUNNING');
    expect(bodies[0]).toContain('c1');
    expect(bodies[0]).toContain('DockerStart');
  });

  it('stop/pause/unpause/update return the container', async () => {
    for (const [method, key] of [
      ['stop', 'stop'],
      ['pause', 'pause'],
      ['unpause', 'unpause'],
      ['update', 'updateContainer'],
    ] as const) {
      const { client } = clientCapturing({ docker: { [key]: { id: 'c1', state: 'EXITED' } } });
      const result = await client.docker[method]('c1');
      expect(result.id).toBe('c1');
    }
  });

  it('remove() returns the boolean and passes withImage', async () => {
    const { client, bodies } = clientCapturing({ docker: { removeContainer: true } });
    expect(await client.docker.remove('c1', true)).toBe(true);
    expect(bodies[0]).toContain('withImage');
  });
});

describe('array + parity mutations', () => {
  it('setState() returns the array and sends the desiredState', async () => {
    const { client, bodies } = clientCapturing({
      array: { setState: { id: 'a', state: 'STARTED' } },
    });
    const result = await client.array.setState({ desiredState: 'START' });
    expect(result.state).toBe('STARTED');
    expect(bodies[0]).toContain('START');
  });

  it('mountDisk/unmountDisk return the disk', async () => {
    const mount = clientCapturing({ array: { mountArrayDisk: { id: 'd1', status: 'DISK_OK' } } });
    expect((await mount.client.array.mountDisk('d1')).status).toBe('DISK_OK');
    const unmount = clientCapturing({
      array: { unmountArrayDisk: { id: 'd1', status: 'DISK_OK' } },
    });
    expect((await unmount.client.array.unmountDisk('d1')).id).toBe('d1');
  });

  it('clearDiskStatistics() returns the boolean', async () => {
    const { client } = clientCapturing({ array: { clearArrayDiskStatistics: true } });
    expect(await client.array.clearDiskStatistics('d1')).toBe(true);
  });

  it('parity start/pause/resume/cancel return the payload', async () => {
    const start = clientCapturing({ parityCheck: { start: { ok: true } } });
    expect(await start.client.array.parity.start(true)).toEqual({ ok: true });
    expect(start.bodies[0]).toContain('correct');
    const pause = clientCapturing({ parityCheck: { pause: { ok: 1 } } });
    expect(await pause.client.array.parity.pause()).toEqual({ ok: 1 });
    const resume = clientCapturing({ parityCheck: { resume: null } });
    expect(await resume.client.array.parity.resume()).toBeNull();
    const cancel = clientCapturing({ parityCheck: { cancel: null } });
    expect(await cancel.client.array.parity.cancel()).toBeNull();
  });
});

describe('vm mutations', () => {
  it('every action returns the boolean and sends the id', async () => {
    for (const [method, key] of [
      ['start', 'start'],
      ['stop', 'stop'],
      ['pause', 'pause'],
      ['resume', 'resume'],
      ['forceStop', 'forceStop'],
      ['reboot', 'reboot'],
      ['reset', 'reset'],
    ] as const) {
      const { client, bodies } = clientCapturing({ vm: { [key]: true } });
      expect(await client.vms[method]('vm1')).toBe(true);
      expect(bodies[0]).toContain('vm1');
    }
  });
});

describe('notification mutations', () => {
  it('archive/unread return the notification', async () => {
    const archive = clientCapturing({ archiveNotification: { id: 'e1', type: 'ARCHIVE' } });
    expect((await archive.client.notifications.archive('e1')).type).toBe('ARCHIVE');
    const unread = clientCapturing({ unreadNotification: { id: 'e1', type: 'UNREAD' } });
    expect((await unread.client.notifications.unread('e1')).type).toBe('UNREAD');
  });

  it('archiveAll passes importance when given', async () => {
    const overview = {
      unread: { info: 0, warning: 0, alert: 0, total: 0 },
      archive: { info: 1, warning: 0, alert: 0, total: 1 },
    };
    const { client, bodies } = clientCapturing({ archiveAll: overview });
    expect((await client.notifications.archiveAll('WARNING')).archive.total).toBe(1);
    expect(bodies[0]).toContain('WARNING');
  });

  it('delete/deleteArchived return an overview', async () => {
    const overview = {
      unread: { info: 0, warning: 0, alert: 0, total: 0 },
      archive: { info: 0, warning: 0, alert: 0, total: 0 },
    };
    const del = clientCapturing({ deleteNotification: overview });
    expect((await del.client.notifications.delete('e1', 'UNREAD')).unread.total).toBe(0);
    const delArch = clientCapturing({ deleteArchivedNotifications: overview });
    expect((await delArch.client.notifications.deleteArchived()).archive.total).toBe(0);
  });

  it('create() returns the new notification', async () => {
    const { client } = clientCapturing({
      createNotification: { id: 'e9', title: 'hi', importance: 'INFO', type: 'UNREAD' },
    });
    const created = await client.notifications.create({
      title: 'hi',
      subject: 's',
      description: 'd',
      importance: 'INFO',
    });
    expect(created.title).toBe('hi');
  });
});
