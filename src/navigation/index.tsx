import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import Home from '../components/screens/home-page';
import AddProduct from '../components/screens/add-product-page';

const Stack = createNativeStackNavigator();
const stackNavigatorOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={stackNavigatorOptions}
      />
      <Stack.Screen
        name="AddProduct"
        component={AddProduct}
        options={stackNavigatorOptions}
      />
    </Stack.Navigator>
  );
};

export default Router;
