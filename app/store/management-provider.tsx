'use client';

import { InitStore, Store } from '@/app/models/store';
import { createContext, useContext, useRef } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';

const createManagementStore = (initStore: InitStore) =>
  createStore<Store>((set) => ({
    branch: initStore.branch,
    setBranch: (branch) => set({ branch }),

    user: initStore.user,
    setUser: (user) => set({ user }),

    lang: initStore.lang,
  }));

const ManagementContext = createContext<StoreApi<Store>>(undefined!);

export function useAppStore<T>(selector: (s: Store) => T): T {
  const store = useContext(ManagementContext);

  return useStore(store, selector);
}

interface Props extends InitStore {
  children: React.ReactNode;
}

export const ManagementProvider = (props: Props) => {
  const ref = useRef<StoreApi<Store>>(createManagementStore({ branch: props.branch, user: props.user, lang: props.lang }));

  return <ManagementContext.Provider value={ref.current}>{props.children}</ManagementContext.Provider>;
};
