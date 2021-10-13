import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from "./types";

export const getPosts = () => async (dispatch) => {
  try {
    const rest = await axios.get("api/post");
    dispatch({
      type: GET_POSTS,
      payload: rest.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        // msg: error.response.statusText,
        // status: error.response.status,
      },
    });
  }
};

export const addLike = (id) => async (dispatch) => {
  try {
    const rest = await axios.put(`api/post/like/${id}`);
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
    const rest = await axios.put(`api/post/unlike/${id}`);
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

export const deletePost = (id) => async (dispatch) => {
  try {
    const rest = await axios.delete(`api/post/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlert("Post removed", "success", 3000));
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

export const addPost = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const rest = await axios.post(`api/post`,formData,config);
    dispatch({
      type: ADD_POST,
      payload: rest.data,
    });
    dispatch(setAlert("Post added", "success", 3000));
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
export const getPost = (id) => async (dispatch) => {
  try {
    const rest = await axios.get(`api/post/${id}`);
    dispatch({
      type: GET_POST,
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

export const addComment = (postid, formdata) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const rest = await axios.post(`api/post/comment/${postid}`, formdata, config);
    dispatch({
      type: ADD_COMMENT,
      payload: rest.data,
    });
    dispatch(setAlert('comment Added', 'success', 3000))
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

export const deleteComment = (postid, commentid ) => async (dispatch) => {
  try {
    
    const rest = await axios.post(`api/post/comment/${postid}/${commentid}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentid,
    });
    dispatch(setAlert('comment Removed', 'success', 3000))
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