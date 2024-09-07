import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const CollegeDetails = ({ route }) => {
  const { college } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{college.email}</Text>
        <Text style={styles.details}>Location: <Text style={styles.info}>{college.location}</Text></Text>
        <Text style={styles.details}>Pincode: <Text style={styles.info}>{college.pincode}</Text></Text>
        <Text style={styles.details}>University: <Text style={styles.info}>{college.universityAffiliation}</Text></Text>
        <Text style={styles.details}>Website: <Text style={styles.info}>{college.website}</Text></Text>
        <Text style={styles.details}>No. of Branches: <Text style={styles.info}>{college.noOfBranches}</Text></Text>
        <Text style={styles.details}>Branches: <Text style={styles.info}>{college.branches.join(', ')}</Text></Text>

        {/* Display NAAC certificate */}
        <Text style={styles.certTitle}>NAAC Certificate:</Text>
        {college.naacCertPhoto ? (
          <Image 
            source={{ uri: college.naacCertPhoto }} 
            style={styles.image} 
            resizeMode="contain" 
          />
        ) : (
          <Text style={styles.noImageText}>No NAAC Certificate available</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f4f6f9',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 20,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  details: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  info: {
    fontWeight: 'bold',
    color: '#000',
  },
  certTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 250,
    marginTop: 10,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  noImageText: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
  },
});

export default CollegeDetails;
