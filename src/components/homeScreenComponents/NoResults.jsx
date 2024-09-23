import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const NoResults = () => {
  // useSelector'u bileşenin içinde kullanıyoruz
  const selectedLanguage = useSelector((state) => state.language.selectedLanguage);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{selectedLanguage.NoComparisonFound}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: '#999',
  },
});

export default NoResults;
