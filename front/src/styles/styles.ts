import Constants from "expo-constants";
import type { FlexAlignType } from "react-native";

import Colors from "./colors";
import { Paddings } from "./spacings";

const Styles = {
  modalFullScreen: {
    mainContainer: {
      backgroundColor: "white",
    },
    scrollviewContent: {
      padding: Paddings.default,
    },
  },
  modale: {
    behindOfModal: {
      backgroundColor: Colors.transparentGrey,
      flex: 1,
      paddingTop: Constants.statusBarHeight,
    },
    closeButton: {
      alignSelf: "flex-end" as FlexAlignType,
      backgroundColor: "transparent",
      paddingEnd: Paddings.smaller,
      paddingTop: Paddings.smaller,
    },
    modalView: {
      backgroundColor: Colors.white,
      borderRadius: 20,
      elevation: 5,
      margin: 20,
      paddingBottom: 35,
      shadowColor: "#000",
      shadowOffset: {
        height: 2,
        width: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
  },
};

export default Styles;
