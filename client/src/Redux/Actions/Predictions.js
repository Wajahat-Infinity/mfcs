import {
  fertilizerAPI,
  getCropsResults,
  getCropsSuggestionAPI,
  getFertilizersResults,
} from "../../HTTP/Api";

export const FERTELIZER_PREDICIONING = "Predictions/FERTELIZER_PREDICIONING";
export const FERTELIZER_PREDICION_SUCCESS =
  "Predictions/FERTELIZER_PREDICION_SUCCESS";
export const FERTELIZER_PREDICION_FAILURE =
  "Predictions/FERTELIZER_PREDICION_FAILURE";
export const CLEAR_FERTELIZER_PREDICION_MESSAGE =
  "Predictions/CLEAR_FERTELIZER_PREDICION_MESSAGE";

export const suggestFertilier = (payload) => async (dispatch) => {
  dispatch({ type: FERTELIZER_PREDICIONING });
  try {
    const res = await fertilizerAPI(payload);
    dispatch({ type: FERTELIZER_PREDICION_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: FERTELIZER_PREDICION_FAILURE,
      payload: error.response?.data?.message,
    });
    setTimeout(() => {
      dispatch({ type: CLEAR_FERTELIZER_PREDICION_MESSAGE });
    }, 5000);
  }
};

export const GET_FERTELIZER_HISTORY = "Predictions/GET_FERTELIZER_HISTORY";
export const GET_FERTELIZER_HISTORY_SUCCESS =
  "Predictions/GET_FERTELIZER_HISTORY_SUCCESS";
export const GET_FERTELIZER_HISTORY_FAILURE =
  "Predictions/GET_FERTELIZER_HISTORY_FAILURE";

export const getHistory = () => async (dispatch) => {
  dispatch({ type: GET_FERTELIZER_HISTORY });
  try {
    const res = await getFertilizersResults();
    dispatch({ type: GET_FERTELIZER_HISTORY_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_FERTELIZER_HISTORY_FAILURE,
      payload: error.response,
    });
  }
};

export const CROPS_PREDICIONING = "Predictions/CROPS_PREDICIONING";
export const CROPS_PREDICION_SUCCESS = "Predictions/CROPS_PREDICION_SUCCESS";
export const CROPS_PREDICION_FAILURE = "Predictions/CROPS_PREDICION_FAILURE";
export const CLEAR_CROPS_PREDICION_MESSAGE =
  "Predictions/CLEAR_CROPS_PREDICION_MESSAGE";

export const suggestCrops = (payload) => async (dispatch) => {
  dispatch({ type: CROPS_PREDICIONING });
  try {
    const res = await getCropsSuggestionAPI(payload);
    dispatch({ type: CROPS_PREDICION_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: CROPS_PREDICION_FAILURE,
      payload: error.response,
    });
    setTimeout(() => {
      dispatch({ type: CLEAR_CROPS_PREDICION_MESSAGE });
    }, 500);
  }
};

export const GET_CROP_HISTORY = "Predictions/GET_CROP_HISTORY";
export const GET_CROP_HISTORY_SUCCESS = "Predictions/GET_CROP_HISTORY_SUCCESS";
export const GET_CROP_HISTORY_FAILURE = "Predictions/GET_CROP_HISTORY_FAILURE";

export const getCropHistory = () => async (dispatch) => {
  dispatch({ type: GET_CROP_HISTORY });
  try {
    const res = await getCropsResults();
    dispatch({ type: GET_CROP_HISTORY_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_CROP_HISTORY_FAILURE,
      payload: error.response,
    });
  }
};

export const RESET_PREDICTIONS = "Predictions/RESET_PREDICTIONS";
export const resetStore = () => (dispatch) => {
  dispatch({ type: RESET_PREDICTIONS });
};
