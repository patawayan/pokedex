import { useState, useEffect } from 'react';
import { isWeb } from 'tamagui';
import { isMobile } from 'react-device-detect';

/**
 * Hook for determining if the devicecurrently being used is a desktop
 * @returns true if the device is a desktop
 */
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>();

  useEffect(() => {
    setIsDesktop(isWeb && !isMobile);
  }, []);

  return isDesktop;
};

export default useIsDesktop;
