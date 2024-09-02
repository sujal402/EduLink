import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native';
import { Card, Title, Text, Button, Divider } from 'react-native-paper';
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
      // Fetch the specific college admin data
      const admin = collegeAdmins.find((admin) => admin._id === adminId);

      // Move the data to ApprovedCollegeAdmins collection
      await axios.post(`${config.baseURL}/approveCollegeAdmin`, admin);

      // Remove from collegeAdmins collection
      await axios.post(`${config.baseURL}/disapproveCollegeAdmin`, { id: adminId });

      Alert.alert('Success', 'College Admin approved');

      // Update local state
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
        <ActivityIndicator size="large" color="#6200ea" />
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
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.adminName}>{item.name}</Title>
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
              <Divider style={styles.divider} />
              <View style={styles.buttonContainer}>
                <Button
                  mode="contained"
                  onPress={() => approveCollegeAdmin(item._id)}
                  style={styles.approveButton}
                  labelStyle={styles.buttonText}
                >
                  Approve
                </Button>
                <Button
                  mode="contained"
                  onPress={() => disapproveCollegeAdmin(item._id)}
                  style={styles.disapproveButton}
                  labelStyle={styles.buttonText}
                >
                  Disapprove
                </Button>
              </View>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAFAFA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ea',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    marginBottom: 15,
    borderRadius: 10,
    elevation: 5,
  },
  adminName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
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
    marginVertical: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  approveButton: {
    backgroundColor: '#28a745',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  disapproveButton: {
    backgroundColor: '#dc3545',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
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
  divider: {
    marginVertical: 10,
  },
});
