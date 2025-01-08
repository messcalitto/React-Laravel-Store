import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import * as ItemFunctions from '../../components/AxiosFunctions';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading';
import TextFieldRow from '../../components/TextFieldRow';
import DeleteIcon from '@mui/icons-material/Delete';
import HeaderPage from '../../components/HeaderPage';
import ButtonLink from '../../components/ButtonLink';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TextEditRow from '../../components/TextEditRow';
import SelectEditRow from '../../components/SelectEditRow';
import ImageEditRow from '../../components/ImageEditRow';
import ImageFieldRow from '../../components/ImageFieldRow';
import { DataContext } from '../../context/DataContext';
import { config } from '../../config';


const ItemEdit = ({columns, resource, title, showListButton=true, showViewButton=true, showDeleteButton=true, callPostUpdated=() => {}}) => {

    const {dataContext} = React.useContext(DataContext);

    const navigate = useNavigate();
    
    const {id} = useParams();

    let [data, setData] = React.useState({});
    let [loading, setLoading] = React.useState(false);
    
    
    React.useEffect(() => {

        setLoading(true);

        // otherwise get item details from server
        const runGetDetails = async () => {

            // wait until all options retrieved
            await Promise.all(

                columns.map(async item => {

                    // if column.type is select and has a resource
                    if (item.type === 'select' && item.resource) {

                        if (dataContext[item.resource]?.data) {
                            item.options = dataContext[item.resource].data;
                        } 
                        else {

                            await ItemFunctions.getItemList(item.resource).then(res => {        

                                if (res) {
                                    // set column options
                                    item.options = res.data;

                                    // store results in dataContext
                                    dataContext[item.resource] = {
                                        data: res.data,
                                        page: 0,
                                        pageSize: config.pageSize,
                                        total: res.data.length
                                    }
                                }
                            })
                        }
                        return true;
                    }       
                    return true;
                })
            )

            if (dataContext[resource]?.data) {
                setData(dataContext[resource].data.find(item => +item.id === +id));
            } else {
                // after finishing above promises, get item details
                await ItemFunctions.getItemDetails(id, resource).then(res => {
                    if (res) {
                        setData(res)
                    }
                })
            }

            setLoading(false);

        }

        // run get details
        runGetDetails();
  
    }, [id, dataContext, resource, columns]);
    
    
    const handleDelete = async () => {
        
        const result = await ItemFunctions.handleDelete(id, resource, () => setLoading(true))

        if (result) {
            // detete from dataContext
            dataContext[resource].data = dataContext[resource].data.filter(item => +item.id !== +id);
            dataContext[resource].total = dataContext[resource].total - 1;
            navigate("/"+resource);
        }

        setLoading(false);
    }

    
    const handleSubmit = (event) => {
        event.preventDefault();

        setLoading(true);
        
        ItemFunctions.updateItem(id, data, resource).then(res => {
           
           if (res) {
                Swal.fire({
                    title: 'Updated!',
                    text: title+' updated successfully!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                
                if (dataContext[resource]?.data) {
                    // update dataContext
                    dataContext[resource].data = dataContext[resource].data.map(item => +item.id === +id? res[title.toLowerCase()] : item);
                }

                callPostUpdated(res);

                navigate(`/${resource}/${id}`);
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
            <form onSubmit={handleSubmit}>
            
            <HeaderPage title={`Edit ${title} Details`} >
                {showListButton && <ButtonLink to={`/${resource}`} title="List" icon={<FormatListBulletedIcon/>} />}
                {showViewButton && <ButtonLink to={`/${resource}/${id}`} title="View" icon={<VisibilityIcon/>} />}
                {showDeleteButton && <Button variant="contained" color="primary" onClick={()=>handleDelete()} ><DeleteIcon/>Delete</Button>}
            </HeaderPage>

            {columns.map((column, index) => {

                if (column.renderCell) {
                    data[column.field] = column.renderCell(data);
                }
                
                if (column.type === 'image') {
                    
                    if (column.readonly) {
                        return <ImageFieldRow key={index} title={column.title} value={data[column.field]} />
                    }
                    
                    return <ImageEditRow key={index} title={column.title} value={data[column.field]} onChange={handleChangeForm(column.field)} />
                }
                
                if (column.type === 'select') {
                    return <SelectEditRow key={index} title={column.title} value={data[column.field]} options={column.options} onChange={handleChangeForm(column.field)} />
                }
                
                if (column.readonly) {
                    return <TextFieldRow key={index} title={column.title} value={data[column.field] || ''}  />
                }

                return <TextEditRow key={index} type={column.type} required={column.required}  multiline={column.multiline} title={column.title} value={data[column.field]} onChange={handleChangeForm(column.field)} />
            })}

            <TextFieldRow title="" value={<Button variant="contained" type="submit" color="primary">Update</Button>} />
            
        </form>            
        </div>
    );
}

export default ItemEdit;
