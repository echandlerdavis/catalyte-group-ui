const SEVERITY_LEVELS = {
  INFO: 'info',
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning'
};

const USERS_ENDPOINT = '/users';

module.exports = Object.freeze({
  API_ERROR: 'Oops, something went wrong',
  BASE_URL_API: 'http://localhost:8085',
  PLACEHOLDER_IMAGE: 'https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png',
  PURCHASE_ENDPOINT: '/purchases',
  ACTIVE_PRODUCT_ENDPOINT: '/products?active=true',
  PRODUCTS_ENPOINT: '/products',
  USERS_ENDPOINT,
  USERS_PUT_ENDPOINT: (id) => `${USERS_ENDPOINT}/${id}`,
  UPDATE_LAST_ACTIVE_ENDPOINT: (id) => `${USERS_ENDPOINT}/${id}/updateLastActive`,
  GOOGLE_CLIENT_ID: '912899852587-7996nh9mlpvpa2446q0il4f9hj5o492h.apps.googleusercontent.com', // ENTER CLIENT ID HERE
  PRODUCT_MISSING_ID: 'Product id cannot be null, undefined, and above 0.',
  INSUFFICIENT_INVENTORY: 'There is insufficient inventory for this product.',
  CANNOT_ADD_ZERO_QUANTITY: 'Product quantity cannot be less than 1.',
  QUANTITY_MUST_BE_ENTERED: 'Product quantity must contain a positive number.',
  QUANTITY_MUST_BE_INT: 'Product quantity must be a whole number.',
  SEVERITY_LEVELS,
  ADD_PRODUCT_FAILURE: (stringList) => ({
    MESSAGE: `Failed to add product: ${stringList.join('\n\r')}`,
    SEVERITY: SEVERITY_LEVELS.ERROR
  }),
  ADD_PRODUCT_SUCCESS: (description) => ({
    MESSAGE: `${description} added to cart!`,
    SEVERITY: SEVERITY_LEVELS.SUCCESS
  }),
  ADD_MULTIPLE_SUCCESS: (description, quantity) => ({
    MESSAGE: `${quantity} of ${description} added to cart!`,
    SEVERITY: SEVERITY_LEVELS.SUCCESS
  }),
  LOGO_ALT: 'Jaba the Hutt drinking coffee'
});
