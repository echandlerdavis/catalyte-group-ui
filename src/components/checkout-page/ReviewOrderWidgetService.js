import { FREE_SHIPPING_MIN } from '../../utils/constants';
/**
 * converts a price to a formatted string
 * @param {number} price
 * @returns {string} formatted price
 */
export const toPrice = (price) => `$${price.toFixed(2)}`;

/**
 * Gets the cart total of an order
 * @param {Object []} products
 * @returns Number
 */
export const getSubtotal = (products) => {
  if (products.length) {
    return products.reduce(
      (acc, item) => acc + (item.quantity * item.price), 0
    );
  }
  throw new Error('No products found');
};
/**
 * Returns where or not shipping is free based on the value of products and the state
 * @param {Object[]} products
 * @returns boolean
 */
export const shippingIsFree = (products, state) => {
  if (state) {
    const testState = state.toLowerCase();
    if (testState === 'alaska' || testState === 'hawaii') {
      return false;
    }
  }
  return getSubtotal(products) > FREE_SHIPPING_MIN;
};
