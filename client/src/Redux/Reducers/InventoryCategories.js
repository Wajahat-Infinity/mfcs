import * as CONSTANTS from "../Actions/InventoryCategories";

const initialState = {
  totalPages: 0,
  currentPage: 1,
  isUpdating: false,
  isUpdatingFailed: false,
  updateMessage: "",
  data: [],

  deleteMessage: "",
  isDeleting: false,
  isDeletingFailed: false,

  postMessage: "",
  isPosting: false,
  isPostingFailed: false,
};

function InventoryCategoriesReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.GET_INVENTORY_CATEGORIES_SUCCESS: {
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
    case CONSTANTS.PUT_INVENTORY_CATEGORIES: {
      return {
        ...state,
        isUpdating: true,
      };
    }

    case CONSTANTS.PUT_INVENTORY_CATEGORIES_SUCCESS: {
      const uD = action.payload.data;
      const data = state.data.map((item) => {
        if (item.category_id === uD["category_id"]) return uD;
        return item;
      });
      return {
        ...state,
        isUpdating: false,
        data,
        updateMessage: action.payload?.message,
      };
    }

    case CONSTANTS.PUT_INVENTORY_CATEGORIES_FAILED: {
      return {
        ...state,
        isUpdating: false,
        isUpdatingFailed: true,
        updateMessage: action.payload?.data?.message,
      };
    }

    case CONSTANTS.CLEAR_PUT_INVENTORY_CATEGORIES_MESSAGE: {
      return {
        ...state,
        updateMessage: null,
        isUpdatingFailed: false,
      };
    }

    /* ------------------------------------------ */
    /* ------------------------------------------ */
    /* ------------------------------------------ */
    case CONSTANTS.DELETE_INVENTORY_CATEGORIES: {
      return {
        ...state,
        isDeleting: true,
      };
    }
    case CONSTANTS.DELETE_INVENTORY_CATEGORIES_SUCCESS: {
      const resData = action.payload;
      const data = state.data.filter(
        (item) => item.category_id !== Number(resData.categoryId)
      );
      return {
        ...state,
        isDeleting: false,
        deleteMessage: resData.message,
        data,
      };
    }

    case CONSTANTS.DELETE_INVENTORY_CATEGORIES_FAILED: {
      return {
        ...state,
        isDeleting: false,
        isDeletingFailed: true,
        deleteMessage: action.payload.data?.message,
      };
    }

    case CONSTANTS.CLEAR_DELETE_INVENTORY_CATEGORIES_MESSAGE: {
      return {
        ...state,
        isDeletingFailed: false,
        deleteMessage: "",
      };
    }

    /* ------------------------------------------ */
    /* ------------------------------------------ */
    /* ------------------------------------------ */
    case CONSTANTS.POST_INVENTORY_CATEGORIES: {
      return {
        ...state,
        isPosting: true,
      };
    }

    case CONSTANTS.POST_INVENTORY_CATEGORIES_SUCCESS: {
      let data = [];
      data = [...state.data, ...action.payload.data];
      return {
        ...state,
        isPosting: false,
        postMessage: action.payload.message,
        data,
      };
    }

    case CONSTANTS.POST_INVENTORY_CATEGORIES_FAILED: {
      return {
        ...state,
        isPosting: false,
        isPostingFailed: true,
        postMessage: action.payload.data?.message,
      };
    }
    case CONSTANTS.CLEAR_POST_INVENTORY_CATEGORIES_MESSAGE: {
      return {
        ...state,
        isPostingFailed: false,
        postMessage: "",
      };
    }

    default:
      return state;
  }
}

export default InventoryCategoriesReducer;
