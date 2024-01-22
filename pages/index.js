import { getProductInCollection } from '../lib/shopify'
import Hero from "../components/Hero"
import Head from 'next/head'

export default function Home({ products }) {

  return (
    <div className="">
      <Head>
        <title>Forensic Drone</title>
      </Head>
      <Hero />
    </div>
  )
}

export async function getStaticProps() {
  const products = await getProductInCollection()

  return {
    props: { products },
  }
}
