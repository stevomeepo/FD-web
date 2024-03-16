const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

async function ShopifyData(query, variables = {}) {
  const URL = `https://${domain}/api/2024-01/graphql.json`;

  const options = {
      method: "POST",
      headers: {
          "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
          "Accept": "application/json",
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables })
  };

  try {
      const response = await fetch(URL, options);
      const data = await response.json();

      return data;
  } catch (error) {
      console.error("Shopify API error:", error);
      throw new Error("Failed to fetch from Shopify API");
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

export async function createCheckoutWithConfigurations(cartItems) {
  const lineItems = cartItems.map(item => {
    let totalPrice = parseFloat(item.variantPrice); // Start with the base variant price.

    // Add the price of selected configurations.
    if (item.configurations.Memory) {
      totalPrice += item.configurations.Memory.price;
    }
    if (item.configurations.CPU) {
      totalPrice += item.configurations.CPU.price;
    }

    // Construct line item properties for configurations
    const properties = [];
    if (item.configurations.CPU) {
      properties.push({ name: "CPU", value: item.configurations.CPU.name });
    }
    if (item.configurations.Memory) {
      properties.push({ name: "Memory", value: item.configurations.Memory.name });
    }

    // Return the line item in the format expected by Shopify's Draft Orders API.
    return {
      variantId: item.id,
      quantity: item.variantQuantity,
      properties, // Include configuration properties
      // Note: Adjusting the price directly like this may not be supported. You might need to handle pricing adjustments differently.
    };
  });

  // Construct the mutation for creating a draft order with these line items.
  const mutation = `
    mutation createDraftOrder($input: DraftOrderInput!) {
      draftOrderCreate(input: $input) {
        draftOrder {
          id
          invoiceUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lineItems: lineItems
    }
  };

  try {
    const response = await ShopifyData(mutation, variables);
    if (response.data.draftOrderCreate.draftOrder) {
      return response.data.draftOrderCreate.draftOrder.invoiceUrl;
    } else {
      console.error('Failed to create draft order:', response.data.draftOrderCreate.userErrors);
      return null;
    }
  } catch (error) {
    console.error('Error creating draft order:', error);
    return null;
  }
}