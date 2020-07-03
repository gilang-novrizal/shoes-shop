const INITIAL_STATE = {
  id: null,
  username: null,
  email: null,
  role: null,
  cart: [],
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        id: action.payLoad.id,
        username: action.payLoad.username,
        email: action.payLoad.email,
        role: action.payLoad.role,
        cart: action.payLoad.cart,
      };
    case "LOG_OUT":
      return INITIAL_STATE;
    default:
      return state;
  }
};
