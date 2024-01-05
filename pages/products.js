import { getProductInCollection } from '../lib/shopify'
import ProductList from '../components/ProductList'
import Head from 'next/head'

export default function Products({ products }) {
  return (
    <div className="">
      <Head>
        <title>Products - Forensic Drone</title>
      </Head>
      <ProductList products={products} />
    </div>
  )
}

export async function getStaticProps() {
  const products = await getProductInCollection()

  return {
    props: { products }, // will be passed to the page component as props
  }
}