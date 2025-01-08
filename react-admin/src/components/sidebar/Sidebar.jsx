import React, { useContext } from 'react'
import './sidebar.css'
import { DataContext } from '../../context/DataContext';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SidebarItem from '../SidebarItem';


export default function Sidebar() {
  
  const {dataContext:{username}} = useContext(DataContext);

  if (!username) return null;

  return (
    <aside className='sidebar'>
      <SidebarItem to='/' icon={<HomeIcon/>} title="Home"/>
      <SidebarItem to='/users' icon={<PeopleIcon/>} title="Users"/>
      <SidebarItem to='/products' icon={<StorefrontIcon/>} title="Products"/>
      <SidebarItem to='/categories' icon={<CategoryIcon/>} title="Categories"/>
      <SidebarItem to='/orders' icon={<ShoppingCartIcon/>} title="Orders"/>
    </aside>
  )
}
