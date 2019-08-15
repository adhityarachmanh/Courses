const initState = {
  authError: null
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "DAFTAR_BERHASIL":
      return {
        ...state,
        authError: null
      };
    case "DAFTAR_GAGAL":
      console.log("DAFTAR GAGAL", action.err);
      return {
        ...state,
        authError: action.err
      };
    case "LOGOUT_BERHASIL":
      console.log("BERHASIL LOGOUT");
      return state;
    case "LOGIN_BERHASIL":
      return {
        ...state,
        authError: null
      };
    case "LOGIN_GAGAL":
      console.log("LOGIN GAGAL", action.err);
      return {
        ...state,
        authError: action.err
      };
    default:
      return state;
  }
};
