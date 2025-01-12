import { useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';

// Create a protected route wrapper
export default function ProtectedRoute ({ children })  {
  const navigate = useNavigate();
  

  const isAuthenticated = localStorage.getItem('token') && 
                          localStorage.getItem('name') !== null && 
                          localStorage.getItem('name') !== undefined; // Or your auth check
  

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      navigate('/login');
    }
  });


  return children;
};