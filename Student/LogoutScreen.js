
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LogoutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Logging Out...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f7',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 5,
    color: '#333',
  },
});
