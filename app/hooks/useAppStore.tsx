import { useContext } from 'react';
import { Store } from '../models/store';
import { AppStoreContext } from '../components/store/appstore-provider';
import { useStore } from 'zustand';

export function useAppStore<T>(selector: (s: Store) => T): T {
  const store = useContext(AppStoreContext);

  return useStore(store, selector);
}
