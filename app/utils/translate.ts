import { Locale } from '../models/locales';

export interface Translate {
  loginEmailLabel: string;
  loginPasswordLabel: string;
  loginSubmitButton: string;

  drawerLineSettingsLabel: string;
  drawerHomeLabel: string;
  drawerSettingsLabel: string;
}

export const translate: Record<Locale, Translate> = {
  en: {
    loginEmailLabel: 'email',
    loginPasswordLabel: 'password',
    loginSubmitButton: 'login',
    drawerLineSettingsLabel: 'Lines Settings',
    drawerHomeLabel: 'orders',
    drawerSettingsLabel: 'settings',
  },
  he: {
    loginEmailLabel: 'מייל',
    loginPasswordLabel: 'סיסמא',
    loginSubmitButton: 'התחברות',
    drawerLineSettingsLabel: 'ניהול תור',
    drawerHomeLabel: 'הזמנות',
    drawerSettingsLabel: 'הגדרות',
  },
};
