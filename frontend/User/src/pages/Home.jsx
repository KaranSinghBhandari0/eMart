import React, { useContext, useEffect } from 'react';
import Carousel from '../components/Carousel';
import ChooseCategory from '../components/ChooseCategory'
import ProductCard from '../components/ProductCard';

import { ProductContext } from '../context/ProductContext';

export default function Home() {
  const {products, getAllProducts} = useContext(ProductContext);

  useEffect(()=> {
    getAllProducts();
  }, [])

  return (
    <div className="max-w-7xl mx-auto py-3">
      <Carousel/>

      <ChooseCategory/>
      
      <div>
        <img src="/Sale.png" alt="" className='w-20 h-20 mt-8' />
        <div className="px-2 py-4 w-full mx-auto grid gap-8 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]" >
          {
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          }
        </div>
      </div>
      
    </div>
  );
}
