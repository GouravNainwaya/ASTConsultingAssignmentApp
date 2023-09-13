import React , { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, PermissionsAndroid, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation'; // Import from the community package
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const NearByHospitals = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [showMaps, setShowMaps] = useState(false)

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchNearbyHospitals(userLocation);
    }
  }, [userLocation]);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'We need your location for...',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Permission granted, you can now use Geolocation
        getUserLocation();
      } else {
        // Handle the case where permission was denied
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const getUserLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const fetchNearbyHospitals = async (location) => {
    try {
      setShowMaps(true)
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=5000&type=hospital&key=AIzaSyBJuEcYHTDCCEIZfaMIhO8z8QGjCiFlips`
      );

      setHospitals(response.data.results);
      setShowMaps(false)
    } catch (error) {
      console.error(error);
      setShowMaps(false)
    }
  };

  return (
    <View style={styles.container}>
    {showMaps ? (
      <ActivityIndicator size="large" color="black" style={{flex: 1}} />
    ) : null}
    {userLocation && !showMaps && (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={userLocation}
          title="Your Location"
          pinColor="blue"
        />
        {hospitals.map((hospital) => (
          <Marker
            key={hospital.place_id}
            coordinate={{
              latitude: hospital.geometry.location.lat,
              longitude: hospital.geometry.location.lng,
            }}
            title={hospital.name}
            description={hospital.vicinity}
          />
        ))}
      </MapView>
    )}
  </View>
  );
}

export default NearByHospitals

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height,
  },
});