export const LogIn = (data) => {
  return {
    type: "LOG_IN",
    payLoad: data,
  };
};

export const LogOut = () => {
  return {
    type: "LOG_OUT",
  };
};
