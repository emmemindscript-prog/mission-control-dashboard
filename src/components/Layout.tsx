import { ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  KanbanSquare, 
  Calendar, 
  BookOpen, 
  Bot, 
  Users, 
  Settings,
  Video,
  Command
} from 'lucide-react'
import { cn } from '../lib/utils'

const navigation = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Tasks', path: '/tasks', icon: KanbanSquare },
  { name: 'Content', path: '/content', icon: Video },
  { name: 'Calendar', path: '/calendar', icon: Calendar },
  { name: 'Memory', path: '/memory', icon: BookOpen },
  { name: 'AI Team', path: '/team', icon: Bot },
  { name: 'Contacts', path: '/contacts', icon: Users },
  { name: 'Settings', path: '/settings', icon: Settings },
]

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-2 text-blue-400">
            <Command size={24} />
            <span className="font-bold text-lg">Mission Control</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Emme Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors text-left',
                  isActive 
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                )}
              >
                <Icon size={18} />
                {item.name}
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Agenti Connessi</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
