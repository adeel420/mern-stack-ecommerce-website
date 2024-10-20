import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import About from './pages/About';
import Contact from './pages/Contact';
import PageNotFound from './pages/PageNotFound';
import ForgetPassword from './pages/ForgetPassword';
import { useState } from 'react';
import RefreshHandler from './component/RefreshHandler';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/UserDashboard';
import UpdateProduct from './pages/admin/UpdateProduct';
import ProductDetails from './pages/admin/ProductDetails';
import AllCategory from './pages/admin/AllCategory';
import CategoryProducts from './pages/admin/CategoryProducts';
import AllProducts from './pages/admin/AllProducts';
import CartPage from './pages/CartPage';
import { handleError } from './component/Utils';
import { ToastContainer } from 'react-toastify';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const PrivateRoute = ({ element }) => {
    handleError('Login First')
    return isAuthenticated ? element : <Navigate to={'/'} />
  }
  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/cart' element={<PrivateRoute element={<CartPage />} />} />
        <Route path='/about' element={<About />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/all-products' element={<AllProducts />} />
        <Route path='/update-product/:name' element={<UpdateProduct />} />
        <Route path='/product-details/:name' element={<ProductDetails />} />
        <Route path='/category-products/:name' element={<CategoryProducts />} />
        <Route path='/all-categories' element={<AllCategory />} />
        <Route path='/user' element={<UserDashboard />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
