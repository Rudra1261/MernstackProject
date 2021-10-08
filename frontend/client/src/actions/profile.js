import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  DELETE_ACCOUNT,
  CLEAR_PROFILE,
  GET_PROFILES
} from "./types";
import { setAlert } from "./alert";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        // msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// get all profiles
export const getProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile");
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        // msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        // msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        // msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};


// create or updates profile
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/profile", formData, config);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success", 3000)
      );
      if (!edit) history.push("/dashboard");
    } catch (error) {
      // if (error) cons t errors = error.response.data.errors;
      // if (errors) {
      //   errors.forEach((error) =>
      //     dispatch(setAlert(error.msg, "danger", 3000))
      //   );
      // }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          // msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };

//update education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/education", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Added education", "success", 3000));
    history.push("/dashboard");
  } catch (error) {
    // if (error) const errors = error.response.data.errors;
    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, "danger", 3000)));
    // }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        // msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/experience", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Added experience", "success", 3000));
    history.push("/dashboard");
  } catch (error) {
    // if (error) const errors = error.response.data.errors;
    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, "danger", 3000)));
    // }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        // msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/delete/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Deleted sucessfully','success',3000))
  } catch (error) {
    // if (error) const errors = error.response.data.errors;
    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, "danger", 3000)));
    // }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        // msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/delete/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Deleted sucessfully','success',3000))
  } catch (error) {
    // if (error) const errors = error.response.data.errors;
    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, "danger", 3000)));
    // }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        // msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteAccount = (id) => async (dispatch) => {
  if (window.confirm("Are you sure? This step cannot be undone")) {
    try {
      const res = await axios.delete(`/api/profile/${id}`);
      dispatch({
        type: CLEAR_PROFILE,
        
      });
      dispatch({
        type: DELETE_ACCOUNT,
        
      });
      dispatch(setAlert('Deleted Account permanently'))
    } catch (error) {
    //  const errors = error.response.data.errors;
    //   if (errors) {
    //     errors.forEach((error) =>
    //       dispatch(setAlert(error.msg, "danger", 3000))
    //     );
    //   }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          // msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  }
};
