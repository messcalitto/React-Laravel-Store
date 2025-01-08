
import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import './App.css';
import Home from './pages/home/Home';
import  { BrowserRouter as Router, Routes, Route, UNSAFE_NavigationContext } from 'react-router-dom';
import UserList from './pages/users/UserList';

import ProductList from './pages/products/ProductList';
import EditProduct from './pages/products/EditProduct';
import ViewProduct from './pages/products/ViewProduct';
import CreateProduct from './pages/products/CreateProduct';

import OrderList from './pages/orders/OrderList';
import EditOrder from './pages/orders/EditOrder';
import ViewOrder from './pages/orders/ViewOrder';

import CategoryList from './pages/categories/CategoryList';
import EditCategory from './pages/categories/EditCategory';
import ViewCategory from './pages/categories/ViewCategory';
import CreateCategory from './pages/categories/CreateCategory';

import EditUser from './pages/users/EditUser';
import UserView from './pages/users/UserView';
import CreateUser from './pages/users/CreateUser';
import  Login  from './pages/Login';
import { DataProvider } from './context/DataContext';
import RequireAuth from './components/RequireAuth';
import EditAdmin from './pages/users/EditAdmin';


function App() {

  return (
    <div className="App">
      <DataProvider>
      <Router  basename={window.location.pathname} future={{ 
        v7_startTransition: true,
        v7_relativeSplatPath: true 
      }}>
      <RequireAuth/>
      <Topbar/>
      <div className='appContainer'>
        <Sidebar/>
        <div className='contentWrapper'>
          <Routes>

            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/users' element={<UserList/>}/>
            <Route exact path='/users/:id' element={<UserView/>}/>
            <Route exact path='/users/:id/edit' element={<EditUser/>}/>
            <Route exact path='/users/create' element={<CreateUser/>}/>
            
            <Route exact path='/products' element={<ProductList/>}/>
            <Route exact path='/products/:id/edit' element={<EditProduct/>}/>
            <Route exact path='/products/:id' element={<ViewProduct/>}/>
            <Route exact path='/products/create' element={<CreateProduct/>}/>

            <Route exact path='/categories' element={<CategoryList/>}/>
            <Route exact path='/categories/:id/edit' element={<EditCategory/>}/>
            <Route exact path='/categories/:id' element={<ViewCategory/>}/>
            <Route exact path='/categories/create' element={<CreateCategory/>}/>

            <Route exact path='/orders' element={<OrderList/>}/>
            <Route exact path='/orders/:id/edit' element={<EditOrder/>}/>
            <Route exact path='/orders/:id' element={<ViewOrder/>}/>

            <Route exact path='/admin/:id/edit' element={<EditAdmin/>}/>
            <Route exact path='/admin/:id' element={<Home/>}/>
            
            <Route path="*" element={<Home/>} />

          </Routes>
          
        </div>
      </div>
      </Router>
      </DataProvider>
    </div>
  );
}

export default App;
