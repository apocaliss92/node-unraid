import type { UnraidHttp } from '../transport/http.js';
import type { SubscribeFn } from '../transport/ws.js';
import { mapIterable } from '../support/async-iterable.js';
import {
  DockerListDocument,
  DockerContainerByIdDocument,
  DockerNetworksDocument,
  DockerStartDocument,
  DockerStopDocument,
  DockerPauseDocument,
  DockerUnpauseDocument,
  DockerUpdateContainerDocument,
  DockerRemoveContainerDocument,
  DockerContainerStatsSubDocument,
  type DockerContainerFieldsFragment,
  type DockerNetworksQuery,
  type DockerStartMutation,
  type DockerContainerStatsSubSubscription,
} from '../generated/sdk.js';

/** A Docker container with its full read-only state. */
export type DockerContainer = DockerContainerFieldsFragment;
/** A Docker network as reported by the server. */
export type DockerNetwork = DockerNetworksQuery['docker']['networks'][number];
/** The minimal container shape returned by a control mutation. */
export type DockerActionResult = DockerStartMutation['docker']['start'];
/** Live per-container resource stats. */
export type DockerContainerStats = DockerContainerStatsSubSubscription['dockerContainerStats'];

export interface DockerDomain {
  /** All containers with their current state. */
  list(): Promise<DockerContainer[]>;
  /** A single container by id, or `null` if it does not exist. */
  get(id: string): Promise<DockerContainer | null>;
  /** All Docker networks. */
  networks(): Promise<DockerNetwork[]>;
  /** Start a container. */
  start(id: string): Promise<DockerActionResult>;
  /** Stop a container. */
  stop(id: string): Promise<DockerActionResult>;
  /** Pause a container. */
  pause(id: string): Promise<DockerActionResult>;
  /** Unpause a container. */
  unpause(id: string): Promise<DockerActionResult>;
  /** Update a container to its latest image. */
  update(id: string): Promise<DockerActionResult>;
  /** Remove a container (optionally also its image). */
  remove(id: string, withImage?: boolean): Promise<boolean | null>;
  /** Live resource-usage stats for containers. */
  stats$(): AsyncIterable<DockerContainerStats>;
}

export function createDockerDomain(http: UnraidHttp, subscribe: SubscribeFn): DockerDomain {
  return {
    async list(): Promise<DockerContainer[]> {
      const result = await http.request(DockerListDocument);
      return result.docker.containers;
    },
    async get(id: string): Promise<DockerContainer | null> {
      const result = await http.request(DockerContainerByIdDocument, { id });
      return result.docker.container;
    },
    async networks(): Promise<DockerNetwork[]> {
      const result = await http.request(DockerNetworksDocument);
      return result.docker.networks;
    },
    async start(id: string): Promise<DockerActionResult> {
      const result = await http.request(DockerStartDocument, { id });
      return result.docker.start;
    },
    async stop(id: string): Promise<DockerActionResult> {
      const result = await http.request(DockerStopDocument, { id });
      return result.docker.stop;
    },
    async pause(id: string): Promise<DockerActionResult> {
      const result = await http.request(DockerPauseDocument, { id });
      return result.docker.pause;
    },
    async unpause(id: string): Promise<DockerActionResult> {
      const result = await http.request(DockerUnpauseDocument, { id });
      return result.docker.unpause;
    },
    async update(id: string): Promise<DockerActionResult> {
      const result = await http.request(DockerUpdateContainerDocument, { id });
      return result.docker.updateContainer;
    },
    async remove(id: string, withImage?: boolean): Promise<boolean | null> {
      const result = await http.request(DockerRemoveContainerDocument, {
        id,
        ...(withImage !== undefined ? { withImage } : {}),
      });
      return result.docker.removeContainer;
    },
    stats$(): AsyncIterable<DockerContainerStats> {
      return mapIterable(subscribe(DockerContainerStatsSubDocument), (r) => r.dockerContainerStats);
    },
  };
}
