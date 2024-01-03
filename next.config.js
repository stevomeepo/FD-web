module.exports = {
    images: {
      domains: ['cdn.shopify.com'],
    },
    env: {
      SHOPIFY_STOREFRONT_ACCESSTOKEN: process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN,
      SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN
    }
  }
