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

// Not working correctly.
export const fetchPurchases = async (userEmail, setApiError, setPurchases) => {
  await HttpHelper(constants.PURCHASE_BY_EMAIL_ENDPOINT(userEmail), 'GET')
    .then((response) => response.json())
    .then((data) => setPurchases(data))
    .catch(() => {
      console.log('Problem caught!');
      setApiError(true);
    });
};

export const fetchUser = async (email, setUser, setApiError) => {
  await HttpHelper(`${constants.USERS_ENDPOINT}/${email}`, 'GET')
    .then((response) => response.json())
    .then((data) => setUser(data))
    .catch(() => {
      console.log('User Data Caught');
      setApiError(true);
    });
};
