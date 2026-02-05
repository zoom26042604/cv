'use client'

interface QuickActionCardProps {
  icon: string
  title: string
  description: string
  href?: string
  onClick?: () => void
  gradient?: string
}

export default function QuickActionCard({ 
  icon, 
  title, 
  description, 
  href, 
  onClick,
  gradient = 'from-blue-500 to-purple-600'
}: QuickActionCardProps) {
  const Component = href ? 'a' : 'button'
  const props = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : { onClick }

  return (
    <Component
      {...props}
      className="group relative bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:scale-105"
    >
      {/* Gradient background on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
      
      <div className="relative">
        <div className={`w-14 h-14 mb-4 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-3xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>

      {/* Arrow indicator */}
      <div className="absolute top-4 right-4 text-slate-400 group-hover:text-white transition-colors">
        <span className="text-xl">→</span>
      </div>
    </Component>
  )
}
