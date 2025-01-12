import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header.tsx';
import Home from './pages/Home.tsx';
import Subscribe from './components/Subscribe.tsx';
import Client from './components/Client.tsx';
import Footer from './components/Footer.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductDetails from './pages/ProductDetails.tsx';
import Cart from './pages/Cart.tsx';
import Shipping from './pages/Shipping.tsx';
import Checkout from './pages/Checkout.tsx';
import Orders from './pages/Orders.tsx';
import { DataProvider } from './context/DataContext';
import Contact from './pages/Contact.tsx';
import Profile from './pages/Profile.tsx';
import ForgotPassword from './pages/ForgotPassword.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';


const queryClient = new QueryClient()


function App() {

  return (
    <div className="App">
      <DataProvider>
      <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={window.location.pathname} future={{ 
        v7_startTransition: true,
        v7_relativeSplatPath: true 
      }}>
      <Header />

      
        <Routes>
          {/* <Route path="/" element={<ToDo />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/cart" element={<ProtectedRoute><Cart isLoggedIn={true}/></ProtectedRoute>} />
          <Route path="/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          
        </Routes>
      
     

      <Subscribe/>
      <Client/>
      <Footer/>
      </BrowserRouter>
      </QueryClientProvider>
      </DataProvider>
    </div>
  );
}

export default App;
