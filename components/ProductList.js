import React, { useEffect, useState } from 'react';
import ProductCard from "./ProductCard";
import { getAllProducts } from "../lib/shopify";

const ProductList = () => {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const updatedProducts = await getAllProducts();
          console.log('Updated Products:', updatedProducts);
          if (!updatedProducts || !Array.isArray(updatedProducts)) {
            console.error('Products are not in an array format:', updatedProducts);
          } else if (updatedProducts.length > 0 && !updatedProducts[0].node) {
            console.error('First product does not have a node property:', updatedProducts[0]);
          }
          setProducts(updatedProducts);
        } catch (error) {
          console.error("Failed to fetch products:", error);
        }
      };
  
      fetchProducts();
    }, []);
  
    return (
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold text-black mb-6">
            Products
          </h2>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product, index) => {
              // Check if the product has the expected structure
              if (!product.node || !product.node.id) {
                console.error('Product structure is not as expected:', product);
                return null; // Skip rendering this product
              }
              return (
                <ProductCard key={product.node.id} product={product} />
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductList;
