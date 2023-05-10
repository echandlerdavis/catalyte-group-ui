import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import OrderItem from './OrderItem';
import { getSubtotal, toPrice } from './ReviewOrderWidgetService';
import styles from './ReviewOrderWidget.module.css';
import PromoCodeWidget from './PromoCodeWidget';
import { applyPromoCode, calculateDiscount } from './PromoCodeWidgetService';

/**
 * @name ReviewOrderWidget
 * @description Displays order items and subtotal
 * @return component
 */
const ReviewOrderWidget = ({ promoCode, promoCodeSetter }) => {
  const {
    state: { products }
  } = useCart();

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
        <OrderItem
          key={title}
          price={price}
          title={title}
          description={description}
          quantity={quantity}
        />
      ))}
      <PromoCodeWidget promoCode={promoCode} setPromoCode={promoCodeSetter} />
      <hr />
      <div className={styles.subtotal}>
        <div>
          {discount > 0 && <p>Discount</p>}
          <br />
          <p>Subtotal</p>
        </div>
        <div className={styles.price}>
          {discount > 0 && (
          <p>
            {`(${toPrice(discount)})`}
          </p>
          )}
          <br />
          <p>{toPrice(applyPromoCode(noDiscount, discount))}</p>
        </div>
      </div>
    </>
  );
};

export default ReviewOrderWidget;
