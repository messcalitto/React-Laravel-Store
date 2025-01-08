import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/Home';
import Subscribe from './components/Subscribe';
import Client from './components/Client';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import { DataProvider } from './context/DataContext';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';


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

          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
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
