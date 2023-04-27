import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name fetchUser
 * @description Utilizes HttpHelper to make a GET request to retrieve user data for Profile Page.
 * @param {string} email User's email
 * @param {function} setUser Function to update the 'user' state with the fetched user data
 * @param {function} setApiError Function to update the 'apiError' state with an error, if necessary
 * @returns {Promise<object>} User profile data if successful, otherwise returns an error message
 */
const fetchUser = async (email, setUser, setApiError) => {
  try {
    const accessToken = localStorage.getItem('access_token');
    const userResponse = await HttpHelper(`${Constants.USER_ENDPOINT}?userEmail=${email}`, 'GET', {
      Authorization: `Bearer ${accessToken}`
    });
    const purchaseResponse = await HttpHelper(`${Constants.PURCHASE_ENDPOINT}?userEmail=${email}`, 'GET', {
      Authorization: `Bearer ${accessToken}`
    });

    if (!userResponse.ok || !purchaseResponse.ok) {
      throw new Error(Constants.API_ERROR);
    }
    const userData = await userResponse.json();
    const purchaseData = await purchaseResponse.json();

    const shippingAddress = purchaseData[0]?.deliveryAddress ?? {};

    setUser({
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      shippingAddress: {
        street: shippingAddress.street || '',
        city: shippingAddress.city || '',
        state: shippingAddress.state || '',
        zip: shippingAddress.zip || ''
      }
    });
  } catch (error) {
    setApiError(error.message);
  }
};

export default fetchUser;
