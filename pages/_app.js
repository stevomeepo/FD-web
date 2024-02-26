import 'tailwindcss/tailwind.css'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import Layout from '../components/Layout'
import ShopProvider from '../context/shopContext'
import { useRouter } from 'next/router'
import { NextUIProvider } from '@nextui-org/react'
import AuthProvider from '../context/authContext';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  
  return (
    <AuthProvider>
      <NextUIProvider>
        <ShopProvider>
          <Layout>
            <Component {...pageProps} key={router.asPath} />
          </Layout>
        </ShopProvider>
      </NextUIProvider>
    </AuthProvider>
  )
}

export default MyApp