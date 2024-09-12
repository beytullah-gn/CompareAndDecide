import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const LanguageSelector = ({ selectedLanguage, onLanguageChange, selectedTheme }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const languageKeys = ['tr', 'en'];

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.openButton, { backgroundColor: selectedTheme.DarkColor }]}
        onPress={toggleModal}
      >
        <Text style={[styles.openButtonText, { color: selectedTheme.WhiteColor }]}>{selectedLanguage.SelectLanguage}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalBackground}>
          <View style={[styles.modalContainer, { backgroundColor: selectedTheme.WhiteColor }]}>
            <Text style={[styles.label, { color: selectedTheme.DarkColor }]}>{selectedLanguage.SelectLanguage}</Text>

            {languageKeys.map(langKey => (
              <TouchableOpacity
                key={langKey}
                style={[
                  styles.languageButton,
                  { backgroundColor: selectedTheme.MainColor}
                ]}
                onPress={() => {
                  onLanguageChange(langKey);
                  toggleModal();
                }}
              >
                <Text style={{ color: selectedTheme.WhiteColor , fontWeight:'bold',fontSize:16 }}>
                  {langKey === 'tr' ? 'Türkçe' : 'English'}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={[styles.closeButton, { backgroundColor: selectedTheme.DarkColor }]} onPress={toggleModal}>
              <Text style={[styles.closeButtonText, { color: selectedTheme.WhiteColor }]}>{selectedLanguage.Close}</Text>
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
    padding:12,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  openButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  languageButton: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  closeButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LanguageSelector;
