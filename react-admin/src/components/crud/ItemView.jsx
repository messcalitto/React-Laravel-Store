import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import * as ItemFunctions from '../../components/AxiosFunctions';
import TextFieldRow from '../../components/TextFieldRow';
import ImageFieldRow from '../../components/ImageFieldRow';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteIcon from '@mui/icons-material/Delete';
import HeaderPage from '../../components/HeaderPage';
import ButtonLink from '../../components/ButtonLink';
import EditIcon from '@mui/icons-material/Edit';
import Loading from '../../components/Loading';
import { DataContext } from '../../context/DataContext';


const ItemView = ({columns, resource, title}) => {

    const {dataContext} = React.useContext(DataContext);

    const navigate = useNavigate();
    
    const {id} = useParams();

    let [data, setData] = React.useState({});
    let [loading, setLoading] = React.useState(false);    
   
    React.useEffect(() => {
      
        // Check if dataContext has data
        if (dataContext[resource] && dataContext[resource]?.data && dataContext[resource].data.find(item => +item.id === +id)) {
            setData(dataContext[resource].data.find(item => +item.id === +id));
            return;
        }

        setLoading(true);
        
        ItemFunctions.getItemDetails(id, resource).then(res => {
            if (res) {
                setData(res);
            }
            setLoading(false);
        })
  
    }, [id, resource, dataContext]);
    


    const handleDelete = async () => {
        
        const result = await ItemFunctions.handleDelete(id, resource, () => setLoading(true))

        if (result) {
            // delete from dataContext
            dataContext[resource].data = dataContext[resource].data.filter(item => +item.id !== +id);
            dataContext[resource].total = dataContext[resource].total - 1;
            navigate("/"+resource);
            setLoading(false);
        }
    }
    
    
    if (loading) {
        return <Loading/>;
    }


    return (
        <div className='viewWrapper'>
            
            <HeaderPage title={`${title} Details`} >
                <ButtonLink to={`/${resource}`} title="List" icon={<FormatListBulletedIcon/>} />
                <ButtonLink to={`/${resource}/${id}/edit`} title="Edit" icon={<EditIcon/>} />
                <Button variant="contained" color="primary" onClick={()=>handleDelete()} ><DeleteIcon/>Delete</Button>
            </HeaderPage>
            
            
            {columns.map((column, index) => {
                
                if (!data[column.field]) {
                    return null;
                }

                if (column.type === "image") {

                    if (data[column.field]) {
                        return <ImageFieldRow key={index} title={column.title} image={data[column.field]} />
                    }
                    return null;
                }

                if (column.renderCell) {
                    data[column.field] = column.renderCell(data);
                }

                return <TextFieldRow key={index} title={column.title} value={data[column.field]} />
                
            })}
            
            
        
        </div>
    );
}

export default ItemView;
