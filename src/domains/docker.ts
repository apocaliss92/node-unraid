import type { UnraidHttp } from '../transport/http.js';
import {
  DockerListDocument,
  DockerContainerByIdDocument,
  DockerNetworksDocument,
  type DockerContainerFieldsFragment,
  type DockerNetworksQuery,
} from '../generated/sdk.js';

/** A Docker container with its full read-only state. */
export type DockerContainer = DockerContainerFieldsFragment;
/** A Docker network as reported by the server. */
export type DockerNetwork = DockerNetworksQuery['docker']['networks'][number];

export interface DockerDomain {
  /** All containers with their current state. */
  list(): Promise<DockerContainer[]>;
  /** A single container by id, or `null` if it does not exist. */
  get(id: string): Promise<DockerContainer | null>;
  /** All Docker networks. */
  networks(): Promise<DockerNetwork[]>;
}

export function createDockerDomain(http: UnraidHttp): DockerDomain {
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
  };
}
