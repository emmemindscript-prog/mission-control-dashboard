import { useState } from 'react'
import { Bot, Activity, Clock, CheckCircle2, AlertCircle, PauseCircle, Zap } from 'lucide-react'
import { Agent } from '../types'
import { mockAgents } from '../data/mockData'
import { cn } from '../lib/utils'

const statusConfig = {
  active: { color: 'text-green-400', bg: 'bg-green-500/20', dot: 'bg-green-500' },
  pending: { color: 'text-yellow-400', bg: 'bg-yellow-500/20', dot: 'bg-yellow-500' },
  error: { color: 'text-red-400', bg: 'bg-red-500/20', dot: 'bg-red-500' },
  idle: { color: 'text-gray-400', bg: 'bg-gray-500/20', dot: 'bg-gray-500' },
}

export default function AiTeam() {
  const [agents] = useState<Agent[]>(mockAgents)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)

  const statusIcons = {
    active: CheckCircle2,
    pending: Activity,
    error: AlertCircle,
    idle: PauseCircle,
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-200 flex items-center gap-2">
            <Bot className="text-purple-400" />
            AI Team
          </h1>
          <p className="text-gray-400">Gestisci e monitora agenti AI</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>{agents.filter(a => a.status !== 'idle').length}/8 Agenti attivi</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Pane - Agent List */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
            <Zap size={20} />
            Agenti 8 Fasi
          </h2>
          <div className="space-y-2">
            {agents.map(agent => {
              const StatusIcon = statusIcons[agent.status]
              const status = statusConfig[agent.status]
              return (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  className={cn(
                    'p-3 border rounded-lg cursor-pointer transition-colors',
                    selectedAgent?.id === agent.id
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-gray-700 bg-gray-800 hover:border-purple-500/50'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn('w-8 h-8 rounded-full flex items-center justify-center', status.bg)}>
                        <StatusIcon size={16} className={status.color} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-200">{agent.name}</p>
                        <p className="text-sm text-gray-400">{agent.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={cn('w-2 h-2 rounded-full ml-auto', status.dot)} />
                      <p className="text-xs text-gray-500 mt-1">
                        {agent.status.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Pane - Details */}
        <div>
          {selectedAgent ? (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-200">{selectedAgent.name}</h3>
                <div className={cn('w-4 h-4 rounded-full', statusConfig[selectedAgent.status].dot)} />
              </div>
              <p className="text-gray-400 mb-4">{selectedAgent.role}</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Stato Corrente</h4>
                  <div className={cn('p-3 rounded-lg', statusConfig[selectedAgent.status].bg)}>
                    <p className={cn('text-sm', statusConfig[selectedAgent.status].color)}>
                      {selectedAgent.status.toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-300 mt-1">{selectedAgent.currentTask}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Timeline</h4>
                  <div className="text-xs text-gray-500">
                    Last active: {new Date(selectedAgent.lastActive).toLocaleString('it-IT')}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Responsabilità</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedAgent.responsibilities.map((resp, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">
                        {resp}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Lavori Recenti</h4>
                  <div className="space-y-1">
                    {selectedAgent.recentWork.map((work, i) => (
                      <p key={i} className="text-sm text-gray-400">• {work}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 min-h-[400px] flex items-center justify-center flex-col text-center">
              <Bot className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-200 mb-2">Seleziona un Agente</h3>
              <p className="text-gray-400">Clicca su un agente per vedere dettagli e metriche</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
