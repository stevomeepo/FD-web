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
    setCartOpen(true);
    let newCart = [...cart];
    let itemIndex = newCart.findIndex(item => item.uniqueId === variant.uniqueId);
  
    if (itemIndex === -1) {
      // Item does not exist, add as new
      newCart.push({ ...variant, variantQuantity: 1 });
    } else {
      // Item exists, update the quantity
      newCart[itemIndex].variantQuantity += 1;
    }
  
    setCart(newCart);
    // Update checkout and localStorage as before
    const newCheckout = await updateCheckout(checkoutId, newCart);
    localStorage.setItem("checkout_id", JSON.stringify([newCart, newCheckout]));
  }

  async function removeCartItem(uniqueIdToRemove) {
    const updatedCart = cart.filter(item => item.uniqueId !== uniqueIdToRemove);
    setCartLoading(true);
  
    setCart(updatedCart);
  
    const newCheckout = await updateCheckout(checkoutId, updatedCart);
    localStorage.setItem("checkout_id", JSON.stringify([updatedCart, newCheckout]));
    setCartLoading(false);
  
    if (updatedCart.length === 0) {
      setCartOpen(false);
    }
  }

  async function incrementCartItem(uniqueId) {
    setCartLoading(true);

    let newCart = cart.map(item => {
      if (item.uniqueId === uniqueId) {
        return { ...item, variantQuantity: item.variantQuantity + 1 };
      }
      return item;
    });

    setCart(newCart);
    const newCheckout = await updateCheckout(checkoutId, newCart);
    localStorage.setItem("checkout_id", JSON.stringify([newCart, newCheckout]));
    setCartLoading(false);
  }

  async function decrementCartItem(uniqueId) {
    setCartLoading(true);

    let newCart = cart.map(item => {
      if (item.uniqueId === uniqueId && item.variantQuantity > 1) {
        return { ...item, variantQuantity: item.variantQuantity - 1 };
      }
      return item;
    }).filter(item => item.variantQuantity > 0); // Remove the item if quantity becomes 0

    setCart(newCart);
    const newCheckout = await updateCheckout(checkoutId, newCart);
    localStorage.setItem("checkout_id", JSON.stringify([newCart, newCheckout]));
    setCartLoading(false);
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
