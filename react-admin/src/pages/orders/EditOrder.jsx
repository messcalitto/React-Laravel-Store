import React from 'react';
import ItemEdit from '../../components/crud/ItemEdit';


const EditOrder = () => {
 
    const statuses = [
        'CANCELED',
        'PENDING',
        'PROCESSING',
        'COMPLETED',
        'DELIVERED',
        'RETURNED',
        'REFUNDED',
        'FAILED',
        'PAID',
        'SENT',
        'SHIPPING'
    ];
    
    const columns = [
        { field: 'id', title: 'ID', readonly: true},
        { field: 'order_id', title: 'Order ID', readonly: true},
        { field: 'product_id', title: 'Product ID', readonly: true},
        { field: 'user_id', title: 'User ID', readonly: true},        
        { field: 'name', title: 'Name', readonly: true},
        { field: 'email', title: 'Email', readonly: true},
        { field: 'phone', title: 'Phone', readonly: true},
        { field: 'address', title: 'Address', readonly: true},
        { field: 'city', title: 'City', readonly: true},
        { field: 'transaction_id', title: 'Transaction Id', readonly: true},
        { field: 'paid_amount', title: 'Paid amount', readonly: true},
        { field: 'title', title: 'Title', readonly: true},
        { field: 'quantity', title: 'Quantity', readonly: true},
        { field: 'price', title: 'Price', readonly: true},
        { field: 'total', title: 'Total', readonly: true, renderCell: (params) => (params.price * params.quantity)},
        { field: 'status', title: 'Status', type: "select", options: statuses},   
        { field: 'created_at', title: 'Created At', readonly: true},   
        { field: 'updated_at', title: 'Updated At', readonly: true},   
        { field: 'image', title: 'Image', type: "image", readonly: true},
        
      ];

    return <ItemEdit title={"Order"} resource={"orders"} columns={columns} />

    
}

export default EditOrder;
