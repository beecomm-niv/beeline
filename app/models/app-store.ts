import { Translate } from '../utils/translate';
import { Locale } from './locales';

export interface AppStoreInit {
  lang: Locale;
}

export interface AppStore extends AppStoreInit {
  mode: 'dark' | 'light';
  setMode: (mode: 'dark' | 'light') => void;

  translate: Translate;
  urlPrefix: string;
}
