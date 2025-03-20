// Check-in Screen Component in React Native

import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import { useDispatch } from 'react-redux';
import { submitCheckIn } from '../redux/actions/habitActions';

const CheckInScreen = ({ route, navigation }) => {
  const { habitId, habitTitle } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    (async () => {
      // Request camera permissions
      const { status: cameraStatus } = await Camera.requestPermissionsAsync();
      // Request location permissions
      const { status: locationStatus } = await Location.requestPermissionsAsync();
      
      setHasPermission(
        cameraStatus === 'granted' && locationStatus === 'granted'
      );
      
      if (locationStatus === 'granted') {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      }
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef) {
      const photoData = await cameraRef.takePictureAsync({
        quality: 0.7,
        base64: true,
      });
      setPhoto(photoData);
    }
  };

  const submitProof = async () => {
    if (!photo || !location) {
      Alert.alert('Error', 'Both photo and location are required');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Get location name for better UX
      const [locationDetails] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      
      const locationName = locationDetails 
        ? `${locationDetails.name}, ${locationDetails.city}` 
        : 'Unknown location';
      
      // Submit check-in data to server
      await dispatch(submitCheckIn({
        habitId,
        photoData: photo.base64,
        locationData: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          locationName
        }
      }));
      
      Alert.alert(
        'Check-in Submitted!',
        'Your buddy will verify your progress soon.',
        [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit check-in');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (hasPermission === null) {
    return <View style={styles.container}><Text>Requesting permissions...</Text></View>;
  }
  
  if (hasPermission === false) {
    return <View style={styles.container}><Text>Camera and location access is required</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check-in: {habitTitle}</Text>
      
      {!photo ? (
        <View style={styles.cameraContainer}>
          <Camera
            style={styles.camera}
            type={Camera.Constants.Type.back}
            ref={ref => setCameraRef(ref)}
          >
            <View style={styles.cameraControls}>
              <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
                <Text style={styles.captureButtonText}>Take Photo</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      ) : (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo.uri }} style={styles.preview} />
          <View style={styles.previewControls}>
            <TouchableOpacity style={styles.retakeButton} onPress={() => setPhoto(null)}>
              <Text style={styles.buttonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.submitButton} 
              onPress={submitProof}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonText}>
                {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>
          {location ? `📍 ${locationName || 'Getting location name...'}` : 'Getting your location...'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
    textAlign: 'center',
  },
  cameraContainer: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 12,
    margin: 16,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    padding: 20,
  },
  captureButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  captureButtonText: {
    color: 'white',
    fontSize: 16,
  },
  previewContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  preview: {
    flex: 1,
  },
  previewControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  retakeButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    margin: 4,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    flex: 2,
    margin: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  locationContainer: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  locationText: {
    fontSize: 16,
  },
});

export default CheckInScreen;
