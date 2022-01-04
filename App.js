import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { navigationRef } from "./app/navigation/rootNavigation";
import ContactSellerForm from "./app/components/ContactSellerForm";

// const Stack = createStackNavigator();

// const Tweets = ({ navigation }) => (
//   <Screen>
//     <Text>Tweets </Text>
//     <Button
//       title="View Tweet"
//       onPress={() => navigation.navigate("TweetDetail", { id: 1 })}
//     />
//   </Screen>
// );

// const TweetDetail = ({ route }) => (
//   <Screen>
//     <Text>Tweet Details {route.params.id} </Text>
//   </Screen>
// );

// const StackNavigator = () => (
//   <Stack.Navigator
//   // screenOptions={
//   //   {
//   //     // headerStyle: { backgroundColor: "pink" },
//   //     // headerTintColor: "white",
//   //   }
//   // }
//   >
//     <Stack.Screen name="Tweets" component={Tweets} />
//     <Stack.Screen
//       name="TweetDetail"
//       component={TweetDetail}
//       options={({ route }) => ({ title: route.params.id })}
//     />
//   </Stack.Navigator>
// );

// const Tab = createBottomTabNavigator();
// const TabNavigator = () => (
//   <Tab.Navigator
//     tabBarOptions={{
//       activeBackgroundColor: "tomato",
//       activeTintColor: "white",
//       inactiveBackgroundColor: "#97BFB4",
//       inactiveTintColor: "black",
//     }}
//   >
//     <Tab.Screen
//       name="Feed"
//       component={StackNavigator}
//       // options={{
//       //   tabBarIcon: ({ size, color }) => (
//       //     <MaterialCommunityIcons name="home" size={size} color={color} />
//       //   ),
//       // }}
//     />
//     <Tab.Screen name="Account" component={Account} />
//   </Tab.Navigator>
// );

function App(props) {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };
  // restoreUser();
  // manually setUser, because there is an error in apploading with startAsync.

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser()}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  console.log("user in app JS", user);
  // const demo = async () => {
  //   try {
  //     await AsyncStorage.setItem("person", JSON.stringify({ id: 1 }));

  //     const value = await AsyncStorage.getItem("person");
  //     const person = JSON.parse(value);
  //     console.log("done", person);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };
  // const navigationRef = React.createRef();
  // const navigation = navigationRef.current;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
  // demo();
  // return null;
}

export default App;
