import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import { CartContext, CartProvider } from './CartContext';
import Cart from './Cart';

function App() {
  const [flowers, setFlowers] = useState([]);
  const [cardColor, setCardColor] = useState('#c88ef8');
  const { addToCart } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchFlowers = async () => {
      const flowerData = [
        { id: 1, name: 'Roses', description: 'Beautiful red roses.', price: '$25', image: 'https://i.pinimg.com/736x/01/de/65/01de65796bbd9f7c4a7efaec5e4fa762.jpg' },
        { id: 2, name: 'Tulips', description: 'Colorful tulips.', price: '$20', image: 'https://i.pinimg.com/564x/2a/fd/a0/2afda0d159bf526c71d68333fb2fb088.jpg' },
        { id: 3, name: 'Lilies', description: 'Elegant white lilies.', price: '$30', image: 'https://i.pinimg.com/564x/9c/c1/3c/9cc13cdefff52600a6a64672bd1d257d.jpg' },
        { id: 4, name: 'Sunflowers', description: 'Bright and cheerful sunflowers.', price: '$15', image: 'https://i.pinimg.com/564x/f1/8f/4d/f18f4dc8c1cafa8b8ad2990eeb6e2b04.jpg' },
        { id: 5, name: 'Daisies', description: 'Delicate and pretty daisies.', price: '$18', image: 'https://i.pinimg.com/564x/31/c4/7f/31c47f9e926f2bb90e6442477f9729f0.jpg' },
        { id: 6, name: 'Orchids', description: 'Exotic and elegant orchids.', price: '$35', image: 'https://i.pinimg.com/736x/65/fc/e1/65fce1f8c157feea54c92881e65d2313.jpg' },
      ];
      setFlowers(flowerData);
    };

    fetchFlowers();
  }, []);

  useEffect(() => {
    console.log(`Card color changed to: ${cardColor}`);
  }, [cardColor]);

  const toggleCardColor = () => {
    setCardColor(prevColor => (prevColor === '#ac60eb' ? '#c88ef8' : '#ac60eb'));
  };

  const handleAddToCart = (flower) => {
    addToCart(flower);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Petals Paradise</h1>
      </header>
      <main>
        <h2>Our Bouquets</h2>
        <button onClick={toggleCardColor}>Toggle Card Color</button>
        <div className="flower-list">
          {flowers.map(flower => (
            <div key={flower.id} className="flower-item" style={{ backgroundColor: cardColor }}>
              <img src={flower.image} alt={flower.name} />
              <h3>{flower.name}</h3>
              <p>{flower.description}</p>
              <p className="price">{flower.price}</p>
              <button onClick={() => handleAddToCart(flower)}>Add to Cart</button>
            </div>
          ))}
        </div>
        <Link to="/cart" className="view-cart-button">View Cart</Link>
      </main>
      {showPopup && <div className="popup">Item added to cart!</div>}
    </div>
  );
}

function AppWrapper() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default AppWrapper;
