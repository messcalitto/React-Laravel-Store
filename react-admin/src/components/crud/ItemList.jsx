import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import * as ItemFunctions from '../../components/AxiosFunctions';
import HeaderPage from '../../components/HeaderPage';
import ButtonLink from '../../components/ButtonLink';
import AddIcon from '@mui/icons-material/Add';
import Loading from '../../components/Loading';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {Link} from 'react-router-dom';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { config } from '../../config';
import { DataContext } from '../../context/DataContext';


const ItemList = ({columns, resource, title, rowHeight=50, showAddButton=true}) => {

    let [loading, setLoading] = React.useState(false);
    let [isLoading, setIsLoading] = React.useState(false);

    const { dataContext} = React.useContext(DataContext);
    

    columns = [
        ...columns,
        { field: 'action', headerName: 'Action', renderCell: (params) => {
            return (
              <div className="userListAction">
                <Link to={`/${resource}/${params.row.id}/edit`}><ModeEditOutlineIcon /></Link>
                <Link to={`/${resource}/${params.row.id}`}><VisibilityIcon /></Link>
                <Link><DeleteIcon onClick={() => {handleDelete(params.row.id)}} /></Link>
              </div>
            )
        } },
    ];

   

    React.useEffect(() => {

            // Init dataContext with new resource if doesn't exist
        if (!(resource in dataContext)) {
            dataContext[resource] = {
                total: 0,
                data:null,
                page:0,
                pageSize: config.pageSize
            };
        }

        console.log("useEffect")
        if (!dataContext[resource] || !dataContext[resource].total) {

            setLoading(true);

            ItemFunctions.getItemList(resource, dataContext.page, dataContext.pageSize).then(res => {
                
                if (res) {
                    console.log("reload from server")
                    dataContext[resource] = {
                        total: res.total,
                        data: res.data,
                        page: 0,
                        pageSize: config.pageSize
                    };  
                }

                setLoading(false);
            })
        }

    }, [dataContext, resource]);

    

    const handleDelete = async (id) => {
        
      const result = await ItemFunctions.handleDelete(id, resource, () => setIsLoading(true))

      if (result) {
            // detete from dataContext
          dataContext[resource].data = dataContext[resource].data.filter(row => row.id !== id);
          dataContext[resource].total = dataContext[resource].total - 1;
      } 

      setIsLoading(false);
      
  }

    

    const handlePaginationModelChange = (newModel) => {

        setIsLoading(true);

        dataContext[resource] = {
                ...dataContext[resource],
                page: newModel.page,
                pageSize: newModel.pageSize
            }
        

        ItemFunctions.getItemList(resource, newModel.page, newModel.pageSize).then(res => {
            if (res) {
                dataContext[resource] = {
                        total: res.total,
                        data: res.data,
                        page: newModel.page,
                        pageSize: newModel.pageSize
                    }
            }
            setIsLoading(false);
        })
        
    };


    if (loading || !dataContext[resource] || !dataContext[resource].data) {
        return <Loading/>;
    }

    return (
        <div className = "ProductListWrapper">
            <HeaderPage title={`${title} List`} >
                {showAddButton && <ButtonLink to={`/${resource}/create`} title="New" icon={<AddIcon/>} />}
            </HeaderPage>

            <DataGrid rows={dataContext[resource].data} columns={columns}  rowHeight={rowHeight} getRowWidth={"100%"}
            
                pageSizeOptions={[5, 10, 25, 50]}

                rowCount={dataContext[resource].total}
                loading={isLoading}
                
                paginationModel={{ page: dataContext[resource].page, pageSize: dataContext[resource].pageSize }}
                paginationMode="server"
                onPaginationModelChange={handlePaginationModelChange}


            />
        </div>
    );
}

export default ItemList;
