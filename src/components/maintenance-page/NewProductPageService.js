import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name SaveProduct
 * @description Utilizes HttpHelper to make a POST request to an API
 * @param {object} product the product object to be saved to the database
 * @param {React.Dispatch<React.SetStateAction>} setApiError
 * sets error if response other than 200 is returned
 * @returns {Promise<object>}returns the product object that was saved
 */
export const SaveProduct = async (product, setApiError) => {
  try {
    const response = await HttpHelper(Constants.PRODUCTS_ENPOINT, 'POST', product);
    return response.json();
  } catch {
    setApiError(true);
    return false;
  }
};

/**
 *
 * @name GetProductBrands
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {React.Dispatch<React.SetStateAction>} setApiError
 * sets error if response other than 200 is returned
 * @param {React.Dispatch<React.SetStateAction>} setAttribute
 * the react setter to set the brands array to
 * @returns sets state for the products attributes distinct list
 */
export const GetProductBrands = async (setApiError, setAttribute) => {
  await HttpHelper(Constants.BRANDS_ENDPOINT, 'GET')
    .then((response) => response.json())
    .then((data) => setAttribute((prev) => ({ ...prev, brand: data })))
    .catch(() => setApiError(true));
};

/**
 *
 * @name GetProductCategories
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {React.Dispatch<React.SetStateAction>} setApiError
 * sets error if response other than 200 is returned
 * @param {React.Dispatch<React.SetStateAction>} setAttribute
 * the react setter to set the categories array to
 * @returns sets state for the products attributes distinct list
 */
export const GetProductCategories = async (setApiError, setAttribute) => {
  await HttpHelper(Constants.CATEGORIES_ENDPOINT, 'GET')
    .then((response) => response.json())
    .then((data) => setAttribute((prev) => ({ ...prev, category: data })))
    .catch(() => setApiError(true));
};

/**
 *
 * @name GetProductMaterials
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {React.Dispatch<React.SetStateAction>} setApiError
 * sets error if response other than 200 is returned
 * @param {React.Dispatch<React.SetStateAction>} setAttribute
 * the react setter to set the materials array to
 * @returns sets state for the products attributes distinct list
 */
export const GetProductMaterials = async (setApiError, setAttribute) => {
  await HttpHelper(Constants.MATERIALS_ENDPOINT, 'GET')
    .then((response) => response.json())
    .then((data) => setAttribute((prev) => ({ ...prev, material: data })))
    .catch(() => setApiError(true));
};

/**
 *
 * @name GetProductTypes
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {React.Dispatch<React.SetStateAction>} setApiError
 * sets error if response other than 200 is returned
 * @param {React.Dispatch<React.SetStateAction>} setAttribute
 * the react setter to set the types array to
 * @returns sets state for the products attributes distinct list
 */
export const GetProductTypes = async (setApiError, setAttribute) => {
  await HttpHelper(Constants.TYPES_ENDPOINT, 'GET')
    .then((response) => response.json())
    .then((data) => setAttribute((prev) => ({ ...prev, type: data })))
    .catch(() => setApiError(true));
};

/**
 *
 * @name GetProductDemographics
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {React.Dispatch<React.SetStateAction>} setApiError
 * sets error if response other than 200 is returned
 * @param {React.Dispatch<React.SetStateAction>} setAttribute
 * the react setter to set the demographics array to
 * @returns sets state for the products attributes distinct list
 */
export const GetProductDemographics = async (setApiError, setAttribute) => {
  await HttpHelper(Constants.DEMOGRAPHICS_ENDPOINT, 'GET')
    .then((response) => response.json())
    .then((data) => setAttribute((prev) => ({ ...prev, demographic: data })))
    .catch(() => setApiError(true));
};

/**
 *
 * @name GetProductPrimaryColors
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {React.Dispatch<React.SetStateAction>} setApiError
 * sets error if response other than 200 is returned
 * @param {React.Dispatch<React.SetStateAction>} setAttribute
 * the react setter to set the primary color array to
 * @returns sets state for the products attributes distinct list
 */
export const GetProductPrimaryColors = async (setApiError, setAttribute) => {
  await HttpHelper(Constants.DEMOGRAPHICS_ENDPOINT, 'GET')
    .then((response) => response.json())
    .then((data) => setAttribute((prev) => ({ ...prev, primaryColorCode: data })))
    .catch(() => setApiError(true));
};

/**
 *
 * @name GetProductSecondaryColors
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {React.Dispatch<React.SetStateAction>} setApiError
 * sets error if response other than 200 is returned
 * @param {React.Dispatch<React.SetStateAction>} setAttribute
 * the react setter to set the secondary color array to
 * @returns sets state for the products attributes distinct list
 */
export const GetProductSecondaryColors = async (setApiError, setAttribute) => {
  await HttpHelper(Constants.DEMOGRAPHICS_ENDPOINT, 'GET')
    .then((response) => response.json())
    .then((data) => setAttribute((prev) => ({ ...prev, secondaryColorCode: data })))
    .catch(() => setApiError(true));
};

/**
 *
 * @name GetAllDistinctLists
 * @description Call each product distinct list getter
 * @param {React.Dispatch<React.SetStateAction>} setApiError
 * sets error if response other than 200 is returned
 * @param {React.Dispatch<React.SetStateAction>} setAttribute
 * the react setter to set the attributes
 * @returns sets state for the products attributes distinct list
 */
export const GetAllDistinctLists = (setApiError, setAttribute) => {
  GetProductBrands(setApiError, setAttribute);
  GetProductCategories(setApiError, setAttribute);
  GetProductDemographics(setApiError, setAttribute);
  GetProductMaterials(setApiError, setAttribute);
  GetProductPrimaryColors(setApiError, setAttribute);
  GetProductSecondaryColors(setApiError, setAttribute);
};
