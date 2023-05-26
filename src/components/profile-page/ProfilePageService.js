import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 * Parse document cookies into an object of {key: value}. Keys and values are strings.
 * @returns object
 */
const parseCookies = () => {
  const cookiesAsArray = document.cookie.split(';');
  const dict = {};
  cookiesAsArray.forEach((s) => {
    const pair = s.split('=');
    dict[pair[0].trim()] = pair[1].trim();
  });
  return dict;
};

/**
 *
 * @name fetchUser
 * @description Utilizes HttpHelper to make a GET request to retrieve user data for Profile Page.
 * @param {string} email User's email
 * @param {function} setUser Function to update the 'user' state with the fetched user data
 * @param {function} setApiError Function to update the 'apiError' state with an error, if necessary
 * @returns {Promise<object>} User profile data if successful, otherwise returns an error message
 */
const fetchUser = async (email, setUser, setInitialUser, setApiError) => {
  try {
    const cookies = parseCookies();
    const userCookie = cookies.user ? JSON.parse(cookies.user) : null;
    let user;

    if (userCookie && userCookie.email === email) {
      // Use user data from cookie if available and email matches
      user = userCookie;
      setUser(user);
      setInitialUser(user);
    } else {
      // Use Test User data if no cookie is found or email doesn't match
      const response = await HttpHelper(`${Constants.USERS_ENDPOINT}/${email}`, 'GET');
      if (response.ok) {
        user = await response.json();
        setUser(user);
        setInitialUser(user);
      } else {
        setApiError(`Error retrieving user data from ${Constants.USERS_ENDPOINT}`);
        return null;
      }
    }

    return user;
  } catch (error) {
    setApiError('Unexpected error Occurred');
    return null;
  }
};

/**
 *
 * @name saveUserData
 * @description Utilizes HttpHelper to make a POST request to save user data.
 * @param {object} user The user data to be saved
 * @param {function} setApiError Function to update the 'apiError' state with an error, if necessary
 * @returns {Promise<object>} Saved user data if successful, otherwise returns false
 */
const saveUserData = async (user, setApiError) => {
  try {
    const response = await HttpHelper(`${Constants.USERS_ENDPOINT}/email/${user.email}`, 'PUT', user);
    return response.json();
  } catch {
    setApiError(true);
    return false;
  }
};

export { fetchUser, parseCookies, saveUserData };
