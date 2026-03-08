import { useState } from 'react'
import { Video, Mic, Edit3, Calendar, ArrowUpRight, ArrowDownRight, Minus, FileText } from 'lucide-react'
import { ContentItem } from '../types'
import { mockContentPipeline } from '../data/mockData'

const stageOrder = ['idea', 'script', 'record', 'edit', 'review', 'scheduled', 'published'] as const

const stageLabels: Record<string, string> = {
  idea: 'Idea',
  script: 'Script',
  record: 'Registrazione',
  edit: 'Editing',
  review: 'Review',
  scheduled: 'Scheduled',
  published: 'Pubblicato',
}

const platformIcons: Record<string, any> = {
  youtube: Video,
  x: FileText,
  linkedin: FileText,
  blog: FileText,
  other: FileText,
}

export default function Content() {
  const [filter, setFilter] = useState<string>('all')
  const [items] = useState<ContentItem[]>(mockContentPipeline)

  const filteredItems = filter === 'all' ? items : items.filter(i => i.platform === filter)
  const byStage = stageOrder.map(stage => ({
    stage,
    label: stageLabels[stage],
    items: filteredItems.filter(item => item.stage === stage),
  }))

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-200">Content Pipeline</h1>
          <p className="text-gray-400">Gestisci contenuti da idea a pubblicazione</p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300"
        >
          <option value="all">Tutte le piattaforme</option>
          <option value="youtube">YouTube</option>
          <option value="x">X (Twitter)</option>
          <option value="linkedin">LinkedIn</option>
          <option value="blog">Blog</option>
        </select>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {byStage.map(({ stage, label, items: stageItems }) => (
          <div key={stage} className="bg-gray-900 border border-gray-800 rounded-lg p-3 min-h-64">
            <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">{label}</h3>
            <div className="space-y-3">
              {stageItems.map(item => {
                const Icon = platformIcons[item.platform] || FileText
                const gradients: Record<string, string> = {
                  idea: 'from-gray-700 to-gray-800',
                  script: 'from-blue-700 to-blue-800',
                  record: 'from-purple-700 to-purple-800',
                  edit: 'from-yellow-700 to-yellow-800',
                  review: 'from-orange-700 to-orange-800',
                  scheduled: 'from-cyan-700 to-cyan-800',
                  published: 'from-green-700 to-green-800',
                }
                return (
                  <div key={item.id} className={`bg-gradient-to-br ${gradients[item.stage]} rounded-lg p-3 cursor-move hover:scale-105 transition-transform`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-gray-300" />
                      <span className="text-xs font-medium capitalize text-gray-300">{item.platform}</span>
                      {item.assignedDay && (
                        <span className="text-xs text-gray-400 ml-auto">{item.assignedDay}</span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-white leading-tight">{item.title}</p>
                    {item.script && (
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">{item.script}</p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
