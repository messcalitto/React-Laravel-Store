import * as React from 'react';
import ItemList from '../../components/crud/ItemList';


export default function CategoryList() {
    
  const columns = [
    { field: 'id', headerName: 'ID', flex:1 },
    { field: 'name', headerName: 'Name', flex:4},
    
  ];
  
  return <ItemList columns={columns} resource={'categories'} title={"Category"} />
}
