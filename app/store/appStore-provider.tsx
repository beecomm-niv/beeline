'use client';

import { createStore, StoreApi, useStore } from 'zustand';
import { AppStore, AppStoreInit } from '../models/app-store';
import { createContext, useContext, useRef } from 'react';
import { translate } from '../utils/translate';

const createAppStore = (init: AppStoreInit) =>
  createStore<AppStore>((set) => ({
    lang: init.lang,
    urlPrefix: init.lang === 'he' ? '/' : `/${init.lang}/`,
    translate: translate[init.lang],
    mode: 'dark',
    setMode: (mode) => set({ mode }),
  }));

const AppStoreContext = createContext<StoreApi<AppStore>>(undefined!);

interface Props extends AppStoreInit {
  children: React.ReactNode;
}

export function useAppStore<T>(selector: (s: AppStore) => T): T {
  const store = useContext(AppStoreContext);

  return useStore(store, selector);
}

export const AppStoreProvider = (props: Props) => {
  const ref = useRef<StoreApi<AppStore>>(createAppStore({ lang: props.lang }));

  return <AppStoreContext.Provider value={ref.current}>{props.children}</AppStoreContext.Provider>;
};
