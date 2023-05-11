import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';
/**
 *
 * @name makePayment
 * @description sends a purchase request
 * @param {*} cartContents items to purchase
 * @returns payment confirmation response
 */
const makePurchase = async (products, deliveryAddress, billingAddress, creditCard, contact) => {
  const purchaseReport = {
    success: false,
    data: null
  };
  try {
    const response = await HttpHelper(Constants.PURCHASE_ENDPOINT, 'POST', {
      products,
      deliveryAddress,
      billingAddress,
      creditCard,
      contact
    });
    if (response.status === 201) {
      purchaseReport.success = true;
      purchaseReport.data = response.json();
      return purchaseReport;
    }
    console.log(response.status);
    purchaseReport.data = response;
    return purchaseReport;
  } catch (error) {
    console.log('Failed to purchase', error);
    purchaseReport.success = false;
    purchaseReport.data = error.json();
    return purchaseReport;
  }
};
export default makePurchase;
