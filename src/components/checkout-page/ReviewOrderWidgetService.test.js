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
  it('returns false when products total is under or equal to FREE_SHIPPING_MIN', () => {
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

    expect(shippingIsFree(products, 'Washington')).toEqual(expected);
  });
});
describe('shippingIsFree', () => {
  it('returns true when products total is over FREE_SHIPPING_MIN', () => {
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

    expect(shippingIsFree(products, 'Idaho')).toEqual(expected);
  });
});
describe('shippingIsFree', () => {
  it('returns true when the state is Alaska', () => {
    const products = [
      {
        quantity: 5,
        price: 100.00
      },
      {
        quantity: 1,
        price: 0.04
      }
    ];
    const expected = false;

    expect(shippingIsFree(products, 'alaska')).toEqual(expected);
  });
});
describe('shippingIsFree', () => {
  it('returns true when the state is Hawaii', () => {
    const products = [
      {
        quantity: 5,
        price: 100.00
      },
      {
        quantity: 1,
        price: 0.04
      }
    ];
    const expected = false;

    expect(shippingIsFree(products, 'hawaii')).toEqual(expected);
  });
});
