import React, { useState, useEffect } from 'react'
import {
  Type,
  FileText,
  Image as ImageIcon,
  Video as VideoIcon,
  Smile,
  Bot,
  Search,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Check
} from 'lucide-react'
import { automationsApi } from '../../api/index.js'

export default function ReplyMaterialView() {
  const [activeCategory, setActiveCategory] = useState('text')
  const [materials, setMaterials] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)

  // Add / Edit Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({ title: '', content: '', type: 'text' })

  const categories = [
    { id: 'text', label: 'Text', icon: Type },
    { id: 'document', label: 'Document', icon: FileText },
    { id: 'image', label: 'Image', icon: ImageIcon },
    { id: 'video', label: 'Video', icon: VideoIcon },
    { id: 'stickers', label: 'Stickers', icon: Smile },
    { id: 'chatbots', label: 'Chatbots', icon: Bot },
  ]

  const loadMaterials = async () => {
    setLoading(true)
    const res = await automationsApi.getReplyMaterials(activeCategory)
    if (res.success) {
      setMaterials(res.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadMaterials()
  }, [activeCategory])

  const handleOpenAdd = () => {
    setEditingItem(null)
    setFormData({
      title: '',
      content: '',
      type: activeCategory
    })
    setIsModalOpen(true)
  }

  const handleOpenEdit = (item) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      content: item.content,
      type: item.type
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    await automationsApi.deleteReplyMaterial(id)
    loadMaterials()
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!formData.title || !formData.content) return
    await automationsApi.saveReplyMaterial({
      ...editingItem,
      ...formData
    })
    setIsModalOpen(false)
    loadMaterials()
  }

  const filteredMaterials = materials.filter(
    (m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h-full flex font-sans bg-white overflow-hidden">
      {/* Category Left Vertical Sidebar matching Screenshot 3 */}
      <div className="w-48 border-r border-slate-200/90 p-4 space-y-1 shrink-0 bg-slate-50/50">
        {categories.map((cat) => {
          const Icon = cat.icon
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                isActive
                  ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon
                className={`w-4 h-4 ${
                  isActive ? 'text-[#00c25a]' : 'text-slate-400'
                }`}
              />
              <span>{cat.label}</span>
            </button>
          )
        })}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Control Bar matching Screenshot 3 */}
        <div className="p-6 border-b border-slate-200/80 flex items-center justify-between gap-4 shrink-0">
          <div className="relative w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-3.5 pr-9 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-primary"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Add Green Outlined Button matching Screenshot 3 */}
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-5 py-1.5 rounded-lg border border-[#00c25a] text-[#00c25a] hover:bg-emerald-50 font-bold text-xs transition cursor-pointer"
          >
            <span>Add</span>
          </button>
        </div>

        {/* Cards Grid matching Screenshot 3 */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredMaterials.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Type className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <p className="text-xs font-semibold text-slate-600">No reply materials found</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Click 'Add' to create reusable responses for this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredMaterials.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200/90 p-5 bg-white shadow-xs hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div>
                    {/* Header: Title + Action Icons */}
                    <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                      <h4 className="text-xs font-bold text-emerald-700 truncate flex-1">
                        {item.title}
                      </h4>

                      <div className="flex items-center gap-1.5 text-slate-400">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1 hover:text-blue-600 hover:bg-blue-50 rounded transition cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1 hover:text-red-600 hover:bg-red-50 rounded transition cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Content Preview */}
                    <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-4 select-text">
                      {item.content}
                    </p>

                    {item.fileSize && (
                      <span className="inline-block mt-2 text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                        Size: {item.fileSize}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400">
                    Updated: {item.lastUpdated}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination matching Screenshot 3 */}
        <div className="p-4 border-t border-slate-200/80 bg-slate-50/50 flex items-center justify-end gap-6 text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select className="bg-white border border-slate-300 rounded px-2 py-0.5 text-xs text-slate-700 outline-none">
              <option>25</option>
              <option>50</option>
            </select>
          </div>

          <span>
            1-{filteredMaterials.length} of {filteredMaterials.length}
          </span>

          <div className="flex items-center gap-2 text-slate-600 font-medium">
            <button className="flex items-center gap-1 hover:text-slate-900 disabled:opacity-30 cursor-pointer" disabled>
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <button className="flex items-center gap-1 hover:text-slate-900 disabled:opacity-30 cursor-pointer" disabled>
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Add / Edit Material Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-fadeIn">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">
                {editingItem ? 'Edit Reply Material' : 'Add Reply Material'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Material Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. WA Pricing Table Response"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-brand-primary outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Message Content / Response Text
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Type the message that will be delivered to customers..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-brand-primary outline-none"
                />
              </div>

              {/* Live WhatsApp Bubble Preview */}
              {formData.content && (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    WhatsApp Bubble Preview:
                  </span>
                  <div className="bg-[#efeae2] p-3 rounded-xl">
                    <div className="bg-[#e7fce3] p-2.5 rounded-xl rounded-tl-none border border-emerald-200 text-xs text-slate-800 shadow-xs max-w-[85%]">
                      {formData.content}
                      <span className="text-[9px] text-emerald-700 text-right block mt-1 font-semibold">
                        Just now ✓✓
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-4 -mx-5 -mb-5 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-primary hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-xs"
                >
                  Save Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
