import React from 'react';
import './userView.css';
import './editUser.css';
import ItemEdit from '../../components/crud/ItemEdit';
import { DataContext } from '../../context/DataContext';
import { useContext } from 'react';


const EditUser = () => {
    
    const { dataContext, setDataContext } = useContext(DataContext);

    const columns = [
        { field: 'id', title: 'ID', readonly: true},
        { field: 'name', title: 'Name', required: true},
        { field: 'username', title: 'Username', required: true},
        { field: 'password', title: 'Password', type: "password"},
         
      ];
      
      const postUpdated = (data) => {
            setDataContext({...dataContext, username:data.user.name});
            localStorage.setItem('username', data.user.name)
      }

      return <ItemEdit columns={columns} resource={'admin'} title="Admin" 
                callPostUpdated={postUpdated} 
                showDeleteButton={false} 
                showListButton={false} 
                showViewButton={false} />
}

export default EditUser;