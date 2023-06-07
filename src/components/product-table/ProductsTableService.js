import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

export const UpdateProduct = async (product, setApiError) => {
  const result = { SUCCESS: false, MESSAGE: `Failed to update product #${product.id}` };

  try {
    const response = await HttpHelper(Constants.UPDATE_PRODUCT_ENDPOINT(product.id), 'PUT', product);
    if (response.ok) {
      result.SUCCESS = true;
      result.MESSAGE = `Successfully updated product #${product.id}`;
      return result;
    }
    return result;
  } catch {
    result.MESSAGE = Constants.API_ERROR;
    setApiError(true);
    return result;
  }
};

export const getFieldsNotEmpty = (product) => (
  Object.keys(product).filter((key) => {
    let formInput = product[key];
    if (typeof formInput === 'string') {
      formInput = formInput.trim();
    }
    return formInput.length === 0;
  })
);

export const validateQuantityNotNegative = (product) => {
  const { quantity } = product;
  return (quantity && quantity <= 0);
};

export const validatePriceTwoDecimals = (product) => {
  const priceArray = product.price.split('.');
  return (priceArray.length !== 2 || priceArray[1].length !== 2 || product.price <= 0);
};
