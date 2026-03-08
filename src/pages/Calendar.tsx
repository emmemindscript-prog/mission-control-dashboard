import { useState } from 'react'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns'
import { it } from 'date-fns/locale'
import { CalendarEvent } from '../types'
import { mockCalendarEvents } from '../data/mockData'
import { cn } from '../lib/utils'

const categoryIcons: Record<string, string> = {
  task: '⚡',
  content: '📹',
  meeting: '👥',
  automation: '⚙️',
}

const categoryColors: Record<string, { bg: string; border: string }> = {
  task: { bg: 'bg-yellow-500', border: 'border-yellow-500' },
  content: { bg: 'bg-purple-500', border: 'border-purple-500' },
  meeting: { bg: 'bg-blue-500', border: 'border-blue-500' },
  automation: { bg: 'bg-green-500', border: 'border-green-500' },
}

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [events] = useState<CalendarEvent[]>(mockCalendarEvents)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 })
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })
  const days = eachDayOfInterval({ start: startDate, end: endDate })

  const eventsByDay = new Map<string, CalendarEvent[]>()
  events.forEach(event => {
    const date = format(new Date(event.start), 'yyyy-MM-dd')
    const existing = eventsByDay.get(date) || []
    existing.push(event)
    eventsByDay.set(date, existing)
  })

  const todayEvents = selectedDate 
    ? events.filter(e => isSameDay(new Date(e.start), selectedDate))
    : []

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-200 flex items-center gap-2">
            <CalendarIcon className="text-blue-400" />
            Calendar
          </h1>
          <p className="text-gray-400">Agenda e pianificazione</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => setCurrentMonth(new Date())} className="px-4 py-2 bg-blue-600 rounded-lg text-sm">
            Oggi
          </button>
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white">
            <ChevronRight size={20} />
          </button>
          <h2 className="font-semibold text-gray-200 ml-2">
            {format(currentMonth, 'MMMM yyyy', { locale: it })}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="grid grid-cols-7 gap-px">
            {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">{day}</div>
            ))}
            {days.map(day => {
              const dateStr = format(day, 'yyyy-MM-dd')
              const dayEvents = eventsByDay.get(dateStr) || []
              const isToday = isSameDay(day, new Date())
              const isCurrentMonth = isSameMonth(day, currentMonth)
              const isSelected = selectedDate && isSameDay(day, selectedDate)
              
              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDate(day)}
                  className={cn(
                    'aspect-square p-1 text-sm relative',
                    isCurrentMonth ? 'text-gray-200' : 'text-gray-600',
                    isToday && 'bg-blue-500/20',
                    isSelected && 'bg-blue-500/40 border-blue-500'
                  )}
                >
                  <span className="font-medium">{format(day, 'd')}</span>
                  {dayEvents.length > 0 && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
                      {dayEvents.slice(0, 2).map((e, i) => (
                        <div key={i} className={cn('w-1.5 h-1.5 rounded-full', categoryColors[e.category].bg)} />
                      ))}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
            <Clock size={20} />
            Eventi
          </h3>
          {selectedDate ? (
            <div>
              <p className="text-sm text-gray-400 mb-3">
                {format(selectedDate, 'EEEE d MMMM', { locale: it })}
              </p>
              {todayEvents.length > 0 ? (
                <div className="space-y-2">
                  {todayEvents.map(event => (
                    <div key={event.id} className="p-3 bg-gray-800 rounded-lg border-l-4 border-blue-500">
                      <div className="flex items-center gap-2">
                        <span>{categoryIcons[event.category]}</span>
                        <span className="font-medium text-gray-200">{event.title}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{format(new Date(event.start), 'HH:mm')}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Nessun evento</p>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Seleziona una data</p>
          )}
        </div>
      </div>
    </div>
  )
}
