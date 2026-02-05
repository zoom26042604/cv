import { NextResponse } from 'next/server'
import Docker from 'dockerode'

const docker = new Docker({ socketPath: '/var/run/docker.sock' })

export async function GET() {
  try {
    const containers = await docker.listContainers()
    
    const containerStats = await Promise.all(
      containers.map(async (container) => {
        try {
          const containerInfo = docker.getContainer(container.Id)
          const stats = await containerInfo.stats({ stream: false })
          
          const cpuDelta = stats.cpu_stats.cpu_usage.total_usage - 
                          (stats.precpu_stats.cpu_usage?.total_usage || 0)
          const systemDelta = stats.cpu_stats.system_cpu_usage - 
                             (stats.precpu_stats.system_cpu_usage || 0)
          
          let cpuPercent = 0
          if (systemDelta > 0 && cpuDelta > 0) {
            cpuPercent = (cpuDelta / systemDelta) * 
                        (stats.cpu_stats.online_cpus || 1) * 100
          }
          
          const memUsage = stats.memory_stats.usage || 0
          const memLimit = stats.memory_stats.limit || 1
          
          const created = new Date(container.Created * 1000)
          const now = new Date()
          const uptimeMs = now.getTime() - created.getTime()
          const days = Math.floor(uptimeMs / 86400000)
          const hours = Math.floor((uptimeMs % 86400000) / 3600000)
          const minutes = Math.floor((uptimeMs % 3600000) / 60000)
          
          let uptime = ''
          if (days > 0) uptime += `${days}j `
          if (hours > 0) uptime += `${hours}h `
          uptime += `${minutes}m`
          
          return {
            name: container.Names[0].replace(/^\//, ''),
            status: container.State,
            cpu: `${cpuPercent.toFixed(1)}%`,
            memory: `${(memUsage / 1024 / 1024).toFixed(0)} MB / ${(memLimit / 1024 / 1024).toFixed(0)} MB`,
            uptime: uptime.trim()
          }
        } catch (error) {
          return {
            name: container.Names[0].replace(/^\//, ''),
            status: container.State,
            cpu: 'N/A',
            memory: 'N/A',
            uptime: 'N/A'
          }
        }
      })
    )
    
    return NextResponse.json(containerStats)
  } catch (error) {
    console.error('Error fetching containers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch containers', details: String(error) },
      { status: 500 }
    )
  }
}
