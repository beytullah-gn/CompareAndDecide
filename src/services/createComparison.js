import { collection, addDoc, query, orderBy, limit, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveComparison = async (comparisonTitle, user) => {
  try {
    let newComparisonId;

    if (user && user.uid) {
      // Kullanıcı giriş yaptıysa Firebase'den eşsiz ID al
      const newComparison = {
        Title: comparisonTitle,
        UserId: user.userId,
      };

      const docRef = await addDoc(collection(db, 'comparisons'), newComparison);
      newComparisonId = docRef.id; // Firebase'in oluşturduğu eşsiz ID

      // ID'yi 'Id' olarak kaydedin
      await updateDoc(doc(db, 'comparisons', newComparisonId), { Id: newComparisonId });

    } else {
      // Kullanıcı giriş yapmadıysa AsyncStorage'dan ID al
      const existingComparisons = await AsyncStorage.getItem('comparisons');
      const comparisons = existingComparisons ? JSON.parse(existingComparisons) : [];

      const newId = comparisons.length > 0 ? Math.max(...comparisons.map(comp => comp.Id)) + 1 : 1;

      const newComparison = {
        Title: comparisonTitle,
        Id: newId,
      };

      comparisons.push(newComparison);
      await AsyncStorage.setItem('comparisons', JSON.stringify(comparisons));
      newComparisonId = newId;
    }

    return newComparisonId;

  } catch (error) {
    console.error("Error saving comparison:", error);
    throw new Error('An error occurred while creating the comparison.');
  }
};

export const saveComparisonItems = async (items, comparisonId, user) => {
  try {
    if (user && user.uid) {
      // Kullanıcı giriş yaptıysa Firebase'den eşsiz ID al
      for (const item of items) {
        const newItem = {
          Name: item.name,
          ComparisonId: comparisonId,
          UserId: user.userId,
        };

        const docRef = await addDoc(collection(db, 'comparisonItems'), newItem);
        const newItemId = docRef.id; // Firebase'in oluşturduğu eşsiz ID

        // ID'yi 'Id' olarak kaydedin
        await updateDoc(doc(db, 'comparisonItems', newItemId), { Id: newItemId });
      }

    } else {
      // Kullanıcı giriş yapmadıysa AsyncStorage'dan ID al
      const existingItems = await AsyncStorage.getItem('comparisonItems');
      const comparisonItems = existingItems ? JSON.parse(existingItems) : [];

      let newItemId = comparisonItems.length > 0 ? Math.max(...comparisonItems.map(item => item.Id)) + 1 : 1;

      items.forEach((item) => {
        comparisonItems.push({
          Name: item.name,
          Id: newItemId,
          ComparisonId: comparisonId,
        });
        newItemId++;
      });

      await AsyncStorage.setItem('comparisonItems', JSON.stringify(comparisonItems));
    }
  } catch (error) {
    console.error("Error saving comparison items:", error);
    throw new Error('Öğeler kaydedilirken bir hata oluştu.');
  }
};
