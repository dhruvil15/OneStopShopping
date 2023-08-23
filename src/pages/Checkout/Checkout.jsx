import React, { useContext } from "react";
import { ShopContext } from "../../context/shopFunctions";
import { PRODUCTS } from "../HomePage/products";
import { useNavigate } from "react-router-dom";
import "./checkout.css";

export const Checkout = () => {
  const { cartItems, totalCartAmount, checkout, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const handleAddToCart = (itemId) => {
    addToCart(itemId);
  };

  const handleItemCountChange = (itemId, newAmount) => {
    updateCartItemCount(newAmount, itemId);
  };

  const sendNotification = (productName) => {
    const message = { productName };

    fetch("https://fsvt7i7uif.execute-api.us-east-1.amazonaws.com/notification/notification", {
      method: "POST",
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send Email message");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Email message sent:", data.message);
      })
      .catch((err) => {
        console.error("Error in sending email:", err.message);
      });
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Your Cart Items</h1>
      <div className="cart-items-container">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return (
              <div className="cartItem" key={product.id}>
                <img src={product.productImage} alt={product.productName} />
                <div className="itemDescription">
                  <p className="productName">
                    <b>{product.productName}</b>
                  </p>
                  <p className="price">Price: ${product.price}</p>
                  <div className="countHandler">
                    <button onClick={() => handleRemoveFromCart(product.id)} className="quantityButton">
                      -
                    </button>
                    <input
                      type="number"
                      value={cartItems[product.id]}
                      onChange={(e) => handleItemCountChange(product.id, Number(e.target.value))}
                      className="quantityInput"
                    />
                    <button onClick={() => { handleAddToCart(product.id); sendNotification(product.productName); }} className="quantityButton">
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      {totalCartAmount > 0 ? (
        <div className="checkout-summary">
          <p className="subtotal"><strong>Subtotal: ${totalCartAmount}</strong></p>
          <div className="checkout-buttons">
            <button className="continue-shopping" onClick={() => navigate("/")}>
              Continue Shopping
            </button>
            <button className="checkout-button" onClick={() => checkout()}>
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <h1 className="empty-cart-message">Your Cart is Empty</h1>
      )}
    </div>
  );
};
