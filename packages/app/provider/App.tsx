'use client';

import { createContext } from 'react';

interface AppContextProperties {
  getJSONData: (url: string) => Promise<any>;
}

export const AppContext = createContext<AppContextProperties>({
  getJSONData: async () => {},
});

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
