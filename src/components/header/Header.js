import React, { useState } from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { AllInclusive } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import loginUser from './HeaderService';
import constants from '../../utils/constants';
import iconWithBadge from './IconWithBadge';
import { useCart } from '../checkout-page/CartContext';
import Toast from '../toast/Toast';

/**
 * @name Header
 * @description Displays the navigation header
 * @return component
 */
const Header = () => {
  const [user, setUser] = useState('');
  const [googleError, setGoogleError] = useState('');
  const [apiError, setApiError] = useState(false);
  const history = useHistory();
  const {
    state: { products }
  } = useCart();
  // Toast Example Button - To be deleted, shows how to implement a toast.
  const [open, setOpen] = useState(false);

  const handleToastClick = () => {
    setOpen(true);
  };

  const handleToastClose = () => {
    setOpen(false);
  };

  /**
   * @name handleGoogleLoginSuccess
   * @description Function to run if google login was successful
   * @param {Object} response Response object from google
   */
  const handleGoogleLoginSuccess = (response) => {
    sessionStorage.setItem('token', response.getAuthResponse().id_token);
    const googleUser = {
      email: response.profileObj.email,
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName
    };
    loginUser(googleUser, setUser, setApiError);
    setGoogleError('');
  };

  /**
   * @name handleGoogleLoginSuccess
   * @description Function to run if google login was unsuccessful
   */
  const handleGoogleLoginFailure = () => {
    setGoogleError(
      'There was a problem logging in with Google. Please wait and try again later.'
    );
  };

  /**
   * @name handleGoogleLogoutSuccess
   * @description Function to run if google logout was successful
   */
  const handleGoogleLogoutSuccess = () => {
    setUser('');
    setGoogleError('');
  };

  /**
   * @name handleGoogleLogoutFailure
   * @description Function to run if google logout was unsuccessful
   */
  const handleGoogleLogoutFailure = () => {
    setGoogleError(
      'There was a problem logging out with Google. Please wait and try again later.'
    );
  };

  /**
   * @name handleLogoClick
   * @description Redirect the page to / when clicked
   */
  const handleLogoClick = () => {
    history.push('/');
  };
  /**
   * @name handleCartClick
   * @description Redirect the page to / when clicked
   */
  const handleCartClick = () => {
    history.push('/checkout');
  };

  return (
    <div id="header" className="App-header Set-to-front">
      <AllInclusive className="App-header-margin App-logo" onClick={handleLogoClick} />
      <Button onClick={handleToastClick} variant="contained">Click to Open Toast</Button>
      {googleError && <span className="App-header-margin">{googleError}</span>}
      {apiError && <span className="App-header-margin">Api Error</span>}
      {
        <span className="App-header-margin App-header-optional-text" style={{ flexBasis: '10vh' }}>
          {user && `${user.firstName} ${user.lastName}`}
        </span>
}
      {iconWithBadge(
        {
          baseIcon: <ShoppingCartIcon onClick={handleCartClick} />,
          displayValue: products.length,
          styleClass: 'App-header-margin'
        }
      )}
      {!user ? (
        <GoogleLogin
          clientId={constants.GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          cookiePolicy="single_host_origin"
          className="App-header-margin"
        />
      ) : (
        <GoogleLogout
          clientId={constants.GOOGLE_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={handleGoogleLogoutSuccess}
          onFailure={handleGoogleLogoutFailure}
          className="App-header-margin"
        />
      )}
      <Toast message="Toast initiated" open={open} handleClose={handleToastClose} />
    </div>
  );
};

export default Header;
