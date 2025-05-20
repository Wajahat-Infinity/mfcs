import axios from "axios";
import { baseURL as url } from "./url";

const smartFarmingApi = axios.create({ baseURL: url });

// Endpoints
export const getSignInFromApi = async (payload) => {
  const res = await smartFarmingApi.post("/api/auth/signin", payload);
  return res.data;
};

export const oAuthAPI = async (payload) => {
  const res = await smartFarmingApi.post(
    "/api/oAuth/request-jwt-token",
    payload
  );
  return res.data;
};
export const postSignUpToApi = async (payload = {}) => {
  const res = await smartFarmingApi.post("/api/auth/signup", payload);
  return res.data;
};

export const checkSessionFromApi = async (payload) => {
  const res = await smartFarmingApi.get("/api/auth/session", {
    headers: {
      Authorization: payload,
    },
  });
  return res.data;
};

export const updateProfileOnApi = async (payload) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.put(`/api/auth/updateProfile`, payload, {
    headers: {
      Authorization: JWT,
    },
  });
  return res.data;
};

/* 
///////////////////////////
  livestock
///////////////////////////
*/
export const getLivestockCategoriesFromApi = async (payload) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.get("/api/livestock/categories", {
    headers: {
      Authorization: JWT,
    },
    params: {
      p: payload.page,
    },
  });

  return res.data;
};

export const putLivestockCategoryOnApi = async (payload, id) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.put(
    `/api/livestock/categories/${id}`,
    payload,
    {
      headers: {
        Authorization: JWT,
      },
    }
  );

  return res.data;
};

export const deleteLivestockCategoryFromApi = async (payload) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.delete(
    `/api/livestock/categories/${payload}`,
    {
      headers: {
        Authorization: JWT,
      },
    }
  );

  return res.data;
};

export const createLivestockCategoryOnApi = async (payload) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.post("/api/livestock/categories", payload, {
    headers: {
      Authorization: JWT,
    },
  });

  return res.data;
};

export const getLivestockDataFromApi = async (payload) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.get("/api/livestock/animals", {
    headers: {
      Authorization: JWT,
    },
    params: {
      p: payload.page,
    },
  });

  return res.data;
};

export const createLivestockDataOnApi = async (payload) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.post(`/api/livestock/animals`, payload, {
    headers: { Authorization: JWT },
  });
  return res.data;
};

export const updateLivestockDataOnApi = async (payload, id) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.put(
    `/api/livestock/animals/${id}`,
    payload,
    {
      headers: { Authorization: JWT },
    }
  );
  return res.data;
};

export const deleteLivestockFromApi = async (payload) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.delete(
    `/api/livestock/animals/${payload}`,
    {
      headers: {
        Authorization: JWT,
      },
    }
  );
  return res.data;
};

export const getLivestockSummaryFromApi = async (payload) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.get("/api/livestock/summary", {
    headers: { Authorization: JWT },
  });
  return res.data;
};

export const getLivestockCategoriesNameListFromApi = async () => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.get("/api/livestock/categories-name-list", {
    headers: { Authorization: JWT },
  });
  return res.data;
};

/* 
///////////////////////////
  inventory
///////////////////////////
*/
export const getInventoryCategoriesFromApi = async (payload) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.get("/api/inventory/categories", {
    headers: {
      Authorization: JWT,
    },
    params: {
      p: payload.page,
    },
  });

  return res.data;
};

export const putInventoryCategoryOnApi = async (payload, id) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.put(
    `/api/inventory/categories/${id}`,
    payload,
    {
      headers: {
        Authorization: JWT,
      },
    }
  );

  return res.data;
};

export const deleteInventoryCategoryFromApi = async (payload) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.delete(
    `/api/inventory/categories/${payload}`,
    {
      headers: {
        Authorization: JWT,
      },
    }
  );

  return res.data;
};

export const createInventoryCategoryOnApi = async (payload) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.post("/api/inventory/categories", payload, {
    headers: {
      Authorization: JWT,
    },
  });

  return res.data;
};

export const getInventoryDataFromApi = async (payload) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.get("/api/inventory/items", {
    headers: {
      Authorization: JWT,
    },
    params: {
      p: payload.page,
    },
  });

  return res.data;
};

export const createInventoryItemOnApi = async (payload) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.post(`/api/inventory/items`, payload, {
    headers: { Authorization: JWT },
  });
  return res.data;
};

export const updateInventoryDataOnApi = async (payload, id) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.put(`/api/inventory/items/${id}`, payload, {
    headers: { Authorization: JWT },
  });
  return res.data;
};

