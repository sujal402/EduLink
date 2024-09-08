import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, TextInput, Platform } from 'react-native';
import axios from 'axios';
import { Divider, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker'; // Same for web, iOS, Android
import config from '../../Config';

const ApprovedCollegeAdmins = () => {
  const [approvedColleges, setApprovedColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchApprovedColleges = async () => {
      try {
        const response = await axios.get(`${config.baseURL}/approvedCollegeAdmins`);
        setApprovedColleges(response.data);
        setFilteredColleges(response.data);
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

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterColleges(query, selectedLocation, selectedBranch);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    filterColleges(searchQuery, location, selectedBranch);
  };

  const handleBranchChange = (branch) => {
    setSelectedBranch(branch);
    filterColleges(searchQuery, selectedLocation, branch);
  };

  const filterColleges = (query, location, branch) => {
    const filteredData = approvedColleges.filter((college) => {
      const collegeNameMatch = college.email.toLowerCase().includes(query.toLowerCase());
      const universityMatch = college.universityAffiliation.toLowerCase().includes(query.toLowerCase());
      const locationMatch = location ? college.location.toLowerCase().includes(location.toLowerCase()) : true;
      const branchMatch = branch ? college.branches.includes(branch) : true;

      return (collegeNameMatch || universityMatch) && locationMatch && branchMatch;
    });

    setFilteredColleges(filteredData);
  };

  const renderCollegeAdmin = ({ item }) => (
    <TouchableOpacity onPress={() => handleCollegeClick(item)} style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{item.email}</Text>
          <IconButton icon="chevron-right" size={24} onPress={() => handleCollegeClick(item)} />
        </View>
        <Text style={styles.details}>Location: <Text style={styles.info}>{item.location}</Text></Text>
        <Text style={styles.details}>University: <Text style={styles.info}>{item.universityAffiliation}</Text></Text>
        <Divider style={styles.divider} />
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />;
  }

  const locations = [...new Set(approvedColleges.map(college => college.location))];
  const branches = [...new Set(approvedColleges.flatMap(college => college.branches))];

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by college name or university..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <View style={styles.pickerWrapper}>
        <Text style={styles.pickerLabel}>Filter by Location:</Text>
        <Picker
          selectedValue={selectedLocation}
          onValueChange={(value) => handleLocationChange(value)}
          style={Platform.OS === 'web' ? styles.pickerWeb : styles.picker}
        >
          <Picker.Item label="All Locations" value="" />
          {locations.map((location, index) => (
            <Picker.Item key={index} label={location} value={location} />
          ))}
        </Picker>
      </View>

      <View style={styles.pickerWrapper}>
        <Text style={styles.pickerLabel}>Filter by Branch:</Text>
        <Picker
          selectedValue={selectedBranch}
          onValueChange={(value) => handleBranchChange(value)}
          style={Platform.OS === 'web' ? styles.pickerWeb : styles.picker}
        >
          <Picker.Item label="All Branches" value="" />
          {branches.map((branch, index) => (
            <Picker.Item key={index} label={branch} value={branch} />
          ))}
        </Picker>
      </View>

      <FlatList
        data={filteredColleges}
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
    ...Platform.select({
      web: {
        maxWidth: 800,
        margin: 'auto',
      },
    }),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 16,
    color: '#777',
    marginTop: 4,
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
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 2,
  },
  pickerWrapper: {
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    elevation: 2,
  },
  pickerWeb: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
});

export default ApprovedCollegeAdmins;
