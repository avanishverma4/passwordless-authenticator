import React from 'react';
import { motion } from 'framer-motion';

// --- THEME CONSTANTS ---
const theme = {
  primary: '#3A78FF',
  primaryLight: '#EBF2FF', // light blue
  primaryDark: '#254FAC',
  neutral: '#F2F3F6',      // light gray bg
  stroke: '#E5E7EB',       // border gray
  success: '#2ECC71',
  warning: '#F59E0B',
  error: '#E5484D',
};

export const WelcomeIllustration = () => (
  <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Background Blob */}
    <path d="M120 25C172.467 25 215 67.5329 215 120C215 172.467 172.467 215 120 215C67.5329 215 25 172.467 25 120C25 67.5329 67.5329 25 120 25Z" fill={theme.neutral} fillOpacity="0.5"/>
    
    {/* Stylized Phone/Card */}
    <motion.g 
      initial={{ y: 0 }} 
      animate={{ y: -5 }} 
      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    >
      <rect x="70" y="50" width="100" height="140" rx="16" fill="white" stroke={theme.stroke} strokeWidth="4"/>
      <rect x="85" y="70" width="70" height="60" rx="8" fill={theme.primaryLight}/>
      
      {/* Profile Avatar Placeholder */}
      <circle cx="120" cy="100" r="16" fill={theme.primary} fillOpacity="0.4"/>
      <path d="M108 126C108 119.373 113.373 114 120 114C126.627 114 132 119.373 132 126" fill={theme.primary} fillOpacity="0.4"/>

      {/* Text Lines */}
      <rect x="85" y="145" width="70" height="6" rx="3" fill={theme.neutral}/>
      <rect x="85" y="158" width="40" height="6" rx="3" fill={theme.neutral}/>
    </motion.g>

    {/* Floating Security Shield */}
    <motion.g
      initial={{ scale: 0.9, x: 0, y: 0 }}
      animate={{ scale: 1, x: 2, y: -2 }}
      transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }}
    >
        <circle cx="165" cy="165" r="28" fill="white" stroke={theme.stroke} strokeWidth="3"/>
        <path d="M165 150C165 150 180 155 180 167C180 179 165 185 165 185C165 185 150 179 150 167C150 155 165 150 165 150Z" fill={theme.success}/>
        <path d="M158 167L163 172L172 162" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </motion.g>

    {/* Decorative Elements */}
    <circle cx="50" cy="90" r="5" fill={theme.primary} fillOpacity="0.2"/>
    <circle cx="190" cy="80" r="4" fill={theme.warning} fillOpacity="0.6"/>
    <path d="M40 160L46 166M46 160L40 166" stroke={theme.primary} strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
  </svg>
);

export const MagicLinkIllustration = () => (
  <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Background Circle */}
    <circle cx="120" cy="120" r="100" fill={theme.neutral} fillOpacity="0.5"/>
    
    {/* Dynamic Paper Plane */}
    <motion.g
      animate={{ x: [0, 5, 0], y: [0, -5, 0], rotate: [0, -2, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M50 110L140 140L100 170L90 145L50 110Z" fill="white" stroke={theme.primary} strokeWidth="4" strokeLinejoin="round"/>
      <path d="M140 140L90 145" stroke={theme.primary} strokeWidth="2"/>
    </motion.g>

    {/* Dashed Flight Path */}
    <path d="M40 120C20 130 20 160 40 170" stroke={theme.primary} strokeWidth="2" strokeDasharray="4 4" opacity="0.4" fill="none"/>
    <path d="M190 60C210 50 220 80 200 90" stroke={theme.primary} strokeWidth="2" strokeDasharray="4 4" opacity="0.4" fill="none"/>

    {/* Destination: Device/Mailbox */}
    <rect x="150" y="70" width="60" height="90" rx="8" fill="white" stroke={theme.stroke} strokeWidth="4" transform="rotate(10 150 70)"/>
    <rect x="160" y="85" width="40" height="30" rx="4" fill={theme.primaryLight} transform="rotate(10 160 85)"/>
    
    {/* Sparkles/Stars */}
    <motion.path 
      d="M190 50L193 45L196 50L201 53L196 56L193 61L190 56L185 53L190 50Z" 
      fill={theme.warning}
      animate={{ scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <circle cx="60" cy="180" r="4" fill={theme.primary}/>
  </svg>
);

export const SuccessIllustration = () => (
  <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Animated Background Circles */}
    <motion.circle 
      cx="120" cy="120" r="100" fill={theme.neutral}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    />
    <motion.circle 
      cx="120" cy="120" r="60" fill={theme.primary}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.15 }}
    />
    
    {/* Main Checkmark */}
    <motion.path 
      d="M95 120L112 137L145 104" 
      stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "circOut", delay: 0.4 }}
    />
    
    {/* Confetti Explosion */}
    <motion.g
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: "spring" }}
    >
        <circle cx="190" cy="80" r="6" fill={theme.success}/>
        <circle cx="50" cy="150" r="5" fill={theme.primary}/>
        <rect x="60" y="70" width="8" height="8" rx="2" fill={theme.error} transform="rotate(-15 60 70)"/>
        <rect x="170" y="160" width="10" height="10" rx="2" fill={theme.warning} transform="rotate(30 170 160)"/>
        <path d="M160 60L165 65" stroke={theme.primary} strokeWidth="3" strokeLinecap="round"/>
        <path d="M80 180L75 185" stroke={theme.primary} strokeWidth="3" strokeLinecap="round"/>
        
        {/* Extra confetti for more festivity */}
        <circle cx="120" cy="40" r="4" fill={theme.primaryLight}/>
        <path d="M120 200L120 205" stroke={theme.stroke} strokeWidth="3" strokeLinecap="round"/>
    </motion.g>
  </svg>
);
