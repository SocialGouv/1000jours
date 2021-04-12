import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
// eslint-disable-next-line @typescript-eslint/no-duplicate-imports
import { useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

import ThirdSlideImage from "../assets/images/Humaaans_2_Characters.svg";
import FirstSlideImage from "../assets/images/Humaaans_3_Characters.svg";
import SecondSlideImage from "../assets/images/Humaaans_Sitting.svg";
import Button from "../components/form/Button";
import HeaderApp from "../components/HeaderApp";
import { CommonText } from "../components/StyledText";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import Labels from "../constants/Labels";
import { FontWeight } from "../constants/Layout";
import { isFirstLaunchKey } from "../storage/storage-keys";
import { storeObjectValue } from "../storage/storage-utils";
import type { RootStackParamList } from "../types";

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
    void storeObjectValue(isFirstLaunchKey, false);
    navigation.navigate("profile");
  };

  return (
    <View style={[styles.mainContainer, styles.flexColumn]}>
      <HeaderApp />
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
        >
          {slideViews.map((slideView, index) => {
            return (
              <View
                style={[styles.swipeView, styles.justifyContentCenter]}
                key={index}
              >
                <View style={[styles.swipeViewMargin]}>
                  <View style={[styles.justifyContentCenter]}>
                    {slideView.image}
                  </View>
                  <CommonText style={[styles.title, styles.textAlignCenter]}>
                    {slideView.title}
                  </CommonText>
                  <CommonText
                    style={[styles.description, styles.textAlignCenter]}
                  >
                    {slideView.description}
                  </CommonText>
                </View>
              </View>
            );
          })}
        </SwiperFlatList>
      </ScrollView>
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
                action={navigateToProfile}
              />
            </View>
            <View style={[styles.buttonContainer]}>
              <Button
                title={Labels.buttons.next}
                rounded={false}
                disabled={false}
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
  appName: {
    color: Colors.primaryBlueDark,
    fontSize: 25,
    fontWeight: FontWeight.bold,
  },
  buttonContainer: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  description: {
    color: Colors.commonText,
    fontSize: 12,
    fontWeight: FontWeight.medium,
    lineHeight: 20,
    paddingHorizontal: 15,
  },
  flexColumn: {
    flex: 1,
    flexDirection: "column",
  },
  footer: {
    flex: 1,
  },
  justifyContentCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    paddingTop: 30,
  },
  swipePaginationItem: {
    height: 5,
    marginHorizontal: 8,
    width: 32,
  },
  swipeView: {
    width,
  },
  swipeViewMargin: {
    margin: "10%",
  },
  textAlignCenter: {
    textAlign: "center",
  },
  title: {
    color: Colors.primaryBlueDark,
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 15,
    paddingTop: 10,
  },
});

export default Onboarding;
