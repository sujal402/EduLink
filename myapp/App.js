// import 'react-native-gesture-handler';
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// import LoginScreen from './Components/ClientCompo/LoginScreen.js';
// import CollegeAdmin from './Components/ClientCompo/CollegeAdmin.js';
// import ClientScreen from './Components/Student/Client.js';
// import SignUp from './Components/ClientCompo/SignUp.js';
// import ForgotPasswordScreen from './Components/ClientCompo/ForgotPassword.js';
// import Home from './Components/Home.js';
// import DashboardScreen from './Components/Student/DashboardScreen.js';
// import EnterDetailsScreen from './Components/Student/EnterDetailsScreen.js';
// import FillQuestionsScreen from './Components/Student/FillQuestionsScreen.js';
// import ChatBotScreen from './Components/Student/ChatBotScreen.js';
// import LogoutScreen from './Components/Student/LogoutScreen.js';

// const Stack = createStackNavigator();
// const Drawer = DrawerNavigator();

// function DrawerNavigator() {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="Enter Details" component={EnterDetailsScreen} />
//       <Drawer.Screen name="Fill Questions" component={FillQuestionsScreen} />
//       <Drawer.Screen name="ChatBot" component={ChatBotScreen} />
//       <Drawer.Screen name="Logout" component={LogoutScreen} />
//     </Drawer.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="CollegeSodho" component={DrawerNavigator} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="SignUp" component={SignUp} />
//         <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
//         <Stack.Screen name="CollegeAdmin" component={CollegeAdmin} />
//         <Stack.Screen name="ClientScreen" component={ClientScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// AppRegistry.registerComponent('main', () => App);

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AppRegistry } from 'react-native';

import LoginScreen from './Components/ClientCompo/LoginScreen.js';
import CollegeAdminForm from './Components/ClientCompo/CollegeAdminForm.js';
import CollegeAdminScreen from './Components/ClientCompo/CollegeAdminScreen.js'; 
import ClientScreen from './Components/Student/Client.js';
import SignUp from './Components/ClientCompo/SignUp.js';
import ForgotPasswordScreen from './Components/ClientCompo/ForgotPassword.js';
import Home from './Components/Home.js';
import DashboardScreen from './Components/Student/DashboardScreen.js';
import EnterDetailsScreen from './Components/Student/EnterDetailsScreen.js';
import FillQuestionsScreen from './Components/Student/FillQuestionsScreen.js';
import ChatBotScreen from './Components/Student/ChatBotScreen.js';
import LogoutScreen from './Components/Student/LogoutScreen.js';
import SuperAdmin from './Components/Super/home.js';
import StudentApprovalScreen from './Components/Super/StudentApproveScreen.js';
import CollegeAdminApprovalScreen from './Components/Super/AdminApproveScreen.js';
import Collegeadmin from './Components/ClientCompo/CollegeAdmin.js';
import StudentDetails from './Components/ClientCompo/StudentDetails.js';
import AdvertiseCollege from './Components/ClientCompo/AdvertiseCollege.js';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Enter Details" component={EnterDetailsScreen} />
      <Drawer.Screen name="Fill Questions" component={FillQuestionsScreen} />
      <Drawer.Screen name="ChatBot" component={ChatBotScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Collegeadmin">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Collegeadmin" component={Collegeadmin} />
        <Stack.Screen name="CollegeAdminForm" component={CollegeAdminForm} />
        <Stack.Screen name="CollegeAdminScreen" component={CollegeAdminScreen} />
        <Stack.Screen name="StudentDetail" component={StudentDetails} />
        <Stack.Screen name="AdvertiseCollege" component={AdvertiseCollege} />
        <Stack.Screen name="SuperAdmin" component={SuperAdmin} />
        <Stack.Screen name="StudentApprovalScreen" component={StudentApprovalScreen} />
        <Stack.Screen name="CollegeAdminApprovalScreen" component={CollegeAdminApprovalScreen} />
        <Stack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
AppRegistry.registerComponent('main', () => App);

// ------------
// import 'react-native-gesture-handler';
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// import LoginScreen from './Components/ClientCompo/LoginScreen.js';
// import CollegeAdmin from './Components/ClientCompo/CollegeAdmin.js';
// import ClientScreen from './Components/Student/Client.js';
// import SignUp from './Components/ClientCompo/SignUp.js';
// import ForgotPasswordScreen from './Components/ClientCompo/ForgotPassword.js';
// import Home from './Components/Home.js';nino

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="CollegeSodho" component={Home} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="SignUp" component={SignUp} />
//         <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
//         <Stack.Screen name="CollegeAdmin" component={CollegeAdmin} />
//         <Stack.Screen name="ClientScreen" component={ClientScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
