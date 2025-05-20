import * as CONSTANTS from "../Actions/Auth";

const initialState = {
  isSignInLoading: false,
  isSignInLoadingFailed: false,
  signInErrorMessage: "",
  isUserSignedIn: false,
  isSessionCheking: false,
  isSessionChekingFailed: false,
  isSignUpLoading: false,
  isSignUpLoadingFailed: false,
  signUpMessage: "",
  isProfileUpdating: false,
  updateProfileMessage: "",
  currentUser: {},

  isOAuthLoading: false,
  isOAuthLoadingFailed: false,
};

function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.POST_SIGN_IN:
      return {
        ...state,
        isSignInLoading: true,
        isSignInLoadingFailed: false,
      };

    case CONSTANTS.POST_SIGN_IN_SUCCESS:
    case CONSTANTS.O_AUTH_SUCCESS: {
      localStorage.setItem("SMART_FARMING_TOKEN", action.payload.token);

      return {
        ...state,
        isSignInLoading: false,
        isUserSignedIn: true,
        isOAuthLoading: false,
        currentUser: action.payload,
      };
    }

    case CONSTANTS.POST_SIGN_IN_FAILURE: {
      return {
        ...state,
        isSignInLoadingFailed: true,
        isSignInLoading: false,
        signInErrorMessage:
          action.payload?.data?.message ||
          "Something went wrong, Please try later..",
      };
    }

    case CONSTANTS.O_AUTH: {
      return {
        ...state,
        isOAuthLoading: true,
        isOAuthLoadingFailed: false,
      };
    }
    case CONSTANTS.O_AUTH_FAILURE: {
      return {
        ...state,
        isOAuthLoading: false,
        isOAuthLoadingFailed: true,
      };
    }

    case CONSTANTS.CLEAR_SIGN_IN_ERROR_MESSAGE: {
      return {
        ...state,
        signInErrorMessage: null,
        isSignInLoadingFailed: false,
      };
    }

    case CONSTANTS.POST_SIGN_UP: {
      return {
        ...state,
        isSignUpLoading: true,
        isSignUpLoadingFailed: false,
      };
    }

    case CONSTANTS.POST_SIGN_UP_SUCCESS: {
      return {
        ...state,
        isSignUpLoading: false,
        signUpMessage: action.payload?.data?.message,
      };
    }

    case CONSTANTS.POST_SIGN_UP_FAILURE: {
      return {
        ...state,
        isSignUpLoadingFailed: true,
        isSignUpLoading: false,
        signUpMessage:
          action.payload.data?.message ||
          "Something went wrong, Please try later..",
      };
    }

    case CONSTANTS.CLEAR_SIGN_UP_MESSAGE: {
      return {
        ...state,
        signUpMessage: null,
        isSignUpLoadingFailed: false,
      };
    }

    case CONSTANTS.SING_OUT: {
      localStorage.setItem("SMART_FARMING_TOKEN", "");
      return {
        ...state,
        isUserSignedIn: false,
        currentUser: {},
      };
    }

    case CONSTANTS.CHECK_SESSION:
      return {
        ...state,
        isSessionCheking: true,
        isSessionChekingFailed: false,
      };

    case CONSTANTS.CHECK_SESSION_SUCCESS: {
      return {
        ...state,
        isUserSignedIn: true,
        isSessionCheking: false,
        currentUser: action.payload,
      };
    }

    case CONSTANTS.CHECK_SESSION_FAILURE: {
      return {
        ...state,
        isSessionChekingFailed: false,
        isSessionCheking: false,
        currentUser: {},
      };
    }

    case CONSTANTS.UPDATE_PROFILE: {
      return {
        ...state,
        isProfileUpdating: true,
      };
    }

    case CONSTANTS.UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        isProfileUpdating: false,
        currentUser: {
          ...state.currentUser,
          ...action.payload.data,
        },
        updateProfileMessage: action.payload.message,
      };
    }

    case CONSTANTS.CLEAR_UPDATE_PROFILE_MESSAGE: {
      return {
        ...state,
        updateProfileMessage: "",
      };
    }

    default:
      return state;
  }
}

export default AuthReducer;
