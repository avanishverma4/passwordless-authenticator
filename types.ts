export enum AppRoute {
  WELCOME = '/',
  EMAIL_INPUT = '/email',
  VERIFICATION = '/verification',
  ONBOARDING_ROLE = '/onboarding/role',
  ONBOARDING_SETTINGS = '/onboarding/settings',
  SUCCESS = '/success',
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonState = 'default' | 'hover' | 'pressed' | 'disabled' | 'loading';

export type ToastType = 'success' | 'error' | 'info';

export type RoleType = 'Designer' | 'Developer' | 'Product' | 'Student';

export interface UserSettings {
  emailNotifications: boolean;
  productTips: boolean;
}