import React from 'react';
import './ProductsTable.module.css';

const ProductTable = ({ products }) => {
  const productAttributes = [
    'id',
    'brand',
    'imageSrc',
    'material',
    'price',
    'quantity',
    'name',
    'description',
    'demographic',
    'category',
    'type',
    'releaseDate',
    'primaryColorCode',
    'secondaryColorCode',
    'styleNumber',
    'globalProductCode',
    'active'
  ];

  // Map each product attribute to a table header
  const tableHeaders = productAttributes.map((attribute) => <th key={attribute}>{attribute}</th>);

  // Map the row data for each product
  const rowData = products.map(((product) => {
    // For each product get the data columns by returning the product's attribute value
    // ex: products brand, price, qty etc
    const productColumns = productAttributes.map((attribute) => {
      const data = product[attribute];
      // If the value is a boolean get the string of the boolean
      return (
        <td key={`${product.id} - ${attribute}`}>
          {typeof data === 'boolean' ? data.toString() : data}
        </td>
      );
    });
    // Return the row with each data column
    return <tr key={product.id}>{productColumns}</tr>;
  }));

  return (
    <section>
      <h2>Products</h2>
      <table>
        <thead>
          <tr>{tableHeaders}</tr>
        </thead>
        <tbody>
          {rowData}
        </tbody>
      </table>
    </section>
  );
};

export default ProductTable;
