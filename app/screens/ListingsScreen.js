import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import AppText from "../components/Text";
import Button from "../components/Button";
import useApi from "../hooks/useApi";

function ListingsScreen({ navigation }) {
  //useAPi return object
  const getListingsApi = useApi(listingsApi.getListings);
  // data:listing, error, loading, request: reloading

  // the code below write seperate as a component we can re-use in the future . =>useApi
  // const [listings, setListings] = useState([]);
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    getListingsApi.request();
  }, []);

  // const loadListings = async () => {
  //   setLoading(true);
  //   const response = await listingsApi.getListings();
  //   setLoading(false);

  //   // console.log("try new time,get sata", response.data);
  //   // data is Array object

  //   if (!response.ok) {
  //     return setError(true);
  //   }
  //   setError(false);
  //   // console.log("what is response", response);
  //   setListings(response.data);
  // };
  console.log("listing screen data detail", getListingsApi.data);
  // localhost post photo can be uploaded show shows in listings.
  return (
    <>
      <ActivityIndicator visible={getListingsApi.loading} />
      <Screen style={styles.screen}>
        {getListingsApi.error && (
          <>
            <AppText> Could not retrieve the listings.</AppText>
            <Button title="Retry" onPress={getListingsApi.request} />
          </>
        )}

        <FlatList
          data={getListingsApi.data}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subtitle={"$" + item.price}
              imageUrl={item.images[0].url}
              thumbnailUrl={item.images[0].thumbnailUrl}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            />
          )}
        />
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
