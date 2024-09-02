import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export default function EnterDetailsScreen() {
  const [photo, setPhoto] = useState(null);
  const [markSheet, setMarkSheet] = useState(null);
  const [is12thCompleted, setIs12thCompleted] = useState(false);
  const [marks10, setMarks10] = useState({ math: '', english: '', science: '' });
  const [marks12, setMarks12] = useState({ biology: '', math: '', physics: '', chemistry: '' });
  const [parents, setParents] = useState({
    fatherName: '',
    motherName: '',
    fatherOccupation: '',
    motherOccupation: '',
    fatherSalary: '',
    motherSalary: '',
  });
  const [location, setLocation] = useState('');
  const [pinCode, setPinCode] = useState('');

  const pickImage = async (setImage) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let { latitude, longitude } = location.coords;
    let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });

    if (geocode.length > 0) {
      let address = geocode[0];
      setLocation(`${address.city}, ${address.region}, ${address.country}`);
      setPinCode(address.postalCode || '');
    }
  };

  return (
    <ScrollView style={styles.formContainer}>
      <Text style={styles.label}>Location:</Text>
      <Button mode="contained" style={styles.button} onPress={getLocation}>
        Auto-fill Location
      </Button>
      <Text style={styles.input}>{location || 'Location not detected'}</Text>

      <Text style={styles.label}>Pin Code:</Text>
      <Text style={styles.input}>{pinCode || 'Pin Code not detected'}</Text>

      <Text style={styles.sectionTitle}>10th Grade Marks:</Text>
      {['math', 'english', 'science'].map((subject) => (
        <TextInput
          key={subject}
          style={styles.input}
          placeholder={subject.charAt(0).toUpperCase() + subject.slice(1)}
          value={marks10[subject]}
          onChangeText={(text) => setMarks10({ ...marks10, [subject]: text })}
        />
      ))}

      <Text style={styles.label}>Did you complete 12th Grade?</Text>
      <TouchableOpacity style={styles.toggleButton} onPress={() => setIs12thCompleted(!is12thCompleted)}>
        <Text style={styles.toggleButtonText}>{is12thCompleted ? 'Yes' : 'No'}</Text>
      </TouchableOpacity>

      {is12thCompleted && (
        <>
          <Text style={styles.sectionTitle}>12th Grade Marks:</Text>
          {['biology', 'math', 'physics', 'chemistry'].map((subject) => (
            <TextInput
              key={subject}
              style={styles.input}
              placeholder={subject.charAt(0).toUpperCase() + subject.slice(1)}
              value={marks12[subject]}
              onChangeText={(text) => setMarks12({ ...marks12, [subject]: text })}
            />
          ))}
        </>
      )}

      <Text style={styles.sectionTitle}>Parents' Details:</Text>
      {['fatherName', 'motherName', 'fatherOccupation', 'motherOccupation', 'fatherSalary', 'motherSalary'].map((field) => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          value={parents[field]}
          onChangeText={(text) => setParents({ ...parents, [field]: text })}
        />
      ))}

      <Text style={styles.label}>Upload Photo:</Text>
      <Button mode="contained" style={styles.button} onPress={() => pickImage(setPhoto)}>
        Upload Photo
      </Button>
      {photo && <Image source={{ uri: photo }} style={styles.uploadedImage} />}

      <Text style={styles.label}>Upload Mark Sheet:</Text>
      <Button mode="contained" style={styles.button} onPress={() => pickImage(setMarkSheet)}>
        Upload Mark Sheet
      </Button>
      {markSheet && <Image source={{ uri: markSheet }} style={styles.uploadedImage} />}

      <View style={{ height: 9 }} />

      <Button mode="contained" style={styles.submitButton} onPress={() => console.log('Details Submitted')}>
        Submit
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
    color: '#333',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#B3E5FC',
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 15,
    color: '#333',
  },
  uploadedImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  button: {
    marginVertical: 10,
    backgroundColor: '#B3E5FC',
  },
  submitButton: {
    marginVertical: 20,
    backgroundColor: '#4CAF50',
  },
  toggleButton: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#B3E5FC',
    alignItems: 'center',
    marginVertical: 10,
  },
  toggleButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
