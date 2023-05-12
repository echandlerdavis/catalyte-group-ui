import React from 'react';

const CartContext = React.createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'delete': {
      return {
        ...state,
        products: state.products.filter((p) => p.title !== action.product.title)
      };
    }
    case 'add': {
      return {
        ...state,
        products: [...state.products, action.product]
      };
    }
    case 'clear': {
      return {
        ...state,
        products: []
      };
    }
    case 'remove': {
      return {
        ...state,
        products: state.products.filter((product) => product.title !== action.product.title)
      };
    }
    case 'updateQuantity': {
      const { products } = action;
      const updatedProducts = products.map((product) => {
        const { title, quantity } = product;
        if (quantity === '' || Number.isNaN(parseInt(quantity, 10)) || parseInt(quantity, 10) === 0) {
          // Display the modal
          return { ...product, showModal: true, quantity: 0 };
        }
        if (quantity === 0) {
          // Display the modal
          return { ...product, showModal: true };
        }
        return state.products.find((p) => p.title === title)
          ? { ...product }
          : { ...product, quantity: parseInt(quantity, 10) };
      });

      return {
        ...state,
        products: updatedProducts
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
