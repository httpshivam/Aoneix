import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EnterpriseScale from './components/EnterpriseScale';
import Metrics from './components/Metrics';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import ClientOnboarding from './components/ClientOnboarding';
import MetaAuthModal from './components/MetaAuthModal';
import AskQuestionModal from './components/AskQuestionModal';
import CheckoutModal from './components/CheckoutModal';
import WebsiteRefreshLoader from './components/WebsiteRefreshLoader';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (window.location.hash === '#onboarding' || window.location.hash === '#onboard') return 'onboarding';
    if (window.location.hash === '#forgot-password' || window.location.hash === '#forgot') return 'forgot-password';
    if (window.location.hash === '#signup' || window.location.hash === '#register') return 'signup';
    if (window.location.hash === '#signin' || window.location.hash === '#login') return 'signin';
    return 'home';
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);
  const [loaderConfig, setLoaderConfig] = useState(() => {
    const hash = window.location.hash;
    let initialMode = 'default';
    if (hash === '#signin' || hash === '#login') initialMode = 'signin';
    else if (hash === '#signup' || hash === '#register') initialMode = 'signup';
    return {
      isOpen: true,
      mode: initialMode,
      key: 1,
    };
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#onboarding' || window.location.hash === '#onboard') {
        setCurrentPage('onboarding');
      } else if (window.location.hash === '#forgot-password' || window.location.hash === '#forgot') {
        setCurrentPage('forgot-password');
      } else if (window.location.hash === '#signup' || window.location.hash === '#register') {
        setCurrentPage('signup');
      } else if (window.location.hash === '#signin' || window.location.hash === '#login') {
        setCurrentPage('signin');
      } else if (window.location.hash === '' || window.location.hash === '#' || window.location.hash.startsWith('#features') || window.location.hash.startsWith('#metrics') || window.location.hash.startsWith('#pricing') || window.location.hash.startsWith('#faq')) {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page, options = {}) => {
    const { showLoader = false, loaderMode = null } = options;

    // Automatically trigger 3-second loader when clicking or navigating to 'signin' or 'signup',
    // or when explicitly requested
    const shouldShowLoader = showLoader || page === 'signin' || page === 'signup';

    if (shouldShowLoader) {
      const mode = loaderMode || (page === 'signin' ? 'signin' : page === 'signup' ? 'signup' : 'default');
      setLoaderConfig({
        isOpen: true,
        mode,
        key: Date.now(),
      });
    }

    setCurrentPage(page);
    if (page === 'onboarding') {
      window.location.hash = '#onboarding';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'forgot-password') {
      window.location.hash = '#forgot-password';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'signup') {
      window.location.hash = '#signup';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'signin') {
      window.location.hash = '#signin';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const triggerCustomLoader = (mode, onFinished) => {
    setLoaderConfig({
      isOpen: true,
      mode: mode || 'default',
      key: Date.now(),
    });
    if (onFinished) {
      setTimeout(() => {
        onFinished();
      }, 3000);
    }
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleAuthenticated = () => {
    setIsAuthModalOpen(false);
    showToast('Meta Cloud API Gateway successfully authenticated! Multi-tenant pipeline ready.');
  };

  const handleCheckoutComplete = () => {
    showToast('Workspace provisioned! Welcome to Aoneix Enterprise.');
  };

  return (
    <>
      {/* 3-Second Creative Liquid Crystal Orb Website Loader */}
      {loaderConfig.isOpen && (
        <WebsiteRefreshLoader
          key={loaderConfig.key}
          duration={3000}
          mode={loaderConfig.mode}
          onComplete={() => setLoaderConfig(prev => ({ ...prev, isOpen: false }))}
        />
      )}

      {currentPage === 'onboarding' ? (
        <ClientOnboarding
          onBack={() => navigateTo('home')}
          onComplete={() => navigateTo('home')}
          showToast={showToast}
        />
      ) : currentPage === 'forgot-password' ? (
        <ForgotPassword
          onBack={() => navigateTo('home')}
          onOpenSignIn={() => navigateTo('signin')}
          onOpenSignUp={() => navigateTo('signup')}
          showToast={showToast}
        />
      ) : currentPage === 'signup' ? (
        <SignUp
          onBack={() => navigateTo('home')}
          onOpenSignIn={() => navigateTo('signin')}
          onOpenOnboarding={() => navigateTo('onboarding')}
          showToast={showToast}
          triggerLoader={triggerCustomLoader}
        />
      ) : currentPage === 'signin' ? (
        <SignIn
          onBack={() => navigateTo('home')}
          onOpenSignUp={() => navigateTo('signup')}
          onOpenForgotPassword={() => navigateTo('forgot-password')}
          showToast={showToast}
          triggerLoader={triggerCustomLoader}
        />
      ) : (
        <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sf selection:bg-[#00c25a] selection:text-white">
          {/* Navigation */}
          <Navbar
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onOpenAnnouncement={() => setAnnouncementModalOpen(true)}
            onNavigateToSignIn={() => navigateTo('signin')}
            onNavigateToSignUp={() => navigateTo('signup')}
          />

          {/* Main Sections Matching Screenshots */}
          <main className="flex-1">
            {/* Screenshot 1: Hero Section with Live WhatsApp Chat Simulator & Provision Card */}
            <Hero
              onOpenAuthModal={() => setIsAuthModalOpen(true)}
              onBadgeClick={(title, desc) => showToast(`✓ ${title} — ${desc}`)}
            />

        {/* Screenshot 2: Engineered For Enterprise Scale with Horizontal Accordion Matrix */}
        <EnterpriseScale
          onSelectFeature={(feat) => {
            showToast(`Selected ${feat.title} — Configured for ${feat.stat}`);
          }}
        />

        {/* Screenshot 3: Full-width Dark Emerald Metrics Banner */}
        <Metrics />

        {/* Screenshot 4: Transparent Tier Architectures (Pricing) */}
        <Pricing
          onSelectPlan={(plan) => setSelectedPlanForCheckout(plan)}
        />

        {/* Screenshot 5: Frequently Asked Question Accordion */}
        <FAQ onOpenAskModal={() => setIsAskModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenAuthModal={() => setIsAuthModalOpen(true)} />
    </div>
  )}

      {/* Interactive Meta Authentication Modal */}
      <MetaAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthenticated={handleAuthenticated}
      />

      {/* Interactive Question Submission Modal */}
      <AskQuestionModal
        isOpen={isAskModalOpen}
        onClose={() => setIsAskModalOpen(false)}
      />

      {/* Checkout / Provisioning Modal */}
      <CheckoutModal
        isOpen={!!selectedPlanForCheckout}
        selectedPlan={selectedPlanForCheckout}
        onClose={() => setSelectedPlanForCheckout(null)}
        onComplete={handleCheckoutComplete}
      />

      {/* Announcement Modal: What's New with Instagram & Facebook DM Automations */}
      {announcementModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-100 relative">
            <button
              onClick={() => setAnnouncementModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-2">
              <Sparkles className="w-4 h-4 text-[#00c25a]" />
              <span>What's New in Aoneix 3.2</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              AI-Powered Instagram & Facebook DM Automations
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Instantly turn Instagram comments and Messenger DMs into synchronized WhatsApp conversations with automated keyword triggers, product carousels, and order checkout flows.
            </p>
            <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl text-xs text-emerald-950 mb-5">
              ✓ Multi-channel inbox unified under a single Meta BSP token vault.
            </div>
            <button
              onClick={() => {
                setAnnouncementModalOpen(false);
                setIsAuthModalOpen(true);
              }}
              className="w-full bg-[#00c25a] hover:bg-[#00a84e] text-gray-950 font-bold text-xs py-2.5 rounded-lg shadow-sm"
            >
              Connect Meta Channels Now
            </button>
          </div>
        </div>
      )}

      {/* Global Floating Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#075e37] text-white px-5 py-3 rounded-xl shadow-2xl border border-emerald-500/30 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300 max-w-md">
          <CheckCircle2 className="w-5 h-5 text-[#00c25a] shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-white/60 hover:text-white ml-auto"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
}
