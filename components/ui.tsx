import React from 'react';
import { Loader2, AlertCircle, Info, CheckCircle, X } from 'lucide-react';
import { ButtonVariant, ToastType } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

// --- BUTTON ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  fullWidth = true,
  className = '',
  disabled,
  ...props 
}) => {
  const baseStyles = "h-[48px] px-24 py-12 rounded-[12px] font-medium text-[16px] transition-all duration-200 flex items-center justify-center gap-8";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover active:bg-primary-pressed disabled:bg-neutral-300 disabled:cursor-not-allowed",
    secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-300/50 active:bg-neutral-300 disabled:opacity-50",
    ghost: "bg-transparent text-primary hover:bg-primary/10 active:bg-primary/20 disabled:text-neutral-300"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : 'w-auto'} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
      {children}
    </button>
  );
};

// --- INPUT (Floating Label) ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, helperText, id, value, ...props }) => {
  const isFilled = value && String(value).length > 0;
  
  return (
    <div className="w-full relative mb-6">
      <div className="relative">
        <input
          id={id}
          value={value}
          className={`
            peer w-full h-[56px] px-[16px] pt-[20px] pb-[6px] 
            rounded-[12px] border-2 bg-transparent text-[16px] text-neutral-900 
            outline-none transition-all duration-200
            ${error 
              ? 'border-error focus:border-error' 
              : 'border-neutral-300 focus:border-primary'}
            disabled:bg-neutral-100 disabled:text-neutral-500
          `}
          placeholder=" "
          {...props}
        />
        <label
          htmlFor={id}
          className={`
            absolute left-[16px] top-[16px] text-neutral-500 text-[16px] 
            transition-all duration-200 pointer-events-none origin-top-left
            peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
            peer-focus:-translate-y-[10px] peer-focus:scale-75
            ${isFilled ? '-translate-y-[10px] scale-75' : ''}
            ${error ? 'text-error' : 'peer-focus:text-primary'}
          `}
        >
          {label}
        </label>
      </div>
      {error && (
        <p className="mt-4 text-[12px] text-error flex items-center gap-1">
          <AlertCircle size={12} /> {error}
        </p>
      )}
      {!error && helperText && (
        <p className="mt-4 text-[12px] text-neutral-500">{helperText}</p>
      )}
    </div>
  );
};

// --- CHIP ---
interface ChipProps {
  label: string;
  icon?: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

export const Chip: React.FC<ChipProps> = ({ label, icon, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-[16px] py-[12px] rounded-[32px] border transition-all duration-200 text-[16px] font-medium flex items-center gap-[8px]
        ${selected 
          ? 'bg-primary/10 border-primary text-primary' 
          : 'bg-white border-neutral-300 text-neutral-500 hover:border-neutral-500'}
      `}
    >
      {icon && <span className={selected ? 'text-primary' : 'text-neutral-500'}>{icon}</span>}
      {label}
    </button>
  );
};

// --- TOGGLE ---
interface ToggleProps {
  label: string;
  enabled: boolean;
  onChange: (val: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ label, enabled, onChange }) => {
  return (
    <div className="flex items-center justify-between py-[16px]">
      <span className="text-[16px] text-neutral-900 font-medium">{label}</span>
      <button
        onClick={() => onChange(!enabled)}
        className={`
          w-[52px] h-[32px] rounded-full p-[2px] transition-colors duration-200
          ${enabled ? 'bg-primary' : 'bg-neutral-300'}
        `}
      >
        <div 
          className={`
            w-[28px] h-[28px] bg-white rounded-full shadow-sm transition-transform duration-200
            ${enabled ? 'translate-x-[20px]' : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  );
};

// --- TOAST ---
interface ToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', isVisible, onClose }) => {
  const icons = {
    success: <CheckCircle className="text-white" size={20} />,
    error: <AlertCircle className="text-white" size={20} />,
    info: <Info className="text-white" size={20} />
  };

  const bgColors = {
    success: 'bg-neutral-900', // Design spec usually implies dark toasts for notifications unless specified otherwise. using dark neutral for toast 
    error: 'bg-error',
    info: 'bg-primary'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -20, x: '-50%' }}
          className={`
            fixed top-[60px] left-1/2 z-50 w-[327px] 
            ${bgColors[type]} rounded-[12px] p-[16px] shadow-lg
            flex items-start gap-[12px]
          `}
        >
          <div className="mt-0.5">{icons[type]}</div>
          <p className="text-white text-[14px] leading-[20px] flex-1 font-medium">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- MODAL ---
interface ModalProps {
  isOpen: boolean;
  title: string;
  subtitle: string;
  primaryActionLabel: string;
  secondaryActionLabel?: string;
  onPrimaryAction: () => void;
  onSecondaryAction?: () => void;
  type?: 'error' | 'info';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen, title, subtitle, primaryActionLabel, secondaryActionLabel, onPrimaryAction, onSecondaryAction, type = 'info'
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-[24px]">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
            onClick={onSecondaryAction || onPrimaryAction}
          />
          {/* Modal Content */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-white w-full max-w-[327px] rounded-[24px] p-[32px] relative z-10 shadow-2xl flex flex-col items-center text-center"
          >
            <div className={`mb-[20px] p-[16px] rounded-full ${type === 'error' ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'}`}>
              {type === 'error' ? <AlertCircle size={32} strokeWidth={2.5} /> : <Info size={32} strokeWidth={2.5} />}
            </div>
            <h2 className="text-[20px] font-bold text-neutral-900 mb-[8px] leading-tight">{title}</h2>
            <p className="text-[15px] text-neutral-500 mb-[32px] leading-relaxed">{subtitle}</p>
            
            <div className="w-full flex flex-col gap-[12px]">
              <Button onClick={onPrimaryAction} variant="primary">
                {primaryActionLabel}
              </Button>
              {secondaryActionLabel && (
                <Button variant="ghost" onClick={onSecondaryAction} className="text-neutral-500 hover:text-neutral-900">
                  {secondaryActionLabel}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- PROGRESS BAR ---
interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;
  const previousPercentage = ((currentStep - 1) / totalSteps) * 100;

  return (
    <div className="mb-[32px]">
      <span className="text-[12px] font-bold text-neutral-500 tracking-wider uppercase">
        Step {currentStep} of {totalSteps}
      </span>
      <div className="w-full h-[4px] bg-neutral-100 mt-[8px] rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-primary rounded-full"
          initial={{ width: `${previousPercentage}%` }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

// --- FULLSCREEN LOADER ---
export const FullScreenLoader: React.FC = () => (
  <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center">
    <Loader2 className="w-[48px] h-[48px] text-primary animate-spin mb-[24px]" />
  </div>
);
