import React, { createContext, useEffect, useState } from "react";
import { PRODUCTS } from "../pages/HomePage/products";

export const ShopContext = createContext(null);

const getCart = () => {
  const cart = {};
  for (const product of PRODUCTS) {
    cart[product.id] = 0;
  }
  return cart;
}

  /**
   * Reference for this functions were taken from: https://www.youtube.com/watch?v=tEMrD9t85v4
   *  Author: PedroTech
   */
export const ShopContextProvider = ({ isLoggedIn, children }) => {
  const [cartItems, setCartItems] = useState(getCart());
  const [totalCartAmount, setTotalCartAmount] = useState(0);

  useEffect(() => {
    fetchTotalCartAmount();
  }, [cartItems]);

  const fetchTotalCartAmount = async () => {
    try {
      const response = await fetch("https://fbguju81v8.execute-api.us-east-1.amazonaws.com/termAssignment/shoppingcart", {
        method: "POST",
        body: JSON.stringify({
          cartItems,
          products: PRODUCTS,
        }),
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error("Failed to fetch total cart amount");
      }

      const data = await response.json();
      console.log(data);
      setTotalCartAmount(data.totalAmount);
    } catch (error) {
      console.error("Error fetching total cart amount:", error);
    }
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCartItems = { ...prev };
      if (updatedCartItems[itemId] > 0) {
        updatedCartItems[itemId] -= 1;
      }
      return updatedCartItems;
    });
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const checkout = () => {
    setCartItems(getCart());
  };

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    totalCartAmount,
    checkout,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

