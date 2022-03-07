import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
// eslint-disable-next-line @typescript-eslint/no-duplicate-imports
import { useCallback, useRef, useState } from "react";
import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { Dimensions, FlatList, ScrollView, StyleSheet } from "react-native";
import { OnBoardingAssets } from "../../components/assets";

import {
  CommonText,
  CustomButton,
  HeaderApp,
  Icomoon,
  IcomoonIcons,
  SecondaryText,
  View,
} from "../../components/baseComponents";
import { CustomPagination } from "../../components/onboarding/customOnboardingPagination.component";
import TrackerHandler from "../../components/tracker/trackerHandler.component";
import { Labels, StorageKeysConstants } from "../../constants";
import { Colors, FontWeight, Paddings, Sizes } from "../../styles";
import type { RootStackParamList } from "../../types";
import { StorageUtils, TrackerUtils } from "../../utils";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "onboarding"
>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

interface SlideView {
  title: string;
  image: React.ReactNode;
  description: string;
}

const Onboarding: FC<Props> = ({ navigation }) => {
  const slideViews: SlideView[] = [
    {
      description: Labels.onboarding.slidesText[0].description,
      image: <OnBoardingAssets.FirstSlideImage />,
      title: Labels.onboarding.slidesText[0].title,
    },
    {
      description: Labels.onboarding.slidesText[1].description,
      image: <OnBoardingAssets.SecondSlideImage />,
      title: Labels.onboarding.slidesText[1].title,
    },
    {
      description: Labels.onboarding.slidesText[2].description,
      image: <OnBoardingAssets.ThirdSlideImage />,
      title: Labels.onboarding.slidesText[2].title,
    },
  ];

  const [swiperCurrentIndex, setSwiperCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const navigateToProfile = useCallback(() => {
    void StorageUtils.storeObjectValue(
      StorageKeysConstants.isFirstLaunchKey,
      false
    );
    navigation.navigate("profile");
  }, [navigation]);

  const renderItem = useCallback(
    ({ item, index }: { item: SlideView; index: number }) => {
      return (
        <View
          style={[styles.swipeView, styles.justifyContentCenter]}
          key={index}
        >
          <View style={styles.slideImage}>{item.image}</View>
          <View accessible>
            <CommonText
              accessibilityRole="header"
              accessibilityLabel={`${Labels.onboarding.screenNumber}${
                index + 1
              }${item.title}`}
              style={[styles.title, styles.textAlignCenter]}
            >
              {item.title}
            </CommonText>
            <SecondaryText
              accessibilityRole="text"
              accessibilityLabel={item.description}
              style={[styles.description, styles.textAlignCenter]}
            >
              {item.description}
            </SecondaryText>
          </View>
        </View>
      );
    },
    []
  );

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const slideSize = event.nativeEvent.layoutMeasurement.width;
      const index = event.nativeEvent.contentOffset.x / slideSize;
      setSwiperCurrentIndex(Math.round(index));
    },
    []
  );

  const keyExtractor = useCallback((item: SlideView) => item.title, []);

  const onScrollToIndex = useCallback((index: number) => {
    flatListRef.current?.scrollToIndex({ index });
  }, []);

  const onNextButtonPressed = useCallback(() => {
    flatListRef.current?.scrollToIndex({
      index: swiperCurrentIndex + 1,
    });
  }, [swiperCurrentIndex]);
  return (
    <View style={[styles.mainContainer, styles.flexColumn]}>
      <HeaderApp />
      <TrackerHandler screenName={TrackerUtils.TrackingEvent.ONBOARDING} />
      <View style={styles.mainView}>
        <View style={styles.flexCenter}>
          <ScrollView>
            <FlatList
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              data={slideViews}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              horizontal={true}
              ref={flatListRef}
              onScroll={onScroll}
            />
            <CustomPagination
              currentIndex={swiperCurrentIndex}
              slidesNumber={slideViews.length}
              scrollToIndex={onScrollToIndex}
            />
          </ScrollView>
        </View>
      </View>
      <View style={[styles.footer, styles.justifyContentCenter]}>
        {swiperCurrentIndex === slideViews.length - 1 ? (
          <View style={[styles.justifyContentCenter]}>
            <CustomButton
              title={Labels.buttons.start}
              rounded={true}
              disabled={false}
              action={navigateToProfile}
            />
          </View>
        ) : (
          <View style={[styles.buttonsContainer, styles.justifyContentCenter]}>
            <View style={[styles.buttonContainer]}>
              <CustomButton
                title={Labels.buttons.pass}
                rounded={false}
                disabled={false}
                icon={
                  <Icomoon
                    name={IcomoonIcons.fermer}
                    size={Sizes.sm}
                    color={Colors.primaryBlue}
                  />
                }
                action={navigateToProfile}
              />
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton
                title={Labels.buttons.next}
                rounded={false}
                disabled={false}
                icon={
                  <Icomoon
                    name={IcomoonIcons.suivant}
                    size={Sizes.sm}
                    color={Colors.primaryBlue}
                  />
                }
                action={onNextButtonPressed}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
  },
  buttonTitle: {
    color: Colors.primaryBlue,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  description: {
    color: Colors.commonText,
    fontSize: Sizes.sm,
    fontWeight: FontWeight.medium,
    lineHeight: Sizes.mmd,
    paddingHorizontal: Paddings.default,
  },
  flexCenter: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  flexColumn: {
    flex: 1,
    flexDirection: "column",
  },
  footer: {
    flex: 1,
    paddingVertical: Paddings.light,
  },
  justifyContentCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    flex: 1,
    paddingTop: Paddings.larger,
  },
  mainView: {
    flex: 8,
  },
  slideImage: {
    paddingBottom: Paddings.larger,
  },
  swipeView: {
    marginBottom: "10%",
    width,
  },
  textAlignCenter: {
    marginHorizontal: "10%",
    textAlign: "center",
  },
  title: {
    color: Colors.primaryBlueDark,
    fontSize: Sizes.md,
    fontWeight: "bold",
    paddingBottom: Paddings.default,
    paddingTop: Paddings.light,
  },
});

export default Onboarding;
