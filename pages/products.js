import { useState, useEffect } from 'react'
import { getProductInCollection } from '../lib/shopify'
import ProductList from '../components/ProductList'
import SearchBar from '../components/SearchBar'
import Head from 'next/head'

export default function Products({ products: initialProducts }) {
    const [filteredProducts, setFilteredProducts] = useState(initialProducts || []);

    const handleSearch = (searchTerm) => {
        if (!searchTerm.trim()) {
            setFilteredProducts(initialProducts);
            return;
        }
        setFilteredProducts(
            initialProducts.filter((product) =>
                product.node && product.node.title && product.node.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    };

    useEffect(() => {
        setFilteredProducts(initialProducts);
    }, [initialProducts]);

    return (
        <div>
            <Head>
                <title>Products - Forensic Drone</title>
            </Head>
            <SearchBar onSearch={handleSearch} />
            <div className="pt-10 sm:pt-10">
                <ProductList products={filteredProducts} />
            </div>
        </div>
    );
}

export async function getStaticProps() {
  const products = await getProductInCollection()

  return {
    props: { products },
  }
}