import React from 'react';
import ItemEdit from '../../components/crud/ItemEdit';
import {getCategories} from '../../components/AxiosFunctions';



const EditProduct = () => {

    
    const columns = [
        {title: "ID", field: "id", readonly: true},
        {title: "Title", field: "title", required: true},
        {title: "Short Notes", field: "short_notes", required: true},
        {title: "Description", field: "description", multiline: true, required: true},
        {title: "Category", field: "category_id", type: "select", resource: "categories", required: true},
        {title: "Price", field: "price", required: true},
        {title: "Discount Price", field: "discount_price"},
        {title: "Quantity", field: "quantity", required: true, type: "number"},
        {title: "Image", field: "image", type: "image"},
    ]

    return (
       <ItemEdit columns={columns} resource="products" title="Product" />
    );
}

export default EditProduct;
