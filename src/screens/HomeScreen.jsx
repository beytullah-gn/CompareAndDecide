import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import CreateButton from '../components/homeScreenComponents/createButton';

function HomeScreen() {
  const selectedTheme = useSelector((state) => state.theme.selectedTheme);
  const selectedLanguage = useSelector((state) => state.language.selectedLanguage);

  return (
    <LinearGradient
      colors={[selectedTheme.DarkColor, selectedTheme.OppositeColor]}
      style={styles.container}
    >
      <Text style={{ color: selectedTheme.WhiteColor }}>{selectedLanguage.Welcome}</Text>
      <CreateButton />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
