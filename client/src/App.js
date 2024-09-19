import React from 'react'
import { AuthProvider } from './contexts/authContext'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Home from './pages/user/Home'
import NotFound from './pages/NotFound'
import Login from './pages/user/auth/Login'
// import Register from './pages/user/auth/Register'
import ProtectedRoute from './util/ProtectedRoute'
import RoleBasedRoute from './util/RoleBasedRoute'
import "./css/index.scss"
import Register from './pages/user/auth/Register'
import Cart from './pages/user/Cart'
import Search from './pages/user/Search'
import AdminDashboard from './pages/admin/AdminDashboard'
import AddWebsite from './pages/admin/AddWebsite'
import WebsiteManager from './pages/admin/WebsiteManager'
import AddProduct from './pages/admin/AddProduct'
import ManageProducts from './pages/admin/ManageProduct'
import LoginAdmin from './pages/admin/auth/LoginAdmin'
import Profile from './pages/user/Profile'
import Orders from './pages/user/Orders'
import Productdetail from './pages/user/Productdetail'
import FinalizeOrder from './pages/admin/FinalizeOrder'
import ManageUsers from './pages/admin/ManageUsers'
import StrategizePrice from './pages/admin/StrategizePrice'
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <Routes>
              <Route path="/login" element={<Login />} exact/>
              <Route path="/register" element={<Register />} exact/>
              <Route path="/admin/login" element={<LoginAdmin />} exact/>

              {/* <Route path="/admin/login" element={<Register />} exact/>
              <Route path="/admin/register" element={<Register />} exact/> */}

                <Route path="/" element={<ProtectedRoute><RoleBasedRoute role="user"><Home /></RoleBasedRoute></ProtectedRoute>} exact/>
                <Route path="/cart" element={<ProtectedRoute><RoleBasedRoute role="user"><Cart /></RoleBasedRoute></ProtectedRoute>} exact/>
                <Route path="/search/:productName" element={<ProtectedRoute><RoleBasedRoute role="user"><Search /></RoleBasedRoute></ProtectedRoute>} exact/>
                <Route path="/profile" element={<ProtectedRoute><RoleBasedRoute role="user"><Profile /></RoleBasedRoute></ProtectedRoute>} exact/>
                <Route path="/orders" element={<ProtectedRoute><RoleBasedRoute role="user"><Orders /></RoleBasedRoute></ProtectedRoute>} exact/>
                <Route path="/product/:productId" element={<ProtectedRoute><RoleBasedRoute role="user"><Productdetail /></RoleBasedRoute></ProtectedRoute>} exact/>


                {/* admin */}
                <Route path="/admin" element={<ProtectedRoute><RoleBasedRoute role="admin"><AdminDashboard /></RoleBasedRoute></ProtectedRoute>} />
              <Route path="/admin/add-website" element={<ProtectedRoute><RoleBasedRoute role="admin"><AddWebsite /></RoleBasedRoute></ProtectedRoute>} />
              <Route path="/admin/manage-websites" element={<ProtectedRoute><RoleBasedRoute role="admin"><WebsiteManager /></RoleBasedRoute></ProtectedRoute>} />
            <Route path="/admin/add-product" element={<ProtectedRoute><RoleBasedRoute role = "admin"><AddProduct /></RoleBasedRoute></ProtectedRoute>} />
            <Route path="/admin/manage-products" element={<ProtectedRoute><RoleBasedRoute role="admin"><ManageProducts /></RoleBasedRoute></ProtectedRoute>} />
            <Route path="/admin/finalize-order" element={<ProtectedRoute><RoleBasedRoute role="admin"><FinalizeOrder /></RoleBasedRoute></ProtectedRoute>} />
            <Route path="/admin/manage-users" element={<ProtectedRoute><RoleBasedRoute role="admin"><ManageUsers /></RoleBasedRoute></ProtectedRoute>} />
            <Route path="/admin/strategize-price" element={<ProtectedRoute><RoleBasedRoute role="admin"><StrategizePrice /></RoleBasedRoute></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
