import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import config from '../../Config';

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
      await axios.post(`${config.baseURL}/selectCollegeAdmin`, { id: adminId });
      Alert.alert('Success', 'College Admin approved');
      setCollegeAdmins(collegeAdmins.filter((admin) => admin._id !== adminId));
    } catch (error) {
      console.error('Error approving college admin', error);
      Alert.alert('Error', 'Failed to approve college admin');
    }
  };

  const disapproveCollegeAdmin = async (adminId) => {
    try {
      await axios.post(`${config.baseURL}/disapproveCollegeAdmin`, { id: adminId });
      Alert.alert('Success', 'College Admin disapproved');
      setCollegeAdmins(collegeAdmins.filter((admin) => admin._id !== adminId));
    } catch (error) {
      console.error('Error disapproving college admin', error);
      Alert.alert('Error', 'Failed to disapprove college admin');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
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
          <View style={styles.card}>
            <Text style={styles.adminName}>{item.name}</Text>
            <Text style={styles.adminEmail}>{item.email}</Text>
            <Text style={styles.adminDetail}>Location: {item.location}</Text>
            <Text style={styles.adminDetail}>Pincode: {item.pincode}</Text>
            <Text style={styles.adminDetail}>University Affiliation: {item.universityAffiliation}</Text>
            <Text style={styles.adminDetail}>Website: {item.website}</Text>
            <Text style={styles.adminDetail}>Number of Branches: {item.noOfBranches}</Text>
            <Text style={styles.adminDetail}>Branches:</Text>
            <FlatList
              data={item.branches}
              keyExtractor={(branch, index) => index.toString()}
              renderItem={({ item: branch }) => (
                <Text style={styles.branchItem}>- {branch}</Text>
              )}
            />
            <Image
              source={{ uri: item.naacCertPhoto }}
              style={styles.certImage}
              resizeMode="contain"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.approveButton}
                onPress={() => approveCollegeAdmin(item._id)}
              >
                <Text style={styles.buttonText}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.disapproveButton}
                onPress={() => disapproveCollegeAdmin(item._id)}
              >
                <Text style={styles.buttonText}>Disapprove</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: '#f0f2f5',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  adminName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  adminEmail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  adminDetail: {
    fontSize: 16,
    color: '#777',
    marginBottom: 5,
  },
  branchItem: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
  },
  certImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  approveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  disapproveButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
