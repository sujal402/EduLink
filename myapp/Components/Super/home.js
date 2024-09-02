import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Make sure you have @expo/vector-icons installed

export default function SuperAdminScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="school" size={40} color="#6200EE" />
          </View>
          <Title style={styles.title}>Manage College Admins</Title>
          <Paragraph style={styles.description}>
            As a Super Admin, you have the ability to manage all college administrators. This includes:
          </Paragraph>
          <Paragraph style={styles.listItem}>
            • Reviewing and approving or rejecting new college admin registrations.
          </Paragraph>
          <Paragraph style={styles.listItem}>
            • Editing or updating existing college admin profiles to ensure accuracy.
          </Paragraph>
          <Paragraph style={styles.listItem}>
            • Monitoring college admin activity and performance within the system.
          </Paragraph>
          <Button 
            mode="contained"
            onPress={() => navigation.navigate('CollegeAdminApprovalScreen')} 
            style={styles.button}
          >
            Go to College Admins
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
  },
  card: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 4,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  listItem: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
    textAlign: 'center',
  },
  button: {
    marginVertical: 10,
    backgroundColor: '#6200EE',
  },
});
