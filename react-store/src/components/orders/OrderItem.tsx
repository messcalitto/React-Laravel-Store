import React from 'react';
import { formatDate } from '../AxiosFunctions.tsx';

const OrderItem = ({item, }) => {
    return (
        <tr>
            <th scope="row">
                <div className="d-flex align-items-center">
                <img src={`/uploads/${item.image}`} className="img-fluid rounded-3"
                    style={{maxWidth: '120px'}} alt="" />
                <div className="flex-column ms-4">
                    <p className="mb-2">{item.title}</p>
                    <p className="mb-0 fw-normal">{item.quantity} x ${item.price}</p>
                </div>
                </div>
            </th>
            
            <td className="align-middle">
                <div className="d-flex flex-row">
                {formatDate(item.created_at)}
                </div>
            </td>
            <td className="align-middle text-end pe-4">
                <p className="mb-0" style={{fontWeight: '500'}}>{item.status}</p>
            </td>
        </tr>
    );
}

export default OrderItem;
