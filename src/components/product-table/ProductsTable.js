import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  Checkbox,
  Input
} from '@material-ui/core';
import {
  Lens,
  TripOrigin
} from '@material-ui/icons';
import EditIcon from '@material-ui/icons/EditOutlined';
import './ProductsTable.module.css';
import DoneIcon from '@material-ui/icons/DoneAllTwoTone';
import RevertIcon from '@material-ui/icons/NotInterestedOutlined';
import IconButton from '@material-ui/core/IconButton';

/**
 * @name ProductTable
 * @description Renders table of product data
 * @param {*} props products
 * @returns component
 */
const ProductTable = ({ products, setProducts }) => {
  // Use state to set the attributes of a product to be displayed in the table
  const [productAttributes, setProductAttributes] = useState([]);
  // Use state to set pagination options for the table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [previous, setPrevious] = React.useState({});

  const onToggleEditMode = (id) => {
    setProducts(() => products.map((row) => {
      if (row.id === id) {
        if (!row.isEditMode) {
          setPrevious((state) => ({ ...state, [row.id]: row }));
        }
        return { ...row, isEditMode: !row.isEditMode };
      }
      return row;
    }));
  };

  const onRevert = (id) => {
    const newRows = products.map((row) => {
      if (row.id === id) {
        console.log('previous', previous[id]);
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    console.log('newRows', newRows.filter((row) => row.id === id));
    setProducts(() => newRows);
    console.log('products', products.filter((row) => row.id === id));

    setPrevious((state) => {
      // eslint-disable-next-line no-param-reassign
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };

  // When products are passed set the attributes of a product to be displayed
  useEffect(() => {
    if (products.length) {
      const attributes = [];
      Object.keys(products[0]).forEach((key) => {
        if (key !== 'reviews' && key !== 'isEditMode') {
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
  tableHeaders.unshift(<TableCell key="edit">Edit</TableCell>);

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
  const CustomTableCell = ({ row, name, onChange }) => {
    const { isEditMode } = row;
    return (
      <TableCell align="left">
        {isEditMode ? (
          <Input
            value={row[name]}
            name={name}
            onChange={(e) => onChange(e, row)}
          />
        ) : (
          row[name]
        )}
      </TableCell>
    );
  };
  const onChange = (e, row) => {
    const { value, name } = e.target;
    console.log('name', name);
    const { id } = row;
    const newRows = products.map((r) => {
      if (r.id === id) {
        console.log('we did it');
        return { ...r, [name]: value };
      }
      return r;
    });
    setProducts(newRows);
  };
  // Map the row data for each product
  const rowData = products.map(((product) => {
    // For each product get the data columns by returning the product's attribute value
    // ex: products brand, price, qty etc
    const productColumns = productAttributes.map((attribute) => {
      const data = product[attribute];

      // If the value is a boolean get the string of the boolean
      if (attribute === 'id') {
        let count = 0;
        // eslint-disable-next-line no-plusplus
        console.log('count', count++);
        return (
          <TableCell key={`${product.id} - ${attribute}`}>
            {formattedData(attribute, data)}
          </TableCell>
        );
      }
      return (
        <CustomTableCell {...{ row: product, name: attribute, onChange }} />
      );
    });
    productColumns.unshift(
      <TableCell>
        {product.isEditMode ? (
          <>
            <IconButton
              aria-label="done"
              onClick={() => onToggleEditMode(product.id)}
            >
              <DoneIcon />
            </IconButton>
            <IconButton
              aria-label="revert"
              onClick={() => onRevert(product.id)}
            >
              <RevertIcon />
            </IconButton>
          </>
        ) : (
          <IconButton
            aria-label="delete"
            onClick={() => onToggleEditMode(product.id)}
          >
            <EditIcon align="left" />
          </IconButton>
        )}
      </TableCell>
    );
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
