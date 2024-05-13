'use client';

import { createContext } from 'react';

/**
 * Provides the context for the app
 */
interface AppContextProperties {
  getJSONData: (url: string) => Promise<any>;
}

/**
 * Provides the context for the app
 */
export const AppContext = createContext<AppContextProperties>({
  getJSONData: async () => {},
});

/**
 * Provides the context for the app
 */
export const AppProvider = ({ children }) => {
  /**
   * Custom Fetch function that uses force-cache and returns the data as JSON
   * @param url
   */
  const getJSONData = async (url: string) => {
    return (await fetch(url, { cache: 'force-cache' })).json();
  };

  return (
    <AppContext.Provider
      value={{
        getJSONData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
