import { Locale } from '../models/locales';

export interface Translate {
  loginEmailLabel: string;
  loginPasswordLabel: string;
  loginSubmitButton: string;

  drawerLineSettingsLabel: string;
  drawerHomeLabel: string;
}

export const translate: Record<Locale, Translate> = {
  en: {
    loginEmailLabel: 'email',
    loginPasswordLabel: 'password',
    loginSubmitButton: 'login',
    drawerLineSettingsLabel: 'Lines Settings',
    drawerHomeLabel: 'orders',
  },
  he: {
    loginEmailLabel: 'מייל',
    loginPasswordLabel: 'סיסמא',
    loginSubmitButton: 'התחברות',
    drawerLineSettingsLabel: 'ניהול תור',
    drawerHomeLabel: 'הזמנות',
  },
};
