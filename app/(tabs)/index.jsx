import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import COLORS from "../../constants/color";
import { Ionicons } from "@expo/vector-icons";

const index = () => {
  return (
    // <View>
    //   <Text>index</Text>
    // </View>
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Header Bar */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Glamour Beauty</Text>
          {/* Add search element here */}
          <TouchableOpacity style={styles.headerText}>
            {/* <Text style={styles.footerText}>Profile</Text> */}
            <Ionicons name="person-circle-outline" color="white" size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView>
          {/* Promotion Banner */}
          <Image
            source={require("../../assets/lipstick-icon-vector-16367580.jpg")}
            style={styles.banner}
          />

          {/* Product Categories */}
          <View style={styles.categoryContainer}>
            {/* Add product categories here */}
            {/* Example categories */}
            <TouchableOpacity style={styles.categoryItem}>
              <Image
                source={require("../../assets/lipstick.png")}
                style={styles.categoryIcon}
              />
              <Text style={styles.categoryText}>Lipsticks</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}>
              <Image
                source={require("../../assets/eyeshadow.png")}
                style={styles.categoryIcon}
              />
              <Text style={styles.categoryText}>Eyeshadows</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}>
              <Image
                source={require("../../assets/foundation.png")}
                style={styles.categoryIcon}
              />
              <Text style={styles.categoryText}>Foundations</Text>
            </TouchableOpacity>
          </View>

          {/* Featured Products */}
          {/* <View style={styles.productContainer}>
          {products.map((product) => (
            <TouchableOpacity key={product.id} style={styles.productItem}>
              <Image source={product.image} style={styles.productImage} />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
            </TouchableOpacity>
          ))}
        </View> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
  },
  banner: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 20,
  },
  categoryItem: {
    alignItems: "center",
  },
  categoryIcon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  categoryText: {
    marginTop: 10,
    fontSize: 16,
  },
  productContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  productItem: {
    width: "45%",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 10,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  productName: {
    marginVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 14,
    color: COLORS.secondary,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
  },
  footerItem: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    color: COLORS.white,
  },
});
