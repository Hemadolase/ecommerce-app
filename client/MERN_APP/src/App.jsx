// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Login from './components/Login';
import Navbar from './components/Navbar';
import CategoryPage from './components/CategoryPage';
import Checkout from './components/Checkout';
import Signin from './components/Signin';




const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/signin" element={<Signin/>} />
      
            <Route path="*" element={<Home/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
