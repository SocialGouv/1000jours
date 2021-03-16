import type { StackNavigationProp } from "@react-navigation/stack";
import type { FC } from "react";
import * as React from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

import ThirdSlideImage from "../assets/images/Humaaans_2_Characters.svg";
import FirstSlideImage from "../assets/images/Humaaans_3_Characters.svg";
import SecondSlideImage from "../assets/images/Humaaans_Sitting.svg";
import _Button from "../components/form/_Button";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
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
  image: React.ReactElement;
  description: string;
}

export const Onboarding: FC<Props> = ({ navigation }) => {
  const appName = "1000 JOURS APP'";
  const slideViews: SlideView[] = [
    {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Accumsan tortor posuere ac ut consequat semper viverra. Purus in mollis nunc sed id.",
      image: <FirstSlideImage />,
      title: "Bienvenue sur l'application",
    },
    {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Accumsan tortor posuere ac ut consequat semper viverra. Purus in mollis nunc sed id.",
      image: <SecondSlideImage />,
      title: "Trouver les informations",
    },
    {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Accumsan tortor posuere ac ut consequat semper viverra. Purus in mollis nunc sed id.",
      image: <ThirdSlideImage />,
      title: "Connaître les différentes étapes",
    },
  ];

  const [swiperCurrentIndex, setSwiperCurrentIndex] = React.useState(0);
  const swiperRef = React.useRef<SwiperFlatList>(null);

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
          paginationActiveColor={Colors.primaryColor}
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
            <_Button
              title="Commencer"
              rounded={true}
              disabled={false}
              action={() => {
                navigation.navigate("profile");
              }}
            />
          </View>
        ) : (
          <View style={[styles.buttonsContainer, styles.justifyContentCenter]}>
            <_Button
              title="Passer"
              rounded={false}
              disabled={false}
              action={() => {
                navigation.navigate("profile");
              }}
            />
            <_Button
              title="Suivant"
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
    color: Colors.primaryColor,
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
    color: Colors.primaryColor,
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 10,
    paddingTop: 10,
  },
});
