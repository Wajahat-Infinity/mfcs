import * as CONSTANTS from "../Actions/PasswordReset";
const initialState = {
  isPasswordUpdating: false,
  isPasswordUpdatingFailed: false,
  message: "",

  isCodeLoading: true,
  isCodeNotFound: false,
  data: { success: "", code: "" },
};
const PasswordResetReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.RESET_PASSWORD:
      return {
        ...state,
        isPasswordUpdating: true,
        isPasswordUpdatingFailed: false,
      };

    case CONSTANTS.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isPasswordUpdating: false,
        message: action.payload.message,
        data: { success: "", code: "" },
      };
    case CONSTANTS.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isPasswordUpdating: false,
        isPasswordUpdatingFailed: true,
        message: action.payload.message,
      };

    case CONSTANTS.CLEAR_RESET_PASSWORD_MESSAGE:
      return {
        ...state,
        isPasswordUpdating: false,
        isPasswordUpdatingFailed: false,
        message: "",
      };

    case CONSTANTS.GET_CODE:
      return {
        ...state,
        isCodeLoading: true,
        isCodeNotFound: false,
      };
    case CONSTANTS.GET_CODE_SUCCESS:
      return {
        ...state,
        isCodeLoading: false,
        data: action.payload,
      };

    case CONSTANTS.GET_CODE_FAILED:
      return {
        ...state,
        isCodeLoading: false,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default PasswordResetReducer;
