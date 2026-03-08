import { useState } from 'react'
import { Settings, Bell, Shield, Zap, Database, Webhook, Save, Check, Github } from 'lucide-react'
import { cn } from '../lib/utils'

export default function SettingsPanel() {
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({
    heartbeatInterval: 60,
    notifications: true,
    darkMode: true,
    autoDeploy: false,
    webhookUrl: '',
    apiKey: '',
  })
  const [saved, setSaved] = useState(false)

  const tabs = [
    { id: 'general', label: 'Generale', icon: Settings },
    { id: 'integrations', label: 'Integrazioni', icon: Webhook },
    { id: 'notifications', label: 'Notifiche', icon: Bell },
    { id: 'security', label: 'Sicurezza', icon: Shield },
  ]

  const saveSettings = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const integrationsList = [
    { name: 'Orchestrator', status: 'connected', icon: Zap, color: 'text-yellow-400' },
    { name: 'GitHub', status: 'connected', icon: Github, color: 'text-gray-200' },
    { name: 'Telegram', status: 'connected', icon: () => <span>📱</span>, color: 'text-blue-400' },
    { name: 'Database', status: 'mock', icon: Database, color: 'text-blue-400' },
  ]

  const NotificationsPanel = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-200 mb-4">Notifiche</h3>
      <div className="space-y-4">
        {[
          { id: 'taskComplete', label: 'Task completate', desc: 'Notifica quando un agente completa un task' },
          { id: 'errors', label: 'Errori', desc: 'Notifica errori critici del sistema' },
          { id: 'deployments', label: 'Deployments', desc: 'Notifica nuovi deploy su GitHub' },
        ].map(item => (
          <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-800">
            <div>
              <label className="text-sm font-medium text-gray-300">{item.label}</label>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
            <div className="w-10 h-5 bg-green-600 rounded-full relative">
              <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const SecurityPanel = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-200 mb-4">Sicurezza</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">API Key</label>
          <input
            type="password"
            value={settings.apiKey}
            onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
            placeholder="••••••••••••••••"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300"
          />
        </div>
        <div className="p-4 bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-300">Stato: <span className="text-green-400">Protetto</span></p>
          <p className="text-xs text-gray-500 mt-1">Ultima verifica: 2026-03-08</p>
        </div>
      </div>
    </div>
  )

  const GeneralPanel = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-200 mb-4">Impostazioni Generali</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Heartbeat (minuti)</label>
          <input
            type="number"
            value={settings.heartbeatInterval}
            onChange={(e) => setSettings({ ...settings, heartbeatInterval: parseInt(e.target.value) })}
            className="w-32 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm"
          />
        </div>
        <div className="flex items-center justify-between py-2 border-t border-gray-800">
          <span className="text-sm text-gray-300">Dark Mode</span>
          <span className="text-green-400 text-sm">Attivo ✓</span>
        </div>
      </div>
    </div>
  )

  const IntegrationsPanel = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-200 mb-4">Integrazioni</h3>
      <div className="space-y-3">
        {integrationsList.map((integ, i) => {
          const Icon = integ.icon
          return (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${integ.color}`} />
                <span className="text-sm text-gray-300">{integ.name}</span>
              </div>
              <span className={integ.status === 'connected' ? 'text-green-400 text-xs' : 'text-yellow-400 text-xs'}>
                {integ.status === 'connected' ? '✓ Connesso' : '⚠ Demo'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-200 flex items-center gap-2">
            <Settings className="text-gray-400" />
            Settings
          </h1>
          <p className="text-gray-400">Configura dashboard e integrazioni</p>
        </div>
        <button
          onClick={saveSettings}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg',
            saved ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-500'
          )}
        >
          {saved ? <Check size={16} /> : <Save size={16} />}
          {saved ? 'Salvato!' : 'Salva'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-2">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm',
                    activeTab === tab.id ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:bg-gray-800'
                  )}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            {activeTab === 'general' && <GeneralPanel />}
            {activeTab === 'integrations' && <IntegrationsPanel />}
            {activeTab === 'notifications' && <NotificationsPanel />}
            {activeTab === 'security' && <SecurityPanel />}
          </div>
        </div>
      </div>
    </div>
  )
}
