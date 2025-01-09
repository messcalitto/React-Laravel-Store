import React, { useState } from 'react';
import './home.css'
import Product from '../components/Product.tsx';
import { getItemList } from '../components/AxiosFunctions.tsx';
import Loading from '../components/Loading.tsx';
import { useQuery } from '@tanstack/react-query';
import Paging from '../components/Paging.tsx';
import SearchBox from '../components/SearchBox.tsx';


const Home = () => {

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const ReloadData = async (search: string, page: number) => {
        
        const res = await getItemList('products', search, page)
        if (res){
            return {
                data: res.data.data, 
                total: res.data.total, 
                current_page: res.data.current_page
            };
        }
        return {data:[]};
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ['products', search, page],
        queryFn: () => ReloadData(search, page),
        staleTime: 1000 * 60 * 5, // 5 minutes
    })

    const handleSearch = (searchString: string) => {
        setPage(1);
        setSearch(searchString);
    }
    
    if (isLoading) return <Loading />
    if (error) return <div>Error</div>

    type ProductData = {
        id: number;
        title: string,
        name: string;
        price: number;
        discount_price: number,
        image: string[];
    };

    return (
        <section className="product_section layout_padding">
         <div className="container">
            
            <SearchBox search={search} handleSearch={handleSearch} />

            <div className="row">
                
                {data?.data.length === 0 && <NoProductsFound />}

                {data?.data.map((product:ProductData) => (
                    <Product {...product} key={product.id} />
                ))}
                
                <Paging setPage={setPage} current_page={data?.current_page} total={data?.total} addClass={'mt-5'}/>

            </div>
           
         </div>
      </section>  

    );
}

export default Home;

const NoProductsFound = () => {
    return (
        <div className="col-md-12 text-center my-5">
        <h3>No products found</h3>
    </div>
    );
}