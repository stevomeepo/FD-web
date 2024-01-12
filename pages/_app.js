import 'tailwindcss/tailwind.css'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import Layout from '../components/Layout'
import ShopProvider from '../context/shopContext'
import { useRouter } from 'next/router'
import { NextUIProvider } from '@nextui-org/react'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  
  return (
    <NextUIProvider>
      <ShopProvider>
        <Layout>
          <Component {...pageProps} key={router.asPath} />
        </Layout>
      </ShopProvider>
    </NextUIProvider>
  )
}

export default MyApp