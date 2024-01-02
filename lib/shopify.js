const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

async function ShopifyData(query) {
    const URL = `https://${domain}/api/2023-10/graphql.json`

    const options = {
        endpoint: URL,
        method: "POST",
        headers: {
            "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query })
    }

    try {
        const response = await fetch(URL, options)
        const data = await response.json()

        return data
    } catch (error) {
        throw new Error("Product not fetched")
    }
}

export async function getProductInCollection() {
    const query = `
    {
        collection(handle:"frontpage") {
            title
            products(first: 25) {
                edges {
                node {
                    id
                    title
                    handle
                    images(first:5) {
                    edges {
                        node {
                            url
                            altText
                                }
                            }
                        }
                    }
                }
            }
        }
    }`

      const response = await ShopifyData(query)

      const allProducts = response.data.collection.products.edges ? response.data.collection.products.edges : []

      return allProducts
}
