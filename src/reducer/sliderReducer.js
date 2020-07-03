export const sliderReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_SLIDER":
      return action.payLoad;
    default:
      return state;
  }
};
