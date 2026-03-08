import { useState } from 'react'
import { Plus, CheckCircle2, Clock, AlertCircle, Circle, MoreHorizontal, User } from 'lucide-react'
import { Task } from '../types'
import { mockTasks } from '../data/mockData'

const statusMap: Record<string, { icon: typeof Circle; color: string; bg: string; label: string }> = {
  todo: { icon: Circle, color: 'text-gray-400', bg: 'bg-gray-900', label: 'Da fare' },
  inprogress: { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-900/20', label: 'In corso' },
  review: { icon: AlertCircle, color: 'text-orange-400', bg: 'bg-orange-900/20', label: 'Review' },
  done: { icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-900/20', label: 'Completata' },
}

const priorityColors: Record<string, string> = {
  urgent: 'text-red-400 border-red-500/30',
  high: 'text-orange-400 border-orange-500/30',
  medium: 'text-yellow-400 border-yellow-500/30',
  low: 'text-gray-400 border-gray-500/30',
}

export default function Tasks() {
  const [tasks] = useState<Task[]>(mockTasks)
  const [newTask, setNewTask] = useState({ title: '', priority: 'medium' as const })

  const columns = ['todo', 'inprogress', 'review', 'done'] as const

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-200">Task Board</h1>
          <p className="text-gray-400">Kanban board per i task agenti</p>
        </div>
        <div className="flex gap-2">
          <input
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="Nuova task..."
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm w-64"
          />
          <button className="p-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors">
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {columns.map(col => {
          const colTasks = tasks.filter(t => t.status === col)
          const { icon: Icon, color, bg, label } = statusMap[col]
          return (
            <div key={col} className={`${bg} border border-gray-800 rounded-lg p-4`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-semibold ${color} flex items-center gap-2`}>
                  <Icon size={18} />
                  {label}
                  <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-full">{colTasks.length}</span>
                </h3>
              </div>
              <div className="space-y-3">
                {colTasks.map(task => (
                  <div key={task.id} className={`bg-gray-900/80 border ${priorityColors[task.priority]} rounded-lg p-3 group hover:bg-gray-800 transition-colors cursor-pointer`}>
                    <h4 className="font-medium text-gray-200 mb-2">{task.title}</h4>
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{task.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <User size={12} />
                        <span>{task.assignee}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{task.dueDate.slice(5)}</span>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
