import { combineReducers } from "redux";
import AuthReducer from "./Reducers/Auth";
import DashboardReducer from "./Reducers/Dashboard";
import FarmChemicalsCategoriesReducer from "./Reducers/FarmChemicalsCategories";
import FarmChemicalsDataReducer from "./Reducers/FarmChemicalsData";
import LivestockDataReducer from "./Reducers/LivestockData";
import LivestockCategoriesReducer from "./Reducers/LivestockCategories";
import InventoryCategoriesReducer from "./Reducers/InventoryCategories";
import InventoryDataReducer from "./Reducers/InventoryData";
import PasswordResetReducer from "./Reducers/PasswordReset";
import PredictionReducer from "./Reducers/Predictions";

const rootReducer = combineReducers({
  Auth: AuthReducer,
  Dashboard: DashboardReducer,
  FarmChemicalsCategories: FarmChemicalsCategoriesReducer,
  FarmChemicalsData: FarmChemicalsDataReducer,
  InvetoryCategories: InventoryCategoriesReducer,
  InventoryData: InventoryDataReducer,
  LivestockCategories: LivestockCategoriesReducer,
  LivestockData: LivestockDataReducer,
  PasswordReset: PasswordResetReducer,
  Predictions: PredictionReducer,
});
export default rootReducer;
