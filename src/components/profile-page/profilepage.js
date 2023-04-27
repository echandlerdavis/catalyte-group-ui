import React, { useState, useEffect } from 'react';
import styles from './profilepage.module.css';
import fetchUser from './profilepageservice';
import Constants from '../../utils/constants';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      .then((data) => fetchUser(data.email, setUser, console.error))
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
      <div className={styles.info}>
        <p>
          <strong>Email:</strong>
          {user.email}
        </p>
        <p>
          <strong>Shipping Address:</strong>
          {user.shippingAddress.street}
          {user.shippingAddress.city}
          {user.shippingAddress.state}
          {user.shippingAddress.zip}
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
