import React from 'react';
import ItemCreate from '../../components/crud/ItemCreate';
import {getCategories} from '../../components/AxiosFunctions';


const CreateProduct = () => {

    let [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        getCategories().then(res => {
            if (res) {
                setCategories(res.data);
            }
        })
    }, []);

    const columns = [
     
        {title: "Title", field: "title", required: true},
        {title: "Short Notes", field: "short_notes", required: true},
        {title: "Description", field: "description", multiline: true, required: true},
        {title: "Category", field: "category_id", type: "select", options: categories, required: true},
        {title: "Price", field: "price", required: true, type: "number"},
        {title: "Discount Price", field: "discount_price", type: "number", defaultValue: "0"},
        {title: "Quantity", field: "quantity", type: "number", defaultValue: "1"},
        {title: "Image", field: "image", type: "image"},
    ]

    return <ItemCreate columns={columns} resource="products" title="Product" />;
    
}

export default CreateProduct;
