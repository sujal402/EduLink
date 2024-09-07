import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import config from '../../Config';

const ApprovedCollegeAdmins = () => {
  const [approvedColleges, setApprovedColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchApprovedColleges = async () => {
      try {
        const response = await axios.get(`${config.baseURL}/approvedCollegeAdmins`);
        setApprovedColleges(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching approved colleges:', error);
        setLoading(false);
      }
    };

    fetchApprovedColleges();
  }, []);

  const handleCollegeClick = (college) => {
    navigation.navigate('CollegeDetails', { college });
  };

  const renderCollegeAdmin = ({ item }) => (
    <TouchableOpacity onPress={() => handleCollegeClick(item)} style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.email}</Text>
        <Text style={styles.details}>Location: <Text style={styles.info}>{item.location}</Text></Text>
        <Text style={styles.details}>University: <Text style={styles.info}>{item.universityAffiliation}</Text></Text>
        <Divider style={styles.divider} />
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={approvedColleges}
        renderItem={renderCollegeAdmin}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f6f9',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardContent: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  details: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  info: {
    fontWeight: '600',
    color: '#000',
  },
  divider: {
    marginVertical: 12,
    backgroundColor: '#ddd',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ApprovedCollegeAdmins;
