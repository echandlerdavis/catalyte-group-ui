import React, {
  useState,
  useEffect,
  useCallback,
  useRef
} from 'react';
import { Button } from '@material-ui/core';
import { Save, Cancel } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import AppAlert from '../alert/Alert';
import { fetchUser, parseCookies, saveUserData } from './ProfilePageService';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [initialUser, setInitialUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState(null);
  const [successToast, setSuccessToast] = useState(false);
  const history = useHistory();
  const formHasError = useRef(false);
  const emptyFields = useRef([]);

  const setApiError = (error) => {
    // Handle the API error
    console.log('API error:', error);
  };

  useEffect(() => {
    const cookies = parseCookies();
    const cookiesUser = cookies.user ? JSON.parse(cookies.user) : null;
    if (cookiesUser) {
      setIsLoggedIn(true);
      fetchUser(cookiesUser.email, setUser, setInitialUser, setApiError);
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

  const validateForm = () => {
    let hasError = false;
    const errors = {};

    if (!user.firstName || !user.lastName || !user.email) {
      errors.emptyFields = true;
      hasError = true;
      emptyFields.current = ['firstName', 'lastName', 'email'];
    }

    if (user.billingAddress && user.billingAddress.billingZipcode && (!/^\d{5}$/.test(user.billingAddress.billingZipcode) || Number.isNaN(Number(user.billingAddress.billingZipcode)))) {
      errors.zipcodeInvalid = true;
      hasError = true;
    }

    if ((user.firstName && !/^[a-zA-Z]+$/.test(user.firstName)) || (user.lastName && !/^[a-zA-Z]+$/.test(user.lastName))) {
      errors.nameInvalid = true;
      hasError = true;
    }

    formHasError.current = hasError;
    setFormErrorMessage(errors);

    return !hasError;
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    const fieldPath = field.split('.'); // Split the field path into an array

    // Update the user object with nested field values
    setUser((prevUser) => {
      const updatedUser = { ...prevUser };
      let nestedObject = updatedUser;

      // Traverse the field path and update the nested object
      fieldPath.forEach((key, index) => {
        if (index === fieldPath.length - 1) {
          // Update the final nested field value
          nestedObject[key] = value;
        } else {
          // Traverse deeper into the nested object
          nestedObject[key] = { ...nestedObject[key] };
          nestedObject = nestedObject[key];
        }
      });

      return updatedUser;
    });
  };

  const handleCancelChanges = useCallback(() => {
    console.log('handleCancelChanges triggered');
    console.log('Initial user:', initialUser);
    setUser(JSON.parse(JSON.stringify(initialUser)));
  }, [initialUser]);

  const handleSaveChanges = () => {
    if (validateForm()) {
      // Make the API call to save the user data
      saveUserData(user)
        .then(() => {
          setInitialUser(JSON.parse(JSON.stringify(user))); // Update the initial user data
          setSuccessToast(true);
        })
        .catch((error) => {
          setApiError(error);
        });
    }
  };

  return (
    <div className={styles.container}>
      {isLoggedIn ? (
        <div>
          <h1>
            Welcome,
            {' '}
            {user.firstName}
            !
          </h1>
          <form>
            <div className={styles.fieldContainer}>
              <div className={styles.field}>
                <label htmlFor="firstName">
                  First Name:
                  {' '}
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={user.firstName || ''}
                    onChange={(e) => handleInputChange(e, 'firstName')}
                  />
                </label>
              </div>
              <div className={styles.field}>
                <label htmlFor="lastName">
                  Last Name:
                  {' '}
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={user.lastName || ''}
                    onChange={(e) => handleInputChange(e, 'lastName')}
                  />
                </label>
              </div>
              <div className={styles.field}>
                <label htmlFor="email">
                  Email:
                  {' '}
                  <input
                    type="email"
                    name="email"
                    value={user.email || ''}
                    readOnly
                  />
                </label>
              </div>
              <div className={styles.field}>
                <h3>Billing Address:</h3>
                <label htmlFor="billingStreet">
                  Street:
                  {' '}
                  <input
                    type="text"
                    id="billingStreet"
                    name="billingStreet"
                    value={user.billingAddress ? user.billingAddress.billingStreet || '' : ''}
                    onChange={(e) => handleInputChange(e, 'billingAddress.billingStreet')}
                  />
                </label>
              </div>
              <div className={styles.field}>
                <label htmlFor="billingStreet2">
                  Street 2:
                  {' '}
                  <input
                    type="text"
                    id="billingStreet2"
                    name="Street 2"
                    value={user.billingAddress ? user.billingAddress.billingStreet2 || '' : ''}
                    onChange={(e) => handleInputChange(e, 'billingAddress.billingStreet2')}
                  />
                </label>
              </div>
              <div className={styles.field}>
                <label htmlFor="billingCity">
                  City:
                  {' '}
                  <input
                    type="text"
                    id="billingCity"
                    name="billingCity"
                    value={user.billingAddress ? user.billingAddress.billingCity || '' : ''}
                    onChange={(e) => handleInputChange(e, 'billingAddress.billingCity')}
                  />
                </label>
              </div>
              <div className={styles.field}>
                <label htmlFor="billingState">
                  State:
                  {' '}
                  <input
                    type="text"
                    id="billingState"
                    name="billingState"
                    value={user.billingAddress ? user.billingAddress.billingState || '' : ''}
                    onChange={(e) => handleInputChange(e, 'billingAddress.billingState')}
                  />
                </label>
              </div>
              <div className={styles.field}>
                <label htmlFor="billingZip">
                  Zip Code:
                  {' '}
                  <input
                    type="text"
                    id="billingZip"
                    name="billingZip"
                    value={user.billingAddress ? user.billingAddress.billingZip || '' : ''}
                    onChange={(e) => handleInputChange(e, 'billingAddress.billingZip')}
                  />
                </label>
              </div>
            </div>
            {formErrorMessage && formErrorMessage.emptyFields && (
              <p className={styles.error}>Please fill in all fields.</p>
            )}
            {formErrorMessage && formErrorMessage.zipcodeInvalid && (
              <p className={styles.error}>Please enter a valid zip code.</p>
            )}
            {formErrorMessage && formErrorMessage.nameInvalid && (
              <p className={styles.error}>Please enter a valid name (letters only).</p>
            )}
          </form>
          <div className={styles.formButtonContainer}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Cancel />}
              onClick={handleCancelChanges}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Save />}
              onClick={handleSaveChanges}
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <h1>Please log in to view your profile.</h1>
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      )}
      {successToast && (
        <AppAlert
          severity="success"
          message="User data saved successfully!"
          onClose={() => setSuccessToast(false)}
        />
      )}
    </div>
  );
};

export default ProfilePage;
