import React from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import User from "../component/User"
import Profile from "../component/Profile"
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'

function AppRouters() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" index element={<User />} />
        <Route path="/profiles" element={<Profile />} />
      </Routes>
      <Outlet />
      <Footer />
    </BrowserRouter>
  )
}

export default AppRouters