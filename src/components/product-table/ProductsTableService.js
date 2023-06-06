import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

export const UpdateProduct = async (product, setApiError) => {
  const result = { SUCCESS: false, MESSAGE: `Failed to update${product.id}` };
  console.log('products', product);
  try {
    const response = await HttpHelper(Constants.UPDATE_PRODUCT_ENDPOINT(product.id), 'PUT', product);
    if (response.ok) {
      result.SUCCESS = true;
      result.MESSAGE = `Successfully updated ${product.id}`;
      return result;
    }
    return result;
  } catch {
    result.MESSAGE = Constants.API_ERROR;
    setApiError(true);
    return result;
  }
};

// export const getFieldsNotEmpty = (product) => (
//   Object.keys().filter((key) => {
//     let formInput = product[key];
//     if (typeof formInput === 'string') {
//       formInput = formInput.trim();
//     }
//     return formInput.length === 0;
//   })
// );

export const validateQuantityNotNegative = (productRow) => {
  const { quantity } = productRow;
  return (quantity && quantity <= 0);
};

export const validatePriceTwoDecimals = (productRow) => {
  const rowPrice = productRow.price.toFixed(2).toString();
  const testPrice = rowPrice.split('.');
  console.log(testPrice);
  console.log(testPrice.length);
  console.log(testPrice[1].length);
  return (testPrice.length !== 2 || testPrice[1].length !== 2 || testPrice <= 0);
};
