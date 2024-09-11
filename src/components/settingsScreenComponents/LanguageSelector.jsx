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
          <View style={[styles.modalContainer,{backgroundColor: selectedTheme.SecondaryColor}]}>
            <Text style={[styles.label, { color: selectedTheme.OppositeColor }]}>{selectedLanguage.SelectLanguage}</Text>

            {languageKeys.map(langKey => (
              <TouchableOpacity
                key={langKey}
                style={[
                  styles.languageButton,
                  { backgroundColor: selectedLanguage === langKey ? selectedTheme.MainColor : '#ccc' }
                ]}
                onPress={() => {
                  onLanguageChange(langKey);
                  toggleModal();
                }}
              >
                <Text style={{ color: selectedLanguage === langKey ? selectedTheme.WhiteColor : '#000' }}>
                  {langKey === 'tr' ? 'Türkçe' : 'English'}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={[styles.closeButton,{backgroundColor: selectedTheme.DarkColor,}]} onPress={toggleModal}>
              <Text style={[styles.closeButtonText,{color: selectedTheme.WhiteColor,}]}>{selectedLanguage.Close}</Text>
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
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
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
    width: '80%',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  languageButton: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontWeight: 'bold',
  },
});

export default LanguageSelector;
