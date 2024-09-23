import { useState, useEffect, useRef } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getComparisonItems = (comparisonId) => {
  const [comparisonItems, setComparisonItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const prevItemsRef = useRef();

  useEffect(() => {
    let unsubscribe;
    const fetchComparisonItems = async () => {
      try {
        if (comparisonId) {
          const q = query(
            collection(db, 'comparisonItems'),
            where('ComparisonId', '==', comparisonId)
          );

          unsubscribe = onSnapshot(q, async (querySnapshot) => {
            const newItems = [];
            querySnapshot.forEach((doc) => {
              newItems.push({
                id: doc.id,
                ...doc.data()
              });
            });

            if (JSON.stringify(prevItemsRef.current) !== JSON.stringify(newItems)) {
              prevItemsRef.current = newItems;
              await AsyncStorage.setItem('comparisonItems', JSON.stringify(newItems));
              setComparisonItems(newItems);
            }
            setLoading(false);
          });
        } else {
          const loadAsyncStorageData = async () => {
            const existingItems = await AsyncStorage.getItem('comparisonItems');
            setComparisonItems(existingItems ? JSON.parse(existingItems) : []);
            setLoading(false);
          };

          loadAsyncStorageData();
          const intervalId = setInterval(loadAsyncStorageData, 1000);
          return () => clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Error fetching comparison items:", error);
        setLoading(false);
      }
    };

    fetchComparisonItems();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [comparisonId]);

  return { comparisonItems, loading };
};
