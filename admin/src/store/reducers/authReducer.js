const initState = {
  authError: null
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ADMIN_ERROR":
      return {
        ...state,
        authError: action.err
       
      };

    default:
      return state;
  }
};
