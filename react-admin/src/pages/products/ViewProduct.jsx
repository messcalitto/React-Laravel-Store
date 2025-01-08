import React from 'react';
import './productView.css';
import './editProduct.css';
import ItemView from '../../components/crud/ItemView';


const ViewProduct = () => {

    
    const columns = [
        {title: "ID", field: "id"},
        {title: "Title", field: "title"},
        {title: "Short Notes", field: "short_notes"},
        {title: "Description", field: "description"},
        {title: "Category", field: "category"},
        {title: "Price", field: "price"},
        {title: "Discount Price", field: "discount_price"},
        {title: "Quantity", field: "quantity"},
        {title: "Image", field: "image", type: "image"},
    ]

    return (
       <ItemView columns={columns} resource="products" title="Product" />
    );
}

export default ViewProduct;
