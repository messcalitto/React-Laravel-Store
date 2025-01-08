import * as React from 'react';
import './userList.css';
import ItemList from '../../components/crud/ItemList';


export default function UserList() {
    

  const columns = [
    { field: 'id', headerName: 'ID',  flex:1 },
    { field: 'name', headerName: 'Name',  flex:4},
    { field: 'email', headerName: 'Email',  flex:4},
    { field: 'created_at', headerName: 'Registered At',  flex:4},
     
  ];
  

  return <ItemList columns={columns} resource={'users'} title="User" />
  
}
