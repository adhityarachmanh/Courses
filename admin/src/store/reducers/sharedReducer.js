const initState = {
  progress: null
};

export const sharedReducer = (state = initState, action) => {
  switch (action.type) {
    case "PROGRESS_UPLOAD":
      return {
        progress: action.progress
      };
    case "UPLOAD_ERROR":
      return state;
    case "UPLOAD_SUCCESS":
      return {
        progress: null
      };
    
    default:
      return state;
  }
};
