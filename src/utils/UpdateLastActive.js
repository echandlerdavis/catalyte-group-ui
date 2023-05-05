import HttpHelper from './HttpHelper';
import constants from './constants';

/**
 * update the lastActive field for user in the database to now
 * @param {Object} user
 * @param {function} setApiError
 * @param {function} setter
 */
const updateLastActive = async (user, setApiError) => {
  const updatedUser = user;
  if (user) {
    await HttpHelper(constants.UPDATE_LAST_ACTIVE_ENDPOINT(user.id), 'PUT', updatedUser)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(constants.API_ERROR);
      })
      .catch((er) => {
        setApiError(er.message);
      });
  }
};

/**
 * Parse document cookies in to an object of {key: value}. Keys and values are strings.
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
 * Error handler. Doesn't do anything per PO request.
 */
const errorSetter = () => null;

/**
 * Custom hook to update the lastActive time on a user.
 * @returns {React.MutableRefObject, function}
 */
const setLastActive = () => {
  const biscuits = parseCookies();
  // if no user in cookies, return without doing anything
  if (Object.keys(biscuits).includes('user')) {
    const user = JSON.parse(biscuits.user);
    updateLastActive(user, errorSetter);
  }
};

export default setLastActive;
