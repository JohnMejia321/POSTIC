import auxAddToCart from './auxReducers';

const reducers = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        shoppingCartList: auxAddToCart(state.shoppingCartList, action.payload.productToAdd),
        products: action.payload.newProductsList,
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        shoppingCartList: state.shoppingCartList.filter(
          (item) => item.sku !== action.payload.productToRemove.sku
        ),
        products: action.payload.newProductsList,
      };

    case 'CALC_CHECKOUT_TOTAL_CART':
      return {
        ...state,
        checkoutTotalCart:
          state.shoppingCartList.length > 0.0
            ? state.shoppingCartList.map((item) => item.checkoutPartial).reduce((a, v) => a + v, 0.0)
            : 0.0,
      };

    case 'ADD_TO_INVENTORY':
      return {
        ...state,
        products: [...state.products, { ...action.payload }],
      };

    case 'REMOVE_FROM_INVENTORY':
      return {
        ...state,
        products: state.products.filter((item) => item._id !== action.payload),
      };

    case 'UPDATE_TO_INVENTORY':
      return {
        ...state,
        products: state.products.map((item) =>
          item._id === action.payload.oldData._id ? { ...action.payload.updateData } : item
        ),
      };

    case 'ADD_TO_CUSTOMERS_LIST':
      return {
        ...state,
        customersList: [...state.customersList, { ...action.payload }],
      };

    case 'REMOVE_FROM_CUSTOMERS_LIST':
      return {
        ...state,
        customersList: state.customersList.filter(
          (item) => item.id !== action.payload.id && item.idType !== action.payload.idType
        ),
      };

    case 'UPDATE_TO_CUSTOMERS_LIST':
      return {
        ...state,
        customersList: state.customersList.map((item) =>
          item.id === action.payload.oldData.id ? { ...action.payload.updateData } : item
        ),
      };

    case 'ADD_TO_ORDERS_LIST':
      return {
        ...state,
        ordersList: [...state.ordersList, action.payload],
      };

    case 'CLEAN_CART_BILL_DO':
      return {
        ...state,
        shoppingCartList: [],
      };

    case 'ORDER_NUM_TO_PRINT_BY_BILL':
      return {
        ...state,
        orderNumberToPrint: action.payload,
      };

    case 'ORDER_NUM_TO_PRINT_BY_ORDERS':
      return {
        ...state,
        orderNumberToPrint: action.payload,
      };

    case 'AUTHENTICATED_TO_TRUE':
      return {
        ...state,
        isAuthenticated: action.payload,
      };

    case 'SET_USER_NAME':
      return {
        ...state,
        userName: action.payload,
      };

    default:
      return state;
  }
};

export default reducers;
