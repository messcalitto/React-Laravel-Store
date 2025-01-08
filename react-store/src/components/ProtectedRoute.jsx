import { Navigate } from 'react-router-dom';

// Create a protected route wrapper
export default function ProtectedRoute ({ children })  {
  const isAuthenticated = localStorage.getItem('token'); // Or your auth check
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};