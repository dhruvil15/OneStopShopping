import React, { useContext } from "react";
import { ShopContext } from "../../context/shopFunctions";
import { PRODUCTS } from "./products";
import "./HomePage.css";

export const HomePage = () => {
  const { addToCart, cartItems } = useContext(ShopContext);

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
      })
  };

  return (
<div className="shopWrapper">
  <div className="productList">
    {PRODUCTS.map((product) => (
      <div className="product" key={product.id}>
        <img src={product.productImage} alt={product.productName} />
        <div className="description">
          <p>
            <b>{product.productName}</b>
          </p>
          <p>${product.price}</p>
        </div>
        <button className="addToCartBttn" onClick={() => { addToCart(product.id); sendNotification(product.productName); }}>
          Add To Cart {cartItems[product.id] > 0 && <> ({cartItems[product.id]})</>}
        </button>
      </div>
    ))}
  </div>
</div>

  );
};
