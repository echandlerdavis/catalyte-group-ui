import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name SaveProduct
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} product the product object to be saved to the database
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns returns the product object that was saved
 */
export const SaveProduct = async (product, setApiError, history) => {
  await HttpHelper(Constants.PRODUCTS_ENPOINT, 'POST', product)
    .then((response) => {
      if (response.ok) {
        history.push('/maintenance');
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .catch((e) => {
      setApiError(e.message);
    });
};

/**
 *
 * @name getProductBrands
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns returns the array list of distinct product brands
 */
export const getProductBrands = async (setApiError) => {
  await HttpHelper(Constants.BRANDS_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .catch(() => {
      setApiError(Constants.API_ERROR);
    });
};

/**
 *
 * @name getProductCategories
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns returns the array list of distinct product categories
 */
export const getCategories = async (setApiError) => {
  await HttpHelper(Constants.CATEGORIES_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .catch(() => {
      setApiError(Constants.API_ERROR);
    });
};

/**
 *
 * @name getProductMaterials
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns returns the array list of distinct product materials
 */
export const getProductMaterials = async (setApiError) => {
  await HttpHelper(Constants.MATERIALS_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .catch(() => {
      setApiError(Constants.API_ERROR);
    });
};

/**
 *
 * @name getProductTypes
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns returns the array list of distinct product types
 */
export const getProductTypes = async (setApiError) => {
  await HttpHelper(Constants.TYPES_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .catch(() => {
      setApiError(Constants.API_ERROR);
    });
};

/**
 *
 * @name getProductDemographics
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns returns the array list of distinct product Demographics
 */
export const getProductDemographics = async (setApiError) => {
  await HttpHelper(Constants.DEMOGRAPHICS_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .catch(() => {
      setApiError(Constants.API_ERROR);
    });
};
