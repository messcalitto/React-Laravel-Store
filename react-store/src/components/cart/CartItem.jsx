import React from 'react';
import {axCartUpdate} from '../AxiosFunctions';
import {ConfirmItemDelete, axCartRemove} from '../AxiosFunctions';
import { PulseLoader } from 'react-spinners';


const CartItem = ({item, reCalculateTotal, deleteCurrentItem}) => {
    const [quantity, setQuantity] = React.useState(item.quantity);
    const [totalPrice, setTotalPrice] = React.useState(item.price * quantity);
    const [isLoading, setIsLoading] = React.useState(false);
    
    const increaseQuantity = () => {
        const newQuantity = +quantity + 1;
            setQuantity(newQuantity);
            setTotalPrice(newQuantity * item.price);
            reCalculateTotal(item.id, newQuantity);
            axCartUpdate(item.id, newQuantity);
    }
    
    const decreaseQuantity = () => {
        if (quantity > 1) {
            const newQuantity = +quantity - 1;
            setQuantity(newQuantity);
            setTotalPrice(newQuantity * item.price);
            reCalculateTotal(item.id, newQuantity);
            axCartUpdate(item.id, newQuantity);
        } 
        else {
            ConfirmItemDelete('product').then((result) => {
                if (result.isConfirmed) {
                    setIsLoading(true);
                    axCartRemove(item.id).then(res => {
                        deleteCurrentItem(item.id);
                    });
                }
            });
        }

    }

    return (
        <tr>
            <th scope="row">
            <div className="d-flex align-items-center">
                <img src={`/uploads/${item.image}`} className="img-fluid rounded-3 cart-img"
                    alt="Book" />
                <div className="flex-column ms-4">
                <p className="mb-2">{item.product_title}</p>
                <p className="mb-0 fw-normal">$<span>{item.price}</span></p>
                </div>
            </div>
            </th>
        
            <td className="align-middle">
            
            {isLoading ?  <PulseLoader color="#0d6efd" size={12} className="ml-4 mt-1" /> :
            <div className="d-flex flex-row">
                <button className="btn btn-link px-2 btn-minus"
                onClick={decreaseQuantity}>
                <i className="fas fa-minus"></i>
                </button>

                <input min="0" readOnly name="quantity" value={quantity} type="number"
                className="form-control form-control-sm rounded quantity-input" 
                 />

                <button className="btn btn-link px-2 btn-plus"
                onClick={increaseQuantity}>
                <i className="fas fa-plus"></i>
                </button>
            </div>
            }

            </td>
            <td className="align-middle text-end pe-4">
            <p className="mb-0" >
                $<span className="totalprice">
                    {totalPrice}
                </span>
            </p>
            </td>
        </tr>
    );
}

export default CartItem;
