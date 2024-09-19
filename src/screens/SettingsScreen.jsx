import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase/firebaseConfig';
import {saveTheme } from '../redux/themeSlice';
import {saveLanguage } from '../redux/languageSlice';
import { setUser } from '../redux/userSlice';
import UserInfo from '../components/settingsScreenComponents/UserInfo';
import ThemeSelector from '../components/settingsScreenComponents/ThemeSelector';
import LanguageSelector from '../components/settingsScreenComponents/LanguageSelector';
import LinearGradient from 'react-native-linear-gradient';

const SettingsScreen = () => {
  const user = useSelector(state => state.user);
  const selectedTheme = useSelector(state => state.theme.selectedTheme);
  const selectedLanguage = useSelector(state => state.language.selectedLanguage);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleLoginPress = () => {
    navigation.navigate('Auth');
  };

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        dispatch(setUser(null));
        console.log('User signed out');
      })
      .catch(error => console.log('Error signing out: ', error));
  };

  return (
    <LinearGradient
      colors={[selectedTheme.DarkColor, selectedTheme.OppositeColor]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <View style={[styles.card,{borderColor:selectedTheme.DarkColor}]}>
          <View>
            <UserInfo
              user={user}
              onLoginPress={handleLoginPress}
              onLogoutPress={handleLogout}
              selectedTheme={selectedTheme}
              selectedLanguage={selectedLanguage}
            />
          </View>
          <View>
            <ThemeSelector
              selectedTheme={selectedTheme}
              selectedLanguage={selectedLanguage}
              onThemeChange={(themeKey) => dispatch(saveTheme(themeKey))}
            />
          </View>
          <View>
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              selectedTheme={selectedTheme}
              onLanguageChange={(langKey) => dispatch(saveLanguage(langKey))}
            />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    justifyContent:'center',
  },
  card: {
    width: '100%',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,

    borderWidth: 2,
  },
});

export default SettingsScreen;
