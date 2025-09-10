'use client';

import { InitManagementStore, ManagementStore } from '@/app/models/management-store';
import { createContext, useContext, useRef } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';

const createManagementStore = (initStore: InitManagementStore) =>
  createStore<ManagementStore>((set) => ({
    branch: initStore.branch,
    setBranch: (branch) => set({ branch }),

    user: initStore.user,
    setUser: (user) => set({ user }),

    lang: initStore.lang,
  }));

const ManagementContext = createContext<StoreApi<ManagementStore>>(undefined!);

export function useAppStore<T>(selector: (s: ManagementStore) => T): T {
  const store = useContext(ManagementContext);

  return useStore(store, selector);
}

interface Props extends InitManagementStore {
  children: React.ReactNode;
}

export const ManagementProvider = (props: Props) => {
  const ref = useRef<StoreApi<ManagementStore>>(createManagementStore({ branch: props.branch, user: props.user, lang: props.lang }));

  return <ManagementContext.Provider value={ref.current}>{props.children}</ManagementContext.Provider>;
};
