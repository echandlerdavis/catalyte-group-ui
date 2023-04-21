import React from 'react';
import toastDispatcher from '../header/HeaderToastDispatcher';

// TODO: reducer can't control toast
// TODO: logic for evaluating state should be moved
const CartContext = React.createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'delete': {
      return {
        ...state,
        products: state.products.filter((product) => product.title !== action.product.title)
      };
    }
    case 'add': {
      // make sure id is present on new product
      if (action.product.id === undefined || action.product.id === null) {
        // use the toast to display an error
        toastDispatcher.setMessage(`Product ${action.product.description} does not have a unique ID.`);
        toastDispatcher.toggleOpen();
        return { ...state, products: [...state.products] };
      }
      // get the current products array incase manipulation is needed
      const currentProducts = state.products;
      // set the success message
      const successMessage = `${action.product.description} added to cart!`;
      // locate if the product is a duplicate
      const existingProducts = currentProducts.filter((p) => p.id === action.product.id);

      if (existingProducts.length === 0) {
        // toast
        currentProducts.push(action.product);
        toastDispatcher.setMessage(successMessage);
        toastDispatcher.statusSetter(true);
        return {
          ...state,
          products: [...currentProducts]
        };
      }
      // if multiple existing products in cart, consolitate
      if (existingProducts.length > 1) {
        const firstIndex = state.products.findIndex((p) => p.id === action.product.id);
        while (existingProducts.length > 1) {
          const duplicate = existingProducts.pop();
          const duplicateIndex = state.products.findLastIndex((p) => p.id === action.product.id);
          currentProducts[firstIndex].quantity += duplicate.quantity;
          currentProducts.splice(duplicateIndex, 1);
        }
      }
      // add quantity from action product to now single existingProduct
      existingProducts[0].quantity += action.product.quantity;
      // toast
      toastDispatcher.setMessage(successMessage);
      toastDispatcher.statusSetter(true);
      return {
        ...state,
        products: [...currentProducts]
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function CartProvider({ children }) {
  const initialProducts = {
    products: [],
    setProducts: () => { }
  };
  const [state, dispatch] = React.useReducer(cartReducer, initialProducts);

  const value = { state, dispatch };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartDispatch must be used within a CartProvider');
  }
  return context;
}

export { CartProvider, useCart };
