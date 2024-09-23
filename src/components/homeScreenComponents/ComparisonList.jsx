import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  BackHandler,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'; // Navigasyonu ekliyoruz

const ComparisonList = ({ comparisons, theme }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const navigation = useNavigation(); // Navigation hook'u ekliyoruz

  useEffect(() => {
    const backAction = () => {
      if (selectionMode) {
        cancelSelection();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [selectionMode]);

  const handleLongPress = (item) => {
    if (!selectionMode) {
      setSelectionMode(true);
    }
    toggleSelection(item);
  };

  const handlePress = (item) => {
    if (selectionMode) {
      toggleSelection(item);
    } else {
      // Seçilen kıyaslamayı SelectedComparison sayfasına yönlendiriyoruz
      navigation.navigate('SelectedComparison', { comparisonId: item.Id});
    }
  };

  const toggleSelection = (item) => {
    if (selectedItems.includes(item.id)) {
      setSelectedItems(prevSelectedItems =>
        prevSelectedItems.filter(selectedId => selectedId !== item.id)
      );
    } else {
      setSelectedItems(prevSelectedItems => [...prevSelectedItems, item.id]);
    }
  };

  const selectAll = () => {
    const allIds = comparisons.map(item => item.id);
    setSelectedItems(allIds);
  };

  const clearSelections = () => {
    setSelectedItems([]);
  };

  const cancelSelection = () => {
    setSelectedItems([]);
    setSelectionMode(false);
  };

  const renderComparisonItem = ({ item }) => {
    const isSelected = selectedItems.includes(item.id);

    return (
      <TouchableOpacity
        style={[styles.item, isSelected && styles.selectedItem(theme)]}
        onLongPress={() => handleLongPress(item)}
        onPress={() => handlePress(item)} // Kıyaslama seçildiğinde yönlendirme burada olacak
      >
        <Text style={styles.title(theme)}>{item.Id}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrapper}>
      {selectionMode && (
        <View style={styles.selectionBar(theme)}>
          <TouchableOpacity onPress={cancelSelection} style={styles.selectionButton(theme)}>
            <Icon name={'keyboard-backspace'} size={30} color={theme.WhiteColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={clearSelections} style={styles.selectionButton(theme)}>
            <Icon name={'selection-ellipse-remove'} size={30} color={theme.WhiteColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={selectAll} style={styles.selectionButton(theme)}>
            <Icon name={'selection-ellipse'} size={30} color={theme.WhiteColor} />
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={comparisons}
        renderItem={renderComparisonItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={[
          styles.container(theme),
          selectionMode && styles.containerWithSelectionBar(theme),
        ]}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: (theme) => ({}),
  containerWithSelectionBar: (theme) => ({
    paddingTop: 60,
  }),
  item: {
    width: width / 2 - 10,
    height: width / 2,
    padding: 20,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedItem: (theme) => ({
    backgroundColor: theme.OppositeColor,
    borderColor: theme.MainColor,
    borderWidth: 2,
  }),
  title: (theme) => ({
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.DarkColor,
  }),
  row: {
    justifyContent: 'flex-start',
  },
  selectionBar: (theme) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.MainColor
  }),
  selectionButton: (theme) => ({
    padding: 10,
    backgroundColor: theme.DarkColor,
    borderRadius: 5,
  }),
  buttonText: (theme) => ({
    color: theme.WhiteColor,
    fontWeight: 'bold',
  }),
});

export default ComparisonList;
