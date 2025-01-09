import React from 'react';
import Loading from '../components/Loading.tsx';
import OrderItem from '../components/orders/OrderItem.tsx';
import HeaderItem from '../components/orders/HeaderItem.tsx';
import GetOrders from '../components/orders/GetOrders.tsx';


const Orders = () => {

    const { orders,  isLoading } = GetOrders();
   
    if (isLoading) return <Loading />;

    type Order = {
        id: number;
        created_at: string;
        status: string;
    }

    return (
        
  <div className="container h-100 py-5">
        <div className="table-responsive">
          <table className="table">
            
            <TableHeader />

            <tbody>
            
            {orders?.length === 0 && <NoOrders />}
            
            {orders?.map((item:Order) => 
              <OrderItem key={item.id} item={item} />
            )}

            </tbody>
          </table>
        </div>
  </div>

    );
}

export default Orders;

const TableHeader = () => {
    return (
        <thead>
            <tr>
            <HeaderItem title="My Orders" />
            <HeaderItem title="Ordered At" />
            <HeaderItem title="Status" className="text-end pe-4"/>
            </tr>
        </thead>
    )
}

const NoOrders = () => {
    return (
        <tr>
            <td colSpan={3}>
            <h5 className="text-center my-4">You don't have any orders yet</h5>
            </td>
        </tr>
    )
}