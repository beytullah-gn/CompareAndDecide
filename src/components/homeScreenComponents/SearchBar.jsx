import React from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const SearchBar = ({ searchQuery, setSearchQuery , selectedLanguage }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={selectedLanguage.SearchComparison}
        placeholderTextColor={styles.input.placeholderTextColor}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    marginBottom: 20,
    margin:10,
    width: width - 20,
    paddingHorizontal: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
  },
  input: {
    padding: 10,
    fontSize: 16,
    width: '100%',
    color: '#ccc',
    placeholderTextColor: '#ccc',
  },
});

export default SearchBar;
