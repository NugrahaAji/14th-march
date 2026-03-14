"use client";

import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [isReady, setIsReady] = useState(false);

  return (
    <LoadingContext.Provider value={{ isReady, setIsReady }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
