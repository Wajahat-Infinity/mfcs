import React from "react";
import {
  FormControl,
  FormHelperText,
  Select as MuiSelect,
  InputLabel,
  MenuItem,
  fade,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useField } from "formik";

const Select = (props) => {
  const { label = "", className = null, listData = [] } = props;
  const classes = useStyles();
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <FormControl
      className={className}
      classes={{ root: classes.root }}
      variant="outlined"
      error={Boolean(errorText)}
    >
      <InputLabel id={`select-outlined-${label}`}>{label}</InputLabel>
      <MuiSelect
        labelId={`select-outlined-${label}`}
        id={`select-${label}`}
        label="Age"
        {...field}
        MenuProps={{ PopoverClasses: { root: classes.menuRoot } }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {listData.map((obj, index) => {
          const keys = Object.keys(obj);
          const value = obj[keys[0]];
          const title = obj[keys[1]];
          return (
            <MenuItem key={index} value={value}>
              <Typography>{title}</Typography>
            </MenuItem>
          );
        })}
      </MuiSelect>
      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  );
};

export default Select;

const useStyles = makeStyles((theme) => ({
  menuRoot: {
    "& .MuiPaper-root": {
      background: theme.palette.secondary.main,
      boxShadow: " 0px 0px 4px" + theme.palette.primary.main,
    },
    "& .MuiListItem-root, .MuiTypography-root": {
      color: theme.palette.primary.main,
    },
    "& .MuiListItem-root": {
      "&:hover": {
        background: fade(theme.palette.primary.main, 0.1),
      },
    },
    "& .Mui-selected": {
      background: fade(theme.palette.primary.main, 0.15),
    },
  },
  root: {
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
