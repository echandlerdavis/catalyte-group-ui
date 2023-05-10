import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name makePayment
 * @description sends a purchase request
 * @param {*} cartContents items to purchase
 * @returns payment confirmation response
 */
const makePurchase = async (products, deliveryAddress, billingAddress, creditCard) => {
  const resp = {
    status: null,
    data: null,
    success: false,
    errors: ''
  };
  await HttpHelper(Constants.PURCHASE_ENDPOINT, 'POST', {
    products,
    deliveryAddress,
    billingAddress,
    creditCard
  })
    .then((response) => {
      resp.status = response.status;
      if (response.ok) {
        resp.success = true;
        resp.data = response.json();
      } else {
        resp.errors = response.json();
      }
    })
    .catch();

  return resp;
};
export default makePurchase;
