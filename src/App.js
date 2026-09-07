// Main application file: imports styles and connects every page to its route.
import "./App.css";
import Login from "./pages/login";
import Home from "./pages/home";
import SignIn from "./components/sign-in";
import SignUp from "./components/sign-up";
import ProtectedRoute from "./components/ProtectedRoute";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/product";
import Categories from "./pages/categories";
import Setting from "./pages/setting";
import AddProduct from "./components/addProduct";
import AddCategory from "./components/addcategory";
import EditCategory from "./components/editCategories";
import EditProduct from "./components/editProduct";
import { useEffect } from "react";

function App() {
  // Restore the saved theme whenever the application starts or refreshes.
  useEffect(() => {
    const isDarkMode = JSON.parse(localStorage.getItem("darkMode") || "false");
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, []);

  return (
    <div className="App">
      {/* BrowserRouter enables page navigation without reloading */}
      <BrowserRouter basename="/product-management-system-Pro">
        <Routes>
          {/* Login page contains nested routes for sign in and sign up */}
          <Route path="/" element={<Login />}>
            <Route index element={<SignIn />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          {/* Main pages after login - Protected */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          {/* Product routes - Protected */}
          <Route path="/product" element={<ProtectedRoute><Product/></ProtectedRoute>}>
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="editproduct/:id" element={<EditProduct />} />
          </Route>
          {/* Categories routes - Protected */}
          <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} >
            <Route path="addcategory" element={<AddCategory/>} />
            <Route path="editcategory/:id" element={<EditCategory/>} />
          </Route>
          {/* Settings page - Protected */}
          <Route path="/setting" element={<ProtectedRoute><Setting /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
