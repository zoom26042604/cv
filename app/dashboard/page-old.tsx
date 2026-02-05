import StatCard from '@/components/StatCard'
import QuickActionCard from '@/components/QuickActionCard'
import ServiceCard from '@/components/ServiceCard'

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-slate-400">Vue d'ensemble de votre infrastructure</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-800">
            <span className="text-slate-400 text-sm">Last update: </span>
            <span className="text-white font-medium">Just now</span>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-blue-500/20">
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Services Actifs"
          value="8"
          subtitle="Tous opérationnels"
          icon="🚀"
          trend="up"
          trendValue="+2%"
          gradient="from-green-500 to-emerald-600"
        />
        <StatCard
          title="CPU Usage"
          value="23%"
          subtitle="Load: 0.45"
          icon="⚡"
          trend="down"
          trendValue="-5%"
          gradient="from-blue-500 to-cyan-600"
        />
        <StatCard
          title="Memory"
          value="45%"
          subtitle="1.8 GB / 4 GB"
          icon="💾"
          trend="up"
          trendValue="+8%"
          gradient="from-purple-500 to-pink-600"
        />
        <StatCard
          title="Disk Space"
          value="67%"
          subtitle="67 GB / 100 GB"
          icon="💿"
          trend="neutral"
          trendValue="0%"
          gradient="from-orange-500 to-red-600"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard
            icon="📊"
            title="Grafana"
            description="Visualize metrics"
            href="https://grafana.zoom2604.dev"
            gradient="from-orange-500 to-red-600"
          />
          <QuickActionCard
            icon="🔀"
            title="Traefik"
            description="Routing & SSL"
            href="https://traefik.zoom2604.dev"
            gradient="from-cyan-500 to-blue-600"
          />
          <QuickActionCard
            icon="📈"
            title="Prometheus"
            description="Metrics & alerts"
            href="https://prometheus.zoom2604.dev"
            gradient="from-red-500 to-pink-600"
          />
          <QuickActionCard
            icon="🗄️"
            title="Databases"
            description="Manage PostgreSQL"
            gradient="from-blue-500 to-purple-600"
          />
        </div>
      </div>

      {/* Services Status */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Docker Services</h2>
          <span className="text-slate-400 text-sm">8 containers running</span>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <ServiceCard name="traefik" status="running" cpu="2%" memory="45MB" uptime="6h 23m" />
          <ServiceCard name="postgres" status="running" cpu="5%" memory="120MB" uptime="6h 23m" />
          <ServiceCard name="redis" status="running" cpu="1%" memory="18MB" uptime="6h 23m" />
          <ServiceCard name="prometheus" status="running" cpu="8%" memory="256MB" uptime="6h 23m" />
          <ServiceCard name="grafana" status="running" cpu="3%" memory="89MB" uptime="6h 23m" />
          <ServiceCard name="admin-dashboard" status="running" cpu="4%" memory="112MB" uptime="1h 15m" />
          <ServiceCard name="node_exporter" status="running" cpu="1%" memory="12MB" uptime="6h 23m" />
          <ServiceCard name="cadvisor" status="running" cpu="3%" memory="67MB" uptime="6h 23m" />
        </div>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
          <h3 className="text-xl font-bold text-white mb-4">System Health</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-400 text-sm">CPU Load</span>
                <span className="text-white font-medium">23%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{width: '23%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-400 text-sm">Memory Usage</span>
                <span className="text-white font-medium">45%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{width: '45%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-400 text-sm">Disk Usage</span>
                <span className="text-white font-medium">67%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full" style={{width: '67%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-400 text-sm">Network I/O</span>
                <span className="text-white font-medium">12 MB/s</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: '35%'}}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
          <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { time: '2 min ago', action: 'Container admin-dashboard restarted', status: 'success' },
              { time: '15 min ago', action: 'SSL certificate renewed for zoom2604.dev', status: 'success' },
              { time: '1 hour ago', action: 'Database backup completed', status: 'success' },
              { time: '2 hours ago', action: 'System update installed', status: 'info' },
            ].map((activity, i) => (
              <div key={i} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-800/50">
                <div className={`w-2 h-2 mt-1.5 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.action}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
