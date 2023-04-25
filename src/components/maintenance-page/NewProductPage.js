import React, { useState } from 'react';
import FormItem from '../form/FormItem';
import './NewProductPage.module.css';

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
        {Object.keys(initialFormData).map((attribute) => (
          <FormItem
            onChange={handleFormChange}
            value={formData[attribute]}
            id={attribute}
            label={attribute}
          />
        ))}
        <div>
          <button type="button" onClick={() => history.goBack()}>Cancel</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </section>
  );
};

export default NewProductPage;
