import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import Navbar from "../navBar/NavBar";
import Listing from "./Listing";
import { useScrollToTop } from "@react-navigation/native";
import FloatingButton from "./FloattingButton";
import SearchBar from "./SearchBar";

const map = require("../../assets/icons/map.png");

const categoryIcons = {
  Italian: require("../../assets/icons/italian.png"),
  Vegan: require("../../assets/icons/vegetarian.png"),
  Meat: require("../../assets/icons/meat.png"),
  Asian: require("../../assets/icons/asian.png"),
  Mexican: require("../../assets/icons/mexican.png"),
  Produce: require("../../assets/icons/produce.png"),
  Desserts: require("../../assets/icons/dessert.png"),
  Canned: require("../../assets/icons/canned.png"),
};

const foodListings = [
  {
    dish: "Pasta Carbonara",
    name: "Aisha",
    date: "3 hours ago",
    image: require("../../assets/images/dummyImages/Pasta.jpg"),
    category: "Italian",
    distance: "1km",
    rating: 4.5,
  },
  {
    dish: "Veggie Pizza",
    name: "Daniel",
    date: "5 hours ago",
    image: require("../../assets/images/dummyImages/Pizza.webp"),
    category: "Italian",
    distance: "2km",
    rating: 3.5,
  },
  {
    dish: "Grilled Chicken",
    name: "Olga",
    date: "1 hours ago",
    image: require("../../assets/images/dummyImages/Chicken.jpg"),
    category: "Meat",
    distance: "4km",
    rating: 5,
  },
  {
    dish: "Vegan Burrito",
    name: "Giovanni",
    date: "8 hours ago",
    image: require("../../assets/images/dummyImages/Burrito.jpg"),
    category: ["Mexican", "Vegan"],
    distance: "6km",
    rating: 3,
  },
  {
    dish: "Cheeseburger",
    name: "Linh",
    date: "4 hours ago",
    image: require("../../assets/images/dummyImages/Cheeseburger.jpg"),
    category: "Meat",
    distance: "9km",
    rating: 1.5,
  },
  {
    dish: "Rice Noodles",
    name: "Esmeralda",
    date: "5 hours ago",
    image: require("../../assets/images/dummyImages/Ricenoodles.webp"),
    category: "Asian",
    distance: "9km",
    rating: 2.5,
  },
  {
    dish: "BBQ Ribs",
    name: "Haruki",
    date: "7 hours ago",
    image: require("../../assets/images/dummyImages/Bbqribs.jpg"),
    category: "Meat",
    distance: "11km",
    rating: 4.7,
  },
  {
    dish: "Salmon Salad",
    name: "Kwame",
    date: "1 day ago",
    image: require("../../assets/images/dummyImages/Salmonsalad.jpeg"),
    category: "Meat",
    distance: "8km",
    rating: 4.9,
  },
  {
    dish: "Vegan Sushi",
    name: "Francesca",
    image: require("../../assets/images/dummyImages/VeganSushi.jpg"),
    category: ["Asian", "Vegan"],
    distance: "10km",
    rating: 3.9,
  },
  {
    dish: "Spaghetti Bolognese",
    name: "Ananya",
    date: "1 day ago",
    image: require("../../assets/images/dummyImages/Spaghettibolognese.jpg"),
    category: ["Italian", "Meat"],
    distance: "12km",
    rating: 1.8,
  },
  {
    dish: "Lobster Bisque",
    name: "Michael",
    date: "1 day ago",
    image: require("../../assets/images/dummyImages/LobsterBisque.png"),
    category: "Seafood",
    distance: "1km",
    rating: 1.8,
  },
  {
    dish: "Mushroom Risotto",
    name: "Pierre",
    date: "1 day ago",
    image: require("../../assets/images/dummyImages/MushroomRisotto.jpg"),
    category: ["Italian"],
    distance: "8km",
    rating: 4.5,
  },
];

const handleMapPress = () => {
  //TODO
  console.log("Map icon pressed!");
};

// Cateogry Items
const items = [{ label: "Date" }, { label: "Distance" }, { label: "Rating" }];

