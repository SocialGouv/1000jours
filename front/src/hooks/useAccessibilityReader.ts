import { useEffect, useState } from "react";

import { AccessibilityUtils } from "../utils";

const useAccessibilityReader = (): boolean => {
  const [isAccessibilityModeOn, setIsAccessibilityModeOn] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkAccessibilityMode = async () => {
      const isScreenReaderEnabled =
        await AccessibilityUtils.isScreenReaderEnabled();

      if (isMounted) {
        setIsAccessibilityModeOn(isScreenReaderEnabled);
      }
    };

    void checkAccessibilityMode();

    return () => {
      isMounted = false;
    };
  }, []);

  return isAccessibilityModeOn;
};

export default useAccessibilityReader;
