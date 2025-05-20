import {
  createLivestockDataOnApi,
  deleteLivestockFromApi,
  getLivestockCategoriesNameListFromApi,
  getLivestockDataFromApi,
  updateLivestockDataOnApi,
} from "../../HTTP/Api";

export const GET_LIVESTOCK_DATA = "Livestock/GET_LIVESTOCK_DATA";

export const getLivestockData = (payload) => async (dispatch) => {
  let page = 1;
  if (payload && payload.page) {
    page = payload.page;
  }
  try {
    const res = await getLivestockDataFromApi(page);
    dispatch({ type: GET_LIVESTOCK_DATA, payload: res });
  } catch (error) {
    throw error;
  }
};

export const POST_LIVESTOCK_DATA = "Inventory/POST_LIVESTOCK_DATA";
export const POST_LIVESTOCK_DATA_SUCCESS =
  "Inventory/POST_LIVESTOCK_DATA_SUCCESS";
export const POST_LIVESTOCK_DATA_FAILED =
  "Inventory/POST_LIVESTOCK_DATA_FAILED";
export const CLEAR_POST_LIVESTOCK_DATA_MESSAGE =
  "Inventory/CLEAR_POST_LIVESTOCK_DATA_MESSAGE";

export const createLivestockData = (payload) => async (dispatch) => {
  dispatch({ type: POST_LIVESTOCK_DATA });
  try {
    const res = await createLivestockDataOnApi(payload);
    dispatch({ type: POST_LIVESTOCK_DATA_SUCCESS, payload: res });
    setTimeout(() => {
      dispatch({ type: CLEAR_POST_LIVESTOCK_DATA_MESSAGE });
    }, 500);
  } catch (err) {
    dispatch({ type: POST_LIVESTOCK_DATA_FAILED, payload: err.response });
    setTimeout(() => {
      dispatch({ type: CLEAR_POST_LIVESTOCK_DATA_MESSAGE });
    }, 500);
  }
};

export const PUT_LIVESTOCK_DATA = "Inventory/PUT_LIVESTOCK_DATA";
export const PUT_LIVESTOCK_DATA_SUCCESS =
  "Inventory/PUT_LIVESTOCK_DATA_SUCCESS";
export const PUT_LIVESTOCK_DATA_FAILED = "Inventory/PUT_LIVESTOCK_DATA_FAILED";
export const CLEAR_PUT_LIVESTOCK_DATA_MESSAGE =
  "Inventory/CLEAR_PUT_LIVESTOCK_DATA_MESSAGE";

export const updateLivestockData = (payload) => async (dispatch) => {
  let fd = new FormData();
  Object.keys(payload).forEach((key) => {
    fd.append(key, payload[key]);
  });

  dispatch({ type: PUT_LIVESTOCK_DATA });
  try {
    const res = await updateLivestockDataOnApi(fd, payload.id);
    dispatch({ type: PUT_LIVESTOCK_DATA_SUCCESS, payload: res });
    setTimeout(() => {
      dispatch({ type: CLEAR_PUT_LIVESTOCK_DATA_MESSAGE });
    }, 500);
  } catch (err) {
    dispatch({ type: PUT_LIVESTOCK_DATA_FAILED, payload: err.response });
    setTimeout(() => {
      dispatch({ type: CLEAR_PUT_LIVESTOCK_DATA_MESSAGE });
    }, 500);
  }
};

/* ------------------------------------------ */
/* ------------------------------------------ */
/* ------------------------------------------ */
export const DELETE_LIVESTOCK_DATA = "Inventory/DELETE_LIVESTOCK_DATA";
export const DELETE_LIVESTOCK_DATA_SUCCESS =
  "Inventory/DELETE_LIVESTOCK_DATA_SUCCESS";
export const DELETE_LIVESTOCK_DATA_FAILED =
  "Inventory/DELETE_LIVESTOCK_DATA_FAILED";
export const CLEAR_DELETE_LIVESTOCK_DATA_MESSAGE =
  "Inventory/CLEAR_DELETE_LIVESTOCK_DATA_MESSAGE";

export const deleteLivestock = (payload) => async (dispatch) => {
  dispatch({ type: DELETE_LIVESTOCK_DATA });
  try {
    const res = await deleteLivestockFromApi(payload);
    dispatch({ type: DELETE_LIVESTOCK_DATA_SUCCESS, payload: res });
    setTimeout(() => {
      dispatch({ type: CLEAR_DELETE_LIVESTOCK_DATA_MESSAGE });
    }, 500);
  } catch (err) {
    dispatch({
      type: DELETE_LIVESTOCK_DATA_FAILED,
      payload: err.response,
    });
    setTimeout(() => {
      dispatch({ type: CLEAR_DELETE_LIVESTOCK_DATA_MESSAGE });
    }, 500);
  }
};

export const GET_LIVESTOCK_CATEGORIES = "Inventory/GET_LIVESTOCK_CATEGORIES";
export const GET_LIVESTOCK_CATEGORIES_SUCCESS =
  "Inventory/GET_LIVESTOCK_CATEGORIES_SUCCESS";
export const GET_LIVESTOCK_CATEGORIES_FAILED =
  "Inventory/GET_LIVESTOCK_CATEGORIES_FAILED";

export const getLivestockCategoriesNameList = () => async (dispatch) => {
  dispatch({ type: GET_LIVESTOCK_CATEGORIES });

  try {
    const res = await getLivestockCategoriesNameListFromApi();
    dispatch({ type: GET_LIVESTOCK_CATEGORIES_SUCCESS, payload: res });
  } catch (err) {
    dispatch({ type: GET_LIVESTOCK_CATEGORIES_FAILED });
  }
};
