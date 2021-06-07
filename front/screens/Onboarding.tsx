import type { StackNavigationProp } from "@react-navigation/stack";
import { useMatomo } from "matomo-tracker-react-native";
import type { FC } from "react";
import * as React from "react";
// eslint-disable-next-line @typescript-eslint/no-duplicate-imports
import { useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

import ThirdSlideImage from "../assets/images/Humaaans_2_Characters.svg";
import FirstSlideImage from "../assets/images/Humaaans_3_Characters.svg";
import SecondSlideImage from "../assets/images/Humaaans_Sitting.svg";
import { CommonText, SecondaryText } from "../components";
import Button from "../components/form/button.component";
import HeaderApp from "../components/HeaderApp";
import Icomoon, { IcomoonIcons } from "../components/icomoon.component";
import { View } from "../components/Themed";
import {
  Colors,
  FontWeight,
  Labels,
  Margins,
  Paddings,
  Sizes,
  StorageKeysConstants,
} from "../constants";
import type { RootStackParamList } from "../types";
import { StorageUtils, TrackerUtils } from "../utils";

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
  trackScreenView(TrackerUtils.TrackingEvent.ONBOARDING);
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
              ref={swiperRef}
              onChangeIndex={({ index }) => {
                setSwiperCurrentIndex(index);
              }}
              autoplay={false}
              showPagination
              paginationDefaultColor="lightgray"
              paginationActiveColor={Colors.secondaryGreen}
              paginationStyleItem={styles.swipePaginationItem}
              paginationStyle={styles.swipePagination}
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
                    <CommonText style={[styles.title, styles.textAlignCenter]}>
                      {slideView.title}
                    </CommonText>
                    <SecondaryText
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
  swipePagination: {
    paddingTop: Paddings.light,
  },
  swipePaginationItem: {
    height: 5,
    marginHorizontal: Margins.smaller,
    width: 32,
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
