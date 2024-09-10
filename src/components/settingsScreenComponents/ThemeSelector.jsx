import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import Palette1 from '../../assets/palettes/Palette1';
import Palette2 from '../../assets/palettes/Palette2';

// Temalar objesi
const themes = {
  Palette1,
  Palette2,
};

const ThemeSelector = ({ selectedTheme, onThemeChange, selectedLanguage }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleThemeChange = (themeKey) => {
    onThemeChange(themeKey);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Tema Seçin Butonu (TouchableOpacity ile) */}
      <TouchableOpacity
        style={[styles.selectButton, { backgroundColor: selectedTheme.DarkColor }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.selectButtonText, { color: selectedTheme.WhiteColor }]}>
          {selectedLanguage.SelectTheme}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
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
                    onPress={() => handleThemeChange(themeKey)}
                  >
                    <Text
                      style={[
                        styles.themeText,
                        {
                          color: selectedTheme.Name === theme.Name ? selectedTheme.WhiteColor : '#000',
                        },
                      ]}
                    >
                      {theme.Name}
                    </Text>
                    <Text
                      style={[
                        styles.themeDescription,
                        {
                          color: selectedTheme.Name === theme.Name ? selectedTheme.OppositeColor : '#666',
                        },
                      ]}
                    >
                      {theme.Description}
                    </Text>
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
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: 150, // Buton genişliği
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
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  themeOption: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 5,
    alignItems: 'center',
  },
  themeText: {
    fontSize: 16,
  },
  themeDescription: {
    fontSize: 14,
    color: '#666',
  },
  closeButton: {
    padding: 15,
    borderRadius: 30,
    marginTop: 20,
    backgroundColor: '#ddd',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#000',
  },
});

export default ThemeSelector;
