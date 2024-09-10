import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase/firebaseConfig';
import { loadTheme, saveTheme } from '../redux/themeSlice'; // Tema aksiyonları
import { loadLanguage, saveLanguage } from '../redux/languageSlice'; // Dil aksiyonları
import { setUser } from '../redux/userSlice'; // Kullanıcı aksiyonları
import UserInfo from '../components/settingsScreenComponents/UserInfo'; // Kullanıcı Bilgileri Bileşeni
import ThemeSelector from '../components/settingsScreenComponents/ThemeSelector'; // Tema Seçici Bileşeni
import LanguageSelector from '../components/settingsScreenComponents/LanguageSelector'; // Dil Seçici Bileşeni

const SettingsScreen = () => {
  const user = useSelector(state => state.user); // Kullanıcı durumu
  const selectedTheme = useSelector(state => state.theme.selectedTheme); // Seçili tema
  const selectedLanguage = useSelector(state => state.language.selectedLanguage); // Seçili dil
  const dispatch = useDispatch();
  const navigation = useNavigation();



  const handleLoginPress = () => {
    navigation.navigate('Auth'); // Giriş ekranına yönlendirme
  };

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        dispatch(setUser(null)); // Kullanıcıyı Redux state'inden temizle
        console.log('User signed out');
      })
      .catch(error => console.log('Error signing out: ', error));
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: selectedTheme.SecondaryColor}]}>
      <View style={styles.innerContainer}>
        {/* Kullanıcı Bilgileri */}
        <UserInfo 
          user={user} 
          onLoginPress={handleLoginPress}
          onLogoutPress={handleLogout}
          selectedTheme={selectedTheme}
          selectedLanguage={selectedLanguage}
        />

        {/* Tema Seçimi */}
        <ThemeSelector 
          selectedTheme={selectedTheme}
          selectedLanguage={selectedLanguage}
          onThemeChange={(themeKey) => dispatch(saveTheme(themeKey))}
        />

        {/* Dil Seçimi */}
        <LanguageSelector 
          selectedLanguage={selectedLanguage}
          selectedTheme={selectedTheme}
          onLanguageChange={(langKey) => dispatch(saveLanguage(langKey))}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default SettingsScreen;
