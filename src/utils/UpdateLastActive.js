import { useRef } from 'react';
import constants from './constants';
import HttpHelper from './HttpHelper';

/**
 * update the lastActive field for user in the database to now
 * @param {Object} user
 * @param {function} setApiError
 * @param {function} setter
 */
const updateLastActive = async (user, setApiError, setter) => {
  const updatedUser = user;
  updatedUser.lastActive = Date.now();
  if (user !== null && user !== undefined) {
    await HttpHelper(constants.USERS_PUT_ENDPOINT(user.id), 'PUT', updatedUser)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(constants.API_ERROR);
      })
      .then(() => setter(false))
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

const mySetter = (string) => {
  console.log(string);
};

/**
 * Custom hook to update the lastActive time on a user.
 * @returns {React.MutableRefObject, function}
 */
const useLastActive = (initialValue) => {
  const firstVal = initialValue || false;
  // state
  const updateLastActivityTime = useRef(firstVal);
  // setter
  const setLastActivityTime = (updateValue) => {
    updateLastActivityTime.current = updateValue;
    // get user from cookies set in HeaderService.js
    const user = JSON.parse(parseCookies().user);
    if (updateLastActivityTime.current && user !== {} && user !== null && user !== undefined) {
      updateLastActive(user, mySetter, setLastActivityTime);
    }
  };
  return { updateLastActivityTime, setLastActivityTime };
};

export default useLastActive;
