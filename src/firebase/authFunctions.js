import { auth } from './firebaseConfig'; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Firestore config dosyasını import edin

/**
 * Kullanıcı kaydı oluşturur.
 * @param {string} email - Kullanıcının e-posta adresi.
 * @param {string} password - Kullanıcının şifresi.
 */
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // En büyük kullanıcı id'sini bul
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, orderBy("id", "desc"), limit(1));
    const querySnapshot = await getDocs(q);
    
    let newId = 1; // Varsayılan olarak 1 ile başlayacak

    // Eğer users koleksiyonunda veri varsa, en büyük id'yi al ve 1 ekle
    if (!querySnapshot.empty) {
      const largestUser = querySnapshot.docs[0].data();
      newId = largestUser.id + 1;
    }

    // Kullanıcı başarıyla kaydedildi, Firestore'a kullanıcı verilerini ekle
    const userData = {
      id: newId,  // Yeni id
      email: user.email,
    };

    // Firestore'da users/{user.uid} dökümanını oluştur
    await setDoc(doc(db, "users", user.uid), userData);

    console.log('Kullanıcı Firestore\'a eklendi:', userData);
    return user;
  } catch (error) {
    console.error('Kayıt hatası:', error);
    throw error;
  }
};

/**
 * Kullanıcı giriş yapar.
 * @param {string} email - Kullanıcının e-posta adresi.
 * @param {string} password - Kullanıcının şifresi.
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    console.log('Giriş başarılı:', userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error('Giriş hatası:', error);
    throw error;
  }
};
