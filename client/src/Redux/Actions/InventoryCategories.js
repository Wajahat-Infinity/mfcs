import {
  createInventoryCategoryOnApi,
  deleteInventoryCategoryFromApi,
  getInventoryCategoriesFromApi,
  putInventoryCategoryOnApi,
} from "../../HTTP/Api";

export const GET_INVENTORY_CATEGORIES = "Inventory/GET_INVENTORY_CATEGORIES";
export const GET_INVENTORY_CATEGORIES_SUCCESS =
  "Inventory/GET_INVENTORY_CATEGORIES_SUCCESS";
export const GET_INVENTORY_CATEGORIES_FAILED =
  "Inventory/GET_INVENTORY_CATEGORIES_FAILED";

export const getInventoryCategories = (payload) => async (dispatch) => {
  dispatch({ type: GET_INVENTORY_CATEGORIES });

  let page = 1;
  if (payload && payload.page) {
    page = payload.page;
  }
  try {
    const res = await getInventoryCategoriesFromApi({ page });
    dispatch({ type: GET_INVENTORY_CATEGORIES_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: GET_INVENTORY_CATEGORIES_FAILED, payload: error });
  }
};

/* ------------------------------------------ */
/* ------------------------------------------ */
/* ------------------------------------------ */
export const PUT_INVENTORY_CATEGORIES = "Inventory/PUT_INVENTORY_CATEGORIES";
export const PUT_INVENTORY_CATEGORIES_SUCCESS =
  "Inventory/PUT_INVENTORY_CATEGORIES_SUCCESS";
export const PUT_INVENTORY_CATEGORIES_FAILED =
  "Inventory/PUT_INVENTORY_CATEGORIES_FAILED";
export const CLEAR_PUT_INVENTORY_CATEGORIES_MESSAGE =
  "Inventory/CLEAR_PUT_INVENTORY_CATEGORIES_MESSAGE";

export const updateCategory = (payload) => async (dispatch) => {
  dispatch({ type: PUT_INVENTORY_CATEGORIES });
  let fd = new FormData();
  fd.append("categoryName", payload.categoryName);

  try {
    const res = await putInventoryCategoryOnApi(fd, payload.id);
    dispatch({ type: PUT_INVENTORY_CATEGORIES_SUCCESS, payload: res });
    setTimeout(() => {
      dispatch({ type: CLEAR_PUT_INVENTORY_CATEGORIES_MESSAGE });
    }, 500);
  } catch (err) {
    dispatch({
      type: PUT_INVENTORY_CATEGORIES_FAILED,
      payload: err.response,
    });
    setTimeout(() => {
      dispatch({ type: CLEAR_PUT_INVENTORY_CATEGORIES_MESSAGE });
    }, 500);
  }
};

/* ------------------------------------------ */
/* ------------------------------------------ */
/* ------------------------------------------ */
export const DELETE_INVENTORY_CATEGORIES =
  "Inventory/DELETE_INVENTORY_CATEGORIES";
export const DELETE_INVENTORY_CATEGORIES_SUCCESS =
  "Inventory/DELETE_INVENTORY_CATEGORIES_SUCCESS";
export const DELETE_INVENTORY_CATEGORIES_FAILED =
  "Inventory/DELETE_INVENTORY_CATEGORIES_FAILED";
export const CLEAR_DELETE_INVENTORY_CATEGORIES_MESSAGE =
  "Inventory/CLEAR_DELETE_INVENTORY_CATEGORIES_MESSAGE";

export const deleteInventoryCategory = (payload) => async (dispatch) => {
  dispatch({ type: DELETE_INVENTORY_CATEGORIES });
  try {
    const res = await deleteInventoryCategoryFromApi(payload);
    dispatch({ type: DELETE_INVENTORY_CATEGORIES_SUCCESS, payload: res });
    setTimeout(() => {
      dispatch({ type: CLEAR_DELETE_INVENTORY_CATEGORIES_MESSAGE });
    }, 500);
  } catch (err) {
    dispatch({
      type: DELETE_INVENTORY_CATEGORIES_FAILED,
      payload: err.response,
    });
    setTimeout(() => {
      dispatch({ type: CLEAR_DELETE_INVENTORY_CATEGORIES_MESSAGE });
    }, 500);
  }
};

/* ------------------------------------------ */
/* ------------------------------------------ */
/* ------------------------------------------ */
export const POST_INVENTORY_CATEGORIES = "Inventory/POST_INVENTORY_CATEGORIES";
export const POST_INVENTORY_CATEGORIES_SUCCESS =
  "Inventory/POST_INVENTORY_CATEGORIES_SUCCESS";
export const POST_INVENTORY_CATEGORIES_FAILED =
  "Inventory/POST_INVENTORY_CATEGORIES_FAILED";
export const CLEAR_POST_INVENTORY_CATEGORIES_MESSAGE =
  "Inventory/CLEAR_POST_INVENTORY_CATEGORIES_MESSAGE";

export const createItem = (payload) => async (dispatch) => {
  dispatch({ type: POST_INVENTORY_CATEGORIES });
  try {
    const res = await createInventoryCategoryOnApi(payload);
    dispatch({ type: POST_INVENTORY_CATEGORIES_SUCCESS, payload: res });
    setTimeout(() => {
      dispatch({ type: CLEAR_POST_INVENTORY_CATEGORIES_MESSAGE });
    }, 500);
  } catch (err) {
    dispatch({
      type: POST_INVENTORY_CATEGORIES_FAILED,
      payload: err.response,
    });
    setTimeout(() => {
      dispatch({ type: CLEAR_POST_INVENTORY_CATEGORIES_MESSAGE });
    }, 500);
  }
};
