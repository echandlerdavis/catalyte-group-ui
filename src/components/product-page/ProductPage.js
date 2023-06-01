import React, { useEffect, useState } from 'react';
import { Modal } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import ProductCard from '../product-card/ProductCard';
import styles from './ProductPage.module.css';
import Constants from '../../utils/constants';
import fetchProducts from './ProductPageService';
import AppAlert from '../alert/Alert';
import ProductModalCard from '../product-card/ProductModalCard';
import Toast from '../toast/Toast';
import NewReviewPage from '../review-form/NewReviewPage';

/**
 * @name ProductPage
 * @description fetches products from API and displays products as product cards
 * @return component
 */
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalProduct, setModalProduct] = useState('');
  const [open, setOpenToast] = useState(false);
  const [toastData, setToastData] = useState({
    MESSAGE: '',
    SEVERITY: Constants.SEVERITY_LEVELS.INFO
  });

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

  const mainComponent = (
    <>
      <Modal
        open={showModal}
      >
        <ProductModalCard
          product={modalProduct}
          onClose={closeModal}
          openToastCallback={openToast}
          setToastCallback={setToastData}
        />
      </Modal>
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
    </>
  );
  return (
    <article>
      <Toast
        message={toastData.MESSAGE}
        open={open}
        severity={toastData.SEVERITY}
        handleClose={closeToast}
      />
      {apiError && <AppAlert severity="error" title="Error" message={Constants.API_ERROR} />}
      <Switch>
        <Route path="/:productId/new/review" render={() => <NewReviewPage product={modalProduct} />} />
        <Route path="" render={() => mainComponent} />
      </Switch>
    </article>
  );
};

export default ProductPage;
