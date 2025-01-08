import React from 'react';
// import './createUser.css';
// import './editUser.css';
import ItemCreate from '../../components/crud/ItemCreate';


const CreateUser = () => {

    const columns = [
        
        { field: 'name', title: 'Name', required: true},
        { field: 'email', title: 'Email', type: 'email', required: true},
        { field: 'password', title: 'Password', type: 'password', required: true},
         
      ];
      
      return <ItemCreate columns={columns} resource={'users'} title="User" />
}

export default CreateUser;
