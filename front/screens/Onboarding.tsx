import type { StackNavigationProp } from "@react-navigation/stack";
import { useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import * as React from "react";
// eslint-disable-next-line @typescript-eslint/no-duplicate-imports
import { useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

import FirstSlideImage from "../assets/images/Onboarding_1.svg";
import SecondSlideImage from "../assets/images/Onboarding_2.svg";
import ThirdSlideImage from "../assets/images/Onboarding_3.svg";
import {
  Button,
  CommonText,
  HeaderApp,
  Icomoon,
  IcomoonIcons,
  SecondaryText,
  View,
} from "../components";
import {
  Colors,
  FontWeight,
  Labels,
  Paddings,
  Sizes,
  StorageKeysConstants,
} from "../constants";
import type { RootStackParamList } from "../types";
import { StorageUtils, TrackerUtils } from "../utils";
import { CustomPagination } from "./customOnboardingPagination.component";

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
  const { trackScreenView } = useMatomo();
  const slideViews: SlideView[] = [
    {
      description: Labels.onboarding.slidesText[0].description,
      image: <FirstSlideImage />,
      title: Labels.onboarding.slidesText[0].title,
    },
    {
      description: Labels.onboarding.slidesText[1].description,
      image: <SecondSlideImage />,
      title: Labels.onboarding.slidesText[1].title,
    },
    {
      description: Labels.onboarding.slidesText[2].description,
      image: <ThirdSlideImage />,
      title: Labels.onboarding.slidesText[2].title,
    },
  ];

  const [swiperCurrentIndex, setSwiperCurrentIndex] = useState(0);
  const swiperRef = useRef<SwiperFlatList>(null);

  useEffect(() => {
    trackScreenView(TrackerUtils.TrackingEvent.ONBOARDING);
  }, []);

  const navigateToProfile = () => {
    void StorageUtils.storeObjectValue(
      StorageKeysConstants.isFirstLaunchKey,
      false
    );
    navigation.navigate("profile");
  };

  return (
    <View style={[styles.mainContainer, styles.flexColumn]}>
      <HeaderApp />
      <View style={styles.mainView}>
        <View style={styles.flexCenter}>
          <ScrollView>
            <SwiperFlatList
              importantForAccessibility="no"
              disableGesture
              ref={swiperRef}
              onChangeIndex={({ index }) => {
                setSwiperCurrentIndex(index);
              }}
              autoplay={false}
              showPagination
              PaginationComponent={() => (
                <CustomPagination
                  currentIndex={swiperCurrentIndex}
                  slidesNumber={slideViews.length}
                  scrollToIndex={(index: number) => {
                    swiperRef.current?.scrollToIndex({ index });
                  }}
                />
              )}
            >
              {slideViews.map((slideView, index) => (
                <View
                  style={[styles.swipeView, styles.justifyContentCenter]}
                  key={index}
                >
                  <View style={[styles.swipeViewMargin]}>
                    <View
                      style={[styles.slideImage, styles.justifyContentCenter]}
                    >
                      {slideView.image}
                    </View>
                    <CommonText
                      accessibilityRole="header"
                      style={[styles.title, styles.textAlignCenter]}
                    >
                      {slideView.title}
                    </CommonText>
                    <SecondaryText
                      accessibilityRole="text"
                      style={[styles.description, styles.textAlignCenter]}
                    >
                      {slideView.description}
                    </SecondaryText>
                  </View>
                </View>
              ))}
            </SwiperFlatList>
          </ScrollView>
        </View>
      </View>
      <View style={[styles.footer, styles.justifyContentCenter]}>
        {swiperCurrentIndex === slideViews.length - 1 ? (
          <View style={[styles.justifyContentCenter]}>
            <Button
              title={Labels.buttons.start}
              rounded={true}
              disabled={false}
              action={navigateToProfile}
            />
          </View>
        ) : (
          <View style={[styles.buttonsContainer, styles.justifyContentCenter]}>
            <View style={[styles.buttonContainer]}>
              <Button
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
              <Button
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
                action={() => {
                  swiperRef.current?.scrollToIndex({
                    index: swiperCurrentIndex + 1,
                  });
                }}
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
    width,
  },
  swipeViewMargin: {
    marginBottom: "10%",
    marginHorizontal: "10%",
  },
  textAlignCenter: {
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
