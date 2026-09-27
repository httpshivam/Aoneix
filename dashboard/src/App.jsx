import React, { useState, useEffect } from 'react'
import OnboardingWizard from './components/OnboardingWizard.jsx'
import TrialBanner from './components/TrialBanner.jsx'
import CopilotBanner from './components/CopilotBanner.jsx'
import DashboardNavbar from './components/DashboardNavbar.jsx'
import CollapsibleSidebar from './components/CollapsibleSidebar.jsx'
import SetupGuideView from './components/SetupGuideView.jsx'
import TeamInboxView from './components/TeamInboxView.jsx'
import CampaignsView from './components/CampaignsView.jsx'
import ContactsView from './components/ContactsView.jsx'
import SettingsView from './components/SettingsView.jsx'
import AutomationsView from './components/automations/AutomationsView.jsx'
import Overview from './components/Overview.jsx'
import AnalyticsView from './components/AnalyticsView.jsx'
import ProfileDrawer from './components/ProfileDrawer.jsx'
import EmbedWhatsAppButtonModal from './components/EmbedWhatsAppButtonModal.jsx'
import ConnectWhatsAppModal from './components/ConnectWhatsAppModal.jsx'
import FloatingWhatsAppWidget from './components/FloatingWhatsAppWidget.jsx'

export default function App() {
  const [isOnboarding, setIsOnboarding] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    const view = params.get('view')
    if (view === 'onboarding') return true
    if (view === 'dashboard') return false
    return window.location.hash === '#onboarding'
  })

  // 'setup' (SS 1 & 2), 'campaigns' (SS 5), 'inbox' (SS 4), 'contacts' (SS 3), etc.
  const [currentView, setCurrentView] = useState('setup')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [completedSteps, setCompletedSteps] = useState(0)

  // Profile Drawer & Modals state (Screenshots 2 & 3)
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false)
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false)
  const [isChannelStatusModalOpen, setIsChannelStatusModalOpen] = useState(false)

  // Listen to browser URL navigation changes
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search)
      const view = params.get('view')
      if (view === 'onboarding' || window.location.hash === '#onboarding') {
        setIsOnboarding(true)
      } else if (view === 'dashboard' || window.location.hash === '#dashboard') {
        setIsOnboarding(false)
      }
    }
    window.addEventListener('popstate', handleUrlChange)
    return () => window.removeEventListener('popstate', handleUrlChange)
  }, [])

  return (
    <div className="h-full w-full bg-[#f8fafc] text-slate-800 flex flex-col font-sans overflow-hidden select-none">
      {isOnboarding ? (
        /* Onboarding View matching AONEIX SignIn Theme */
        <div className="h-full overflow-y-auto relative select-text bg-white">
          <OnboardingWizard
            onComplete={() => {
              setIsOnboarding(false)
              window.history.replaceState({}, '', window.location.pathname + '?view=dashboard')
            }}
            onSkip={() => {
              setIsOnboarding(false)
              window.history.replaceState({}, '', window.location.pathname + '?view=dashboard')
            }}
          />
        </div>
      ) : (
        /* Master Dashboard View */
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* Top Trial Banner (Seen across Screenshots 3, 4 & 5) */}
          <TrialBanner onConnectChannel={() => setIsChannelStatusModalOpen(true)} />

          {/* Copilot AI Banner (Seen in Screenshot 4) */}
          {currentView === 'inbox' && <CopilotBanner />}

          {/* Top Header Navbar */}
          <DashboardNavbar
            completedStepsCount={completedSteps}
            totalSteps={3}
            onRestartOnboarding={() => setIsOnboarding(true)}
            onOpenProfileDrawer={() => setIsProfileDrawerOpen(true)}
          />

          <div className="flex-1 flex min-h-0 overflow-hidden">
            {/* Collapsible Left Sidebar (Screenshot 1) */}
            <CollapsibleSidebar
              currentView={currentView}
              setCurrentView={setCurrentView}
              unreadInboxCount={2}
              isCollapsed={isSidebarCollapsed}
              setIsCollapsed={setIsSidebarCollapsed}
            />

            {/* Main Work Area */}
            <main className="flex-1 min-h-0 min-w-0 overflow-y-auto select-text">
              {/* Screenshots 1 & 2: Setup Guide */}
              {currentView === 'setup' && (
                <SetupGuideView
                  onNavigateToInbox={() => setCurrentView('inbox')}
                  onStepsUpdated={(count) => setCompletedSteps(count)}
                />
              )}

              {/* Screenshot 5: Campaigns & Broadcasts Planner */}
              {(currentView === 'campaigns' || currentView === 'broadcasts') && (
                <CampaignsView />
              )}

              {/* Screenshot 4: Team Inbox & Connect WhatsApp */}
              {currentView === 'inbox' && <TeamInboxView />}

              {/* Screenshot 3: Contacts CRM & Phone Masking */}
              {currentView === 'contacts' && <ContactsView />}

              {/* Automations Module (Screenshots 1, 2, 3, 4, 5 & DaVinci Node Engine) */}
              {currentView === 'automations' && <AutomationsView />}

              {/* Settings Views */}
              {currentView.startsWith('settings') && (
                <SettingsView subTab={currentView} />
              )}

              {currentView === 'overview' && (
                <div className="max-w-7xl mx-auto p-8">
                  <Overview />
                </div>
              )}

              {/* Analytics Module (Screenshots 1-5: Zero-data default & Live representation) */}
              {currentView === 'analytics' && <AnalyticsView />}

              {![
                'setup',
                'campaigns',
                'broadcasts',
                'inbox',
                'contacts',
                'automations',
                'analytics',
                'overview'
              ].includes(currentView) &&
                !currentView.startsWith('settings') && (
                  <div className="max-w-4xl mx-auto py-16 px-6 text-center">
                    <div className="w-14 h-14 bg-emerald-100 text-brand-dark rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold uppercase text-lg">
                      {currentView.slice(0, 2)}
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 capitalize">
                      {currentView} Module
                    </h2>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      Official Meta WhatsApp Business Cloud API module configured with zero-cache dynamic API architecture.
                    </p>
                    <button
                      onClick={() => setCurrentView('setup')}
                      className="mt-6 px-4 py-2 bg-brand-primary hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition"
                    >
                      Back to Setup Guide
                    </button>
                  </div>
                )}
            </main>
          </div>

          {/* Profile Slide-Over Drawer (Screenshot 3 Profile Menu) */}
          <ProfileDrawer
            isOpen={isProfileDrawerOpen}
            onClose={() => setIsProfileDrawerOpen(false)}
            onOpenSettings={(tab) => {
              setCurrentView(tab === 'account' ? 'settings-account' : 'settings-channels')
            }}
            onOpenChannelStatus={() => setIsChannelStatusModalOpen(true)}
            onOpenEmbedModal={() => setIsEmbedModalOpen(true)}
          />

          {/* Embed WhatsApp Button Modal */}
          <EmbedWhatsAppButtonModal
            isOpen={isEmbedModalOpen}
            onClose={() => setIsEmbedModalOpen(false)}
          />

          {/* WhatsApp Channel Status Modal */}
          <ConnectWhatsAppModal
            isOpen={isChannelStatusModalOpen}
            onClose={() => setIsChannelStatusModalOpen(false)}
          />

          {/* Floating WhatsApp Helper Widget */}
          <FloatingWhatsAppWidget />
        </div>
      )}
    </div>
  )
}
