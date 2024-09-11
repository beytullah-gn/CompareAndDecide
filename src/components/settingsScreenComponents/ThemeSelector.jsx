import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import Palette1 from '../../assets/palettes/Palette1';
import Palette2 from '../../assets/palettes/Palette2';

const themes = { Palette1, Palette2 };

const ThemeSelector = ({ selectedTheme, onThemeChange, selectedLanguage }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.selectButton, { backgroundColor: selectedTheme.DarkColor }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.selectButtonText, { color: selectedTheme.WhiteColor }]}>{selectedLanguage.SelectTheme}</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
              <View style={[{alignItems:'center',paddingBottom:12,justifyContent:'center'}]}>
                <Text style={[{color:selectedTheme.DarkColor,fontSize:15,fontWeight:'bold'}]}>
                  {selectedLanguage.SelectTheme}
                </Text>
              </View>
            <FlatList
              data={Object.keys(themes)}
              renderItem={({ item: themeKey }) => {
                const theme = themes[themeKey];
                return (
                  <TouchableOpacity
                    key={themeKey}
                    style={[
                      styles.themeOption,
                      {
                        backgroundColor: selectedTheme.Name === theme.Name ? theme.MainColor : '#ccc',
                        borderColor: selectedTheme.Name === theme.Name ? theme.DarkColor : '#bbb',
                      },
                    ]}
                    onPress={() => {
                      onThemeChange(themeKey);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={[styles.themeText, { color: selectedTheme.WhiteColor }]}>{theme.Name}</Text>
                    <Text style={[styles.themeDescription, { color:  selectedTheme.Name === theme.Name ? theme.OppositeColor : '#000', }]}>{theme.Description}</Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item}
              ListFooterComponent={
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>{selectedLanguage.Close}</Text>
                </TouchableOpacity>
              }
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  selectButton: {
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
  },
  themeOption: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 5,
  },
  themeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  themeDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ThemeSelector;
