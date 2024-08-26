import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import config from '../../Config'; // Your backend base URL

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
      await axios.post(`${config.baseURL}/approveStudent`, { id: studentId });
      Alert.alert('Success', 'Student approved');
      setStudents(students.filter(student => student._id !== studentId));
    } catch (error) {
      console.error('Error approving student', error);
      Alert.alert('Error', 'Failed to approve student');
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
      <Text style={styles.title}>Approve Students</Text>
      <FlatList
        data={students}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.studentContainer}>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
            <Button title="Approve" onPress={() => approveStudent(item._id)} />
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
  studentContainer: {
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
