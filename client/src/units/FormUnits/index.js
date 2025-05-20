import { fade, makeStyles, TextField } from "@material-ui/core";
import { useField } from "formik";
import React from "react";

// Coustom Input Field  for Formik

export const InputField = ({
  placeholder,
  type,
  width,
  disabled = false,
  className = "",
  autoFocus = false,
  error,
  helperText,
  ...props
}) => {
  const classes = useStyles();
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      className={`${classes.textField} ${className}`}
      variant="outlined"
      label={placeholder}
      size="small"
      type={type}
      margin="dense"
      autoComplete="off"
      fullWidth={width}
      disabled={disabled}
      autoFocus={autoFocus}
      {...field}
      helperText={errorText || helperText}
      error={!!errorText || error}
    />
  );
};

export const TextArea = ({
  placeholder,
  width,
  disabled = false,
  rows,
  ...props
}) => {
  const classes = useStyles();
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      className={classes.textField}
      label={placeholder}
      variant="outlined"
      fullWidth={width}
      multiline
      rows={rows}
      margin="dense"
      disabled={disabled}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export const Checkbox = (props) => {
  const [field, meta] = useField(props);
  const classes = useStyles();
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <TextField
      className={classes.checkbox}
      {...props}
      variant="outlined"
      type={props.type}
      name={props.name}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  textField: {
    color: theme.palette.primary.main,

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
      left: -5,
      top: theme.spacing(5),
      lineHeight: 1,
    },
  },
  checkbox: {
    position: "relative",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2.5),
    width: 20,
    "& .MuiFormHelperText-root": {
      width: 200,
      position: "absolute",
      left: -10,
      top: theme.spacing(3),
    },
  },
}));
