import React, { useState } from 'react';
import { useCart } from './CartContext';
import OrderItem from './OrderItem';
import { getSubtotal } from './ReviewOrderWidgetService';
import styles from './ReviewOrderWidget.module.css';

/**
 * @name ReviewOrderWidget
 * @description Displays order items and subtotal
 * @return component
 */
const ReviewOrderWidget = () => {
  const { state: { products }, removeProducts } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [productIdToRemove, setProductIdToRemove] = useState(null);

  const handleRemoveConfirmation = (productId) => {
    setProductIdToRemove(productId);
    setShowModal(true);
  };

  const handleRemoveCancel = () => {
    setProductIdToRemove(null);
    setShowModal(false);
  };

  const handleRemoveProduct = () => {
    if (productIdToRemove) {
      removeProducts(productIdToRemove);
    }
    setShowModal(false);
  };

  return (
    <>
      {/* Order items */}
      {products.map(({
        productId, price, title, description, quantity
      }) => (
        <OrderItem
          key={productId}
          price={price}
          title={title}
          description={description}
          quantity={quantity}
          onRemoveConfirmation={handleRemoveConfirmation}
        />
      ))}

      {/* Modal */}
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Are you sure you want to remove this item from your cart?</p>
            <div className={styles.modalButtons}>
              <button className={styles.modalButton} onClick={handleRemoveCancel}>
                Cancel
              </button>
              <button className={styles.modalButton} onClick={handleRemoveProduct}>
                remove
              </button>
            </div>
          </div>
        </div>
      )}
      
      <hr />
      <div className={styles.subtotal}>
        <div>
          <p>Subtotal</p>
        </div>
        <div className={styles.price}>
          <p>{getSubtotal(products)}</p>
        </div>
      </div>
    </>
  );
};

export default ReviewOrderWidget;
