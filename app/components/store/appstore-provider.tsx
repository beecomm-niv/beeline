'use client';

import { InitStore, Store } from '@/app/models/store';
import { createContext, useRef } from 'react';
import { createStore, StoreApi } from 'zustand';

const createAppStore = (initStore: InitStore) =>
  createStore<Store>((set) => ({
    branch: initStore.branch,
    setBranch: (branch) => set({ branch }),

    user: initStore.user,
    setUser: (user) => set({ user }),
  }));

export const AppStoreContext = createContext<StoreApi<Store>>(undefined!);

interface Props extends InitStore {
  children: React.ReactNode;
}

export const AppstoreProvider = (props: Props) => {
  const ref = useRef<StoreApi<Store>>(createAppStore({ branch: props.branch, user: props.user }));

  return <AppStoreContext.Provider value={ref.current}>{props.children}</AppStoreContext.Provider>;
};
