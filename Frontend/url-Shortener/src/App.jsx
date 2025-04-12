import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import UrlShortener from './pages/CreateUrl'
import Dashboard from './pages/Dashboard'
import UrlAnalytics from './pages/UrlAnalytics'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import './App.css'

function App() {

  return (
    <Router>
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/createUrl" element={<UrlShortener />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/urlAnalytics" element={<UrlAnalytics />} />
        </Routes>
      </div>
    </div>
  </Router>
  )
}

export default App
