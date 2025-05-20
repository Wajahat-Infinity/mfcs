import {
  getFarmchemicalsSummaryFromAPI,
  getInventorySummaryFromApi,
  getLivestockSummaryFromApi,
} from "../../HTTP/Api";

export const GET_LIVESTOCK_SUMMARY = "Dashboard/GET_LIVESTOCK_SUMMARY";
export const GET_INVENTORY_SUMMARY = "Dashboard/GET_INVENTORY_SUMMARY";
export const GET_FARM_CHEMICALS_SUMMARY =
  "Dashboard/GET_FARM_CHEMICALS_SUMMARY";

export const getLivestockSummary = (payload) => async (dispatch) => {
  try {
    const res = await getLivestockSummaryFromApi();
    dispatch({ type: GET_LIVESTOCK_SUMMARY, payload: res });
  } catch (error) {
    throw error;
  }
};

export const getInventorySummary = (payload) => async (dispatch) => {
  try {
    const res = await getInventorySummaryFromApi();
    dispatch({ type: GET_INVENTORY_SUMMARY, payload: res });
  } catch (error) {
    throw error;
  }
};

export const getFarmChemicalsSummary = (payload) => async (dispatch) => {
  try {
    const res = await getFarmchemicalsSummaryFromAPI();
    dispatch({ type: GET_FARM_CHEMICALS_SUMMARY, payload: res });
  } catch (error) {
    throw error;
  }
};
