import HttpHelper from '../../utils/HttpHelper';
import { getUserFromCookies } from '../../utils/UpdateLastActive';

/**
 * @name getUserByEmail
 * @description Gets the user by email to see if exists
 * @param {String} email Target Email
 * @param {Function} setUser Sets the user state
 */
const getUserByEmail = async (email, setUser) => {
  let userByEmailExists;

  await HttpHelper(`/users/${email}`, 'GET')
    .then((response) => {
      if (response.status === 200) {
        userByEmailExists = true;
        return response.json();
      }
      if (response.status === 404) {
        userByEmailExists = false;
      }
      throw new Error(response.statusText);
    })
    .then((body) => {
      setUser(body);
      document.cookie = `user=${JSON.stringify(body)}`;
    })
    .catch(() => {});

  return userByEmailExists;
};

/**
 * @name createUser
 * @description Posts a user to the backend
 * @param {Object} user The user to create
 * @param {Function} setUser Sets the user state
 * @param {Function} setApiError Sets the API Error state
 */
const createUser = async (user, setUser, setApiError) => {
  await HttpHelper('/users', 'POST', user)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((body) => {
      setUser(body);
      document.cookie = `user=${JSON.stringify(body)}`;
    })
    .catch(() => {
      setApiError(true);
    });
};

/**
 * @name loginUser
 * @description Sends a login request to the backend and get user information
 * @param {Object} googleUser The googleUser object
 * @param {Function} setUser Sets the user
 * @param {Function} setApiError Sets the Api Error
 */
const loginUser = async (googleUser, setUser, setApiError) => {
  const userByEmailExists = await getUserByEmail(googleUser.email, setUser);
  if (!userByEmailExists) {
    createUser(googleUser, setUser, setApiError);
  }
};

export const clearUserCookie = () => {
  const user = getUserFromCookies();
  if (user) {
    const now = new Date();
    document.cookie = `user=${JSON.stringify(user)}; expires=${now.toUTCString()};`;
  }
};

export default loginUser;
