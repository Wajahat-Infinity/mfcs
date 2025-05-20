import {
  getFarmChemicalsFromApi,
  createFarmchemicalsOnApi,
  updateFarmchemicalsOnApi,
  deleteFarmchemicalFromApi,
  getChemicalsCategoriesNameListFromApi,
} from "../../HTTP/Api";

export const GET_FARM_CHEMICALS_DATA = "FarmChemicals/GET_FARM_CHEMICALS_DATA";
export const GET_FARM_CHEMICALS_DATA_SUCCESS =
  "FarmChemicals/GET_FARM_CHEMICALS_DATA_SUCCESS";
export const GET_FARM_CHEMICALS_DATA_FAILED =
  "FarmChemicals/GET_FARM_CHEMICALS_DATA_FAILED";

export const getFarmChemicalsData = (payload) => async (dispatch) => {
  dispatch({ type: GET_FARM_CHEMICALS_DATA });
  let page = 1;
  if (payload && payload.page) {
    page = payload.page;
  }
  try {
    const res = await getFarmChemicalsFromApi({ page });
    dispatch({ type: GET_FARM_CHEMICALS_DATA_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: GET_FARM_CHEMICALS_DATA_FAILED, payload: error });
    throw error;
  }
};

export const POST_FARM_CHEMICALS_DATA = "Inventory/POST_FARM_CHEMICALS_DATA";
export const POST_FARM_CHEMICALS_DATA_SUCCESS =
  "Inventory/POST_FARM_CHEMICALS_DATA_SUCCESS";
export const POST_FARM_CHEMICALS_DATA_FAILED =
  "Inventory/POST_FARM_CHEMICALS_DATA_FAILED";
export const CLEAR_POST_FARM_CHEMICALS_DATA_MESSAGE =
  "Inventory/CLEAR_POST_FARM_CHEMICALS_DATA_MESSAGE";

export const createFarmchemicals = (payload) => async (dispatch) => {
  dispatch({ type: POST_FARM_CHEMICALS_DATA });
  try {
    const res = await createFarmchemicalsOnApi(payload);
    dispatch({ type: POST_FARM_CHEMICALS_DATA_SUCCESS, payload: res });
    setTimeout(() => {
      dispatch({ type: CLEAR_POST_FARM_CHEMICALS_DATA_MESSAGE });
    }, 500);
  } catch (err) {
    dispatch({ type: POST_FARM_CHEMICALS_DATA_FAILED, payload: err.response });
    setTimeout(() => {
      dispatch({ type: CLEAR_POST_FARM_CHEMICALS_DATA_MESSAGE });
    }, 500);
  }
};

export const PUT_FARM_CHEMICALS_DATA = "Inventory/PUT_FARM_CHEMICALS_DATA";
export const PUT_FARM_CHEMICALS_DATA_SUCCESS =
  "Inventory/PUT_FARM_CHEMICALS_DATA_SUCCESS";
export const PUT_FARM_CHEMICALS_DATA_FAILED =
  "Inventory/PUT_FARM_CHEMICALS_DATA_FAILED";
export const CLEAR_PUT_FARM_CHEMICALS_DATA_MESSAGE =
  "Inventory/CLEAR_PUT_FARM_CHEMICALS_DATA_MESSAGE";

export const updateFarmchemicals = (payload) => async (dispatch) => {
  let fd = new FormData();
  Object.keys(payload).forEach((key) => {
    fd.append(key, payload[key]);
  });

  dispatch({ type: PUT_FARM_CHEMICALS_DATA });
  try {
    const res = await updateFarmchemicalsOnApi(fd, payload.id);
    dispatch({ type: PUT_FARM_CHEMICALS_DATA_SUCCESS, payload: res });
    setTimeout(() => {
      dispatch({ type: CLEAR_PUT_FARM_CHEMICALS_DATA_MESSAGE });
    }, 500);
  } catch (err) {
    dispatch({ type: PUT_FARM_CHEMICALS_DATA_FAILED, payload: err.response });
    setTimeout(() => {
      dispatch({ type: CLEAR_PUT_FARM_CHEMICALS_DATA_MESSAGE });
    }, 500);
  }
};

/* ------------------------------------------ */
/* ------------------------------------------ */
/* ------------------------------------------ */
export const DELETE_FARM_CHEMICALS_DATA =
  "Inventory/DELETE_FARM_CHEMICALS_DATA";
export const DELETE_FARM_CHEMICALS_DATA_SUCCESS =
  "Inventory/DELETE_FARM_CHEMICALS_DATA_SUCCESS";
export const DELETE_FARM_CHEMICALS_DATA_FAILED =
  "Inventory/DELETE_FARM_CHEMICALS_DATA_FAILED";
export const CLEAR_DELETE_FARM_CHEMICALS_DATA_MESSAGE =
  "Inventory/CLEAR_DELETE_FARM_CHEMICALS_DATA_MESSAGE";

export const deleteFarmchemical = (payload) => async (dispatch) => {
  dispatch({ type: DELETE_FARM_CHEMICALS_DATA });
  try {
    const res = await deleteFarmchemicalFromApi(payload);
    dispatch({ type: DELETE_FARM_CHEMICALS_DATA_SUCCESS, payload: res });
    setTimeout(() => {
      dispatch({ type: CLEAR_DELETE_FARM_CHEMICALS_DATA_MESSAGE });
    }, 500);
  } catch (err) {
    dispatch({
      type: DELETE_FARM_CHEMICALS_DATA_FAILED,
      payload: err.response,
    });
    setTimeout(() => {
      dispatch({ type: CLEAR_DELETE_FARM_CHEMICALS_DATA_MESSAGE });
    }, 500);
  }
};

export const GET_CHEMICAL_CATEGORIES = "Inventory/GET_CHEMICAL_CATEGORIES";
export const GET_CHEMICAL_CATEGORIES_SUCCESS =
  "Inventory/GET_CHEMICAL_CATEGORIES_SUCCESS";
export const GET_CHEMICAL_CATEGORIES_FAILED =
  "Inventory/GET_CHEMICAL_CATEGORIES_FAILED";

export const getChemicalCategoriesNameList = () => async (dispatch) => {
  dispatch({ type: GET_CHEMICAL_CATEGORIES });

  try {
    const res = await getChemicalsCategoriesNameListFromApi();
    dispatch({ type: GET_CHEMICAL_CATEGORIES_SUCCESS, payload: res });
  } catch (err) {
    dispatch({ type: GET_CHEMICAL_CATEGORIES_FAILED });
  }
};
