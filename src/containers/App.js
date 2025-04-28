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
            <Route path='/store/:id' element={<StoreIDPage />} />
            <Route path="/store/all/store" element={<AllStorePage />} />
            <Route path="/product/add" element={<ProductAddPage />} />
          </Routes>
      </div>
    </div>
    
  );
}

export default App;
