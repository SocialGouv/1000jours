import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

import ThirdSlideImage from "../assets/images/Humaaans_2_Characters.svg";
import FirstSlideImage from "../assets/images/Humaaans_3_Characters.svg";
import SecondSlideImage from "../assets/images/Humaaans_Sitting.svg";
import Button from "../components/form/Button";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import Labels from "../constants/Labels";
import type { RootStackParamList } from "../types";
import { useRef, useState } from "react";
import { storeObjectValue } from "../storage/storage-utils";
import { isFirstLaunchKey } from "../storage/storage-keys";

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
  const appName = Labels.appName;
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

  const navigateToProfile = async () => {
    void storeObjectValue(isFirstLaunchKey, false);
    navigation.navigate("profile");
  };

  return (
    <View style={[styles.mainContainer]}>
      <View style={[styles.header, styles.justifyContentCenter]}>
        <Text style={[styles.appName]}>{appName}</Text>
      </View>
      <View style={[styles.body, styles.justifyContentCenter]}>
        <SwiperFlatList
          ref={swiperRef}
          onChangeIndex={({ index }) => {
            setSwiperCurrentIndex(index);
          }}
          autoplay={false}
          showPagination
          paginationDefaultColor="lightgray"
          paginationActiveColor={Colors.primaryBlue}
          paginationStyleItem={styles.swipePaginationItem}
        >
          {slideViews.map((slideView, index) => {
            return (
              <View
                style={[styles.swipeView, styles.justifyContentCenter]}
                key={index}
              >
                <View style={[styles.justifyContentCenter]}>
                  {slideView.image}
                </View>
                <Text style={[styles.title, styles.textAlignCenter]}>
                  {slideView.title}
                </Text>
                <Text style={[styles.textAlignCenter]}>
                  {slideView.description}
                </Text>
              </View>
            );
          })}
        </SwiperFlatList>
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
            <Button
              title={Labels.buttons.pass}
              rounded={false}
              disabled={false}
              action={navigateToProfile}
            />
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
        )}
      </View>
    </View>
  );
};

const paddingOfSlideView = 30;
const width = Dimensions.get("window").width - paddingOfSlideView;
const styles = StyleSheet.create({
  appName: {
    color: Colors.primaryBlue,
    fontSize: 25,
    fontWeight: "bold",
  },
  body: {
    flex: 4,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
  },
  footer: {
    flex: 1,
  },
  header: {
    flex: 0.5,
  },
  justifyContentCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 30,
  },
  swipePaginationItem: {
    height: 5,
    width: 30,
  },
  swipeView: {
    width,
  },
  textAlignCenter: {
    textAlign: "center",
  },
  title: {
    color: Colors.primaryBlue,
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 10,
    paddingTop: 10,
  },
});

export default Onboarding;
