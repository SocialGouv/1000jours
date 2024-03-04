import type { FC } from "react";
import * as React from "react";
import { Linking, StyleSheet } from "react-native";

import { Links } from "../../constants";
import { PLATFORM_IS_ANDROID } from "../../constants/platform.constants";
import { Colors, Margins, Paddings, Sizes } from "../../styles";
import type { TrackerEvent } from "../../type";
import { TrackerUtils } from "../../utils";
import { CommonText, CustomButton, View } from "../baseComponents";
import TrackerHandler from "../tracker/trackerHandler.component";

interface Props {
  title: string;
  buttonTitle: string;
  fromPage: string;
}

const ZeroAccidentBanner: FC<Props> = ({ title, buttonTitle, fromPage }) => {
  const [trackerEventObject, setTrackerEventObject] =
    React.useState<TrackerEvent>();

  const goToStore = React.useCallback(() => {
    const storeUrl = PLATFORM_IS_ANDROID
      ? Links.zeroAccidentAppUrlAndroid
      : Links.zeroAccidentHttpsiOSAppUrl;

    setTrackerEventObject({
      action: TrackerUtils.TrackingEvent.ZERO_ACCIDENT,
      name: `${TrackerUtils.TrackingEvent.ZERO_ACCIDENT} - ${
        PLATFORM_IS_ANDROID ? "Android" : "iOS"
      } (${fromPage})`,
    });
    void Linking.openURL(storeUrl);
  }, [fromPage]);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return (
    <>
      <TrackerHandler eventObject={trackerEventObject} />
      <View style={styles.container}>
        <CommonText style={styles.bannerTitle}>{title}</CommonText>
        <CustomButton title={buttonTitle} rounded action={goToStore} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bannerButtonTitle: {
    fontSize: Sizes.sm,
    textTransform: "uppercase",
  },
  bannerDescription: {
    color: Colors.commonText,
    marginVertical: Margins.light,
  },
  bannerTitle: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.sm,
    lineHeight: Sizes.lg,
  },
  container: {
    backgroundColor: Colors.primaryBlueLight,
    borderLeftColor: Colors.primaryBlueDark,
    borderLeftWidth: 3,
    marginBottom: Paddings.light,
    marginVertical: Paddings.default,
    padding: Paddings.default,
  },
  header: {
    paddingBottom: Paddings.larger,
  },
  mainContainer: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingHorizontal: Paddings.larger,
    paddingVertical: Paddings.default,
  },
});

export default ZeroAccidentBanner;
