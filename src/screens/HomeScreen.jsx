// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import CreateButton from '../components/homeScreenComponents/CreateButton';
import SearchBar from '../components/homeScreenComponents/SearchBar';
import ComparisonList from '../components/homeScreenComponents/ComparisonList';
import NoResults from '../components/homeScreenComponents/NoResults';
import { getComparisons } from '../services/getComparisons';

function HomeScreen() {
  const selectedTheme = useSelector((state) => state.theme.selectedTheme);
  const selectedLanguage = useSelector((state) => state.language.selectedLanguage);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredComparisons, setFilteredComparisons] = useState([]);
  const user = useSelector((state) => state.user);

  const { comparisons, loading } = getComparisons(user);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredComparisons(comparisons);
    } else {
      const filtered = comparisons.filter((comparison) =>
        comparison.Title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredComparisons(filtered);
    }
  }, [searchQuery, comparisons]);

  return (
    <LinearGradient
      colors={[selectedTheme.DarkColor, selectedTheme.OppositeColor]}
      style={styles.container}
    >
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {loading ? (
        <NoResults message="Loading..." />
      ) : filteredComparisons.length > 0 ? (
        <ComparisonList comparisons={filteredComparisons} theme={selectedTheme} />
      ) : (
        <NoResults />
      )}
      <CreateButton />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default HomeScreen;
