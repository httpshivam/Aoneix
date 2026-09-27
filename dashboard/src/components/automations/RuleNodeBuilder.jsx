import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  ArrowLeft,
  Save,
  Play,
  Plus,
  Trash2,
  Copy,
  Edit3,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Filter,
  Zap,
  Bot,
  UserCheck,
  Clock,
  ExternalLink,
  ChevronRight,
  Send,
  Sparkles,
  Sliders,
  Check,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Move,
  RotateCcw,
  Unlink,
  Link2,
  Grid,
  ArrowRight
} from 'lucide-react'
import { WhatsAppIcon } from '../ChannelIcons.jsx'
import { automationsApi } from '../../api/index.js'

export default function RuleNodeBuilder({ rule, onBack, onSaveRule }) {
  // Default node positions placed at angles / freeform canvas
  const initialNodes = rule?.nodes && rule.nodes.length > 0
    ? rule.nodes.map((n, i) => ({
        ...n,
        x: n.x ?? (80 + i * 360),
        y: n.y ?? (140 + (i % 2 === 1 ? -40 : 50)),
        width: n.width ?? 310,
        height: n.height ?? 240
      }))
    : [
        {
          id: 'node-1',
          type: 'trigger',
          badge: 'When',
          title: 'New WhatsApp message is received',
          subtitle: 'Channel: Default (+)',
          iconType: 'whatsapp',
          x: 80,
          y: 180,
          width: 310,
          height: 240,
          config: { channel: 'Default (+)', event: 'message_received' }
        },
        {
          id: 'node-2',
          type: 'filter',
          badge: 'Filter',
          title: 'Continue rule only if',
          subtitle: 'Matches keyword greeting variations',
          tags: ['Incoming message', 'Fuzzy matches', '3 keywords'],
          keywords: ['hello', 'hi', 'hey'],
          iconType: 'filter',
          x: 460,
          y: 110, // angled higher
          width: 320,
          height: 250,
          config: { condition: 'keyword_match', keywords: ['hello', 'hi', 'hey'], matchType: 'fuzzy' }
        },
        {
          id: 'node-3',
          type: 'action',
          badge: 'Then',
          title: 'Send message',
          subtitle: 'Template: WA Sample keyword response text',
          previewText: 'Hello to you too! You just triggered an automation rule! Rules give you a powerful way to automate your WhatsApp interactions and target specific customer segments.',
          tags: ['WA Sample keyword response text'],
          iconType: 'message',
          x: 850,
          y: 220, // angled lower
          width: 330,
          height: 260,
          config: { actionType: 'send_text', materialId: 'mat-sample' }
        }
      ]

  // Initial connections
  const initialConnections = []
  for (let i = 0; i < initialNodes.length - 1; i++) {
    initialConnections.push({
      id: `conn-${initialNodes[i].id}-${initialNodes[i + 1].id}`,
      from: initialNodes[i].id,
      to: initialNodes[i + 1].id
    })
  }

  const [nodes, setNodes] = useState(initialNodes)
  const [connections, setConnections] = useState(initialConnections)
  const [ruleName, setRuleName] = useState(rule?.name || 'WA Hello keyword sample rule')
  const [isRuleOn, setIsRuleOn] = useState(rule?.status ?? true)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Canvas pan & zoom state
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })

  // Node Dragging State
  const [draggingNodeId, setDraggingNodeId] = useState(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  // Node Resizing State ("bada kar paye")
  const [resizingNodeId, setResizingNodeId] = useState(null)
  const [resizeStart, setResizeStart] = useState({ mouseX: 0, mouseY: 0, width: 0, height: 0 })

  // Interactive Wire Creation & Rewiring State
  const [drawingWire, setDrawingWire] = useState(null) // { fromNodeId: string, currentMouseX: number, currentMouseY: number }
  const [hoveredInputNodeId, setHoveredInputNodeId] = useState(null)

  // Node Edit Modal
  const [editingNode, setEditingNode] = useState(null)
  const [editFormData, setEditFormData] = useState({})

  // Add Node Modal
  const [isAddNodeOpen, setIsAddNodeOpen] = useState(false)

  // Simulator Drawer
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false)
  const [testInput, setTestInput] = useState('hello')
  const [simulationResult, setSimulationResult] = useState(null)
  const [simulating, setSimulating] = useState(false)
  const [activeHighlightNodeId, setActiveHighlightNodeId] = useState(null)
  const [activeSignalWireId, setActiveSignalWireId] = useState(null)

  const canvasRef = useRef(null)

  // Convert mouse screen coordinates to canvas-space coordinates
  const getCanvasCoords = useCallback(
    (clientX, clientY) => {
      if (!canvasRef.current) return { x: 0, y: 0 }
      const rect = canvasRef.current.getBoundingClientRect()
      return {
        x: (clientX - rect.left - pan.x) / zoom,
        y: (clientY - rect.top - pan.y) / zoom
      }
    },
    [pan, zoom]
  )

  // Dragging / Resizing / Wire Drawing Handlers
  const handleMouseDownCanvas = (e) => {
    // Only pan if clicking empty canvas background
    if (e.target === canvasRef.current || e.target.tagName === 'svg') {
      setIsPanning(true)
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    }
  }

  const handleStartDragNode = (e, nodeId) => {
    e.stopPropagation()
    const coords = getCanvasCoords(e.clientX, e.clientY)
    const node = nodes.find((n) => n.id === nodeId)
    if (!node) return
    setDraggingNodeId(nodeId)
    setDragOffset({
      x: coords.x - node.x,
      y: coords.y - node.y
    })
  }

  const handleStartResizeNode = (e, nodeId) => {
    e.stopPropagation()
    const node = nodes.find((n) => n.id === nodeId)
    if (!node) return
    setResizingNodeId(nodeId)
    setResizeStart({
      mouseX: e.clientX,
      mouseY: e.clientY,
      width: node.width || 310,
      height: node.height || 240
    })
  }

  // Start drawing wire from right output pin
  const handleStartDrawingWire = (e, nodeId) => {
    e.stopPropagation()
    const coords = getCanvasCoords(e.clientX, e.clientY)
    setDrawingWire({
      fromNodeId: nodeId,
      currentMouseX: coords.x,
      currentMouseY: coords.y
    })
  }

  // Detach existing wire and begin re-connecting it
  const handleDetachWireAndReRoute = (e, targetNodeId) => {
    e.stopPropagation()
    const existingConn = connections.find((c) => c.to === targetNodeId)
    if (existingConn) {
      // Detach and turn it into active wire from source node!
      const coords = getCanvasCoords(e.clientX, e.clientY)
      setConnections((prev) => prev.filter((c) => c.id !== existingConn.id))
      setDrawingWire({
        fromNodeId: existingConn.from,
        currentMouseX: coords.x,
        currentMouseY: coords.y
      })
    }
  }

  // Complete wire connection when dropped on input pin
  const handleCompleteWire = (targetNodeId) => {
    if (drawingWire && drawingWire.fromNodeId !== targetNodeId) {
      // Remove any existing outgoing connection from this source if reconnecting
      setConnections((prev) => [
        ...prev.filter((c) => !(c.from === drawingWire.fromNodeId && c.to === targetNodeId)),
        {
          id: `conn-${drawingWire.fromNodeId}-${targetNodeId}`,
          from: drawingWire.fromNodeId,
          to: targetNodeId
        }
      ])
    }
    setDrawingWire(null)
    setHoveredInputNodeId(null)
  }

  // Direct Re-routing from Dropdown Selector ("ek se hatakar dusre me connect")
  const handleSelectTargetNode = (fromNodeId, targetNodeId) => {
    // Remove existing wire from this node
    setConnections((prev) => prev.filter((c) => c.from !== fromNodeId))

    if (targetNodeId && targetNodeId !== 'none') {
      setConnections((prev) => [
        ...prev,
        {
          id: `conn-${fromNodeId}-${targetNodeId}`,
          from: fromNodeId,
          to: targetNodeId
        }
      ])
    }
  }

  const handleDisconnectWire = (connId) => {
    setConnections((prev) => prev.filter((c) => c.id !== connId))
  }

  // Global mouse move and up handlers
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Panning
      if (isPanning) {
        setPan({
          x: e.clientX - panStart.x,
          y: e.clientY - panStart.y
        })
        return
      }

      // Dragging node at ANY angle
      if (draggingNodeId) {
        const coords = getCanvasCoords(e.clientX, e.clientY)
        setNodes((prev) =>
          prev.map((n) => {
            if (n.id === draggingNodeId) {
              return {
                ...n,
                x: Math.round(coords.x - dragOffset.x),
                y: Math.round(coords.y - dragOffset.y)
              }
            }
            return n
          })
        )
        return
      }

      // Resizing node ("bada kar paye")
      if (resizingNodeId) {
        const deltaX = (e.clientX - resizeStart.mouseX) / zoom
        const deltaY = (e.clientY - resizeStart.mouseY) / zoom
        setNodes((prev) =>
          prev.map((n) => {
            if (n.id === resizingNodeId) {
              return {
                ...n,
                width: Math.max(260, Math.min(650, Math.round(resizeStart.width + deltaX))),
                height: Math.max(180, Math.min(550, Math.round(resizeStart.height + deltaY)))
              }
            }
            return n
          })
        )
        return
      }

      // Drawing interactive wire
      if (drawingWire) {
        const coords = getCanvasCoords(e.clientX, e.clientY)
        setDrawingWire((prev) => ({
          ...prev,
          currentMouseX: coords.x,
          currentMouseY: coords.y
        }))
      }
    }

    const handleMouseUp = () => {
      setIsPanning(false)
      setDraggingNodeId(null)
      setResizingNodeId(null)
      if (drawingWire) {
        setDrawingWire(null)
        setHoveredInputNodeId(null)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isPanning, panStart, draggingNodeId, dragOffset, resizingNodeId, resizeStart, drawingWire, zoom, getCanvasCoords])

  // Save rule
  const handleSave = async () => {
    const updated = {
      ...(rule || {}),
      id: rule?.id || `rule-${Date.now()}`,
      name: ruleName,
      status: isRuleOn,
      nodes: nodes.map((n) => ({
        ...n,
        x: n.x,
        y: n.y,
        width: n.width,
        height: n.height
      })),
      connections
    }
    await automationsApi.saveRule(updated)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2500)
    onSaveRule?.(updated)
  }

  // Auto arrange nodes
  const handleAutoArrange = () => {
    setNodes((prev) =>
      prev.map((node, i) => ({
        ...node,
        x: 80 + i * 360,
        y: 150 + (i % 2 === 1 ? -40 : 40),
        width: 310,
        height: 240
      }))
    )
  }

  // Reset View
  const handleResetView = () => {
    setPan({ x: 0, y: 0 })
    setZoom(1)
  }

  // Node editing modal
  const openEditModal = (node) => {
    setEditingNode(node)
    setEditFormData({
      title: node.title,
      subtitle: node.subtitle,
      previewText: node.previewText || '',
      keywords: node.keywords ? node.keywords.join(', ') : '',
      channel: node.config?.channel || 'Default (+)'
    })
  }

  const handleSaveNodeEdit = () => {
    if (!editingNode) return
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === editingNode.id) {
          const updated = {
            ...n,
            title: editFormData.title || n.title,
            subtitle: editFormData.subtitle || n.subtitle,
            previewText: editFormData.previewText !== undefined ? editFormData.previewText : n.previewText
          }
          if (editFormData.keywords) {
            updated.keywords = editFormData.keywords.split(',').map((k) => k.trim()).filter(Boolean)
            updated.tags = ['Incoming message', 'Fuzzy matches', `${updated.keywords.length} keywords`]
          }
          return updated
        }
        return n
      })
    )
    setEditingNode(null)
  }

  const handleDeleteNode = (nodeId) => {
    if (nodes.length <= 1) return
    setNodes((prev) => prev.filter((n) => n.id !== nodeId))
    setConnections((prev) => prev.filter((c) => c.from !== nodeId && c.to !== nodeId))
  }

  const handleAddNode = (typeKey) => {
    const id = `node-${Date.now()}`
    const lastNode = nodes[nodes.length - 1]
    const newX = lastNode ? lastNode.x + 360 : 200
    const newY = lastNode ? lastNode.y + 40 : 180

    let newNode = null
    if (typeKey === 'filter_keyword') {
      newNode = {
        id,
        type: 'filter',
        badge: 'Filter',
        title: 'Continue rule only if',
        subtitle: 'Matches keyword filter',
        tags: ['Incoming message', 'Exact match', '1 keyword'],
        keywords: ['pricing'],
        iconType: 'filter',
        x: newX,
        y: newY,
        width: 310,
        height: 240,
        config: { condition: 'keyword_match', keywords: ['pricing'], matchType: 'exact' }
      }
    } else if (typeKey === 'action_message') {
      newNode = {
        id,
        type: 'action',
        badge: 'Then',
        title: 'Send message',
        subtitle: 'Automated WhatsApp Message Response',
        previewText: 'Thank you for reaching out! Here is the information you requested.',
        tags: ['Custom text response'],
        iconType: 'message',
        x: newX,
        y: newY,
        width: 320,
        height: 250,
        config: { actionType: 'send_text' }
      }
    } else if (typeKey === 'action_ai') {
      newNode = {
        id,
        type: 'action',
        badge: 'Then (Auto)',
        title: 'Handover to Auto-Responder',
        subtitle: 'Automatically resolves common queries with rule-based keywords',
        previewText: 'Auto-responder matches incoming customer queries against verified business response materials.',
        tags: ['Auto-Responder', 'Keyword Fallback'],
        iconType: 'bot',
        x: newX,
        y: newY,
        width: 320,
        height: 250,
        config: { actionType: 'auto_responder' }
      }
    } else if (typeKey === 'action_assign') {
      newNode = {
        id,
        type: 'action',
        badge: 'Then',
        title: 'Assign conversation',
        subtitle: 'Route chat to Sales Support Queue (Round Robin)',
        tags: ['Team: Sales', 'Round Robin'],
        iconType: 'user',
        x: newX,
        y: newY,
        width: 310,
        height: 230,
        config: { actionType: 'assign_agent' }
      }
    } else if (typeKey === 'action_delay') {
      newNode = {
        id,
        type: 'delay',
        badge: 'Wait',
        title: 'Delay execution',
        subtitle: 'Wait 5 minutes before next step',
        tags: ['Timer: 5 minutes'],
        iconType: 'clock',
        x: newX,
        y: newY,
        width: 300,
        height: 220,
        config: { durationMinutes: 5 }
      }
    }

    if (newNode) {
      setNodes((prev) => [...prev, newNode])
      if (lastNode) {
        setConnections((prev) => [
          ...prev,
          { id: `conn-${lastNode.id}-${newNode.id}`, from: lastNode.id, to: newNode.id }
        ])
      }
    }
    setIsAddNodeOpen(false)
  }

  // Simulation runner with wire lighting
  const runSimulation = async () => {
    setSimulating(true)
    setSimulationResult(null)
    setActiveHighlightNodeId(null)
    setActiveSignalWireId(null)

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      setActiveHighlightNodeId(node.id)

      if (i > 0) {
        const prevNode = nodes[i - 1]
        const conn = connections.find((c) => c.from === prevNode.id && c.to === node.id)
        if (conn) setActiveSignalWireId(conn.id)
      }

      await new Promise((r) => setTimeout(r, 650))
    }

    const res = await automationsApi.simulateExecution(rule?.id || 'rule-hello', testInput)
    setSimulationResult(res.data)
    setSimulating(false)
    setActiveHighlightNodeId(null)
    setActiveSignalWireId(null)
  }

  // Node Header Color in Clean White Theme
  const getNodeHeaderColor = (type) => {
    switch (type) {
      case 'trigger':
        return 'bg-emerald-50 text-emerald-950 border-b border-emerald-100'
      case 'filter':
        return 'bg-amber-50 text-amber-950 border-b border-amber-100'
      case 'action':
        return 'bg-rose-50 text-rose-950 border-b border-rose-100'
      case 'delay':
        return 'bg-purple-50 text-purple-950 border-b border-purple-100'
      default:
        return 'bg-slate-50 text-slate-900 border-b border-slate-200'
    }
  }

  const getNodeIcon = (node) => {
    if (node.iconType === 'whatsapp') {
      return <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
    }
    if (node.iconType === 'filter') {
      return <Filter className="w-4 h-4 text-red-600" />
    }
    if (node.iconType === 'bot') {
      return <Bot className="w-4 h-4 text-cyan-600" />
    }
    if (node.iconType === 'user') {
      return <UserCheck className="w-4 h-4 text-blue-600" />
    }
    if (node.iconType === 'clock') {
      return <Clock className="w-4 h-4 text-purple-600" />
    }
    return <MessageSquare className="w-4 h-4 text-rose-600" />
  }

  // Calculate Bezier Curve Coordinates between two nodes
  const getWirePath = (fromNode, toNode) => {
    if (!fromNode || !toNode) return ''
    const x1 = fromNode.x + fromNode.width
    const y1 = fromNode.y + fromNode.height / 2
    const x2 = toNode.x
    const y2 = toNode.y + toNode.height / 2

    const dx = Math.abs(x2 - x1) * 0.55
    const cx1 = x1 + Math.max(dx, 60)
    const cy1 = y1
    const cx2 = x2 - Math.max(dx, 60)
    const cy2 = y2

    return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`
  }

  const getWireMidPoint = (fromNode, toNode) => {
    if (!fromNode || !toNode) return { x: 0, y: 0 }
    const x1 = fromNode.x + fromNode.width
    const y1 = fromNode.y + fromNode.height / 2
    const x2 = toNode.x
    const y2 = toNode.y + toNode.height / 2
    return {
      x: (x1 + x2) / 2,
      y: (y1 + y2) / 2
    }
  }

  return (
    <div className="h-full flex flex-col bg-[#f8fafc] font-sans select-none overflow-hidden relative">
      {/* Top Header Bar in Clean White Theme */}
      <div className="h-14 bg-white border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between shrink-0 z-20 shadow-xs gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition cursor-pointer shrink-0"
            title="Back to Rules List"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00c25a] animate-pulse shrink-0" />
            <input
              type="text"
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
              className="font-bold text-sm text-slate-900 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-brand-primary px-3 py-1 rounded-lg outline-none transition w-44 sm:w-64 truncate"
              placeholder="Rule Name..."
            />
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Zoom controls */}
          <div className="flex items-center bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 shrink-0">
            <button
              onClick={() => setZoom((z) => Math.max(0.4, Number((z - 0.1).toFixed(1))))}
              className="p-1.5 hover:bg-slate-200 rounded-l-lg hover:text-slate-950"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 py-1 text-[11px] font-mono font-bold text-slate-700 select-none">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(1.8, Number((z + 0.1).toFixed(1))))}
              className="p-1.5 hover:bg-slate-200 rounded-r-lg hover:text-slate-950"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Auto Arrange & Reset */}
          <button
            onClick={handleAutoArrange}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition cursor-pointer shrink-0"
            title="Auto Arrange Nodes"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Tidy</span>
          </button>

          <button
            onClick={handleResetView}
            className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition cursor-pointer shrink-0"
            title="Reset Pan & Zoom"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          {/* Add Node */}
          <button
            onClick={() => setIsAddNodeOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold transition cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-600" />
            <span>Add Node</span>
          </button>

          {/* Simulate Flow */}
          <button
            onClick={() => setIsSimulatorOpen(!isSimulatorOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 text-xs font-bold transition shadow-xs cursor-pointer shrink-0"
          >
            <Play className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Simulate Flow</span>
          </button>

          {/* Save Changes */}
          <button
            onClick={handleSave}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition shadow-xs cursor-pointer shrink-0 ${
              saveSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-[#00c25a] hover:bg-emerald-500 text-white'
            }`}
          >
            {saveSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save</span>
              </>
            )}
          </button>

          {/* On/Off Switch */}
          <button
            onClick={() => setIsRuleOn(!isRuleOn)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition shadow-xs cursor-pointer shrink-0 ${
              isRuleOn
                ? 'bg-[#00c25a] text-white'
                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isRuleOn ? 'bg-white' : 'bg-slate-400'
              }`}
            />
            <span>{isRuleOn ? 'On' : 'Off'}</span>
          </button>
        </div>
      </div>

      {/* Main 2D Canvas Viewport in Clean White / Light Slate Theme */}
      <div className="flex-1 flex overflow-hidden relative">
        <div
          ref={canvasRef}
          onMouseDown={handleMouseDownCanvas}
          className={`flex-1 h-full w-full relative overflow-hidden bg-[#f8fafc] cursor-${
            isPanning ? 'grabbing' : 'grab'
          }`}
          style={{
            backgroundImage:
              'radial-gradient(circle, #cbd5e1 1.2px, transparent 1.2px)',
            backgroundSize: `${28 * zoom}px ${28 * zoom}px`,
            backgroundPosition: `${pan.x}px ${pan.y}px`
          }}
        >
          {/* Zoomed & Panned Viewport */}
          <div
            className="absolute inset-0 origin-top-left pointer-events-none"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              width: '4000px',
              height: '3000px'
            }}
          >
            {/* SVG Layer for Bezier Connecting Wires */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-auto"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <linearGradient id="wireGradientLight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00c25a" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
                <linearGradient id="wireActiveGradientLight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
                <filter id="lightGlow">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#00c25a" floodOpacity="0.3" />
                </filter>
              </defs>

              {/* Connected Wires */}
              {connections.map((conn) => {
                const fromNode = nodes.find((n) => n.id === conn.from)
                const toNode = nodes.find((n) => n.id === conn.to)
                if (!fromNode || !toNode) return null

                const pathData = getWirePath(fromNode, toNode)
                const mid = getWireMidPoint(fromNode, toNode)
                const isActiveSignal = activeSignalWireId === conn.id

                return (
                  <g key={conn.id} className="group cursor-pointer">
                    {/* Thicker hover hit target */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke="transparent"
                      strokeWidth="24"
                      className="cursor-pointer"
                    />

                    {/* Outer Glow */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={isActiveSignal ? '#f59e0b' : '#00c25a'}
                      strokeWidth={isActiveSignal ? 8 : 4}
                      strokeOpacity={isActiveSignal ? 0.7 : 0.25}
                      filter="url(#lightGlow)"
                    />

                    {/* Main Bezier Wire */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={isActiveSignal ? 'url(#wireActiveGradientLight)' : 'url(#wireGradientLight)'}
                      strokeWidth={isActiveSignal ? 4 : 3}
                      strokeDasharray={isActiveSignal ? '6 4' : 'none'}
                      className={isActiveSignal ? 'animate-pulse' : ''}
                    />

                    {/* Disconnect helper button on wire midpoint hover */}
                    <g
                      transform={`translate(${mid.x - 14}, ${mid.y - 14})`}
                      className="opacity-0 group-hover:opacity-100 transition duration-200 cursor-pointer"
                      onClick={() => handleDisconnectWire(conn.id)}
                    >
                      <circle cx="14" cy="14" r="14" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                      <line x1="10" y1="10" x2="18" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="18" y1="10" x2="10" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                    </g>
                  </g>
                )
              })}

              {/* Wire Being Drawn Interactively */}
              {drawingWire && (() => {
                const fromNode = nodes.find((n) => n.id === drawingWire.fromNodeId)
                if (!fromNode) return null
                const x1 = fromNode.x + fromNode.width
                const y1 = fromNode.y + fromNode.height / 2
                const x2 = drawingWire.currentMouseX
                const y2 = drawingWire.currentMouseY
                const dx = Math.abs(x2 - x1) * 0.5
                const cx1 = x1 + Math.max(dx, 50)
                const cy1 = y1
                const cx2 = x2 - Math.max(dx, 50)
                const cy2 = y2
                const livePath = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`

                return (
                  <path
                    d={livePath}
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="3.5"
                    strokeDasharray="5 5"
                    className="animate-pulse"
                  />
                )
              })()}
            </svg>

            {/* Draggable, Resizable, and Reconnectable Node Cards in White Theme */}
            {nodes.map((node) => {
              const isHighlighted = activeHighlightNodeId === node.id
              const isBeingDragged = draggingNodeId === node.id
              const isHoveredTarget = hoveredInputNodeId === node.id

              // Find current outgoing connection for this node
              const currentOutgoing = connections.find((c) => c.from === node.id)
              // Find incoming connection
              const currentIncoming = connections.find((c) => c.to === node.id)

              return (
                <div
                  key={node.id}
                  style={{
                    position: 'absolute',
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    width: `${node.width}px`,
                    height: `${node.height}px`
                  }}
                  className={`pointer-events-auto rounded-2xl bg-white border transition-all duration-150 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-lg ${
                    isHighlighted
                      ? 'border-emerald-500 ring-4 ring-emerald-400/40 shadow-xl'
                      : isBeingDragged
                      ? 'border-brand-primary shadow-xl ring-2 ring-brand-primary/40'
                      : 'border-slate-200/90 hover:border-slate-400'
                  }`}
                >
                  {/* Left Connection Input Port Pin */}
                  <div
                    onMouseEnter={() => setHoveredInputNodeId(node.id)}
                    onMouseLeave={() => setHoveredInputNodeId(null)}
                    onMouseUp={() => handleCompleteWire(node.id)}
                    onMouseDown={(e) => {
                      // If wire is already connected to this pin, clicking & dragging detaches it!
                      if (currentIncoming) {
                        handleDetachWireAndReRoute(e, node.id)
                      }
                    }}
                    title={
                      currentIncoming
                        ? 'Connected! Drag to detach and reconnect to another node'
                        : 'Drop wire here to connect'
                    }
                    className={`absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border-2 transition-all flex items-center justify-center cursor-pointer z-30 shadow-xs ${
                      isHoveredTarget || drawingWire
                        ? 'border-emerald-500 scale-125 bg-emerald-50 ring-4 ring-emerald-300/40'
                        : currentIncoming
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-slate-400 hover:border-emerald-500 hover:scale-110'
                    }`}
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        currentIncoming || isHoveredTarget ? 'bg-emerald-600' : 'bg-slate-500'
                      }`}
                    />
                  </div>

                  {/* Right Connection Output Port Pin */}
                  <div
                    onMouseDown={(e) => handleStartDrawingWire(e, node.id)}
                    title="Drag wire to connect with next node"
                    className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border-2 border-emerald-500 hover:border-brand-dark hover:scale-125 hover:bg-emerald-50 transition-all flex items-center justify-center cursor-crosshair z-30 shadow-xs"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00c25a]" />
                  </div>

                  {/* Node Header (Draggable Handle in White Theme) */}
                  <div
                    onMouseDown={(e) => handleStartDragNode(e, node.id)}
                    className={`px-3.5 py-2.5 flex items-center justify-between cursor-move select-none ${getNodeHeaderColor(
                      node.type
                    )}`}
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {getNodeIcon(node)}
                      <span className="text-xs font-bold uppercase tracking-wider truncate">
                        {node.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openEditModal(node)}
                        className="p-1 rounded hover:bg-slate-200/60 text-slate-600 hover:text-slate-900 transition cursor-pointer"
                        title="Edit Node"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      {nodes.length > 1 && (
                        <button
                          onClick={() => handleDeleteNode(node.id)}
                          className="p-1 rounded hover:bg-red-50 text-slate-400 hover:text-red-600 transition cursor-pointer"
                          title="Remove Node"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Node Content Body (Clean White Theme) */}
                  <div className="p-3.5 flex-1 flex flex-col justify-between overflow-y-auto text-xs bg-white text-slate-800">
                    <div>
                      {/* Title */}
                      <h4 className="font-bold text-slate-900 text-xs leading-snug">
                        {node.title}
                      </h4>

                      {/* Subtitle */}
                      <p className="text-[11px] text-slate-500 mt-1">
                        {node.subtitle}
                      </p>

                      {/* Tags */}
                      {node.tags && node.tags.length > 0 && (
                        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                          {node.tags.map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Preview Text */}
                      {node.previewText && (
                        <div className="mt-2 p-2 rounded-xl bg-slate-50 border border-slate-200/90 text-[11px] text-slate-600 line-clamp-3 leading-relaxed">
                          "{node.previewText}"
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Connection Selector Bar ("ek se hatakar dusre me connect karein") */}
                  <div className="px-3 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 flex-1 min-w-0">
                      <Link2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="text-slate-500 font-medium shrink-0">Connects to:</span>
                      <select
                        value={currentOutgoing?.to || 'none'}
                        onChange={(e) => handleSelectTargetNode(node.id, e.target.value)}
                        className="bg-white border border-slate-300 rounded-md px-2 py-0.5 text-[11px] font-bold text-slate-800 outline-none flex-1 truncate hover:border-brand-primary cursor-pointer"
                      >
                        <option value="none">-- Detach / No Wire --</option>
                        {nodes
                          .filter((other) => other.id !== node.id)
                          .map((other) => (
                            <option key={other.id} value={other.id}>
                              {other.badge}: {other.title.slice(0, 22)}...
                            </option>
                          ))}
                      </select>
                    </div>

                    {currentOutgoing && (
                      <button
                        onClick={() => handleDisconnectWire(currentOutgoing.id)}
                        className="ml-2 text-slate-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition cursor-pointer"
                        title="Disconnect wire"
                      >
                        <Unlink className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Corner Resize Handle ("bada kar paye") */}
                  <div
                    onMouseDown={(e) => handleStartResizeNode(e, node.id)}
                    title="Drag to resize node"
                    className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-end justify-end p-0.5 z-30 text-slate-400 hover:text-emerald-600"
                  >
                    <svg viewBox="0 0 6 6" className="w-2.5 h-2.5 fill-current">
                      <path d="M6 6H0L6 0V6Z" />
                    </svg>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Live Simulator Drawer in Clean White Theme */}
        {isSimulatorOpen && (
          <div className="w-80 sm:w-96 bg-white border-l border-slate-200/90 flex flex-col shrink-0 shadow-2xl z-30 animate-fadeIn text-slate-800 font-sans">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                <h4 className="text-xs font-bold">Node Flow Simulator</h4>
              </div>
              <button
                onClick={() => setIsSimulatorOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-4 border-b border-slate-200 bg-slate-50 space-y-2">
              <label className="text-[11px] font-bold text-slate-700 block">
                Simulate Incoming Message:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={testInput}
                  onChange={(e) => setTestInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && runSimulation()}
                  placeholder="e.g. Hello, pricing, help"
                  className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-800 bg-white focus:border-brand-primary outline-none"
                />
                <button
                  onClick={runSimulation}
                  disabled={simulating}
                  className="px-3 py-1.5 rounded-lg bg-[#00c25a] hover:bg-emerald-600 text-white font-bold text-xs transition cursor-pointer disabled:opacity-50"
                >
                  {simulating ? 'Tracing...' : 'Run'}
                </button>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                <span>Quick tests:</span>
                <button
                  onClick={() => setTestInput('hello')}
                  className="text-emerald-700 underline font-semibold cursor-pointer"
                >
                  "hello"
                </button>
                <span>•</span>
                <button
                  onClick={() => setTestInput('pricing')}
                  className="text-emerald-700 underline font-semibold cursor-pointer"
                >
                  "pricing"
                </button>
              </div>
            </div>

            {/* Trace Output */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {simulationResult ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Node Trace
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        simulationResult.passed
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-red-100 text-red-800 border border-red-300'
                      }`}
                    >
                      {simulationResult.passed ? 'Execution Success' : 'Filter Stopped'}
                    </span>
                  </div>

                  {simulationResult.executionLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border text-xs ${
                        log.status === 'success'
                          ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                          : 'bg-red-50/50 border-red-200 text-red-900'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold mb-1">
                        {log.status === 'success' ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-red-600" />
                        )}
                        <span>{log.label}</span>
                      </div>
                      <p className="text-[11px] text-slate-600">{log.detail}</p>
                    </div>
                  ))}

                  {simulationResult.passed && (
                    <div className="pt-2 border-t border-slate-200">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                        WhatsApp Reply Delivered:
                      </span>
                      <div className="bg-[#e7fce3] p-3 rounded-2xl rounded-tl-none border border-emerald-300 text-xs text-slate-800 shadow-xs leading-relaxed">
                        {simulationResult.executionLogs.find((l) => l.reply)?.reply ||
                          nodes.find((n) => n.previewText)?.previewText}
                        <div className="text-[9px] text-emerald-700 text-right mt-1 font-semibold">
                          Delivered ✓✓
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                  <Play className="w-8 h-8 text-slate-300 mb-2" />
                  <p className="text-xs font-semibold text-slate-600">Ready to trace</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Click 'Run' to watch electricity signals flow down the wires between your nodes!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Edit Node Modal */}
      {editingNode && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn text-slate-800">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">
                Configure Node ({editingNode.badge})
              </h3>
              <button
                onClick={() => setEditingNode(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Node Title
                </label>
                <input
                  type="text"
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 focus:border-brand-primary outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={editFormData.subtitle}
                  onChange={(e) => setEditFormData({ ...editFormData, subtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 focus:border-brand-primary outline-none"
                />
              </div>

              {editingNode.type === 'filter' && (
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Filter Keywords (comma separated)
                  </label>
                  <input
                    type="text"
                    value={editFormData.keywords}
                    onChange={(e) => setEditFormData({ ...editFormData, keywords: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 focus:border-brand-primary outline-none"
                  />
                </div>
              )}

              {editingNode.type === 'action' && (
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Response Text
                  </label>
                  <textarea
                    rows={4}
                    value={editFormData.previewText}
                    onChange={(e) => setEditFormData({ ...editFormData, previewText: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 focus:border-brand-primary outline-none"
                  />
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
              <button
                onClick={() => setEditingNode(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNodeEdit}
                className="px-4 py-2 rounded-xl bg-brand-primary hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-xs"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Node Modal */}
      {isAddNodeOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn text-slate-800">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">Add Node to Graph</h3>
              <button
                onClick={() => setIsAddNodeOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[70vh] overflow-y-auto">
              <button
                onClick={() => handleAddNode('action_message')}
                className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-brand-primary bg-white hover:bg-emerald-50/40 text-left transition group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-brand-dark">
                    Send Message
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Deliver automated WhatsApp reply.
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleAddNode('filter_keyword')}
                className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-amber-400 bg-white hover:bg-amber-50/40 text-left transition group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <Filter className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-800">
                    Filter / Condition
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Branch rule by keywords or tags.
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleAddNode('action_ai')}
                className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-cyan-400 bg-white hover:bg-cyan-50/40 text-left transition group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-cyan-800">
                    Deploy Auto-Responder
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Hand over to automated keyword auto-responder.
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleAddNode('action_assign')}
                className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50/40 text-left transition group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-800">
                    Assign Agent
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Route chat to human specialist.
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleAddNode('action_delay')}
                className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-purple-400 bg-white hover:bg-purple-50/40 text-left transition group cursor-pointer sm:col-span-2"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-purple-800">
                    Wait / Delay
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Pause execution before next action.
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
