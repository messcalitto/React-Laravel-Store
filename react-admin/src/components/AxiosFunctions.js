import axios from 'axios'
import  Swal from 'sweetalert2';
import { config } from '../config';

axios.defaults.baseURL = config.remoteHost;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.interceptors.request.use(  config => {
    config.headers['Authorization'] = 'Bearer '+ localStorage.getItem('auth_token');
    return config;
});



export const  login = async user => {

    return await axios
        .post(
            'api/login',
            {
                username: user.username,
                password: user.password
            }
        )
        .then(response => {
            // console.log(response);
            
            localStorage.setItem('auth_token', response.data.token)
            localStorage.setItem('username', response.data.username)
    
            return response.data
        })
        .catch(error => {
            ShowErrorMsg(error.message);
        });
}



export const Logout = async () => {

    return await axios
        .get('api/logout')
        .then(response => {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('username');
            return response.data;
        })
        .catch(error => {
            ShowErrorMsg(error.message);
        });
}

export const getItemList = async (resource, page=0, pageSize=0) => {

    if (!localStorage.getItem('auth_token')) return false;

    try {
        const res = await axios.get('api/'+resource, { 
            params: {
                page: page+1,
                pageSize: pageSize
            }
        });
        // console.log(res.data)
        return res.data;
    } catch (error) {
        console.log(error)
        if (error.status === 401) {
            // authorization error
            CleanLoginData();
            return false;
        } 
        
        if (error.response?.data.message) {
            ShowErrorMsg(error.response?.data.message);
        } else if ( error.message ) {
            ShowErrorMsg(error.message);
        } else {
            ShowErrorMsg("Something went wrong");
        }
        return false
    };
}

export const getCategories = async () => {
    
    if (!localStorage.getItem('auth_token')) return false;

    try {
        const res = await axios.get('api/categories') ;
        // console.log(res)
        return res.data;
    } catch (error) {
        
        if (error.status === 401) {
            // authorization error
            CleanLoginData();
            return false;
        } 
        if (error.response?.data.message) {
            ShowErrorMsg(error.response?.data.message);
        } else if ( error.message ) {
            ShowErrorMsg(error.message);
        } else {
            ShowErrorMsg("Something went wrong");
        }
        return false;
    };
}

export const getItemDetails = async (id, resource) => {

    if (!localStorage.getItem('auth_token')) return false;

    try {
        const response = await axios.get('api/'+resource+'/'+id);
        // console.log(response.data)
        return response.data
    } catch (error) {
            
        if (error.status === 401) {
            // authorization error
            CleanLoginData();
            return false;
        } 
        if (error.response?.data.message) {
            ShowErrorMsg(error.response?.data.message);
        } else if ( error.message ) {
            ShowErrorMsg(error.message);
        } else {
            ShowErrorMsg("Something went wrong");
        }
        return false;
    };
}

export const updateItem = async (id, data, resource) => {
    
    if (!localStorage.getItem('auth_token')) return false;

    try {
        const response = await axios.post('api/'+resource+'/'+id, data);
        return response.data
    } catch (error) {

        if (error.status === 401) {
            // authorization error
            CleanLoginData();
            return false;
        } 
        if (error.response?.data.message) {
            ShowErrorMsg(error.response?.data.message);
        } else if ( error.message ) {
            ShowErrorMsg(error.message);
        } else {
            ShowErrorMsg("Something went wrong");
        }

        return false;
    };
}

export const createItem = async (data, resource) => {
    
    if (!localStorage.getItem('auth_token')) return false;

    try {
        const response = await axios.post('api/'+resource, data);
        return response.data
    } catch (error) {
                
        if (error.status === 401) {
            // authorization error
            CleanLoginData();
            return false;
        } 
        if (error.response?.data.message) {
            ShowErrorMsg(error.response?.data.message);
        } else if ( error.message ) {
            ShowErrorMsg(error.message);
        } else {
            ShowErrorMsg("Something went wrong");
        }
        return false;
    };
}

export const deleteItem = async (id, resource) => {

    if (!localStorage.getItem('auth_token')) return false;
    
    try {
        // const response = await axios.delete('api/'+resource+'/'+id);
        const response = await axios.get('api/'+resource+'/'+id+"/delete");
        return response.data
    } catch (error) {
                
        if (error.status === 401) {
            // authorization error
            CleanLoginData();
            return false;
        }     

        if (error.response?.data.message) {
            ShowErrorMsg(error.response?.data.message);
        } else if ( error.message ) {
            ShowErrorMsg(error.message);
        } else {
            ShowErrorMsg("Something went wrong");
        }
        return false;
    };
}



export const ItemDeletedMsg = (item_name) => {
    Swal.fire({
        title: 'Deleted!',
        text: item_name+' deleted successfully!',
        icon: 'success',
        confirmButtonText: 'Ok'
    })
}

export const ConfirmItemDelete = async (item_name) => {

    return Swal.fire({
            title: "Are you sure?" , 
            text: "Are you sure you want to delete this "+item_name+"?", 
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            showConfirmButton: true,
            showCancelButton: true,
        })
}

const CleanLoginData = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
}

export const handleDelete = (id, api_resource, callback) => {

    return ConfirmItemDelete(api_resource).then((result) => {

        if (result.isConfirmed) {
            
            callback();
                
            return deleteItem(id, api_resource).then(res => {

                if (res) {
                    ItemDeletedMsg(capitalize(api_resource));
                    return true;
                }
            })
        }

    })
    
}

export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


export const ShowErrorMsg = (msg) => {
    Swal.fire({
        title: 'Oops...',
        text: msg,
        icon: 'error',
        confirmButtonText: 'Ok'
    })
}