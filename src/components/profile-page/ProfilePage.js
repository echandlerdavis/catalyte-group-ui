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

const ProfilePage = ({ user, setUser }) => {
  const [initialUser, setInitialUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState(null);
  const [successToast, setSuccessToast] = useState(false);
  const history = useHistory();
  const formHasError = useRef(false);
  const emptyFields = useRef([]);

  const setApiError = () => {
    // Handle the API error
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
  }, [setUser]);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    Cookies.remove('user');
    setUser(null);
    history.push('/');
  }, [history, setUser]);

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

    if (user.billingAddress) {
      const {
        billingStreet,
        billingCity,
        billingState,
        billingZip
      } = user.billingAddress;
      if (!billingStreet || !billingCity || !billingState || !billingZip) {
        errors.emptyBillingFields = true;
        hasError = true;
        emptyFields.current = [...emptyFields.current, 'billingAddress.billingStreet', 'billingAddress.billingCity', 'billingAddress.billingState', 'billingAddress.billingZip'];
      }
    }

    if (user.billingAddress && user.billingAddress.billingZip && (!/^\d{5}$/.test(user.billingAddress.billingZip) || Number.isNaN(Number(user.billingAddress.billingZip)))) {
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
    setUser(JSON.parse(JSON.stringify(initialUser)));
  }, [initialUser, setUser]);

  const handleSaveChanges = () => {
    if (validateForm()) {
      // Make the API call to save the user data
      saveUserData(user, setApiError)
        .then((userData) => {
          const userJson = JSON.stringify(userData);
          setInitialUser(userData); // Update the initial user data
          document.cookie = `user=${userJson}`;
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
                  <select
                    id="billingState"
                    name="billingState"
                    value={user.billingAddress ? user.billingAddress.billingState || 'AL' : 'AL'}
                    onChange={(e) => handleInputChange(e, 'billingAddress.billingState')}
                  >
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>
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
            {formErrorMessage
            && (formErrorMessage.emptyFields || formErrorMessage.emptyBillingFields) && (
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
