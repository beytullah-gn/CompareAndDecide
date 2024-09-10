import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const LanguageSelector = ({ selectedLanguage, onLanguageChange, selectedTheme }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const languageKeys = ['tr', 'en']; // Dil anahtarları

  // Modal açma ve kapama işlemi
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      {/* Modalı açmak için TouchableOpacity buton */}
      <TouchableOpacity
        style={[styles.openButton, { backgroundColor: selectedTheme.DarkColor }]}
        onPress={toggleModal}
      >
        <Text style={[styles.openButtonText, { color: selectedTheme.WhiteColor }]}>{selectedLanguage.SelectLanguage}</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={[styles.label, { color: selectedLanguage.WhiteColor }]}>{selectedLanguage.SelectLanguage}</Text>

            {/* Dil seçim butonları */}
            {languageKeys.map(langKey => (
              <TouchableOpacity
                key={langKey}
                style={[
                  styles.languageButton,
                  {
                    backgroundColor: selectedLanguage === langKey ? selectedTheme.DarkColor : '#ccc',
                  },
                ]}
                onPress={() => {
                  onLanguageChange(langKey);
                  toggleModal(); // Seçim sonrası modalı kapat
                }}
              >
                <Text
                  style={[
                    styles.languageButtonText,
                    { color: selectedLanguage === langKey ? selectedTheme.WhiteColor : '#000' },
                  ]}
                >
                  {langKey === 'tr' ? 'Türkçe' : 'English'}
                </Text>
              </TouchableOpacity>
            ))}

            {/* Modal kapatma butonu */}
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>{selectedLanguage.Close}</Text>
            </TouchableOpacity>
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
  openButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: 100, // Buton genişliği
  },
  openButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Yarı saydam arka plan
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  languageButton: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    width: '100%',
  },
  languageButtonText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LanguageSelector;
