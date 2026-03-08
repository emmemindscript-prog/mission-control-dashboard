export interface MetricCard {
  title: string
  value: number | string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: string
  color: string
}

export interface Activity {
  id: string
  agent: string
  action: string
  timestamp: string
  status?: string
}

export interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'inprogress' | 'review' | 'done'
  priority: 'urgent' | 'high' | 'medium' | 'low'
  project: string
  dueDate: string
  assignee: string
  createdAt?: string
}

export interface ContentItem {
  id: string
  title: string
  platform: 'youtube' | 'x' | 'linkedin' | 'blog' | 'other'
  stage: 'idea' | 'script' | 'record' | 'edit' | 'review' | 'scheduled' | 'published'
  script?: string
  assignedDay?: string
}

export interface CalendarEvent {
  id: string
  title: string
  category: 'task' | 'content' | 'meeting' | 'automation'
  start: string
  end?: string
  description?: string
}

export interface Agent {
  id: string
  name: string
  role: string
  status: 'active' | 'pending' | 'error' | 'idle'
  currentTask: string
  lastActive: string
  responsibilities: string[]
  recentWork: string[]
  emoji?: string
}

export interface Contact {
  id: string
  name: string
  role: string
  handle: string
  timezone: string
  category: 'internal' | 'content' | 'external' | 'client'
  compensation?: string
}

export interface MemoryItem {
  id: string
  content: string
  category: 'strategia' | 'product' | 'tech'
  createdAt?: string
  excerpt?: string
  title?: string
}

export type TaskStatus = 'todo' | 'inprogress' | 'review' | 'done'
