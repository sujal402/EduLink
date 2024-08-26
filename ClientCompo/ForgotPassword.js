import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import axios from 'axios';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://192.168.107.141:5001/forgot-password', { email });
      const data = await response.json();

      if (response.ok) {
        alert('Password reset link sent to your email');
        navigation.navigate('Login');
      } else {
        alert(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
       
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.description}>
          Enter your email address below and we'll send you a link to reset your password.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={handleForgotPassword} disabled={loading}>
          <Text style={styles.buttonText}>Send Reset Link</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  container: {
    width: '100%',
    alignItems: 'center',
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
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
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

export default ForgotPasswordScreen;