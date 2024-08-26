import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SuperAdminScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Super Admin Dashboard</Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="Manage Students" 
          onPress={() => navigation.navigate('StudentApprovalScreen')} 
          color="#6200EE" 
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="Manage College Admins" 
          onPress={() => navigation.navigate('CollegeAdminApprovalScreen')} 
          color="#6200EE" 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
});
