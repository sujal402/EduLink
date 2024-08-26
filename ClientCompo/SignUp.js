import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import config from '../../Config';

const SignUpScreen = ({ navigation }) => {
 
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student');

  const validateSignUp = () => {
    if (!name) {
      alert('Validation Error: Name should not be empty');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Validation Error: Email must be valid');
      return false;
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      alert('Validation Error: Password must be at least 6 characters long and contain both letters and digits');
      return false;
    }
    if (password !== confirmPassword) {
      alert('Validation Error: Confirm Password must match Password');
      return false;
    }
    if (!role) {
      alert('Validation Error: Role should be selected');
      return false;
    }
    return true;
  };

  const handleSignUp = () => {

    if (!validateSignUp()) {
      return;
    }

    const data = {
      name,
      email,
      password,
      role,
    }
    
    // Handle sign up logic here
    axios.post(`${config.baseURL}/register`,data)
    .then (res => console.log(res.data))
    .catch(err => console.log(err))
    
    alert('Sign Up Successful');
    navigation.navigate('Login');

  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={'always'}>
     
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Picker
        selectedValue={role}
        style={styles.picker}
        onValueChange={(itemValue) => setRole(itemValue)}
      >
        <Picker.Item label="Student" value="student" />
        <Picker.Item label="College" value="college" />
      </Picker>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;