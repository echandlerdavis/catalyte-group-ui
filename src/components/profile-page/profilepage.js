import React, { useState, useEffect } from 'react';
import styles from './profilepage.module.css';
import fetchUser from './profilepageservice';
import Constants from '../../utils/constants';

/**
 * @name ProfilePage
 * @description Component for displaying the user profile page
 * @returns JSX elemnet that displays the user's first name, last name, email, phone number,
 * and shipping address
 */
const ProfilePage = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zip: ''
    }
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const accessToken = window.localStorage.getItem('access_token');

    fetch(Constants.USER_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}` // replace accessToken with actual token
      }
    })
      .then((response) => {
        if (response.status === 401) {
          setIsLoggedIn(false);
          throw new Error('User not authenticated');
        }
        setIsLoggedIn(true);
        return response.json();
      })
      .then((data) => fetchUser(data.email, setUser, setApiError))
      .catch((error) => console.error(error));
  }, []);

  if (!isLoggedIn) {
    return <div>Please log in to continue to your user page</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>
        {user.firstName}
        {user.lastName}
      </h1>
      {apiError ? (
        <div>Error retrieving user data. Please try again later.</div>
      ) : (
        <div className={styles.info}>
          <p>
            <strong>First Name:</strong>
            {user.firstName || ''}
          </p>
          <p>
            <strong>Last Name:</strong>
            {user.lastName || ''}
          </p>
          <p>
            <strong>Email:</strong>
            {user.email || ''}
          </p>
          <p>
            <strong>Phone Number:</strong>
            {user.phoneNumber || ''}
          </p>
          <p>
            <strong>Billing Address:</strong>
            {user.billingAddress.street || ''}
            {user.billingAddress.city || ''}
            {user.billingAddress.state || ''}
            {user.billingAddress.zip || ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
