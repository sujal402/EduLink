import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import axios from 'axios';
import DashboardScreen from '../Student/DashboardScreen';
import config from '../../Config';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); 

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleLogin = () => {
    
    if(email === '' || password === '') {
      alert('Please fill all the fields');
      return;
    }

    console.log(email,password,role);
    
    const userdata = {
      email:email,
      password,
    }
  
    axios
    .post(`${config.baseURL}/login`,userdata)
    .then(res => {
      console.log(res.data);
      if(res.data.status === 'ok'){

        alert('Login Successful');

        if (role == 'student') { 
          navigation.replace('Main');
        } else if (role == 'college') {
          navigation.navigate('CollegeAdminForm');
        } 
      }
    }
);
  
  };

  const handleSignUp = () => {
    setModalMessage('Redirecting to SignUp .....');
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      navigation.navigate('SignUp');
    }, 1000);
  };

  const handleForgotPassword = () => {
    setModalMessage('Redirecting to Forgot Password. .....');
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      navigation.navigate('ForgotPassword');
    }, 1000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={'always'}>
     
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Picker
        selectedValue={role}
        style={styles.picker}
        onValueChange={(itemValue) => setRole(itemValue)}
      >
        <Picker.Item label="Student" value="student" />
        <Picker.Item label="College" value="college" />
      </Picker>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.link}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text>{modalMessage}</Text>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    width: '100%',
  },
  link: {
    color: '#1e90ff',
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export default LoginScreen;
// import React, { useState } from 'react';
// import { View, StyleSheet, Image } from 'react-native';
// import { TextInput, Button, Card, Text, Title } from 'react-native-paper';
// import axios from 'axios';

// const LoginScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState(''); // Assuming role is part of the login form
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleLogin = () => {
//     setLoading(true);
//     setError('');

//     const userdata = {
//       email: email,
//       password: password,
//     };

//     axios
//       .post('http://192.168.1.3:5001/login', userdata)
//       .then(res => {
//         setLoading(false);
//         console.log(res.data);
//         if (res.data.status === 'ok') {
//           // Handle successful login
//         } else {
//           setError('Login failed. Please check your credentials.');
//         }
//       })
//       .catch(err => {
//         setLoading(false);
//         setError('An error occurred. Please try again.');
//         console.error(err);
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={require('../.././assets/icon.png')} style={styles.logo} />
//       <Card style={styles.card}>
//         <Card.Content>
//           <Title style={styles.title}>Login</Title>
//           <TextInput
//             label="Email"
//             value={email}
//             onChangeText={setEmail}
//             style={styles.input}
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />
//           <TextInput
//             label="Password"
//             value={password}
//             onChangeText={setPassword}
//             style={styles.input}
//             secureTextEntry
//           />
//           <TextInput
//             label="Role"
//             value={role}
//             onChangeText={setRole}
//             style={styles.input}
//           />
//           {error ? <Text style={styles.errorText}>{error}</Text> : null}
//         </Card.Content>
//         <Card.Actions>
//           <Button mode="contained" onPress={handleLogin} loading={loading} disabled={loading} style={styles.button}>
//             Login
//           </Button>
//         </Card.Actions>
//       </Card>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     marginBottom: 32,
//   },
//   card: {
//     width: '100%',
//     maxWidth: 400,
//     padding: 16,
//     borderRadius: 8,
//     elevation: 4,
//   },
//   title: {
//     textAlign: 'center',
//     marginBottom: 24,
//   },
//   input: {
//     marginBottom: 16,
//   },
//   button: {
//     width: '100%',
//     paddingVertical: 8,
//   },
//   errorText: {
//     color: 'red',
//     marginBottom: 16,
//     textAlign: 'center',
//   },
// });

// export default LoginScreen;

