import { useState } from 'react'
import { Plus, Search, Brain, FileText, Tag, Clock } from 'lucide-react'
import { MemoryItem } from '../types'
import { mockMemory } from '../data/mockData'

const categoryIcons = {
  strategia: Brain,
  product: FileText,
  tech: Tag,
}

export default function MemoryView() {
  const [memory] = useState<MemoryItem[]>(mockMemory)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredMemory = memory.filter(m => {
    const matchesSearch = (m.title + m.content).toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-200">Memory</h1>
          <p className="text-gray-400">Ricerca nella memoria lungo termine</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm hover:bg-blue-500">
          <Plus size={18} />
          Nuova nota
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cerca nella memoria..."
            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-200"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-300 w-40"
        >
          <option value="all">Tutte</option>
          <option value="strategia">Strategia</option>
          <option value="product">Product</option>
          <option value="tech">Tech</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMemory.map(item => {
          const Icon = categoryIcons[item.category] || FileText
          const bgColors: Record<string, string> = {
            strategia: 'bg-purple-900/20 border-purple-500/30',
            product: 'bg-blue-900/20 border-blue-500/30',
            tech: 'bg-green-900/20 border-green-500/30',
          }
          return (
            <div key={item.id} className={`${bgColors[item.category]} border rounded-lg p-4 hover:scale-105 transition-transform cursor-pointer`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-gray-400" />
                  <span className="text-xs font-medium text-gray-400 uppercase">{item.category}</span>
                </div>
                <span className="text-xs text-gray-500">{item.createdAt?.slice(0, 10)}</span>
              </div>
              <h3 className="font-semibold text-gray-200 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-3">{item.excerpt}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
