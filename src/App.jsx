import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar/navbar';
import Profile from './pages/Profile';
import Login from './pages/Login';  
import React from 'react';
import Settings from './pages/Settings';

function ProtectedRoute({ children }) {
  const isAuthenticated = true; // Cambia esto según tu lógica de autenticación

  return isAuthenticated ? children : <Navigate to="/Login" />;
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/Login" element={<Login />} />
        <Route
          path="/Profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route 
        path='/Settings'
        element={<ProtectedRoute>
          <Settings />
        </ProtectedRoute>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
