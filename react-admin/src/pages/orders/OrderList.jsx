import * as React from 'react';
import { config } from '../../config';
import ItemList from '../../components/crud/ItemList';

const remoteHost = config.remoteHost;

export default function OrderList() {
  


  const columns = [
    { field: 'order_id', headerName: 'Order ID'},
    { field: 'image', headerName: 'Image', flex:1, renderCell: (params) => (params.row.image) ? <img className='gridImage' src={`${remoteHost}/uploads/${params.row.image}`}/>:""},
    { field: 'name', headerName: 'Name', flex:2},
    { field: 'title', headerName: 'Title', flex:2},
    { field: 'quantity', headerName: 'Quantity', flex:1},
    { field: 'price', headerName: 'Price', flex:1},
    { field: 'total', headerName: 'Total', flex:1, renderCell: (params) => (params.row.price * params.row.quantity)},
    { field: 'status', headerName: 'Status', flex:1},   
    
  ];
  

  return <ItemList title="Orders" resource="orders" columns={columns} rowHeight={120} showAddButton={false} />
  
}
