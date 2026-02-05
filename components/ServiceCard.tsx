'use client'

interface ServiceCardProps {
  name: string
  status: 'running' | 'stopped' | 'error'
  cpu?: string
  memory?: string
  uptime?: string
}

export default function ServiceCard({ name, status, cpu, memory, uptime }: ServiceCardProps) {
  const getStatusColor = () => {
    if (status === 'running') return 'bg-green-500'
    if (status === 'error') return 'bg-red-500'
    return 'bg-slate-500'
  }

  const getStatusBorder = () => {
    if (status === 'running') return 'border-green-500/20'
    if (status === 'error') return 'border-red-500/20'
    return 'border-slate-500/20'
  }

  return (
    <div className={`group relative bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border ${getStatusBorder()} hover:border-slate-700 transition-all duration-300`}>
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center space-x-4">
          <div className={`w-3 h-3 ${getStatusColor()} rounded-full animate-pulse`}></div>
          <div>
            <h3 className="text-white font-semibold">{name}</h3>
            <p className="text-slate-400 text-xs">{status}</p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center space-x-6 text-xs">
          {cpu && (
            <div>
              <p className="text-slate-500">CPU</p>
              <p className="text-white font-medium">{cpu}</p>
            </div>
          )}
          {memory && (
            <div>
              <p className="text-slate-500">MEM</p>
              <p className="text-white font-medium">{memory}</p>
            </div>
          )}
          {uptime && (
            <div>
              <p className="text-slate-500">UPTIME</p>
              <p className="text-white font-medium">{uptime}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
