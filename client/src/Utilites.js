import { useEffect, useState } from "react";
import {
  getFarmChemicalsSummary,
  getInventorySummary,
  getLivestockSummary,
} from "./Redux/Actions/Dashboard";
import themeObj from "./Theme";
import { useDispatch } from "react-redux";

import { createMuiTheme } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { checkSession } from "./Redux/Actions/Auth";
export const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};

export default useScrollToTop;

export const useCheckSessions = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("SMART_FARMING_TOKEN");
    if (token) dispatch(checkSession(token));
  }, [dispatch]);
};

export const useFetchSummaryData = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLivestockSummary());
    dispatch(getInventorySummary());
    dispatch(getFarmChemicalsSummary());
  }, [dispatch]);
};

export const useExtractLableAndDatasetForLivestock = (data) => {
  const [output, setOutput] = useState([[], []]);

  useEffect(() => {
    setOutput([
      data.map((item) => item.total_animals),
      data.map((item) => item.category_name),
    ]);
  }, [data]);
  return output;
};

export const useExtractLableAndDatasetForInventory = (data) => {
  const [output, setOutput] = useState([[], []]);

  useEffect(() => {
    setOutput([
      data.map((item) => item.total_inventories),
      data.map((item) => item.category_name),
    ]);
  }, [data]);
  return output;
};

export const useExtractLableAndDatasetForFarmChemicals = (data) => {
  const [output, setOutput] = useState([[], []]);

  useEffect(() => {
    setOutput([
      data.map((item) => item.total_chemicals),
      data.map((item) => item.category_name),
    ]);
  }, [data]);
  return output;
};

export const useUpdateTheme = () => {
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const isSysThemeDark = systemTheme.matches;
  const [isThemeDark, setIsThemeDark] = useState(isSysThemeDark);
  systemTheme.onchange = (e) => {
    setIsThemeDark(e.matches);
  };

  const activeSecondaryMain = isThemeDark ? "#262626" : "#fff";
  const activePrimaryMain = isThemeDark ? "#fff" : "#262626";

  let themeFinal = {
    ...themeObj,
    palette: {
      primary: {
        main: activePrimaryMain,
      },
      secondary: {
        main: activeSecondaryMain,
      },
    },
  };
  const theme = createMuiTheme(themeFinal);

  return [isThemeDark, setIsThemeDark, theme];
};

export const dateFormatter = (timeStamp = Date.now()) => {
  return new Date(timeStamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const useTostMessage = (isLoading, isFailed, message) => {
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (isFailed) enqueueSnackbar(message, { variant: "error" });
    else if (!isLoading && message)
      enqueueSnackbar(message, { variant: "success" });
  }, [message, isFailed, isLoading, enqueueSnackbar]);
};
