import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { registerUser, loginUser } from '../firebase/authFunctions';
import { useSelector } from 'react-redux';

const AuthScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); 
  const selectedTheme = useSelector(state => state.theme.selectedTheme); 
  const selectedLanguage = useSelector(state => state.language.selectedLanguage); 

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        await loginUser(email, password);
        navigation.navigate('Settings');
      } else {
        await registerUser(email, password);
        navigation.navigate('Settings');
      }
    } catch (error) {
      Alert.alert(selectedLanguage.Error, isLogin ? selectedLanguage.LoginError : selectedLanguage.RegisterError);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: selectedTheme.BackgroundColor }]}>
      <Text style={[styles.header, { color: selectedTheme.MainColor }]}>
        {isLogin ? selectedLanguage.Login : selectedLanguage.Register}
      </Text>
      
      <TextInput
        style={[styles.input, { borderColor: selectedTheme.MainColor }]}
        placeholder={selectedLanguage.Email}
        placeholderTextColor={selectedTheme.PlaceholderColor}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, { borderColor: selectedTheme.MainColor }]}
        placeholder={selectedLanguage.Password}
        placeholderTextColor={selectedTheme.PlaceholderColor}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity
        style={[styles.button, { backgroundColor: selectedTheme.MainColor }]}
        onPress={handleSubmit}
      >
        <Text style={[styles.buttonText, { color: selectedTheme.WhiteColor }]}>
          {isLogin ? selectedLanguage.Login : selectedLanguage.Register}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.switchButton, { borderColor: selectedTheme.MainColor }]}
        onPress={() => setIsLogin(!isLogin)}
      >
        <Text style={[styles.switchButtonText, { color: selectedTheme.MainColor }]}>
          {isLogin ? selectedLanguage.Register : selectedLanguage.Login}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchButton: {
    marginTop: 15,
    padding: 12,
    borderWidth: 2,
    borderRadius: 8,
    alignItems: 'center',
  },
  switchButtonText: {
    fontSize: 16,
  },
});

export default AuthScreen;