const HomePage = () => {
  // State for holding and managing search queries
  const [searchQuery, setSearchQuery] = React.useState("");

  // State to hold selected food categories
  const [selectedCategories, setSelectedCategories] = React.useState([]);

  // Ref to the ScrollView for managing scroll actions
  const scrollRef = useRef(null);

  // State for managing how the food listings are sorted (by Date, Distance, or Rating)
  const [sortOption, setSortOption] = useState("Date");

  // Function to update search query
  const onChangeSearch = (query) => setSearchQuery(query);

  // React Navigation's method to scroll the ScrollView to top
  useScrollToTop(scrollRef);

  // Function to manually scroll the ScrollView to top
  const handleScrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  // Function to handle the selection of food categories
  const handleCategoryPress = (category) => {
    // If the category is already selected, remove it; else add it
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prev) => prev.filter((cat) => cat !== category));
    } else {
      setSelectedCategories((prev) => [...prev, category]);
    }
  };

  // Function to check if a category is selected
  const isCategorySelected = (category) =>
    selectedCategories.includes(category);

  // Function to check if a category matches the search query
  const isCategoryMatching = (categories, query) => {
    // Check if the categories variable is an array or not
    if (!Array.isArray(categories)) {
      return categories.toLowerCase().includes(query.toLowerCase());
    }
    return categories.some((category) =>
      category.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Filtering the food listings based on search query and selected categories
  const filteredListings = foodListings.filter((listing) => {
    const isDishMatching = listing.dish
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const isCategoryMatchingSearch = isCategoryMatching(
      listing.category,
      searchQuery
    );
    const isListingCategorySelected = selectedCategories.some((cat) =>
      isCategoryMatching(listing.category, cat)
    );

    return (
      (isDishMatching || isCategoryMatchingSearch) &&
      (!selectedCategories.length || isListingCategorySelected)
    );
  });

  // Sorting the filtered listings based on the selected sort option
  if (sortOption === "Date") {
    filteredListings.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  } else if (sortOption === "Distance") {
    filteredListings.sort(
      (a, b) => parseFloat(a.distance) - parseFloat(b.distance)
    );
  } else if (sortOption === "Rating") {
    filteredListings.sort((a, b) => b.rating - a.rating);
  }

  return (
    // Container to ensure content is displayed within safe areas of the device
    <SafeAreaView style={styles.container}>
      {/* Custom Navigation bar with sort options */}
      <Navbar
        items={items}
        dropdown={true}
        iconName="sort"
        iconLabel={"Sort By"}
        onSelect={(selectedSort) => setSortOption(selectedSort)}
      />

      {/* Main content container */}
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
      >
        {/* Container for search bar and map icon */}
        <View style={styles.content}>
          <View style={styles.searchRowContainer}>
            {/* Search input for user queries */}
            <SearchBar
              searchQuery={searchQuery}
              onChangeSearch={onChangeSearch}
            />

            {/* Button to invoke map actions */}
            <TouchableOpacity
              onPress={handleMapPress}
              style={styles.mapIconContainer}
            >
              <Image source={map} style={styles.mapIconImage} />
            </TouchableOpacity>
          </View>

          {/* Horizontal scroller for selecting food categories */}
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
          >
            {/* Iterating through categories and showing icons for each */}
            {Object.keys(categoryIcons).map((category) => (
              <View style={styles.categoryContainer} key={category}>
                <TouchableOpacity
                  style={[
                    styles.categoryButton,
                    isCategorySelected(category)
                      ? styles.categorySelected
                      : null,
                  ]}
                  onPress={() => handleCategoryPress(category)}
                >
                  <Image
                    source={categoryIcons[category]}
                    style={styles.iconImage}
                  />
                </TouchableOpacity>

                {/* Label for the category icon */}
                <Text
                  style={[
                    styles.categoryText,
                    isCategorySelected(category)
                      ? styles.categoryTextSelected
                      : null,
                  ]}
                >
                  {category}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* Container for displaying food listings */}
          <View style={styles.listingsContainer}>
            {/* Checking if there are listings to display */}
            {filteredListings.length ? (
              filteredListings.map((listing, idx) => (
                <Listing key={listing.dish} listing={listing} idx={idx} />
              ))
            ) : (
              // Displaying message if no matching listings are found
              <Text style={styles.noMatchesText}>
                Nothing like that for now...
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Floating button to scroll the content to the top */}
      <FloatingButton onButtonPress={handleScrollToTop} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    zIndex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  searchRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  mapIconContainer: {
    marginLeft: 10,
  },
  mapIconImage: {
    width: 47,
    height: 47,
  },
  categoryScroll: {
    flexDirection: "row",
    marginVertical: 5,
  },
  categoryContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  categoryButton: {
    backgroundColor: "transparent",
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  categorySelected: {
    backgroundColor: "rgba(252,166,60,0.2) ",
  },
  iconImage: {
    width: 40,
    height: 40,
  },
  categoryText: {
    fontWeight: "600",
    color: "black",
    fontSize: 12,
  },
  categoryTextSelected: {
    fontWeight: "600",
    color: "rgba(252,166,60,0.8)",
    fontSize: 12,
  },
  listingsContainer: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  noMatchesText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 20,
    color: "grey",
  },
});

export default HomePage;
