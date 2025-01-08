import React from 'react';
import ItemView from '../../components/crud/ItemView';

const EditCategory = () => {

    const columns = [
        {title: "ID", field: "id"},
        {title: "Name", field: "name"},
    ]

    return <ItemView columns={columns} resource="categories" title="Category" />;
}

export default EditCategory;
