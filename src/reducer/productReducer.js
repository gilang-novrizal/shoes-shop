export const productReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_PRODUCT":
      return action.payLoad;
    default:
      return state;
  }
};
