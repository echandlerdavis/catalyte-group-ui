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
  products, deliveryAddress, billingAddress, creditCard, promoCode, contact
) => {
  try {
    const response = await HttpHelper(Constants.PURCHASE_ENDPOINT, 'POST', {
      products,
      deliveryAddress,
      billingAddress,
      creditCard,
      promoCode,
      contact
    });
    if (response.status === 201) return response.json();
    return false;
  } catch {
    console.log('Failed to purchase');
    return false;
  }
};
export default makePurchase;
