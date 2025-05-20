import {
  createInventoryItemOnApi,
  deleteInventoryItemFromApi,
  getInventoryCategoriesNameListFromApi,
  getInventoryDataFromApi,
  updateInventoryDataOnApi,
} from "../../HTTP/Api";

export const GET_INVENTORY_DATA = "Inventory/GET_INVENTORY_DATA";

export const getInventoryData = (payload) => async (dispatch) => {
  let page = 1;
  if (payload && payload.page) {
    page = payload.page;
  }
  try {
    const res = await getInventoryDataFromApi({ page });
    dispatch({ type: GET_INVENTORY_DATA, payload: res });
  } catch (error) {
    throw error;
  }
};

export const POST_INVENTORY_DATA = "Inventory/POST_INVENTORY_DATA";
export const POST_INVENTORY_DATA_SUCCESS =
  "Inventory/POST_INVENTORY_DATA_SUCCESS";
export const POST_INVENTORY_DATA_FAILED =
  "Inventory/POST_INVENTORY_DATA_FAILED";
export const CLEAR_POST_INVENTORY_DATA_MESSAGE =
  "Inventory/CLEAR_POST_INVENTORY_DATA_MESSAGE";

export const postInventoryData = (payload) => async (dispatch) => {
  dispatch({ type: POST_INVENTORY_DATA });
  try {
    const res = await createInventoryItemOnApi(payload);
    dispatch({ type: POST_INVENTORY_DATA_SUCCESS, payload: res });
    setTimeout(() => {
      dispatch({ type: CLEAR_POST_INVENTORY_DATA_MESSAGE });
    }, 500);
  } catch (err) {
    dispatch({ type: POST_INVENTORY_DATA_FAILED, payload: err.response });
    setTimeout(() => {
      dispatch({ type: CLEAR_POST_INVENTORY_DATA_MESSAGE });
    }, 500);
  }
};

export const PUT_INVENTORY_DATA = "Inventory/PUT_INVENTORY_DATA";
export const PUT_INVENTORY_DATA_SUCCESS =
  "Inventory/PUT_INVENTORY_DATA_SUCCESS";
export const PUT_INVENTORY_DATA_FAILED = "Inventory/PUT_INVENTORY_DATA_FAILED";
export const CLEAR_PUT_INVENTORY_DATA_MESSAGE =
  "Inventory/CLEAR_PUT_INVENTORY_DATA_MESSAGE";

export const updateInventoryData = (payload) => async (dispatch) => {
  let fd = new FormData();
  Object.keys(payload).forEach((key) => {
    fd.append(key, payload[key]);
  });

  dispatch({ type: PUT_INVENTORY_DATA });
  try {
    const res = await updateInventoryDataOnApi(fd, payload.id);
    dispatch({ type: PUT_INVENTORY_DATA_SUCCESS, payload: res });
    setTimeout(() => {
      dispatch({ type: CLEAR_PUT_INVENTORY_DATA_MESSAGE });
    }, 500);
  } catch (err) {
    dispatch({ type: PUT_INVENTORY_DATA_FAILED, payload: err.response });
    setTimeout(() => {
      dispatch({ type: CLEAR_PUT_INVENTORY_DATA_MESSAGE });
    }, 500);
  }
};

/* ------------------------------------------ */
/* ------------------------------------------ */
/* ------------------------------------------ */
export const DELETE_INVENTORY_ITEM = "Inventory/DELETE_INVENTORY_ITEM";
export const DELETE_INVENTORY_ITEM_SUCCESS =
  "Inventory/DELETE_INVENTORY_ITEM_SUCCESS";
export const DELETE_INVENTORY_ITEM_FAILED =
  "Inventory/DELETE_INVENTORY_ITEM_FAILED";
export const CLEAR_DELETE_INVENTORY_ITEM_MESSAGE =
  "Inventory/CLEAR_DELETE_INVENTORY_ITEM_MESSAGE";

export const deleteItem = (payload) => async (dispatch) => {
  dispatch({ type: DELETE_INVENTORY_ITEM });
  try {
    const res = await deleteInventoryItemFromApi(payload);
    dispatch({ type: DELETE_INVENTORY_ITEM_SUCCESS, payload: res });
    setTimeout(() => {
      dispatch({ type: CLEAR_DELETE_INVENTORY_ITEM_MESSAGE });
    }, 500);
  } catch (err) {
    dispatch({
      type: DELETE_INVENTORY_ITEM_FAILED,
      payload: err.response,
    });
    setTimeout(() => {
      dispatch({ type: CLEAR_DELETE_INVENTORY_ITEM_MESSAGE });
    }, 500);
  }
};

export const GET_INVENTORY_CATEGORIES_LIST =
  "Inventory/GET_INVENTORY_CATEGORIES_LIST";
export const GET_INVENTORY_CATEGORIES_LIST_SUCCESS =
  "Inventory/GET_INVENTORY_CATEGORIES_LIST_SUCCESS";
export const GET_INVENTORY_CATEGORIES_LIST_FAILED =
  "Inventory/GET_INVENTORY_CATEGORIES_LIST_FAILED";

export const getInventoryCategoriesNameList = () => async (dispatch) => {
  dispatch({ type: GET_INVENTORY_CATEGORIES_LIST });

  try {
    const res = await getInventoryCategoriesNameListFromApi();
    dispatch({ type: GET_INVENTORY_CATEGORIES_LIST_SUCCESS, payload: res });
  } catch (err) {
    dispatch({ type: GET_INVENTORY_CATEGORIES_LIST_FAILED });
  }
};
