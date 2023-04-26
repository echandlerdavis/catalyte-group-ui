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
        return response.json;
      }
      throw new Error(Constants.API_ERROR);
    })
    .catch((e) => {
      setApiError(e.message);
    });
};

/**
 *
 * @name GetProductBrands
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setApiError sets error if response other than 200 is returned
 * @param {*} setAttribute the react setter to set the brands array to
 * @returns returns the array list of distinct product brands
 */
export const GetProductBrands = async (setApiError, setAttribute) => {
  await HttpHelper(Constants.BRANDS_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then((data) => setAttribute((prev) => ({ ...prev, brand: data })))
    .catch(() => {
      setApiError(true);
    });
};

/**
 *
 * @name GetProductCategories
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setApiError sets error if response other than 200 is returned
 * @param {*} setAttribute the react setter to set the categories array to
 * @returns returns the array list of distinct product categories
 */
export const GetProductCategories = async (setApiError, setAttribute) => {
  await HttpHelper(Constants.CATEGORIES_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then((data) => setAttribute((prev) => ({ ...prev, category: data })))
    .catch(() => {
      setApiError(true);
    });
};

/**
 *
 * @name GetProductMaterials
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setApiError sets error if response other than 200 is returned
 * @param {*} setAttribute the react setter to set the materials array to
 * @returns returns the array list of distinct product materials
 */
export const GetProductMaterials = async (setApiError, setAttribute) => {
  await HttpHelper(Constants.MATERIALS_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then((data) => setAttribute((prev) => ({ ...prev, material: data })))
    .catch(() => {
      setApiError(Constants.API_ERROR);
    });
};

/**
 *
 * @name GetProductTypes
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setApiError sets error if response other than 200 is returned
 * @param {*} setAttribute the react setter to set the types array to
 * @returns returns the array list of distinct product types
 */
export const GetProductTypes = async (setApiError, setAttribute) => {
  await HttpHelper(Constants.TYPES_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then((data) => setAttribute((prev) => ({ ...prev, type: data })))
    .catch(() => {
      setApiError(true);
    });
};

/**
 *
 * @name GetProductDemographics
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setApiError sets error if response other than 200 is returned
 * @param {*} setAttribute the react setter to set the demographics array to
 * @returns returns the array list of distinct product Demographics
 */
export const GetProductDemographics = async (setApiError, setAttribute) => {
  await HttpHelper(Constants.DEMOGRAPHICS_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then((data) => setAttribute((prev) => ({ ...prev, demographic: data })))
    .catch(() => {
      setApiError(true);
    });
};

/**
 *
 * @name GetProductPrimaryColors
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setApiError sets error if response other than 200 is returned
 * @param {*} setAttribute the react setter to set the primary color array to
 * @returns returns the array list of distinct product primary colors
 */
export const GetProductPrimaryColors = async (setApiError, setAttribute) => {
  await HttpHelper(Constants.DEMOGRAPHICS_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then((data) => setAttribute((prev) => ({ ...prev, primaryColorCode: data })))
    .catch(() => {
      setApiError(true);
    });
};

/**
 *
 * @name GetProductSecondaryColors
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setApiError sets error if response other than 200 is returned
 * @param {*} setAttribute the react setter to set the secondary color array to
 * @returns returns the array list of distinct product secondary colors
 */
export const GetProductSecondaryColors = async (setApiError, setAttribute) => {
  await HttpHelper(Constants.DEMOGRAPHICS_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then((data) => setAttribute((prev) => ({ ...prev, secondaryColorCode: data })))
    .catch(() => {
      setApiError(true);
    });
};
