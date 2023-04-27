const SEVERITY_LEVELS = {
  INFO: 'info',
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning'
};

module.exports = Object.freeze({
  API_ERROR: 'Oops, something went wrong',
  BASE_URL_API: 'http://localhost:8085',
  PLACEHOLDER_IMAGE: 'https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png',
  PURCHASE_ENDPOINT: '/purchases',
  ACTIVE_PRODUCT_ENDPOINT: '/products?active=true',
  PRODUCTS_ENPOINT: '/products',
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
  SEVERITY_LEVELS,
  FORM_FIELDS_EMPTY: (emptyFields) => `The following fields can not be empty: ${emptyFields.join(', ')}`,
  PRODUCT_FORM_INVALID_PRICE: 'Price must be a number with 2 digits',
  SAVE_PRODUCT_SUCCESS: { MESSAGE: 'Product Successfully Created!', SEVERITY: SEVERITY_LEVELS.SUCCESS },
  ADD_PRODUCT_FAILURE: (stringList) => ({
    MESSAGE: `Failed to add product: ${stringList.join('|')}`,
    SEVERITY: SEVERITY_LEVELS.ERROR
  }),
  ADD_PRODUCT_SUCCESS: (description) => ({
    MESSAGE: `${description} added to cart!`,
    SEVERITY: SEVERITY_LEVELS.SUCCESS
  }),
  LOGO_ALT: 'Jaba the Hutt drinking coffee'
});
