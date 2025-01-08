import React from 'react';
import Loading from '../components/Loading';
import OrderItem from '../components/orders/OrderItem';
import HeaderItem from '../components/orders/HeaderItem';
import GetOrders from '../components/orders/GetOrders';


const Orders = () => {

    const { orders, error, isLoading } = GetOrders();
   
    if (isLoading) return <Loading />;


    return (
        
  <div className="container h-100 py-5">
        <div className="table-responsive">
          <table className="table">
            
            <TableHeader />

            <tbody>
            
            {orders?.length === 0 && <NoOrders />}
            
            {orders?.map(item => 
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
            <td colSpan="3">
            <h5 className="text-center my-4">You don't have any orders yet</h5>
            </td>
        </tr>
    )
}