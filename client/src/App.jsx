import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./assets/Login";
import Signup from "./assets/Signup";
import Navbar from "./assets/Navbar";
import Home from "./assets/Home";
import "./App.css";
import NewArrivals from "./assets/NewArrivals";
import SunGlasses from "./assets/SunGlasses";
import EyeGlasses from "./assets/EyeGlasses";
import ContactLenses from "./assets/ContactLenses";
import Accessories from "./assets/Accessories";
import Store from "./assets/Store";
import AdminLogin from "./assets/AdminLogin";
import AdminDashboard from "./assets/AdminDashboard";
import AddProducts from "./assets/AddProducts";
import ManageProducts from "./assets/ManageProducts";
import ManageUsers from "./assets/ManageUsers";
import ProductDetails from "./assets/ProductDetails";
import Cart from "./assets/Cart";
import Checkout  from "./assets/Checkout";
import MyOrders from "./assets/MyOrders";
import AdminOrders from "./assets/AdminOrders";
import Success from "./assets/Success";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
       
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        

        <Route path="/home" element={<><Navbar /><Home /></>} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AddProducts />} />
        <Route path="/admin/manage-products" element={<ManageProducts />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/orders" element={<AdminOrders />} />

        <Route path="/new-arrivals" element={<><Navbar /><NewArrivals /></>} />
        <Route path="/sunglasses" element={<><Navbar /><SunGlasses /></>} />
        <Route path="/eyeglasses" element={<><Navbar /><EyeGlasses /></>} />
        <Route path="/contact-lenses" element={<><Navbar /><ContactLenses /></>} />
        <Route path="/accessories" element={<><Navbar /><Accessories /></>} />
        <Route path="/store" element={<><Navbar /><Store /></>} />
        <Route path="/product/:id" element={<><ProductDetails /></>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/success" element={<Success />} />
        
      </Routes>
    </Router>
  );
}

export default App;