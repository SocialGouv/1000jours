import { useEffect, useState } from "react";

import { AccessibilityUtils } from "../utils";

const useAccessibilityReader = (): boolean => {
  const [isAccessibilityModeOn, setIsAccessibilityModeOn] = useState(false);

  useEffect(() => {
    const checkAccessibilityMode = async () => {
      setIsAccessibilityModeOn(
        await AccessibilityUtils.isScreenReaderEnabled()
      );
    };
    void checkAccessibilityMode();
  }, []);

  return isAccessibilityModeOn;
};

export default useAccessibilityReader;
