module.exports = Object.freeze({
  API_ERROR: 'Oops, something went wrong',
  BASE_URL_API: 'http://localhost:8085',
  PLACEHOLDER_IMAGE: 'https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png',
  PURCHASE_ENDPOINT: '/purchases',
  ACTIVE_PRODUCT_ENDPOINT: '/products?active=true',
  PRODUCTS_ENPOINT: '/products',
  GOOGLE_CLIENT_ID: '912899852587-7996nh9mlpvpa2446q0il4f9hj5o492h.apps.googleusercontent.com', // ENTER CLIENT ID HERE
  ADD_PRODUCT_FAILURES: (stringList) => `Failed to add product: ${stringList.join('|')}`,
  ADD_PRODUCT_SUCCESS: (description) => `${description} added to cart!`,
  PRODUCT_MISSING_ID: 'Product id cannot be null, undefined, and above 0.',
  INSUFFICIENT_INVENTORY: 'There is insufficient inventory for this product.'
});
