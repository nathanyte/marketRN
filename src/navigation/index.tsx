import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import Home from '../components/screens/home-page';
import AddProduct from '../components/screens/add-product-page';
import {NavigatorRoutes} from './routes';

const Stack = createNativeStackNavigator();
const stackNavigatorOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NavigatorRoutes.HOME}
        component={Home}
        options={stackNavigatorOptions}
      />
      <Stack.Screen
        name={NavigatorRoutes.ADD_PRODUCT}
        component={AddProduct as React.FC}
        options={stackNavigatorOptions}
      />
    </Stack.Navigator>
  );
};

export default Router;
