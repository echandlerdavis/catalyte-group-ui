import React from 'react';
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

  const postNewUser = async (user, setApiError) => {
    await HttpHelper(constants.USERS_ENDPOINT, 'POST', user)
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

  beforeAll(() => {
    // check connection to api and create a test user if it doesn't already exist
    const user = 
  });

  afterAll(() => {
    // delete the test user?
  });

  it('sets lastActive to now', () => {
    expect(screen.getByTestId('errMsg')).toHaveTextContent('Oops, something went wrong');
  });
});
