import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import viewNames from './state/ViewNames';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={viewNames.Start}
          component={Start}
        />
        <Stack.Screen 
          name={viewNames.FinalSuccess}
          component={FinalSuccess} 
        />
      </Stack.Navigator>
    </NavigationContainer>  
  );
}
