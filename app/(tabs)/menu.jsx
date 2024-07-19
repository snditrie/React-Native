// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   Modal,
//   FlatList,
//   SafeAreaView,
// } from "react-native";
// import axios from "axios";
// import { PickerIOS } from "@react-native-picker/picker";

// const menu = () => {
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [drinks, setDrinks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const categories = [
//     "Cocktail",
//     "Punch / Party Drink",
//     "Beer",
//     "Shot",
//     "Coffee / Tea",
//     "Cocoa",
//     "Ordinary Drink",
//     "Shake",
//     "Homemade Liqueur",
//     "Soft Drink",
//     "Other / Unknown",
//   ];

//   const apiUrls = [
//     "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a",
//     "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=b",
//     "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=c",
//     "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=d",
//     "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=e",
//     "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=f",
//     "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=g",
//     "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=h",
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const responses = await Promise.all(
//           apiUrls.map((url) => axios.get(url))
//         );
//         const allDrinks = responses.flatMap(
//           (response) => response.data.drinks || []
//         );
//         setDrinks(allDrinks);
//         setLoading(false);
//       } catch (error) {
//         setError(error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [apiUrls]);

//   const handleSearch = (value) => {
//     setSearchTerm(value);
//   };

//   const openModal = (product) => {
//     setSelectedProduct(product);
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//     setSelectedProduct(null);
//   };

//   const filteredDrinks = drinks.filter((drink) => {
//     if (selectedCategory && drink.strCategory !== selectedCategory) {
//       return false;
//     }
//     if (
//       searchTerm &&
//       !drink.strDrink.toLowerCase().includes(searchTerm.toLowerCase())
//     ) {
//       return false;
//     }
//     return true;
//   });

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={{
//         flex: 1,
//         margin: 10,
//         borderRadius: 10,
//         backgroundColor: "#f0f0f0",
//         padding: 10,
//       }}
//       onPress={() => openModal(item)}
//     >
//       <Image
//         source={{ uri: item.strDrinkThumb }}
//         style={{ width: "100%", height: 200, borderRadius: 10 }}
//       />
//       <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
//         {item.strDrink}
//       </Text>
//       <Text style={{ color: "gray" }}>{item.strAlcoholic}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <Text style={styles.headerText}>Products</Text>
//           <View style={styles.headerControls}>
//             <TextInput
//               style={styles.input}
//               placeholder="Search by drink name..."
//               value={searchTerm}
//               onChangeText={handleSearch}
//             />
//             <PickerIOS
//               style={styles.picker}
//               selectedValue={selectedCategory}
//               onValueChange={(itemValue) => setSelectedCategory(itemValue)}
//             >
//               <PickerIOS.Item label="All Categories" value="" />
//               {categories.map((category) => (
//                 <PickerIOS.Item
//                   key={category}
//                   label={category}
//                   value={category}
//                 />
//               ))}
//             </PickerIOS>
//           </View>
//         </View>
//         {/* <ScrollView style={styles.productContainer}> */}
//         <FlatList
//           data={filteredDrinks}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.idDrink}
//           numColumns={2}
//           contentContainerStyle={{ padding: 10 }}
//         />
//         {/* </ScrollView> */}
//         {selectedProduct && (
//           <Modal
//             animationType="slide"
//             transparent={false}
//             visible={modalVisible}
//             onRequestClose={closeModal}
//           >
//             <View style={styles.modalContainer}>
//               <View style={styles.modalHeader}>
//                 <Text style={styles.modalHeaderText}>
//                   {selectedProduct.strDrink} Recipe
//                 </Text>
//                 <TouchableOpacity onPress={closeModal}>
//                   <Text style={styles.closeButton}>✕</Text>
//                 </TouchableOpacity>
//               </View>
//               <ScrollView style={styles.modalContent}>
//                 <Image
//                   source={{ uri: selectedProduct.strDrinkThumb }}
//                   style={styles.modalImage}
//                   resizeMode="contain"
//                 />
//                 <Text style={styles.modalText}>Instructions:</Text>
//                 <Text style={styles.modalTextContent}>
//                   {selectedProduct.strInstructions}
//                 </Text>
//                 <Text style={styles.modalText}>Glass:</Text>
//                 <Text style={styles.modalTextContent}>
//                   {selectedProduct.strGlass}
//                 </Text>
//                 <Text style={styles.modalText}>Ingredients:</Text>
//                 {Array.from({ length: 15 }, (_, i) => (
//                   <View style={styles.ingredientsRow} key={i}>
//                     <Text style={styles.ingredient}>
//                       {selectedProduct[`strIngredient${i + 1}`]}
//                     </Text>
//                     <Text style={styles.measure}>
//                       {selectedProduct[`strMeasure${i + 1}`]}
//                     </Text>
//                   </View>
//                 ))}
//               </ScrollView>
//             </View>
//           </Modal>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f0f0f0",
//     padding: 10,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   headerControls: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     flex: 1,
//   },
//   input: {
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     width: "45%",
//   },
//   picker: {
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     width: "45%",
//   },
//   productContainer: {
//     flex: 1,
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: "#f0f0f0",
//     padding: 20,
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   modalHeaderText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   closeButton: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   modalContent: {
//     flex: 1,
//   },
//   modalImage: {
//     width: "100%",
//     height: 200, // Adjust height as needed to prevent oversized images
//     marginBottom: 20,
//     borderRadius: 10,
//   },
//   modalText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   modalTextContent: {
//     fontSize: 16,
//     marginBottom: 20,
//     color: "#666",
//   },
//   ingredientsRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 5,
//   },
//   ingredient: {
//     flex: 1,
//     fontSize: 16,
//     color: "#333",
//   },
//   measure: {
//     fontSize: 16,
//     color: "#666",
//   },
// });

// export default menu;
