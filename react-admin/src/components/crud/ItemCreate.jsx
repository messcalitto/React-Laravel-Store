import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import * as ItemFunctions from '../../components/AxiosFunctions';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading';
import TextFieldRow from '../../components/TextFieldRow';
import HeaderPage from '../../components/HeaderPage';
import ButtonLink from '../../components/ButtonLink';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TextEditRow from '../../components/TextEditRow';
import SelectEditRow from '../../components/SelectEditRow';
import ImageEditRow from '../../components/ImageEditRow';
import { DataContext } from '../../context/DataContext';


const ItemCreate = ({columns, resource, title}) => {

    const navigate = useNavigate();
    
    const { dataContext } = React.useContext(DataContext);

    let initData = {};

    columns.map(item => {
        initData[item.field] = item.defaultValue || "";
        return null;
    });

    const [data, setData] = React.useState(initData);

    const [loading, setLoading] = React.useState(false);

   
    
    const handleSubmit = (event) => {
        event.preventDefault();

        setLoading(true);

        ItemFunctions.createItem(data, resource).then(res => {
            
            if (res) {

                // Check if dataContext has data
                if (resource in dataContext) {
                    dataContext[resource].data = [...dataContext[resource].data, res[title.toLowerCase()]];
                    dataContext[resource].total = dataContext[resource].total + 1;
                }
                
                
                Swal.fire({
                    title: 'Created!',
                    text: title+' created successfully!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                
                navigate(`/${resource}/${res[title.toLowerCase()].id}`);
            }
            setLoading(false);
        })
         
    };

    const handleChangeForm = name => event => {
        setData({ ...data, [name]: event.target.value });
    };

    if (loading) {
        return <Loading/>;
    }

    return (
        <div>
            <HeaderPage title={`Create ${title}`} >
                <ButtonLink to={`/${resource}`} title="List" icon={<FormatListBulletedIcon/>} />
            </HeaderPage>

            <form onSubmit={handleSubmit}>
            
            {columns.map((column, index) => {
                
                if (column.type === 'readonly') {
                    return <TextFieldRow key={index} title={column.title} value={data[column.field]}  />
                }

                if (column.type === 'image') {
                    return <ImageEditRow key={index} title={column.title} value={data[column.field]} onChange={handleChangeForm(column.field)} />
                }

                if (column.type === 'select') {
                    return <SelectEditRow key={index} title={column.title} required={column.required} value={data[column.field]} options={column.options} onChange={handleChangeForm(column.field)} />
                }
                
                return <TextEditRow key={index} type={column.type} required={column.required} multiline={column.multiline} title={column.title} value={data[column.field]} onChange={handleChangeForm(column.field)} />
            })}

            <TextFieldRow title="" value={<Button variant="contained" type="submit" color="primary">Create</Button>} />
            
        </form>            
        </div>
    );
}

export default ItemCreate;
