import { auth } from './firebaseConfig'; // Firebase yapılandırmasını import edin
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

/**
 * Kullanıcı kaydı oluşturur.
 * @param {string} email - Kullanıcının e-posta adresi.
 * @param {string} password - Kullanıcının şifresi.
 */
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Kullanıcı başarıyla kaydedildi
    console.log('Kullanıcı oluşturuldu:', userCredential.user);
    return userCredential.user;
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
    // Kullanıcı başarıyla giriş yaptı
    console.log('Giriş başarılı:', userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error('Giriş hatası:', error);
    throw error;
  }
};
