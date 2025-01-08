import {React} from 'react';
// import './userView.css';
import ItemView from '../../components/crud/ItemView';


const UserView = () => {

    const columns = [
        { field: 'id', title: 'ID' },
        { field: 'name', title: 'Name'},
        { field: 'email', title: 'Email'},
        { field: 'created_at', title: 'Registered At'},
         
      ];
      
      return <ItemView columns={columns} resource={'users'} title="User" />

}
export default UserView;