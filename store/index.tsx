import React, { createContext, ReactElement, useContext } from "react";
import { useLocalObservable, enableStaticRendering } from "mobx-react-lite";
import createStore, { Store } from "./rootStore";

interface ProviderProps {
  initialValue: Record<any, any>;
  children: ReactElement;
}

enableStaticRendering(!typeof window);

const StoreContext = createContext({});

export const StoreProvider = ({ initialValue, children }: ProviderProps) => {
  const store: Store = useLocalObservable(createStore(initialValue));
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const store = useContext(StoreContext) as Store;
  if (!store) {
    throw new Error("No data");
  }
  return store;
};
