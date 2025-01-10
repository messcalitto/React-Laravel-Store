import * as React from 'react';
import './productList.css';
import ItemList from '../../components/crud/ItemList';
import {config} from '../../config';

const remoteHost = config.remoteHost;

export default function ProductList() {
  
  // React.useEffect(() => {
    let columns = [];
      
    if (window.innerWidth < 580) {
      columns = [
        { field: 'id', headerName: 'ID', flex:1},
        { field: 'title', headerName: 'Title', flex:2},
        { field: 'image', headerName: 'Image', flex:2, renderCell: 
          (params) => (params.row.image) ? <img className='gridImage' src={`${remoteHost}/uploads/${params.row.image[0]}`} alt=""/>:""},
        
      ];
    }
    else {
      columns = [
        { field: 'id', headerName: 'ID', flex:1},
        { field: 'title', headerName: 'Title', flex:2},
        { field: 'price', headerName: 'Price',  flex:1},
        { field: 'discount_price', headerName: 'Discount Price', flex:1},
        { field: 'category', headerName: 'Category', flex:1},
        { field: 'image', headerName: 'Image', flex:2, renderCell: 
          (params) => (params.row.image) ? <img className='gridImage' src={`${remoteHost}/uploads/${params.row.image[0]}`} alt=""/>:""},
        
      ];
    }

   
  // }, []);

 
  
  return (
      <ItemList columns={columns} resource={'products'} title="Product" rowHeight={120}/>
  )
}
