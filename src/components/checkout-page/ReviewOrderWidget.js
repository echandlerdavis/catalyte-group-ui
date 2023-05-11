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
  const { state: { products }, dispatch } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);

  const handleRemoveProductFromCart = (title) => {
    dispatch({ type: 'remove', product: { title } });
  };

  const handleUpdateQuantity = (title, newQuantity, shouldShowModal) => {
    const updatedProducts = products.map((product) => {
      if (product.title === title) {
        return { ...product, quantity: parseInt(newQuantity, 10), showModal: shouldShowModal };
      }
      return product;
    });

    dispatch({ type: 'updateQuantity', products: updatedProducts });

    if (shouldShowModal) {
      setProductToRemove(title);
      setShowModal(true);
    }
  };

  const handleRemoveCancel = () => {
    setProductToRemove(null);
    setShowModal(false);
  };

  const handleRemoveProduct = () => {
    if (productToRemove) {
      dispatch({ type: 'remove', product: { title: productToRemove } });
    }
    setShowModal(false);
  };

  return (
    <>
      {products.map(({
        productId, price, title, description, quantity
      }) => (
        <OrderItem
          key={productId}
          price={price}
          title={title}
          description={description}
          quantity={quantity}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveConfirmation={handleRemoveProductFromCart}
        />
      ))}

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Are you sure you want to remove this item from your cart?</p>
            <div className={styles.modalButtons}>
              <button type="button" className={styles.modalButton} onClick={handleRemoveCancel}>
                Cancel
              </button>
              <button type="button" className={styles.modalButton} onClick={handleRemoveProduct}>
                Remove
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
