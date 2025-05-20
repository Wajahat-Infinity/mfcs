import * as CONSTANTS from "../Actions/Predictions";

const initialState = {
  isPredictingFertlizer: false,
  isPredictingFertlizerFailed: false,
  isPredictingFertlizerSuccess: false,
  fertilizerMessage: null,
  data: {},

  isPredictingCrop: false,
  isPredictingCropFailed: false,
  isPredictingCropSuccess: false,
  cropMessage: null,
  cropResults: {},

  cropHistory: [],
  fertilizerHistory: [],

  isLoadingHistory: false,
  isLoadingHistoryFailed: false,
  isLoadingHistorySuccess: false,
};

function PredictionReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.FERTELIZER_PREDICIONING:
      return {
        ...state,
        isPredictingFertlizer: true,
        isPredictingFertlizerFailed: false,
        isPredictingFertlizerSuccess: false,
      };

    case CONSTANTS.FERTELIZER_PREDICION_SUCCESS:
      return {
        ...state,
        isPredictingFertlizer: false,
        isPredictingFertlizerSuccess: true,
        data: action.payload,
      };

    case CONSTANTS.FERTELIZER_PREDICION_FAILURE:
      return {
        ...state,
        isPredictingFertlizer: false,
        isPredictingFertlizerFailed: true,
        fertilizerMessage: action.payload,
      };

    case CONSTANTS.CLEAR_FERTELIZER_PREDICION_MESSAGE:
      return {
        ...state,
        isPredictingFertlizer: false,
        isPredictingFertlizerFailed: false,
        isPredictingFertlizerSuccess: false,
        fertilizerMessage: null,
      };

    /* ----------------------------------------------------------------*/

    case CONSTANTS.CROPS_PREDICIONING:
      return {
        ...state,
        isPredictingCrop: true,
        isPredictingCropFailed: false,
        isPredictingCropSuccess: false,
      };

    case CONSTANTS.CROPS_PREDICION_SUCCESS:
      return {
        ...state,
        isPredictingCrop: false,
        isPredictingCropSuccess: true,
        cropResults: action.payload.result,
      };

    case CONSTANTS.CROPS_PREDICION_FAILURE:
      return {
        ...state,
        isPredictingCrop: false,
        isPredictingCropFailed: true,
      };

    case CONSTANTS.CLEAR_CROPS_PREDICION_MESSAGE:
      return {
        ...state,
        isPredictingCrop: false,
        isPredictingCropFailed: false,
        isPredictingCropSuccess: false,
        cropMessage: null,
      };

    /* ----------------------------------------------------------------*/

    case CONSTANTS.GET_FERTELIZER_HISTORY:
      return {
        ...state,
        isLoadingHistory: false,
        isLoadingHistoryFailed: false,
        isLoadingHistorySuccess: false,
      };

    case CONSTANTS.GET_FERTELIZER_HISTORY_SUCCESS:
      return {
        ...state,
        isLoadingHistory: false,
        fertilizerHistory: action.payload.results,
      };

    case CONSTANTS.GET_FERTELIZER_HISTORY_FAILURE:
      return {
        ...state,
        isLoadingHistory: false,
        isLoadingHistoryFailed: true,
      };

    /* ----------------------------------------------------------------*/

    case CONSTANTS.GET_CROP_HISTORY:
      return {
        ...state,
        isLoadingHistory: false,
        isLoadingHistoryFailed: false,
        isLoadingHistorySuccess: false,
      };

    case CONSTANTS.GET_CROP_HISTORY_SUCCESS:
      return {
        ...state,
        isLoadingHistory: false,
        cropHistory: action.payload.results,
      };

    case CONSTANTS.GET_CROP_HISTORY_FAILURE:
      return {
        ...state,
        isLoadingHistory: false,
        isLoadingHistoryFailed: true,
      };

    case CONSTANTS.RESET_PREDICTIONS: {
      return {
        ...state,
        isPredictingFertlizer: false,
        isPredictingFertlizerFailed: false,
        isPredictingFertlizerSuccess: false,
        fertilizerMessage: null,
        data: {},
        isPredictingCrop: false,
        isPredictingCropFailed: false,
        isPredictingCropSuccess: false,
        cropMessage: null,
        cropResults: {},
      };
    }
    default:
      return state;
  }
}

export default PredictionReducer;
