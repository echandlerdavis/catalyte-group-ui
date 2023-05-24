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

// .then((data) => {
//   console.log(productId);
//   Object.keys(data).forEach((key) => {
//     const productsArray = data[key].products;
//     console.log(productsArray);
//     if (productsArray.length > 0) {
//       productsArray.forEach((item) => {
//         if (item.product.id === productId) {
//           console.log('Found it!');
//           setHasMadePurchase(true);
//         }
//       });
//     }
//   });
// })

// Not working correctly.
export const fetchPurchases = async (userEmail, setPurchases, setApiError) => {
  await HttpHelper(constants.PURCHASE_BY_EMAIL_ENDPOINT(userEmail), 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    })
    .then(setPurchases)
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
