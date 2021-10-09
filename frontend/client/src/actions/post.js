import axios from "axios";
import { setAlert } from "./alert";
import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from "./types";

export const getPosts = () => async (dispatch) => {
  try {
    const rest = await axios.get("api/posts");
    dispatch({
      type: GET_POSTS,
      payload: rest.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        // msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addLike = (id) => async (dispatch) => {
  try {
    const rest = await axios.get(`api/posts/lile/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: rest.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        // msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const removeLike = (id) => async (dispatch) => {
  try {
    const rest = await axios.get(`api/posts/unlile/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: rest.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        // msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
