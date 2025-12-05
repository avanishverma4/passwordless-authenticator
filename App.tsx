import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppRoute } from './types';
import { Modal } from './components/ui';

import { 
  WelcomeScreen, 
  EmailInputScreen, 
  VerificationScreen 
} from './screens/AuthScreens';
import { 
  RoleSelectionScreen, 
  QuickSettingsScreen, 
  SuccessScreen 
} from './screens/OnboardingScreens';

// Animated Routes Wrapper
const AnimatedRoutes = ({ onTriggerEdgeCase }: { onTriggerEdgeCase: (t: 'expired'|'network') => void }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path={AppRoute.WELCOME} element={<WelcomeScreen />} />
        <Route path={AppRoute.EMAIL_INPUT} element={<EmailInputScreen />} />
        <Route path={AppRoute.VERIFICATION} element={<VerificationScreen onTriggerEdgeCase={onTriggerEdgeCase} />} />
        <Route path={AppRoute.ONBOARDING_ROLE} element={<RoleSelectionScreen />} />
        <Route path={AppRoute.ONBOARDING_SETTINGS} element={<QuickSettingsScreen />} />
        <Route path={AppRoute.SUCCESS} element={<SuccessScreen />} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  // Global Modal State
  const [modalType, setModalType] = useState<'none' | 'expired' | 'network'>('none');

  const handleEdgeCase = (type: 'expired' | 'network') => {
    setModalType(type);
  };

  const closeModals = () => setModalType('none');

  return (
    <HashRouter>
      <div className="w-full h-full bg-white relative">
        <AnimatedRoutes onTriggerEdgeCase={handleEdgeCase} />

        {/* EDGE CASE: LINK EXPIRED */}
        <Modal 
          isOpen={modalType === 'expired'}
          type="error"
          title="Your link has expired"
          subtitle="Request a new link to continue."
          primaryActionLabel="Resend link"
          secondaryActionLabel="Use another email"
          onPrimaryAction={closeModals}
          onSecondaryAction={() => {
            closeModals();
            window.location.hash = AppRoute.EMAIL_INPUT;
          }}
        />

        {/* EDGE CASE: NETWORK ERROR */}
        <Modal 
          isOpen={modalType === 'network'}
          type="info" // Spec said Info Icon for network error
          title="Connection issue"
          subtitle="Check your network and try again."
          primaryActionLabel="Try again"
          onPrimaryAction={() => {
            // Simulate retry logic
            const btn = document.activeElement as HTMLButtonElement;
            if(btn) btn.innerHTML = "Retrying...";
            setTimeout(() => {
                closeModals();
            }, 1000);
          }}
        />
      </div>
    </HashRouter>
  );
}