import {
  createFarmChemicalCategoryOnApi,
  deleteFarmChemicalCategoryFromApi,
  getFarmChemicalsCategoriesFromApi,
  putFarmChemicalCategoryOnApi,
} from "../../HTTP/Api";

/* ------------------------------------------ */
/* ------------------------------------------ */
/* ------------------------------------------ */
export const GET_FARM_CHEMICALS_CATEGORIES =
  "FarmChemicals/GET_FARM_CHEMICALS_CATEGORIES";
export const GET_FARM_CHEMICALS_CATEGORIES_SUCCESS =
  "FarmChemicals/GET_FARM_CHEMICALS_CATEGORIES_SUCCESS";
export const GET_FARM_CHEMICALS_CATEGORIES_FAILED =
  "FarmChemicals/GET_FARM_CHEMICALS_CATEGORIES_FAILED";

export const getFarmChemicalsCategories = (payload) => async (dispatch) => {
  dispatch({ type: GET_FARM_CHEMICALS_CATEGORIES });
  let page = 1;

  if (payload && payload.page) {
    page = payload.page;
  }
  try {
    const res = await getFarmChemicalsCategoriesFromApi({ page });
    dispatch({ type: GET_FARM_CHEMICALS_CATEGORIES_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: GET_FARM_CHEMICALS_CATEGORIES_FAILED, payload: error });
  }
};

/* ------------------------------------------ */
/* ------------------------------------------ */
/* ------------------------------------------ */
export const PUT_FARM_CHEMICAL_CATEGORY =
  "FarmChemicals/PUT_FARM_CHEMICAL_CATEGORY";
export const PUT_FARM_CHEMICAL_CATEGORY_SUCCESS =
  "FarmChemicals/PUT_FARM_CHEMICAL_CATEGORY_SUCCESS";
export const PUT_FARM_CHEMICAL_CATEGORY_FAILED =
  "FarmChemicals/PUT_FARM_CHEMICAL_CATEGORY_FAILED";
export const CLEAR_PUT_FARM_CHEMICAL_CATEGORY_MESSAGE =
  "FarmChemicals/CLEAR_PUT_FARM_CHEMICAL_CATEGORY_MESSAGE";

export const updateCategory = (payload) => async (dispatch) => {
  dispatch({ type: PUT_FARM_CHEMICAL_CATEGORY });
  let fd = new FormData();
  fd.append("categoryName", payload.categoryName);

  try {
    const res = await putFarmChemicalCategoryOnApi(fd, payload.id);
    dispatch({ type: PUT_FARM_CHEMICAL_CATEGORY_SUCCESS, payload: res });
    setTimeout(() => {
      dispatch({ type: CLEAR_PUT_FARM_CHEMICAL_CATEGORY_MESSAGE });
    }, 500);
  } catch (err) {
    dispatch({
      type: PUT_FARM_CHEMICAL_CATEGORY_FAILED,
      payload: err.response,
    });
    setTimeout(() => {
      dispatch({ type: CLEAR_PUT_FARM_CHEMICAL_CATEGORY_MESSAGE });
    }, 500);
  }
};

/* ------------------------------------------ */
/* ------------------------------------------ */
/* ------------------------------------------ */
export const DELETE_FARM_CHEMICAL_CATEGORY =
  "FarmChemicals/DELETE_FARM_CHEMICAL_CATEGORY";
export const DELETE_FARM_CHEMICAL_CATEGORY_SUCCESS =
  "FarmChemicals/DELETE_FARM_CHEMICAL_CATEGORY_SUCCESS";
export const DELETE_FARM_CHEMICAL_CATEGORY_FAILED =
  "FarmChemicals/DELETE_FARM_CHEMICAL_CATEGORY_FAILED";
export const CLEAR_DELETE_FARM_CHEMICAL_CATEGORY_MESSAGE =
  "FarmChemicals/CLEAR_DELETE_FARM_CHEMICAL_CATEGORY_MESSAGE";

export const deleteItem = (payload) => async (dispatch) => {
  dispatch({ type: DELETE_FARM_CHEMICAL_CATEGORY });
  try {
    const res = await deleteFarmChemicalCategoryFromApi(payload);
    dispatch({ type: DELETE_FARM_CHEMICAL_CATEGORY_SUCCESS, payload: res });
    setTimeout(() => {
      dispatch({ type: CLEAR_DELETE_FARM_CHEMICAL_CATEGORY_MESSAGE });
    }, 500);
  } catch (err) {
    dispatch({
      type: DELETE_FARM_CHEMICAL_CATEGORY_FAILED,
      payload: err.response,
    });
    setTimeout(() => {
      dispatch({ type: CLEAR_DELETE_FARM_CHEMICAL_CATEGORY_MESSAGE });
    }, 500);
  }
};

/* ------------------------------------------ */
/* ------------------------------------------ */
/* ------------------------------------------ */
export const POST_FARM_CHEMICAL_CATEGORY =
  "FarmChemicals/POST_FARM_CHEMICAL_CATEGORY";
export const POST_FARM_CHEMICAL_CATEGORY_SUCCESS =
  "FarmChemicals/POST_FARM_CHEMICAL_CATEGORY_SUCCESS";
export const POST_FARM_CHEMICAL_CATEGORY_FAILED =
  "FarmChemicals/POST_FARM_CHEMICAL_CATEGORY_FAILED";
export const CLEAR_POST_FARM_CHEMICAL_CATEGORY_MESSAGE =
  "FarmChemicals/CLEAR_POST_FARM_CHEMICAL_CATEGORY_MESSAGE";

export const createItem = (payload) => async (dispatch) => {
  dispatch({ type: POST_FARM_CHEMICAL_CATEGORY });
  try {
    const res = await createFarmChemicalCategoryOnApi(payload);
    dispatch({ type: POST_FARM_CHEMICAL_CATEGORY_SUCCESS, payload: res });
    setTimeout(() => {
      dispatch({ type: CLEAR_POST_FARM_CHEMICAL_CATEGORY_MESSAGE });
    }, 500);
  } catch (err) {
    dispatch({
      type: POST_FARM_CHEMICAL_CATEGORY_FAILED,
      payload: err.response,
    });
    setTimeout(() => {
      dispatch({ type: CLEAR_POST_FARM_CHEMICAL_CATEGORY_MESSAGE });
    }, 500);
  }
};
