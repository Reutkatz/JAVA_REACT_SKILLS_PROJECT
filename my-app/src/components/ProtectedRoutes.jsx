import React from 'react';
import { Navigate, } from 'react-router-dom';

const ProtectedRoute = ({ element}) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user) {
    console.log('enter');
    alert('you can not entered without login')
    return <Navigate to="/login" replace />;
  }
  return element;
};

export default ProtectedRoute;