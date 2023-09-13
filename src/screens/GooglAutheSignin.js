import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const GooglAutheSignin = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation(); // Initialize navigation

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '411051025074-21vvmiob81m9937himntsvh9d3loltio.apps.googleusercontent.com',
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      console.log('first');
      const usrInfo = await GoogleSignin.signIn();
      setUserInfo(usrInfo);

      // Navigate to the "NearByHospitals" screen upon successful login
      navigation.navigate('NearByHospitals');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // Handle when the user cancelled the login flow
        console.log('Sign-in cancelled by user');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Handle when an operation (e.g., sign in) is already in progress
        console.log('Sign-in operation already in progress');
        Alert.alert(
          'Sign-In in Progress',
          'A sign-in operation is already in progress. Please wait or cancel it.'
        );
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Handle when Play Services are not available or outdated
        console.log('Play Services are not available or outdated');
      } else {
        // Handle other error cases here
        console.error('Google Sign-In Error:', error);
        // Display a message for the non-recoverable error
        Alert.alert(
          'Sign-In Failed',
          'A non-recoverable sign-in failure occurred. Please try again.'
        );
      }
    }
  };

  console.log('sdfsdf', userInfo);

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
    </View>
  );
};

export default GooglAutheSignin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
