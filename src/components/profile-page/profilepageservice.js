import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 * 
 * @name fetchUser
 * @description Utilizes HttpHelper t omake a GET request to retrieve user data to use in the User Profile Page.
 * @param {*} userId User ID for the profile to retrieve
 * @returns User profile data if successful, otherwise returns an error message
 */
const fetchUser = async (userId) => {
    try {
        const response = await HttpHelper(`${Constants.USER_ENDPOINT}/${userId}`, 'GET');
        if (!response.ok) {
            throw new Error(Constants.API_ERROR);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return{error: error.message};
    }
};

export default fetchUser;