import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getItemDetails, isLoggedIn } from '../components/AxiosFunctions';
import Loading from '../components/Loading';
import { config } from '../config';
import { useActionState } from "react";
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../components/AxiosFunctions';
import { PulseLoader } from 'react-spinners';
import {useContext} from 'react';
import { DataContext } from '../context/DataContext';


const ProductDetails = () => {

   const { id } = useParams()
   const navigate = useNavigate();
   const { dataContext } = useContext(DataContext);

   const { data, error, isLoading } = useQuery({
         queryKey: ['products', id],
         queryFn: async () => {
            const res = await getItemDetails(id, 'products')
            if (res) {
               return {data:res};
            }
            return null;
         },
         staleTime: 1000 * 60 * 5, // 5 minutes
   })


   const handleAddToCart = async (previousState, formData) => {
      const quantity = formData.get('quantity')
      return await addToCart(id, quantity);
   }

   const [postRes, formAction, isPending] = useActionState(handleAddToCart, '');

   useEffect(() => {
      if (postRes?.status === 'success') {
         dataContext.cartItems = postRes.data;
         navigate('/cart');
      }
   }, [postRes]);
   
   const handleOnClick = async (e) => {
      
      if (!isLoggedIn()){
         e.preventDefault();
         navigate('/login');
      } 
   }

   if (isLoading) return <Loading/>
   if (error) return <div>Error</div>

   return (
    
    <div className="col-sm-6 col-md-4 col-lg-4 mx-auto" >
      <div className="box">
         
         <div className="img-box mb-4" >
            <img src={`${config.remoteHost}/uploads/${data?.data.image[0]}`} alt=""/>
         </div>
         <div className="detail-box mb-4">
            <h5>
            {data?.data.title}
            </h5>
            <br/>

                <h6>
                  Discount price: ${data?.data.discount_price}<br/>
               
                  Normal price:
                <span className="text-decoration-line-through text-danger">
                  ${data?.data.price}
               </span>
            </h6>
                <br/>
            <h6>
               {data?.data.description}
            
            <br/><br/>
            </h6>
               Available: {data?.data.quantity}
            
            <br/><br/>
            
            <form action={formAction} >
                  <h6>
                     Quantity: <input type="number" name="quantity" defaultValue="1" min="1" max="12" style={{width: '100px'}}/>    
                  </h6>
                  
                  {isPending?  <PulseLoader color="#0d6efd" size={12} className="ml-4 mt-1" /> :
                  <input type="submit" onClick={handleOnClick}  value="Add to Cart" className="btn btn-primary m-0"/>  
                  }
                      
            </form>
         
        </div>
      </div>
   </div>
   
    );
}

export default ProductDetails;

