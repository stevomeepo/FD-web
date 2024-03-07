const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

async function ShopifyData(query) {
    const URL = `https://${domain}/api/2024-01/graphql.json`

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
      products(first: 25) {
          edges {
          node {
              id
              title
              handle
              priceRange {
                  minVariantPrice {
                      amount
                  }
              }
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

    }`

      const response = await ShopifyData(query)

      const allProducts = response.data.products.edges ? response.data.products.edges : []

      return allProducts
}

export async function getProduct(handle) {
  const query = `
  {
      product(handle: "${handle}") {
        collections(first: 1) {
          edges {
            node {
              products(first: 5) {
                edges {
                  node {
                    priceRange {
                      minVariantPrice {
                        amount
                      }
                    }
                    handle
                    title
                    id
                    images(first: 5) {
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
          }
        }
        id
        title
        handle
        description
        descriptionHtml
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        options {
          name
          values
          id
        }
        variants(first: 25) {
          edges {
            node {
              selectedOptions {
                name
                value
              }
              image {
                url
                altText
              }
              title
              id
              price {
                amount
              }
            }
          }
        }
        metafields(identifiers: [{namespace: "custom", key: "cpu"}, {namespace: "custom", key: "memory"}]) {
          namespace
          key
          value
        }
      }
  }`;

  const response = await ShopifyData(query);

  const product = response.data.product ? response.data.product : null;

  // Check if metafields exist and add them to the product object
  if (product && response.data.product.metafields) {
    // Filter out any null or undefined metafield before iterating
    const validMetafields = response.data.product.metafields.filter(metafield => metafield != null);
    validMetafields.forEach(metafield => {
        if (metafield.key === "cpu") {
            product.cpuConfigurations = JSON.parse(metafield.value);
        } else if (metafield.key === "memory") {
            product.memoryConfigurations = JSON.parse(metafield.value);
        }
    });
  }

  return product;
}

export async function getAllProducts() {
    const query =
    `{
        products(first: 250) {
          edges {
            node {
              handle
              id
              title
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
    }`

    const response = await ShopifyData(query)

    const slugs = response.data.products.edges ? response.data.products.edges : []

    return slugs
}


export async function createCheckout(id, quantity) {
    const query = `
        mutation {
            checkoutCreate (input: {
                lineItems: [{ variantId: "${id}", quantity: ${quantity}}]
            }) {
                checkout {
                    id
                    webUrl
                }
            }
        }`
    const response = await ShopifyData(query);

    const checkout = response.data.checkoutCreate.checkout ? response.data.checkoutCreate.checkout : []

    return checkout
}

export async function updateCheckout(id, lineItems) {
    const lineItemsObject = lineItems.map(item => {
        return `{
            variantId: "${item.id}",
            quantity: ${item.variantQuantity}
        }`
    })
    const query = `
    mutation {
        checkoutLineItemsReplace(lineItems: [${lineItemsObject}], checkoutId: "${id}") {
            checkout {
                id
                webUrl
            }
        }   
    }`

    const response = await ShopifyData(query)

    const checkout = response.data?.checkoutLineItemsReplace?.checkout ?? [];

    return checkout
}

export async function getFeaturedCollection() {
  const query = `
  {
      collectionByHandle(handle: "Featured") {
        title
        products(first: 10) {
          edges {
            node {
              id
              title
              handle
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
                edges {
                  node {
                    src
                    altText
                  }
                }
              }
            }
          }
        }
      }
  }`;

  const response = await ShopifyData(query);

  const featuredCollection = response.data.collectionByHandle ? response.data.collectionByHandle : [];

  return featuredCollection;
}