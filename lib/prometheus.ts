// Client pour interroger Prometheus
export interface MetricData {
  metric: Record<string, string>
  value: [number, string]
}

export interface PrometheusResponse {
  status: string
  data: {
    resultType: string
    result: MetricData[]
  }
}

const PROMETHEUS_URL = process.env.PROMETHEUS_URL || 'http://prometheus:9090'

export async function queryPrometheus(query: string): Promise<MetricData[]> {
  try {
    const url = `${PROMETHEUS_URL}/api/v1/query?query=${encodeURIComponent(query)}`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Prometheus query failed: ${response.statusText}`)
    }
    
    const data: PrometheusResponse = await response.json()
    return data.data.result || []
  } catch (error) {
    console.error('Prometheus query error:', error)
    return []
  }
}

// Métriques système
export async function getSystemMetrics() {
  const [cpuUsage, memoryUsage, diskUsage, networkRx, networkTx] = await Promise.all([
    queryPrometheus('100 - (avg(rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)'),
    queryPrometheus('(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100'),
    queryPrometheus('100 - ((node_filesystem_avail_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"}) * 100)'),
    queryPrometheus('rate(node_network_receive_bytes_total{device="eth0"}[5m])'),
    queryPrometheus('rate(node_network_transmit_bytes_total{device="eth0"}[5m])'),
  ])
  
  return {
    cpu: parseFloat(cpuUsage[0]?.value[1] || '0'),
    memory: parseFloat(memoryUsage[0]?.value[1] || '0'),
    disk: parseFloat(diskUsage[0]?.value[1] || '0'),
    networkRx: parseFloat(networkRx[0]?.value[1] || '0'),
    networkTx: parseFloat(networkTx[0]?.value[1] || '0'),
  }
}

// Métriques de containers Docker via cAdvisor
export async function getContainerMetrics() {
  const [containers] = await Promise.all([
    queryPrometheus('count(container_last_seen) by (name)'),
  ])
  
  return containers.map(c => ({
    name: c.metric.name || 'unknown',
    lastSeen: parseFloat(c.value[1]),
  }))
}

// Uptime du système
export async function getSystemUptime(): Promise<number> {
  const result = await queryPrometheus('node_time_seconds - node_boot_time_seconds')
  return parseFloat(result[0]?.value[1] || '0')
}

// Charge système
export async function getSystemLoad(): Promise<{ load1: number; load5: number; load15: number }> {
  const [load1, load5, load15] = await Promise.all([
    queryPrometheus('node_load1'),
    queryPrometheus('node_load5'),
    queryPrometheus('node_load15'),
  ])
  
  return {
    load1: parseFloat(load1[0]?.value[1] || '0'),
    load5: parseFloat(load5[0]?.value[1] || '0'),
    load15: parseFloat(load15[0]?.value[1] || '0'),
  }
}

// HTTP requests via Traefik
export async function getHttpMetrics() {
  const [requests, errors] = await Promise.all([
    queryPrometheus('sum(rate(traefik_service_requests_total[5m]))'),
    queryPrometheus('sum(rate(traefik_service_requests_total{code=~"5.."}[5m]))'),
  ])
  
  return {
    requestsPerSecond: parseFloat(requests[0]?.value[1] || '0'),
    errorsPerSecond: parseFloat(errors[0]?.value[1] || '0'),
  }
}
