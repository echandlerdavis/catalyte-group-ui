import React, { useEffect, useState } from 'react';
import './MaintenancePage.module.css';
import fetchProducts from './MaintenancePageService';
import ProductTable from '../product-table/ProductsTable';
import ErrorAlert from '../error-alert/ErrorAlert';

/**
 * Fetches products from API and displays them in a table
 * @returns component
 */
const MaintenancePage = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);

  return (
    <article>
      <h1>Maintenance</h1>
      {apiError && <ErrorAlert errorMsg={apiError} />}
      <ProductTable products={products} />
    </article>
  );
};

export default MaintenancePage;
