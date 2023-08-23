import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import { Signup } from "./pages/Login&Register/Signup";
import { Login } from "./pages/Login&Register/Login";
import { HomePage } from "./pages/HomePage/HomePage";
import { Checkout } from "./pages/Checkout/Checkout";
import { ShopContextProvider } from "./context/shopFunctions";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setAuthToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };

  useEffect(() => {
    const authToken = getAuthToken();
    setIsLoggedIn(!!authToken);
  }, []);

  const handleLoginSuccess = (token) => {
    setAuthToken(token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("cartItems"); 
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <Router>
        {isLoggedIn && <Navbar onLogout={handleLogout} />}
        <ShopContextProvider isLoggedIn={isLoggedIn}>
          <Routes>
            {!isLoggedIn ? (
              <>
                <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/signup" element={<Signup />} />
              </>
            ) : (
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/Checkout" element={<Checkout />} />
              </>
            )}
          </Routes>
        </ShopContextProvider>
      </Router>
    </div>
  );
}

export default App;
