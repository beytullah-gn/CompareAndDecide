import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';
import CreateButton from '../components/homeScreenComponents/createButton';


function HomeScreen() {
  const selectedTheme = useSelector((state) => state.theme.selectedTheme);
  const selectedLanguage = useSelector((state) => state.language.selectedLanguage);



  return (
    <View style={[styles.container, { backgroundColor: selectedTheme.SecondaryColor }]}>
      <Text style={{ color: selectedTheme.DarkColor }}>{selectedLanguage.Welcome}</Text>

      <CreateButton />
    </View>
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
