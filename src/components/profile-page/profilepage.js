import React, { useState, useEffect } from 'react';
import EmailIcon from '@material-ui/icons/Email';
import ShippingIcon from '@material-ui/icons/LocalShipping';
import styles from './ProfilePage.module.css';
import { fetchUser, parseCookies } from './ProfilePageService';

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
      street2: '',
      city: '',
      state: '',
      zip: ''
    }
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const cookies = parseCookies();
    const cookiesUser = cookies.user ? JSON.parse(cookies.user) : null;
    if (user) {
      setIsLoggedIn(true);
      fetchUser(cookiesUser.email, setUser, setApiError);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

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
            {user.billingAddress.billingStreet || ''}
            {user.billingAddress.billingStreet2 || ''}
            {user.billingAddress.billingCity || ''}
            {user.billingAddress.billingState || ''}
            {user.billingAddress.billingZip || ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
