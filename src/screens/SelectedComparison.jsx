import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { getComparisonItems } from '../services/getComparisonItems'; // assuming the getComparisonItems function is in services
import { useRoute } from '@react-navigation/native';

const SelectedComparison = () => {
  const route = useRoute();
  const { comparisonId, comparisonTitle } = route.params; // passed from navigation
  console.log(comparisonId)
  const { comparisonItems, loading } = getComparisonItems(comparisonId);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!comparisonItems.length) {
    return (
      <View style={styles.center}>
        <Text>No items found for this comparison.</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.Name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{comparisonTitle}</Text>
      <FlatList
        data={comparisonItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.Id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  itemName: {
    fontSize: 18,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SelectedComparison;
