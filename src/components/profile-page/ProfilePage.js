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
import { fetchUser, parseCookies } from './ProfilePageService';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [initialUser, setInitialUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState(null);
  const [successToast, setSuccessToast] = useState(false);
  const [cancelToast, setCancelToast] = useState(false);
  const history = useHistory();
  const formHasError = useRef(false);
  const emptyFields = useRef([]);

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
    const { value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value
    }));
  };

  const handleCancel = () => {
    // Reset user data to initial state
    setUser(initialUser);
    setCancelToast(true);
  };

  const handleSave = () => {
    // Implement logic to save the updated user data
    if (validateForm()) {
      // Save the user data
      // ...
      setSuccessToast(true);
    }
  };

  const validateForm = () => {
    let hasError = false;
    const errors = {};

    if (!user.firstName || !user.lastName || !user.email) {
      errors.emptyFields = true;
      hasError = true;
      emptyFields.current = ['firstName', 'lastName', 'email'];
    }

    if (user.zipcode && (!/^\d{5}$/.test(user.zipcode) || isNaN(user.zipcode))) {
      errors.zipcodeInvalid = true;
      hasError = true;
    }

    if ((user.firstName && !/^[a-zA-Z]+$/.test(user.firstName)) ||
        (user.lastName && !/^[a-zA-Z]+$/.test(user.lastName))) {
      errors.nameInvalid = true;
      hasError = true;
    }

    formHasError.current = hasError;
    setFormErrorMessage(errors);

    return !hasError;
  };

  const setApiError = (message) => {
    setFormErrorMessage({ apiError: message });
  };

  return (
    <div className={styles.container}>
      {isLoggedIn ? (
        <>
          <h1>Welcome, {user?.firstName}!</h1>
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={user?.firstName || ''}
                onChange={(e) => handleInputChange(e, 'firstName')}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={user?.lastName || ''}
                onChange={(e) => handleInputChange(e, 'lastName')}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user?.email || ''}
                onChange={(e) => handleInputChange(e, 'email')}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="zipcode">Zip Code:</label>
              <input
                type="text"
                id="zipcode"
                name="zipcode"
                value={user?.zipcode || ''}
                onChange={(e) => handleInputChange(e, 'zipcode')}
              />
            </div>
            <div className={styles.buttons}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Save />}
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<Cancel />}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </form>
          {formErrorMessage && (
            <AppAlert type="error" message={formErrorMessage.apiError} />
          )}
          {formErrorMessage && formErrorMessage.emptyFields && (
            <AppAlert type="error" message="Please fill in all fields." />
          )}
          {formErrorMessage && formErrorMessage.zipcodeInvalid && (
            <AppAlert type="error" message="Invalid zip code." />
          )}
          {formErrorMessage && formErrorMessage.nameInvalid && (
            <AppAlert type="error" message="Invalid name format." />
          )}
          {successToast && (
            <AppToast
              type="success"
              message="Changes saved successfully!"
              onClose={() => setSuccessToast(false)}
            />
          )}
          {cancelToast && (
            <AppToast
              type="info"
              message="Changes canceled."
              onClose={() => setCancelToast(false)}
            />
          )}
        </>
      ) : (
        <h1>Please log in to view your profile.</h1>
      )}
    </div>
  );
};

export default ProfilePage;
