import React, { useState } from 'react'
import {
  Search,
  SlidersHorizontal,
  Download,
  Upload,
  Trash2,
  Edit2,
  Plus,
  PlayCircle,
  Shield,
  Building,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check
} from 'lucide-react'
import { WhatsAppIcon } from './ChannelIcons.jsx'

export default function ContactsView() {
  const [activeTab, setActiveTab] = useState('contacts') // 'contacts' or 'segments'
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('Last Updated')
  const [selectedContacts, setSelectedContacts] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [isMaskingEnabled, setIsMaskingEnabled] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)

  const [contacts, setContacts] = useState([
    {
      id: 'c-1',
      name: 'Sanes Official',
      phone: '(+91)9953085623',
      countryFlag: '🇮🇳',
      source: 'AIONEX',
      attributes: [
        { key: 'lead_stage', value: 'New Lead' },
        { key: 'contact_owner', value: 'Shivam' },
      ],
    },
    {
      id: 'c-2',
      name: 'Aditi Sharma',
      phone: '(+91)9876543210',
      countryFlag: '🇮🇳',
      source: 'Website Form',
      attributes: [
        { key: 'lead_stage', value: 'Qualified' },
        { key: 'contact_owner', value: 'Aakash' },
      ],
    },
  ])

  // New contact form state
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleAddContact = (e) => {
    e.preventDefault()
    if (!newName || !newPhone) return
    const newEntry = {
      id: `c-${Date.now()}`,
      name: newName,
      phone: newPhone,
      countryFlag: '🇮🇳',
      source: 'AIONEX Dashboard',
      attributes: [
        { key: 'lead_stage', value: 'New Lead' },
        { key: 'contact_owner', value: 'Shivam' },
      ],
    }
    setContacts([newEntry, ...contacts])
    setNewName('')
    setNewPhone('')
    setShowAddModal(false)
  }

  const handleDelete = (id) => {
    setContacts(contacts.filter((c) => c.id !== id))
  }

  const toggleSelectAll = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([])
    } else {
      setSelectedContacts(contacts.map((c) => c.id))
    }
  }

  const toggleSelectContact = (id) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter((item) => item !== id))
    } else {
      setSelectedContacts([...selectedContacts, id])
    }
  }

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  )

  return (
    <div className="max-w-7xl mx-auto py-6 px-6 font-sans">
      {/* 1. Sub-navigation Header (Screenshot 3: Contacts / Segments tabs) */}
      <div className="inline-flex bg-slate-100 p-1 rounded-xl mb-6">
        <button
          onClick={() => setActiveTab('contacts')}
          className={`px-5 py-1.5 text-xs font-bold rounded-lg transition ${
            activeTab === 'contacts'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Contacts
        </button>
        <button
          onClick={() => setActiveTab('segments')}
          className={`px-5 py-1.5 text-xs font-bold rounded-lg transition ${
            activeTab === 'segments'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Segments
        </button>
      </div>

      {/* 2. Page Title & Action Buttons (Screenshot 3) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Contacts ({contacts.length})</h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-2xl leading-relaxed">
            Contact list stores the list of numbers that you've interacted with. You can even manually export or import contacts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.open('http://localhost:3002/#tutorials', '_blank')}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition"
          >
            <PlayCircle className="w-4 h-4 fill-current text-blue-600 text-white" />
            Watch Tutorial
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-brand-primary hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add New
          </button>
        </div>
      </div>

      {/* 3. Feature Callout Card: Business Phone Masking (Screenshot 3) */}
      <div className="mb-6 p-4 rounded-xl border border-blue-300 bg-blue-50/30 flex items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-900 text-white flex items-center gap-1">
            <Building className="w-3 h-3" />
            Business
          </span>
          <p className="text-xs text-slate-800 font-medium">
            Secure customer interactions by masking phone numbers during support conversations.
          </p>
        </div>
        <button
          onClick={() => setIsMaskingEnabled(!isMaskingEnabled)}
          className={`px-4 py-1.5 text-xs font-bold rounded-lg border transition ${
            isMaskingEnabled
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-blue-600 border-blue-400 hover:bg-blue-50'
          }`}
        >
          {isMaskingEnabled ? 'Enabled' : 'Enable now'}
        </button>
      </div>

      {/* 4. Toolbar: Sort, Search, Filter, Export, Import, Delete (Screenshot 3) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
        {/* Left Toolbar */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 shrink-0">
            <span>Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-3 pr-7 py-1.5 text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-brand-primary"
              >
                <option value="Last Updated">Last Updated</option>
                <option value="Name">Name (A-Z)</option>
                <option value="Created Date">Created Date</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Search Contacts Input */}
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contacts"
              className="w-full pl-3 pr-8 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-brand-primary shadow-xs"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Green Filter Sliders Icon (Screenshot 3) */}
          <button
            title="Filter Columns"
            className="p-2 rounded-xl bg-brand-primary text-slate-950 hover:bg-emerald-400 shadow-xs transition"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Toolbar: Export, Import, Delete (Screenshot 3) */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => alert('Contacts exported as CSV!')}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Export
          </button>
          <button
            onClick={() => alert('Select CSV file to import contacts...')}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition flex items-center gap-1.5 shadow-xs"
          >
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            Import
          </button>
          <button
            onClick={() => {
              if (selectedContacts.length > 0) {
                setContacts(contacts.filter((c) => !selectedContacts.includes(c.id)))
                setSelectedContacts([])
              } else {
                alert('Select contacts to delete')
              }
            }}
            className="p-2 text-rose-500 bg-white border border-rose-200 rounded-xl hover:bg-rose-50 transition shadow-xs"
            title="Delete selected contacts"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5. Data Table matching Screenshot 3 */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-[11px] text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
              <tr>
                <th className="py-3 px-4 font-semibold w-10">
                  <input
                    type="checkbox"
                    checked={selectedContacts.length === contacts.length && contacts.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded text-brand-primary focus:ring-emerald-500 cursor-pointer"
                  />
                </th>
                <th className="py-3 px-4 font-semibold">Basic info</th>
                <th className="py-3 px-4 font-semibold">Phone number</th>
                <th className="py-3 px-4 font-semibold">Source</th>
                <th className="py-3 px-4 font-semibold">Contact Attributes</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredContacts.map((contact) => {
                const isSelected = selectedContacts.includes(contact.id)
                return (
                  <tr
                    key={contact.id}
                    className={`hover:bg-slate-50/70 transition-colors ${
                      isSelected ? 'bg-emerald-50/30' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectContact(contact.id)}
                        className="rounded text-brand-primary focus:ring-emerald-500 cursor-pointer"
                      />
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-blue-600 hover:underline cursor-pointer block">
                        {contact.name}
                      </span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <WhatsAppIcon className="w-3 h-3 text-emerald-600" />
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-800">
                      <span className="mr-1.5">{contact.countryFlag}</span>
                      {isMaskingEnabled
                        ? contact.phone.replace(/(\d{4})\d{3}(\d{3})/, '$1***$2')
                        : contact.phone}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-slate-300 bg-white text-slate-700">
                        {contact.source}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {contact.attributes.map((attr, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono"
                          >
                            {attr.key}: {attr.value}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => alert(`Edit contact ${contact.name}`)}
                          className="p-1 text-slate-400 hover:text-slate-700 rounded transition"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded transition"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* 6. Pagination Footer (Screenshot 3) */}
        <div className="p-3.5 border-t border-slate-100 bg-white flex items-center justify-end gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <div className="relative">
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="appearance-none pl-2 pr-6 py-0.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <span>1–{filteredContacts.length} of {filteredContacts.length}</span>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 text-slate-400 hover:text-slate-800 disabled:opacity-30">
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <button className="flex items-center gap-1 text-slate-400 hover:text-slate-800 disabled:opacity-30">
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Add New Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Add New WhatsApp Contact</h3>
            <form onSubmit={handleAddContact} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Contact Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Sanes Official"
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-brand-primary"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">WhatsApp Phone Number</label>
                <input
                  type="tel"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+91 9953085623"
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-brand-primary"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-brand-primary hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition"
                >
                  Save Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
