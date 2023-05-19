import React, { useEffect, useState } from 'react';
import { Modal } from '@material-ui/core';
import {
  useHistory, Switch, Route
} from 'react-router-dom';
import ProductCard from '../product-card/ProductCard';
import styles from './ProductPage.module.css';
import Constants from '../../utils/constants';
import fetchProducts from './ProductPageService';
import AppAlert from '../alert/Alert';
import ProductModalCard from '../product-card/ProductModalCard';
import Toast from '../toast/Toast';
import { fetchUser, parseCookies } from '../profile-page/ProfilePageService';
import { fetchPurchases } from '../review-form/ReviewPageService';
import NewReviewPage from '../review-form/NewReviewPage';

/**
 * @name ProductPage
 * @description fetches products from API and displays products as product cards
 * @return component
 */
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [reviewApiError, setReviewApiError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalProduct, setModalProduct] = useState('');
  const [open, setOpenToast] = useState(false);
  const [toastData, setToastData] = useState({
    MESSAGE: '',
    SEVERITY: Constants.SEVERITY_LEVELS.INFO
  });
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasMadePurchase, setHasMadePurchase] = useState(false);
  const history = useHistory();

  const closeToast = () => {
    setOpenToast(false);
  };

  const openToast = () => {
    setOpenToast(true);
  };

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const displayModal = (p) => {
    setModalProduct(p);
    openModal();
  };

  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);

  // Checks if user is logged in
  useEffect(() => {
    const cookies = parseCookies();
    const cookiesUser = cookies.user ? JSON.parse(cookies.user) : null;
    if (cookiesUser) {
      console.log(cookiesUser);
      setIsLoggedIn(true);
      fetchUser(cookiesUser.email, setUser, setReviewApiError);
    } else {
      setIsLoggedIn(false);
      // setUserErrorMessage('You must be logged in to write a review.');
      setUser(null); // Clear the user data
    }
  }, [setReviewApiError]);

  // Checks if user has made purchase of the product.
  useEffect(() => {
    if (isLoggedIn) {
      const userEmail = user.email;
      fetchPurchases(userEmail, setHasMadePurchase, setReviewApiError, modalProduct.id);
    } else {
      setHasMadePurchase(false);
      // setUserErrorMessage('You must have purchased the product in order to leave a review.');
    }
  }, [isLoggedIn, modalProduct.id, setReviewApiError, user]);

  const mainComponent = (
    <article>
      <Modal
        open={showModal}
      >
        <ProductModalCard
          product={modalProduct}
          onClose={closeModal}
          openToastCallback={openToast}
          setToastCallback={setToastData}
          user={user}
          isLoggedIn={isLoggedIn}
          hasMadePurchase={hasMadePurchase}
          history={history}
          reviewApiError={reviewApiError}
        />
      </Modal>
      <Toast
        message={toastData.MESSAGE}
        open={open}
        severity={toastData.SEVERITY}
        handleClose={closeToast}
      />
      {apiError && <AppAlert severity="error" title="Error" message={Constants.API_ERROR} />}
      <section className={styles.app}>
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard
              product={product}
              clickAction={displayModal}
              openToast={openToast}
              setToastData={setToastData}
            />
          </div>
        ))}
      </section>
    </article>
  );

  return (
    <>
      <Switch>
        <Route path="/new/review" render={() => <NewReviewPage productId={modalProduct.id} setApiError={setReviewApiError} setToastData={setToastData} openToast={openToast} history={history} user={user} isLoggedIn={isLoggedIn} hasMadePurchase={hasMadePurchase} />} />
        <Route path="/" render={() => mainComponent} />
      </Switch>
    </>
  );
};

export default ProductPage;
