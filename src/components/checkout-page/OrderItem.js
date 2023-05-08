import React from 'react';
import styles from './OrderItem.module.css';
import { toPrice } from './ReviewOrderWidgetService';

/**
 * @name OrderItem
 * @description Displays an order row
 * @return component
 */
const OrderItem = ({
  price, title, description, quantity, onRemove
}) => (
  <div className={styles.orderItem}>
    <div className={styles.image}>
      IMAGE HERE
    </div>
    <div className={styles.item}>
      <p className={styles.itemTitle}>{title}</p>
      <p>{description}</p>
      <p>{`Qty: ${quantity}`}</p>
    </div>
    <div className={styles.price}>
      <p>{toPrice(quantity * price)}</p>
      <button onClick={onRemove} className={styles.removeButton}>
        <i className="fa fa-trash" />
      </button>
    </div>
  </div>
);

export default OrderItem;
