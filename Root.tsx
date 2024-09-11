import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadTheme } from './src/redux/themeSlice';
import { loadLanguage } from './src/redux/languageSlice';
import Navigation from './src/components/Navigation';
import { AppDispatch } from './src/redux/store';
import useAuthState from './src/firebase/useAuthState';

const Root = () => {
  const dispatch: AppDispatch = useDispatch(); 
  useAuthState();

  useEffect(() => {
    dispatch(loadTheme());
    dispatch(loadLanguage());
  }, [dispatch]);

  return <Navigation />;
};

export default Root;
