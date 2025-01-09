import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { axOrderList } from '../AxiosFunctions.tsx';

const GetOrders = () => {
    const [orders, setOrders] = React.useState([]);

    const { data, error, isLoading } = useQuery({
        queryKey: ['orders', localStorage.getItem('token')],
        queryFn: async () => {           
            const res = await axOrderList();
            return { data: res.data };
        },
        staleTime: 0
    });

    React.useEffect(() => {
        if (data) {
            setOrders(data.data);
        }
    }, [data]);

    return { orders, error, isLoading };
}

export default GetOrders;
