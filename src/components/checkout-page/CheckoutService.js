import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name makePayment
 * @description sends a purchase request
 * @param {*} cartContents items to purchase
 * @returns payment confirmation response
 */
const makePurchase = async (products, deliveryAddress, billingAddress, creditCard, promoCode) => {
  await HttpHelper(Constants.PURCHASE_ENDPOINT, 'POST', {
    products,
    deliveryAddress,
    billingAddress,
    creditCard,
    promoCode
  })
    .then((response) => response.json())
    .catch(() => {
      /* eslint-disable no-console */
      console.log('Failed to purchase');
      /* eslint-enable no-console */
    });
};
export default makePurchase;
