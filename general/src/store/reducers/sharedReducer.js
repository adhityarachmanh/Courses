const initState = {
  // uploadProgress: null,
  // uploadError: null,
  loading: false
};
export const sharedReducer = (state = initState, action) => {
  switch (action.type) {
    // case "PROGRESS_UPLOAD":
    //   return {
    //     ...state,
    //     uploadProgress: action.progress
    //   };
    // case "UPLOAD_SUCCESS":
    //   return {
    //     ...state,
    //     uploadProgress: null,
    //     uploadError: null
    //   };
    // case "UPLOAD_ERROR":
    //   return {
    //     ...state,
    //     uploadProgress: null,
    //     uploadError: action.err
    //   };
    case "LOADING_START":
      return {
        ...state,
        loading: true
      };
    case "LOADING_END":
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
