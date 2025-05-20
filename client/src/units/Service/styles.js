import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "0px 0px 8px 0px #26262663 ",
    display: "flex",
    flexDirection: "column-reverse;",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "revert",
    },
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    "& .text": {
      padding: theme.spacing(1),
      [theme.breakpoints.up("sm")]: {
        width: "60%",
      },
      width: "100%",
      "& .title": {
        fontSize: "1.3rem",
      },
    },
    "& .image": {
      objectFit: "cover",
      [theme.breakpoints.up("sm")]: {
        width: "40%",
      },
      width: "100%",
      minHeight: 200,
      maxHeight: 300,
      height: "100%",
    },
  },
  reverseImg: {
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row-reverse",
    },
    flexDirection: "column-reverse;",
  },
  para: {
    paddingTop: theme.spacing(1.5),
    textAlign: "justify",
  },
}));
