import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  Alert,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'; 
import deleteComparison from '../../services/deleteComparison';

const ComparisonList = ({ comparisons, theme }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const navigation = useNavigation();

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
      navigation.navigate('SelectedComparison', { comparisonId: item.Id });
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
  const confirmDelete = () => {
    Alert.alert(
      "Öğeleri Sil",
      "Seçili öğeleri silmek istediğinize emin misiniz?",
      [
        {
          text: "İptal",
          onPress: () => console.log("Silme işlemi iptal edildi"),
          style: "cancel"
        },
        {
          text: "Sil",
          onPress: async () => {
            try {
              await deleteComparison(selectedItems);
              clearSelections();
              setSelectionMode(false);
  
              // Başarılı silme sonrası alert göster
              Alert.alert("Başarılı", "Silme işlemi başarılı!");
            } catch (error) {
              console.error(error);
              // Başarısız silme alert göster
              Alert.alert("Hata", "Silme işlemi başarısız!");
            }
          },
          style: "destructive"
        }
      ]
    );
  };
  
  

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderComparisonItem = ({ item }) => {
    const isSelected = selectedItems.includes(item.id);

    return (
      <TouchableOpacity
        style={[styles.item, isSelected && styles.selectedItem(theme)]}
        onLongPress={() => handleLongPress(item)}
        onPress={() => handlePress(item)}
      >
        <Text style={styles.title(theme)}>{item.Title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrapper}>
      {selectionMode && (
        <View style={styles.selectionBar(theme)}>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={cancelSelection} style={styles.selectionButton(theme)}>
              <Icon name={'keyboard-backspace'} size={30} color={theme.WhiteColor} />
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmDelete} style={[styles.selectionButton(theme),{marginLeft:20}]}>
              <Icon name={'delete'} size={30} color={theme.WhiteColor} />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={clearSelections} style={styles.selectionButton(theme)}>
              <Icon name={'selection-ellipse-remove'} size={30} color={theme.WhiteColor} />
            </TouchableOpacity>
            <TouchableOpacity onPress={selectAll} style={[styles.selectionButton(theme),{marginLeft:20}]}>
              <Icon name={'selection-ellipse'} size={30} color={theme.WhiteColor} />
            </TouchableOpacity>
          </View>
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
    paddingTop: 80,
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
    padding: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.MainColor,
  }),
  selectionButton: (theme) => ({
    padding: 10,
    backgroundColor: theme.DarkColor,
    borderRadius: 5,
  }),
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ComparisonList;
