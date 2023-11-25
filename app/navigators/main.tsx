
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';
import DetailsScreen from '../screens/details';

export type RootStackParamList = {
     Home: undefined;
     Details: { id: String }
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function MainNavigator() {
     return (
          <Stack.Navigator initialRouteName="Home">
               <Stack.Screen name="Home" component={HomeScreen} options={{
                    headerShown: false
               }}/>
               <Stack.Screen name="Details" component={DetailsScreen} options={{
                    headerTitle: ''
               }}/>
          </Stack.Navigator>
     )
}

export default MainNavigator;