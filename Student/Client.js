// import React, { useEffect, useRef } from 'react';
// import { View, StyleSheet, Animated } from 'react-native';
// import { Text, Card, Button } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const ClientScreen = () => {
//   const scrollAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(scrollAnim, {
//           toValue: 10,
//           duration: 500,
//           useNativeDriver: true,
//         }),
//         Animated.timing(scrollAnim, {
//           toValue: 0,
//           duration: 500,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();
//   }, [scrollAnim]);

//   return (
//     <View style={styles.container}>
//       <Card style={styles.card}>
//         <Card.Title title="Welcome, Client!" />
//         <Card.Content>
//           <Text style={styles.text}>This is the client screen.</Text>
//         </Card.Content>
//         <Card.Actions>
//           <Button mode="contained" onPress={() => console.log('Pressed')}>
//             Get Started
//           </Button>
//         </Card.Actions>
//       </Card>
//       <Animated.View style={[styles.arrowContainer, { transform: [{ translateY: scrollAnim }] }]}>
//         <Icon name="keyboard-arrow-down" size={30} color="#000" />
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   card: {
//     width: '90%',
//     padding: 16,
//     borderRadius: 8,
//     elevation: 4,
//     backgroundColor: '#fff',
//   },
//   text: {
//     fontSize: 18,
//     textAlign: 'center',
//   },
//   arrowContainer: {
//     position: 'absolute',
//     bottom: 20, // Position the arrow at the bottom of the screen
//   },
// });

// export default ClientScreen;

/* new */

import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

// Importing the screens from the student directory
import DashboardScreen from './DashboardScreen';
import FillQuestionsScreen from './FillQuestionsScreen';
import EnterDetailsScreen from './EnterDetailsScreen';
import ChatBotScreen from './ChatBotScreen';
import LogoutScreen from './LogoutScreen';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Student Dashboard">
      <Drawer.Screen name="Student Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Fill Questions" component={FillQuestionsScreen} />
      <Drawer.Screen name="Personal Details" component={EnterDetailsScreen} />
      <Drawer.Screen name="ChatBot" component={ChatBotScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
}

export default function Client() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </PaperProvider>
  );
}
