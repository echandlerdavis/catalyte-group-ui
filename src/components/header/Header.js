import React, { useState, createElement } from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useHistory } from 'react-router-dom';
import loginUser from './HeaderService';
import iconWithBadge from './IconWithBadge';
import { useCart } from '../checkout-page/CartContext';
import styles from './Header.module.css';
import constants from '../../utils/constants';
import javaTheHuttLogo from '../../assets/images/javaTheHuttLogo.jpg';
import setLastActive from '../../utils/UpdateLastActive';

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
    setLastActive();
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
   * @description Redirect the page to /checkout when clicked
   */
  const handleCartClick = () => {
    history.push('/checkout');
  };

  const logo = createElement('img', {
    src: javaTheHuttLogo,
    alt: constants.LOGO_ALT,
    className: styles.appLogo,
    onClick: handleLogoClick
  });

  return (
    <header id={styles.header} className="Set-to-front">
      <div className={styles.appLogoContainer}>{logo}</div>
      <div>{googleError && <span>{googleError}</span>}</div>
      {apiError && <span>Api Error</span>}
      <div>
        {iconWithBadge(
          {
            baseIcon: <ShoppingCartIcon onClick={handleCartClick} />,
            displayValue: products.length
          }
        )}
      </div>
      <div>
        {!user ? (
          <GoogleLogin
            clientId={constants.GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFailure}
            cookiePolicy="single_host_origin"
          />
        ) : (
          <GoogleLogout
            clientId={constants.GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={handleGoogleLogoutSuccess}
            onFailure={handleGoogleLogoutFailure}
          />
        )}
      </div>
      <div className={styles.optionalText}>
        {user && `${user.firstName} ${user.lastName}`}
      </div>
    </header>
  );
};

export default Header;
