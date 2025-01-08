import React from 'react';
import ItemView from '../../components/crud/ItemView';
import { config } from '../../config';

const remoteHost = config.remoteHost;

const ViewOrder = () => {

    const columns = [
        { field: 'id', title: 'ID'},
        { field: 'order_id', title: 'Order ID'},
        { field: 'product_id', title: 'Product ID'},
        { field: 'user_id', title: 'User ID'},        
        { field: 'name', title: 'Name'},
        { field: 'email', title: 'Email'},
        { field: 'phone', title: 'Phone'},
        { field: 'address', title: 'Address'},
        { field: 'city', title: 'City'},
        { field: 'transaction_id', title: 'Transaction Id'},
        { field: 'paid_amount', title: 'Paid amount'},
        { field: 'title', title: 'Title'},
        { field: 'quantity', title: 'Quantity'},
        { field: 'price', title: 'Price'},
        { field: 'total', title: 'Total', renderCell: (params) => (params.price * params.quantity)},
        { field: 'status', title: 'Status'},   
        { field: 'created_at', title: 'Created At'},   
        { field: 'updated_at', title: 'Updated At'},   
        { field: 'image', title: 'Image', type: "image"},
        
      ];

    return <ItemView title={"Order"} resource={"orders"} columns={columns} />
}

export default ViewOrder;
