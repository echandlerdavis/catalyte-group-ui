import {
  productHasId, consolidateOrder, haveEnoughInventory, validateOrder
} from './ProductCard';
import Constants from '../../utils/constants';

describe('productHasId', () => {
  const expectedFailure = false;
  const expectedSuccess = true;

  it('Returns false if the product id is null', () => {
    const nullIdProduct = { id: null };
    expect(productHasId(nullIdProduct)).toEqual(expectedFailure);
  });

  it('Returns false if the product id is undefined', () => {
    const undefinedIdProduct = {};
    expect(productHasId(undefinedIdProduct)).toEqual(expectedFailure);
  });

  it('Returns true if the product id is set', () => {
    const validIdProduct = { id: 1 };
    expect(productHasId(validIdProduct)).toEqual(expectedSuccess);
  });
});

describe('consolidateOrder', () => {
  it('reduces the size of the list given there are multiples of the same product and keeps the same total quantity', () => {
    const products = [
      {
        id: 1,
        quantity: 2,
        price: 9.99
      },
      {
        id: 1,
        quantity: 1,
        price: 9.99
      }
    ];
    const duplicateProducts = products.filter((p) => p.id === 1);
    consolidateOrder(products[0], duplicateProducts, products);
    expect(products.length).toEqual(1);
    expect(products[0].quantity = 3);
  });
});

describe('haveEnoughInventory', () => {
  it('returns false if the inventory cannot cover an order', () => {
    const expectedResult = false;
    const product = {
      id: 1,
      quantity: 2,
      price: 9.99
    };
    const orders = [
      {
        id: 1,
        quantity: 3,
        price: 9.99
      },
      {
        id: 2,
        quantity: 1,
        price: 9.99
      }
    ];
    const result = haveEnoughInventory(product.quantity,
      orders.filter((p) => p.id === product.id)[0].quantity);
    expect(result).toEqual(expectedResult);
  });

  it('returns true if the inventory can cover an order', () => {
    const expectedResult = true;
    const product = {
      id: 1,
      quantity: 1,
      price: 9.99
    };
    const orders = [
      {
        id: 1,
        quantity: 1,
        price: 9.99
      },
      {
        id: 2,
        quantity: 1,
        price: 9.99
      }
    ];
    const result = haveEnoughInventory(product.quantity,
      orders.filter((p) => p.id === product.id)[0].quantity);
    expect(result).toEqual(expectedResult);
  });
});

describe('validateOrder', () => {
  const product = {
    id: 1,
    quantity: 2,
    price: 9.99
  };
  const orders = [
    {
      id: 1,
      quantity: 2,
      price: 9.99
    },
    {
      id: 2,
      quantity: 1,
      price: 9.99
    }
  ];

  it('returns false if product has invalid id', () => {
    const expectedResult = { valid: false, errors: [Constants.PRODUCT_MISSING_ID] };
    product.id = null;
    expect(validateOrder(product, orders)).toEqual(expectedResult);
    product.id = 1;
  });

  it('returns false if order qty == inventory qty', () => {
    const expectedResult = { valid: false, errors: [Constants.INSUFFICIENT_INVENTORY] };
    expect(validateOrder(product, orders)).toEqual(expectedResult);
  });

  it('returns true if order qty is 1 less than inventory qty', () => {
    orders.filter((p) => p.id === product.id)[0].quantity = (product.quantity - 1);
    const expectedResult = { valid: true, errors: [] };
    expect(validateOrder(product, orders)).toEqual(expectedResult);
  });
});
