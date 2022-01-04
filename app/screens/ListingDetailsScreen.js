import React from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import Text from "../components/Text";
import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import { Image } from "react-native-expo-image-cache";
import ContactSellerForm from "../components/ContactSellerForm";
import Screen from "../components/Screen";

function ListingDetailsScreen({ route }) {
  const listing = route.params;
  // console.log("listing is ", listing);
  //

  return (
    <View>
      <Image
        style={styles.image}
        tint="light"
        preview={{ uri: listing.images[0].thumbnailUrl }}
        uri={listing.images[0].url}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{listing.title}</Text>
        <Text style={styles.price}>${listing.price}</Text>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/id.png")}
            title="Kitty"
            subTitle="5 listings"
          />
        </View>

        <ContactSellerForm listing={listing} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  price: {
    color: colors.secondary,
    margin: 10,
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ListingDetailsScreen;
