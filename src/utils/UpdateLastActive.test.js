import constants from './constants';
import updateLastActive from './UpdateLastActive';
import HttpHelper from './HttpHelper';

describe('updateLastActive should set lastActive in the database to now', () => {
  const testUser = {
    email: 'test@email.com',
    role: 'burgercook',
    firstName: 'Bob',
    lastName: 'Belcher'
  };

  const postNewUser = async (user) => {
    await HttpHelper(constants.USERS_ENDPOINT, 'POST', user)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(constants.API_ERROR);
      })
      .catch(() => null);
  };

  const sameUser = (user1, user2) => {
    if (!user1 || !user2) {
      return false;
    }
    return user1.email === user2.email
      && user1.role === user2.role
      && user1.firstName === user2.firstName
      && user1.lastName === user2.lastName;
  };

  const checkTestUser = async () => {
    await HttpHelper(`${constants.USERS_ENDPOINT}/${testUser.email}`, 'GET')
      .then((response) => {
        if (response.ok) {
          return sameUser(response.json(), testUser);
        }
        throw new Error(constants.API_ERROR);
      })
      .catch(() => false);
  };

  beforeAll(() => {
    // check connection to api and create a test user if it doesn't already exist
    if (!checkTestUser()) {
      const newUser = postNewUser(testUser);
      if (newUser === {}) {
        console.log(`added user: ${newUser}`);
        expect(true).toEqual(false);
      }
    }
  });

  afterAll(() => {
    // delete the test user?
  });

  it('sets lastActive to now', () => {
    const testTime = Date.now();
    const apiError = () => {
      console.log('Api error');
    };
    const updatedUser = updateLastActive(testUser, apiError);

    expect(updatedUser.lastActive).toBeGreaterThanOrEqual(testTime);
  });
});
