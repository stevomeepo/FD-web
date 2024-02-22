const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;

async function ShopifyCustomerData(query, variables = {}) {
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
        throw new Error("Shopify customer operation failed");
    }
}

export async function createCustomer(customerInput) {
    const query = `
        mutation customerCreate($input: CustomerCreateInput!) {
            customerCreate(input: $input) {
                customer {
                    id
                    email
                    firstName
                    lastName
                }
                customerUserErrors {
                    field
                    message
                }
            }
        }`;

    const variables = {
        input: customerInput,
    };

    const response = await ShopifyCustomerData(query, variables);

    if (response.data.customerCreate.customerUserErrors.length > 0) {
        return { errors: response.data.customerCreate.customerUserErrors };
    }

    return response.data.customerCreate.customer || {};
}

export async function createCustomerAccessToken(email, password) {
    const query = `
        mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) 
            customerAccessTokenCreate(input: $input) {
                customerAccessToken {
                    accessToken
                }
                customerUserErrors {
                    field
                    message
                }
            }
        }`;

    const variables = {
        input: {
            email: email,
            password: password,
        },
    };

    try {
        const response = await ShopifyCustomerData(query, variables);
        if (response.data.customerAccessTokenCreate.customerAccessToken) {
            return { 
                success: true, 
                accessToken: response.data.customerAccessTokenCreate.customerAccessToken.accessToken 
            };
        } else {
            return { success: false, error: response.data.customerAccessTokenCreate.customerUserErrors[0]?.message || 'Invalid credentials' };
        }
    } catch (error) {
        console.error("Error validating user credentials:", error);
        return { success: false, error: 'An error occurred while validating credentials.' };
    }
}

export async function updateCustomer(customerAccessToken, customerInput) {
    const query = `
        mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
            customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
                customer {
                    id
                    email
                    firstName
                    lastName
                }
                customerUserErrors {
                    field
                    message
                }
            }
        }`;

    const variables = {
        customerAccessToken,
        customer: customerInput,
    };

    const response = await ShopifyCustomerData(query, variables);

    return response.data.customerUpdate || {};
}

export async function updateCustomerAddress(customerAccessToken, addressId, addressInput) {
    const query = `
        mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
            customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
                customerAddress {
                    id
                    address1
                    address2
                    city
                    country
                    zip
                    phone
                }
                customerUserErrors {
                    field
                    message
                }
            }
        }`;

    const variables = {
        customerAccessToken,
        id: addressId,
        address: addressInput,
    };

    try {
        const response = await ShopifyCustomerData(query, variables);
        if (response.data && response.data.customerAddressUpdate) {
            return response.data.customerAddressUpdate;
        } else {
            console.error("Unexpected response structure:", response);
            if (response.errors) {
                console.error("GraphQL Errors:", response.errors);
            }
            return { errors: ["Unexpected response structure from updateCustomerAddress"] };
        }
    } catch (error) {
        console.error("Error in updateCustomerAddress:", error);
        return { errors: [error.message] };
    }
}

export async function updateCustomerProfile(customerAccessToken, customerInput, addressInput) {
    const customerUpdateResponse = await updateCustomer(customerAccessToken, customerInput);
    if (customerUpdateResponse.errors) {
        console.error("Failed to update customer:", customerUpdateResponse.errors);
        return { success: false, errors: customerUpdateResponse.errors };
    }

    let addressUpdateResponse = {};
    if (addressInput && addressInput.addressId) {
        addressUpdateResponse = await updateCustomerAddress(customerAccessToken, addressInput.addressId, addressInput);
        if (addressUpdateResponse.errors) {
            console.error("Failed to update address:", addressUpdateResponse.errors);
            return { success: false, errors: addressUpdateResponse.errors };
        }
    }

    return { 
        success: true, 
        customer: customerUpdateResponse.customer, 
        address: addressUpdateResponse.customerAddress || null 
    };
}

export async function fetchUserProfile(customerAccessToken) {
    const query = `
    {
        customer(customerAccessToken: "${customerAccessToken}") {
            id
            email
            firstName
            lastName
            addresses(first: 1) {
                edges {
                    node {
                        id
                        address1
                        address2
                        city
                        country
                        zip
                    }
                }
            }
        }
    }`;

    const response = await ShopifyCustomerData(query);
    const customer = response.data.customer || {};
    if (customer.addresses && customer.addresses.edges.length > 0) {
        const firstAddress = customer.addresses.edges[0].node;
        return { ...customer, address: firstAddress };
    } else {
        return customer;
    }
}

export async function getCustomerOrders(customerAccessToken) {
    const query = `
        {
            customer(customerAccessToken: "${customerAccessToken}") {
                orders(first: 10) {
                    edges {
                        node {
                            id
                            orderNumber
                            totalPrice {
                                amount
                                currencyCode
                            }
                            lineItems(first: 5) {
                                edges {
                                    node {
                                        title
                                        quantity
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }`;

    const response = await ShopifyCustomerData(query);

    return response.data.customer?.orders.edges || [];
}

export async function validateAccessTokenAndGetUserData(accessToken) {
    const query = `
        {
            customer(customerAccessToken: "${accessToken}") {
                id
                email
                firstName
                lastName
            }
        }`;

    try {
        const response = await ShopifyCustomerData(query);
        if (response.data.customer) {
            return { valid: true, data: response.data.customer };
        } else {
            return { valid: false, error: "Invalid or expired token" };
        }
    } catch (error) {
        console.error("Error validating access token:", error);
        return { valid: false, error: "An error occurred while validating the token." };
    }
}