import React, {useState, useEffect, useActionState} from 'react';
import ShippingItem from '../components/shipping/ShippingItem.tsx';
import { useQuery } from '@tanstack/react-query';
import {axGetShipping, axPlaceOrder, Order} from '../components/AxiosFunctions.tsx';
import { PulseLoader } from 'react-spinners';
import Loading from '../components/Loading.tsx';
import { useNavigate } from 'react-router-dom';


const Shipping = () => {

    const navigate = useNavigate();

    const [order, setOrder] = useState({name:'', email:'', phone:'', address:'', city:''});
    const [errorMsg, setErrorMsg] = useState('');

    const { data, isLoading } = useQuery({
        queryKey: ['shipping', localStorage.getItem('token')],
        queryFn:  async () => await axGetShipping(),
        staleTime: 0
    })
    
    useEffect(() => {
        if (data) {
            setOrder(data.data);
        }
    }, [data]);

   


    interface Response {
        status: string;
    }

    const handlePost = async (_, formData: FormData): Promise<boolean> => {
        
        const data: Order = {
            name: formData.get('name')?.toString()??'',
            email_field: formData.get('email')?.toString()??'',
            phone: formData.get('phone')?.toString()??'',
            address: formData.get('address')?.toString()??'',
            city: formData.get('city')?.toString()??'',
        }

        return await axPlaceOrder(data)
            .then((res: Response) => {
                if (res.status === 'success') {
                    navigate('/checkout');
                }
                return false;
            })
            .catch((err: string) => {
                setErrorMsg(err);
                return false;
            })
    }
  
    const [, formAction, isPending] = useActionState(handlePost, null);
    
    if (isLoading) return <Loading/>

    return (

    <section className="h-100 h-custom">
    <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
                <strong>Shipping information</strong><br/><br/>
                <form action={formAction}>
                    
                    {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

                    <div className="row col-md-6">
                        <ShippingItem title="Name" name="name" defaultValue={order?.name}/>
                        <ShippingItem title="Email" name="email" defaultValue={order?.email}/>
                        <ShippingItem title="Phone" name="phone" defaultValue={order?.phone}/>
                        <ShippingItem title="Address" name="address" defaultValue={order?.address}/>
                        <ShippingItem title="City" name="city" defaultValue={order?.city}/>
                    </div>

                    <div className="col-md-6 text-end">
                        {isPending ? <PulseLoader color="#0d6efd" size={12} className="ml-4 mt-1" /> :
                        <button type="submit" className="btn btn-primary bg-danger border-danger mx-4">Place Order</button>
                        }
                    </div>

                </form>

            </div>
        </div>
    </div>
    </section>
        
    );
}

export default Shipping;
