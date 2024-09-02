import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Text, Card, Button, Divider, Avatar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

const CollegeAdmin = ({ navigation }) => {
  const [collegeData, setCollegeData] = useState({
    email: 'default@college.com',
    naacCertPhoto: null,
  });

  useEffect(() => {
    const fetchCollegeData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('@collegeAdminData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setCollegeData({
            email: parsedData.email || 'default@college.com',
            naacCertPhoto: parsedData.naacCertPhoto || null,
          });
        }
      } catch (error) {
        console.error('Failed to fetch college data from AsyncStorage', error);
      }
    };

    fetchCollegeData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.profileContainer}>
        {collegeData.naacCertPhoto ? (
          <Avatar.Image size={100} source={{ uri: collegeData.naacCertPhoto }} style={styles.avatar} />
        ) : (
          <Avatar.Icon size={100} icon="school" style={styles.avatar} />
        )}
        <Text style={styles.emailText}>{collegeData.email}</Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <MaterialIcons name="edit" size={40} color="#6200ea" style={styles.icon} />
          <Text style={styles.cardText}>Fill College Details</Text>
          <Text style={styles.description}>
            Provide essential information about your college, including affiliation and branches.
          </Text>
          <Divider style={styles.divider} />
          <Button
            mode="contained"
            onPress={() => navigation.navigate('CollegeAdminForm')}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Fill College Details
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <MaterialIcons name="campaign" size={40} color="#6200ea" style={styles.icon} />
          <Text style={styles.cardText}>Advertise Your College</Text>
          <Text style={styles.description}>
            Promote your college to attract prospective students and increase visibility.
          </Text>
          <Divider style={styles.divider} />
          <Button
            mode="contained"
            onPress={() => navigation.navigate('AdvertiseCollege')}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Advertise College
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <MaterialIcons name="school" size={40} color="#6200ea" style={styles.icon} />
          <Text style={styles.cardText}>Student Details</Text>
          <Text style={styles.description}>
            View and manage student details associated with your college.
          </Text>
          <Divider style={styles.divider} />
          <Button
            mode="contained"
            onPress={() => navigation.navigate('StudentDetail')}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Go to Student Details
          </Button>
        </Card.Content>
      </Card>

      <View style={styles.footer}>
        <Text style={styles.footerText}>For any queries, contact us at admin@college.com</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    marginBottom: 15,
    backgroundColor: '#6200ea',
  },
  emailText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ea',
  },
  card: {
    width: '90%',
    borderRadius: 15,
    elevation: 5,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200ea',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },
  divider: {
    marginBottom: 20,
    backgroundColor: '#6200ea',
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 8,
    borderRadius: 30,
  },
  buttonContent: {
    paddingVertical: 6,
  },
  footer: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
});

export default CollegeAdmin;