export const deleteInventoryItemFromApi = async (payload) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.delete(`/api/inventory/items/${payload}`, {
    headers: {
      Authorization: JWT,
    },
  });
  return res.data;
};

export const getInventorySummaryFromApi = async (payload) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.get("/api/inventory/summary", {
    headers: { Authorization: JWT },
  });
  return res.data;
};

export const getInventoryCategoriesNameListFromApi = async () => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.get("/api/inventory/categories-name-list", {
    headers: { Authorization: JWT },
  });
  return res.data;
};

/* 
///////////////////////////
farm chemicals endpoints
///////////////////////////
*/

export const getFarmChemicalsCategoriesFromApi = async (payload) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.get("/api/farmchemicals/categories", {
    headers: {
      Authorization: JWT,
    },
    params: {
      p: payload.page,
    },
  });

  return res.data;
};

export const putFarmChemicalCategoryOnApi = async (payload, id) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.put(
    `/api/farmchemicals/categories/${id}`,
    payload,
    {
      headers: {
        Authorization: JWT,
      },
    }
  );

  return res.data;
};

export const deleteFarmChemicalCategoryFromApi = async (payload) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.delete(
    `/api/farmchemicals/categories/${payload}`,
    {
      headers: {
        Authorization: JWT,
      },
    }
  );

  return res.data;
};

export const createFarmChemicalCategoryOnApi = async (payload) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.post(
    "/api/farmchemicals/categories",
    payload,
    {
      headers: {
        Authorization: JWT,
      },
    }
  );

  return res.data;
};

export const getFarmChemicalsFromApi = async (payload) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.get("/api/farmchemicals/chemicals", {
    headers: {
      Authorization: JWT,
    },
    params: {
      p: payload.page,
    },
  });

  return res.data;
};

export const createFarmchemicalsOnApi = async (payload) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.post(
    `/api/farmchemicals/chemicals`,
    payload,
    {
      headers: { Authorization: JWT },
    }
  );
  return res.data;
};

export const updateFarmchemicalsOnApi = async (payload, id) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.put(
    `/api/farmchemicals/chemicals/${id}`,
    payload,
    {
      headers: { Authorization: JWT },
    }
  );
  return res.data;
};

export const deleteFarmchemicalFromApi = async (payload) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.delete(
    `/api/farmchemicals/chemicals/${payload}`,
    {
      headers: {
        Authorization: JWT,
      },
    }
  );
  return res.data;
};

export const getFarmchemicalsSummaryFromAPI = async (payload) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.get("/api/farmchemicals/summary", {
    headers: { Authorization: JWT },
  });
  return res.data;
};

export const getChemicalsCategoriesNameListFromApi = async () => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.get(
    "/api/farmchemicals/categories-name-list",
    {
      headers: { Authorization: JWT },
    }
  );
  return res.data;
};

export const checkCurrentPassword = async (payload) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.post("/api/password/check", payload, {
    headers: { Authorization: JWT },
  });
  return res;
};

export const updatePassword = async (payload) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.post("/api/password/reset", payload, {
    headers: { Authorization: JWT },
  });
  return res;
};

export const requestResetPassword = async (payload) => {
  const res = await smartFarmingApi.post("/api/password/create-token", payload);
  return res;
};

export const getCodeByToken = async (payload) => {
  const res = await smartFarmingApi.get(
    `/api/password/token-details/${payload}`
  );
  return res;
};

export const resetPasswordAPI = async (payload) => {
  const res = await smartFarmingApi.post(
    "/api/password/reset-password",
    payload
  );
  return res;
};

//  prediction endpoints
export const fertilizerAPI = async (payload) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");
  const res = await smartFarmingApi.post(
    "/api/predictions/fertilizers-suggestion",
    payload,
    {
      headers: { Authorization: JWT },
    }
  );
  return res;
};

export const getFertilizersResults = async () => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.get(
    "/api/predictions/fertilizers-suggestion",
    {
      headers: { Authorization: JWT },
    }
  );
  return res;
};

export const getCropsSuggestionAPI = async (payload) => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");
  const res = await smartFarmingApi.post(
    "/api/predictions/crops_suggestion/",
    payload,
    {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': JWT 
      },
    }
  );
  return res;
};

export const getCropsResults = async () => {
  const JWT = localStorage.getItem("SMART_FARMING_TOKEN");

  const res = await smartFarmingApi.get("/api/predictions/crops-suggestion", {
    headers: { Authorization: JWT },
  });
  return res;
};
