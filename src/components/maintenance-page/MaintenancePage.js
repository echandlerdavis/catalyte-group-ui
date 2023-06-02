import React, { useEffect, useState } from 'react';
import {
  Route,
  Switch,
  useHistory,
  useRouteMatch
} from 'react-router-dom';
import { Button, Modal } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import Toast from '../toast/Toast';
import styles from './MaintenancePage.module.css';
import fetchProducts from './MaintenancePageService';
import ProductTable from '../product-table/ProductsTable';
import AppAlert from '../alert/Alert';
import NewProductPage from './NewProductPage';
import constants from '../../utils/constants';
import CreatePromoModal from './CreatePromoModalCard';

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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [deletingProductOrders, setDeletingProductOrders] = useState([]);

  const openModal = () => setOpenPromoModal(true);
  const closeModal = () => setOpenPromoModal(false);

  const closeToast = () => {
    setToastOpen(false);
  };

  const openToast = () => {
    setToastOpen(true);
  };

  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);

  const history = useHistory();
  const { url, path } = useRouteMatch();

  const handleDelete = (product) => {
    setDeletingProduct(product);
    const ordersWithProduct = product.orders.filter(order => order.products.includes(product.id));
    setDeletingProductOrders(ordersWithProduct);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = () => {
    setDeleteModalOpen(false);

    if (deletingProductOrders.length > 0) {
      // Notify the user and mark the product as inactive
      // Perform the necessary actions for marking the product as inactive
      setDeletingProductOrders([]);
      // Display a success toast message
      setToastData({
        MESSAGE: 'Product marked as inactive.',
        SEVERITY: 'success'
      });
      openToast();
    } else {
      // Delete the product
      // Perform the necessary actions for deleting the product
      const newProducts = products.filter(product => product.id !== deletingProduct.id);
      setProducts(newProducts);
      // Display a success toast message
      setToastData({
        MESSAGE: 'Product deleted successfully.',
        SEVERITY: 'success'
      });
      openToast();
    }
  };

  const handleDeleteCancelled = () => {
    setDeleteModalOpen(false);
    setDeletingProduct(null);
    setDeletingProductOrders([]);
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
      <section className={styles.buttonsContainer}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => history.push(`${url}/new-product`)}
        >
          Add Product
        </Button>
        <Button variant="contained" color="secondary" onClick={openModal}>
          Create Promo
        </Button>
      </section>
      <Toast
        open={toastOpen}
        onClose={closeToast}
        message={toastData.MESSAGE}
        severity={toastData.SEVERITY}
      />
      <CreatePromoModal open={openPromoModal} onClose={closeModal} />
      <Modal open={deleteModalOpen} onClose={handleDeleteCancelled}>
        <div className={styles.deleteModal}>
          <h3>Confirmation</h3>
          <p>Are you sure you want to delete this product?</p>
          <p className={styles.deleteModalProductName}>
            Product: {deletingProduct && deletingProduct.name}
          </p>
          {deletingProductOrders.length > 0 && (
            <p className={styles.deleteModalWarning}>
              This product is associated with {deletingProductOrders.length} order(s).
              Marking it as inactive will remove the product from these orders.
            </p>
          )}
          <div className={styles.deleteModalButtons}>
            <Button variant="contained" color="secondary" onClick={handleDeleteConfirmed}>
              Delete
            </Button>
            <Button variant="outlined" color="default" onClick={handleDeleteCancelled}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
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
