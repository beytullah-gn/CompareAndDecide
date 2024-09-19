// services/getComparisons.js
import { useState, useEffect, useRef } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getComparisons = (user) => {
  const [comparisons, setComparisons] = useState([]);
  const [loading, setLoading] = useState(true);
  const prevComparisonsRef = useRef();

  useEffect(() => {
    let unsubscribe;
    const fetchComparisons = async () => {
      try {
        if (user && user.userId) {
          const q = query(
            collection(db, 'comparisons'),
            where('UserId', '==', user.userId)
          );

          unsubscribe = onSnapshot(q, async (querySnapshot) => {
            const newComparisons = [];
            querySnapshot.forEach((doc) => {
              newComparisons.push({
                id: doc.id,
                ...doc.data()
              });
            });

            if (JSON.stringify(prevComparisonsRef.current) !== JSON.stringify(newComparisons)) {
              prevComparisonsRef.current = newComparisons;
              await AsyncStorage.setItem('comparisons', JSON.stringify(newComparisons));
              setComparisons(newComparisons);
            }
            setLoading(false);
          });
        } else {
          const loadAsyncStorageData = async () => {
            const existingComparisons = await AsyncStorage.getItem('comparisons');
            setComparisons(existingComparisons ? JSON.parse(existingComparisons) : []);
            setLoading(false);
          };

          loadAsyncStorageData();
          const intervalId = setInterval(loadAsyncStorageData, 1000);
          return () => clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Error fetching comparisons:", error);
        setLoading(false);
      }
    };

    fetchComparisons();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  return { comparisons, loading };
};
