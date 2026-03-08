import { MetricCard, Activity, Task, ContentItem, CalendarEvent, Agent, Contact, Memory } from '../types'

export const mockMetrics: MetricCard[] = [
  { title: 'Task Aperte', value: 12, change: '+3', changeType: 'negative', icon: 'alert-circle', color: 'red' },
  { title: 'In Corso', value: 5, change: '+1', changeType: 'neutral', icon: 'loader', color: 'yellow' },
  { title: 'Completate', value: 8, change: '+5', changeType: 'positive', icon: 'check-circle', color: 'green' },
  { title: 'Tempo Medio', value: '1.5h', change: '-0.3h', changeType: 'positive', icon: 'clock', color: 'blue' },
]

export const mockActivities: Activity[] = [
  { id: '1', agent: 'Product-Manager', action: 'Inizio lavoro PRD mission-control', timestamp: '2026-03-08T09:15:00Z', status: 'active' },
  { id: '2', agent: 'Senior-Dev', action: 'Setup React project mission-control', timestamp: '2026-03-08T09:30:00Z', status: 'active' },
  { id: '3', agent: 'Senior-Dev', action: 'Completato MVP foreverpic Fase 4', timestamp: '2026-03-08T08:00:00Z', status: 'active' },
  { id: '4', agent: 'Atlas', action: 'Generato market report 2026-03-07', timestamp: '2026-03-07T22:00:00Z', status: 'active' },
]

export const mockTasks: Task[] = [
  { id: '1', title: 'Dashboard UI Design', description: 'Design completo 8 schermate', status: 'done', priority: 'high', project: 'mission-control', dueDate: '2026-03-08', assignee: 'Senior-Dev' },
  { id: '2', title: 'Integrazione API orchestrator', description: 'Connessione websocket', status: 'inprogress', priority: 'urgent', project: 'mission-control', dueDate: '2026-03-09', assignee: 'Senior-Dev' },
  { id: '3', title: 'Refactor componenti', description: 'Ottimizzazione performance', status: 'todo', priority: 'medium', project: 'foreverpic', dueDate: '2026-03-10', assignee: 'Junior-Dev' },
]

export const mockContentPipeline: ContentItem[] = [
  { id: '1', title: 'ForeverPic Tutorial', platform: 'youtube', stage: 'published', script: 'Desc: video walkthrough', assignedDay: 'Lunedì' },
  { id: '2', title: 'Agent System Explained', platform: 'x', stage: 'script', script: 'Thread: 8 fasi del sistema', assignedDay: 'Mercoledì' },
  { id: '3', title: 'Mission Control Launch', platform: 'blog', stage: 'idea', assignedDay: 'Venerdì' },
]

export const mockCalendarEvents: CalendarEvent[] = [
  { id: '1', title: 'Team Sync', category: 'meeting', start: '2026-03-08T10:00:00', end: '2026-03-08T11:00:00' },
  { id: '2', title: 'Content Review', category: 'content', start: '2026-03-08T14:00:00', end: '2026-03-08T15:00:00' },
  { id: '3', title: 'Deploy ForeverPic', category: 'automation', start: '2026-03-09T09:00:00', end: '2026-03-09T09:30:00' },
]

export const mockAgents: Agent[] = [
  { id: '1', name: 'Manager', role: 'Business Manager', status: 'active', currentTask: 'Fase 1', lastActive: new Date().toISOString(), emoji: '👨‍💼', responsibilities: ['Setup', 'Config'], recentWork: ['PRD'] },
  { id: '2', name: 'Atlas', role: 'Market Hunter', status: 'active', currentTask: 'Fase 2', lastActive: new Date().toISOString(), emoji: '🗺️', responsibilities: ['Research'], recentWork: ['Reddit scan'] },
  { id: '3', name: 'Product-Manager', role: 'Product Spec', status: 'active', currentTask: 'Fase 3', lastActive: new Date().toISOString(), emoji: '📝', responsibilities: ['PRD'], recentWork: ['User flow'] },
  { id: '4', name: 'Senior-Dev', role: 'Lead Developer', status: 'active', currentTask: 'Dashboard', lastActive: new Date().toISOString(), emoji: '👨‍💻', responsibilities: ['React', 'System'], recentWork: ['UI'] },
  { id: '5', name: 'Tech-Writer', role: 'Docs', status: 'idle', currentTask: '-', lastActive: new Date().toISOString(), emoji: '📚', responsibilities: ['README'], recentWork: [] },
]

export const mockContacts: Contact[] = [
  { id: '1', name: 'Senior-Dev', role: 'Lead Developer', handle: 'internal', timezone: 'UTC', category: 'internal' },
  { id: '2', name: 'Emme', role: 'AI Assistant', handle: '@emme_bot', timezone: 'UTC', category: 'content' },
  { id: '3', name: 'Product Manager', role: 'Business', handle: 'internal', timezone: 'UTC', category: 'internal' },
]

export const mockMemory: Memory[] = [
  { id: '1', content: '# PRD Mission Control', category: 'strategia', createdAt: '2026-03-08', excerpt: 'Specifiche tecniche dashboard', title: 'PRD' },
  { id: '2', content: '# Setup Guide', category: 'tech', createdAt: '2026-03-08', excerpt: 'Istruzioni installazione', title: 'Setup' },
]
