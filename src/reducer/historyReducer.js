export const historyReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_HISTORY":
      return action.payLoad;
    default:
      return state;
  }
};
