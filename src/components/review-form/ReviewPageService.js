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

const findIfUserHasMadePurchase = (data, productId) => {
  let matchesId = false;
  Object.keys(data).forEach((key) => {
    const productsArray = data[key].products;
    console.log(productsArray);
    if (productsArray.length > 0) {
      productsArray.forEach((item) => {
        if (item.product.id === productId) {
          matchesId = true;
        }
      });
    }
  });
  return matchesId;
};

// Not working correctly.
export const fetchPurchases = async (userEmail, setApiError, setHasMadePurchase, productId) => {
  await HttpHelper(constants.PURCHASE_BY_EMAIL_ENDPOINT(userEmail), 'GET')
    .then((response) => response.json())
    .then((data) => {
      console.log(productId);
      if (findIfUserHasMadePurchase(data, productId) === true) {
        // No longer seems to be hitting this.
        console.log('Found it');
        setHasMadePurchase(true);
      }
    })
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
