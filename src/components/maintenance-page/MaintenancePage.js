import React, { useEffect, useState } from 'react';
import {
  Route,
  Switch,
  useHistory,
  useRouteMatch
} from 'react-router-dom';
import { Button, Modal } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import Toast from '../toast/Toast';
import styles from './MaintenancePage.module.css';
import fetchProducts from './MaintenancePageService';
import ProductTable from '../product-table/ProductsTable';
import AppAlert from '../alert/Alert';
import NewProductPage from './NewProductPage';
import constants from '../../utils/constants';
import CreatePromoModal from './CreatePromoModalCard';
import DeleteProductModal from './DeleteProductModalCard';

/**
 * @name MaintenancePage
 * @description Fetches all products from the API and displays them in a table
 *
 * Additionally Contains nested routes for all pages viewed by admin
 * @returns component
 */
const MaintenancePage = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastData, setToastData] = useState({ MESSAGE: '', SEVERITY: '' });
  const [openPromoModal, setOpenPromoModal] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [deletingProductWithPurchases, setDeletingProductWithPurchases] = useState([]);

  const openModal = () => setOpenPromoModal(true);
  const closeModal = () => setOpenPromoModal(false);

  const openDeleteModal = (product) => {
    setDeletingProduct(product);
    // Check if the product has any purchases
    const productPurchases = getPurchasesByProduct(product.id);
    setDeletingProductWithPurchases(productPurchases);
    setOpenDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
    setDeletingProduct(null);
    setDeletingProductWithPurchases([]);
  };

  const closeToast = () => {
    setToastOpen(false);
  };

  const openToast = () => {
    setToastOpen(true);
  };

  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);

  const getPurchaseByProduct = (productId) => {
    // Function to fetch purchases by product ID will go here
    return [];
  };

  const history = useHistory();
  const { url, path } = useRouteMatch();


  const handleDeleteConfirmed = () => {
    if (deletingProductPurchases.length > 0) {
      // If the product is associated with purchases, mark it inactive
      // Replace with your own logic to mark the product inactive
      setDeletingProduct(null);
      setDeletingProductWithPurchases([]);
      closeDeleteModal();
      openToast();
      setToastData({ MESSAGE: 'Product marked as inactive', SEVERITY: 'success' });
    } else {
      // If the product is not associated with any purchases, delete it
      // Replace with your own logic to delete the product
      setDeletingProduct(null);
      setDeletingProductWithPurchases([]);
      closeDeleteModal();
      openToast();
      setToastData({ MESSAGE: 'Product deleted successfully', SEVERITY: 'success' });
    }
  };

  const handleDeleteCancelled = () => {
    closeDeleteModal();
  };

  const handleDelete = (productId) => {
    const product = products.find((product) => product.id === productId);
    if (product) {
      openDeleteModal(product);
    }
  };

  /**
   * Elements viewed on the main maintenance route
   *
   * Section with Products Table
   */
  const mainComponent = (
    <>
      <section>
        <h2>Products</h2>
        <ProductTable products={products} handleDelete={handleDelete} />
      </section>
      </>
  );

  /**
   * Buttons placed on right side of maintenance header
   *
   * Section Labled Create New with horizontal list of buttons
   */
  const headerButtons = (
    <section>
      <h2>Create New</h2>
      <div className={styles.buttonSection} />
      <Button
        style={{ backgroundColor: '#395aa1', color: 'white', borderRadius: 20 }}
        disabled={false}
        size="small"
        variant="contained"
        startIcon={<Add />}
        onClick={() => history.push(`${url}/new/product`)}
      >
        Product
      </Button>
      <Button
        style={{ backgroundColor: '#395aa1', color: 'white', borderRadius: 20 }}
        disabled={false}
        size="small"
        variant="contained"
        startIcon={<Add />}
        onClick={openModal}
      >
        Promo Code
      </Button>
    </section>
  );

  return (
    <article>
      <Toast
        message={toastData.MESSAGE}
        open={toastOpen}
        severity={toastData.SEVERITY}
        handleClose={closeToast}
      />
      <Modal open={openPromoModal} onClose={closeModal}>
        <CreatePromoModal
          open={openPromoModal}
          onClose={closeModal}
          setApiError={setApiError}
          openToastSuccess={openToast}
          setToastSuccessData={setToastData}
        />
      </Modal>
      <div className={styles.maintenanceHeader}>
        <h1>Maintenance</h1>
        {headerButtons}
      </div>
      {apiError && <AppAlert severity="error" title="Error" message={constants.API_ERROR} />}
      {/* add nested routes to allow for other routes
        * in relation to the maintenance route to appear with maintenance header and error alert
        * If you add to more routes be sure to keep main path at the bottom
       */}
      <Switch>
        <Route path={`${path}/new/product`} render={() => <NewProductPage history={history} setApiError={setApiError} setToastData={setToastData} openToast={openToast} setProducts={setProducts} />} />
        <Route path="" render={() => mainComponent} />
      </Switch>
    </article>
  );
};

export default MaintenancePage;
