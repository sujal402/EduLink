import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import config from '../../Config'; // Your backend base URL

export default function CollegeAdminApprovalScreen() {
  const [collegeAdmins, setCollegeAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollegeAdmins = async () => {
      try {
        const response = await axios.get(`${config.baseURL}/collegeAdmins`);
        setCollegeAdmins(response.data);
      } catch (error) {
        console.error('Failed to load college admins', error);
        Alert.alert('Error', 'Failed to load college admins');
      } finally {
        setLoading(false);
      }
    };
    fetchCollegeAdmins();
  }, []);

  const approveCollegeAdmin = async (adminId) => {
    try {
      await axios.post(`${config.baseURL}/approveCollegeAdmin`, { id: adminId });
      Alert.alert('Success', 'College Admin approved');
      setCollegeAdmins(collegeAdmins.filter(admin => admin._id !== adminId));
    } catch (error) {
      console.error('Error approving college admin', error);
      Alert.alert('Error', 'Failed to approve college admin');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Approve College Admins</Text>
      <FlatList
        data={collegeAdmins}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.adminContainer}>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
            <Button title="Approve" onPress={() => approveCollegeAdmin(item._id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  adminContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
