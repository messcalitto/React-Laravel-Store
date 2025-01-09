import { axCartList } from '../AxiosFunctions.tsx';
import { useQuery } from '@tanstack/react-query';
import {useContext} from 'react';
import { DataContext } from '../../context/DataContext';


const GetCartItems = () => {
    const { dataContext } = useContext(DataContext);

    const { data, error, isLoading } = useQuery({
        queryKey: ['cart', localStorage.getItem('token')],
        queryFn: async () => {
            if (dataContext.cartItems.length) {
                return dataContext;
            }
            const res = await axCartList();
            if (res) {
                dataContext.cartItems = res.data
            }
            return dataContext;
        },
        staleTime: 0
    });

    return { cart:data, error, isLoading };
};

export default GetCartItems;

