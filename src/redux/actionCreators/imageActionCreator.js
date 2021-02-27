import axios from "axios";
import {
  IMAGE_LIST_FAILED,
  IMAGE_LIST_REQUEST,
  IMAGE_LIST_SUCCESS
} from "../actionTypes/imageActionType";

export const listImages = (searchImage) => async (dispatch) => {
  if (searchImage) {
    try {
      dispatch({ type: IMAGE_LIST_REQUEST });
      const output = await axios.get(
        `https://api.unsplash.com/search/photos/?client_id=ql_j1trxDdA3p3sUv8VxFsvKWiTlvf8U7jx-9FjSa5o&query=${searchImage}`
      );
      const images = output.data.results;
      dispatch({ type: IMAGE_LIST_SUCCESS, payload: images });
    } catch (error) {
      dispatch({ type: IMAGE_LIST_FAILED, payload: error.message });
    }
  } else {
    try {
      dispatch({ type: IMAGE_LIST_REQUEST });
      const output = await axios.get(
        "https://api.unsplash.com/photos/?client_id=ql_j1trxDdA3p3sUv8VxFsvKWiTlvf8U7jx-9FjSa5o"
      );
      const images = output.data;
      dispatch({ type: IMAGE_LIST_SUCCESS, payload: images });
    } catch (error) {
      dispatch({ type: IMAGE_LIST_FAILED, payload: error.message });
    }
  }
};
