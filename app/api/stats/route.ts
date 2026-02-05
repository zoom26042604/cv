import { NextResponse } from 'next/server'
import os from 'os'
import { execSync } from 'child_process'

export async function GET() {
  try {
    // CPU Usage
    const cpus = os.cpus()
    let totalIdle = 0
    let totalTick = 0
    
    cpus.forEach(cpu => {
      for (const type in cpu.times) {
        totalTick += cpu.times[type as keyof typeof cpu.times]
      }
      totalIdle += cpu.times.idle
    })
    
    const idle = totalIdle / cpus.length
    const total = totalTick / cpus.length
    const cpuUsage = 100 - ~~(100 * idle / total)

    // Memory Usage
    const totalMem = os.totalmem()
    const freeMem = os.freemem()
    const usedMem = totalMem - freeMem
    const memoryPercentage = (usedMem / totalMem) * 100

    // Disk Usage
    let diskUsed = 0
    let diskTotal = 0
    let diskPercentage = 0
    
    try {
      const diskInfo = execSync('df -BG / | tail -1').toString()
      const parts = diskInfo.split(/\s+/)
      diskTotal = parseInt(parts[1])
      diskUsed = parseInt(parts[2])
      diskPercentage = parseInt(parts[4])
    } catch (error) {
      console.error('Error getting disk info:', error)
    }

    // Uptime
    const uptimeSeconds = os.uptime()
    const days = Math.floor(uptimeSeconds / 86400)
    const hours = Math.floor((uptimeSeconds % 86400) / 3600)
    const minutes = Math.floor((uptimeSeconds % 3600) / 60)
    const uptime = `${days}j ${hours}h ${minutes}m`

    return NextResponse.json({
      cpu: cpuUsage,
      memory: {
        used: Math.round(usedMem / 1024 / 1024),
        total: Math.round(totalMem / 1024 / 1024),
        percentage: memoryPercentage
      },
      disk: {
        used: diskUsed,
        total: diskTotal,
        percentage: diskPercentage
      },
      uptime
    })
  } catch (error) {
    console.error('Error fetching system stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch system stats' },
      { status: 500 }
    )
  }
}
