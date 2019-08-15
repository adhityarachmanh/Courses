const initState = {};

export const coursesReducer = (state = initState, action) => {
  switch (action.type) {
    case "DELETE_IMAGE_SUCCESS":
      return {
        ...state
      };
    default:
      return state;
  }
};
