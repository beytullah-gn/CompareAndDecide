import { collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const saveComparison = async (comparisonTitle, user) => {
    try {
      let newComparisonId = 1; 
  
      if (user && user.uid) { 
        const q = query(collection(db, 'comparisons'), orderBy('Id', 'desc'), limit(1));
        const lastComparisonSnapshot = await getDocs(q);
  
        if (!lastComparisonSnapshot.empty) {
          newComparisonId = lastComparisonSnapshot.docs[0].data().Id + 1;
        }
  
        const newComparison = {
          Title: comparisonTitle,
          Id: newComparisonId,
          UserId: user.userId, 
        };
  
        await addDoc(collection(db, 'comparisons'), newComparison);
  
      } else { 
        const existingComparisons = await AsyncStorage.getItem('comparisons');
        const comparisons = existingComparisons ? JSON.parse(existingComparisons) : [];

        if (comparisons.length > 0) {
          const maxId = Math.max(...comparisons.map(comp => comp.Id));
          newComparisonId = maxId + 1;
        }
  
        const newComparison = {
          Title: comparisonTitle,
          Id: newComparisonId,
        };
  
        comparisons.push(newComparison);
        await AsyncStorage.setItem('comparisons', JSON.stringify(comparisons));
      }
  
      return newComparisonId;
  
    } catch (error) {
      console.error("Error saving comparison:", error);
      throw new Error('An error occurred while creating the comparison.');
    }
};
export const saveComparisonItems = async (items, comparisonId, user) => {
  try {
    let newItemId = 1; 

    if (user && user.uid) {  
      const q = query(collection(db, 'comparisonItems'), orderBy('Id', 'desc'), limit(1));
      const lastItemSnapshot = await getDocs(q);

      if (!lastItemSnapshot.empty) {
        newItemId = lastItemSnapshot.docs[0].data().Id + 1;
      }

      for (const item of items) {
        const newItem = {
          Name: item.name,
          Id: newItemId,
          ComparisonId: comparisonId,
          UserId: user.userId, 
        };

        await addDoc(collection(db, 'comparisonItems'), newItem);
        newItemId++;
      }

    } else {  
      const existingItems = await AsyncStorage.getItem('comparisonItems');
      const comparisonItems = existingItems ? JSON.parse(existingItems) : [];
      if (comparisonItems.length > 0) {
        const maxId = Math.max(...comparisonItems.map(item => item.Id));
        newItemId = maxId + 1;
      }

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
