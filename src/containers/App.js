import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import UserPage from '../pages/UserPage';
import Logout from '../components/Logout';
import Signup from '../pages/SignupPage';
import HomePage from '../pages/HomePage';
import StoreRegisterPage from '../pages/StoreRegisterPage';
import StoreIDPage from '../pages/StoreIDPage';
import PrivateRoute from '../components/PrivateRoute';
import AllStorePage from '../pages/AllStorePage';
import TopBar from '../components/TopBar';
import ProductAddPage from '../pages/ProductAddPage';
import ProductPage from '../pages/ProductPage';
import ProductUpdatePage from '../pages/ProductUpdatePage';
import CartPage from '../pages/CartPage';
import OrdersPage from '../pages/OrdersPage';
import OrderPage from '../pages/OrderPage';
import SellerOrdersPage from '../pages/SellerOrdersPage';
import StoreUpdatePage from '../pages/StoreUpdatePage';
import SellerStore from '../components/SellerStore';
import SellerDeletePage from '../pages/StoreDeletePage';
import ProductDeletePage from '../pages/ProductDeletePage';

function App() {
  return (
    <div>
      <TopBar>
      </TopBar>
      <div className="container">
          <Routes>
            {/* <Route path="/" element={<PrivateRoute component={HomePage} />} /> */}
            <Route path="/" element={<HomePage />} />
            <Route path="/users/:id" element={<UserPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/store/register" element={<StoreRegisterPage />} />
            <Route path="/store/update" element={<StoreUpdatePage />} />
            <Route path="/store/delete" element={<SellerDeletePage />} />
            <Route path='/store/:id' element={<StoreIDPage />} />
            <Route path='/store/seller' element={<SellerStore />} />
            <Route path="/store/all/store" element={<AllStorePage />} />
            <Route path="/product/add" element={<ProductAddPage />} />
            <Route path="/product/update" element={<ProductUpdatePage />} />
            <Route path="/product/delete" element={<ProductDeletePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders/user" element={<OrdersPage />} />
            <Route path="/orders/:id" element={<OrderPage />} />
            <Route path="/orders/store" element={<SellerOrdersPage />} />
          </Routes>
      </div>
    </div>
    
  );
}

export default App;
