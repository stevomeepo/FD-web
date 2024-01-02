import { Inter } from 'next/font/google'
import { getProductInCollection } from '../lib/shopify'
import ProductList from '../components/ProductList'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ products }) {
  console.log(products)

  return (
    <div className="text-3xl">
      <ProductList products={products} />
    </div>
  )
}

export async function getStaticProps() {
  const products = await getProductInCollection()

  return {
    props: { products },
  }
}
