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
const SaveProduct = async (product, setApiError) => {
  await HttpHelper(Constants.PRODUCTS_ENPOINT, 'POST', product)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .catch((e) => {
      setApiError(e.message);
    });
};
export default SaveProduct;
