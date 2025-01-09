import axios from 'axios'
import  Swal from 'sweetalert2';
import { config } from '../config';

axios.defaults.baseURL = config.remoteHost;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.interceptors.request.use(  config => {
    config.headers['Authorization'] = 'Bearer '+ localStorage.getItem('token');
    return config;
});



export const  login = async user => {

    return await axios
        .post(
            'api/userlogin',
            {
                email: user.email,
                password: user.password
            }
        )
        .then(response => {
            // console.log(response);
            return response.data
        })
        .catch(error => {

            if (error.response?.data.message) {
                throw (error.response?.data.message);
            } else if ( error.message ) {
                throw  (error.message);
            }
            
            throw new Error("Something went wrong");
        });
}



export const Logout = async () => {

    return await axios
        .get('api/userlogout')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            ShowErrorMsg(error.message);
        });
}

export const getItemList = async (resource:string, search='', page=0, pageSize=0) => {

    try {
        const res = await axios.get('api/'+resource, { 
            params: {
                search: search,
                page: page,
                pageSize: pageSize || config.pageSize
            }
        });
        
        return res;

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
    
    if (!localStorage.getItem('token')) return false;

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

export const getItemDetails = async (id: number, resource: string) => {

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


export const axCartList = async () => {
    
    if (!localStorage.getItem('token')) return false;

    try {
        const response = await axios.get('api/cart/');
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

export const axCartUpdate = async (id: number, quantity: number) => {
    
    if (!localStorage.getItem('token')) return false;

    try {
        const response = await axios.get('api/cart_update/'+id+'/'+quantity);
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

export const axCartRemove = async (id: number) => {
    
    if (!localStorage.getItem('token')) return false;

    try {
        const response = await axios.get('api/cart_remove/'+id);
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

export const axGetShipping = async () => {
    
    if (!localStorage.getItem('token')) return false;

    try {
        const response = await axios.get('api/shipping');
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

export const addToCart = async (id: number, quantity: number) => {
    
    if (!localStorage.getItem('token')) return false;

    const data = {
        quantity: quantity
    }
    
    try {
        const response = await axios.post('api/add_cart/'+id, data);
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

export type Order = {
    name: string,
    email_field: string,
    phone: string,
    address: string,
    city: string,
}

export const axPlaceOrder = async (data: Order) => {
    
    if (!localStorage.getItem('token')) return false;
    
    try {
        const response = await axios.post('api/place_order', data);
        return response.data
    } catch (error) {
                
        if (error.status === 401) {
            // authorization error
            CleanLoginData();
            return false;
        } 
        
        if (error.response?.data.message) {
            throw (error.response?.data.message);
        } else if ( error.message ) {
            throw  (error.message);
        }
        
        throw new Error("Something went wrong");
    };
}

export const axCreatePaymentIntent = async () => {
    
    if (!localStorage.getItem('token')) return false;
    
    try {
        const response = await axios.get('api/payment_intent');
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

export type PaymentData = {
    amount: number,
    id: string,
    paid: boolean
};

export const axPaymentDone = async (data: PaymentData) => {
    
    if (!localStorage.getItem('token')) return false;
    
    try {
        const response = await axios.post('api/paid', data);
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

export const axOrderList = async () => {
    
    if (!localStorage.getItem('token')) return false;
    
    try {
        const response = await axios.get('api/order_list');
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

export const deleteItem = async (id: number, resource: string) => {

    if (!localStorage.getItem('token')) return false;
    
    try {
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

export const axProfileEdit = async () => {

    if (!localStorage.getItem('token')) return false;
    
    try {
        const response = await axios.get('api/profile_edit');
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

export type ProfileData = {
    name: string,
    email: string,
}

export const axProfileUpdate = async (data: ProfileData) => {

    if (!localStorage.getItem('token')) return false;
    
    try {
        const response = await axios.post('api/profile_update', data);
        return response.data
    } catch (error) {
                
        if (error.status === 401) {
            // authorization error
            CleanLoginData();
            return false;
        }     

        if (error.response?.data.message) {
            throw (error.response?.data.message);
        } else if ( error.message ) {
            throw  (error.message);
        }
        
        throw new Error("Something went wrong");
        
    };
}

export type PasswordData = {
    current_password: string,
    password: string,
    password_confirmation: string,
}

export const axPasswordUpdate = async (data: PasswordData) => {

    if (!localStorage.getItem('token')) return false;
    
    try {
        const response = await axios.post('api/password_update', data);
        return response.data
    } catch (error) {
                
        if (error.status === 401) {
            // authorization error
            CleanLoginData();
            return false;
        }     

        if (error.response?.data.message) {
            throw (error.response?.data.message);
        } else if ( error.message ) {
            throw  (error.message);
        }
        
        throw new Error("Something went wrong");
        
    };
}

export type RegisterData = {
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
}

export const axRegister = async (data: RegisterData) => {

    try {
        const response = await axios.post('api/register', data);
        return response.data
    } catch (error) {
                
        if (error.status === 401) {
            // authorization error
            CleanLoginData();
            return false;
        }     

        if (error.response?.data.message) {
            throw (error.response?.data.message);
        } else if ( error.message ) {
            throw  (error.message);
        }
        
        throw new Error("Something went wrong");
        
    };
}

export type ProfileDeleteData = {
    password: string,
}

export const axProfileDestroy = async (data: ProfileDeleteData) => {
    
    if (!localStorage.getItem('token')) return false;

    try {
        const response = await axios.post('api/profile_destroy', data);
        return response.data
    } catch (error) {
                
        if (error.status === 401) {
            // authorization error
            CleanLoginData();
            return false;
        }     

        if (error.response?.data.message) {
            throw (error.response?.data.message);
        } else if ( error.message ) {
            throw  (error.message);
        }
        
        throw new Error("Something went wrong");
        
    };
}

export type PasswordResetData = {
    email: string,
}

export const axPasswordReset = async (data: PasswordResetData) => {
    
    try {
        const response = await axios.post('api/password_reset', data);
        return response.data
    } catch (error) {
                
        if (error.status === 401) {
            // authorization error
            CleanLoginData();
            return false;
        }     

        if (error.response?.data.message) {
            throw (error.response?.data.message);
        } else if ( error.message ) {
            throw  (error.message);
        }
        
        throw new Error("Something went wrong");
        
    };
}


export const ItemDeletedMsg = (item_name: string) => {
    Swal.fire({
        title: 'Deleted!',
        text: item_name+' deleted successfully!',
        icon: 'success',
        confirmButtonText: 'Ok'
    })
}

export const ConfirmItemDelete = async (item_name: string) => {

    return Swal.fire({
            title: "Are you sure?" , 
            text: "Are you sure you want to delete this "+item_name+"?", 
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            showConfirmButton: true,
            showCancelButton: true,
            customClass: {
                confirmButton: 'btn btn-danger fw-bold px-4 py-2',
                cancelButton: 'btn btn-outline-secondary fw-bold px-4 py-2'
            }
        })
}

const CleanLoginData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
}

export const handleDelete = (id: number, api_resource: string, callback: Function) => {

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

export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


export const ShowErrorMsg = (msg: string) => {
    Swal.fire({
        title: 'Oops...',
        text: msg,
        icon: 'error',
        confirmButtonText: 'Ok'
    })
}

export const isLoggedIn = () => {
    return localStorage.getItem('token') ? true : false;
}



export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};