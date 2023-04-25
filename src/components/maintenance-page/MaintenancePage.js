import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './MaintenancePage.module.css';
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

  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);

  const history = useHistory();

  const mainComponent = (
    <>
      <section>
        <h2>Create New</h2>
        <div className="Card">
          <button type="button" onClick={() => history.push('/maintenance/new')}>New Product</button>
        </div>
      </section>
      <section>
        <h2>Products</h2>
        <ProductTable products={products} />
      </section>
    </>
  );

  return (
    <article>
      <h1>Maintenance</h1>
      {apiError && <AppAlert severity="error" title="Error" message={apiError} />}
      {/* add nested routes to allow for other routes
        * in relation to the maintenance route to appear with maintenance header and error alert
       */}
      <Switch>
        <Route exact path="/maintenance/new">
          <NewProductPage />
        </Route>
        <Route path="">
          {mainComponent}
        </Route>
      </Switch>
    </article>
  );
};

export default MaintenancePage;
