import { useState, useEffect } from 'react';
import { isWeb } from 'tamagui'
import { isMobile } from 'react-device-detect'

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>();

  useEffect(() => {
    setIsDesktop(isWeb && !isMobile);
  }, [])

  return isDesktop;
};

export default useIsDesktop;