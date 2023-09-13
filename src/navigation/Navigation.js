import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import GooglAutheSignin from '../screens/GooglAutheSignin';
import NearByHospitals from '../screens/NearByHospitals';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="GooglAutheSignin" component={GooglAutheSignin} />
        <Stack.Screen name="NearByHospitals" component={NearByHospitals} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})