import { useState } from 'react'
import { Users, Search, Globe, MessageSquare, Plus, Clock } from 'lucide-react'
import { Contact } from '../types'
import { mockContacts } from '../data/mockData'
import { cn } from '../lib/utils'

export default function Contacts() {
  const [contacts] = useState<Contact[]>(mockContacts)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = ['internal', 'content', 'external', 'client']

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           contact.handle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || contact.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const contactEmoji = (category: string) => {
    const emojis: Record<string, string> = {
      content: '🤖',
      internal: '👥',
      external: '🌍',
      client: '🎯'
    }
    return emojis[category] || '👤'
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-200 flex items-center gap-2">
            <Users className="text-blue-400" />
            Contacts
          </h1>
          <p className="text-gray-400">Gestione contatti e team</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors">
          <Plus size={16} />
          Nuovo Contatto
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Cerca contatti..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Globe size={16} className="text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 focus:outline-none"
          >
            <option value="all">Tutte le Categorie</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContacts.map(contact => (
          <div key={contact.id} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-xl">
                  {contactEmoji(contact.category)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-200">{contact.name}</h3>
                  <p className="text-sm text-gray-400">{contact.role}</p>
                </div>
              </div>
              <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-400">
                {contact.category}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <MessageSquare size={14} />
                <span>{contact.handle}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock size={14} />
                <span>{contact.timezone}</span>
              </div>
              {contact.compensation && (
                <div className="text-xs text-gray-500 pt-2 border-t border-gray-800">
                  {contact.compensation}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-200 mb-2">Nessun contatto</h3>
          <p className="text-gray-400">Aggiungi il tuo primo contatto</p>
        </div>
      )}
    </div>
  )
}
