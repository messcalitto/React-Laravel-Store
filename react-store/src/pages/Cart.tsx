import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading.tsx';
import CartItem from '../components/cart/CartItem.tsx';
import PriceItem from '../components/cart/PriceItem.tsx';
import { useNavigate } from 'react-router-dom';
import GetCartItems from '../components/cart/GetCartItems.tsx';


const Cart = () => {
  const navigate = useNavigate();

    const shipping = 10;
    const { cart, isLoading } = GetCartItems();

    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [totalTax, setTotalTax] = useState(0);

    type CartItem = {
        id: number,
        name: string,
        price: number,
        quantity: number,
        image: string
    };

    const setTotalPrices = () => {
        let newSubtotal = 0;
        
        cart?.cartItems.forEach((item: CartItem) => {
            newSubtotal += item.price * item.quantity;
        });
        setSubTotal(newSubtotal);
        setTotal(newSubtotal + shipping);
        setTotalTax(newSubtotal + shipping);
    };
    

    const reCalculateTotal = (id: number, quantity: number) => {
        cart.cartItems = cart.cartItems.map((item: CartItem) => {
            if (item.id === id) {
                return {
                    ...item,
                    quantity: quantity
                };
            } else {
                return item;
            }
        });
        setTotalPrices();
    };

    const handleDeleteItem = async (id: number) => {
        cart.cartItems = cart.cartItems.filter((item: CartItem) => item.id !== id);
        setTotalPrices();
    };

    useEffect(() => {
        setTotalPrices();
    });

    if (isLoading) return <Loading />;

    return (

        <div className="container h-100 py-5">
          <div className="">
              <table className="table table-responsive">
                  <thead>
                      <tr>
                          <th scope="col" className="h5">Shopping Bag</th>
                          <th scope="col">Quantity</th>
                          <th scope="col" className="text-end pe-4">Total Price</th>
                      </tr>
                  </thead>
                  <tbody>
                      {cart?.cartItems.length === 0 &&
                          <tr>
                              <td colSpan={3}>
                                  <h5 className="text-center my-4">Your shopping bag is empty</h5>
                              </td>
                          </tr>
                      }
                      {cart?.cartItems.length > 0 && cart?.cartItems.map(item => (
                          <CartItem key={item.id} item={item} reCalculateTotal={reCalculateTotal} deleteCurrentItem={handleDeleteItem} />
                      ))}
                  </tbody>
              </table>
          </div>
          {cart?.cartItems.length > 0 &&
              <div className="mb-5 mb-lg-0 d-flex justify-content-end">
                  <div className="col-lg-4 col-xl-3">
                      <PriceItem title="Subtotal" value={subTotal} addClass="lh-lg" />
                      <PriceItem title="Shipping" value={shipping} addClass="lh-lg" />
                      <hr className="my-4" />
                      <PriceItem title="Total (tax included)" value={totalTax} addClass="lh-lg mb-4" />
                      <button onClick={() => navigate('/shipping')} type="button" className="btn btn-primary btn-block btn-lg bg-danger border-danger">
                          <PriceItem title="Checkout" value={total} />
                      </button>
                  </div>
              </div>
          }
      </div>



    );
};

export default Cart;
