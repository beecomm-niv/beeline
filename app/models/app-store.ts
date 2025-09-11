import { Locale } from './locales';

export interface AppStoreInit {
  lang: Locale;
}

export interface AppStore extends AppStoreInit {
  mode: 'dark' | 'light';
  setMode: (mode: 'dark' | 'light') => void;
}
