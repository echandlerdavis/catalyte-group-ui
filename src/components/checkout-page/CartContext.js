import React from 'react';
import setLastActive from '../../utils/UpdateLastActive';

const CartContext = React.createContext();

function cartReducer(state, action) {
  switch (action.type) {
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
      const { title } = action.product;
      const updatedProducts = state.products.filter((product) => product.title !== title);
      setLastActive();
      return {
        ...state,
        products: updatedProducts
      };
    }
    case 'updateQuantity': {
      const { products } = action;
      const updatedProducts = products.map((product) => {
        const { title, quantity } = product;
        let updatedQuantity;

        if (quantity === '' || Number.isNaN(parseInt(quantity, 10))) {
          updatedQuantity = 0;
        } else {
          updatedQuantity = parseInt(quantity, 10);
        }

        if (quantity === 0 || updatedQuantity === 0 || parseInt(quantity, 10) === 0) {
          // Display the modal
          return { ...product, showModal: true, quantity: updatedQuantity };
        }
        return state.products.find((p) => p.title === title)
          ? { ...product }
          : { ...product, quantity: updatedQuantity };
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
