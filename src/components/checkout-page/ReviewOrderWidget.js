import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import OrderItem from './OrderItem';
import { getSubtotal, toPrice } from './ReviewOrderWidgetService';
import styles from './ReviewOrderWidget.module.css';
import PromoCodeWidget from './PromoCodeWidget';
import { applyPromoCode, calculateDiscount } from './PromoCodeWidgetService';
import setLastActive from '../../utils/UpdateLastActive';

/**
 * @name ReviewOrderWidget
 * @description Displays order items and subtotal
 * @return component
 */
const ReviewOrderWidget = ({ promoCode, promoCodeSetter, shippingCost }) => {
  const { state: { products }, dispatch } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);

  const handleRemoveProductFromCart = (title) => {
    dispatch({ type: 'remove', product: { title } });
  };

  const handleUpdateQuantity = (title, newQuantity) => {
    const updatedProducts = products.map((product) => {
      if (product.title === title) {
        const shouldShowModal = (
          newQuantity === 0 || newQuantity === '' || Number.isNaN(parseInt(newQuantity, 10)))
          && (product.quantity !== 0);
        return {
          ...product,
          quantity: newQuantity === '' || Number.isNaN(parseInt(newQuantity, 10))
            ? 0
            : parseInt(newQuantity, 10),
          showModal: shouldShowModal
        };
      }
      return product;
    });

    dispatch({ type: 'updateQuantity', products: updatedProducts });

    if (newQuantity === 0 || newQuantity === '' || Number.isNaN(parseInt(newQuantity, 10))) {
      setProductToRemove(title);
      setShowModal(true);
    } else {
      setProductToRemove(null);
      setShowModal(false);
    }
  };

  const handleRemoveCancel = () => {
    const productToUpdate = products.find((product) => product.title === productToRemove);
    if (productToUpdate && productToUpdate.quantity === 0) {
      const updatedProducts = products.map((product) => {
        if (product.title === productToRemove) {
          return { ...product, quantity: 1 };
        }
        return product;
      });
      dispatch({ type: 'updateQuantity', products: updatedProducts });
    }
    setProductToRemove(null);
    setShowModal(false);
  };

  const handleRemoveProduct = () => {
    if (productToRemove) {
      dispatch({ type: 'remove', product: { title: productToRemove } });
    }
    setShowModal(false);
    setLastActive();
  };

  const noDiscount = getSubtotal(products);
  const [discount, setDiscount] = useState(calculateDiscount(noDiscount, promoCode));

  useEffect(() => {
    setDiscount(calculateDiscount(noDiscount, promoCode));
  }, [promoCode, noDiscount]);
  return (
    <>
      {products.map(({
        price, title, description, quantity
      }) => (
        <div key={title}>
          <OrderItem
            price={price}
            title={title}
            description={description}
            quantity={quantity}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveConfirmation={handleRemoveProductFromCart}
          />
          {productToRemove === title && showModal && (
            <div className={styles.modalContainer}>
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
        </div>
      ))}
      <PromoCodeWidget promoCode={promoCode} setPromoCode={promoCodeSetter} />
      <hr />
      <div className={styles.subtotal}>
        <div>
          <p>Subtotal</p>
          {discount > 0 && <p>Discount</p>}
          <p>Shipping</p>
          <br />
          <p>Total</p>
        </div>
        <div className={styles.price}>
          <p>{toPrice(noDiscount)}</p>
          {discount > 0 && (
          <p>
            {`(${toPrice(discount)})`}
          </p>
          )}
          <p>{toPrice(shippingCost)}</p>
          <br />
          <p>{toPrice(applyPromoCode(noDiscount, discount))}</p>
        </div>
      </div>
    </>
  );
};

export default ReviewOrderWidget;
