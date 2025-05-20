import {
  getSignInFromApi,
  checkSessionFromApi,
  postSignUpToApi,
  updateProfileOnApi,
  oAuthAPI,
} from "../../HTTP/Api";

export const POST_SIGN_IN = "Auth/POST_SIGN_IN";
export const POST_SIGN_IN_SUCCESS = "Auth/POST_SIGN_IN_SUCCESS";
export const POST_SIGN_IN_FAILURE = "Auth/POST_SIGN_IN_FAILURE";
export const CLEAR_SIGN_IN_ERROR_MESSAGE = "Auth/CLEAR_SIGN_IN_ERROR_MESSAGE";

export const signIn = (payload) => async (dispatch) => {
  dispatch({ type: POST_SIGN_IN });
  try {
    const res = await getSignInFromApi(payload);
    dispatch({ type: POST_SIGN_IN_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: POST_SIGN_IN_FAILURE, payload: error.response });
    setTimeout(() => {
      dispatch({ type: CLEAR_SIGN_IN_ERROR_MESSAGE });
    }, 500);
  }
};

export const O_AUTH = "Auth/O_AUTH";
export const O_AUTH_SUCCESS = "Auth/O_AUTH_SUCCESS";
export const O_AUTH_FAILURE = "Auth/O_AUTH_FAILURE";

export const oAuth = (payload) => async (dispatch) => {
  dispatch({ type: O_AUTH });
  try {
    const res = await oAuthAPI(payload);
    dispatch({ type: O_AUTH_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: O_AUTH_FAILURE, payload: error.response });
  }
};

export const POST_SIGN_UP = "Auth/POST_SIGN_UP";
export const POST_SIGN_UP_SUCCESS = "Auth/POST_SIGN_UP_SUCCESS";
export const POST_SIGN_UP_FAILURE = "Auth/POST_SIGN_UP_FAILURE";
export const CLEAR_SIGN_UP_MESSAGE = "Auth/CLEAR_SIGN_UP_MESSAGE";

export const signUp = (payload) => async (dispatch) => {
  dispatch({ type: POST_SIGN_UP });
  try {
    const res = await postSignUpToApi(payload);
    dispatch({ type: POST_SIGN_UP_SUCCESS, payload: res });
    setTimeout(() => {
      dispatch({ type: CLEAR_SIGN_UP_MESSAGE });
    }, 10000);
  } catch (error) {
    dispatch({ type: POST_SIGN_UP_FAILURE, payload: error.response.data });
    setTimeout(() => {
      dispatch({ type: CLEAR_SIGN_UP_MESSAGE });
    }, 500);
  }
};

export const SING_OUT = "Auth/SING_OUT";

export const signOut = (payload) => async (dispatch) => {
  dispatch({ type: SING_OUT });
};

export const CHECK_SESSION = "Auth/CHECK_SESSION";
export const CHECK_SESSION_SUCCESS = "Auth/CHECK_SESSION_SUCCESS";
export const CHECK_SESSION_FAILURE = "Auth/CHECK_SESSION_FAILURE";

export const checkSession = (payload) => async (dispatch) => {
  dispatch({ type: CHECK_SESSION });

  try {
    const res = await checkSessionFromApi(payload);
    dispatch({ type: CHECK_SESSION_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: CHECK_SESSION_FAILURE, payload: error.response });
  }
};

export const UPDATE_PROFILE = "Auth/UPDATE_PROFILE";
export const UPDATE_PROFILE_SUCCESS = "Auth/UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAILURE = "Auth/UPDATE_PROFILE_FAILURE";
export const CLEAR_UPDATE_PROFILE_MESSAGE = "Auth/CLEAR_UPDATE_PROFILE_MESSAGE";

export const updateProfile = (payload) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE });
  try {
    const res = await updateProfileOnApi(payload);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: res });
    setTimeout(() => {
      dispatch({ type: CLEAR_UPDATE_PROFILE_MESSAGE });
    }, 500);
  } catch (err) {
    dispatch({ type: UPDATE_PROFILE_FAILURE, payload: err.response });
    setTimeout(() => {
      dispatch({ type: CLEAR_UPDATE_PROFILE_MESSAGE });
    }, 500);
  }
};
