import React, { useContext, useRef } from 'react'
import './sidebar.css'
import { DataContext } from '../../context/DataContext';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SidebarItem from '../SidebarItem';


export default function Sidebar() {
  
  const menuToggleRef = useRef(null);

  const {dataContext:{username}} = useContext(DataContext);

  const handleClick = () => {
    menuToggleRef.current.checked = false;
  }

  if (!username) return null;

  return (<>
    <input type="checkbox" id="menu-toggle" ref={menuToggleRef} className="menu-toggle"/>
    <aside className='sidebar'>
      <SidebarItem to='/' icon={<HomeIcon/>} title="Home" onClick={handleClick}/>
      <SidebarItem to='/users' icon={<PeopleIcon/>} title="Users" onClick={handleClick}/>
      <SidebarItem to='/products' icon={<StorefrontIcon/>} title="Products" onClick={handleClick}/>
      <SidebarItem to='/categories' icon={<CategoryIcon/>} title="Categories" onClick={handleClick}/>
      <SidebarItem to='/orders' icon={<ShoppingCartIcon/>} title="Orders" onClick={handleClick}/>
    </aside>
    </>
  )
}
