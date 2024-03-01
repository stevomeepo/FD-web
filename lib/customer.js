const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;
const adminAccessToken = process.env.SHOPIFY_ADMIN_ACCESSTOKEN;

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
        mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
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
        // Adjusted the path to match the expected response structure
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

export async function deleteCustomerAccessToken(accessToken) {
    const query = `
        mutation customerAccessTokenDelete($customerAccessToken: String!) {
            customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
                deletedAccessToken
                deletedCustomerAccessTokenId
                userErrors {
                    field
                    message
                }
            }
        }`;

    const variables = {
        customerAccessToken: accessToken,
    };

    try {
        const response = await ShopifyCustomerData(query, variables);
        if (response.data.customerAccessTokenDelete.deletedAccessToken) {
            return { success: true };
        } else {
            // Handle errors, e.g., token already invalid or expired
            return {
                success: false,
                error: response.data.customerAccessTokenDelete.userErrors.map(error => error.message).join(", "),
            };
        }
    } catch (error) {
        console.error("Error deleting customer access token:", error);
        return { success: false, error: "An error occurred while deleting the access token." };
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
                    acceptsMarketing
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

export async function createCustomerAddress(customerAccessToken, addressInput) {
    const query = `
        mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
            customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
                customerAddress {
                    id
                    firstName
                    lastName
                    address1
                    address2
                    city
                    province
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
        address: addressInput,
    };

    try {
        const response = await ShopifyCustomerData(query, variables);
        console.log("Shopify response:", response);
        if (response.data.customerAddressCreate.customerUserErrors.length > 0) {
            return { success: false, errors: response.data.customerAddressCreate.customerUserErrors };
        }
        return { 
            success: true, 
            address: response.data.customerAddressCreate.customerAddress 
        };
    } catch (error) {
        console.error("Error creating customer address:", error);
        return { success: false, error: 'An error occurred while creating the address.' };
    }
}

export async function updateCustomerAddress(customerAccessToken, addressId, addressInput) {
    const query = `
    mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
        customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
            customerAddress {
                id
                firstName
                lastName
                address1
                address2
                city
                province
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

    const response = await ShopifyCustomerData(query, variables);
    if (response.data && response.data.customerAddressUpdate && response.data.customerAddressUpdate.customerAddress) {
        return { success: true, address: response.data.customerAddressUpdate.customerAddress };
    } else {
        return { success: false, error: 'Failed to update address.' };
    }
}

export async function setDefaultCustomerAddress(customerAccessToken, addressId) {
    const query = `
        mutation customerDefaultAddressUpdate($addressId: ID!, $customerAccessToken: String!) {
            customerDefaultAddressUpdate(addressId: $addressId, customerAccessToken: $customerAccessToken) {
                customer {
                    id
                    email
                    firstName
                    lastName
                    defaultAddress {
                        id
                    }
                }
                customerUserErrors {
                    field
                    message
                }
            }
        }`;

    const variables = {
        customerAccessToken,
        addressId,
    };

    try {
        const response = await ShopifyCustomerData(query, variables);
        if (response.data.customerDefaultAddressUpdate.customerUserErrors.length > 0) {
            // Handle errors
            console.error("Error setting default address:", response.data.customerDefaultAddressUpdate.customerUserErrors);
            return { success: false, errors: response.data.customerDefaultAddressUpdate.customerUserErrors };
        }
        // Successfully set default address
        return { success: true, customer: response.data.customerDefaultAddressUpdate.customer };
    } catch (error) {
        console.error("Error setting default address:", error);
        return { success: false, error: "An error occurred while setting the default address." };
    }
}

export async function fetchUserProfile(customerAccessToken) {
    const query = `
    {
        customer(customerAccessToken: "${customerAccessToken}") {
            id
            email
            firstName
            lastName
            acceptsMarketing
            defaultAddress {
                id
                firstName
                lastName
                address1
                address2
                city
                province
                country
                zip
                phone
            }
            addresses(first: 10) {
                edges {
                    node {
                        id
                        firstName
                        lastName
                        address1
                        address2
                        city
                        province
                        country
                        zip
                        phone
                    }
                }
            }
        }
    }`;

    try {
        const response = await ShopifyCustomerData(query);
        if (response.data.customer) {
            return { success: true, data: response.data.customer };
        } else {
            router.push("/login")
        }
    } catch (error) {
        console.error("Error fetching customer profile:", error);
        return { success: false, error: "An error occurred while fetching the customer profile." };
    }
}

export async function fetchAddressDetails(customerAccessToken, addressId) {
    const query = `
    {
        customer(customerAccessToken: "${customerAccessToken}") {
            addresses(first: 10) {
                edges {
                    node {
                        id
                        firstName
                        lastName
                        address1
                        address2
                        city
                        province
                        country
                        zip
                        phone
                    }
                }
            }
        }
    }`;

    try {
        const response = await ShopifyCustomerData(query);
        if (response.data.customer && response.data.customer.addresses.edges.length > 0) {
            const address = response.data.customer.addresses.edges
                .map(edge => edge.node)
                .find(addr => addr.id === addressId);

            if (address) {
                return { success: true, address };
            } else {
                return { success: false, error: "Address not found." };
            }
        } else {
            return { success: false, error: "No addresses found." };
        }
    } catch (error) {
        console.error("Error fetching address details:", error);
        return { success: false, error: "An error occurred while fetching the address details." };
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
            // Destructure the customer object to separate the ID and the rest of the data
            const { id: shopifyCustomerId, ...userData } = response.data.customer;
            // Return the Shopify customer ID along with the valid flag and user data
            return { valid: true, shopifyCustomerId, data: userData };
        } else {
            return { valid: false, error: "Invalid or expired token" };
        }
    } catch (error) {
        console.error("Error validating access token:", error);
        return { valid: false, error: "An error occurred while validating the token." };
    }
}

export async function recoverCustomerPassword(email) {
    const query = `
        mutation customerRecover($email: String!) {
            customerRecover(email: $email) {
                customerUserErrors {
                    field
                    message
                }
            }
        }`;

    const variables = {
        email,
    };

    try {
        const response = await ShopifyCustomerData(query, variables);
        if (response.data.customerRecover.customerUserErrors.length > 0) {
            return { success: false, errors: response.data.customerRecover.customerUserErrors };
        }
        return { success: true };
    } catch (error) {
        console.error("Error initiating password recovery:", error);
        return { success: false, error: 'An error occurred while initiating password recovery.' };
    }
}

export async function deleteCustomerAddress(customerAccessToken, addressId) {
    const query = `
        mutation customerAddressDelete($id: ID!, $customerAccessToken: String!) {
            customerAddressDelete(id: $id, customerAccessToken: $customerAccessToken) {
                deletedCustomerAddressId
                customerUserErrors {
                    field
                    message
                }
            }
        }
    `;

    const variables = {
        id: addressId,
        customerAccessToken: customerAccessToken,
    };

    try {
        const response = await ShopifyCustomerData(query, variables);
        if (response.data && response.data.customerAddressDelete.deletedCustomerAddressId) {
            console.log("Address deleted successfully");
            return { success: true, deletedAddressId: response.data.customerAddressDelete.deletedCustomerAddressId };
        } else if (response.data && response.data.customerAddressDelete.customerUserErrors.length > 0) {
            console.error("Error deleting address:", response.data.customerAddressDelete.customerUserErrors);
            return { success: false, errors: response.data.customerAddressDelete.customerUserErrors };
        }
    } catch (error) {
        console.error("Error in deleteCustomerAddress:", error);
        return { success: false, error: error.message };
    }
}