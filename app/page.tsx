"use client";
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginForm from '@/components/LoginForm';
//import Header from '@/components/Header';
import ProfileSection from '@/components/ProfileSection';
import Home from '@/components/Home';
import { isAuthenticated } from '../lib/axios';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={
          isAuthenticated() ? <Navigate to="/" replace /> : <LoginForm />
        } />
        <Route path="/" element={
          <PrivateRoute>
            <>
              {/* <Header /> */}
              <Home />
            </>
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute>
            <>
              {/* <Header /> */}
              <ProfileSection />
            </>
          </PrivateRoute>
        } />
        {/* Catch all route - redirect to login if not authenticated, home if authenticated */}
        <Route path="*" element={
          isAuthenticated() ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
        } />
      </Routes>
    </Router>
  );
}

export default App;