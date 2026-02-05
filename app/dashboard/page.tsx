"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface SystemStats {
  cpu: number
  memory: { used: number; total: number; percentage: number }
  disk: { used: number; total: number; percentage: number }
  uptime: string
}

interface ContainerStats {
  name: string
  status: string
  cpu: string
  memory: string
  uptime: string
}

interface User {
  id: number
  email: string
  name: string
  role: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<SystemStats | null>(null)
  const [containers, setContainers] = useState<ContainerStats[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  useEffect(() => {
    // Check session on mount
    fetch('/admin/api/session')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user)
        }
      })
  }, [])

  const fetchData = async () => {
    try {
      setLastUpdate(new Date()) // Update timestamp at the start
      
      const [statsRes, containersRes] = await Promise.all([
        fetch('/admin/api/stats'),
        fetch('/admin/api/containers')
      ])
      
      if (statsRes.ok) {
        const data = await statsRes.json()
        setStats(data)
      }
      
      if (containersRes.ok) {
        const data = await containersRes.json()
        setContainers(data)
      }
      
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/admin/api/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  useEffect(() => {
    fetchData()
    // No automatic refresh - only manual refresh via button or page reload
  }, [])

  const getStatusColor = (status: string) => {
    if (status === 'running') return 'bg-green-500'
    if (status === 'healthy') return 'bg-green-500'
    return 'bg-red-500'
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white">Admin Dashboard</h1>
              <p className="text-sm text-gray-400 mt-1">zoom2604.dev</p>
            </div>
            <div className="flex items-center gap-4">
              {user && (
                <>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Connecté en tant que</p>
                    <p className="text-sm font-medium text-white">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg transition"
                  >
                    Déconnexion
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Last Update */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-400">
              Dernière mise à jour: {lastUpdate.toLocaleTimeString('fr-FR')}
            </span>
          </div>
          <button
            onClick={fetchData}
            className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded transition"
          >
            Actualiser
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* System Resources */}
            <section>
              <h2 className="text-lg font-medium text-white mb-4">Ressources Système</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* CPU */}
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-400">CPU</span>
                    <span className="text-2xl font-semibold text-white">{stats?.cpu.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${stats?.cpu}%` }}
                    ></div>
                  </div>
                </div>

                {/* Memory */}
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-400">Mémoire</span>
                    <span className="text-2xl font-semibold text-white">{stats?.memory.percentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${stats?.memory.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {((stats?.memory.used || 0) / 1024).toFixed(1)} GB / {((stats?.memory.total || 1) / 1024).toFixed(1)} GB
                  </p>
                </div>

                {/* Disk */}
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-400">Disque</span>
                    <span className="text-2xl font-semibold text-white">{stats?.disk.percentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${stats?.disk.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {stats?.disk.used || 0} GB / {stats?.disk.total || 0} GB
                  </p>
                </div>
              </div>
            </section>

            {/* Docker Containers */}
            <section>
              <h2 className="text-lg font-medium text-white mb-4">Conteneurs Docker ({containers.length})</h2>
              <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Nom
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          CPU
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Mémoire
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Uptime
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {containers.map((container, idx) => (
                        <tr key={idx} className="hover:bg-gray-800/50 transition">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-white">{container.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${getStatusColor(container.status)}`}></span>
                              <span className="text-sm text-gray-300">{container.status}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {container.cpu}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {container.memory}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {container.uptime}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Quick Links */}
            <section>
              <h2 className="text-lg font-medium text-white mb-4">Liens Rapides</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <a
                  href="https://grafana.zoom2604.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-lg p-4 transition group"
                >
                  <div className="text-white font-medium mb-1 group-hover:text-blue-400 transition">
                    Grafana
                  </div>
                  <div className="text-sm text-gray-400">Dashboards & métriques</div>
                </a>

                <a
                  href="https://prometheus.zoom2604.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-lg p-4 transition group"
                >
                  <div className="text-white font-medium mb-1 group-hover:text-blue-400 transition">
                    Prometheus
                  </div>
                  <div className="text-sm text-gray-400">Monitoring</div>
                </a>

                <a
                  href="https://traefik.zoom2604.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-lg p-4 transition group"
                >
                  <div className="text-white font-medium mb-1 group-hover:text-blue-400 transition">
                    Traefik
                  </div>
                  <div className="text-sm text-gray-400">Reverse proxy</div>
                </a>

                <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                  <div className="text-white font-medium mb-1">
                    Uptime
                  </div>
                  <div className="text-sm text-gray-400">{stats?.uptime || 'N/A'}</div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  )
}
