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
export const fetchPurchases = (userEmail, setHasMadePurchase, setApiError, productId) => {
  HttpHelper(constants.PURCHASE_BY_EMAIL_ENDPOINT(userEmail), 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    })
    .then((data) => {
      console.log(productId);
      Object.keys(data).forEach((key) => {
        const productsArray = data[key].products;
        if (productsArray.length > 0) {
          productsArray.forEach((item) => {
            if (item.product.id === productId) {
              setHasMadePurchase(true);
            }
          });
        }
      });
    })
    .catch(() => {
      setApiError(true);
    });
};

export const fetchUser = (email, setUser, setApiError) => {
  HttpHelper(`${constants.USERS_ENDPOINT}/${email}`, 'GET')
    .then((response) => response.json())
    .then(setUser)
    .catch(() => {
      setApiError(true);
    });
};

export const fetchUserAndFormData = (email, setUser, setFormData, formData, setApiError) => {
  HttpHelper(`${constants.USERS_ENDPOINT}/${email}`, 'GET')
    .then((response) => response.json())
    .then((data) => {
      setUser(data);
      const { firstName, lastName } = data;
      setFormData({ ...formData, userEmail: email, userName: `${firstName} ${lastName}` });
    })
    .catch(() => {
      setApiError(true);
    });
};
