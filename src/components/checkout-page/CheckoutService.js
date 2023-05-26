import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';
/**
 *
 * @name makePayment
 * @description sends a purchase request
 * @param {*} cartContents items to purchase
 * @returns payment confirmation response
 */
const makePurchase = async (
  products,
  deliveryAddress,
  billingAddress,
  creditCard,
  contact,
  promoCode
) => {
  const purchaseReport = {
    success: false,
    data: null
  };
  let promoCodeObj;
  // null protect promocode
  if (promoCode === '') {
    promoCodeObj = null;
  }
  try {
    const response = await HttpHelper(Constants.PURCHASE_ENDPOINT, 'POST', {
      products,
      deliveryAddress,
      billingAddress,
      creditCard,
      promoCodeObj,
      contact
    });
    if (response.status === 201) {
      purchaseReport.success = true;
      purchaseReport.data = response.json();
      return purchaseReport;
    }
    purchaseReport.data = response;
    return purchaseReport;
  } catch (error) {
    /* eslint-disable no-console */
    console.log('Failed to purchase');
    /* eslint-enable no-console */
    purchaseReport.success = false;
    purchaseReport.data = error.json();
    return purchaseReport;
  }
};

export const fetchStateData = async () => {
  let data = null;
  await HttpHelper(Constants.STATES_ENDPOINT, 'GET')
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error('failed to get response.');
    })
    .then((d) => {
      data = d;
      return d;
    });
  if (data) {
    return data;
  }
  throw new Error('Failed to get state information.');
};

export const stateDataToList = (list) => {
  let arr = [];
  if (list.length > 0) {
    arr = list.map((obj) => obj.fullName);
  }
  return arr;
};
export default makePurchase;
