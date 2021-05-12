import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ListingScreen from '../screens/ListingScreen';
import ListingDetailScreen from '../screens/ListingDetailScreen';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Posts">
        <Stack.Screen
          name="Posts"
          component={ListingScreen}
          options={{title: 'Posts'}}
        />
        <Stack.Screen name="PostDetail" component={ListingDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
