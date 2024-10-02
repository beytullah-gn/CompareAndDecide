import { doc, deleteDoc, query, collection, where, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../firebase/firebaseConfig';

const deleteComparison = async (selectedItems) => {
  try {
    // Firebase'den seçilen her 'comparison' öğesini sil
    for (const itemId of selectedItems) {
      const itemDoc = doc(db, 'comparisons', itemId);
      await deleteDoc(itemDoc);

      // comparisonItems tablosunda ComparisonId'si silinen comparison ile eşleşen öğeleri sil
      const comparisonItemsQuery = query(
        collection(db, 'comparisonItems'),
        where('ComparisonId', '==', itemId)
      );
      
      // Eşleşen comparisonItems belgelerini al
      const querySnapshot = await getDocs(comparisonItemsQuery);
      querySnapshot.forEach(async (docSnapshot) => {
        const itemDoc = doc(db, 'comparisonItems', docSnapshot.id); // comparisonItems'taki belge
        await deleteDoc(itemDoc); // Her belgeyi sil
      });
    }

    // AsyncStorage'dan seçilen öğeleri sil
    for (const itemId of selectedItems) {
      await AsyncStorage.removeItem(itemId);
    }

    console.log('Seçilen öğeler ve ilgili comparisonItems başarıyla silindi.');
  } catch (error) {
    console.error('Silme işlemi sırasında hata oluştu:', error);
  }
};

export default deleteComparison;
