import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';

export const saveReview = async (review, setApiError, productId) => {
  try {
    const response = await HttpHelper(constants.REVIEWS_ENDPOINT(productId), 'POST', review);
    return response.json();
  } catch {
    setApiError(true);
    return false;
  }
};

export const fetchPurchases = async (userEmail, setApiError, setHasMadePurchase, productId) => {
  await HttpHelper(constants.PURCHASE_BY_EMAIL_ENDPOINT(userEmail), 'GET')
    .then((response) => response.json())
    .then((data) => {
      // not sure this for loop is correct - does it need to loop through each product first.
    //   for (purchase in data) {
    //     if (purchase.products.product.id == productId) {
    //       setHasMadePurchase(true);
    //     }
    //   }
    // GOtta do on OBject.keys situation to make this work.
      console.log(data);
      console.log(productId);
      setHasMadePurchase(true);
    })
    .catch(() => setApiError(true));
};
