import React, { useState, useEffect } from 'react'
import {
  PlayCircle,
  Plus,
  Search,
  SlidersHorizontal,
  ChevronDown,
  Upload,
  Download,
  Copy,
  Trash2,
  Edit2,
  Send,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  CheckCircle2
} from 'lucide-react'
import { campaignsApi } from '../../api/index.js'

export default function YourTemplatesView({ onSendCampaign, onOpenNewTemplateModal }) {
  const [templates, setTemplates] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [previewSample, setPreviewSample] = useState(true)
  const [sortBy, setSortBy] = useState('Latest')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    loadTemplates()
  }, [])

  const loadTemplates = async () => {
    const res = await campaignsApi.getApprovedTemplates()
    if (res.success) setTemplates(res.data)
  }

  const handleDuplicate = async (id) => {
    await campaignsApi.duplicateTemplate(id)
    loadTemplates()
  }

  const handleDelete = async (id) => {
    await campaignsApi.deleteTemplate(id)
    loadTemplates()
  }

  const filteredTemplates = templates.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h-full flex flex-col bg-white font-sans overflow-hidden">
      {/* Top Header matching Screenshot 4 */}
      <div className="p-6 border-b border-slate-200/80 shrink-0">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Your Templates</h1>
            <p className="text-xs text-slate-500 mt-1">
              Select or create your template and submit it for WhatsApp approval. All templates must adhere to{' '}
              <a
                href="https://business.whatsapp.com/policy"
                target="_blank"
                rel="noreferrer"
                className="text-[#00c25a] font-semibold underline hover:text-emerald-700"
              >
                WhatsApp's guidelines
              </a>
              .
            </p>
          </div>

          {/* Right Action Controls matching Screenshot 4 */}
          <div className="flex items-center gap-3">
            <a
              href="https://youtu.be/RvgbwSsUhCw?si=Br-NxcZOQMfWRXd2"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition cursor-pointer"
            >
              <PlayCircle className="w-4 h-4 fill-blue-600 text-white" />
              <span>Watch Tutorial</span>
            </a>

            <button
              onClick={onOpenNewTemplateModal}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00c25a] hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Template Message</span>
            </button>

            {/* Preview with sample data toggle */}
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <span className="text-xs text-slate-600 font-medium">Preview with sample data</span>
              <button
                onClick={() => setPreviewSample(!previewSample)}
                className={`w-9 h-5 rounded-full p-0.5 transition cursor-pointer ${
                  previewSample ? 'bg-[#00c25a]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    previewSample ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar matching Screenshot 4 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-6">
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-3.5 pr-9 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-primary"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Filter icon with badge 4 */}
            <div className="relative">
              <button className="p-2 rounded-lg bg-[#00c25a] text-white hover:bg-emerald-600 transition cursor-pointer">
                <SlidersHorizontal className="w-4 h-4" />
              </button>
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                4
              </span>
            </div>

            {/* Sort by dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs text-slate-800 font-semibold outline-none"
              >
                <option>Latest</option>
                <option>Alphabetical</option>
                <option>Category</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Channel Selector */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800">
              <span className="w-2 h-2 rounded-full bg-[#00c25a]" />
              <span>Default (+)</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <button
              onClick={() => alert('Exporting templates...')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export</span>
            </button>

            <button
              onClick={() => alert('Import templates...')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-slate-500" />
              <span>Import</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table matching Screenshot 4 */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left text-xs text-slate-600 border-collapse">
          <thead className="bg-slate-50/80 border-b border-slate-200/90 text-[11px] font-bold text-slate-700 uppercase tracking-wider sticky top-0 z-10">
            <tr>
              <th className="py-3.5 px-6">Template Name</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Language</th>
              <th className="py-3.5 px-4">Last Updated</th>
              <th className="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filteredTemplates.map((tpl) => (
              <tr key={tpl.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-6 font-bold text-blue-600 hover:underline cursor-pointer">
                  {tpl.name}
                </td>
                <td className="py-3.5 px-4 text-slate-800">{tpl.category}</td>
                <td className="py-3.5 px-4">
                  <span className="px-3 py-1 rounded-full bg-[#e8f7ee] text-emerald-800 font-bold text-[11px] border border-emerald-200">
                    {tpl.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-700">{tpl.language}</td>
                <td className="py-3.5 px-4 text-slate-500">{tpl.lastUpdated}</td>
                <td className="py-3.5 px-6 text-right">
                  <div className="flex items-center justify-end gap-2 text-slate-400">
                    <button
                      onClick={() => handleDuplicate(tpl.id)}
                      className="p-1.5 hover:text-slate-900 hover:bg-slate-100 rounded transition cursor-pointer"
                      title="Duplicate Template"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(tpl.id)}
                      className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded transition cursor-pointer"
                      title="Delete Template"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onOpenNewTemplateModal(tpl)}
                      className="p-1.5 hover:text-blue-600 hover:bg-blue-50 rounded transition cursor-pointer"
                      title="Edit Template"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Send Campaign Button matching Screenshot 4 */}
                    <button
                      onClick={() => onSendCampaign(tpl)}
                      className="ml-2 px-3 py-1 rounded-lg border border-[#00c25a] text-[#00c25a] hover:bg-emerald-50 text-xs font-bold transition shadow-xs cursor-pointer flex items-center gap-1"
                    >
                      <span>Send Campaign</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer matching Screenshot 4 */}
      <div className="p-4 border-t border-slate-200/80 bg-slate-50/50 flex items-center justify-end gap-6 text-xs text-slate-500 shrink-0">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="bg-white border border-slate-300 rounded px-2 py-0.5 text-xs text-slate-700 outline-none"
          >
            <option>5</option>
            <option>10</option>
            <option>25</option>
          </select>
        </div>

        <span>
          1-{filteredTemplates.length} of 31
        </span>

        <div className="flex items-center gap-2 text-slate-600 font-medium">
          <button className="flex items-center gap-1 hover:text-slate-900 disabled:opacity-30 cursor-pointer" disabled>
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>
          <button className="flex items-center gap-1 hover:text-slate-900 cursor-pointer">
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
