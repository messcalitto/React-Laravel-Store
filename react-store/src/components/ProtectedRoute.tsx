import { useNavigate } from 'react-router-dom';

// Create a protected route wrapper
export default function ProtectedRoute ({ children })  {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token'); // Or your auth check
  
  if (!isAuthenticated) {
    navigate('/login');
    return null; // or a loading spinner or something
  }
  
  return children;
};