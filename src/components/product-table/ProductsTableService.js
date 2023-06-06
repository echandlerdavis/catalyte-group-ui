import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

export const SaveProduct = async (product, setApiError) => {
  try {
    const response = await HttpHelper(Constants.PRODUCTS_ENPOINT, 'POST', product);
    return response.json();
  } catch {
    setApiError(true);
    return false;
  }
};

export const getFieldsNotEmpty = (productRow) => (
  Object.keys().filter((key) => {
    let formInput = productRow[key];
    if (typeof formInput === 'string') {
      formInput = formInput.trim();
    }
    return formInput.length === 0;
  })
);

export const validateQuantityNotNegative = (productRow) => {
  const { quantity } = productRow;
  return (quantity && quantity <= 0);
};

export const validatePriceTwoDecimals = (productRow) => {
  const priceArray = productRow.price.split('.');
  return (priceArray.length !== 2 || priceArray[1].length !== 2 || productRow.price <= 0);
};
