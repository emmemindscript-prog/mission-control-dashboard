import { useState, useEffect } from 'react'
import { Activity, CheckCircle2, Clock, Layers, Terminal } from 'lucide-react'
import { Task } from '../types'
import { mockTasks, mockAgents } from '../data/mockData'
import { cn } from '../lib/utils'

const STATUS = {
  active: { bg: 'bg-emerald-900/20', border: 'border-emerald-500/40', text: 'text-emerald-400' },
  warning: { bg: 'bg-amber-900/20', border: 'border-amber-500/40', text: 'text-amber-400' },
  neutral: { bg: 'bg-slate-800/50', border: 'border-slate-600/40', text: 'text-slate-400' },
}

function PulseDot({ color }: { color: string }) {
  return (
    <span className="relative flex">
      <span className={cn("animate-ping absolute inline-flex h-2 w-2 rounded-full opacity-75", color)} />
      <span className={cn("relative inline-flex rounded-full h-2 w-2", color)} />
    </span>
  )
}

function StatCard({ value, label, status = 'neutral', active = false }: { value: number, label: string, status?: keyof typeof STATUS, active?: boolean }) {
  const style = STATUS[status]
  return (
    <div className={cn(
      "rounded-xl border p-4 transition-all cursor-pointer",
      active ? style.bg : 'bg-slate-900',
      active ? style.border : 'border-slate-700',
      "hover:scale-[1.02]"
    )}>
      <div className="flex items-center justify-between mb-2">
        {active && <PulseDot color={style.text.replace('text', 'bg')} />}
        <span className={cn("text-3xl font-black", active ? style.text : 'text-slate-200')}>{value}</span>
      </div>
      <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">{label}</p>
    </div>
  )
}

function TaskRow({ task }: { task: Task }) {
  const statusMap: Record<string, { text: string; color: string }> = {
    todo: { text: 'IDLE', color: 'text-slate-500' },
    inprogress: { text: 'RUN', color: 'text-emerald-400' },
    review: { text: 'PAUSED', color: 'text-amber-400' },
    done: { text: 'DONE', color: 'text-emerald-500' },
  }
  const { text, color } = statusMap[task.status]
  const priorityColor = task.priority === 'urgent' ? 'text-rose-400' : task.priority === 'high' ? 'text-amber-400' : 'text-cyan-400'

  return (
    <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-slate-600 transition-colors">
      <div className={cn("text-[9px] font-mono font-bold min-w-[40px] text-center", color)}>{text}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={cn("text-[10px] font-mono font-bold uppercase", priorityColor)}>{task.priority}</span>
          <span className="text-slate-600">|</span>
          <span className="text-[10px] font-mono text-slate-500">{task.assignee}</span>
        </div>
        <p className="text-sm font-medium text-slate-200 truncate">{task.title}</p>
      </div>
      <span className="text-xs font-mono text-slate-500">{task.dueDate.slice(5)}</span>
    </div>
  )
}

export default function Dashboard() {
  const [time, setTime] = useState(new Date())
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t) }, [])

  const activeTasks = mockTasks.filter(t => t.status === 'inprogress')
  const openTasks = mockTasks.filter(t => t.status === 'todo')
  const reviewTasks = mockTasks.filter(t => t.status === 'review')
  const activeAgents = mockAgents.filter(a => a.status === 'active').length

  return (
    <div className="p-6 space-y-6 bg-slate-950 min-h-screen">
      <header className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Terminal className="w-6 h-6 text-cyan-500" />
          <div>
            <h1 className="text-2xl font-black text-slate-100 tracking-tight uppercase">Mission Control</h1>
            <p className="text-xs font-mono text-slate-500">{time.toLocaleTimeString('it-IT')} UTC | SYSTEM ONLINE</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-900/20 border border-emerald-500/40 rounded-full">
          <PulseDot color="bg-emerald-500" />
          <span className="text-xs font-mono font-bold text-emerald-400">{activeAgents} AGENTS ACTIVE</span>
        </div>
      </header>

      <div className="grid grid-cols-4 gap-4">
        <StatCard value={openTasks.length} label="Task Aperti" status="warning" active />
        <StatCard value={activeTasks.length} label="Task Attivi" status="active" />
        <StatCard value={reviewTasks.length} label="In Review" status="warning" />
        <StatCard value={mockTasks.filter(t => t.status === 'done').length} label="Completati" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-slate-900/30 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-emerald-400 tracking-tight uppercase flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Task Attivi
            </h2>
            <span className="text-2xl font-black text-emerald-400">{activeTasks.length.toString().padStart(2, '0')}</span>
          </div>
          <div className="space-y-2">
            {activeTasks.length > 0 ? activeTasks.map(t => <TaskRow key={t.id} task={t} />) : (
              <div className="text-center py-8 text-slate-500"><Activity className="w-12 h-12 mx-auto mb-2 opacity-20" /><p>Nessun task attivo</p></div>
            )}
          </div>
        </section>

        <section className="bg-slate-900/30 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-amber-400 tracking-tight uppercase flex items-center gap-2">
              <Layers className="w-5 h-5" />
              Task Aperti
            </h2>
            <span className="text-2xl font-black text-amber-400">{openTasks.length.toString().padStart(2, '0')}</span>
          </div>
          <div className="space-y-2">
            {openTasks.length > 0 ? openTasks.map(t => <TaskRow key={t.id} task={t} />) : (
              <div className="text-center py-8 text-slate-500"><Layers className="w-12 h-12 mx-auto mb-2 opacity-20" /><p>Nessun task aperto</p></div>
            )}
          </div>
        </section>

        <section className="lg:col-span-2 bg-slate-900/30 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-cyan-400 tracking-tight uppercase flex items-center gap-2">
              <Clock className="w-5 h-5" />
              In Review
            </h2>
            <span className="text-2xl font-black text-cyan-400">{reviewTasks.length.toString().padStart(2, '0')}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {reviewTasks.length > 0 ? reviewTasks.map(t => <TaskRow key={t.id} task={t} />) : (
              <div className="col-span-2 text-center py-8 text-slate-500"><Clock className="w-12 h-12 mx-auto mb-2 opacity-20" /><p>Nessun task in review</p></div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
