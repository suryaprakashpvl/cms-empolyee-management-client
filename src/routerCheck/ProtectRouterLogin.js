import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRouteLogin = () => {
  const isAuthenticated = !!localStorage.getItem('token'); 

  return isAuthenticated ?  <Navigate to="/dashboard" replace />: <Outlet />;
};

export default ProtectedRouteLogin;