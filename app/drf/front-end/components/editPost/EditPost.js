import React, { useState, useEffect, useRef } from 'react';
import {ScrollView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image, Modal, View} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { categoryIcons } from "../Categories";
import { allergens } from '../Allergens';
import DatePicker from './DatePicker'; 
import TitleInput from './TitleInput'; 
import DescriptionInput from './DescriptionInput'; 
import CategoriesSelector from './CategoriesSelector'; 
import AllergensSelector from './AllergensSelector'; 
import ImageHandler from './ImageHandler';
import CustomText from '../CustomText';
import SubmitButton from './SubmitButton'; 
import CancelButton from './CancelButton'; 
import { ImagePicker } from 'expo-image-multiple-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImageGrid from './ImageGrid'; 
import styles from './styles';

const EditPost = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const scrollViewRef = useRef();

  
    // Extract the post from the route parameters
    const { post } = route.params;
  
    // Define state variables for the post attributes
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedAllergens, setSelectedAllergens] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [bestBefore, setBestBefore] = useState('');
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date(post.best_before));
    const [images, setImages] = useState(post.images || []);
    const [isPickerOpen, setIsPickerOpen] = useState(false);    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const backArrowIcon = require('../../assets/icons/back-arrow.png');

  // Handlers for the image picker
  const handleImageSave = (selectedImages) => {
    const newImages = selectedImages.map(img => ({ image: img.uri }));
    setImages([...images, ...newImages]);
    setIsPickerOpen(false);
  };

  const handleImageCancel = () => {
    setIsPickerOpen(false);
  };

  // Image change and delete logic
  const handleChangeImage = async (index) => {
    // ImagePicker logic for changing an image
  };

  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

    // Function to handle date change
    const handleDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || bestBefore;
      setDatePickerVisible(Platform.OS === 'ios');
      setSelectedDate(currentDate);

    // Format the date and update bestBefore state
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      setBestBefore(formattedDate);
    };
    

    // Function to show the date picker
    const showDatePicker = () => {
      setDatePickerVisible(true);
    };

    useEffect(() => {
      // Update state with the new post's information whenever the route parameters change
      setTitle(post.title);
      setContent(post.content);
      setSelectedCategories(post.categories ? post.categories.split(',').map(category => category.trim()) : []);
      setSelectedAllergens(post.allergens ? post.allergens.split(',').map(allergen => allergen.trim()) : []);
      if (post.best_before) {
        const date = new Date(post.best_before); // Corrected line: create a Date object
        const formattedDate = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
        setBestBefore(formattedDate);
      
    }
  
    }, [post, route.params]);

    useEffect(() => {
      navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity onPress={handleCancel}>
            <Image source={backArrowIcon} style={{ width: 25, height: 25, marginLeft: 20 }} />
          </TouchableOpacity>
        ),
      });
    }, [navigation, handleCancel]);
    
  const availableCategories = Object.keys(categoryIcons);
  const availableAllergens = allergens;

  const toggleCategory = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category],
    );
  };

  const toggleAllergen = (allergen) => {
    setSelectedAllergens((prevAllergens) => {
        if (!prevAllergens) {
            return [allergen];
        }
        return prevAllergens.includes(allergen)
            ? prevAllergens.filter((a) => a !== allergen)
            : [...prevAllergens, allergen];
    });
};

useFocusEffect(
    React.useCallback(() => {
      return () => {
        // This function will be called when the screen goes out of focus
        // Reset the fields to their initial state
        scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
        setTitle('');
        setContent('');
        setSelectedCategories([]);
        setSelectedAllergens([]);
      };
    }, [])
  );

  // TODO: Handle post update submission
  const handleUpdatePost = async () => {
    console.log("update post")
  };

  
  const handleCancel = () => {
    // Reset title, content, categories, allergens, and best before date
    setTitle(post.title);
    setContent(post.content);
    setSelectedCategories(post.categories ? post.categories.split(',').map(category => category.trim()) : []);
    setSelectedAllergens(post.allergens ? post.allergens.split(',').map(allergen => allergen.trim()) : []);
    
    // Reset best before date
    const bestBeforeDate = new Date(post.best_before);
    setBestBefore(bestBeforeDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }));
    setSelectedDate(bestBeforeDate);
  
    // Reset images
    setImages(post.images || []);
  
    // Scroll to the top of the ScrollView
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
    navigation.goBack();
  };

  const handleReset = () => {
    // Reset title, content, categories, allergens, and best before date
    setTitle(post.title);
    setContent(post.content);
    setSelectedCategories(post.categories ? post.categories.split(',').map(category => category.trim()) : []);
    setSelectedAllergens(post.allergens ? post.allergens.split(',').map(allergen => allergen.trim()) : []);
    
    // Reset best before date
    const bestBeforeDate = new Date(post.best_before);
    setBestBefore(bestBeforeDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }));
    setSelectedDate(bestBeforeDate);
  
    // Reset images
    setImages(post.images || []);
  
    // Scroll to the top of the ScrollView
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
  };
  


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView style={styles.scrollContainer} ref={scrollViewRef}>

            {/*Title*/}
            <TitleInput title={title} setTitle={setTitle} />

            {/*Description */}
            <DescriptionInput content={content} setContent={setContent} />

            {/* Categories */}
            <CategoriesSelector
              availableCategories={availableCategories}
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
            />

            {/*Allergens*/}
            <AllergensSelector
              availableAllergens={availableAllergens}
              selectedAllergens={selectedAllergens}
              toggleAllergen={toggleAllergen}
            />

            {/*Date*/}
            <DatePicker
              bestBefore={bestBefore}
              setBestBefore={setBestBefore}
              selectedDate={selectedDate}
              handleDateChange={handleDateChange}
              showDatePicker={showDatePicker}
              isDatePickerVisible={isDatePickerVisible}
              minimumDate={tomorrow}
            />

            {/*Images*/}
            <View style={styles.section}>
              <View style={styles.imageSection}>
                <CustomText style={styles.title}>Images</CustomText>
                {images.length < 6 && (
                  <TouchableOpacity style={styles.addIconContainer} onPress={() => setIsPickerOpen(true)}>
                    <MaterialIcons name="add" size={26} color="#000" />
                  </TouchableOpacity>
                )}
              </View>
              <ImageGrid images={images} onChangeImage={handleChangeImage} onDeleteImage={handleDeleteImage} />
            </View>

            {/*Multiple Image Picker Modal */}
            <Modal
              visible={isPickerOpen}
              animationType="slide"
              onRequestClose={() => setIsPickerOpen(false)}
              transparent={false}
            >
              <ImagePicker
                onSave={handleImageSave}
                onCancel={handleImageCancel}
                limit={6 - images.length}
                mediaType="photo"
                multiple
              />
            </Modal>

            {/*Submit*/}
            <SubmitButton handleUpdatePost={handleUpdatePost} />

            {/*Cancel*/}
            <CancelButton handleCancel={handleReset} />


        </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default EditPost;
