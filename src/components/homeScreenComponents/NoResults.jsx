import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoResults = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Kıyaslama bulunamadı.</Text>
  </View>
);

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
