import * as CONSTANTS from "../Actions/LivestockData";

const initialState = {
  totalPages: 0,
  currentPage: 1,
  data: [],
  isDeleting: false,
  isDeletingFailed: false,
  deleteMessage: "",
  isPosting: false,
  isPostingFailed: false,
  postMessage: "",
  isUpdating: false,
  isUpdatingFailed: false,
  updateMessage: "",
  categoriesList: [],
};

function LivestockDataReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.GET_LIVESTOCK_DATA: {
      let dataArray = action.payload;
      if (dataArray && dataArray.currentPage !== 1)
        dataArray["data"] = [...state.data, ...action.payload.data];
      return {
        ...state,
        ...dataArray,
      };
    }

    /* ------------------------------------------ */
    /* ------------------------------------------ */
    /* ------------------------------------------ */
    case CONSTANTS.DELETE_LIVESTOCK_DATA_SUCCESS: {
      const resData = action.payload;
      const data = state.data.filter(
        (item) => item.livestock_id !== Number(resData.animalId)
      );
      return {
        ...state,
        isDeleting: false,
        deleteMessage: resData.message,
        data,
      };
    }

    case CONSTANTS.DELETE_LIVESTOCK_DATA_FAILED: {
      return {
        ...state,
        isDeleting: false,
        isDeletingFailed: true,
        deleteMessage: action.payload.data?.message,
      };
    }

    case CONSTANTS.CLEAR_DELETE_LIVESTOCK_DATA_MESSAGE: {
      return {
        ...state,
        isDeletingFailed: false,
        deleteMessage: "",
      };
    }
    /* ------------------------------------------ */
    /* ------------------------------------------ */
    /* ------------------------------------------ */
    case CONSTANTS.POST_LIVESTOCK_DATA_SUCCESS: {
      let data = [];
      data = [...state.data, ...action.payload.data];
      return {
        ...state,
        isPosting: false,
        postMessage: action.payload.message,
        data,
      };
    }

    case CONSTANTS.POST_LIVESTOCK_DATA_FAILED: {
      return {
        ...state,
        isPosting: false,
        isPostingFailed: true,
        postMessage: action.payload.data?.message,
      };
    }
    case CONSTANTS.CLEAR_POST_LIVESTOCK_DATA_MESSAGE: {
      return {
        ...state,
        isPostingFailed: false,
        postMessage: "",
      };
    }

    /* ------------------------------------------ */
    /* ------------------------------------------ */
    /* ------------------------------------------ */

    case CONSTANTS.PUT_LIVESTOCK_DATA_SUCCESS: {
      const uD = action.payload.data;
      const data = state.data.map((item) => {
        if (item.livestock_id === uD["livestock_id"]) return uD;
        return item;
      });
      return {
        ...state,
        isUpdating: false,
        data,
        updateMessage: action.payload?.message,
      };
    }

    case CONSTANTS.PUT_LIVESTOCK_DATA_FAILED: {
      return {
        ...state,
        isUpdating: false,
        isUpdatingFailed: true,
        updateMessage: action.payload.data?.message,
      };
    }

    case CONSTANTS.CLEAR_PUT_LIVESTOCK_DATA_MESSAGE: {
      return {
        ...state,
        updateMessage: null,
        isUpdatingFailed: false,
      };
    }

    case CONSTANTS.GET_LIVESTOCK_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categoriesList: [...action.payload.data],
      };
    }
    default:
      return state;
  }
}

export default LivestockDataReducer;
