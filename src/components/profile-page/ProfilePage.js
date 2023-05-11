import React, { useState, useEffect, useCallback } from 'react';
import {
  Typography,
  Grid
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { fetchUser, parseCookies } from './ProfilePageService';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [apiError, setApiError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const cookies = parseCookies();
    const cookiesUser = cookies.user ? JSON.parse(cookies.user) : null;
    if (cookiesUser) {
      setIsLoggedIn(true);
      fetchUser(cookiesUser.email, setUser, setApiError);
    } else {
      setIsLoggedIn(false);
      setUser(null); // Clear the user data
    }
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    Cookies.remove('user');
    setUser(null);
    history.push('/');
  }, [history]);

  useEffect(() => {
    const handleExternalLogout = () => {
      handleLogout();
    };

    window.addEventListener('logout', handleExternalLogout);

    return () => {
      window.removeEventListener('logout', handleExternalLogout);
    };
  }, [handleLogout]);

  useEffect(() => {
    if (!isLoggedIn) {
      const timeout = setTimeout(() => {
        history.push('/');
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }

    return undefined;
  }, [isLoggedIn, history]);

  if (!isLoggedIn) {
    return (
      <div>
        Please log in to continue to your profile page
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${styles.center}`}>
      {apiError ? (
        <div className={styles.errMsg}>
          Error retrieving user data. Please try again later.
        </div>
      ) : (
        <div>
          <Typography variant="h6" gutterBottom>
            Account Details
          </Typography>
          <Grid container spacing={1} className={styles.gridContainer}>
            <Grid item xs={3} sm={6} className={styles.gridItem}>
              <Typography variant="">
                {user?.firstName || 'Error retrieving user data'}
                {' '}
                {user?.lastName || ''}
              </Typography>
            </Grid>
            <Grid item xs={8} className={styles.gridItem}>
              <Typography>
                {user?.email || 'Error retrieving user data'}
              </Typography>
            </Grid>
            <Grid item xs={8} className={styles.gridItem}>
              <Typography>
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
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
