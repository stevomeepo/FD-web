import 'tailwindcss/tailwind.css'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import Layout from '../components/Layout'
import ShopProvider from '../context/shopContext'
import { useRouter } from 'next/router'
import { NextUIProvider } from '@nextui-org/react'
import { UserProvider } from '../context/userContext';

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  
  return (
    <NextUIProvider>
      <ShopProvider>
        <UserProvider>
          <Layout>
            <Component {...pageProps} key={router.asPath} />
          </Layout>
        </UserProvider>
      </ShopProvider>
    </NextUIProvider>
  )
}

export default MyApp