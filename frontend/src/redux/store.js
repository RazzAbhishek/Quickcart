import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice";
import orderReducer from "./slices/orderSlice";
import adminReducer from "./slices/adminSlice";
import adminProductReducer from "./slices/adminProductSlice"; 
import adminOrderReducer from "./slices/adminOrderSlice"; // Import admin order slice



const store = configureStore({
  reducer: {
    auth: authReducer, //  key must match
    products : productReducer,
    cart: cartReducer, // key must match
    checkout: checkoutReducer, // key must match
    orders: orderReducer, // key must match
    admin: adminReducer, // key must match
    adminProducts: adminProductReducer, // key must match
    adminOrders: adminOrderReducer, // key must match
  },

});

export default store;