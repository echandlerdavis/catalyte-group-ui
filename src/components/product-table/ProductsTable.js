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

/**
 * @name ProductTable
 * @description Renders table of product data
 * @param {*} props products
 * @returns component
 */
const ProductTable = ({ products }) => {
  // Use state to set the attributes of a product to be displayed in the table
  const [productAttributes, setProductAttributes] = useState([]);
  // Use state to set pagination options for the table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // When products are passed set the attributes of a product to be displayed
  useEffect(() => {
    if (products.length) {
      const attributes = [];
      Object.keys(products[0]).forEach((key) => {
        if (key !== 'reviews') {
          attributes.push(key);
        }
      });
      setProductAttributes(attributes);
    }
  }, [products]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = ({ target }) => {
    setRowsPerPage(+target.value);
    setPage(0);
  };

  /**
   * Reads a product's active value and returns a checkbox either checked or unchecked
   * @param {boolean} isActive products active status
   * @returns Checkbox component
   */
  const isActiveCheckbox = (isActive) => (
    <Checkbox checked={isActive} icon={<TripOrigin />} checkedIcon={<Lens style={{ color: 'green' }} />} />
  );

  /**
   * Reads the color of a product and returns component with the color as the background
   * Please note that inline style was needed in order to override MUI table cell styles
   * @param {string} hexColor products color as hexColor string
   * @returns div element
   */
  const colorBox = (hexColor) => (
    <div style={{
      backgroundColor: hexColor,
      color: hexColor === '#ffffff' ? 'black' : 'white',
      textAlign: 'center',
      textShadow: '5rem',
      boxShadow: '.05rem .05rem .05rem grey'
    }}
    >
      {hexColor}
    </div>
  );

  // Map each product attribute to a table header
  const tableHeaders = productAttributes.map((attribute) => {
    const firstLetter = attribute.charAt(0).toUpperCase();
    const restOfWord = attribute.slice(1);
    return <TableCell key={attribute}>{firstLetter + restOfWord}</TableCell>;
  });

  /**
   * Checks the attribute name and value of a product and formats it accordingly
   * Prices with have $, Colors with be displayed, and booleans will be CheckBoxes
   * @param {string} attribute the products attribute
   * @param {*} value the value of that products attribute
   * @returns component, or value passed
   */
  const formattedData = (attribute, value) => {
    if (typeof value === 'boolean') {
      return isActiveCheckbox(value);
    }
    if (attribute === 'price') {
      return `$${value}`;
    }
    if (attribute.toLowerCase().includes('color')) {
      return colorBox(value);
    }
    return value;
  };

  // Map the row data for each product
  const rowData = products.map(((product) => {
    // For each product get the data columns by returning the product's attribute value
    // ex: products brand, price, qty etc
    const productColumns = productAttributes.map((attribute) => {
      const data = product[attribute];
      // If the value is a boolean get the string of the boolean
      return (
        <TableCell key={`${product.id} - ${attribute}`}>
          {formattedData(attribute, data)}
        </TableCell>
      );
    });
    // Return the row with each data column
    return <TableRow key={product.id}>{productColumns}</TableRow>;
  }));

  return (
    <div className="Card">
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
    </div>
  );
};

export default ProductTable;
