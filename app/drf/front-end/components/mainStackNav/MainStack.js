import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from '../tabs/BottomTabs'; 
import PostDetails from '../posts/PostDetails';
import MapScreen from "../map/mapMain";
import DrawerNav from '../drawer/DrawerNav';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="PostDetails" component={PostDetails} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  };
  

export default MainStackNavigator;