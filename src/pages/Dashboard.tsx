import { useState } from 'react'
import { TrendingUp, CheckCircle2, Clock, AlertCircle, Activity, Users, Zap, FileText } from 'lucide-react'
import { MetricCard, Activity as ActivityType } from '../types'
import { mockMetrics, mockActivities } from '../data/mockData'
import { cn } from '../lib/utils'

const iconMap: Record<string, typeof Activity> = {
  'trending-up': TrendingUp,
  'check-circle': CheckCircle2,
  'clock': Clock,
  'alert-circle': AlertCircle,
  'activity': Activity,
  'users': Users,
  'zap': Zap,
  'file-text': FileText,
}

const colorMap: Record<string, string> = {
  green: 'text-green-400 border-green-500/30 bg-green-500/10',
  yellow: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
  red: 'text-red-400 border-red-500/30 bg-red-500/10',
  blue: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
  purple: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
}

const changeColorMap: Record<string, string> = {
  positive: 'text-green-400',
  negative: 'text-red-400',
  neutral: 'text-gray-400',
}

export default function Dashboard() {
  const [metrics] = useState<MetricCard[]>(mockMetrics)
  const [activities] = useState<ActivityType[]>(mockActivities)

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    
    if (minutes < 1) return 'ora'
    if (minutes < 60) return `${minutes}m fa`
    if (hours < 24) return `${hours}h fa`
    return `${Math.floor(hours / 24)}g fa`
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-200">Dashboard</h1>
        <p className="text-gray-400">Visione d'insieme sistema agenti</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => {
          const Icon = iconMap[metric.icon] || Activity
          return (
            <div
              key={idx}
              className={cn(
                'border rounded-lg p-4 transition-all hover:scale-105 cursor-pointer',
                colorMap[metric.color]
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-5 h-5" />
                <span className={cn('text-sm font-medium', changeColorMap[metric.changeType])}>
                  {metric.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-200">{metric.value}</div>
              <div className="text-sm text-gray-400">{metric.title}</div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Feed */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-400" />
              Attività Recenti
            </h2>
            <span className="text-xs text-gray-500">Ultime 24h</span>
          </div>
          
          <div className="space-y-3">
            {activities.map(activity => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <div className={cn(
                  'w-2 h-2 rounded-full mt-2',
                  activity.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                )} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-200">
                    <span className="font-medium text-blue-400">{activity.agent}</span>
                    {' '}→{' '}
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{formatTime(activity.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Stato Sistema
            </h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-400">Agenti Attivi</span>
                <span className="text-sm font-medium text-green-400">5/5</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-400">Task In Corso</span>
                <span className="text-sm font-medium text-yellow-400">3 attivi</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }} />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-400">Heartbeat</span>
                <span className="text-sm font-medium text-green-400">OK</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-200">8</div>
                  <div className="text-xs text-gray-500">Nuovi task</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-200">3</div>
                  <div className="text-xs text-gray-500">Completati oggi</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
