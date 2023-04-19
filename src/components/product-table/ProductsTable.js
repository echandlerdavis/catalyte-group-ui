import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  Checkbox
} from '@material-ui/core';
import { Lens, TripOrigin } from '@material-ui/icons';
import './ProductsTable.module.css';

const ProductTable = ({ products }) => {
  // Use state to set the attributes of a product to be displayed in the table
  const [productAttributes, setProductAttributes] = useState([]);
  // Use state to set pagination options for the table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // When products are passed set the attributes of a product to be displayed
  useEffect(() => {
    if (products.length) {
      setProductAttributes(Object.keys(products[0]));
    }
  }, [products]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = ({ target }) => {
    setRowsPerPage(+target.value);
    setPage(0);
  };

  const isActiveCheckbox = (isActive) => (
    <Checkbox checked={isActive} icon={<TripOrigin />} checkedIcon={<Lens style={{ color: 'green' }} />} />
  );

  // Map each product attribute to a table header
  const tableHeaders = productAttributes.map((attribute) => {
    const firstLetter = attribute.charAt(0).toUpperCase();
    const restOfWord = attribute.slice(1);
    return <TableCell key={attribute}>{firstLetter + restOfWord}</TableCell>;
  });

  // Map the row data for each product
  const rowData = products.map(((product) => {
    // For each product get the data columns by returning the product's attribute value
    // ex: products brand, price, qty etc
    const productColumns = productAttributes.map((attribute) => {
      const data = product[attribute];
      // If the value is a boolean get the string of the boolean
      return (
        <TableCell key={`${product.id} - ${attribute}`}>
          {typeof data === 'boolean' ? isActiveCheckbox(data) : data}
        </TableCell>
      );
    });
    // Return the row with each data column
    return <TableRow key={product.id}>{productColumns}</TableRow>;
  }));

  return (
    <section>
      <h2>Products</h2>
      <TableContainer style={{ maxHeight: '75vh' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {tableHeaders}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Display row data for the number of rows chosen in pagination options */}
            {rowData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rowData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </section>
  );
};

export default ProductTable;
