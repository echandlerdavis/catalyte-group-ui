import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 * 
 * @name fetchUser
 * @description Utilizes HttpHelper t omake a GET request to retrieve user data to use in the User Profile Page.
 * @param {*} userId User ID for the profile to retrieve
 * @returns User profile data if successful, otherwise returns an error message
 */
const fetchUser = async (setUser, setApiError) => {
    await HttpHelper(Constants.USER_ENPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setUser)
    .catch((e) => {
      setApiError(e.message);
    });
};

export default fetchUser;