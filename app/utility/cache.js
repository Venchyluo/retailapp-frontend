import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const prefix = "cache";
const store = async (key, value) => {
  try {
    const item = {
      value,
      timstamp: Date.now(),
    };
    await AsyncStorage.setItem(prefix + key, JSON.stringify(value));
  } catch (error) {
    console.log("error in cache", error);
  }
};

//seperate is expired with get method
const isExpired = (item) => {
  const now = moment(Date.now());
  const storedTime = moment(item.timstamp);
  // const expiryInMinutes = 5;
  // or I can use the variable name shows above instead of hard code
  return now.diff(storedTime, "minutes") > 5;
};

const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    // value is string
    const item = JSON.parse(value);
    if (!item) return null;

    if (isExpired(item)) {
      // Command Query Separation (CQS)
      await AsyncStorage.removeItem(prefix + key);
    }
    return item.value;
  } catch (error) {
    console.log("error in get", error);
  }
};

export default {
  store,
};
