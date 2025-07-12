import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserLayout from "./components/layout/userlayout";
import Home from './pages/Home';
import {Toaster} from  "sonner";
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CollectioPage from './pages/CollectioPage';
import ProductDetails from './components/product/ProductDetails';
import Checkout from './components/cart/Checkout';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderDetailPage from './pages/OrderDetailsPage';
import MyOrdersPage from './pages/MyOrdersPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminHomePage from './pages/AdminHomePage';
import UserManagement from './components/admin/UserManagement';
import ProductManagement from './components/admin/ProductManagement';
import EditProductPage from './components/admin/EditProductPage';
import OrderManagement from './components/admin/OrderManagement';



import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectedRoute from './components/common/ProtectedRoute';


const App = () => {
  return (
    <Provider store = {store} >
    <BrowserRouter future={{v7_startTransition: true , v7_relativeSplatpath : true}}>
      <Toaster position="top-right"/>
      
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="profile" element ={<Profile/>} />
          <Route path="collections/:collection" element ={<CollectioPage/>} />
          <Route path="product/:id" element ={<ProductDetails/>} />
          <Route path="checkout" element={<Checkout/>}/>
          <Route path="order-confirmation" element={<OrderConfirmationPage/>}/>
          <Route path="order/:id" element={<OrderDetailPage/>}/>
          <Route path="order/:id/my-orders" element={<MyOrdersPage/>}/>
          {/* Add more user routes here */}
        </Route>
        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute role = "admin"><AdminLayout/></ProtectedRoute>} >
          <Route index element = {<AdminHomePage/>} />
          <Route path="users" element={<UserManagement/>} />
          <Route path="products" element={<ProductManagement/>} />
          <Route path="product/:id/edit" element={<EditProductPage/>} />
          <Route path="orders" element={<OrderManagement/>} />
        </Route>
      </Routes>
    </BrowserRouter>
   </Provider> 
 );
};

export default App;

        

     