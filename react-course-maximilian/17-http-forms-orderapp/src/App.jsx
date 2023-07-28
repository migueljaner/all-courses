import React, { useState } from 'react';
import './App.css';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const togleCartHandler = () => {
    setCartIsShown(!cartIsShown);
  };
  return (
    <CartProvider>
      {cartIsShown && <Cart onToggleShowCart={togleCartHandler} />}
      <Header onToggleShowCart={togleCartHandler} />
      <main style={{ marginTop: '250px', height: '90vh' }}>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
