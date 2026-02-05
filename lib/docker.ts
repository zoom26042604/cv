import Docker from 'dockerode'

// Instance singleton de Docker
let dockerInstance: Docker | null = null

export function getDockerClient(): Docker {
  if (!dockerInstance) {
    dockerInstance = new Docker({
      socketPath: '/var/run/docker.sock'
    })
  }
  return dockerInstance
}

// Types pour les containers
export interface ContainerInfo {
  id: string
  name: string
  image: string
  state: string
  status: string
  created: number
  ports: Array<{
    private: number
    public?: number
    type: string
  }>
  labels: Record<string, string>
}

// Types pour les stats
export interface ContainerStats {
  cpu: number
  memory: {
    used: number
    total: number
    percent: number
  }
  network: {
    rx: number
    tx: number
  }
  blockIO: {
    read: number
    write: number
  }
}

// Lister tous les containers
export async function listContainers(all = true): Promise<ContainerInfo[]> {
  const docker = getDockerClient()
  const containers = await docker.listContainers({ all })
  
  return containers.map(container => ({
    id: container.Id,
    name: container.Names[0]?.replace(/^\//, '') || 'unknown',
    image: container.Image,
    state: container.State,
    status: container.Status,
    created: container.Created,
    ports: container.Ports.map(port => ({
      private: port.PrivatePort,
      public: port.PublicPort,
      type: port.Type,
    })),
    labels: container.Labels || {},
  }))
}

// Obtenir les stats d'un container
export async function getContainerStats(containerId: string): Promise<ContainerStats> {
  const docker = getDockerClient()
  const container = docker.getContainer(containerId)
  
  const stats = await container.stats({ stream: false })
  
  // Calculer le CPU
  const cpuDelta = stats.cpu_stats.cpu_usage.total_usage - stats.precpu_stats.cpu_usage.total_usage
  const systemDelta = stats.cpu_stats.system_cpu_usage - stats.precpu_stats.system_cpu_usage
  const cpuPercent = (cpuDelta / systemDelta) * stats.cpu_stats.online_cpus * 100
  
  // Mémoire
  const memUsed = stats.memory_stats.usage || 0
  const memTotal = stats.memory_stats.limit || 1
  const memPercent = (memUsed / memTotal) * 100
  
  // Network
  let rxBytes = 0
  let txBytes = 0
  if (stats.networks) {
    Object.values(stats.networks).forEach((net: any) => {
      rxBytes += net.rx_bytes || 0
      txBytes += net.tx_bytes || 0
    })
  }
  
  // Block I/O
  let readBytes = 0
  let writeBytes = 0
  if (stats.blkio_stats?.io_service_bytes_recursive) {
    stats.blkio_stats.io_service_bytes_recursive.forEach((io: any) => {
      if (io.op === 'read') readBytes += io.value
      if (io.op === 'write') writeBytes += io.value
    })
  }
  
  return {
    cpu: Math.round(cpuPercent * 100) / 100,
    memory: {
      used: memUsed,
      total: memTotal,
      percent: Math.round(memPercent * 100) / 100,
    },
    network: {
      rx: rxBytes,
      tx: txBytes,
    },
    blockIO: {
      read: readBytes,
      write: writeBytes,
    },
  }
}

// Démarrer un container
export async function startContainer(containerId: string): Promise<void> {
  const docker = getDockerClient()
  const container = docker.getContainer(containerId)
  await container.start()
}

// Arrêter un container
export async function stopContainer(containerId: string): Promise<void> {
  const docker = getDockerClient()
  const container = docker.getContainer(containerId)
  await container.stop()
}

// Redémarrer un container
export async function restartContainer(containerId: string): Promise<void> {
  const docker = getDockerClient()
  const container = docker.getContainer(containerId)
  await container.restart()
}

// Supprimer un container
export async function removeContainer(containerId: string, force = false): Promise<void> {
  const docker = getDockerClient()
  const container = docker.getContainer(containerId)
  await container.remove({ force })
}

// Obtenir les logs d'un container
export async function getContainerLogs(
  containerId: string,
  tail = 100
): Promise<string> {
  const docker = getDockerClient()
  const container = docker.getContainer(containerId)
  
  const logs = await container.logs({
    stdout: true,
    stderr: true,
    tail,
    timestamps: true,
  })
  
  return logs.toString('utf-8')
}

// Inspecter un container
export async function inspectContainer(containerId: string) {
  const docker = getDockerClient()
  const container = docker.getContainer(containerId)
  return await container.inspect()
}

// Lister les images
export async function listImages() {
  const docker = getDockerClient()
  return await docker.listImages({ all: false })
}

// Lister les volumes
export async function listVolumes() {
  const docker = getDockerClient()
  const result = await docker.listVolumes()
  return result.Volumes || []
}

// Lister les réseaux
export async function listNetworks() {
  const docker = getDockerClient()
  return await docker.listNetworks()
}

// Informations système Docker
export async function getSystemInfo() {
  const docker = getDockerClient()
  return await docker.info()
}
