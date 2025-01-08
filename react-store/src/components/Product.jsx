import React, {useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart } from './AxiosFunctions';
import { DataContext } from '../context/DataContext';
import { PulseLoader } from 'react-spinners';


const Product = ({id, title, price, discount_price, image}) => {
    return (
        <div className="col-sm-6 col-md-4 col-lg-4">
            <div className="box"  style={{height: '350px'}}>
                <div className="option_container">
                <div className="options">
                    
                    <ProductDetailsButton id={id} />

                    <AddToCart id={id} />
                    
                </div>
                </div>

                <ProductImage image={image} />

                <ProductDetails title={title} price={price} discount_price={discount_price} />
            </div>
        </div>
    );
}

export default Product;

const AddToCart = ({id}) => {
    const navigate = useNavigate();
    const {dataContext} = useContext(DataContext);
    const [isPending, setIsPending] = React.useState(false);
    
    const handleAddToCart = async () => {
        
        if (!localStorage.getItem('token')) {
            navigate('/login');
            return;
        }
        setIsPending(true);
        const res = await addToCart(id, 1);

        if (res?.status === 'success') {
            dataContext.cartItems = res.data;
            navigate('/cart');
        }
        setIsPending(false);
    }

    return (
    <form>
        {isPending ?
        <PulseLoader color="#0d6efd" size={12} className="ml-4 mt-1" />
        :
        <input 
            type="button" 
            onClick={handleAddToCart} 
            value="Buy Now" 
            className="option2" 
            style={{borderRadius: '30px', width:'160px'}} />  
        }
    </form>
    )
}

const ProductDetailsButton = ({id}) => {
    return (
    <Link to={`/product/${id}`} className="option1">
        Product Details
    </Link>
    )
}

const ProductImage = ({image}) => {
    return (
        <div className="img-box">
            <img src={`uploads/${image[0]}`} alt=""/>
        </div>
    )
}

const ProductDetails = ({title, price, discount_price}) => {
    return (
        <div className="detail-box">

            <h5>{title}</h5>

            <h6>
                <span style={{color:'green'}}>
                    ${discount_price ? discount_price : price}
                </span>
                
                <br/>

                <span style={{ color: 'red'}}>
                   <del> {discount_price ? '$'+price : ''} </del>
                </span>
            </h6>
        </div>
)

    
}