import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native';
import { Card, Title, Text, Button, Divider } from 'react-native-paper';
import axios from 'axios';
import config from '../../Config';

export default function StudentApprovalScreen() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${config.baseURL}/students`);
        setStudents(response.data);
      } catch (error) {
        console.error('Failed to load students', error);
        Alert.alert('Error', 'Failed to load students');
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const approveStudent = async (studentId) => {
    try {
      // Fetch the specific student data
      const student = students.find((student) => student._id === studentId);

      // Move the data to ApprovedStudents collection
      await axios.post(`${config.baseURL}/approveStudent`, student);

      // Remove from students collection
      await axios.post(`${config.baseURL}/disapproveStudent`, { id: studentId });

      Alert.alert('Success', 'Student approved');

      // Update local state
      setStudents(students.filter((student) => student._id !== studentId));
    } catch (error) {
      console.error('Error approving student', error);
      Alert.alert('Error', 'Failed to approve student');
    }
  };

  const disapproveStudent = async (studentId) => {
    try {
      await axios.post(`${config.baseURL}/disapproveStudent`, { id: studentId });
      Alert.alert('Success', 'Student disapproved');
      setStudents(students.filter((student) => student._id !== studentId));
    } catch (error) {
      console.error('Error disapproving student', error);
      Alert.alert('Error', 'Failed to disapprove student');
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
      <Text style={styles.title}>Approve Students</Text>
      <FlatList
        data={students}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.studentName}>{item.name}</Title>
              <Text style={styles.studentEmail}>{item.email}</Text>
              <Text style={styles.studentDetail}>Location: {item.location}</Text>
              <Text style={styles.studentDetail}>Pincode: {item.pincode}</Text>
              <Text style={styles.studentDetail}>University Affiliation: {item.universityAffiliation}</Text>
              <Text style={styles.studentDetail}>Website: {item.website}</Text>
              <Text style={styles.studentDetail}>Number of Branches: {item.noOfBranches}</Text>
              <Text style={styles.studentDetail}>Branches:</Text>
              <FlatList
                data={item.branches}
                keyExtractor={(branch, index) => index.toString()}
                renderItem={({ item: branch }) => (
                  <Text style={styles.branchItem}>- {branch}</Text>
                )}
              />
              <Divider style={styles.divider} />
              <View style={styles.buttonContainer}>
                <Button
                  mode="contained"
                  onPress={() => approveStudent(item._id)}
                  style={styles.approveButton}
                  labelStyle={styles.buttonText}
                >
                  Approve
                </Button>
                <Button
                  mode="contained"
                  onPress={() => disapproveStudent(item._id)}
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
  studentName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  studentEmail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  studentDetail: {
    fontSize: 16,
    color: '#777',
    marginBottom: 5,
  },
  branchItem: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
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
