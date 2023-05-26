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
  STATES_ENDPOINT: '/purchases/StateOptions',
  ACTIVE_PRODUCT_ENDPOINT: '/products?active=true',
  PRODUCTS_ENPOINT: '/products',
  REVIEWS_ENDPOINT: (productId) => `/products/${productId}/reviews`,
  USERS_ENDPOINT,
  USERS_PUT_ENDPOINT: (id) => `${USERS_ENDPOINT}/${id}`,
  SAVE_USERS_PUT_ENDPOINT: (email) => `${USERS_ENDPOINT}/${email}`,
  UPDATE_LAST_ACTIVE_ENDPOINT: (id) => `${USERS_ENDPOINT}/${id}/updateLastActive`,
  BRANDS_ENDPOINT: '/products/brands',
  CATEGORIES_ENDPOINT: '/products/categories',
  MATERIALS_ENDPOINT: '/products/materials',
  TYPES_ENDPOINT: '/products/types',
  PRIMARY_COLOR_ENDPOINT: '/products/primarycolors',
  SECONDARY_COLOR_ENDPOINT: '/products/secondarycolors',
  DEMOGRAPHICS_ENDPOINT: '/products/demographics',
  GOOGLE_CLIENT_ID: '912899852587-7996nh9mlpvpa2446q0il4f9hj5o492h.apps.googleusercontent.com', // ENTER CLIENT ID HERE
  PRODUCT_MISSING_ID: 'Product id cannot be null, undefined, and above 0.',
  INSUFFICIENT_INVENTORY: 'There is insufficient inventory for this product.',
  CANNOT_ADD_ZERO_QUANTITY: 'Product quantity cannot be less than 1.',
  QUANTITY_MUST_BE_ENTERED: 'Product quantity must contain a positive number.',
  QUANTITY_MUST_BE_INT: 'Product quantity must be a whole number.',
  SEVERITY_LEVELS,
  FORM_FIELDS_EMPTY: (emptyFields) => `The following fields can not be empty: ${emptyFields.join(', ')}`,
  PRODUCT_FORM_INVALID_PRICE: 'Price must be a number with 2 digits after the decimal place',
  PRODUCT_FORM_INVALID_QUANTITY: 'Quantity can not be a negative number',
  SAVE_PRODUCT_SUCCESS: { MESSAGE: 'Product Successfully Created!', SEVERITY: SEVERITY_LEVELS.SUCCESS },
  SAVE_PRODUCT_FAILURE: { MESSAGE: 'Connection to Database Failed', SEVERITY: SEVERITY_LEVELS.ERROR },
  PROMO_TITLE_INVALID: 'Title - must be capitalized alphaNumeric values only',
  PROMO_RATE_INVALID: 'Rate - must be a positive digit less than 100',
  EMPTY_FIELD: 'This Field is reqiured',
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
  LOGO_ALT: 'Jaba the Hutt drinking coffee',
  PROMOCODE_ENDPOINT: '/promotionalCodes',
  INVALID_CODE: 'Invalid code',
  SAVE_PROMO_SUCCESS: () => ({
    MESSAGE: 'Promotional Code Saved Succesfully!',
    SEVERITY: SEVERITY_LEVELS.SUCCESS
  }),
  SAVE_PROMO_FAILURE: () => ({
    MESSAGE: 'Connection Failure, unable to save Promotional Code!',
    SEVERITY: SEVERITY_LEVELS.ERROR
  }),
  FREE_SHIPPING_MIN: 50.00
});
