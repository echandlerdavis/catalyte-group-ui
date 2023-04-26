import constants from './constants';
import HttpHelper from './HttpHelper';

const updateLastActive = async (user, setApiError) => {
  const updatedUser = user;
  updatedUser.lastActive = Date.now();
  await HttpHelper(constants.USERS_PUT_ENDPOINT(user.id), 'PUT', updatedUser)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    })
    .catch(() => {
      setApiError(true);
    });
};

export default updateLastActive;
