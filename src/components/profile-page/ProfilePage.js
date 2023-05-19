import React, { useState, useEffect, useCallback } from 'react';
import {
  Typography,
  Grid,
  TextField,
  Button
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { fetchUser, parseCookies } from './ProfilePageService';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [initialUser, setInitialUser] = useState(null);
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

  useEffect(() => {
    // Set initialUser wheuser data is fetched
    if (user) {
      setInitialUser(user);
    }
  }, [user]);

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

  const handleInputChange = (e, field) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: e.target.value
    }));
  };

  const handleCancel = () => {
    // Reset user data to initial state
    setUser(initialUser);
  };

  const handleSave = () => {
    // Implement logic to save the updated user data
  };

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
          <Typography variant="h6" gutterBottom className={styles.center}>
            Account Details
          </Typography>
          <Grid container spacing={1} className={styles.gridContainer}>
            <Grid item xs={4} sm={6} className={styles.gridItem}>
              <div className={`${styles.label} ${styles.blackFont}`}>Name:</div>
              <TextField
                value={user?.firstName || ''}
                onChange={(e) => handleInputChange(e, 'firstName')}
                fullWidth
                className={styles.textField}
              />
              <TextField
                value={user?.lastName || ''}
                onChange={(e) => handleInputChange(e, 'lastName')}
                fullWidth
                className={styles.textField}
              />
            </Grid>
            <Grid item xs={8} className={styles.gridItem}>
              <div className={`${styles.labelColumn} ${styles.label}`}>Email:</div>
              <div className={`${styles.dataColumn} ${styles.blackFont}`}>
                <Typography>
                  {user?.email || 'Error retrieving user data'}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={8} className={styles.gridItem}>
              <div className={`${styles.labelColumn} ${styles.label}`}>Billing Address:</div>
            </Grid>
            <Grid item xs={8} className={styles.gridItem}>
              <div className={`${styles.label}`}>Street:</div>
              <TextField
                value={user?.billingAddress?.billingStreet || ''}
                onChange={(e) => handleInputChange(e, 'billingAddress.billingStreet')}
                fullWidth
                className={styles.textField}
              />
            </Grid>
            <Grid item xs={8} className={styles.gridItem}>
              <div className={styles.label}>Street 2:</div>
              <TextField
                value={user?.billingAddress?.billingStreet2 || ''}
                onChange={(e) => handleInputChange(e, 'billingAddress.billingStreet2')}
                fullWidth
                className={styles.textField}
              />
            </Grid>
            <Grid item xs={8} className={styles.gridItem}>
              <div className={styles.label}>City:</div>
              <TextField
                value={user?.billingAddress?.billingCity || ''}
                onChange={(e) => handleInputChange(e, 'billingAddress.billingCity')}
                fullWidth
                className={styles.textField}
              />
            </Grid>
            <Grid item xs={8} className={styles.gridItem}>
              <div className={styles.label}>State:</div>
              <TextField
                value={user?.billingAddress?.billingState || ''}
                onChange={(e) => handleInputChange(e, 'billingAddress.billingState')}
                fullWidth
                className={styles.textField}
              />
            </Grid>
            <Grid item xs={8} className={styles.gridItem}>
              <div className={styles.label}>Zipcode:</div>
              <TextField
                value={user?.billingAddress?.billingZip || ''}
                onChange={(e) => handleInputChange(e, 'billingAddress.billingZip')}
                fullWidth
                className={styles.textField}
              />
            </Grid>
          </Grid>
          <div className={styles.buttonContainer}>
            <Button variant="contained" color="primary" size="small" onClick={handleSave}>
              Save
            </Button>
            <Button variant="contained" size="small" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
