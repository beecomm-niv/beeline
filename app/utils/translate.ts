import { Locale } from '../models/locales';

export interface Translate {
  loginEmailLabel: string;
  loginPasswordLabel: string;
  loginSubmitButton: string;

  drawerSettingsLabel: string;
  drawerHomeLabel: string;
}

export const translate: Record<Locale, Translate> = {
  en: {
    loginEmailLabel: 'email',
    loginPasswordLabel: 'password',
    loginSubmitButton: 'login',
    drawerSettingsLabel: 'settings',
    drawerHomeLabel: 'home',
  },
  he: {
    loginEmailLabel: 'מייל',
    loginPasswordLabel: 'סיסמא',
    loginSubmitButton: 'התחברות',
    drawerSettingsLabel: 'הגדרות',
    drawerHomeLabel: 'בית',
  },
};
