import React from 'react';
import ItemCreate from '../../components/crud/ItemCreate';

const CreateCategory = () => {

    const columns = [
        {title: "Name", field: "name", required: true},
    ]

    return <ItemCreate columns={columns} resource="categories" title="Category" />;
}

export default CreateCategory;
