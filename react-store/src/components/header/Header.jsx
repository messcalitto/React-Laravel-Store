import React, {useState, useRef, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn, Logout } from '../AxiosFunctions';
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import MenuItem from './MenuItem';
import Button from './Button';
import { DataContext } from '../../context/DataContext';



const Header = () => {
   const navigate = useNavigate();

   const { dataContext } = useContext(DataContext);

   const [dropdownOpen, setDropdownOpen] = useState(false);
   const [loading, setLoading] = useState(false);

   const dropdownRef = useRef();

   const toggleDropdown = () => {
       setDropdownOpen(!dropdownOpen);
   };

   const handleClickOutside = (event) => {
       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
           setDropdownOpen(false);
       }
   };

   useEffect(() => {
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, []);


  const handleLogout = () => {
      setLoading(true);
      Logout().then((res) => {
         // window.location.reload();
         dataContext.cartItems = [];
         dataContext.userName = null;
         localStorage.removeItem('token');
         localStorage.removeItem('name');
         setLoading(false);
         setDropdownOpen(!dropdownOpen);
         navigate('/');
      });
  }

 

    return (

<header className="header_section">
   <div className="container">
      
   

      <nav className="navbar navbar-expand-lg custom_nav-container ">
         <Link className="navbar-brand" to="/"><img width="250" src="images/logo.png" alt="#" /></Link>
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
         <span class=""> </span>
         </button>
         <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav">
               <MenuItem title="Home" to="/" />
               <MenuItem title="Contact" to="/contact" />
               <MenuItem title="My Orders" to="/orders" />
               <MenuItem title="Cart" to="/cart" />

               {!isLoggedIn() && <>
                <Button title="Login" to="/login" addClass="mr-2 mb-2"/>
                <Button title="Register" to="/register" />
                </>}

                {isLoggedIn() && 
                <li className="nav-item mt-1 flex" ref={dropdownRef}>
                  <FaUser className="mt-1 ml-4" /> 
                  <UserName toggleDropdown={toggleDropdown} username={dataContext.userName} />
                  {dropdownOpen && 
                     <DropDownMenu loading={loading} handleLogout={handleLogout} setDropdownOpen={setDropdownOpen}/>
                  }
                </li>
                }
                                 
               
            </ul>
         </div>
      </nav>
   </div>
</header> 

    );
}

export default Header;

const DropDownMenu = ({loading, handleLogout, setDropdownOpen}) => {
   return (
      <div className="dropdown-menu" aria-labelledby="userDropdown">
            <Link className="dropdown-item" onClick={()=>setDropdownOpen(false)} to="/profile">Profile</Link>
            <div className="dropdown-divider"></div>
            {loading ? <PulseLoader color="#0d6efd" size={12} className="ml-4 mt-3"/> : 
            <Link className="dropdown-item" onClick={handleLogout}>Logout</Link>
            }
      </div>
   );
};

const UserName = ({toggleDropdown, username}) => {
   return (
      <span  
         onClick={toggleDropdown} 
         className="ml-2 font-weight-bold text-secondary cursor-pointer">
         {username}
      </span>
   );
}