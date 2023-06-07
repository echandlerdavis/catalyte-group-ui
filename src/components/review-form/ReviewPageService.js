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

export const fetchProductIdsPurchased = (userEmail, setHasMadePurchase, setApiError, productId) => {
  HttpHelper(constants.PURCHASE_PRODUCT_IDS_BY_EMAIL_ENDPOINT(userEmail), 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    })
    .then((data) => setHasMadePurchase(data.includes(productId)))
    .catch(() => {
      setApiError(true);
    });
};
