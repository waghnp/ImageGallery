import {
    IMAGE_LIST_FAILED,
    IMAGE_LIST_REQUEST,
    IMAGE_LIST_SUCCESS
  } from "../actionTypes/imageActionType";
  
  export const imageListReducer = (state = { images: [] }, action) => {
    switch (action.type) {
      case IMAGE_LIST_REQUEST:
        return { loading: true, images: [] };
      case IMAGE_LIST_SUCCESS:
        return { loading: false, images: action.payload };
      case IMAGE_LIST_FAILED:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  