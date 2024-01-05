import { getProductInCollection } from '../lib/shopify'
import ProductList from '../components/ProductList'
import Hero from "../components/Hero"
import Head from 'next/head'
import Newsletter from "../components/Newsletter"

export default function Home({ products }) {

  return (
    <div className="">
      <Head>
        <title>Forensic Drone</title>
      </Head>
      <Hero />
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
