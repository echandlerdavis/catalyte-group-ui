import React, { useState, useEffect } from 'react';
import EmailIcon from '@material-ui/icons/Email';
import ShippingIcon from '@material-ui/icons/LocalShipping';
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
    // Check if user is logged-in via Google
    const authInstance = window.GamepadHapticActuator.auth2.getAuthInstance();
    const isGoogleAuthenticated = authInstance.isSignedIn.get();

    if (!isGoogleAuthenticated) {
      setIsLoggedIn(false);
      return;
    }
    fetch(Constants.USER_ENDPOINT)
      .then((response) => {
        if (response.status === 401) {
          setIsLoggedIn(false);
          throw new Error('User not authenticated');
        }
        setIsLoggedIn(true);
        return response.json();
      })
      .then((data) => fetchUser(data.email, setUser, setApiError))
      .catch((error) => {
        setApiError(error.message);
      });
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
            <span>
              <EmailIcon />
              Email:
            </span>
            {user.email || ''}
          </p>
          <p>
            <span>
              <ShippingIcon />
              Billing Address:
            </span>
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
