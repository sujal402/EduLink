import { View, StyleSheet, ImageBackground, ScrollView, Image } from 'react-native';
import { Button, Text, Title, Card, Appbar } from 'react-native-paper';

const Home = ({ navigation }) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="College Recommendation Home" />
        <Appbar.Action icon="account" onPress={() => navigation.navigate('Login')} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <ImageBackground source={require('.././assets/i1.jpg')} style={styles.imageBackground} resizeMode="contain">
          </ImageBackground>
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>College Recommendation Home</Title>
              <Text style={styles.description}>
                Welcome to the College Recommendation System. Here you can find the best colleges suited for you.
              </Text>
              <Title style={styles.title}>Our Recommendation System Aim</Title>
              <Text style={styles.description}>
                Our aim is to provide personalized college recommendations based on your preferences and academic profile.
                We strive to help you find the best fit for your higher education journey. Our system analyzes various factors 
                such as academic performance, extracurricular activities, and personal preferences to suggest the most suitable 
                colleges for you. We are committed to helping you achieve your educational goals by providing accurate and 
                reliable recommendations.
              </Text>
              <Title style={styles.title}>World's Top 3 Colleges</Title>
              <View style={styles.collegeContainer}>
                <Image source={require('.././assets/mit_logo.jpg')} style={styles.collegeImage} />
                <Text style={styles.collegeInfo}>
                  Massachusetts Institute of Technology (MIT) - Known for its cutting-edge research and innovation.
                  MIT offers a dynamic environment for students to excel in science and technology.
                </Text>
              </View>
              <View style={styles.collegeContainer}>
                <Image source={require('.././assets/stanford_logo.jpg')} style={styles.collegeImage} />
                <Text style={styles.collegeInfo}>
                  Stanford University - Renowned for its entrepreneurial spirit and strong engineering programs.
                  Stanford fosters a culture of innovation and leadership among its students.
                </Text>
              </View>
              <View style={styles.collegeContainer}>
                <Image source={require('.././assets/harward_logo.jpg')} style={styles.collegeImage} />
                <Text style={styles.collegeInfo}>
                  Harvard University - Offers a wide range of programs and has a strong emphasis on liberal arts.
                  Harvard is dedicated to excellence in teaching, learning, and research.
                </Text>
              </View>
              <Title style={styles.title}>How It Works</Title>
              <Text style={styles.description}>
                Our recommendation system uses advanced algorithms to analyze your academic profile and preferences. 
                Simply provide your details, and our system will suggest the best colleges for you.
              </Text>
              <Title style={styles.title}>Why Choose Us</Title>
              <Text style={styles.description}>
                We offer a comprehensive and personalized approach to college recommendations. Our system is designed to 
                help you find the best fit for your higher education journey, ensuring you make informed decisions.
              </Text>
              <Title style={styles.title}>Testimonials</Title>
              <Text style={styles.testimonial}>
                "This recommendation system helped me find the perfect college for my needs. Highly recommended!" - Student A
              </Text>
              <Text style={styles.testimonial}>
                "A fantastic tool for students looking to find the best colleges. The recommendations were spot on!" - Student B
              </Text>
            </Card.Content>
          </Card>
          <View style={styles.footer}>
            <Text style={styles.footerText}>© 2023 College Recommendation System. All rights reserved.</Text>
            <Text style={styles.footerText}>Contact us: info@collegerecommendation.com</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imageBackground: {
    width: '100%',
    height: 800, // Increased height for full screen coverage
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 0, // Remove upper and lower space
  },
  card: {
    flex: 1,
    marginTop: -50,
    padding: 16,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: '#fff',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 18,
  },
  collegeContainer: {
    marginBottom: 16,
  },
  collegeImage: {
    width: '100%',
    height: 200, // Full vertical size
    marginBottom: 8,
  },
  collegeInfo: {
    fontSize: 16,
    textAlign: 'center',
  },
  testimonial: {
    marginBottom: 8,
    fontSize: 16,
    fontStyle: 'italic',
  },
  footer: {
    marginTop: 20,
    padding: 32, // Increased padding for a larger footer
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16, // Increased font size for better visibility
    color: '#888',
    marginBottom: 8, // Added margin between footer texts
  },
});

export default Home;

