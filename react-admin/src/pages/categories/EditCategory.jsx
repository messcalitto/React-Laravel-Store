import React from 'react';
import ItemEdit from '../../components/crud/ItemEdit';

const EditCategory = () => {

    const columns = [
        {title: "ID", field: "id", readonly: true},
        {title: "Name", field: "name"},
    ]

    return <ItemEdit columns={columns} resource="categories" title="Category" />;
}

export default EditCategory;
