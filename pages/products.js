import { useState, useEffect } from 'react'
import { getProductInCollection } from '../lib/shopify'
import ProductList from '../components/ProductList'
import SearchBar from '../components/SearchBar'
import Head from 'next/head'

export default function Products({ products: initialProducts }) {
    const [filteredProducts, setFilteredProducts] = useState(initialProducts || []);

    const handleSearch = (searchTerm) => {
        if (!searchTerm.trim()) {
            // Use initialProducts here instead of products
            setFilteredProducts(initialProducts);
            return;
        }
        // Also use initialProducts here
        setFilteredProducts(
            initialProducts.filter((product) =>
                product.node && product.node.title && product.node.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    };

    useEffect(() => {
        // And here, make sure to use initialProducts
        setFilteredProducts(initialProducts);
    }, [initialProducts]); // Make sure to depend on initialProducts

    return (
        <div>
            <Head>
                <title>Products - Forensic Drone</title>
            </Head>
            <SearchBar onSearch={handleSearch} />
            <ProductList products={filteredProducts} />
        </div>
    );
}

export async function getStaticProps() {
  const products = await getProductInCollection()

  return {
    props: { products }, // will be passed to the page component as props
  }
}