import {React, useContext, useState, useRef, useEffect} from 'react'
import './topbar.css'

import { DataContext } from '../../context/DataContext';
import { Logout } from '../AxiosFunctions';
import Swal from 'sweetalert2';

import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function Topbar() {

    let {dataContext, dataContext:{username}, setDataContext} = useContext(DataContext);
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef();
    
    const navigate = useNavigate();

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setShowMenu(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const handleLogout = () => {
        
        Swal.fire({
            title: 'Logout',
            html: 'Logging out...',
        })

        Logout().then(res => {
            setDataContext({...dataContext, username:null});
            navigate('/login');
            Swal.close();
        })
    };

  return (
    
    <div className="topbar">
        <div className='topbarWrapper'>

            <div className="topLeft">
                <span className="logo">My Admin</span>
            </div>
            {username && (
            <div className="topRight">
               

                <div className="topbarIconContainer">
                    <PersonIcon className="topbarIcon"/>
                </div>
                <div className="userSection" ref={menuRef}>
                <div className='username' onClick={toggleMenu}>
                {username}
                </div>
                {showMenu && (
                    <div className="dropdownMenu">
                        <ul >
                        <li><Link to={'/admin/0/edit'}><PersonIcon/>Profile</Link></li>
                        <li  onClick={() => handleLogout()}><LogoutIcon/>Logout</li>
                        </ul>
                    </div>
                    )}
            </div>
            </div>
            )}

        </div>
    </div>
  )
}
