'use client';

import { createContext, useEffect, useState } from 'react';
import { isWeb } from 'tamagui';
import { isMobile } from 'react-device-detect';

/**
 * Provides the context for the app
 */
/**
 * Properties that can be accessed in the AppContext.
 */
export interface AppContextProperties {
  /**
   * A function that retrieves JSON data from a URL. It will attempt to
   * return the data from cache first, and then make a network request if
   * the data is not cached.
   * @param url The URL of the data to retrieve.
   */
  getJSONData: (url: string) => Promise<any>;
  /**
   * Whether the app is running on a desktop platform. This will be true
   * if the app is running on a desktop browser, and false if otherwise.
   */
  isDesktop?: boolean;
  /**
   * Whether the app is running as a mobile app. This will be true if
   * the app is running on a mobile device with React Native, and
   * false if otherwise.
   */
  isMobileApp?: boolean;
  /**
   * Whether the app is running on a mobile device with a web browser.
   * This will be true if the app is running on a mobile device with
   * a web browser, and false if otherwise.
   */
  isMobileWeb?: boolean;
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
   * Whether the app is running on a desktop platform. This will be true
   * if the app is running on a desktop browser, and false if otherwise.
   */
  const [isDesktop, setIsDesktop] = useState<boolean>();

  /**
   * Whether the app is running as a mobile app. This will be true if
   * the app is running on a mobile device with React Native, and
   * false if otherwise.
   */
  const [isMobileApp, setIsMobileApp] = useState<boolean>();

  /**
   * Whether the app is running on a mobile device with a web browser.
   * This will be true if the app is running on a mobile device with
   * a web browser, and false if otherwise.
   */
  const [isMobileWeb, setIsMobileWeb] = useState<boolean>();

  /**
   * Custom Fetch function that uses force-cache and returns the data as JSON
   * @param url
   */
  const getJSONData = async (url: string) => {
    return (await fetch(url, { cache: 'force-cache' })).json();
  };

  /** Sets the state of the app based on the device being used */
  useEffect(() => {
    setIsDesktop(isWeb && !isMobile);
    setIsMobileApp(!isWeb && isMobile);
    setIsMobileWeb(isWeb && isMobile);
  }, []);

  return (
    <AppContext.Provider
      value={{
        isDesktop,
        isMobileApp,
        isMobileWeb,
        getJSONData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
