import { getCodeByToken, resetPasswordAPI } from "../../HTTP/Api";

export const RESET_PASSWORD = "PasswordReset/PASSWORD_RESET";
export const RESET_PASSWORD_SUCCESS = "PasswordReset/PASSWORD_RESET_SUCCESS";
export const RESET_PASSWORD_FAILURE = "PasswordReset/RESET_PASSWORD_FAILURE";

export const CLEAR_RESET_PASSWORD_MESSAGE =
  "PasswordReset/CLEAR_RESET_PASSWORD_MESSAGE";

export const GET_CODE = "PasswordReset/GET_CODE";
export const GET_CODE_SUCCESS = "PasswordReset/GET_CODE_SUCCESS";
export const GET_CODE_FAILED = "PasswordReset/GET_CODE_FAILED";

export const postPasswordReset = (payload) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD });
    const res = await resetPasswordAPI(payload);

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: res.data });
    setTimeout(() => {
      dispatch({ type: CLEAR_RESET_PASSWORD_MESSAGE });
    }, 500);
  } catch (err) {
    dispatch({ type: RESET_PASSWORD_FAILURE, payload: err.response.data });
    setTimeout(() => {
      dispatch({ type: CLEAR_RESET_PASSWORD_MESSAGE });
    }, 500);
  }
};

export const getCode = (payload) => async (dispatch) => {
  try {
    dispatch({ type: GET_CODE });
    const res = await getCodeByToken(payload);

    dispatch({ type: GET_CODE_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_CODE_FAILED, payload: err.response.data });
  }
};
