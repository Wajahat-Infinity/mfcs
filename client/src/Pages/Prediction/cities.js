import React from "react";
import { useField } from "formik";
import {
  fade,
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  Select,
} from "@material-ui/core";
import list from "./list";

export default function Cities(props) {
  const classes = useStyles();
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <FormControl
      variant="outlined"
      classes={{ root: classes.root }}
      error={Boolean(errorText)}
    >
      <InputLabel htmlFor="outlined-city-native">City</InputLabel>
      <Select
        fullWidth
        native
        label="city"
        inputProps={{
          name: "city",
          id: "outlined-city-native",
        }}
        {...field}
        className={classes.selectMenu}
      >
        {list.map(({ id, city }) => (
          <option value={id}>{city}</option>
        ))}
      </Select>
      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  );
}

const useStyles = makeStyles((theme) => ({
  selectMenu: {
    "& option": {
      color: "#000",
    },
  },
  root: {
    width: "100%",
    color: theme.palette.primary.main,
    "& .MuiTypography-root": {
      color: theme.palette.primary.main,
    },
    "& .MuiSelect-root": {
      padding: 10.5,
    },
    "& .MuiInputLabel-outlined ": {
      transform: " translate(11px, 11px) scale(1)",
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink ": {
      transform: "translate(14px, -6px) scale(0.75)",
    },
    "& .MuiInputBase-root": {
      color: theme.palette.primary.main,
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: fade(theme.palette.primary.main, 0.4),
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: fade(theme.palette.primary.main, 0.7),
    },
    position: "relative",
    marginTop: 0,
    marginBottom: theme.spacing(2.7),
    "& .MuiFormLabel-root": {
      color: theme.palette.primary.main,
    },
    "& .MuiFormHelperText-root": {
      position: "absolute",
      top: theme.spacing(5),
      lineHeight: 1,
    },
  },
}));
