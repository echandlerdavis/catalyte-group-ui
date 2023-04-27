import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import Toast from '../toast/Toast';
import styles from './MaintenancePage.module.css';
import fetchProducts from './MaintenancePageService';
import ProductTable from '../product-table/ProductsTable';
import AppAlert from '../alert/Alert';
import NewProductPage from './NewProductPage';

/**
 * @name MaintenancePage
 * @description Fetches all products from the API and displays them in a table
 * @returns component
 */
const MaintenancePage = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastData, setToastData] = useState({
    MESSAGE: '',
    SEVERITY: ''
  });

  const closeToast = () => {
    setToastOpen(false);
  };

  const openToast = () => {
    if (!apiError) {
      setToastOpen(true);
    }
  };

  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);

  useEffect(() => {
    if (apiError) {
      setToastOpen(false);
    }
  }, [apiError]);

  const history = useHistory();

  const mainComponent = (
    <>
      <section>
        <h2>Products</h2>
        <ProductTable products={products} />
      </section>
    </>
  );

  const headerButtons = (
    <section>
      <h2>Create New</h2>
      <div className={styles.buttonSection}>
        <Button
          style={{ backgroundColor: '#395aa1', color: 'white', borderRadius: 20 }}
          disabled={false}
          size="small"
          variant="contained"
          startIcon={<Add />}
          onClick={() => history.push('/maintenance/new')}
        >
          Product
        </Button>
      </div>
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
      <div className={styles.maintenanceHeader}>
        <h1>Maintenance</h1>
        {headerButtons}
      </div>
      {apiError && <AppAlert severity="error" title="Error" message={apiError} />}
      {/* add nested routes to allow for other routes
        * in relation to the maintenance route to appear with maintenance header and error alert
       */}
      <Switch>
        <Route exact path="/maintenance/new" render={() => <NewProductPage history={history} setApiError={setApiError} setToastData={setToastData} openToast={openToast} />} />
        <Route path="" render={() => mainComponent} />
      </Switch>
    </article>
  );
};

export default MaintenancePage;
