import React, { useState, useEffect } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { fetchUser, parseCookies } from './ProfilePageService';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const cookies = parseCookies();
    const cookiesUser = cookies.user ? JSON.parse(cookies.user) : null;
    if (cookiesUser) {
      setIsLoggedIn(true);
      fetchUser(cookiesUser.email, setUser, setApiError);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  if (!isLoggedIn) {
    return <div>Please log in to continue to your user page</div>;
  }

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        {user?.firstName || ''}
        {' '}
        {user?.lastName || ''}
      </Typography>
      {apiError ? (
        <div className={styles.errMsg}>
          Error retrieving user data. Please try again later.
        </div>
      ) : (
        <div>
          <Typography variant="h6" gutterBottom>
            Account Details
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={3} sm={6}>
              <Typography variant="body3">
                {user?.firstName || 'Error retrieving user data'}
                {' '}
                {user?.lastName || ''}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body3">
                {user?.email || 'Error retrieving user data'}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body3">
                {user?.billingAddress ? (
                  <>
                    {user.billingAddress.billingStreet || ''}
                    {user.billingAddress.billingStreet2 || ''}
                    {', '}
                    {user.billingAddress.billingCity || ''}
                    {', '}
                    {user.billingAddress.billingState || ''}
                    {' '}
                    {user.billingAddress.billingZip || ''}
                  </>
                ) : (
                  'Error retrieving user data'
                )}
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="body4">
            <span className={styles.edit}>
              <p> </p>
              <b>edit</b>
            </span>
          </Typography>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
