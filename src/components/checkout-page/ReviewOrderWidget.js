import React from 'react';
import { useCart } from './CartContext';
import OrderItem from './OrderItem';
import { getSubtotal } from './ReviewOrderWidgetService';
import styles from './ReviewOrderWidget.module.css';
import PromoCodeWidget from './PromoCodeWidget';
import { usePromoCode, applyPromoCode, calculateDiscount } from './PromoCodeWidgetService';

/**
 * @name ReviewOrderWidget
 * @description Displays order items and subtotal
 * @return component
 */
const ReviewOrderWidget = () => {
  const {
    state: { products }
  } = useCart();

  const { promoCode } = usePromoCode();
  const noDiscount = getSubtotal(products);
  const discount = calculateDiscount(noDiscount, promoCode);
  console.log('noDiscount: ', noDiscount, ' discount: ', discount);

  return (
    <>
      {products.map(({
        price, title, description, quantity
      }) => (
        <OrderItem
          key={title}
          price={price}
          title={title}
          description={description}
          quantity={quantity}
        />
      ))}
      <PromoCodeWidget />
      <hr />
      <div className={styles.subtotal}>
        <div>
          <p>Subtotal</p>
        </div>
        <div className={styles.price}>
          {Object.keys(promoCode) > 0 && (
          <span>
            Discount:
            {discount}
          </span>
          )}
          <p>{applyPromoCode(noDiscount, discount)}</p>
        </div>
      </div>
    </>
  );
};

export default ReviewOrderWidget;
