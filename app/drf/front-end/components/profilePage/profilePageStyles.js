import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

// Define color constants
export const colors = {
  lightOrange: '#F8B951',
  mediumOrange: '#FCA63C',
  darkOrange: '#DB6D2A',
  darkGray: '#222222',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  coverImage: {
    width: '100%',
    height: 200,
  },

  profileInfoContainer: {
    alignItems: 'center',
    marginTop: -52,
    marginBottom:10,
  },

  settingsButtonContainer: {
    position: 'absolute',
    top: 13,
    right: 20,
    zIndex: 1,
  },

  circleBackground: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  settingsIcon:{
    width:25,
    height:25,
  },

  postCardContainer: {
    marginBottom: 10,
    width: '50%',
  },

  ratingAndReviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  reviews: {
    fontSize: 16,
    color:"#9ba5f1",
  },

  reviewPressable: {
    marginLeft: 10,
  },

  profileContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  userInfo: {
    alignItems: 'center',
  },

  profilePictureContainer:{
    alignContent:"center",
    justifyContent:"center",
    borderRadius: 50,
    borderWidth: 12,
    borderColor: 'white',
    position: 'relative',
  },

  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 15,
    padding: 2,
  },
  editIcon: {
    width: 20,
    height: 20,
  },

  profileAndRatingContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },

  profilePicture: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },

  name: {
    fontSize: 20,
    color: 'black',
    marginTop:5,
  },

  location: {
    fontSize: 15,
    color: "grey",
  },

  locationContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },

  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  tab: {
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },

  selectedTab: {
    borderBottomColor: '#F8B951',
    borderBottomWidth: 2
  },

  tabText: {
    fontSize: 16,
  },

  centeredPostsContainer: {
    marginTop:10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  recentPostsText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    marginBottom: 20,
    alignSelf:"center"
  },

  rrecentPostsContainer: {
    width: '100%',
    alignItems: 'center',
  },

  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  settingsButton: {
    height: 26,
    width: 26,
    resizeMode: 'contain',
  },

  noReviewsText:{
    fontSize:18,
    color:"grey",
    textAlign:"center",
    marginTop:10
  },
});

export default styles;