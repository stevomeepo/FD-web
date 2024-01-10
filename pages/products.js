import { useState, useEffect } from 'react'
import { getProductInCollection } from '../lib/shopify'
import ProductList from '../components/ProductList'
import SearchBar from '../components/SearchBar'
import Head from 'next/head'

export default function Products({ products }) {
    const [filteredProducts, setFilteredProducts] = useState(products);

    const handleSearch = (searchTerm) => {
        setFilteredProducts(
            products.filter((product) =>
            product.node && product.node.title && product.node.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        };

        useEffect(() => {
            setFilteredProducts(products);
        }, [products]);

    return (
        <div className="">
        <Head>
            <title>Products - Forensic Drone</title>
        </Head>
        <SearchBar onSearch={handleSearch} />
        <ProductList products={filteredProducts} />
        </div>
    )
}

export async function getStaticProps() {
  const products = await getProductInCollection()

  return {
    props: { products }, // will be passed to the page component as props
  }
}