import { createContext, useState, useEffect } from 'react'
import { createCheckout, updateCheckout } from '../lib/shopify'

const CartContext = createContext()

export default function ShopProvider({ children }) {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutId, setCheckoutId] = useState('')
  const [checkoutUrl, setCheckoutUrl] = useState('')
  const [cartLoading, setCartLoading] = useState(false)


  useEffect(() => {
    const cartFromStorage = localStorage.getItem("checkout_id");
    if (cartFromStorage) {
      const cartObject = JSON.parse(cartFromStorage);
      if (cartObject.cart && Array.isArray(cartObject.cart)) {
        setCart(cartObject.cart);
      }
      if (cartObject.checkoutId) {
        setCheckoutId(cartObject.checkoutId);
      }
      if (cartObject.checkoutUrl) {
        setCheckoutUrl(cartObject.checkoutUrl);
      }
    }
  }, []);


  async function addToCart(variant) {
    const newItem = {
      ...variant,
      price: variant.variantPrice,
    };
    setCartOpen(true)
    if (cart.length === 0) {
      setCart([newItem])

      const checkout = await createCheckout(newItem.id, 1)

      setCheckoutId(checkout.id)
      setCheckoutUrl(checkout.webUrl)

      localStorage.setItem("checkout_id", JSON.stringify([newItem, checkout]))
    } else {
      let newCart = []
      let added = false

      cart.map(item => {
        if (item.id === newItem.id) {
          item.variantQuantity++
          newCart = [...cart]
          added = true
        }
      })

      if (!added) {
        newCart = [...cart, newItem]
      }

      setCart(newCart)
      const newCheckout = await updateCheckout(checkoutId, newCart)
      localStorage.setItem("checkout_id", JSON.stringify([newCart, newCheckout]))
    }
  }

  async function removeCartItem(itemToRemove) {
    const updatedCart = cart.filter(item => item.id !== itemToRemove)
    setCartLoading(true)

    setCart(updatedCart)

    const newCheckout = await updateCheckout(checkoutId, updatedCart)

    localStorage.setItem("checkout_id", JSON.stringify([updatedCart, newCheckout]))
    setCartLoading(false)

    if (cart.length === 1) {
      setCartOpen(false)
    }
  }

  async function incrementCartItem(item) {
    setCartLoading(true)

    let newCart = []

    cart.map(cartItem => {
      if (cartItem.id === item.id) {
        cartItem.variantQuantity++
        newCart = [...cart]
      }
    })
    setCart(newCart)
    const newCheckout = await updateCheckout(checkoutId, newCart)

    localStorage.setItem("checkout_id", JSON.stringify([newCart, newCheckout]))
    setCartLoading(false)
  }

  async function decrementCartItem(item) {
    setCartLoading(true)

    if (item.variantQuantity === 1) {
      removeCartItem(item.id)
    } else {
      let newCart = []
      cart.map(cartItem => {
        if (cartItem.id === item.id) {
          cartItem.variantQuantity--
          newCart = [...cart]
        }
      })

      setCart(newCart)
      const newCheckout = await updateCheckout(checkoutId, newCart)

      localStorage.setItem("checkout_id", JSON.stringify([newCart, newCheckout]))
    }
    setCartLoading(false)
  }

  async function clearCart() {
    const updatedCart = []

    setCart(updatedCart)

    const newCheckout = await updateCheckout(checkoutId, updatedCart)

    localStorage.setItem("checkout_id", JSON.stringify([updatedCart, newCheckout]))

  }

  async function getCheckoutStatus(checkoutId) {
    try {
      const response = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}.myshopify.com/admin/api/2023-01/checkouts/${checkoutId}.json`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN
        },
      });

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const data = await response.json();
      return data.checkout.status;
    } catch (error) {
      console.error("Failed to get checkout status:", error);
    }
  }

  async function checkAndClearCartAfterCheckout() {
    const checkoutStatus = await getCheckoutStatus(checkoutId);

    if (checkoutStatus === 'completed') {
      clearCart();
      setCheckoutId('');
      setCheckoutUrl('');
      localStorage.removeItem("checkout_id");
    }
  }


  return (
    <CartContext.Provider value={{
      cart,
      cartOpen,
      setCartOpen,
      addToCart,
      checkoutUrl,
      removeCartItem,
      clearCart,
      cartLoading,
      incrementCartItem,
      decrementCartItem,
      checkAndClearCartAfterCheckout,
    }}>
      {children}
    </CartContext.Provider>
  )
}

const ShopConsumer = CartContext.Consumer

export { ShopConsumer, CartContext }
