import type { ReactElement } from "react";
import React from "react";
import { StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { ScrollView } from "react-native-gesture-handler";

import { Paddings } from "../../../styles";
import type { Video } from "../../../types";
import VideoCard from "../video/videoCard.component";

export const TabParenthequeVideos = (videos: Video[]): ReactElement => {
  return (
    <ScrollView>
      {videos.length > 0 && (
        <View style={styles.listContainer}>
          {videos.map((video, index) => (
            <Animatable.View
              key={index}
              animation="fadeInUp"
              duration={1000}
              delay={0}
            >
              <VideoCard video={video} />
            </Animatable.View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: Paddings.default,
    paddingVertical: Paddings.smallest,
  },
});

export default TabParenthequeVideos;
