import {
  createLivestockCategoryOnApi,
  deleteLivestockCategoryFromApi,
  putLivestockCategoryOnApi,
  getLivestockCategoriesFromApi,
} from "../../HTTP/Api";

export const GET_LIVESTOCK_CATEGORIES = "Livestock/GET_LIVESTOCK_CATEGORIES";
export const GET_LIVESTOCK_CATEGORIES_SUCCESS =
  "Livestock/GET_LIVESTOCK_CATEGORIES_SUCCESS";
export const GET_LIVESTOCK_CATEGORIES_FAILED =
  "Livestock/GET_LIVESTOCK_CATEGORIES_FAILED";

export const getLivestockCategories = (payload) => async (dispatch) => {
  let page = 1;
  if (payload && payload.page) {
    page = payload.page;
  }
  try {
    const res = await getLivestockCategoriesFromApi({ page });
    dispatch({ type: GET_LIVESTOCK_CATEGORIES_SUCCESS, payload: res });
  } catch (error) {
    throw error;
  }
};

/* ------------------------------------------ */
/* ------------------------------------------ */
/* ------------------------------------------ */
export const PUT_LIVESTOCK_CATEGORIES = "Livestock/PUT_LIVESTOCK_CATEGORIES";
export const PUT_LIVESTOCK_CATEGORIES_SUCCESS =
  "Livestock/PUT_LIVESTOCK_CATEGORIES_SUCCESS";
export const PUT_LIVESTOCK_CATEGORIES_FAILED =
  "Livestock/PUT_LIVESTOCK_CATEGORIES_FAILED";
export const CLEAR_PUT_LIVESTOCK_CATEGORIES_MESSAGE =
  "Livestock/CLEAR_PUT_LIVESTOCK_CATEGORIES_MESSAGE";

export const updateCategory = (payload) => async (dispatch) => {
  dispatch({ type: PUT_LIVESTOCK_CATEGORIES });
  let fd = new FormData();
  fd.append("categoryName", payload.categoryName);

  try {
    const res = await putLivestockCategoryOnApi(fd, payload.id);
    dispatch({ type: PUT_LIVESTOCK_CATEGORIES_SUCCESS, payload: res });
    setTimeout(() => {
      dispatch({ type: CLEAR_PUT_LIVESTOCK_CATEGORIES_MESSAGE });
    }, 500);
  } catch (err) {
    dispatch({
      type: PUT_LIVESTOCK_CATEGORIES_FAILED,
      payload: err.response,
    });
    setTimeout(() => {
      dispatch({ type: CLEAR_PUT_LIVESTOCK_CATEGORIES_MESSAGE });
    }, 500);
  }
};

/* ------------------------------------------ */
/* ------------------------------------------ */
/* ------------------------------------------ */
export const DELETE_LIVESTOCK_CATEGORIES =
  "Livestock/DELETE_LIVESTOCK_CATEGORIES";
export const DELETE_LIVESTOCK_CATEGORIES_SUCCESS =
  "Livestock/DELETE_LIVESTOCK_CATEGORIES_SUCCESS";
export const DELETE_LIVESTOCK_CATEGORIES_FAILED =
  "Livestock/DELETE_LIVESTOCK_CATEGORIES_FAILED";
export const CLEAR_DELETE_LIVESTOCK_CATEGORIES_MESSAGE =
  "Livestock/CLEAR_DELETE_LIVESTOCK_CATEGORIES_MESSAGE";

export const deleteItem = (payload) => async (dispatch) => {
  dispatch({ type: DELETE_LIVESTOCK_CATEGORIES });
  try {
    const res = await deleteLivestockCategoryFromApi(payload);
    dispatch({ type: DELETE_LIVESTOCK_CATEGORIES_SUCCESS, payload: res });
    setTimeout(() => {
      dispatch({ type: CLEAR_DELETE_LIVESTOCK_CATEGORIES_MESSAGE });
    }, 500);
  } catch (err) {
    dispatch({
      type: DELETE_LIVESTOCK_CATEGORIES_FAILED,
      payload: err.response,
    });
    setTimeout(() => {
      dispatch({ type: CLEAR_DELETE_LIVESTOCK_CATEGORIES_MESSAGE });
    }, 500);
  }
};

/* ------------------------------------------ */
/* ------------------------------------------ */
/* ------------------------------------------ */
export const POST_LIVESTOCK_CATEGORIES = "Livestock/POST_LIVESTOCK_CATEGORIES";
export const POST_LIVESTOCK_CATEGORIES_SUCCESS =
  "Livestock/POST_LIVESTOCK_CATEGORIES_SUCCESS";
export const POST_LIVESTOCK_CATEGORIES_FAILED =
  "Livestock/POST_LIVESTOCK_CATEGORIES_FAILED";
export const CLEAR_POST_LIVESTOCK_CATEGORIES_MESSAGE =
  "Livestock/CLEAR_POST_LIVESTOCK_CATEGORIES_MESSAGE";

export const createItem = (payload) => async (dispatch) => {
  dispatch({ type: POST_LIVESTOCK_CATEGORIES });
  try {
    const res = await createLivestockCategoryOnApi(payload);
    dispatch({ type: POST_LIVESTOCK_CATEGORIES_SUCCESS, payload: res });
    setTimeout(() => {
      dispatch({ type: CLEAR_POST_LIVESTOCK_CATEGORIES_MESSAGE });
    }, 500);
  } catch (err) {
    dispatch({
      type: POST_LIVESTOCK_CATEGORIES_FAILED,
      payload: err.response,
    });
    setTimeout(() => {
      dispatch({ type: CLEAR_POST_LIVESTOCK_CATEGORIES_MESSAGE });
    }, 500);
  }
};
