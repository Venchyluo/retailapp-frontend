import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import Text from "./Text";
import Constants from "expo-constants";
import { useNetInfo } from "@react-native-community/netinfo";

function OfflineNotice(props) {
  const netInfo = useNetInfo();
  //   console.log("netinfo", netInfo);
  if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
    //   must use isInternetReable === false, because ! null => true
    return (
      <View style={styles.container}>
        <Text style={styles.text}> NO Internet collection.</Text>
      </View>
    );
  return null;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    height: 50,
    position: "absolute",
    zIndex: 1,
    width: "100%",
    top: Constants.statusBarHeight,
  },
  text: {
    color: colors.white,
  },
});

export default OfflineNotice;
