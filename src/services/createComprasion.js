import { collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

// Kıyaslama başlığını ve id'sini kaydetme fonksiyonu
export const saveComparison = async (comparisonTitle) => {
    try {
        // Son id'yi bul ve bir artır
        const q = query(collection(db, 'comparisons'), orderBy('Id', 'desc'), limit(1));
        const lastComparisonSnapshot = await getDocs(q);

        let newComparisonId = 1; // İlk ID 1 olarak başlar
        if (!lastComparisonSnapshot.empty) {
            newComparisonId = lastComparisonSnapshot.docs[0].data().Id + 1;
        }

        // Yeni kıyaslama verisini Firestore'a kaydet
        const newComparison = {
            Title: comparisonTitle,
            Id: newComparisonId,
        };

        await addDoc(collection(db, 'comparisons'), newComparison);

        return newComparisonId; // Yeni kıyaslamanın Id'sini döndürüyoruz
    } catch (error) {
        console.error("Error saving comparison:", error);
        throw new Error('Kıyaslama oluşturulurken bir hata oluştu.');
    }
};

// Kıyaslama öğelerini kaydetme fonksiyonu
export const saveComparisonItems = async (items, comparisonId) => {
    try {
        // Son item id'sini bul ve bir artır
        const q = query(collection(db, 'comparisonItems'), orderBy('Id', 'desc'), limit(1));
        const lastItemSnapshot = await getDocs(q);

        let newItemId = 1; // İlk öğe ID'si 1 olarak başlar
        if (!lastItemSnapshot.empty) {
            newItemId = lastItemSnapshot.docs[0].data().Id + 1;
        }

        // Her bir öğeyi Firestore'a kaydet
        for (const item of items) {
            const newItem = {
                Name: item.name,
                Id: newItemId,
                ComparisonId: comparisonId,
            };

            await addDoc(collection(db, 'comparisonItems'), newItem);
            newItemId++; // Her öğe için ID artırılır
        }
    } catch (error) {
        console.error("Error saving comparison items:", error);
        throw new Error('Öğeler kaydedilirken bir hata oluştu.');
    }
};
