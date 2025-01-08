import React from 'react';
import ItemEdit from '../../components/crud/ItemEdit';


const EditUser = () => {

    const columns = [
        { field: 'id', title: 'ID', readonly: true},
        { field: 'name', title: 'Name', required: true},
        { field: 'email', title: 'Email', type: 'email', required: true},
        { field: 'password', title: 'Password', type: "password"},
         
      ];
      
      return <ItemEdit columns={columns} resource={'users'} title="User" />
}

export default EditUser;
