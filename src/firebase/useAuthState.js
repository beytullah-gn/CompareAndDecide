import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setUserId } from '../redux/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore'; // doc ve getDoc import edildi

const useAuthState = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Redux'a kullanıcıyı kaydet
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        }));

        try {
          // Kullanıcıya ait belgeyi al
          const userDocRef = doc(db, 'users', user.uid); // Doğru belge referansı
          const userDoc = await getDoc(userDocRef); // Belgeyi al

          if (userDoc.exists()) {
            const userData = userDoc.data();
            const userId = userData?.id; // Belgeden id alanını al
            console.log(userId);
            // Redux'a userId'yi kaydet
            dispatch(setUserId(userId));
          } else {
            console.log('Kullanıcı Firestore\'da bulunamadı.');
          }
        } catch (error) {
          console.error('Firestore\'dan kullanıcı verisi çekilirken hata oluştu:', error);
        }

      } else {
        // Kullanıcı çıkış yaptıysa ya da oturum yoksa
        dispatch(setUser(null));
        dispatch(setUserId(null)); // userId'yi sıfırla
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

};

export default useAuthState;
