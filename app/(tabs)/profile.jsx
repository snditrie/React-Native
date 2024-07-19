import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Ionicons name="mail-outline" size={24} color="#6b4f4f" />
          <Text style={styles.detailText}>john.doe@example.com</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="call-outline" size={24} color="#6b4f4f" />
          <Text style={styles.detailText}>+1 234 567 890</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="briefcase-outline" size={24} color="#6b4f4f" />
          <Text style={styles.detailText}>Manager</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6b4f4f',
  },
  email: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
  },
  details: {
    marginTop: 30,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#6b4f4f',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 50,
  },
  logoutButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
