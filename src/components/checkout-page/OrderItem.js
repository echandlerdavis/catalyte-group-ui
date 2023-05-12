import React from 'react';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutlined';
import styles from './OrderItem.module.css';
import { toPrice } from './ReviewOrderWidgetService';

/**
 * @name OrderItem
 * @description Displays an order row
 * @return component
 */
const OrderItem = ({
  price,
  title,
  description,
  quantity,
  onRemoveConfirmation,
  onUpdateQuantity
}) => {
  const handleRemoveConfirmation = () => {
    onRemoveConfirmation(title);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity === 0) {
      onUpdateQuantity(title, newQuantity, true);
    } else {
      onUpdateQuantity(title, newQuantity);
    }
  };

  return (
    <div className={styles.orderItem}>
      <div className={styles.image}>
        IMAGE HERE
      </div>
      <div className={styles.item}>
        <p className={styles.itemTitle}>{title}</p>
        <p>{description}</p>
        <p>
          Qty:
          <input
            type="number"
            min="0"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </p>
      </div>
      <div className={styles.price}>
        <p> </p>
        <p>{toPrice(quantity * price)}</p>
        <button
          type="button"
          onClick={handleRemoveConfirmation}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer'
          }}
        >
          <DeleteOutlineIcon />
        </button>
      </div>
    </div>
  );
};
export default OrderItem;
