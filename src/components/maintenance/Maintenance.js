import React, { useEffect, useState } from 'react';
import fetchProducts from './MaintenancePageService';
import MaintenanceProductsTable from './MaintenanceProductsTable';

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
    <>
      <h1>Products</h1>
      <MaintenanceProductsTable products={products} />
    </>
  );
};

export default MaintenancePage;
