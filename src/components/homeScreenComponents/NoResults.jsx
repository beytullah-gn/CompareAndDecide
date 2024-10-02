import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';

const NoResults = () => {
  const selectedLanguage = useSelector((state) => state.language.selectedLanguage);
  const selectedTheme = useSelector((state) => state.theme.selectedTheme);

  // Animasyon dosyasının ismini oluşturuyoruz
  const animationName = `${selectedTheme.Name}NotFound`; // Örneğin: 'lightNotFound', 'darkNotFound'
  
  // Fonksiyonla dinamik yolu alıyoruz
  const getAnimationSource = (name) => {
    switch(name) {
      case 'NatureNotFound':
        return require('../../assets/animations/NatureNotFound.json');
      case 'OceanNotFound':
        return require('../../assets/animations/OceanNotFound.json');
      // Diğer tema animasyonlarını buraya ekleyin
      default:
        return require('../../assets/animations/NatureNotFound.json'); // Varsayılan animasyon
    }
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={getAnimationSource(animationName)} // Animasyon dosyasının yolu
        autoPlay
        loop // Animasyonun sürekli dönmesi için loop özelliği
        style={styles.animation} // Animasyonun stilini ayarlamak için
      />
      <Text style={[styles.text,{color:selectedTheme.WhiteColor}]}>{selectedLanguage.NoComparisonFound}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,

    marginTop: 10, // Metin ile animasyon arasında biraz boşluk bırakmak için
  },
  animation: {
    width: 300, // Animasyonun genişliğini ayarlayın
    height: 300, // Animasyonun yüksekliğini ayarlayın
  },
});

export default NoResults;
