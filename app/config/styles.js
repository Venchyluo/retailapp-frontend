import { Platform } from "react-native";

import colors from "./colors";

export default {
  text: {
    color: colors.dark,
    fontSize: 15,
    fontFamily: Platform.OS === "android" ? "Robot" : "Avenir",
    marginVertical: 10,
    padding: 10,
  },
};
