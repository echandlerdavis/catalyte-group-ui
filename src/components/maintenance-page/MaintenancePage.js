import React, { useEffect, useState } from 'react';

import Constants from '../../utils/constants';
import fetchProducts from './MaintenancePageService';
import ProductTable from '../product-table/ProductsTable';

/**
 * Fetches products from API and displays them in a table
 * @returns component
 */
const MaintenancePage = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);

  console.log(products, apiError);

  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);

  return (
    <article>
      <h1>Maintenance</h1>
      {apiError && <p className="errMsg" data-testid="errMsg">{Constants.API_ERROR}</p>}
      <ProductTable products={products} />
    </article>
  );
};

export default MaintenancePage;
