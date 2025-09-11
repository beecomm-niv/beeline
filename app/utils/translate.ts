import { Locale } from '../models/locales';

export interface Translate {
  loginEmailLabel: string;
  loginPasswordLabel: string;
  loginSubmitButton: string;

  drawerSettingsLabel: string;
}

export const translate: Record<Locale, Translate> = {
  en: {
    loginEmailLabel: 'email',
    loginPasswordLabel: 'password',
    loginSubmitButton: 'login',
    drawerSettingsLabel: 'settings',
  },
  he: {
    loginEmailLabel: 'מייל',
    loginPasswordLabel: 'סיסמא',
    loginSubmitButton: 'התחברות',
    drawerSettingsLabel: 'הגדרות',
  },
};
