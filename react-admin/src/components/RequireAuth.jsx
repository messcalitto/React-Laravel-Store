import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import  { DataContext } from '../context/DataContext';


const RequireAuth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const isLoginPage = location.pathname === '/login';
    const auth_token = localStorage.getItem('auth_token');

    let { dataContext, dataContext: { username }, setDataContext} = useContext(DataContext);

    useEffect(() => {

        if ((!username || !auth_token) && !isLoginPage) {
            dataContext.username = null;
            navigate('/login');
        }
      }, [username, isLoginPage, navigate, auth_token, setDataContext, dataContext]);
    
    
    return null;
}

export default RequireAuth;
