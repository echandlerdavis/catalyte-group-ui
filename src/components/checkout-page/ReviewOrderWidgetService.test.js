import { toPrice, getSubtotal, shippingIsFree } from './ReviewOrderWidgetService';

describe('toPrice', () => {
  it('Converts decimals to price string', () => {
    const original = 3.14;
    const expected = '$3.14';
    expect(toPrice(original)).toEqual(expected);
  });

  it('adds decimal places to integers', () => {
    const original = 3;
    const expected = '$3.00';
    expect(toPrice(original)).toEqual(expected);
  });
});

describe('getSubtotal', () => {
  it('returns price for product array of varying quantity', () => {
    const products = [
      {
        quantity: 2,
        price: 9.99
      },
      {
        quantity: 1,
        price: 3.50
      }
    ];
    const expected = 23.48;

    expect(getSubtotal(products)).toEqual(expected);
  });
});

describe('shippingIsFree', () => {
  it('returns true when products total is under FREE_SHIPPING_MIN', () => {
    const products = [
      {
        quantity: 5,
        price: 9.99
      },
      {
        quantity: 1,
        price: 0.04
      }
    ];
    const expected = false;

    expect(shippingIsFree(products)).toEqual(expected);
  });
});
describe('shippingIsFree', () => {
  it('returns false when products total is under FREE_SHIPPING_MIN', () => {
    const products = [
      {
        quantity: 5,
        price: 9.99
      },
      {
        quantity: 1,
        price: 0.06
      }
    ];
    const expected = true;

    expect(shippingIsFree(products)).toEqual(expected);
  });
});
