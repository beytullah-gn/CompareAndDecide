import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const UserInfo = ({ user, onLoginPress, onLogoutPress, selectedTheme, selectedLanguage }) => {
  return (
    <View style={styles.container}>
      {user && user.uid ? (
        <>
          <Text style={[styles.label, { color: selectedTheme.WhiteColor }]}>UID: {user.userId}</Text>
          <Text style={[styles.label, { color: selectedTheme.WhiteColor }]}>{selectedLanguage.Email}: {user.email}</Text>
          
        
          <TouchableOpacity
            style={[styles.button, { backgroundColor: selectedTheme.DarkColor }]}
            onPress={onLogoutPress}
          >
            <Text style={[styles.buttonText, { color: selectedTheme.WhiteColor }]}>{selectedLanguage.Logout}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={[styles.label, { color: selectedTheme.WhiteColor }]}>{selectedLanguage.NotLoggedIn}</Text>

          
          <TouchableOpacity
            style={[styles.button, { backgroundColor: selectedTheme.DarkColor }]}
            onPress={onLoginPress}
          >
            <Text style={[styles.buttonText, { color: selectedTheme.WhiteColor }]}>{selectedLanguage.Login}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    width: '100%', 
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserInfo;
