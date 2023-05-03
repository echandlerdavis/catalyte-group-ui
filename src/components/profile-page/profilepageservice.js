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
    const userResponse = await HttpHelper(`${Constants.USER_ENDPOINT}?userEmail=${email}`, 'GET');

    if (!userResponse.ok) {
      throw new Error(Constants.API_ERROR);
    }
    const userData = await userResponse.json();

    if (!userData) {
      const testUsersResponse = await HttpHelper(`${Constants.USER_ENDPOINT}/test-users`, 'GET');
      const testUsers = await testUsersResponse.json();
      const testUserData = testUsers.find((user) => user.email === email);

      if (!testUserData) {
        throw new Error(Constants.API_ERROR);
      }

      setUser({
        firstName: testUserData.firstName,
        lastName: testUserData.lastName,
        email: testUserData.email,
        billingAddress: {
          street: testUserData.billingAddress.street,
          city: testUserData.billingAddress.city,
          state: testUserData.billingAddress.state,
          zip: testUserData.billingAddress.zip
        }
      });
    } else {
      setUser({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        billingAddress: {
          street: userData.billingAddress.street || '',
          city: userData.billingAddress.city || '',
          state: userData.billingAddress.state || '',
          zip: userData.billingAddress.zip || ''
        }
      });
    }
  } catch (error) {
    setApiError(error.message);
  }
};

export default fetchUser;
