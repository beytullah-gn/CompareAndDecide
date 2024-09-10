import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Root from './Root'; // Root bileşenini import edin


function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

export default App;
