'use client';
import { useContext } from 'react';
import { useStore } from 'zustand';
import { RootStore } from '../store';
import { RootStoreContext } from '../providers/RootStoreProvider';

export const useRootStore = <T>(selector: (store: RootStore) => T): T => {
  const rootStoreContext = useContext(RootStoreContext);

  if (!rootStoreContext) {
    throw new Error(`useRootStore must be used within RootStoreProvider`);
  }

  return useStore(rootStoreContext, selector);
};
