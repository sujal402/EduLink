import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Card, IconButton } from 'react-native-paper';

export default function DashboardScreen() {
  const userClass = '12th Grade';
  const currentLocation = 'Anand, Gujarat, 388120';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.userCard}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.profileContainer}>
            <Image
              source={{ uri: 'https://example.com/student-photo.jpg' }}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.name}>Jay Bartwal</Text>
          <Text style={styles.userClass}>{userClass}</Text>
          <Text style={styles.location}>{currentLocation}</Text>
        </Card.Content>
      </Card>

      <View style={styles.gridContainer}>
        <Card style={styles.optionCard}>
          <Card.Content style={styles.optionContent}>
            <IconButton icon="school" size={30} color="#3F51B5" />
            <Text style={styles.optionText}>Search College</Text>
          </Card.Content>
        </Card>
        <Card style={styles.optionCard}>
          <Card.Content style={styles.optionContent}>
            <IconButton icon="compass" size={30} color="#3F51B5" />
            <Text style={styles.optionText}>Find Future Path</Text>
          </Card.Content>
        </Card>
        <Card style={styles.optionCard}>
          <Card.Content style={styles.optionContent}>
            <IconButton icon="map-marker" size={30} color="#3F51B5" />
            <Text style={styles.optionText}>Get Best College in Your Area</Text>
          </Card.Content>
        </Card>
        <Card style={styles.optionCard}>
          <Card.Content style={styles.optionContent}>
            <IconButton icon="bullhorn" size={30} color="#3F51B5" />
            <Text style={styles.optionText}>Advertise Section</Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  userCard: {
    marginBottom: 20,
    borderRadius: 12,
    elevation: 4,
    backgroundColor: '#ffffff',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 5,
    color: '#333',
  },
  userClass: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
  location: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionCard: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  optionContent: {
    alignItems: 'center',
    padding: 15,
  },
  optionText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});
