export type TaskStatus = 'todo' | 'inprogress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type AgentStatus = 'active' | 'pending' | 'error' | 'idle';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  project: string;
  dueDate: string;
  createdAt: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  currentTask: string;
  lastActive: string;
  responsibilities: string[];
  recentWork: string[];
}

export interface ContentItem {
  id: string;
  title: string;
  platform: 'youtube' | 'x' | 'linkedin' | 'blog' | 'other';
  stage: 'idea' | 'script' | 'record' | 'edit' | 'review' | 'scheduled' | 'published';
  assignedDay: string;
  script?: string;
  scheduledDate?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  category: 'task' | 'content' | 'meeting' | 'automation';
  description?: string;
}

export interface Memory {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  excerpt: string;
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  handle: string;
  timezone: string;
  compensation?: string;
  notes?: string;
  category: 'internal' | 'content' | 'external' | 'client';
}

export interface Activity {
  id: string;
  agent: string;
  action: string;
  timestamp: string;
  status: AgentStatus;
}
