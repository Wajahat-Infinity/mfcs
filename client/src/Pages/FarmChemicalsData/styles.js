import { fade, makeStyles } from "@material-ui/core";
export const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: fade(theme.palette.primary.main, 0.09),
    },
  },
  inputField: {
    width: "100%",
    "& input": {
      padding: theme.spacing(1),
    },
    "& .MuiFormHelperText-root": {
      left: 0,
      margin: 0,
    },
  },

  paper: {
    padding: theme.spacing(3, 1.2),
    minWidth: 200,
    width: "100%",
    maxWidth: 500,
    "& .divider": {
      margin: theme.spacing(1, 0, 2),
    },
    "& .title": {
      fontSize: 24,
    },
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1.5, 1),
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    "& .success": {
      backgroundColor: "green",
      color: "#fff",
    },
  },
  formGroup: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    [theme.breakpoints.up("sm")]: {
      "& > .MuiGrid-item": {
        "&:first-child": {
          paddingRight: 5,
        },
        "&:nth-child(2)": {
          paddingLeft: 5,
        },
      },
    },
  },
}));
