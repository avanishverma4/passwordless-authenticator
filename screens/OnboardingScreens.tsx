import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppRoute, RoleType, UserSettings } from '../types';
import { Button, Chip, Toggle, ProgressBar } from '../components/ui';
import { SuccessIllustration } from '../components/illustrations';
import { PenTool, Code2, Briefcase, GraduationCap } from 'lucide-react';

// --- SHARED: SKIP BUTTON ---
const SkipButton = ({ onSkip }: { onSkip: () => void }) => (
  <button 
    onClick={onSkip}
    className="absolute top-[24px] right-[24px] text-[14px] font-medium text-neutral-500 hover:text-neutral-900 transition-colors z-20"
  >
    Skip
  </button>
);

// --- STEP 1: ROLE SELECTION ---
export const RoleSelectionScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);

  const roles: { label: RoleType; icon: React.ReactNode }[] = [
    { label: 'Designer', icon: <PenTool size={18} /> },
    { label: 'Developer', icon: <Code2 size={18} /> },
    { label: 'Product', icon: <Briefcase size={18} /> },
    { label: 'Student', icon: <GraduationCap size={18} /> }
  ];

  return (
    <motion.div 
      initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}
      className="flex flex-col h-full p-[24px] pt-[60px] relative"
    >
      <SkipButton onSkip={() => navigate(AppRoute.SUCCESS)} />

      <div className="flex-1">
        <ProgressBar currentStep={1} totalSteps={2} />

        <h1 className="text-[28px] font-bold text-neutral-900 mb-[12px]">Tell us about you</h1>
        <p className="text-[16px] text-neutral-500 mb-[40px]">Choose a role to personalize your experience.</p>
        
        <div className="flex flex-wrap gap-[12px]">
          {roles.map(role => (
            <Chip 
              key={role.label}
              label={role.label}
              icon={role.icon}
              selected={selectedRole === role.label}
              onClick={() => setSelectedRole(role.label)}
            />
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <Button 
          onClick={() => navigate(AppRoute.ONBOARDING_SETTINGS)} 
          disabled={!selectedRole}
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
};

// --- STEP 2: QUICK SETTINGS ---
export const QuickSettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<UserSettings>({
    emailNotifications: true,
    productTips: false
  });

  return (
    <motion.div 
      initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}
      className="flex flex-col h-full p-[24px] pt-[60px] relative"
    >
       <SkipButton onSkip={() => navigate(AppRoute.SUCCESS)} />

       <div className="flex-1">
        <ProgressBar currentStep={2} totalSteps={2} />

        <h1 className="text-[28px] font-bold text-neutral-900 mb-[12px]">Quick Settings</h1>
        <p className="text-[16px] text-neutral-500 mb-[40px]">Enable helpful updates and tips.</p>
        
        <div className="flex flex-col divide-y divide-neutral-100">
          <Toggle 
            label="Email Notifications" 
            enabled={settings.emailNotifications} 
            onChange={(val) => setSettings({...settings, emailNotifications: val})} 
          />
           <Toggle 
            label="Weekly Product Tips" 
            enabled={settings.productTips} 
            onChange={(val) => setSettings({...settings, productTips: val})} 
          />
        </div>
      </div>

      <div className="mt-auto">
        <Button onClick={() => navigate(AppRoute.SUCCESS)}>
          Finish
        </Button>
      </div>
    </motion.div>
  );
};

// --- SUCCESS SCREEN ---
export const SuccessScreen: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="flex flex-col h-full p-[24px] items-center justify-center text-center"
    >
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Success Illustration */}
        <div className="w-[180px] h-[180px] mb-[32px]">
            <SuccessIllustration />
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-[28px] font-bold text-neutral-900 mb-[12px]"
        >
          You're all set!
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-[16px] text-neutral-500"
        >
          Your account is ready to use.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="w-full mt-auto mb-[24px]"
      >
        <Button onClick={() => alert("Flow Complete! Redirect to Dashboard.")}>
          Go to dashboard
        </Button>
      </motion.div>
    </motion.div>
  );
};
