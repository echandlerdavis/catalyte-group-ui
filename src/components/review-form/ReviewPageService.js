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
export const fetchPurchases = async (userEmail, setApiError, setHasMadePurchase, productId) => {
  await HttpHelper(constants.PURCHASE_BY_EMAIL_ENDPOINT(userEmail), 'GET')
    .then((response) => response.json())
    .then((data) => {
      console.log(productId);
      Object.keys(data).forEach((key) => {
        const productsArray = data[key].products;
        console.log(productsArray);
        if (productsArray.length > 0) {
          productsArray.forEach((item) => {
            if (item.product.id === productId) {
              console.log('Found it!');
              setHasMadePurchase(true);
            }
          });
        }
      });
    })
    .catch(() => setApiError(true));
};

export const fetchUser = async (email, setUser, setApiError) => {
  await HttpHelper(`${constants.USERS_ENDPOINT}/${email}`, 'GET')
    .then((response) => response.json())
    .then((data) => setUser(data))
    .catch(() => {
      setApiError(true);
    });
};
