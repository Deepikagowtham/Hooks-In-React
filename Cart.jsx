import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import './Cart.css';

const Cart = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cart.length > 0 ? (
          cart.map((flower, index) => (
            <div key={index} className="cart-item">
              <img src={flower.image} alt={flower.name} />
              <div className="cart-item-details">
                <h3>{flower.name}</h3>
                <p>{flower.description}</p>
                <p className="price">{flower.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
