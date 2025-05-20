import * as CONSTANTS from "../Actions/Dashboard";

const initialState = {
  farmChemicalsSummary: {
    data: [],
    totalCategories: 0,
    totalChemicals: 0,
  },
  livestockSummary: {
    data: [],
    totalCategories: 0,
    totalAnimals: 0,
  },
  inventorySummary: {
    data: [],
    totalCategories: 0,
    totalItems: 0,
  },
};

function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.GET_LIVESTOCK_SUMMARY:
      return {
        ...state,
        livestockSummary: {
          ...action.payload,
        },
      };

    case CONSTANTS.GET_INVENTORY_SUMMARY:
      return {
        ...state,
        inventorySummary: {
          ...action.payload,
        },
      };

    case CONSTANTS.GET_FARM_CHEMICALS_SUMMARY:
      return {
        ...state,
        farmChemicalsSummary: {
          ...action.payload,
        },
      };

    default:
      return state;
  }
}

export default AuthReducer;
