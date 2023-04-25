import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Save, Cancel } from '@material-ui/icons';
import FormItem from '../form/FormItem';
import styles from './NewProductPage.module.css';

const NewProductPage = ({ history }) => {
  const initialFormData = {
    brand: '',
    imageSrc: '',
    material: '',
    price: '',
    quantity: '',
    name: '',
    description: '',
    demographic: '',
    category: '',
    type: '',
    releaseDate: Date.now(),
    primaryColorCode: '',
    secondaryColorCode: '',
    styleNumber: '',
    globalProductCode: '',
    active: true
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleFormChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.id]: target.value
    });
  };

  return (
    <section>
      <h2>New Product</h2>
      <form className="Card">
        <div className={styles.fieldContainer}>
          {Object.keys(initialFormData).map((attribute) => (
            <FormItem
              onChange={handleFormChange}
              value={formData[attribute]}
              id={attribute}
              label={attribute}
            />
          ))}
          <div className={styles.formButtonContainer}>
            <Button
              type="button"
              startIcon={<Cancel />}
              onClick={() => history.goBack()}
              variant="contained"
              style={{ backgroundColor: '#f44336', color: 'white' }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<Save />}
              style={{ backgroundColor: '#395aa1', color: 'white' }}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default NewProductPage;
