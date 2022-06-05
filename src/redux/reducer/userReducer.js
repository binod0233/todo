import {
  ADD_USERCATEGORY,
  FETCH_USERCATEGORY,
  FETCH_IMAGE,
  DELETE_USERCATEGORY,
  UPDATE_USERCATEGORY,
} from "../action/userType";
const initialState = {
  userCategory: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
  title: "",
  imageData: [],
  id: "",
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USERCATEGORY:
      return {
        ...state,
        title: action.payload,
      };
    case FETCH_USERCATEGORY:
      return {
        ...state,
        userCategory: action.payload,
      };
    case FETCH_IMAGE:
      return {
        ...state,
        imageData: action.payload,
      };
    case DELETE_USERCATEGORY:
      return {
        ...state,
        id: action.payload,
      };
    case UPDATE_USERCATEGORY:
      return {
        ...state,
        title: action.payload,
      };

    default:
      return state;
  }
};
export default userReducer;
