import React from 'react';
import RegisterScreen from './screens/Register/register';
import CityDetailsScreen from './screens/CityDetails/CityDetails';
import CityListScreen from './screens/CityList/CityListScreen';
import CustomLoginScreen from './screens/Login/login';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={CustomLoginScreen} />
        <Stack.Screen name="Cadastro" component={RegisterScreen} />
        <Stack.Screen name="Cidades IBGE" component={CityListScreen} />
        <Stack.Screen name="Detalhes da cidade" component={CityDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
